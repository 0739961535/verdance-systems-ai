import { NextResponse } from "next/server";
import { clientIp, clip, tooMany } from "@/lib/api-guard";
import { addNote, createAppointment, creds, dryRun, signTicket, upsertContact } from "@/lib/booking-server";
import { bookingNote, cleanSource, cleanTimeTaker, cleanUtms, cleanZone } from "@/components/booking/questions";

/**
 * POST /api/booking/book
 * Books the free call from the site's own booking page. Three questions
 * only: name and business, email and phone (with an optional text and
 * WhatsApp consent tick), and what is taking up the team's time.
 * Upserts the contact in the CRM, creates the appointment on the calendar
 * (the diary of record), then adds the answers as a note (best effort).
 * Returns a short-lived ticket for the optional "help us prepare" step.
 */
export async function POST(req: Request) {
  const c = creds();
  if (!c && !dryRun()) return NextResponse.json({ error: "booking_unavailable" }, { status: 503 });
  if (tooMany(`book:${clientIp(req)}`, 5, 10 * 60_000)) return NextResponse.json({ error: "too_many_requests" }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }
  if (!body || typeof body !== "object") return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  if (clip(body.website, 200)) return NextResponse.json({ ok: true }); // honeypot: a bot filled the hidden field

  const name = clip(body.name, 120);
  const business = clip(body.business, 160);
  const email = clip(body.email, 160);
  const phone = clip(body.phone, 40);
  const slot = clip(body.slot, 40);
  const textConsent = body.textConsent === true;

  // The slot must be a real timestamp in the window the calendar offers.
  const slotMs = Date.parse(slot);
  const validSlot = /^\d{4}-\d{2}-\d{2}T/.test(slot) && Number.isFinite(slotMs) && slotMs > Date.now() && slotMs < Date.now() + 15 * 86_400_000;
  const validPhone = !phone || (phone.replace(/\D/g, "").length >= 9 && /^[+\d\s()-]+$/.test(phone));
  if (name.length < 2 || !business || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !validPhone || !validSlot) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const timeTaker = cleanTimeTaker(body.timeTaker);
  const source = cleanSource(body.source);
  const utms = cleanUtms(body.utm);
  const cr = c ?? { token: "", locationId: "" };

  const contactId = await upsertContact(cr, {
    name,
    email,
    phone,
    business,
    source: "Website booking page",
    tags: ["website-booking", ...(textConsent ? ["sms-whatsapp-consent"] : [])],
  });
  if (!contactId) return NextResponse.json({ error: "booking_failed" }, { status: 502 });

  const booked = await createAppointment(cr, { contactId, slot, title: `Call: ${name} (${business})` });
  if (!booked) return NextResponse.json({ error: "slot_taken" }, { status: 409 });

  const saved = await addNote(cr, contactId, bookingNote({ name, business, slot, textConsent, timeTaker, source, utms, tz: cleanZone(body.tz) }));
  if (!saved) console.warn("booking note not saved");

  return NextResponse.json({ ok: true, ticket: signTicket(contactId), ...(dryRun() ? { dryRun: true } : {}) });
}
