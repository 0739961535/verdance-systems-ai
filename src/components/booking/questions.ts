/**
 * The booking questions. Shared by the booking flow (client) and
 * POST /api/booking/book (server), so the API only ever accepts answers
 * that the form can actually send. No "use client": safe on both sides.
 */

export type QuestionId = "business" | "team" | "turnover" | "channel" | "volume" | "leak" | "timeline";

export type Question = {
  id: QuestionId;
  /** The label written on the CRM note. */
  label: string;
  /** The question as the visitor reads it. */
  title: string;
  hint?: string;
  options: readonly string[];
  /** The option that opens a short text field. */
  other?: string;
};

export const QUESTIONS: readonly Question[] = [
  {
    id: "business",
    label: "Business type",
    title: "What kind of business do you run?",
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
    hint: "A band is enough. It helps us prepare the right examples.",
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
    id: "leak",
    label: "Biggest leak",
    title: "Where does the most time or money slip away?",
    options: [
      "Slow replies to new enquiries",
      "Quotes and leads nobody follows up",
      "After-hours and weekend enquiries",
      "Admin eating the team's day",
      "Order, booking and status questions",
      "Something else",
    ],
    other: "Something else",
  },
  {
    id: "timeline",
    label: "Timeline",
    title: "When would you want something running?",
    options: ["Now", "In 1 to 3 months", "Later, just exploring"],
  },
] as const;

export type Answers = Partial<Record<QuestionId, string>> & { leakOther?: string };

/** Below the target segment: under R5m turnover, or fewer than about 20 enquiries a month. */
export function isLowFit(a: Answers): boolean {
  return a.turnover === "Under R5m" || a.volume === "Under 20";
}

/**
 * Validate answers sent to the API: every value must be one of the listed
 * options, and the free text is clipped. Unknown or missing values are
 * dropped, never trusted.
 */
export function cleanAnswers(raw: unknown): Answers {
  const out: Answers = {};
  if (!raw || typeof raw !== "object") return out;
  const r = raw as Record<string, unknown>;
  for (const q of QUESTIONS) {
    const v = r[q.id];
    if (typeof v === "string" && q.options.includes(v)) out[q.id] = v;
  }
  if (out.leak === "Something else" && typeof r.leakOther === "string") {
    // plain text only: strip control characters and angle brackets
    const t = r.leakOther.replace(/[\u0000-\u001f\u007f<>]/g, " ").trim().slice(0, 200);
    if (t) out.leakOther = t;
  }
  return out;
}

/** The answers as a plain-text CRM note. */
export function answersNote(a: Answers): string {
  const lines = ["Website booking answers"];
  for (const q of QUESTIONS) {
    let v = a[q.id] ?? "Not answered";
    if (q.id === "leak" && a.leakOther) v = `${v}: ${a.leakOther}`;
    lines.push(`${q.label}: ${v}`);
  }
  if (isLowFit(a)) lines.push("Fit: below the target segment (shown the honest note, chose to book)");
  lines.push("Consent: agreed to be contacted about this call and to these answers being stored");
  return lines.join("\n");
}
