import { NextResponse } from "next/server";
import { clientIp, clip, tooMany } from "@/lib/api-guard";
import { answersNote, cleanAnswers } from "@/components/booking/questions";

/**
 * POST /api/booking/book
 * Books an audit call: upserts the contact in the CRM, then creates the
 * appointment on the calendar. Body: { name, email, phone, slot }, plus,
 * from the home page booking flow, { answers, consent }. When answers are
 * sent, consent must be true; the answers are validated against the listed
 * options and saved as a note on the contact. A failed note never fails
 * the booking.
 */

const CALENDAR_ID = process.env.GHL_CALENDAR_ID || "yLGPT8nNF78G32doGmoW";
const API = "https://services.leadconnectorhq.com";

export async function POST(req: Request) {
  const token = process.env.GHL_PRIVATE_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) {
    return NextResponse.json({ error: "booking_unavailable" }, { status: 503 });
  }

  if (tooMany(`book:${clientIp(req)}`, 5, 10 * 60_000)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  let body: { name?: unknown; email?: unknown; phone?: unknown; slot?: unknown; answers?: unknown; consent?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }
  if (!body || typeof body !== "object") return NextResponse.json({ error: "invalid_request" }, { status: 400 });

  const name = clip(body.name, 120);
  const email = clip(body.email, 160);
  const phone = clip(body.phone, 40);
  const slot = clip(body.slot, 40);

  // The slot must be a real timestamp in the window the calendar offers
  // (now to 15 days ahead), not any string that starts like a date.
  const slotMs = Date.parse(slot);
  const validSlot = /^\d{4}-\d{2}-\d{2}T/.test(slot) && Number.isFinite(slotMs) && slotMs > Date.now() && slotMs < Date.now() + 15 * 86_400_000;
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !validSlot) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  // Answers from the booking flow: only with consent, only listed options.
  const withAnswers = body.answers !== undefined;
  if (withAnswers && body.consent !== true) {
    return NextResponse.json({ error: "consent_required" }, { status: 400 });
  }
  const answers = withAnswers ? cleanAnswers(body.answers) : null;

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
      title: `Audit call - ${name}`,
      appointmentStatus: "confirmed",
    }),
  });
  if (!apptRes.ok) {
    return NextResponse.json({ error: "slot_taken" }, { status: 409 });
  }

  // 3. One extra call: the answers as a note on the contact. Best effort:
  // the booking already exists, so a failure here is logged, not returned.
  if (answers) {
    try {
      const noteRes = await fetch(`${API}/contacts/${encodeURIComponent(contactId)}/notes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: answersNote(answers) }),
        signal: AbortSignal.timeout(8000),
      });
      if (!noteRes.ok) console.warn("booking note not saved", noteRes.status);
    } catch {
      console.warn("booking note not saved");
    }
  }

  return NextResponse.json({ ok: true });
}
