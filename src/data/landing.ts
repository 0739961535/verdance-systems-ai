/**
 * Landing page data - the Control Room revamp.
 * All visitor-facing copy for the homepage lives here so it can be edited
 * in one place. Rules: no em dashes, never name the CRM vendor.
 */

export const HERO = {
  eyebrow: "AI SYSTEMS AGENCY",
  // Headline is rendered in the component so the accent word can be styled.
  lead: "Marketing, sales, operations and automation systems, designed, built and run for you. You own everything we build.",
  ctaPrimary: "Book your AI Systems Audit",
  ctaWhatsApp: "WhatsApp us",
};

/** Simulated dashboard - stat tiles and the event feed. */
export const DASH_STATS = [
  { label: "Leads today", value: 47, suffix: "", up: true },
  { label: "Response", value: 28, suffix: "s", up: false },
  { label: "Calls booked", value: 9, suffix: "", up: true },
];

// Keep each `text` short (~20-28 chars) so a feed row never outgrows the
// panel on a phone. The row is time + message + (chip, hidden on mobile);
// long copy here forces the panel's min-content wider than a 375px viewport.
export const DASH_EVENTS: { time: string; text: string; chip: string; booked?: boolean }[] = [
  { time: "14:32", text: "WhatsApp lead replied in 24s", chip: "sales" },
  { time: "14:29", text: "Call booked: Thu 10:00", chip: "booking", booked: true },
  { time: "14:21", text: "Review request sent", chip: "marketing" },
  { time: "14:14", text: "Invoice chased, link re-sent", chip: "ops" },
  { time: "13:58", text: "Missed call answered", chip: "sales" },
  { time: "13:52", text: "Old lead re-engaged", chip: "marketing" },
  { time: "13:47", text: "Quote accepted", chip: "ops", booked: true },
  { time: "13:40", text: "After-hours enquiry answered", chip: "sales" },
];

export const TICKER_ITEMS = [
  "Conversation AI on every channel",
  "Voice agents answering 24/7",
  "CRM and pipelines that run themselves",
  "Google reviews on autopilot",
  "Custom AI agents and integrations",
  "Follow-up that never forgets",
  "Booking without back-and-forth",
];

export const DELTAS = [
  { label: "Time to answer a new enquiry", before: "4 hours", after: "28 seconds" },
  { label: "Enquiries after closing time", before: "go to voicemail", after: "answered and booked" },
  { label: "Follow-ups on every lead", before: "one, when there's time", after: "twelve, automatic" },
  { label: "Google review requests", before: "hit and miss", after: "after every sale" },
];
export const DELTAS_FOOTNOTE =
  "Typical performance targets, agreed together on your audit call.";

export interface PillarOffer {
  name: string;
  outcome: string;
  href: string;
}

export interface Pillar {
  index: string;
  slug: string;
  name: string;
  icon: "megaphone" | "message-circle" | "settings-2" | "workflow";
  promise: string;
  capabilities: string[];
  offers: PillarOffer[];
  href: string;
}

export const PILLARS: Pillar[] = [
  {
    index: "01",
    slug: "marketing",
    name: "Marketing",
    icon: "megaphone",
    promise: "Systems that fill your pipeline and keep your name everywhere.",
    capabilities: ["Lead generation", "Reviews & reputation", "SEO & content"],
    offers: [
      { name: "Database Reactivation", outcome: "Wakes up old leads and books them in", href: "/services/lead-generation" },
      { name: "Lead Finder & Scraper", outcome: "A steady feed of your ideal customers", href: "/services/lead-generation" },
      { name: "Landing Pages & Funnels", outcome: "Pages built to convert, not decorate", href: "/services/lead-generation" },
      { name: "Google Review Engine", outcome: "Reviews asked for after every sale, automatically", href: "/services/reputation-reviews" },
      { name: "Websites & Custom Apps", outcome: "Fast, search-ready sites and apps with capture built in", href: "/services/websites-build" },
      { name: "Social & Content Systems", outcome: "A publishing rhythm that runs without you", href: "/services/marketing-social" },
    ],
    href: "/services/lead-generation",
  },
  {
    index: "02",
    slug: "sales",
    name: "Sales",
    icon: "message-circle",
    promise: "Every enquiry answered in seconds, on every channel, and booked.",
    capabilities: ["Conversation AI", "Voice agents", "Booking & follow-up"],
    offers: [
      { name: "WhatsApp & SMS AI", outcome: "Replies in seconds, qualifies while it chats", href: "/services/conversation-ai" },
      { name: "Website Chat Widget", outcome: "Turns visitors into booked conversations", href: "/services/conversation-ai" },
      { name: "Voice AI Agents", outcome: "Inbound and outbound calls, handled naturally", href: "/services/voice-ai" },
      { name: "AI Receptionist", outcome: "Every call answered, every sale booked", href: "/products/ai-receptionist" },
      { name: "Smart Scheduler", outcome: "Booking synced to your calendar, no back-and-forth", href: "/services/booking-calendar" },
      { name: "Follow-up & Nurture", outcome: "Twelve touches per lead without lifting a finger", href: "/services/follow-up-nurture" },
    ],
    href: "/services/conversation-ai",
  },
  {
    index: "03",
    slug: "operations",
    name: "Internal Operations",
    icon: "settings-2",
    promise: "Your pipeline, payments and reporting run themselves.",
    capabilities: ["CRM & pipelines", "Payments & invoicing", "Dashboards"],
    offers: [
      { name: "Customised CRM", outcome: "One system of record, set up around how you sell", href: "/services/crm-pipeline" },
      { name: "Pipelines & Lead Scoring", outcome: "Every deal visible, hot leads surfaced first", href: "/services/crm-pipeline" },
      { name: "Payments & Invoicing", outcome: "Invoices sent and chased without you", href: "/services/payments-invoicing" },
      { name: "Tracking Dashboards", outcome: "The numbers that matter, live in one view", href: "/services/analytics-compliance" },
      { name: "Internal AI Assistant", outcome: "Your team's questions answered from your own data", href: "/services/crm-pipeline" },
    ],
    href: "/services/crm-pipeline",
  },
  {
    index: "04",
    slug: "automations",
    name: "Automations",
    icon: "workflow",
    promise: "Custom agents and integrations that connect everything you run.",
    capabilities: ["Custom AI agents", "MCP integrations", "Workflow automation"],
    offers: [
      { name: "Custom AI Agents", outcome: "Agents built for the work only your business has", href: "/services/custom-builds" },
      { name: "MCP Server Integrations", outcome: "Your tools wired into AI, safely", href: "/services/custom-builds" },
      { name: "Client Intake Automation", outcome: "From enquiry to onboarded without admin", href: "/products/client-intake-automation" },
      { name: "Workflow Automation", outcome: "The busywork between your tools, gone", href: "/services/custom-builds" },
    ],
    href: "/services/custom-builds",
  },
];

export const PROCESS = [
  {
    n: "01",
    name: "Audit",
    desc: "A 30-minute call mapping where AI pays back fastest in your business.",
    meta: "Week 0 · you get: a prioritised roadmap",
  },
  {
    n: "02",
    name: "Blueprint",
    desc: "We spec the exact systems, integrations and outcomes before anything is built.",
    meta: "Week 1 · you get: system blueprint + fixed quote",
  },
  {
    n: "03",
    name: "Build",
    desc: "Your systems assembled and tested against the blueprint.",
    meta: "Weeks 2–3 · you get: working systems in staging",
  },
  {
    n: "04",
    name: "Integrate",
    desc: "Wired into your CRM, calendar, phone lines and channels.",
    meta: "you get: one connected stack",
  },
  {
    n: "05",
    name: "Launch",
    desc: "Live on a date agreed in writing, with your team trained.",
    meta: "you get: a launch date in the contract",
  },
  {
    n: "06",
    name: "Run & optimise",
    desc: "We monitor, tune and report. The system gets better every month.",
    meta: "monthly · you get: a performance report",
  },
];

export const GUARANTEE = {
  eyebrow: "OUR COMMITMENT",
  columns: [
    {
      n: "01",
      label: "Fixed quote",
      text: "The price is agreed in writing before any work begins, and it does not change.",
    },
    {
      n: "02",
      label: "Fixed launch date",
      text: "Your go-live date is part of the contract, with visible progress every week.",
    },
    {
      n: "03",
      label: "Full ownership",
      text: "Every account, agent and automation is registered in your name from day one.",
    },
  ],
};

export const AUDIT = {
  eyebrow: "COMPLIMENTARY · 30 MINUTES",
  title: "The AI Systems Audit",
  checklist: [
    "A map of where AI pays back fastest in your business",
    "A prioritised system roadmap, yours to keep",
    "A fixed quote if you want us to build it",
  ],
  microcopy: "A complimentary consultation with no obligation. The roadmap is yours to keep either way.",
  aiChips: [
    {
      label: "ChatGPT",
      href: "https://chatgpt.com/?q=What%20does%20Verdance%20Systems%20AI%20do%20and%20what%20are%20their%20service%20pillars%3F",
    },
    {
      label: "Claude",
      href: "https://claude.ai/new?q=What%20does%20Verdance%20Systems%20AI%20do%20and%20what%20are%20their%20service%20pillars%3F",
    },
    {
      label: "Perplexity",
      href: "https://www.perplexity.ai/search?q=What%20does%20Verdance%20Systems%20AI%20do%20and%20what%20are%20their%20service%20pillars%3F",
    },
  ],
};

export const LANDING_FAQS = [
  {
    q: "What happens on the AI Systems Audit call?",
    a: "Thirty minutes on a video call. We map how enquiries, follow-up and admin flow through your business today, find where AI pays back fastest, and leave you with a prioritised roadmap. It's yours to keep whether or not we build anything.",
  },
  {
    q: "What does it cost?",
    a: "The audit is free. If you want us to build, you get a fixed quote with the blueprint, agreed before any work starts. The price on the quote is the price you pay.",
  },
  {
    q: "How long until my systems are live?",
    a: "Most builds go live in two to four weeks from the blueprint. Your contract includes the launch date, and we build in stages so you see working systems early, not at the end.",
  },
  {
    q: "Who owns the system once it's built?",
    a: "You do. Accounts, AI agents, automations and data are set up in your name from day one. If we part ways, everything keeps working and stays yours.",
  },
  {
    q: "We already have a CRM. Do we have to switch?",
    a: "No. We integrate with what you run today where that's the right call, and only recommend moving if it genuinely pays for itself. That trade-off is exactly what the audit works out.",
  },
  {
    q: "How is our data handled?",
    a: "Your data lives in your own accounts, not ours. We follow least-access principles, use your systems' native permissions, and hand over all credentials at launch.",
  },
];
