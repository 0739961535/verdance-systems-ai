import { NextResponse } from "next/server";
import { TIMEZONE, freeSlots } from "@/lib/booking-server";

/**
 * GET /api/booking/slots
 * The CRM calendar's free slots (through Ashford), so the booking page
 * renders availability in our own design.
 */
export async function GET() {
  const r = await freeSlots();
  if (!r) return NextResponse.json({ error: "booking_unavailable" }, { status: 503 });
  return NextResponse.json({ timezone: TIMEZONE, days: r.days, ...(r.dryRun ? { dryRun: true } : {}) }, { headers: { "Cache-Control": "no-store" } });
}
