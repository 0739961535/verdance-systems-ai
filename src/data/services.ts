/**
 * Verdance Systems AI · Service Taxonomy
 * 12 top-level categories. Each one has its own /services/[slug] sub-page
 * with the full sub-product detail and an embedded motion demo.
 *
 * NB: `demoKey` is a string. The dynamic page maps demoKey → React component
 * at render time so this file stays serialisable + data-only.
 */

export type SubProduct = {
  name: string;
  description: string;
  howItWorks: string[];
};

export type ServiceCategory = {
  slug: string;
  number: string;
  name: string;
  eyebrow: string;
  headline: string;
  italicWord: string;
  promise: string;
  bullets: string[];
  subProducts: SubProduct[];
  whyItMatters: string;
  outcome: string;
  demoKey: string;
  relatedSlugs: string[];
  ctaCopy: string;
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  // 1
  {
    slug: "lead-generation",
    number: "01",
    name: "Lead Generation & Capture",
    eyebrow: "Lead Generation & Capture",
    headline: "Fill the top of the funnel -",
    italicWord: "before competitors do.",
    promise:
      "Scrape, find, capture, and reactivate every potential customer for your business - on every channel that matters.",
    bullets: [
      "Lead Scraper · Google Maps + niche directories",
      "Lead Finder · enriched B2C & B2B lists",
      "Website Forms · short, conversion-tuned",
      "Landing Pages · built for paid traffic",
      "Funnels · multi-step opt-ins",
      "Surveys & Quiz · qualify on the way in",
      "QR Capture · print + in-person",
      "Database Reactivation · revive dormant leads",
    ],
    subProducts: [
      {
        name: "Database Reactivation (flagship opener)",
        description:
          "Re-engage old leads sitting in your CRM with a friendly, on-brand message. Brings forgotten money back to life.",
        howItWorks: [
          "Import your existing contact list (CSV, CRM, Sheets)",
          "AI writes a personalised outreach in your voice",
          "Replies route into the unified inbox + AI qualifier",
          "Booked appointments drop into your calendar",
        ],
      },
      {
        name: "Lead Scraper",
        description:
          "Pulls businesses from Google Maps and niche directories, enriches with contact info, scores A/B/C.",
        howItWorks: [
          "Define your niche + radius (e.g. skincare clinics in your city)",
          "Scraper pulls 50–500 results in minutes",
          "Each lead is scored A/B/C by fit",
          "Top tier auto-loads into the outreach queue",
        ],
      },
      {
        name: "Lead Finder",
        description:
          "B2C and B2B enriched lists tailored to your ideal customer profile.",
        howItWorks: [
          "Build an ICP with us in 30 minutes",
          "We compile + verify the list",
          "Delivered into your CRM ready for outreach",
        ],
      },
      {
        name: "Website Forms",
        description:
          "Conversion-tuned forms embedded in your site. Multi-step, friction-light, mobile-first.",
        howItWorks: [
          "Choose the page placements",
          "We design the form with your branding",
          "Submissions flow into CRM + AI follow-up instantly",
        ],
      },
      {
        name: "Landing Pages",
        description:
          "Standalone pages built for paid ads, partnerships, or campaign drops.",
        howItWorks: [
          "Brief in your offer + audience",
          "We design, write, and ship the page",
          "Connected to tracking + lead capture by default",
        ],
      },
      {
        name: "Funnels",
        description:
          "Multi-step opt-in flows that warm up cold traffic before asking for the booking.",
        howItWorks: [
          "Map the funnel steps (lead magnet → email → offer)",
          "We build each step + the in-between automations",
          "Conversion reporting handed to you in the dashboard",
        ],
      },
      {
        name: "Surveys & Quiz",
        description:
          "Qualify and segment leads as they come in. Better fit, better booking rate.",
        howItWorks: [
          "Pick the questions that filter the right customer",
          "Quiz results route leads to the right sequence",
          "AI follows up based on segment",
        ],
      },
      {
        name: "QR Capture",
        description:
          "Branded QR codes for print, packaging, and events that funnel into your CRM.",
        howItWorks: [
          "We generate the code + tracked landing link",
          "Each scan logs the source + tag",
          "Leads route directly into nurture sequences",
        ],
      },
    ],
    whyItMatters:
      "No business has a sales problem until they have a lead problem. We make sure you never run dry.",
    outcome: "A reliable, predictable inflow of qualified leads - every week.",
    demoKey: "lead-scraper",
    relatedSlugs: ["conversation-ai", "follow-up-nurture", "marketing-social"],
    ctaCopy: "Get a lead generation demo on your business",
  },
  // 2
  {
    slug: "conversation-ai",
    number: "02",
    name: "Conversation AI & Chatbots",
    eyebrow: "Conversation AI & Chatbots",
    headline: "Reply to every lead - in seconds,",
    italicWord: "on every channel.",
    promise:
      "On-brand AI conversations across web, WhatsApp, Messenger, Instagram DM, TikTok DM, LinkedIn, and SMS - unified in one inbox.",
    bullets: [
      "Website Chat Widget",
      "WhatsApp AI",
      "Messenger AI",
      "Instagram DM AI",
      "TikTok DM AI",
      "LinkedIn AI",
      "SMS AI",
      "Multi-Channel Unified Inbox",
      "AI Lead Qualification",
    ],
    subProducts: [
      {
        name: "Website Chat Widget",
        description:
          "Discrete chat bubble that converts visitors into qualified, booked leads.",
        howItWorks: [
          "Drop a single script into your site",
          "Widget greets, qualifies, and books straight into your calendar",
          "Every conversation logs to your CRM",
        ],
      },
      {
        name: "WhatsApp AI",
        description:
          "Your number, but with an always-on agent that replies in seconds, day or night.",
        howItWorks: [
          "Connect via WhatsApp Business API",
          "AI replies on-brand, handles FAQs, books appointments",
          "Hand-off to a human anytime",
        ],
      },
      {
        name: "Messenger AI",
        description:
          "Facebook Messenger handled by AI - perfect for service businesses running Meta ads.",
        howItWorks: [
          "Connect your FB page",
          "AI manages the inbound flow + tags leads",
          "All conversations land in the unified inbox",
        ],
      },
      {
        name: "Instagram DM AI",
        description:
          "Turn DMs into bookings instead of dropping them.",
        howItWorks: [
          "Connect IG via Meta Business",
          "AI replies to story responses + DMs in your tone",
          "Books appointments directly from chat",
        ],
      },
      {
        name: "TikTok DM AI",
        description:
          "Capture leads from viral content the moment they slide into your DMs.",
        howItWorks: [
          "Connect TikTok Business",
          "AI replies + qualifies in your voice",
          "Routes hot leads to the owner",
        ],
      },
      {
        name: "LinkedIn AI",
        description:
          "For B2B service businesses - answer LinkedIn inbox, qualify, and route.",
        howItWorks: [
          "Authorise LinkedIn account",
          "AI handles inbound + outbound replies",
          "Booked calls sync into your calendar",
        ],
      },
      {
        name: "SMS AI",
        description:
          "Your business SMS line - answered by AI in seconds, any hour.",
        howItWorks: [
          "We provision a number or use yours",
          "AI replies, qualifies, books",
          "Two-way conversations stay in the inbox",
        ],
      },
      {
        name: "Multi-Channel Unified Inbox",
        description:
          "One screen for every conversation across every channel. Owner-friendly.",
        howItWorks: [
          "All channels stream into a single view",
          "Filter by channel, agent, or status",
          "Reply from anywhere - desktop or mobile",
        ],
      },
      {
        name: "AI Lead Qualification",
        description:
          "The AI asks the right questions so only fit leads make it through to your calendar.",
        howItWorks: [
          "We define what 'fit' looks like with you",
          "AI asks 2–4 questions in the conversation flow",
          "Unqualified leads get nurtured separately",
        ],
      },
    ],
    whyItMatters:
      "Reply-time decides the booking. 80% of customers book with the first business that answers.",
    outcome: "Every inbound message answered in under 60 seconds, 24/7.",
    demoKey: "conversation-ai",
    relatedSlugs: ["lead-generation", "voice-ai", "booking-calendar"],
    ctaCopy: "See conversation AI on your business",
  },
  // 3
  {
    slug: "voice-ai",
    number: "03",
    name: "Voice AI",
    eyebrow: "Voice AI",
    headline: "Never miss another call -",
    italicWord: "even after hours.",
    promise:
      "Natural-sounding AI voice agents answer your inbound calls, follow up with leads, and book appointments directly.",
    bullets: [
      "Inbound Voice Agent",
      "Outbound Voice Agent",
      "AI Voice Drops",
      "Call Routing",
      "Call Tracking",
    ],
    subProducts: [
      {
        name: "Inbound Voice Agent",
        description:
          "Picks up every call, sounds human, handles FAQs, books straight to your calendar.",
        howItWorks: [
          "We provision a number or forward yours",
          "Agent answers in your brand voice",
          "Routes urgent calls + books appointments",
        ],
      },
      {
        name: "Outbound Voice Agent",
        description:
          "Calls leads back, runs reactivation campaigns, follows up on quotes.",
        howItWorks: [
          "Upload the list + define the campaign",
          "AI calls, qualifies, books - or hands off",
          "Outcomes logged in CRM with recordings",
        ],
      },
      {
        name: "AI Voice Drops",
        description:
          "Personal-feeling voice messages dropped to mobiles without ringing the phone.",
        howItWorks: [
          "Record once in your voice (or cloned)",
          "AI personalises name + context per recipient",
          "Drops as voicemail - no ring, no interrupt",
        ],
      },
      {
        name: "Call Routing",
        description:
          "Smart routing - sends the right calls to the right person, escalates the rest.",
        howItWorks: [
          "Configure rules by topic, hour, or caller",
          "AI does first contact, then transfers if needed",
          "Owners get a daily call summary",
        ],
      },
      {
        name: "Call Tracking",
        description:
          "Know which campaign, ad, or channel each call came from.",
        howItWorks: [
          "Dynamic numbers per source",
          "Every call attributes + records",
          "Reporting in the dashboard",
        ],
      },
    ],
    whyItMatters:
      "Missed calls = missed bookings. The average local business misses 27% of calls - most go to a competitor.",
    outcome: "Zero missed calls. Zero after-hours dead air. More booked customers.",
    demoKey: "voice-ai",
    relatedSlugs: ["conversation-ai", "follow-up-nurture", "booking-calendar"],
    ctaCopy: "Hear the voice agent on your business",
  },
  // 4
  {
    slug: "crm-pipeline",
    number: "04",
    name: "CRM & Pipeline",
    eyebrow: "CRM & Pipeline",
    headline: "Every lead, every stage -",
    italicWord: "one place.",
    promise:
      "A customised CRM with smart pipelines, lead scoring, routing, and a live internal AI assistant.",
    bullets: [
      "Customised CRM",
      "Custom Pipelines",
      "Lead Scoring",
      "Lead Routing",
      "Tracking Dashboard",
      "Internal AI Assistant",
    ],
    subProducts: [
      {
        name: "Customised CRM",
        description:
          "A CRM built around your business, not a generic Salesforce stub.",
        howItWorks: [
          "Map your fields, stages, and roles with us",
          "We configure your CRM or a custom backend",
          "Onboard the team in under an hour",
        ],
      },
      {
        name: "Custom Pipelines",
        description:
          "Visual deal/lead pipelines tailored per service line or campaign.",
        howItWorks: [
          "Define stages with us",
          "Automated transitions based on actions",
          "Filter, segment, and report at a glance",
        ],
      },
      {
        name: "Lead Scoring",
        description:
          "AI scores every lead A/B/C so your team works the hottest first.",
        howItWorks: [
          "Define fit + intent signals",
          "Each lead scores in real time",
          "Scores drive routing and sequencing",
        ],
      },
      {
        name: "Lead Routing",
        description:
          "The right lead, to the right person, in seconds.",
        howItWorks: [
          "Routing rules by service, geo, or owner",
          "Round-robin + skill-based options",
          "Escalation alerts when something stalls",
        ],
      },
      {
        name: "Tracking Dashboard",
        description:
          "Live view of leads, conversations, bookings, and revenue.",
        howItWorks: [
          "Dashboard configured to your KPIs",
          "Live conversation + booking counters",
          "Owner + manager views",
        ],
      },
      {
        name: "Internal AI Assistant",
        description:
          "An always-on assistant for your team - query the CRM, draft replies, get summaries.",
        howItWorks: [
          "Connected to your CRM + inbox",
          "Ask in plain English",
          "Drafts go to staff for one-click send",
        ],
      },
    ],
    whyItMatters:
      "Without a clean pipeline, leads slip. A real CRM converts more without hiring more.",
    outcome: "Every lead accounted for. Every team member knows what to do next.",
    demoKey: "crm-pipeline",
    relatedSlugs: ["conversation-ai", "booking-calendar", "analytics-compliance"],
    ctaCopy: "Get your CRM built",
  },
  // 5
  {
    slug: "booking-calendar",
    number: "05",
    name: "Booking & Calendar",
    eyebrow: "Booking & Calendar",
    headline: "Bookings, slotted -",
    italicWord: "no back-and-forth.",
    promise:
      "AI-managed booking, smart calendars, automated reminders, and a scheduler that books in conversation.",
    bullets: [
      "Booking System",
      "Calendar System",
      "Email + Calendar Invite",
      "Automated Reminders",
      "Meeting Booking",
      "Smart Scheduler",
    ],
    subProducts: [
      {
        name: "Booking System",
        description:
          "A clean, mobile-first booking page that customers can use 24/7.",
        howItWorks: [
          "Configure your services + durations",
          "Customers self-serve a slot",
          "Confirmation + reminder auto-sent",
        ],
      },
      {
        name: "Calendar System",
        description:
          "Two-way sync to Google Calendar / Outlook - no double-bookings ever.",
        howItWorks: [
          "Authorise your calendar",
          "Availability stays accurate to the second",
          "Manual blocks honoured",
        ],
      },
      {
        name: "Email + Calendar Invite",
        description:
          "Every booking ships an email confirmation and a native calendar invite.",
        howItWorks: [
          "Branded confirmation template",
          ".ics invite generated and attached",
          "Customer adds with one tap",
        ],
      },
      {
        name: "Automated Reminders",
        description:
          "SMS + email reminders cut no-shows by 30–60%.",
        howItWorks: [
          "Schedule reminder cadence (24h, 2h, etc.)",
          "Customer can reschedule with one tap",
          "Owner gets a daily 'tomorrow' summary",
        ],
      },
      {
        name: "Meeting Booking",
        description:
          "For consultations, demos, and discovery calls - perfect for B2B.",
        howItWorks: [
          "Pick a slot from your shared link",
          "Custom intake questions on booking",
          "Auto-sync to all attendees' calendars",
        ],
      },
      {
        name: "Smart Scheduler",
        description:
          "AI books inside the conversation - no link sent, no friction.",
        howItWorks: [
          "AI proposes 2–3 slots in chat",
          "Customer picks one in reply",
          "Booking confirms without leaving the thread",
        ],
      },
    ],
    whyItMatters:
      "Every extra step kills bookings. The fewer clicks between intent and slot, the higher the conversion.",
    outcome: "Higher booking rate, fewer no-shows, zero double-bookings.",
    demoKey: "booking-calendar",
    relatedSlugs: ["conversation-ai", "voice-ai", "follow-up-nurture"],
    ctaCopy: "See the booking flow on your business",
  },
  // 6
  {
    slug: "follow-up-nurture",
    number: "06",
    name: "Follow-up & Nurture",
    eyebrow: "Follow-up & Nurture",
    headline: "Never lose a lead to -",
    italicWord: "silence.",
    promise:
      "Missed-call text-back, lead reactivation, long-term nurture, and friendly re-engagement that brings customers back.",
    bullets: [
      "Missed-Call Text-Back",
      "Lead Reactivation",
      "Re-engagement",
      "Re-booking",
      "Long-Term Nurture",
      "Newsletters",
      "Post-Call Messenger",
    ],
    subProducts: [
      {
        name: "Missed-Call Text-Back",
        description:
          "Instantly texts back every missed call so the customer books instead of calling a competitor.",
        howItWorks: [
          "We connect your business number",
          "Each missed call triggers an SMS in seconds",
          "Conversation continues with AI + books",
        ],
      },
      {
        name: "Lead Reactivation",
        description:
          "Re-engages old leads in your CRM with a friendly message tuned to your brand.",
        howItWorks: [
          "Import dormant leads (60d+, 90d+, 180d+)",
          "AI sends personalised reach-out",
          "Replies route through qualifier → booking",
        ],
      },
      {
        name: "Re-engagement",
        description:
          "Short, smart re-engagement nudges for cold contacts.",
        howItWorks: [
          "Triggered on inactivity + lifecycle events",
          "AI writes in your voice",
          "Click-to-book CTA in every message",
        ],
      },
      {
        name: "Re-booking",
        description:
          "Past customers get a friendly reminder at the right interval (e.g. 6w for a salon).",
        howItWorks: [
          "Configure interval per service",
          "Personalised SMS or WhatsApp goes out",
          "One tap to re-book",
        ],
      },
      {
        name: "Long-Term Nurture",
        description:
          "Multi-month sequences for leads that aren't ready yet.",
        howItWorks: [
          "We map content + offer waterfall",
          "AI personalises per segment",
          "Sequences pause when a booking happens",
        ],
      },
      {
        name: "Newsletters",
        description:
          "Branded monthly newsletters drafted by AI in your voice.",
        howItWorks: [
          "Define topics + cadence",
          "AI drafts, you approve in one click",
          "Sent + reporting in dashboard",
        ],
      },
      {
        name: "Post-Call Messenger",
        description:
          "After every voice call, AI sends a recap + next-step SMS.",
        howItWorks: [
          "Transcript runs through your AI",
          "Recap + CTA SMS drafted automatically",
          "Sent within 60 seconds of hang-up",
        ],
      },
    ],
    whyItMatters:
      "The money is in the follow-up. Most businesses follow up once - winners follow up seven times.",
    outcome: "Revenue you would have lost - recovered, weekly, on autopilot.",
    demoKey: "follow-up-nurture",
    relatedSlugs: ["conversation-ai", "lead-generation", "reputation-reviews"],
    ctaCopy: "Recover lost revenue this week",
  },
  // 7
  {
    slug: "payments-invoicing",
    number: "07",
    name: "Payments & Invoicing",
    eyebrow: "Payments & Invoicing",
    headline: "Send. Get paid -",
    italicWord: "tap, tap.",
    promise:
      "Invoice generation, payment links, text-to-pay, deposits, subscriptions - wired to Stripe.",
    bullets: [
      "Invoice App + Generator",
      "Payment Links",
      "Text-to-Pay",
      "Deposits & Subscriptions",
      "Stripe",
    ],
    subProducts: [
      {
        name: "Invoice App + Generator",
        description:
          "Beautiful, branded invoices in seconds. Send from desktop or mobile.",
        howItWorks: [
          "Set your line-items + tax once",
          "Generate + send in two taps",
          "Status tracks until paid",
        ],
      },
      {
        name: "Payment Links",
        description:
          "Single-link payments that work everywhere - WhatsApp, SMS, email, web.",
        howItWorks: [
          "Set amount + reference",
          "Share the link",
          "Payment status syncs to your CRM",
        ],
      },
      {
        name: "Text-to-Pay",
        description:
          "Send an SMS or WhatsApp with a tap-to-pay link. Frictionless for the customer.",
        howItWorks: [
          "Trigger from the conversation or CRM",
          "Customer pays with Apple Pay / Card",
          "Confirmation lands back in chat",
        ],
      },
      {
        name: "Deposits & Subscriptions",
        description:
          "Hold the slot with a deposit; charge recurring for retainer services.",
        howItWorks: [
          "Configure deposit % per service",
          "Subscriptions billed monthly/annually",
          "Failed payments retry + alert",
        ],
      },
      {
        name: "Stripe",
        description:
          "Local + global payment gateways out of the box.",
        howItWorks: [
          "Connect Stripe for global payments",
          "Connect Stripe for international",
          "Settlement to your bank as normal",
        ],
      },
    ],
    whyItMatters:
      "Most service businesses lose deals between 'quote sent' and 'invoice paid'. We compress the gap.",
    outcome: "Faster cash collection, fewer no-shows, healthier cashflow.",
    demoKey: "payments",
    relatedSlugs: ["booking-calendar", "crm-pipeline", "follow-up-nurture"],
    ctaCopy: "Get payments wired up",
  },
  // 8
  {
    slug: "reputation-reviews",
    number: "08",
    name: "Reputation & Reviews",
    eyebrow: "Reputation & Reviews",
    headline: "More 5-star reviews -",
    italicWord: "on autopilot.",
    promise:
      "Automated review collection, smart sentiment routing, multi-platform monitoring, and a referral engine.",
    bullets: [
      "Google Review Automation",
      "Sentiment Routing",
      "Multi-Platform Reviews",
      "Review Monitoring",
      "Review Display Widget",
      "Referral Automation",
    ],
    subProducts: [
      {
        name: "Google Review Automation",
        description:
          "Every happy customer gets a friendly nudge to leave a 5-star Google review.",
        howItWorks: [
          "Triggered by completed bookings or invoices",
          "Personal SMS/WhatsApp request",
          "One-tap deep link straight to Google",
        ],
      },
      {
        name: "Sentiment Routing",
        description:
          "Detects unhappy customers BEFORE they post publicly and routes feedback to the owner privately.",
        howItWorks: [
          "AI gauges sentiment in feedback",
          "Negative goes straight to owner inbox",
          "Positive goes to public review request",
        ],
      },
      {
        name: "Multi-Platform Reviews",
        description:
          "Beyond Google - Facebook, Trustpilot, Hello Peter, Yelp.",
        howItWorks: [
          "Pick the platforms that matter",
          "Customer chooses where to leave the review",
          "Counts tracked in dashboard",
        ],
      },
      {
        name: "Review Monitoring",
        description:
          "Get alerted the moment a new review lands - anywhere.",
        howItWorks: [
          "All platforms feed into one stream",
          "AI drafts an owner reply",
          "One-tap publish",
        ],
      },
      {
        name: "Review Display Widget",
        description:
          "Embed your best reviews directly on your site for social proof.",
        howItWorks: [
          "Single script to drop in",
          "Live reviews update automatically",
          "Branded to match your design",
        ],
      },
      {
        name: "Referral Automation",
        description:
          "Past customers get a perfectly-timed nudge to refer a friend.",
        howItWorks: [
          "Pick the trigger (post-service + 14d)",
          "Personal referral message in your voice",
          "Track each referral to source",
        ],
      },
    ],
    whyItMatters:
      "5-star reviews compound: they drive bookings, ad performance, and trust. Most businesses leave them to chance.",
    outcome: "A steady drip of new 5-star reviews - and unhappy customers caught early.",
    demoKey: "reputation-reviews",
    relatedSlugs: ["follow-up-nurture", "marketing-social", "lead-generation"],
    ctaCopy: "Turn on the review engine",
  },
  // 9
  {
    slug: "websites-build",
    number: "09",
    name: "Websites & Build",
    eyebrow: "Websites & Build",
    headline: "A site that -",
    italicWord: "actually books customers.",
    promise:
      "Custom Next.js websites engineered for SEO, speed, and conversion - plus funnels, portals, and dashboards.",
    bullets: [
      "Custom Website (Next.js + SEO)",
      "Website Integration",
      "Funnels & Landing Pages",
      "Membership / Course Sites",
      "Client Portals",
      "Analytics Dashboards",
    ],
    subProducts: [
      {
        name: "Custom Website (Next.js + SEO)",
        description:
          "A site built like a flagship product - design-led, SEO-tight, blazing fast.",
        howItWorks: [
          "Discovery + design system in week one",
          "Build + content in weeks 2–3",
          "Launch + analytics in week 4",
        ],
      },
      {
        name: "Website Integration",
        description:
          "Wire AI agents, booking, and conversation into an existing site without a rebuild.",
        howItWorks: [
          "Audit existing site",
          "Drop in widget + booking + tracking",
          "Done in days, no migration",
        ],
      },
      {
        name: "Funnels & Landing Pages",
        description:
          "Standalone landing pages designed to convert paid traffic.",
        howItWorks: [
          "Match landing copy to ad creative",
          "Single CTA, frictionless capture",
          "A/B-ready out of the box",
        ],
      },
      {
        name: "Membership / Course Sites",
        description:
          "Gated areas for paying customers - courses, memberships, communities.",
        howItWorks: [
          "Auth + payments wired in",
          "Drip content + progress tracking",
          "Custom branding throughout",
        ],
      },
      {
        name: "Client Portals",
        description:
          "Logged-in workspaces for customers - bookings, invoices, files.",
        howItWorks: [
          "Account creation on first booking",
          "Self-service for invoices + history",
          "Cuts admin time massively",
        ],
      },
      {
        name: "Analytics Dashboards",
        description:
          "Embedded dashboards showing what's actually working.",
        howItWorks: [
          "Connect data sources (CRM, ads, site)",
          "Custom KPIs displayed live",
          "Owner + manager views",
        ],
      },
    ],
    whyItMatters:
      "Most local sites are brochures. Yours should be a salesperson - open 24/7, never sleeping.",
    outcome: "A site that converts paid + organic traffic into real bookings.",
    demoKey: "website-build",
    relatedSlugs: ["lead-generation", "conversation-ai", "marketing-social"],
    ctaCopy: "Get a quote on your website",
  },
  // 10
  {
    slug: "marketing-social",
    number: "10",
    name: "Marketing & Social",
    eyebrow: "Marketing & Social",
    headline: "Show up consistently -",
    italicWord: "without lifting a finger.",
    promise:
      "Social media management, AI content generation, paid ads, email marketing, and a unified social planner.",
    bullets: [
      "Social Media Management",
      "AI Content Generation",
      "Paid Ads Management",
      "Email Marketing",
      "Social Planner",
    ],
    subProducts: [
      {
        name: "Social Media Management",
        description:
          "Done-for-you posting across IG, FB, LinkedIn, TikTok - managed by humans + AI.",
        howItWorks: [
          "Brand kit + content pillars defined",
          "AI drafts, our team produces + approves",
          "Schedule + reporting handled monthly",
        ],
      },
      {
        name: "AI Content Generation",
        description:
          "Captions, hooks, scripts, blog posts - generated in your voice, ready to use.",
        howItWorks: [
          "Train on your existing best content",
          "Generate by topic + platform",
          "Edit + publish from the planner",
        ],
      },
      {
        name: "Paid Ads Management",
        description:
          "Meta + Google ads creative + targeting, optimised weekly.",
        howItWorks: [
          "Set objectives + budget",
          "We build creative + targeting",
          "Weekly optimisation + reporting",
        ],
      },
      {
        name: "Email Marketing",
        description:
          "Branded campaigns + lifecycle sequences that bring customers back.",
        howItWorks: [
          "List segmentation + cadence",
          "Templates designed to your brand",
          "Send + reporting in dashboard",
        ],
      },
      {
        name: "Social Planner",
        description:
          "One calendar for every channel + every post type.",
        howItWorks: [
          "Drag-and-drop weekly view",
          "Cross-post once, distribute everywhere",
          "Performance overlay per slot",
        ],
      },
    ],
    whyItMatters:
      "Consistent brand presence drives trust - and trust drives bookings. Outsource the hardest discipline in marketing.",
    outcome: "Always-on brand presence + measurable lift in inbound interest.",
    demoKey: "social-media",
    relatedSlugs: ["websites-build", "lead-generation", "reputation-reviews"],
    ctaCopy: "Get your social engine running",
  },
  // 11
  {
    slug: "custom-builds",
    number: "11",
    name: "Custom Builds",
    eyebrow: "Custom Builds",
    headline: "Whatever your business needs -",
    italicWord: "we build it.",
    promise:
      "Custom automations on Make.com + Claude + APIs, bespoke AI agents, and deep integrations across your stack.",
    bullets: [
      "Custom Automations (Make.com + Claude + APIs)",
      "Custom AI Agents",
      "Custom Integrations",
    ],
    subProducts: [
      {
        name: "Custom Automations",
        description:
          "Made-to-measure workflows that connect your tools and remove repetitive manual work.",
        howItWorks: [
          "Scope the bottleneck together",
          "Build on Make.com + Claude + APIs",
          "Monitor + iterate post-launch",
        ],
      },
      {
        name: "Custom AI Agents",
        description:
          "Bespoke agents trained on your data, your voice, and your business rules.",
        howItWorks: [
          "Define the agent's mandate",
          "Train on your domain knowledge",
          "Deploy with a fallback to humans",
        ],
      },
      {
        name: "Custom Integrations",
        description:
          "Connect anything to anything - POS, ERP, niche industry tools.",
        howItWorks: [
          "Audit existing systems",
          "Build the bridge (webhook, API, sync)",
          "Reliability + monitoring built in",
        ],
      },
    ],
    whyItMatters:
      "Off-the-shelf only goes so far. Custom builds eliminate the last 20% of friction that nothing else can.",
    outcome: "Workflows your team has been asking for - finally automated.",
    demoKey: "custom-builds",
    relatedSlugs: ["crm-pipeline", "analytics-compliance", "websites-build"],
    ctaCopy: "Scope a custom build",
  },
  // 12
  {
    slug: "analytics-compliance",
    number: "12",
    name: "Analytics & Compliance",
    eyebrow: "Analytics & Compliance",
    headline: "Know what's working -",
    italicWord: "and stay compliant.",
    promise:
      "Live analytics, monthly performance reviews, an agent dashboard, POPIA compliance, and a continuous CRO loop.",
    bullets: [
      "Analytics & Optimization",
      "Monthly Performance Reports",
      "Agent Dashboard",
      "POPIA Compliance",
      "CRO Loop",
    ],
    subProducts: [
      {
        name: "Analytics & Optimization",
        description:
          "Live data on lead sources, conversion rates, and revenue - with auto-improvement loops.",
        howItWorks: [
          "Connect data sources (site, CRM, ads)",
          "Custom dashboards configured",
          "AI suggests optimisations weekly",
        ],
      },
      {
        name: "Monthly Performance Reports",
        description:
          "A clean PDF + dashboard each month showing what moved + why.",
        howItWorks: [
          "Auto-generated from live data",
          "Plain-English insights + actions",
          "Sent to owner inbox + Slack",
        ],
      },
      {
        name: "Agent Dashboard",
        description:
          "See exactly what your AI agents are doing - live conversations, performance metrics, lead progress.",
        howItWorks: [
          "Real-time activity feed",
          "Per-agent performance scoring",
          "Anomaly alerts when something dips",
        ],
      },
      {
        name: "POPIA Compliance",
        description:
          "Built-in consent, data residency, and right-to-be-forgotten flows - GDPR-ready by design.",
        howItWorks: [
          "Consent capture on every form",
          "Data-export + delete tools",
          "Audit trail for regulators",
        ],
      },
      {
        name: "CRO Loop",
        description:
          "Continuous conversion-rate optimisation - small tests, weekly, never-ending.",
        howItWorks: [
          "Identify weakest funnel steps",
          "Test variants + measure",
          "Roll out winners + repeat",
        ],
      },
    ],
    whyItMatters:
      "What gets measured gets improved. Without analytics, growth is luck. With it, growth is engineering.",
    outcome: "Always-improving conversion rates, with confidence and audit trails.",
    demoKey: "analytics-compliance",
    relatedSlugs: ["crm-pipeline", "marketing-social", "custom-builds"],
    ctaCopy: "Get the dashboard built",
  },
];

export const SERVICE_BY_SLUG: Record<string, ServiceCategory> = Object.fromEntries(
  SERVICE_CATEGORIES.map((c) => [c.slug, c])
);

/**
 * The four pillars - the top-level architecture every service category
 * lives under. Shared by the navbar mega menu and the services page so
 * the grouping can never drift apart.
 */
export type ServicePillar = {
  index: string;
  slug: string;
  title: string;
  promise: string;
  slugs: string[];
};

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    index: "01",
    slug: "marketing",
    title: "Marketing",
    promise: "Systems that fill your pipeline and keep your name everywhere.",
    slugs: ["lead-generation", "marketing-social", "reputation-reviews", "websites-build"],
  },
  {
    index: "02",
    slug: "sales",
    title: "Sales",
    promise: "Every enquiry answered in seconds, on every channel, and booked.",
    slugs: ["conversation-ai", "voice-ai", "booking-calendar", "follow-up-nurture"],
  },
  {
    index: "03",
    slug: "operations",
    title: "Internal Operations",
    promise: "Your pipeline, payments and reporting run themselves.",
    slugs: ["crm-pipeline", "payments-invoicing", "analytics-compliance"],
  },
  {
    index: "04",
    slug: "automations",
    title: "Automations",
    promise: "Custom agents and integrations that connect everything you run.",
    slugs: ["custom-builds"],
  },
];

export const PILLAR_CATEGORIES = (pillar: ServicePillar): ServiceCategory[] =>
  pillar.slugs.map((s) => SERVICE_BY_SLUG[s]).filter(Boolean);
