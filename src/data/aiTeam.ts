/**
 * "Ashford's Staff" (the AI operations team) - the service page at /services/ai-operations-system,
 * plus "The true power of AI" (full on that page, short on the homepage).
 *
 * Copy rules: plain, confident, understated. No hype words, no em dashes, no
 * exclamation marks, no prices, no client names, no invented statistics.
 * Everything shown in the mockups is labelled as a sample.
 */

export const AI_TEAM_PATH = "/services/ai-operations-system";

export const AI_TEAM = {
  name: "Ashford's Staff",
  eyebrow: "Ashford's Staff · your AI operations team",
  lead:
    "A private team of AI agents that runs the day-to-day of your business alongside you. It answers, researches, drafts, tracks and reports, in plain words. You approve anything that goes out.",
  meta: {
    title: "Ashford's Staff | A private AI operations team for your business | Verdance Systems AI",
    description:
      "A private team of AI agents that answers your inbox, prepares proposals, tracks your pipeline and money, plans your day and reports in plain language. Nothing is sent or spent without your approval. Fixed quote after a free audit.",
  },
};

export const DEPARTMENTS = [
  { name: "Sales", head: "Head of sales", workers: ["Prospect research", "Outreach drafts", "Call briefs and proposals"] },
  { name: "Operations", head: "Head of operations", workers: ["Inbox triage", "Systems watch", "Day planning"] },
  { name: "Client success", head: "Head of client success", workers: ["Reply drafts", "Follow-ups", "Check-ins"] },
  { name: "Finance and tax", head: "Head of finance", workers: ["Money tracking", "Invoices and reminders", "Tax-ready records"] },
  { name: "Marketing and content", head: "Head of marketing", workers: ["Content plan", "Post drafts", "What is working"] },
  { name: "Legal and compliance", head: "Head of compliance", workers: ["Document register", "Renewal reminders", "Policy checks"] },
];

export const CAPABILITIES = [
  { title: "Answers and sorts the inbox", body: "Every message read, sorted and answered or drafted. Only what needs you reaches you." },
  { title: "Watches every system", body: "Checks your tools and accounts around the clock, and alerts you only when it matters." },
  { title: "Researches prospects", body: "Finds the right people, learns about them, and writes outreach in your voice for you to approve." },
  { title: "Drafts replies", body: "Replies to clients and suppliers are ready before you open the thread." },
  { title: "Preps calls and proposals", body: "A one-page brief before every call, and a proposal draft after it." },
  { title: "Plans your day", body: "Builds your day around your calendar and your goals, and moves things when plans change." },
  { title: "Tracks the pipeline and money", body: "Who owes what, which deals are moving, and what cash is coming in." },
  { title: "Plans content", body: "A content calendar from what your customers actually ask, with drafts ready to review." },
  { title: "Keeps compliance documents", body: "Policies, contracts and renewals in one register, with reminders before anything lapses." },
  { title: "Reports in plain language", body: "A short daily and weekly summary: what happened, what it means, what needs a decision." },
];

export const SAFETY = [
  { title: "Nothing goes out without you", body: "No message is sent and no money is spent until you approve it." },
  { title: "Private and encrypted", body: "Your data stays in accounts you own, encrypted, with each agent given only the access it needs." },
  { title: "Budgets capped", body: "Every agent works inside a spending limit you set. It stops at the cap." },
  { title: "Everything logged", body: "Every action is recorded with who did it and why, so you can check any decision later." },
];

export const POWER = {
  title: "The true power of AI",
  intro:
    "Not chatbots and not gimmicks. Staff that never sleeps, never forgets a follow-up and reads everything, doing the work of a team for the cost of a tool. You stay in control of every decision.",
  examples: [
    {
      moment: "21:00",
      title: "An enquiry arrives after hours",
      before: "It waits until morning. By then they have booked someone else.",
      after: "Answered in seconds, questions handled, booked into your diary before they look elsewhere.",
    },
    {
      moment: "Day 3",
      title: "A quote goes out",
      before: "Nobody follows it up. It quietly goes cold.",
      after: "Followed up on day 2, 5 and 9 in your voice, and flagged to you the moment they reply.",
    },
    {
      moment: "Monday",
      title: "The admin pile",
      before: "A whole morning on invoices, inbox and chasing.",
      after: "Done overnight. You start the week with a short list of decisions, not a pile of tasks.",
    },
    {
      moment: "Month end",
      title: "A big decision",
      before: "Made on gut feel, because the numbers live in five places.",
      after: "One page with the pipeline, cash and what is working, written in plain words.",
    },
  ],
};

export const AI_TEAM_FAQS = [
  {
    q: "Will it send things without asking me?",
    a: "No. It drafts, prepares and recommends. Anything that goes to a client, a supplier or the public, and anything that costs money, waits for your approval.",
  },
  {
    q: "What does it cost?",
    a: "Every team is scoped to your business, so we quote after a free audit. The quote is fixed and in writing, and the running costs sit inside a budget cap you set.",
  },
  {
    q: "Do I need to change the tools I use?",
    a: "Usually not. It works with your email, calendar, accounts and the systems you already run. If something needs to change, we tell you in the audit, before you commit.",
  },
  {
    q: "Where does my data go?",
    a: "Into accounts that are yours, encrypted. Access is limited to what each agent needs and every action is logged.",
  },
  {
    q: "Who is it for?",
    a: "Owners who are the bottleneck in their own business: too many messages, too much admin, and decisions made without the numbers. It suits small teams that want to grow without hiring for every new task.",
  },
];
