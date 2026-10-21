/**
 * Server side of the site's own booking page (/book and the home #book
 * section) and the /apply form. The CRM calendar stays the diary of record,
 * but the site no longer talks to the CRM itself: every call goes to
 * Ashford's public booking endpoints, which write to Verdance's own CRM
 * location with Ashford's credentials. The site holds no CRM token.
 *
 * Ashford re-checks the slot is free, keeps the calendar fixed, and limits
 * how often each visitor and email can book. The site keeps its own checks
 * and limits on top.
 *
 * Dry run: BOOKING_DRY_RUN=1 returns made-up slots and fakes every write,
 * so the flow can be tested end to end without touching the real diary.
 * It is opt-in only, and every response made in dry run says so.
 */

export const TIMEZONE = "Africa/Johannesburg";
const ASHFORD = (process.env.ASHFORD_BASE_URL || "https://ashford-brown.vercel.app").replace(/\/+$/, "");

export const dryRun = () => process.env.BOOKING_DRY_RUN === "1";

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

type Reply = { status: number; body: Record<string, unknown> };

/** One call to Ashford. Never throws: a network failure is status 0. */
async function ashford(path: string, body?: unknown): Promise<Reply> {
  try {
    const res = await fetch(`${ASHFORD}/api/public/booking/${path}`, {
      method: body === undefined ? "GET" : "POST",
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(25_000),
    });
    const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (!res.ok) console.error(`[booking] ashford ${path} ${res.status} ${String(json.error ?? "")}`.slice(0, 200));
    return { status: res.status, body: json };
  } catch (err) {
    console.error(`[booking] ashford ${path} request failed: ${err instanceof Error ? err.name : "error"}`);
    return { status: 0, body: {} };
  }
}

export async function freeSlots(): Promise<{ days: Day[]; dryRun?: true } | null> {
  if (dryRun()) return { days: fakeDays(), dryRun: true };
  const r = await ashford("slots");
  return r.status === 200 && Array.isArray(r.body.days) ? { days: r.body.days as Day[] } : null;
}

type Lead = { name: string; business: string; email: string; phone?: string; source: string; tags: string[]; note: string };

export type BookResult = { ok: true; ticket: string | null; pending?: true } | { ok: false; taken: boolean };

/** Books the slot through Ashford. "taken" only on a real conflict. */
export async function book(p: Lead & { slot: string }): Promise<BookResult> {
  if (dryRun()) {
    console.info(`[booking dry run] book ${p.slot}:\n${p.note}`);
    return { ok: true, ticket: "dry-run" };
  }
  const r = await ashford("book", p);
  if (r.status === 409) return { ok: false, taken: true };
  if (r.status !== 200 || r.body.ok !== true) return { ok: false, taken: false };
  const ticket = typeof r.body.ticket === "string" ? r.body.ticket : null;
  return r.body.pending === true ? { ok: true, ticket, pending: true } : { ok: true, ticket };
}

/** A lead without a booked time (the calendar fallback, /apply). */
export async function saveLead(p: Lead): Promise<boolean> {
  if (dryRun()) {
    console.info(`[booking dry run] lead (${p.source}):\n${p.note}`);
    return true;
  }
  const r = await ashford("request", p);
  return r.status === 200 && r.body.ok === true;
}

/** The "help us prepare" answers, only onto the booking the ticket came from. */
export async function prepare(ticket: unknown, note: string): Promise<"ok" | "invalid_ticket" | "not_saved"> {
  if (dryRun()) return ticket === "dry-run" ? "ok" : "invalid_ticket";
  if (typeof ticket !== "string" || !ticket || ticket.length > 400) return "invalid_ticket";
  const r = await ashford("prepare", { ticket, note });
  if (r.status === 403) return "invalid_ticket";
  return r.status === 200 ? "ok" : "not_saved";
}
