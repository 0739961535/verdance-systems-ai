/**
 * Landing page data - the Control Room revamp.
 * All visitor-facing copy for the homepage lives here so it can be edited
 * in one place.
 *
 * Rules: no em dashes, never name the CRM vendor.
 *
 * Plain language rule: the reader is a business owner who does not know what
 * AI is and does not care. Write about calls, messages, customers, money and
 * time. Do not write about pipelines, agents, integrations, funnels, stacks,
 * nurture, onboarding, scoring or reactivation. If a plumber would not use
 * the word out loud, it does not go on the page.
 */

export const HERO = {
  eyebrow: "ANSWERING · BOOKING · FOLLOW UP",
  // Headline is rendered in the component so the accent word can be styled.
  lead: "We build the thing that answers your phone, replies to your messages and books people into your calendar. Day or night, in seconds. You own all of it.",
  ctaPrimary: "Book a Meeting",
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
  { time: "13:52", text: "Old customer messaged back", chip: "marketing" },
  { time: "13:47", text: "Quote accepted", chip: "ops", booked: true },
  { time: "13:40", text: "After-hours enquiry answered", chip: "sales" },
];

export const TICKER_ITEMS = [
  "Answers the phone, day or night",
  "Replies to WhatsApp, texts and website messages",
  "Books people straight into your calendar",
  "Chases every enquiry until they answer",
  "Asks for a Google review after every job",
  "Keeps track of every customer without you",
  "Handles the jobs only your business has",
];

export const DELTAS = [
  { label: "Time to answer a new enquiry", before: "4 hours", after: "28 seconds" },
  { label: "Enquiries after closing time", before: "go to voicemail", after: "answered and booked" },
  { label: "Follow-ups on every lead", before: "one, when there's time", after: "twelve, automatic" },
  { label: "Google review requests", before: "hit and miss", after: "after every sale" },
];
export const DELTAS_FOOTNOTE =
  "These are the targets we agree with you on the audit call, and the numbers we report against every month.";

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
    name: "Getting Found",
    icon: "megaphone",
    promise: "More of the right people find you, and more of them get in touch.",
    capabilities: ["Finding new customers", "Google reviews", "Showing up on Google"],
    offers: [
      { name: "Waking Up Old Customers", outcome: "We message the people who went quiet, and book the ones who reply", href: "/services/lead-generation" },
      { name: "Finding New Customers", outcome: "A steady list of people who match the ones you already sell to", href: "/services/lead-generation" },
      { name: "Pages That Get Enquiries", outcome: "Built to make people contact you, not just to look good", href: "/services/lead-generation" },
      { name: "Google Reviews On Autopilot", outcome: "Every customer gets asked, right after you have done the work", href: "/services/reputation-reviews" },
      { name: "Websites and Apps", outcome: "Quick to load, easy to find on Google, built to capture enquiries", href: "/services/websites-build" },
      { name: "Posting Without You", outcome: "Your social media keeps going on the weeks you are flat out", href: "/services/marketing-social" },
    ],
    href: "/services/lead-generation",
  },
  {
    index: "02",
    slug: "sales",
    name: "Answering and Booking",
    icon: "message-circle",
    promise: "Every call and message answered in seconds, at any hour, and booked in.",
    capabilities: ["Answering messages", "Answering the phone", "Booking and chasing"],
    offers: [
      { name: "WhatsApp and Texts", outcome: "Replies in seconds, and works out what they need while it chats", href: "/services/conversation-ai" },
      { name: "Chat On Your Website", outcome: "Talks to people while they are still on the page, and books them", href: "/services/conversation-ai" },
      { name: "Answering The Phone", outcome: "Picks up every call, at any hour, and sounds like a person", href: "/services/voice-ai" },
      { name: "A Receptionist That Never Sleeps", outcome: "Answers, takes the details, books the job, tells you about it", href: "/products/ai-receptionist" },
      { name: "Booking Into Your Calendar", outcome: "Straight into your diary, with none of the back and forth", href: "/services/booking-calendar" },
      { name: "Chasing Every Enquiry", outcome: "Twelve follow-ups each, and it stops the moment they reply", href: "/services/follow-up-nurture" },
    ],
    href: "/services/conversation-ai",
  },
  {
    index: "03",
    slug: "operations",
    name: "Running The Business",
    icon: "settings-2",
    promise: "The admin does itself. Records, invoices, and knowing where you stand.",
    capabilities: ["Keeping customer records", "Invoices and payments", "Knowing your numbers"],
    offers: [
      { name: "One Place For Every Customer", outcome: "Every call, message and job filed against the right name, by itself", href: "/services/crm-pipeline" },
      { name: "Seeing Every Job", outcome: "All of them in one view, with the keenest customers at the top", href: "/services/crm-pipeline" },
      { name: "Invoices and Chasing", outcome: "Sent the moment the work is done, then chased until they pay", href: "/services/payments-invoicing" },
      { name: "Your Numbers In One Place", outcome: "How many called, how many booked, and what it was worth", href: "/services/analytics-compliance" },
      { name: "An Assistant For Your Team", outcome: "Answers your staff's questions out of your own files, instantly", href: "/services/crm-pipeline" },
    ],
    href: "/services/crm-pipeline",
  },
  {
    index: "04",
    slug: "automations",
    name: "The Custom Work",
    icon: "workflow",
    promise: "The jobs only your business has, done without anyone doing them.",
    capabilities: ["One off builds", "Connecting your tools", "Removing repeat work"],
    offers: [
      { name: "Built For Your Job", outcome: "For the work nobody else does the way you do it", href: "/services/custom-builds" },
      { name: "Connecting What You Already Use", outcome: "Your existing tools passing information to each other, safely", href: "/services/custom-builds" },
      { name: "Signing Up New Customers", outcome: "From first message to paperwork done, without the admin", href: "/products/client-intake-automation" },
      { name: "Killing The Busywork", outcome: "The copying and pasting between your tools, gone", href: "/services/custom-builds" },
    ],
    href: "/services/custom-builds",
  },
];

export const PROCESS = [
  {
    n: "01",
    name: "Audit",
    desc: "A 30 minute call. We work out where you are losing the most money, and what to fix first.",
    meta: "Week 0 · you get: a plan, in order",
  },
  {
    n: "02",
    name: "Blueprint",
    desc: "We write down exactly what gets built and what it will do, before anyone starts building.",
    meta: "Week 1 · you get: the written plan and a fixed price",
  },
  {
    n: "03",
    name: "Build",
    desc: "We build it, then test it against that plan line by line.",
    meta: "Weeks 2-3 · you get: something you can try before it goes live",
  },
  {
    n: "04",
    name: "Connect",
    desc: "We hook it up to your phone, your calendar, and wherever your customers message you.",
    meta: "you get: everything talking to everything",
  },
  {
    n: "05",
    name: "Launch",
    desc: "It goes live on the date written into your contract, and we train your team to use it.",
    meta: "you get: a launch date in the contract",
  },
  {
    n: "06",
    name: "Run and improve",
    desc: "We watch it, keep improving it, and send you the numbers every month.",
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
  eyebrow: "FREE · 30 MINUTES",
  title: "The Free Audit Call",
  checklist: [
    "Where you are losing customers right now",
    "What to fix first, second and third. Yours to keep.",
    "A fixed price, if you want us to build it",
  ],
  microcopy: "Free, and there is nothing to sign. The plan is yours to keep either way.",
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
    q: "What happens on the free audit call?",
    a: "Thirty minutes on a video call. We go through how enquiries, follow-up and admin actually work in your business today, find where you are losing the most, and leave you with a list of what to fix in order. It's yours to keep whether or not we build anything.",
  },
  {
    q: "What does it cost?",
    a: "The call is free. If you want us to build, you get a fixed price with the written plan, agreed before any work starts. The price on the quote is the price you pay.",
  },
  {
    q: "How long until it's working?",
    a: "Most builds go live two to four weeks after the plan is signed off. Your contract includes the launch date, and we build in stages so you see it working early, not at the end.",
  },
  {
    q: "Who owns it once it's built?",
    a: "You do. Every account, automation and piece of data is set up in your name from day one. If we part ways, everything keeps working and stays yours.",
  },
  {
    q: "We already have a system for our customers. Do we have to switch?",
    a: "No. We connect to what you run today where that's the right call, and only suggest moving if it genuinely pays for itself. Working out that trade-off is exactly what the audit call is for.",
  },
  {
    q: "What happens to our data?",
    a: "It lives in your own accounts, not ours. We give everything the least access it needs to work, use your systems' own permissions, and hand over every login at launch.",
  },
  {
    q: "I don't really understand AI. Is that a problem?",
    a: "No, and you don't need to. You'll never touch it. It answers your phone and your messages, books people in, and tells you what it did. If anything ever needs a decision, it comes to you in plain English.",
  },
];
