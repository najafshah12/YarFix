import { NextRequest, NextResponse } from "next/server";
import { saveLead, checkRateLimit, validateLeadInput } from "@/lib/leadStore";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction & Rate limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "You have submitted multiple requests recently. Please wait a few minutes before trying again.",
        },
        { status: 429 }
      );
    }

    // 2. Body parsing
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    // 3. Pre-validation
    const validation = validateLeadInput(body);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: Object.values(validation.errors)[0] || "Invalid submission details.",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // 4. Persistence
    const result = await saveLead(body, { ipAddress: ip, userAgent });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Unable to save your details. Please check your inputs and try again.",
        },
        { status: 500 }
      );
    }

    // 5. Success response
    const message = result.isDuplicate
      ? "Welcome back! We've updated your preferences and confirmed your early access spot."
      : "You're on the list! We'll keep you updated as YarFix gets ready to launch.";

    return NextResponse.json(
      {
        success: true,
        message,
        isDuplicate: result.isDuplicate,
        leadId: result.lead?.id,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("API /api/leads error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected server error occurred. Please try again shortly.",
      },
      { status: 500 }
    );
  }
}
