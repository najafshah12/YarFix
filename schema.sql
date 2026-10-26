-- YarFix Early Access Leads Database Schema
-- Compatible with Neon Postgres, Vercel Postgres, Supabase, and standard PostgreSQL

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

-- Index for duplicate detection & fast querying
CREATE INDEX IF NOT EXISTS idx_yarfix_leads_email ON yarfix_leads(email);
CREATE INDEX IF NOT EXISTS idx_yarfix_leads_whatsapp ON yarfix_leads(whatsapp);
CREATE INDEX IF NOT EXISTS idx_yarfix_leads_city ON yarfix_leads(city);
CREATE INDEX IF NOT EXISTS idx_yarfix_leads_created_at ON yarfix_leads(created_at DESC);
