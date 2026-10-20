/**
 * The booking questions. Shared by the booking flow (client) and the
 * /api/booking/* routes (server), so the API only ever accepts answers the
 * form can actually send. No "use client": safe on both sides.
 *
 * Before the booking: three questions only (name and business, how to
 * reach you, what is taking up the team's time). After it: an optional
 * "help us prepare" step with the rest (PREPARE).
 */

/** Question 3, before booking: tap any that apply, or write it. */
export const TIME_TAKERS = [
  "Replying to new enquiries",
  "Chasing quotes and follow-ups",
  "After-hours and weekend messages",
  "Order, booking and status questions",
  "Admin and typing things twice",
  "Reports and knowing the numbers",
] as const;

export type TimeTaker = { picks: string[]; other: string };

export type QuestionId = "business" | "team" | "turnover" | "channel" | "volume" | "timeline";

export type Question = {
  id: QuestionId;
  /** The label written on the CRM note. */
  label: string;
  /** The question as the visitor reads it. */
  title: string;
  hint?: string;
  options: readonly string[];
};

/** The optional questions, asked after the call is booked. */
export const PREPARE: readonly Question[] = [
  {
    id: "business",
    label: "Business type",
    title: "What kind of business is it?",
    options: [
      "E-commerce or product brand",
      "Venue, lodge or hotel",
      "Builder or design-build studio",
      "Clinic or practice",
      "Car dealer, travel or showroom",
      "Professional services",
      "Something else",
    ],
  },
  {
    id: "team",
    label: "Team size",
    title: "How many people work in the business?",
    options: ["Just me", "2 to 10", "11 to 50", "51 to 200", "Over 200"],
  },
  {
    id: "turnover",
    label: "Annual turnover",
    title: "Roughly, what is your annual turnover?",
    hint: "A band is enough. It helps us bring the right examples.",
    options: ["Under R5m", "R5m to R15m", "R15m to R50m", "Over R50m", "Prefer not to say"],
  },
  {
    id: "channel",
    label: "Main enquiry channel",
    title: "Where do most enquiries reach you?",
    options: ["WhatsApp", "Email", "Website chat", "Phone", "Walk-ins"],
  },
  {
    id: "volume",
    label: "Enquiries per month",
    title: "How many enquiries come in a month?",
    hint: "Across every channel. A rough guess is fine.",
    options: ["Under 20", "20 to 100", "100 to 500", "500 to 2,000", "Over 2,000"],
  },
  {
    id: "timeline",
    label: "Timeline",
    title: "When would you want something running?",
    options: ["Now", "In 1 to 3 months", "Later, just exploring"],
  },
] as const;

export type Answers = Partial<Record<QuestionId, string>>;

/** Below the target segment: under R5m turnover, or fewer than about 20 enquiries a month. */
export function isLowFit(a: Answers): boolean {
  return a.turnover === "Under R5m" || a.volume === "Under 20";
}

const plain = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, max) : "";

/** Validate the prepare answers: listed options only. */
export function cleanAnswers(raw: unknown): Answers {
  const out: Answers = {};
  if (!raw || typeof raw !== "object") return out;
  const r = raw as Record<string, unknown>;
  for (const q of PREPARE) {
    const v = r[q.id];
    if (typeof v === "string" && q.options.includes(v)) out[q.id] = v;
  }
  return out;
}

export function cleanTimeTaker(raw: unknown): TimeTaker {
  const r = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const picks = Array.isArray(r.picks)
    ? r.picks.filter((p): p is string => typeof p === "string" && (TIME_TAKERS as readonly string[]).includes(p))
    : [];
  return { picks: [...new Set(picks)], other: plain(r.other, 400) };
}

/** Which page or offer sent the visitor (?for=venues), letters and dashes only. */
export function cleanSource(raw: unknown): string {
  return typeof raw === "string" ? raw.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 40) : "";
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
export function cleanUtms(raw: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (!raw || typeof raw !== "object") return out;
  for (const k of UTM_KEYS) {
    const v = plain((raw as Record<string, unknown>)[k], 120);
    if (v) out[k] = v;
  }
  return out;
}

const fmtWhen = (slot: string) => {
  const ms = Date.parse(slot);
  if (!Number.isFinite(ms)) return slot;
  return (
    new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
      timeZone: "Africa/Johannesburg",
    }).format(ms) + " SAST"
  );
};

const timeLine = (t: TimeTaker) => [t.picks.join("; "), t.other].filter(Boolean).join(". ") || "Not answered";

export const TEXT_CONSENT = "Yes, you may text or WhatsApp me about my enquiry. Reply STOP anytime.";

const consentLine = (yes: boolean) =>
  yes
    ? `Text and WhatsApp consent: yes, ticked on the booking page ("${TEXT_CONSENT}")`
    : "Text and WhatsApp consent: not given. Contact by email about this call only.";

/** An IANA time zone name from the browser, or "". */
export function cleanZone(raw: unknown): string {
  if (typeof raw !== "string" || !/^[A-Za-z_]+(\/[A-Za-z0-9_+-]+){0,2}$/.test(raw) || raw.length > 64) return "";
  try {
    new Intl.DateTimeFormat("en-GB", { timeZone: raw });
    return raw;
  } catch {
    return "";
  }
}

const visitorTime = (slot: string, tz: string) => {
  const ms = Date.parse(slot);
  if (!tz || tz === "Africa/Johannesburg" || !Number.isFinite(ms)) return "";
  const f = new Intl.DateTimeFormat("en-GB", { weekday: "long", hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: tz, timeZoneName: "short" });
  return `Their time: ${f.format(ms)} (${tz})`;
};

/** The booking as a plain-text CRM note. */
export function bookingNote(p: {
  name: string;
  business: string;
  slot: string;
  textConsent: boolean;
  timeTaker: TimeTaker;
  source: string;
  utms: Record<string, string>;
  tz?: string;
}): string {
  const lines = [
    "Website booking",
    `Call: ${fmtWhen(p.slot)}`,
    ...(visitorTime(p.slot, p.tz ?? "") ? [visitorTime(p.slot, p.tz ?? "")] : []),
    `Name: ${p.name}`,
    `Business: ${p.business}`,
    `What takes up the team's time: ${timeLine(p.timeTaker)}`,
    consentLine(p.textConsent),
  ];
  if (p.source) lines.push(`Came from: ${p.source}`);
  const tags = Object.entries(p.utms)
    .map(([k, v]) => `${k}=${v}`)
    .join(", ");
  if (tags) lines.push(`Campaign tags: ${tags}`);
  return lines.join("\n");
}

/** The optional prepare answers as a plain-text CRM note. */
export function prepareNote(a: Answers): string {
  const lines = ["Website booking: help us prepare"];
  for (const q of PREPARE) lines.push(`${q.label}: ${a[q.id] ?? "Not answered"}`);
  if (isLowFit(a)) lines.push("Fit: below the target segment (shown the honest note after booking)");
  return lines.join("\n");
}

/** The fallback request (calendar did not load) as a CRM note. */
export function requestNote(p: { name: string; business: string; textConsent: boolean; timeTaker: TimeTaker; source: string }): string {
  return [
    "Website booking request: the calendar did not load. Send this person two or three times.",
    `Name: ${p.name}`,
    `Business: ${p.business}`,
    `What takes up the team's time: ${timeLine(p.timeTaker)}`,
    consentLine(p.textConsent),
    ...(p.source ? [`Came from: ${p.source}`] : []),
  ].join("\n");
}
