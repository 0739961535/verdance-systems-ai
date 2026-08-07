import { NextResponse } from "next/server";

/**
 * GET /api/booking/slots
 * Proxies the CRM calendar's free-slots endpoint so the booking card can
 * render availability natively. The private token never leaves the server.
 */

const CALENDAR_ID = process.env.GHL_CALENDAR_ID || "yLGPT8nNF78G32doGmoW";
const TIMEZONE = "Africa/Johannesburg";
const DAYS_AHEAD = 14;

export async function GET() {
  const token = process.env.GHL_PRIVATE_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "booking_unavailable" }, { status: 503 });
  }

  const start = Date.now();
  const end = start + DAYS_AHEAD * 86_400_000;
  const url =
    `https://services.leadconnectorhq.com/calendars/${CALENDAR_ID}/free-slots` +
    `?startDate=${start}&endDate=${end}&timezone=${encodeURIComponent(TIMEZONE)}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Version: "2021-04-15" },
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json({ error: "booking_unavailable" }, { status: 502 });
  }

  const data: Record<string, { slots?: string[] }> = await res.json();
  const days = Object.entries(data)
    .filter(([key, v]) => /^\d{4}-\d{2}-\d{2}$/.test(key) && Array.isArray(v?.slots) && v.slots.length > 0)
    .map(([date, v]) => ({ date, slots: v.slots as string[] }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return NextResponse.json({ timezone: TIMEZONE, days });
}
