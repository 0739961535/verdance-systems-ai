import { NextResponse } from "next/server";
import { clientIp, clip, tooMany } from "@/lib/api-guard";
import { saveLead } from "@/lib/booking-server";

/**
 * /api/vsl-submit
 *
 * Server-only handler for the /apply form. The contact, its tags and a note
 * with the answers go to the CRM through Ashford's public booking endpoint
 * (src/lib/booking-server.ts), so they land in Verdance's own location.
 * The site holds no CRM token.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
}

function bad(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request) {
  const bookingUrl = process.env.NEXT_PUBLIC_GHL_BOOKING_URL || "https://api.leadconnectorhq.com/widget/booking/yLGPT8nNF78G32doGmoW";

  if (tooMany(`vsl:${clientIp(req)}`, 8, 10 * 60_000)) {
    return bad("Too many submissions. Please try again in a few minutes.", 429);
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return bad("Invalid JSON body.");
  }
  if (!body || typeof body !== "object") return bad("Invalid JSON body.");

  // Everything is coerced to a capped string: the body is untrusted, and the
  // values end up in the CRM and in a note.
  const firstName = clip(body.firstName, 80);
  const businessName = clip(body.businessName, 160);
  const industry = clip(body.industry, 80);
  const leadVolume = clip(body.leadVolume, 80);
  const pains = (Array.isArray(body.pains) ? body.pains : []).slice(0, 12).map((p) => clip(p, 80)).filter(Boolean);
  const urgency = clip(body.urgency, 80);
  const email = clip(body.email, 160).toLowerCase();
  const phone = clip(body.phone, 40);
  const notes = clip(body.notes, 2000);

  const required: Array<[string, string]> = [
    ["firstName", firstName],
    ["businessName", businessName],
    ["industry", industry],
    ["email", email],
    ["phone", phone],
  ];
  for (const [k, v] of required) {
    if (!v) return bad(`Missing field: ${k}`);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad("Invalid email.");

  const note = [
    `New VSL application from ${firstName} (${businessName})`,
    `Industry: ${industry}`,
    `Lead volume: ${leadVolume || "-"}`,
    `Urgency: ${urgency || "-"}`,
    `Top pains: ${pains.join(", ") || "-"}`,
    notes ? `Notes: ${notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const saved = await saveLead({
    name: firstName,
    business: businessName,
    email,
    phone,
    source: "verdance.systems/apply",
    tags: ["vsl-applicant", `industry-${slugify(industry) || "unspecified"}`, `urgency-${slugify(urgency) || "unspecified"}`, `volume-${slugify(leadVolume) || "unspecified"}`],
    note,
  });
  if (!saved) return NextResponse.json({ ok: false, error: "Could not submit application." }, { status: 502 });

  return NextResponse.json({ ok: true, bookingUrl }, { status: 200 });
}
