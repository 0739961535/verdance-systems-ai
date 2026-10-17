/**
 * The offer, in one place. Used by the homepage offer section, the guarantee
 * seals and the audit page.
 *
 * Rules: no prices, no invented numbers, no client names. Every figure here is
 * our own commitment (60 seconds, 10 working days, day 90), not a result.
 */

export const OPERATIONS_MAP = {
  eyebrow: "Step one · free",
  name: "The Operations Map",
  line: "Where your time and money leak, in rand and hours.",
  body: "Thirty minutes with Daniel. We look at how enquiries, follow-ups and admin really run today, and you leave with a map of what is leaking and what to fix first. It is yours to keep, whether or not you work with us.",
  points: [
    "Your reply times, channel by channel",
    "What slow replies and missed follow-ups are likely costing you",
    "The jobs your team could stop doing by hand",
    "A fixed quote, only if the numbers say it pays back",
  ],
  /** A sample of what the map shows. Illustrative, labelled on the page. */
  sample: [
    { where: "WhatsApp after 17:00", today: "Answered next morning" },
    { where: "Quotes sent", today: "Followed up once, if at all" },
    { where: "Monday admin", today: "Half a day, by hand" },
  ],
};

/** Hormozi value levers: dream outcome, likelihood, time, effort. No prices. */
export const REVENUE_TEAM = {
  eyebrow: "Step two · the build",
  name: "The Revenue Team",
  chip: "Live in 10 working days",
  rows: [
    {
      lever: "What changes",
      statement: "Every enquiry answered within 60 seconds. Every follow-up done.",
      accent: "Every follow-up done.",
      proof: "< 60 s",
    },
    {
      lever: "Why it works",
      statement: "Built on your own numbers from the Operations Map. We only propose it if your numbers show at least twice the monthly cost back.",
      proof: "2x back",
    },
    {
      lever: "How fast",
      statement: "Live on your WhatsApp, phone, website and inbox in 10 working days.",
      proof: "10 days",
    },
    {
      lever: "What you do",
      statement: "Approve what matters from one screen. Your team gets its hours back.",
      proof: "1 screen",
    },
  ],
  included: [
    "Answers WhatsApp, calls, website, email and social",
    "Books into your diary, with reminders",
    "Chases every quote until they reply",
    "Hands over to a person the moment it matters",
    "Writes in your voice, in your words",
    "A short report in plain words each month",
  ],
};

export type Guarantee = {
  key: "sixty" | "breakeven";
  n: string;
  name: string;
  ifText: string;
  thenText: string;
};

export const GUARANTEES: Guarantee[] = [
  {
    key: "sixty",
    n: "01",
    name: "The 60-Second Guarantee",
    ifText: "fewer than 99% of your enquiries are answered within 60 seconds in a month",
    thenText: "that month is credited.",
  },
  {
    key: "breakeven",
    n: "02",
    name: "The Break-Even Exit",
    ifText: "the system has not paid for itself by day 90",
    thenText: "you can leave at the day-90 review.",
  },
];
