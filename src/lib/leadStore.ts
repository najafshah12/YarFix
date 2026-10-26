import fs from "fs";
import path from "path";
import crypto from "crypto";

export interface LeadSubmission {
  id: string;
  fullName: string;
  email: string | null;
  whatsapp: string | null;
  city: string;
  primaryInterest: string | null;
  message: string | null;
  source: string;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubmissionInput {
  fullName: string;
  email?: string;
  whatsapp?: string;
  city: string;
  primaryInterest?: string;
  message?: string;
  source?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
  sanitized?: {
    fullName: string;
    email: string | null;
    whatsapp: string | null;
    city: string;
    primaryInterest: string | null;
    message: string | null;
    source: string;
  };
}

// In-memory sliding window rate limiter
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 6;

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return { allowed: false, remaining: 0 };
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - validTimestamps.length };
}

// Basic input sanitizer
function sanitize(input: string | undefined | null): string {
  if (!input) return "";
  return input
    .trim()
    .replace(/[<>]/g, "") // strip dangerous html tags
    .slice(0, 500); // sensible upper limit
}

export function validateLeadInput(input: SubmissionInput): ValidationResult {
  const errors: Record<string, string> = {};

  const fullName = sanitize(input.fullName);
  const emailRaw = sanitize(input.email);
  const whatsappRaw = sanitize(input.whatsapp);
  const city = sanitize(input.city);
  const primaryInterest = sanitize(input.primaryInterest);
  const message = sanitize(input.message);
  const source = sanitize(input.source) || "landing_page";

  // Validate Full Name
  if (!fullName || fullName.length < 2) {
    errors.fullName = "Please enter your full name (at least 2 characters).";
  }

  // Validate City
  if (!city || city.length < 2) {
    errors.city = "Please select or enter your city.";
  }

  // Check that at least ONE contact method is provided
  if (!emailRaw && !whatsappRaw) {
    errors.contact = "Please provide either an Email Address or WhatsApp Number.";
  }

  // Validate Email format if supplied
  let email: string | null = null;
  if (emailRaw) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailRaw)) {
      errors.email = "Please enter a valid email address.";
    } else {
      email = emailRaw.toLowerCase();
    }
  }

  // Validate Pakistani / International phone format if supplied
  let whatsapp: string | null = null;
  if (whatsappRaw) {
    // Strip common separators: spaces, dashes, parentheses
    const cleanPhone = whatsappRaw.replace(/[\s\-\(\)]/g, "");
    // Match Pakistan format: 03001234567, +923001234567, 923001234567 or generic 10-15 digits
    const pkPhoneRegex = /^(?:\+92|92|0)?3[0-9]{9}$/;
    const genericPhoneRegex = /^\+?[0-9]{10,15}$/;

    if (!pkPhoneRegex.test(cleanPhone) && !genericPhoneRegex.test(cleanPhone)) {
      errors.whatsapp = "Please enter a valid WhatsApp number (e.g., 0300-1234567 or +923001234567).";
    } else {
      // Normalize to Pakistani standard +923xx format if 03xx is provided
      if (cleanPhone.startsWith("03") && cleanPhone.length === 11) {
        whatsapp = "+92" + cleanPhone.slice(1);
      } else if (cleanPhone.startsWith("923") && cleanPhone.length === 12) {
        whatsapp = "+" + cleanPhone;
      } else if (cleanPhone.startsWith("+")) {
        whatsapp = cleanPhone;
      } else {
        whatsapp = "+" + cleanPhone;
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    sanitized: {
      fullName,
      email,
      whatsapp,
      city,
      primaryInterest: primaryInterest || null,
      message: message || null,
      source,
    },
  };
}

// Local server file storage fallback
const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

function ensureLocalDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

function readLocalLeads(): LeadSubmission[] {
  try {
    ensureLocalDataDir();
    const data = fs.readFileSync(LEADS_FILE, "utf8");
    return JSON.parse(data) as LeadSubmission[];
  } catch (err) {
    console.error("Error reading local leads:", err);
    return [];
  }
}

function writeLocalLeads(leads: LeadSubmission[]) {
  ensureLocalDataDir();
  const tempPath = `${LEADS_FILE}.${Date.now()}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(leads, null, 2), "utf8");
  fs.renameSync(tempPath, LEADS_FILE);
}

// Database / Storage Execution
export async function saveLead(
  input: SubmissionInput,
  meta: { ipAddress: string; userAgent: string }
): Promise<{ success: boolean; lead?: LeadSubmission; isDuplicate?: boolean; error?: string }> {
  const validation = validateLeadInput(input);
  if (!validation.valid || !validation.sanitized) {
    const firstError = Object.values(validation.errors)[0] || "Invalid input";
    return { success: false, error: firstError };
  }

  const { fullName, email, whatsapp, city, primaryInterest, message, source } = validation.sanitized;
  const now = new Date().toISOString();

  // 1. Neon Postgres / External DB implementation
  const dbUrl = process.env.DATABASE_URL;
  if (dbUrl && dbUrl.trim() !== "") {
    try {
      const { Pool } = await import("@neondatabase/serverless");
      const pool = new Pool({ connectionString: dbUrl });

      // Ensure table exists
      await pool.query(`
        CREATE TABLE IF NOT EXISTS yarfix_leads (
          id VARCHAR(64) PRIMARY KEY,
          full_name VARCHAR(120) NOT NULL,
          email VARCHAR(160),
          whatsapp VARCHAR(30),
          city VARCHAR(80) NOT NULL,
          primary_interest VARCHAR(80),
          message TEXT,
          source VARCHAR(60) DEFAULT 'landing_page',
          ip_address VARCHAR(60),
          user_agent TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `);

      // Check for existing lead by email or whatsapp
      let existingLead: Record<string, unknown> | null = null;
      if (email || whatsapp) {
        const queryParts: string[] = [];
        const params: unknown[] = [];
        if (email) {
          params.push(email);
          queryParts.push(`email = $${params.length}`);
        }
        if (whatsapp) {
          params.push(whatsapp);
          queryParts.push(`whatsapp = $${params.length}`);
        }
        const existingRes = await pool.query(
          `SELECT * FROM yarfix_leads WHERE ${queryParts.join(" OR ")} LIMIT 1`,
          params
        );
        if (existingRes.rows.length > 0) {
          existingLead = existingRes.rows[0];
        }
      }

      if (existingLead) {
        // Update existing lead with latest preferences
        await pool.query(
          `UPDATE yarfix_leads
           SET full_name = $1, city = $2, primary_interest = COALESCE($3, primary_interest),
               message = COALESCE($4, message), updated_at = NOW()
           WHERE id = $5`,
          [fullName, city, primaryInterest, message, existingLead.id]
        );
        return {
          success: true,
          isDuplicate: true,
          lead: {
            id: String(existingLead.id),
            fullName,
            email: existingLead.email ? String(existingLead.email) : null,
            whatsapp: existingLead.whatsapp ? String(existingLead.whatsapp) : null,
            city,
            primaryInterest: primaryInterest || (existingLead.primary_interest ? String(existingLead.primary_interest) : null),
            message: message || (existingLead.message ? String(existingLead.message) : null),
            source,
            ipAddress: meta.ipAddress,
            userAgent: meta.userAgent,
            createdAt: String(existingLead.created_at),
            updatedAt: now,
          },
        };
      }

      const id = "lead_" + crypto.randomBytes(12).toString("hex");
      await pool.query(
        `INSERT INTO yarfix_leads (id, full_name, email, whatsapp, city, primary_interest, message, source, ip_address, user_agent, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())`,
        [id, fullName, email, whatsapp, city, primaryInterest, message, source, meta.ipAddress, meta.userAgent]
      );

      return {
        success: true,
        isDuplicate: false,
        lead: {
          id,
          fullName,
          email,
          whatsapp,
          city,
          primaryInterest,
          message,
          source,
          ipAddress: meta.ipAddress,
          userAgent: meta.userAgent,
          createdAt: now,
          updatedAt: now,
        },
      };
    } catch (err: unknown) {
      console.error("Neon Postgres connection error, falling back to local server store:", err);
      // Fall through to local server store so leads are never lost!
    }
  }

  // 2. Local Persistent File Storage Engine
  try {
    const leads = readLocalLeads();

    // Check for existing record
    const existingIndex = leads.findIndex(
      (l) => (email && l.email?.toLowerCase() === email.toLowerCase()) || (whatsapp && l.whatsapp === whatsapp)
    );

    if (existingIndex !== -1) {
      const existing = leads[existingIndex];
      const updated: LeadSubmission = {
        ...existing,
        fullName,
        city,
        primaryInterest: primaryInterest || existing.primaryInterest,
        message: message || existing.message,
        updatedAt: now,
      };
      leads[existingIndex] = updated;
      writeLocalLeads(leads);
      return { success: true, isDuplicate: true, lead: updated };
    }

    const id = "lead_" + crypto.randomBytes(12).toString("hex");
    const newLead: LeadSubmission = {
      id,
      fullName,
      email,
      whatsapp,
      city,
      primaryInterest,
      message,
      source,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
      createdAt: now,
      updatedAt: now,
    };

    leads.unshift(newLead);
    writeLocalLeads(leads);

    return { success: true, isDuplicate: false, lead: newLead };
  } catch (err: unknown) {
    console.error("Failed to save lead to server storage:", err);
    return { success: false, error: "Server storage error. Please try again shortly." };
  }
}

// Retrieve leads for Admin view / export
export async function getLeads(): Promise<LeadSubmission[]> {
  const dbUrl = process.env.DATABASE_URL;
  if (dbUrl && dbUrl.trim() !== "") {
    try {
      const { Pool } = await import("@neondatabase/serverless");
      const pool = new Pool({ connectionString: dbUrl });
      const res = await pool.query(`SELECT * FROM yarfix_leads ORDER BY created_at DESC`);
      return res.rows.map((r: Record<string, unknown>) => ({
        id: String(r.id),
        fullName: String(r.full_name),
        email: r.email ? String(r.email) : null,
        whatsapp: r.whatsapp ? String(r.whatsapp) : null,
        city: String(r.city),
        primaryInterest: r.primary_interest ? String(r.primary_interest) : null,
        message: r.message ? String(r.message) : null,
        source: String(r.source || "landing_page"),
        ipAddress: String(r.ip_address || ""),
        userAgent: String(r.user_agent || ""),
        createdAt: String(r.created_at),
        updatedAt: String(r.updated_at),
      }));
    } catch (err: unknown) {
      console.error("Database query error, returning local leads:", err);
    }
  }

  return readLocalLeads();
}

// Format leads as CSV for export
export function convertLeadsToCsv(leads: LeadSubmission[]): string {
  const headers = [
    "ID",
    "Full Name",
    "Email",
    "WhatsApp Number",
    "City",
    "Primary Interest",
    "Message / Notes",
    "Source",
    "Signup Date (UTC)",
  ];

  const escapeCsv = (str: string | null | undefined) => {
    if (str === null || str === undefined) return '""';
    const val = String(str).replace(/"/g, '""');
    return `"${val}"`;
  };

  const rows = leads.map((l) => [
    escapeCsv(l.id),
    escapeCsv(l.fullName),
    escapeCsv(l.email),
    escapeCsv(l.whatsapp),
    escapeCsv(l.city),
    escapeCsv(l.primaryInterest),
    escapeCsv(l.message),
    escapeCsv(l.source),
    escapeCsv(l.createdAt),
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}
