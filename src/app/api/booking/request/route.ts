import { NextResponse } from "next/server";
import { clientIp, clip, tooMany } from "@/lib/api-guard";
import { addNote, creds, dryRun, upsertContact } from "@/lib/booking-server";
import { cleanSource, cleanTimeTaker, requestNote } from "@/components/booking/questions";

/**
 * POST /api/booking/request
 * The fallback when the live calendar cannot load: the visitor leaves
 * their details and we send them times. Lands on the CRM as a contact with
 * a "booking-request" tag and a note, so it is followed up like a booking.
 */
export async function POST(req: Request) {
  const c = creds();
  if (!c && !dryRun()) return NextResponse.json({ error: "booking_unavailable" }, { status: 503 });
  if (tooMany(`req:${clientIp(req)}`, 4, 10 * 60_000)) return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }
  if (!body || typeof body !== "object") return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  if (clip(body.website, 200)) return NextResponse.json({ ok: true });
  const name = clip(body.name, 120);
  const business = clip(body.business, 160);
  const email = clip(body.email, 160);
  const phone = clip(body.phone, 40);
  const textConsent = body.textConsent === true;
  if (name.length < 2 || !business || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  const cr = c ?? { token: "", locationId: "" };
  const contactId = await upsertContact(cr, {
    name,
    email,
    phone,
    business,
    source: "Website booking page (calendar did not load)",
    tags: ["booking-request", ...(textConsent ? ["sms-whatsapp-consent"] : [])],
  });
  if (!contactId) return NextResponse.json({ error: "booking_failed" }, { status: 502 });
  await addNote(cr, contactId, requestNote({ name, business, textConsent, timeTaker: cleanTimeTaker(body.timeTaker), source: cleanSource(body.source) }));
  return NextResponse.json({ ok: true, ...(dryRun() ? { dryRun: true } : {}) });
}
