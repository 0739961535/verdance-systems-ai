/**
 * "Operations Team", the private operations team. Service page at
 * /services/ai-operations-system, plus the "Before / With Verdance" moments
 * (full on that page, short on the homepage and /services).
 *
 * Copy rules: plain, warm, sure. British English. No dashes as punctuation,
 * no exclamation marks, no prices, no client names, no invented statistics.
 * Every demo and scenario on the page is labelled as a sample.
 */

export const AI_TEAM_PATH = "/services/ai-operations-system";

export const AI_TEAM = {
  name: "Operations Team",
  eyebrow: "Operations Team",
  lead:
    "It answers customers, follows up, does the admin and tells you what needs you. You choose: approve every reply, or let routine ones go out on their own. Anything important always waits for you.",
  meta: {
    title: "Operations Team: Replies, Follow-ups, Admin | Verdance",
    description:
      "An Operations Team that answers enquiries, follows up quotes, does the admin and reports back. You choose what goes out. Start with a free Operations Map.",
  },
};

export const CTA_LABEL = "Book a free 30-minute call";
export const CTA_MICRO = "Free 30-minute call. Nothing to sign.";

/* ── Org chart ─────────────────────────────────────────────── */

/**
 * One story across the page: four jobs first (answer, follow up, admin,
 * report), then up to six departments as the business grows.
 */
export const TEAM_STORY = "Four jobs first. Up to six departments as you grow.";

export const DEPARTMENTS = [
  { name: "Sales", head: "Sales lead", workers: ["Enquiry replies", "Quote follow-ups", "Call briefs"] },
  { name: "Operations", head: "Operations lead", workers: ["Inbox sorting", "Order and returns questions", "Day planning"] },
  { name: "Client care", head: "Client care lead", workers: ["Reply drafts", "Check-ins", "Reviews"] },
  { name: "Finance", head: "Finance lead", workers: ["Money tracking", "Invoice reminders", "Tax-ready records"] },
  { name: "Marketing", head: "Marketing lead", workers: ["Content plan", "Post drafts", "What is working"] },
  { name: "Compliance", head: "Compliance lead", workers: ["Document list", "Renewal reminders", "Consent records"] },
] as const;

export type DeptName = (typeof DEPARTMENTS)[number]["name"];

/** The four stops every piece of work makes. Shared by the demo and the bloom diagram. */
export const STAGES = [
  { role: "dept", label: "Department", body: "A team does the work." },
  { role: "review", label: "Checker", body: "Checks every piece before it moves on." },
  { role: "operator", label: "Planner", body: "Turns it into a short plan for you." },
  { role: "attn", label: "Needs you", body: "You approve, change it, or say no." },
] as const;

/* ── Sample command centre ─────────────────────────────────── */

export type DemoItem = {
  id: string;
  title: string;
  /** Generic business type. Never a client name. */
  biz: string;
  dept: DeptName;
  worker: string;
  check: [string, string];
  plan: string;
  /** What the owner sees before approving. */
  draft: string;
};

export const DEMO_ITEMS: DemoItem[] = [
  {
    id: "wedding",
    title: "Wedding date enquiry",
    biz: "Wine estate venue",
    dept: "Sales",
    worker: "Enquiry replies",
    check: ["Date checked in the diary", "Menu options attached"],
    plan: "Hold the date, invite them to view",
    draft: "The 14th is open. Shall I hold it while you come to see the venue?",
  },
  {
    id: "quote",
    title: "Quote follow-up, day 5",
    biz: "Design-build studio",
    dept: "Sales",
    worker: "Quote follow-ups",
    check: ["Answers their question on finishes", "No pressure in the tone"],
    plan: "Send a short check-in, offer a site visit",
    draft: "Happy to walk you through the finishes on site. Would Tuesday suit?",
  },
  {
    id: "reorder",
    title: "Wholesale reorder reply",
    biz: "Product brand",
    dept: "Client care",
    worker: "Reply drafts",
    check: ["Stock and lead time match", "Sounds like you"],
    plan: "Confirm the order, delivery Thursday",
    draft: "Thanks for the reorder. Same as last time, delivered Thursday?",
  },
  {
    id: "invoice",
    title: "Overdue invoice reminder",
    biz: "Product brand",
    dept: "Finance",
    worker: "Invoice reminders",
    check: ["Payment not received yet", "Friendly, first reminder"],
    plan: "Send a polite reminder with the statement",
    draft: "A quick reminder that last month's invoice is open. Statement attached.",
  },
  {
    id: "renewal",
    title: "Supplier contract renewal",
    biz: "Lodge group",
    dept: "Compliance",
    worker: "Renewal reminders",
    check: ["Notice period found", "Terms compared with last year"],
    plan: "Renew for a year, ask about the change",
    draft: "We would like to renew. Can you explain the change on clause 4?",
  },
  {
    id: "consult",
    title: "Consult booking request",
    biz: "Self-pay clinic",
    dept: "Client care",
    worker: "Reply drafts",
    check: ["Consent on file", "No medical advice given"],
    plan: "Offer two consult slots this week",
    draft: "We can see you Wednesday at 10:00 or Friday at 14:30. Which suits?",
  },
  {
    id: "stay",
    title: "After-hours stay enquiry",
    biz: "Boutique lodge",
    dept: "Sales",
    worker: "Enquiry replies",
    check: ["Rooms free on those nights", "Answered within 60 seconds"],
    plan: "Send availability, hold two rooms",
    draft: "Both rooms are free that weekend. Shall I hold them until Monday?",
  },
  {
    id: "returns",
    title: "Returns question",
    biz: "Product brand",
    dept: "Operations",
    worker: "Order and returns queries",
    check: ["Order found", "Inside the return window"],
    plan: "Approve the swap, send the label",
    draft: "No problem. Here is your return label, the new size ships today.",
  },
  {
    id: "content",
    title: "Next week's posts",
    biz: "Wine estate venue",
    dept: "Marketing",
    worker: "Post drafts",
    check: ["Built from what guests asked", "Photos from your library"],
    plan: "Three posts, ready to schedule",
    draft: "Three posts for next week, built from what guests asked this month.",
  },
];

/* ── Capabilities and safety ───────────────────────────────── */

/**
 * "Your Monday": one before-and-after toggle that replaces the old six job
 * cards and the five depth levels. Same rows, two endings. Sample day.
 */
export type MondayRow = { time: string; job: string; before: string; after: string };

export const MONDAY: MondayRow[] = [
  { time: "06:00", job: "Weekend messages", before: "A weekend of WhatsApps and emails waits for you.", after: "All answered in your words. Anything new waits for you." },
  { time: "07:30", job: "Your inbox", before: "You read and sort it yourself.", after: "Sorted, with replies ready to approve." },
  { time: "09:00", job: "Open quotes", before: "Quotes go quiet. Nobody chases them.", after: "Friendly check-ins go out on the right day." },
  { time: "11:00", job: "Order questions", before: "Your team looks up each order by hand.", after: "Answered from your own records." },
  { time: "14:00", job: "Paperwork", before: "Invoices and renewals slip.", after: "Reminders drafted before anything runs out." },
  { time: "17:00", job: "What matters", before: "You guess how the day went.", after: "A short note: what happened, what needs you." },
];

export const MONDAY_SUMMARY = {
  before: "Your day goes on catching up.",
  after: "Your day goes on the work only you can do.",
};

/** How it grows, in one line under the toggle. */
export const GROW_STEPS = ["Answer", "Follow up", "Admin", "Report", "Up to six departments"] as const;

export const SAFETY = [
  { title: "You choose what goes out", body: "Approve every reply, or let routine ones go out on their own. Anything new, and any money spent, waits for you." },
  { title: "Your data stays yours", body: "It lives in accounts you own, locked and private. Each part of the team only sees what it needs." },
  { title: "Everything is written down", body: "Every action is recorded with who did it and why, so you can check it later." },
];

/* ── Before / With Verdance moments ──────────────────────────────── */

export type Moment = {
  stamp: string;
  title: string;
  quote: string;
  before: { clock: string; caption: string; steps: string[]; outcome: string };
  after: { clock: string; caption: string; steps: string[] };
  delta: string;
};

export const MOMENTS: Moment[] = [
  {
    stamp: "SAT 21:14 · WhatsApp",
    title: "An enquiry arrives after hours",
    quote: "Hi, is the 14th of March still open for a wedding?",
    before: { clock: "60 h 26 m", caption: "until a reply", steps: ["21:14 seen", "Mon 09:40 replied"], outcome: "Booked elsewhere" },
    after: { clock: "38 s", caption: "to the first reply", steps: ["21:14:38 answered", "21:16 dates and menus sent", "21:22 viewing booked"] },
    delta: "The date stays booked with you.",
  },
  {
    stamp: "TUE 10:05 · Email",
    title: "A quote goes out",
    quote: "Thanks for the quote. We will look at it and come back to you.",
    before: { clock: "9 days", caption: "of silence", steps: ["Day 1 quote sent", "Day 9 still no follow-up"], outcome: "Went with another builder" },
    after: { clock: "1 day", caption: "to the first follow-up", steps: ["Day 2 friendly check-in", "Day 5 question on finishes answered", "Day 6 site visit booked"] },
    delta: "The job is still yours to win.",
  },
  {
    stamp: "MON 07:30 · Inbox",
    title: "The Monday admin pile",
    quote: "A full inbox, invoices to chase and two supplier questions waiting.",
    before: { clock: "5 h 10 m", caption: "of your morning", steps: ["07:30 opens the inbox", "12:40 still chasing invoices"], outcome: "Morning gone" },
    after: { clock: "12 m", caption: "of your morning", steps: ["06:00 inbox sorted, replies drafted", "06:05 reminders ready to approve", "07:42 approved over coffee"] },
    delta: "Your Monday morning comes back.",
  },
  {
    stamp: "FRI 16:00 · Month end",
    title: "A big decision",
    quote: "Can we afford a second coordinator?",
    before: { clock: "6 h 30 m", caption: "pulling numbers together", steps: ["Numbers in five places", "Spreadsheet until late"], outcome: "Decided on gut feel" },
    after: { clock: "15 m", caption: "to a clear answer", steps: ["16:00 one page ready", "16:04 sales, cash and what is working", "16:15 decided with the numbers"] },
    delta: "A decision made on numbers, not on a hunch.",
  },
];

export const POWER = {
  eyebrow: "Before and after",
  intro: "Four normal moments in a week. What changes is who picks them up, and how fast.",
};

export const AI_TEAM_FAQS = [
  {
    q: "Will it send things without asking me?",
    a: "Only if you want it to. You choose: approve every reply, or let routine ones go out on their own. Anything new to a client, a supplier or the public, and anything that costs money, always waits for your approval.",
  },
  {
    q: "What does it cost?",
    a: "Every team is built for your business, so we give you a price after the free call. The price is fixed and in writing. We only suggest it if your own numbers show it pays for itself.",
  },
  {
    q: "Do I need to change the tools I use?",
    a: "Usually not. It works with your email, WhatsApp, diary and the tools you already use. If something needs to change, we tell you first.",
  },
  {
    q: "Where does my data go?",
    a: "Into accounts that are yours, locked and private. Each part of the team only sees what it needs, and every action is written down.",
  },
  {
    q: "Who is it for?",
    a: "Owners with too many messages, too much admin and not enough time. It suits teams that want to grow without hiring for every new job.",
  },
];
