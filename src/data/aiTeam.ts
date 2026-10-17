/**
 * "Ashford's Staff", the private operations team. Service page at
 * /services/ai-operations-system, plus the "Before / With AI" moments
 * (full on that page, short on the homepage and /services).
 *
 * Copy rules: plain, warm, sure. British English. No dashes as punctuation,
 * no exclamation marks, no prices, no client names, no invented statistics.
 * Every demo and scenario on the page is labelled as a sample.
 */

export const AI_TEAM_PATH = "/services/ai-operations-system";

export const AI_TEAM = {
  name: "Ashford's Staff",
  eyebrow: "Ashford's Staff",
  lead:
    "It answers enquiries, chases quotes, clears the admin and tells you what needs a decision. Nothing goes out until you say yes.",
  meta: {
    title: "Ashford's Staff | A private team that runs the business alongside you | Verdance Systems AI",
    description:
      "A private team that answers your enquiries, follows up quotes, keeps the admin moving and reports in plain words. Nothing is sent or spent without your approval. Start with a free Operations Map.",
  },
};

export const CTA_LABEL = "Get your free Operations Map";
export const CTA_MICRO = "No sales pitch. You keep the map either way.";

/* ── Org chart ─────────────────────────────────────────────── */

export const DEPARTMENTS = [
  { name: "Sales", head: "Head of sales", workers: ["Enquiry replies", "Quote follow-ups", "Call briefs"] },
  { name: "Operations", head: "Head of operations", workers: ["Inbox sorting", "Order and returns queries", "Day planning"] },
  { name: "Client success", head: "Head of client success", workers: ["Reply drafts", "Check-ins", "Reviews"] },
  { name: "Finance and tax", head: "Head of finance", workers: ["Money tracking", "Invoice reminders", "Tax-ready records"] },
  { name: "Marketing and content", head: "Head of marketing", workers: ["Content plan", "Post drafts", "What is working"] },
  { name: "Legal and compliance", head: "Head of compliance", workers: ["Document register", "Renewal reminders", "Consent records"] },
] as const;

export type DeptName = (typeof DEPARTMENTS)[number]["name"];

/** The four stops every piece of work makes. Shared by the demo and the flow diagram. */
export const STAGES = [
  { role: "dept", label: "Department", body: "A head and its workers do the work." },
  { role: "review", label: "Reviewer", body: "Checks every piece before it moves on." },
  { role: "operator", label: "Operator", body: "Turns it into a short plan for you." },
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
    dept: "Client success",
    worker: "Reply drafts",
    check: ["Stock and lead time match", "Sounds like you"],
    plan: "Confirm the order, delivery Thursday",
    draft: "Thanks for the reorder. Same as last time, delivered Thursday?",
  },
  {
    id: "invoice",
    title: "Overdue invoice reminder",
    biz: "Product brand",
    dept: "Finance and tax",
    worker: "Invoice reminders",
    check: ["Payment not received yet", "Friendly, first reminder"],
    plan: "Send a polite reminder with the statement",
    draft: "A quick reminder that last month's invoice is open. Statement attached.",
  },
  {
    id: "renewal",
    title: "Supplier contract renewal",
    biz: "Lodge group",
    dept: "Legal and compliance",
    worker: "Renewal reminders",
    check: ["Notice period found", "Terms compared with last year"],
    plan: "Renew for a year, ask about the change",
    draft: "We would like to renew. Can you explain the change on clause 4?",
  },
  {
    id: "consult",
    title: "Consult booking request",
    biz: "Self-pay clinic",
    dept: "Client success",
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
    check: ["Rooms free on those nights", "Answered within the minute"],
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
    dept: "Marketing and content",
    worker: "Post drafts",
    check: ["Built from what guests asked", "Photos from your library"],
    plan: "Three posts, ready to schedule",
    draft: "Three posts for next week, built from what guests asked this month.",
  },
];

/* ── Capabilities and safety ───────────────────────────────── */

export const CAPABILITIES = [
  { title: "Answers every enquiry", body: "WhatsApp, email and web forms answered in your voice, day and night, inside the answers you have signed off. Anything new comes to you." },
  { title: "Chases every quote", body: "Friendly follow-ups on the right days, and a nudge to you the moment they reply." },
  { title: "Clears the inbox", body: "Every message read and sorted, with replies drafted before you open the thread." },
  { title: "Handles order and returns questions", body: "Where is my order, can I swap this, when is it back in stock. Answered from your own records." },
  { title: "Preps calls and proposals", body: "A one-page brief before every call, and a proposal draft after it." },
  { title: "Plans your day", body: "Builds the day around your calendar and moves things when plans change." },
  { title: "Tracks the pipeline and money", body: "Who owes what, which deals are moving and what cash is coming in." },
  { title: "Keeps the paperwork current", body: "Contracts, consent records and renewals in one register, with reminders before anything lapses." },
  { title: "Reports in plain words", body: "A short daily and weekly note: what happened, what it means, what needs a decision." },
];

export const SAFETY = [
  { title: "Nothing goes out without you", body: "No message is sent and no money is spent until you approve it." },
  { title: "Your data stays yours", body: "It lives in accounts you own, encrypted, and each part of the team only sees what it needs." },
  { title: "Spending is capped", body: "The team works inside a monthly limit you set. It stops at the cap." },
  { title: "Everything is logged", body: "Every action is recorded with who did it and why, so you can check any decision later." },
];

/* ── Before / With AI moments ──────────────────────────────── */

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
    after: { clock: "15 m", caption: "to a clear answer", steps: ["16:00 one page ready", "16:04 pipeline, cash and what is working", "16:15 decided with the numbers"] },
    delta: "A decision made on numbers, not on a hunch.",
  },
];

export const POWER = {
  eyebrow: "Before and after",
  intro: "Four ordinary moments in a week. The difference is who picks them up, and how fast.",
};

export const AI_TEAM_FAQS = [
  {
    q: "Will it send things without asking me?",
    a: "No. It drafts, prepares and recommends. Anything that goes to a client, a supplier or the public, and anything that costs money, waits for your approval.",
  },
  {
    q: "What does it cost?",
    a: "Every team is scoped to your business, so we quote after your free Operations Map. The quote is fixed and in writing, and we only propose it if your own numbers show it pays for itself.",
  },
  {
    q: "Do I need to change the tools I use?",
    a: "Usually not. It works with your email, WhatsApp, calendar, accounts and the systems you already run. If something needs to change, we tell you on the map, before you commit.",
  },
  {
    q: "Where does my data go?",
    a: "Into accounts that are yours, encrypted. Each part of the team only sees what it needs, and every action is logged.",
  },
  {
    q: "Who is it for?",
    a: "Owners who are the bottleneck in their own business: too many messages, too much admin, and decisions made without the numbers. It suits teams that want to grow without hiring for every new task.",
  },
];
