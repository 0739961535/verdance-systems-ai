export interface PackageItem {
  name: string;
  slug: string;
}

export interface Package {
  id: string;
  name: string;
  tier: number;
  positioning: string;
  tagline: string;
  bestFor: string;
  solves: string;
  products: PackageItem[];
  highlight: string;
  badge?: string;
}

export const packages: Package[] = [
  {
    id: "foundation",
    name: "Foundation",
    tier: 1,
    positioning: "Your digital presence, working for you 24/7.",
    tagline: "Get online. Start capturing. Never miss a lead.",
    bestFor:
      "Businesses with no digital infrastructure who need to get online, capture leads, and automate basic follow-up.",
    solves:
      "You're losing leads because your website doesn't convert, enquiries go unanswered, and bookings require manual back-and-forth.",
    highlight: "Start capturing leads from day one",
    products: [
      { name: "Smart Website", slug: "smart-website" },
      { name: "Website Conversion Widget", slug: "website-conversion-widget" },
      { name: "WhatsApp AI Agent", slug: "whatsapp-ai-agent" },
      { name: "Smart Scheduler", slug: "smart-scheduler" },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tier: 2,
    positioning: "Stop losing leads. Start converting momentum.",
    tagline: "Maximise the leads you're already getting.",
    bestFor:
      "Businesses with existing lead flow who need to maximise conversion and stop leads falling through the cracks.",
    solves:
      "You're getting enquiries but losing them to slow follow-up, no CRM visibility, and no review strategy.",
    highlight: "Everything in Foundation, plus",
    badge: "Most Popular",
    products: [
      { name: "Smart Website", slug: "smart-website" },
      { name: "Website Conversion Widget", slug: "website-conversion-widget" },
      { name: "WhatsApp AI Agent", slug: "whatsapp-ai-agent" },
      { name: "Smart Scheduler", slug: "smart-scheduler" },
      { name: "Lead Reactivation System", slug: "lead-reactivation" },
      { name: "Automated Follow-Up System", slug: "automated-follow-up" },
      { name: "Google Review Automation", slug: "google-review-automation" },
      { name: "CRM & Pipeline Setup", slug: "crm-and-pipeline" },
    ],
  },
  {
    id: "scale",
    name: "Scale",
    tier: 3,
    positioning: "The complete front-of-business growth system.",
    tagline: "Full automation across every client touchpoint.",
    bestFor:
      "Established businesses who want high-performance automation across every channel — from first call to repeat booking.",
    solves:
      "You want every inbound channel handled, every interaction followed up, and full operational visibility — without adding headcount.",
    highlight: "Everything in Growth, plus",
    products: [
      { name: "Smart Website", slug: "smart-website" },
      { name: "Website Conversion Widget", slug: "website-conversion-widget" },
      { name: "WhatsApp AI Agent", slug: "whatsapp-ai-agent" },
      { name: "Smart Scheduler", slug: "smart-scheduler" },
      { name: "Lead Reactivation System", slug: "lead-reactivation" },
      { name: "Automated Follow-Up System", slug: "automated-follow-up" },
      { name: "Google Review Automation", slug: "google-review-automation" },
      { name: "CRM & Pipeline Setup", slug: "crm-and-pipeline" },
      { name: "Voice AI Agent", slug: "voice-ai-agent" },
      { name: "AI Receptionist", slug: "ai-receptionist" },
      { name: "Client Intake Automation", slug: "client-intake-automation" },
      { name: "Post-Interaction Messenger", slug: "post-interaction-messenger" },
    ],
  },
];

export const getPackageById = (id: string): Package | undefined =>
  packages.find((p) => p.id === id);
