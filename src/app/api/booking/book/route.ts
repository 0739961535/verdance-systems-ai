import { NextResponse } from "next/server";

/**
 * POST /api/booking/book
 * Books an audit call: upserts the contact in the CRM, then creates the
 * appointment on the calendar. Body: { name, email, phone, slot }.
 */

const CALENDAR_ID = process.env.GHL_CALENDAR_ID || "yLGPT8nNF78G32doGmoW";
const API = "https://services.leadconnectorhq.com";

export async function POST(req: Request) {
  const token = process.env.GHL_PRIVATE_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) {
    return NextResponse.json({ error: "booking_unavailable" }, { status: 503 });
  }

  let body: { name?: string; email?: string; phone?: string; slot?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const name = (body.name || "").trim().slice(0, 120);
  const email = (body.email || "").trim().slice(0, 160);
  const phone = (body.phone || "").trim().slice(0, 40);
  const slot = (body.slot || "").trim();

  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !/^\d{4}-\d{2}-\d{2}T/.test(slot)) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  // 1. Upsert the contact so the booking lands on a real CRM record.
  const [firstName, ...rest] = name.split(/\s+/);
  const upsertRes = await fetch(`${API}/contacts/upsert`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      locationId,
      firstName,
      lastName: rest.join(" ") || undefined,
      email,
      phone: phone || undefined,
      source: "Website - AI Systems Audit",
    }),
  });
  if (!upsertRes.ok) {
    return NextResponse.json({ error: "booking_failed" }, { status: 502 });
  }
  const upsert = await upsertRes.json();
  const contactId: string | undefined = upsert?.contact?.id;
  if (!contactId) {
    return NextResponse.json({ error: "booking_failed" }, { status: 502 });
  }

  // 2. Create the appointment on the audit calendar.
  const apptRes = await fetch(`${API}/calendars/events/appointments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Version: "2021-04-15",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      calendarId: CALENDAR_ID,
      locationId,
      contactId,
      startTime: slot,
      title: `AI Systems Audit - ${name}`,
      appointmentStatus: "confirmed",
    }),
  });
  if (!apptRes.ok) {
    return NextResponse.json({ error: "slot_taken" }, { status: 409 });
  }

  return NextResponse.json({ ok: true });
}
