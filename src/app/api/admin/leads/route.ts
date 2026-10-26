import { NextRequest, NextResponse } from "next/server";
import { getLeads, convertLeadsToCsv } from "@/lib/leadStore";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const secretParam = url.searchParams.get("secret");
    const secretHeader = req.headers.get("x-admin-secret");
    const authHeader = req.headers.get("authorization");
    const bearer = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

    const providedSecret = secretParam || secretHeader || bearer;
    const configuredSecret = process.env.ADMIN_SECRET || "yarfix_admin_secret_2026";

    if (!providedSecret || providedSecret !== configuredSecret) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access. Valid ADMIN_SECRET is required." },
        { status: 401 }
      );
    }

    const leads = await getLeads();

    // Check if CSV format is requested
    if (url.searchParams.get("format") === "csv") {
      const csv = convertLeadsToCsv(leads);
      const dateStr = new Date().toISOString().split("T")[0];
      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="yarfix-early-access-leads-${dateStr}.csv"`,
        },
      });
    }

    // Return JSON with stats
    const stats = {
      totalLeads: leads.length,
      cities: leads.reduce((acc: Record<string, number>, l) => {
        const city = l.city || "Unknown";
        acc[city] = (acc[city] || 0) + 1;
        return acc;
      }, {}),
      interests: leads.reduce((acc: Record<string, number>, l) => {
        const interest = l.primaryInterest || "Unspecified";
        acc[interest] = (acc[interest] || 0) + 1;
        return acc;
      }, {}),
      withEmail: leads.filter((l) => Boolean(l.email)).length,
      withWhatsApp: leads.filter((l) => Boolean(l.whatsapp)).length,
    };

    return NextResponse.json({
      success: true,
      stats,
      leads,
    });
  } catch (err: unknown) {
    console.error("API /api/admin/leads error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to load leads." },
      { status: 500 }
    );
  }
}
