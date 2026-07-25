export const SITE = {
  name: "Verdance Systems AI",
  shortName: "Verdance",
  email: "daniel@verdancesystemsai.com",
  phone: "+27 73 996 1535",
  location: "Worldwide · Remote-first",
  whatsapp: {
    href: "https://wa.me/27739961535?text=Hi%20Daniel%2C%20I%27d%20like%20to%20know%20more%20about%20Verdance%20Systems%20AI.",
    display: "+27 73 996 1535",
  },
  linkedin: "https://www.linkedin.com/in/daniel-bouwer/",
  ghlBooking: "https://api.leadconnectorhq.com/widget/booking/yLGPT8nNF78G32doGmoW",
  tagline: "Verdance - capture every lead, book every chance.",
};

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Results", href: "/results" },
  { label: "Contact", href: "/contact" },
];

export const INDUSTRIES = [
  "Dental & Healthcare",
  "Real Estate",
  "Fitness",
  "Beauty & Aesthetics",
  "Home Services",
  "Legal & Finance",
  "Automotive",
  "Hospitality",
];

export const PROBLEM_STATS: {
  value: string;
  numeric?: number;
  suffix?: string;
  label: string;
  tone: "green" | "blue" | "pop";
}[] = [
  { value: "20–40%", label: "of enquiries lost", tone: "pop" },
  { value: "£2,000–£4,000", label: "walking away monthly", tone: "blue" },
  { value: "60 sec", numeric: 60, suffix: " sec", label: "our system's response time", tone: "green" },
];

export const HOW_IT_WORKS_STEPS = [
  {
    n: "01",
    title: "We map it out - free.",
    body: "We study how you get and handle leads, then map out exactly what we'd build for you. Free, no obligation.",
  },
  {
    n: "02",
    title: "It goes live in days.",
    body: "We connect your phone, website, and calendar. Nothing for you to learn.",
  },
  {
    n: "03",
    title: "It books customers for you.",
    body: "Every call and enquiry gets answered and booked, 24/7. You show up to the appointment.",
  },
];

export const SERVICES_OVERVIEW = [
  {
    title: "Missed-Revenue Recovery",
    flagship: true,
    blurb:
      "Capture the leads you're losing and turn them into booked appointments - automatically.",
    href: "/services#missed-revenue",
    tone: "pop",
  },
  {
    title: "AI Voice Receptionist",
    flagship: false,
    blurb:
      "Never miss another call. Answers 24/7, handles questions, books appointments.",
    href: "/services#voice",
    tone: "green",
  },
  {
    title: "Website & Chat Assistant",
    flagship: false,
    blurb: "Turn website visitors into booked appointments.",
    href: "/services#website",
    tone: "blue",
  },
  {
    title: "Reputation & Reviews Engine",
    flagship: false,
    blurb: "More 5-star reviews, on autopilot.",
    href: "/services#reviews",
    tone: "green",
  },
  {
    title: "Custom AI Builds",
    flagship: false,
    blurb: "Whatever your business needs, built for you.",
    href: "/services#custom",
    tone: "blue",
  },
] as const;

export const WHY_VERDANCE = [
  { title: "Done for you.", body: "We build, run, and maintain it. No software to learn." },
  { title: "Clear plan first.", body: "We map out exactly what we'd build and what it's worth before you commit to anything." },
  { title: "Always on.", body: "Your system never takes a day off." },
  { title: "Local-business focused.", body: "Built around how real service businesses actually run." },
];

export const CAPABILITY_SUITE = [
  { title: "Website Widget", blurb: "Intelligent chat that captures leads and qualifies prospects in real-time conversations." },
  { title: "Voice Agent", blurb: "Natural-sounding phone calls that handle inquiries and book appointments automatically." },
  { title: "Lead Finder", blurb: "Proactive lead generation that identifies and reaches out to your ideal customers." },
  { title: "Post-Call Messenger", blurb: "Smart follow-ups via SMS and email that nurture leads through your funnel." },
  { title: "CRM Dashboard", blurb: "Complete CRM integration with lead tracking, analytics, and performance insights." },
  { title: "Website Integration", blurb: "Seamless embedding into your existing site, or a complete website rebuild with automation." },
  { title: "Analytics & Optimization", blurb: "Continuous learning system that monitors performance and automatically improves conversion rates." },
  { title: "Smart Scheduler", blurb: "AI-powered booking that syncs with Google Calendar and your CRM - no human input required." },
  { title: "Agent Dashboard", blurb: "See exactly what your AI agents are doing: live conversations, performance metrics, lead progress, engagement insights in one view." },
  { title: "Missed-Call Text-Back", blurb: "Instantly texts back every missed call so the customer books instead of calling a competitor." },
  { title: "Lead Reactivation", blurb: "Re-engages old, gone-quiet leads with a friendly message that brings them back." },
  { title: "Reputation & Reviews Engine", blurb: "Invites happy customers to leave Google reviews; routes unhappy feedback to you privately first." },
];

export const FAQS = [
  { q: "Do I need to be technical?", a: "No. We build and run everything." },
  { q: "Will it change how I work?", a: "No - it works in the background and books into your existing calendar." },
  { q: "Does it sound robotic?", a: "No. Replies are natural and on-brand. You'll hear it on your free consult." },
  { q: "What does it connect to?", a: "Your phone, website, calendar, and lead sources." },
  { q: "Is the consult really free?", a: "Yes - the consult and the plan we map out for you are free. You only pay if you go ahead with the build." },
  { q: "How fast can it go live?", a: "Usually within a few days of onboarding." },
  { q: "Is there a contract?", a: "No long lock-in. Cancel anytime." },
  { q: "Is my data safe?", a: "Yes - best practices, we never share your customer data." },
];
