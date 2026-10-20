import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Server side of the site's own booking page (/book and the home #book
 * section). The CRM calendar stays the diary of record, so its reminders
 * and Daniel's calendar keep working, but the visitor only ever sees our
 * page: slots, contact and appointment all go through these helpers.
 *
 * Dry run: BOOKING_DRY_RUN=1 returns made-up slots and fakes every write,
 * so the flow can be tested end to end without touching the real diary.
 * It is opt-in only (never inferred from a missing token), and every
 * response made in dry run says so (dryRun: true).
 */

export const CALENDAR_ID = process.env.GHL_CALENDAR_ID || "yLGPT8nNF78G32doGmoW";
export const TIMEZONE = "Africa/Johannesburg";
const API = "https://services.leadconnectorhq.com";
const DAYS_AHEAD = 14;

export const dryRun = () => process.env.BOOKING_DRY_RUN === "1";

type Creds = { token: string; locationId: string };
export function creds(): Creds | null {
  const token = process.env.GHL_PRIVATE_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  return token && locationId ? { token, locationId } : null;
}

export type Day = { date: string; slots: string[] };

/** Weekday slots, 09:00 to 16:00 SAST every 30 minutes, from tomorrow. Dry run only. */
function fakeDays(): Day[] {
  const out: Day[] = [];
  const now = Date.now();
  for (let d = 1; out.length < 9 && d < 16; d++) {
    const day = new Date(now + d * 86_400_000);
    const date = new Intl.DateTimeFormat("en-CA", { timeZone: TIMEZONE }).format(day);
    const wd = new Date(`${date}T12:00:00Z`).getUTCDay();
    if (wd === 0 || wd === 6) continue;
    const slots: string[] = [];
    for (let h = 9; h < 16; h++) for (const m of ["00", "30"]) if ((h * 7 + d) % 5 !== 0) slots.push(`${date}T${String(h).padStart(2, "0")}:${m}:00+02:00`);
    out.push({ date, slots });
  }
  return out;
}

export async function freeSlots(): Promise<{ days: Day[]; dryRun?: true } | null> {
  if (dryRun()) return { days: fakeDays(), dryRun: true };
  const token = process.env.GHL_PRIVATE_TOKEN;
  if (!token) return null;
  const start = Date.now();
  const end = start + DAYS_AHEAD * 86_400_000;
  const url =
    `${API}/calendars/${CALENDAR_ID}/free-slots` +
    `?startDate=${start}&endDate=${end}&timezone=${encodeURIComponent(TIMEZONE)}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Version: "2021-04-15" },
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  }).catch(() => null);
  if (!res?.ok) return null;
  const data: Record<string, { slots?: string[] }> = await res.json();
  const days = Object.entries(data)
    .filter(([key, v]) => /^\d{4}-\d{2}-\d{2}$/.test(key) && Array.isArray(v?.slots) && v.slots.length > 0)
    .map(([date, v]) => ({ date, slots: v.slots as string[] }))
    .sort((a, b) => a.date.localeCompare(b.date));
  return { days };
}

/** Upsert the contact. Returns its id, or null on failure. */
export async function upsertContact(c: Creds, p: { name: string; email: string; phone?: string; business?: string; source: string; tags?: string[] }): Promise<string | null> {
  if (dryRun()) return `dry_${Date.now().toString(36)}`;
  const [firstName, ...rest] = p.name.split(/\s+/);
  const res = await fetch(`${API}/contacts/upsert`, {
    method: "POST",
    headers: { Authorization: `Bearer ${c.token}`, Version: "2021-07-28", "Content-Type": "application/json" },
    body: JSON.stringify({
      locationId: c.locationId,
      firstName,
      lastName: rest.join(" ") || undefined,
      email: p.email,
      phone: p.phone || undefined,
      companyName: p.business || undefined,
      source: p.source,
      tags: p.tags?.length ? p.tags : undefined,
    }),
    signal: AbortSignal.timeout(10_000),
  }).catch(() => null);
  if (!res?.ok) return null;
  const j = await res.json().catch(() => null);
  return j?.contact?.id ?? null;
}

export async function createAppointment(c: Creds, p: { contactId: string; slot: string; title: string }): Promise<boolean> {
  if (dryRun()) return true;
  const res = await fetch(`${API}/calendars/events/appointments`, {
    method: "POST",
    headers: { Authorization: `Bearer ${c.token}`, Version: "2021-04-15", "Content-Type": "application/json" },
    body: JSON.stringify({
      calendarId: CALENDAR_ID,
      locationId: c.locationId,
      contactId: p.contactId,
      startTime: p.slot,
      title: p.title,
      appointmentStatus: "confirmed",
    }),
    signal: AbortSignal.timeout(10_000),
  }).catch(() => null);
  return !!res?.ok;
}

/** Best effort: a note on the contact. Never throws. */
export async function addNote(c: Creds, contactId: string, body: string): Promise<boolean> {
  if (dryRun()) {
    console.info(`[booking dry run] note for ${contactId}:\n${body}`);
    return true;
  }
  try {
    const res = await fetch(`${API}/contacts/${encodeURIComponent(contactId)}/notes`, {
      method: "POST",
      headers: { Authorization: `Bearer ${c.token}`, Version: "2021-07-28", "Content-Type": "application/json" },
      body: JSON.stringify({ body }),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/* ---------- a short-lived ticket so "help us prepare" can only add to the booking it came from ---------- */

function secret(): string {
  return process.env.BOOKING_SIGNING_SECRET || process.env.GHL_PRIVATE_TOKEN || (dryRun() ? "dry-run-only" : "");
}

export function signTicket(contactId: string, hours = 72): string | null {
  const key = secret();
  if (!key) return null;
  const body = Buffer.from(`${contactId}.${Date.now() + hours * 3_600_000}`).toString("base64url");
  const mac = createHmac("sha256", key).update(body).digest("base64url");
  return `${body}.${mac}`;
}

export function readTicket(ticket: unknown): string | null {
  const key = secret();
  if (!key || typeof ticket !== "string" || ticket.length > 400) return null;
  const [body, mac] = ticket.split(".");
  if (!body || !mac) return null;
  const want = createHmac("sha256", key).update(body).digest();
  const got = Buffer.from(mac, "base64url");
  if (got.length !== want.length || !timingSafeEqual(got, want)) return null;
  const [contactId, exp] = Buffer.from(body, "base64url").toString().split(".");
  if (!contactId || !(Number(exp) > Date.now())) return null;
  return contactId;
}
