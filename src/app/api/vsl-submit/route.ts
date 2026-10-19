import { NextResponse } from "next/server";
import { clientIp, clip, tooMany } from "@/lib/api-guard";

/**
 * /api/vsl-submit
 *
 * Server-only handler that takes the VSL application form payload and pushes
 * the contact + tags into the GoHighLevel (LeadConnector) location defined by
 * GHL_PRIVATE_TOKEN / GHL_LOCATION_ID env vars.
 *
 * On duplicate-email, falls back to PUT-updating the existing contact's tags.
 *
 * Never exposes the GHL token to the client.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

type Payload = {
  firstName?: string;
  businessName?: string;
  industry?: string;
  leadVolume?: string;
  pains?: string[];
  urgency?: string;
  email?: string;
  phone?: string;
  notes?: string;
};

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function bad(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

function ghlHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Version: GHL_VERSION,
    Accept: "application/json",
    "Content-Type": "application/json",
  } as const;
}

async function findContactByEmail(
  email: string,
  token: string,
  locationId: string
): Promise<string | null> {
  // GHL v2 search-by-email endpoint
  const url = `${GHL_BASE}/contacts/?locationId=${encodeURIComponent(
    locationId
  )}&query=${encodeURIComponent(email)}`;
  try {
    const r = await fetch(url, { method: "GET", headers: ghlHeaders(token) });
    if (!r.ok) return null;
    const j = (await r.json()) as { contacts?: Array<{ id: string; email?: string }> };
    const match = j.contacts?.find(
      (c) => (c.email || "").toLowerCase() === email.toLowerCase()
    );
    return match?.id ?? null;
  } catch {
    return null;
  }
}

async function updateContactTags(
  contactId: string,
  token: string,
  tags: string[],
  customFields: Array<{ key: string; field_value: string }>
) {
  const url = `${GHL_BASE}/contacts/${contactId}`;
  const r = await fetch(url, {
    method: "PUT",
    headers: ghlHeaders(token),
    body: JSON.stringify({
      tags,
      customFields,
    }),
  });
  return r;
}

export async function POST(req: Request) {
  const token = process.env.GHL_PRIVATE_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  const bookingUrl =
    process.env.NEXT_PUBLIC_GHL_BOOKING_URL ||
    "https://api.leadconnectorhq.com/widget/booking/yLGPT8nNF78G32doGmoW";

  if (!token || !locationId) {
    console.error("[vsl-submit] missing GHL env vars");
    return bad("Server not configured.", 500);
  }

  if (tooMany(`vsl:${clientIp(req)}`, 8, 10 * 60_000)) {
    return bad("Too many submissions. Please try again in a few minutes.", 429);
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
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
  const email = clip(body.email, 160);
  const phone = clip(body.phone, 40);
  const notes = clip(body.notes, 2000);

  // ── Validate required fields ──────────────────────────────────
  const required: Array<[string, string]> = [
    ["firstName", firstName.trim()],
    ["businessName", businessName.trim()],
    ["industry", industry.trim()],
    ["email", email.trim()],
    ["phone", phone.trim()],
  ];
  for (const [k, v] of required) {
    if (!v) return bad(`Missing field: ${k}`);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return bad("Invalid email.");
  }

  // ── Build tags + custom fields ────────────────────────────────
  const tags = [
    "vsl-applicant",
    `industry-${slugify(industry)}`,
    `urgency-${slugify(urgency || "unspecified")}`,
    `volume-${slugify(leadVolume || "unspecified")}`,
  ];

  // GHL v2 uses { key, field_value } pairs for customFields under PUT/POST
  const customFields = [
    { key: "pains", field_value: pains.join(", ") || "" },
    { key: "notes", field_value: notes || "" },
    { key: "vsl_business_name", field_value: businessName || "" },
    { key: "vsl_industry", field_value: industry || "" },
    { key: "vsl_lead_volume", field_value: leadVolume || "" },
    { key: "vsl_urgency", field_value: urgency || "" },
  ];

  const contactBody = {
    firstName: firstName.trim(),
    lastName: businessName.trim(), // per spec - surface business name as last name
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    locationId,
    source: "verdance.systems/apply",
    tags,
    customFields,
  };

  // ── Create contact ────────────────────────────────────────────
  let contactId: string | null = null;
  try {
    const createRes = await fetch(`${GHL_BASE}/contacts/`, {
      method: "POST",
      headers: ghlHeaders(token),
      body: JSON.stringify(contactBody),
    });

    if (createRes.ok) {
      const j = (await createRes.json()) as {
        contact?: { id?: string };
        id?: string;
      };
      contactId = j.contact?.id || j.id || null;
    } else {
      // Duplicate handling: GHL returns 400 with meta.contactId, or sometimes 422.
      const raw = await createRes.text();
      console.warn(
        `[vsl-submit] GHL create failed status=${createRes.status} body=${raw.slice(0, 600)}`
      );

      let parsed: {
        meta?: { contactId?: string };
        contactId?: string;
        message?: string;
      } = {};
      try {
        parsed = JSON.parse(raw);
      } catch {
        /* not json */
      }
      const dupeId = parsed.meta?.contactId || parsed.contactId;

      if (dupeId) {
        contactId = dupeId;
        const upd = await updateContactTags(dupeId, token, tags, customFields);
        if (!upd.ok) {
          const updRaw = await upd.text();
          console.warn(
            `[vsl-submit] GHL update on dupe failed status=${upd.status} body=${updRaw.slice(0, 400)}`
          );
        }
      } else {
        // try lookup-by-email as a fallback
        const found = await findContactByEmail(email.trim(), token, locationId);
        if (found) {
          contactId = found;
          await updateContactTags(found, token, tags, customFields);
        } else {
          return NextResponse.json(
            { ok: false, error: "Could not create contact" },
            { status: 502 }
          );
        }
      }
    }
  } catch (err) {
    console.error("[vsl-submit] GHL fetch error", err);
    return NextResponse.json(
      { ok: false, error: "Network error talking to GHL" },
      { status: 502 }
    );
  }

  // ── Add a note describing the application ─────────────────────
  if (contactId) {
    try {
      const noteBody = [
        `New VSL application from ${firstName} (${businessName})`,
        `Industry: ${industry}`,
        `Lead volume: ${leadVolume}`,
        `Urgency: ${urgency}`,
        `Top pains: ${pains.join(", ") || "-"}`,
        notes ? `Notes: ${notes}` : null,
      ]
        .filter(Boolean)
        .join("\n");
      await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
        method: "POST",
        headers: ghlHeaders(token),
        body: JSON.stringify({ body: noteBody }),
      });
    } catch {
      // non-fatal
    }
  }

  return NextResponse.json(
    {
      ok: true,
      contactId,
      bookingUrl,
    },
    { status: 200 }
  );
}
