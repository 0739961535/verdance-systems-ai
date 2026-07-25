export type ProductCategory =
  | "Presence"
  | "Messaging"
  | "Communication"
  | "Pipeline"
  | "Booking"
  | "Intelligence"
  | "Reputation"
  | "Follow-Up"
  | "Conversion";

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  tagline: string;
  whatItIs: string;
  problem: string;
  howItWorks: string[];
  features: string[];
  whoItsFor: { industry: string; description: string }[];
  metrics: { value: string; label: string }[];
  relatedProducts: string[];
  icon: string;
}

export const products: Product[] = [
  {
    slug: "smart-website",
    name: "Smart Website",
    category: "Presence",
    tagline: "Your 24/7 sales rep that never sleeps.",
    icon: "Globe",
    whatItIs:
      "A high-conversion website built specifically for your business - not a template, not a drag-and-drop builder. Every Smart Website is custom-designed to reflect your brand, optimised for Google search, and built to convert visitors into enquiries and bookings. It connects directly to your automation stack so every form submission, contact, and booking flows into your system automatically with zero manual input.",
    problem:
      "Most business websites are digital brochures - they look okay but they don't actively generate leads, they're not optimised for search, and they don't connect to any backend system. Every visitor who leaves without contacting you is a lost opportunity.",
    howItWorks: [
      "We map your business goals, brand, and target audience.",
      "We design and build a custom site with conversion-focused structure - hero, social proof, services, booking, and contact.",
      "We connect every form and booking widget to your automation system so leads flow in automatically.",
      "We deploy, optimise for Google, and provide ongoing maintenance.",
    ],
    features: [
      "Custom design matched to your brand identity",
      "Mobile-first, fast-loading architecture",
      "Google SEO foundation built in from day one",
      "Integrated booking and contact forms connected to your automation system",
      "WhatsApp contact button on every page",
      "Built-in lead capture with instant notification to your team",
      "Ongoing maintenance and updates included",
      "Scalable - grows with your business",
    ],
    whoItsFor: [
      { industry: "Professional Services", description: "Attorneys, medical practices, consultants" },
      { industry: "Local Businesses", description: "Salons, gyms, restaurants, contractors" },
      { industry: "Product Businesses", description: "ecommerce or catalogue presence" },
    ],
    metrics: [
      { value: "3x", label: "Average increase in online enquiries" },
      { value: "10–14", label: "Days to build and deploy" },
      { value: "100%", label: "Custom - no templates" },
      { value: "Day 1", label: "Connected to automation from launch" },
    ],
    relatedProducts: ["website-conversion-widget", "whatsapp-ai-agent", "smart-scheduler"],
  },
  {
    slug: "whatsapp-ai-agent",
    name: "WhatsApp AI Agent",
    category: "Messaging",
    tagline: "Every message answered. Every lead captured. Zero manual effort.",
    icon: "MessageCircle",
    whatItIs:
      "An AI-powered agent that lives inside your WhatsApp Business account and responds to every inbound message instantly - day or night, weekdays and weekends. It handles enquiries, qualifies leads, collects contact details, answers common questions, and notifies your team when a qualified lead needs human attention. Your clients get an immediate, professional response. You get a structured lead in your system.",
    problem:
      "Most businesses miss leads because they can't respond fast enough - especially after hours. A potential client messages at 9pm, gets no reply, and books a competitor by morning. Every unanswered message is revenue you've already lost.",
    howItWorks: [
      "A client messages your WhatsApp number at any time.",
      "The AI agent responds instantly with a professional greeting and asks qualifying questions.",
      "It collects their name, contact details, and the nature of their enquiry.",
      "A structured summary is sent to your team and the contact is logged in your system automatically.",
    ],
    features: [
      "Instant response 24/7 - never misses an inbound message",
      "Natural, conversational tone that matches your brand voice",
      "Qualifies leads before they reach your team",
      "Collects and logs all contact details automatically",
      "Handles FAQs - pricing, availability, services, directions",
      "Seamlessly hands off to a human when needed",
      "Fully customised to your business, products, and workflows",
      "Supports both English and Afrikaans",
    ],
    whoItsFor: [
      { industry: "Legal & Professional", description: "Attorneys and professional practices" },
      { industry: "Real Estate", description: "Agents and property businesses" },
      { industry: "High-Volume Businesses", description: "Any business receiving 10+ WhatsApp enquiries per week" },
    ],
    metrics: [
      { value: "<5s", label: "Average response time" },
      { value: "24/7", label: "Availability including public holidays" },
      { value: "90%+", label: "Common enquiries handled without human input" },
      { value: "0", label: "Leads lost to delayed responses" },
    ],
    relatedProducts: ["ai-receptionist", "smart-scheduler", "automated-follow-up"],
  },
  {
    slug: "voice-ai-agent",
    name: "Voice AI Agent",
    category: "Communication",
    tagline: "Every call answered. Every caller qualified. No receptionist required.",
    icon: "Phone",
    whatItIs:
      "An AI voice agent that answers your business phone calls in real time - speaking naturally, understanding the caller's needs, and taking action without any human involvement. It greets callers professionally, handles common enquiries, books appointments, and routes complex calls to the right person. Unlike a voicemail or IVR menu, this agent holds a real conversation.",
    problem:
      "Missed calls are missed revenue. When a potential client calls and gets voicemail, 75% of them won't leave a message - they'll call the next number on the list. A single missed call per day at average client value is thousands lost every month.",
    howItWorks: [
      "A call comes in to your business number at any time.",
      "The Voice AI Agent answers immediately with your business name and a professional greeting.",
      "It understands the caller's request using natural language - no button pressing, no menus.",
      "It books appointments, answers questions, captures details, and routes hot leads to you directly.",
    ],
    features: [
      "Answers 100% of inbound calls - no voicemail, no missed calls",
      "Natural voice that sounds human, not robotic",
      "Books appointments directly into your calendar",
      "Captures caller details and logs every call automatically",
      "Handles FAQs and common service enquiries",
      "Routes urgent or complex calls to your team immediately",
      "Works 24/7 including after hours and weekends",
      "Custom voice and script matched to your brand",
    ],
    whoItsFor: [
      { industry: "Medical & Dental", description: "Practices with high call volumes" },
      { industry: "Legal Practices", description: "Receiving daily enquiries" },
      { industry: "Service Businesses", description: "Contractors, salons, automotive that lose leads to missed calls" },
    ],
    metrics: [
      { value: "100%", label: "Call answer rate" },
      { value: "<2s", label: "Pickup time" },
      { value: "24/7", label: "Available 365 days a year" },
      { value: "0", label: "After-hours leads lost" },
    ],
    relatedProducts: ["ai-receptionist", "smart-scheduler", "whatsapp-ai-agent"],
  },
  {
    slug: "ai-receptionist",
    name: "AI Receptionist",
    category: "Communication",
    tagline: "A front desk that never takes a day off.",
    icon: "UserCheck",
    whatItIs:
      "A fully integrated AI receptionist that combines voice, chat, and WhatsApp into one unified front-of-business system. It greets clients, books appointments, answers questions, sends confirmations, and manages your calendar - across all channels simultaneously. Unlike a single voice agent or chatbot, the AI Receptionist is your complete first point of contact, working across every communication channel your clients use.",
    problem:
      "A good receptionist costs significant monthly salary, only works office hours, takes leave, and can only handle one call at a time. Businesses either underinvest in reception and lose leads, or overspend on staff to cover the gap. Neither option scales.",
    howItWorks: [
      "A client contacts you via phone, WhatsApp, or your website chat widget - any channel.",
      "The AI Receptionist responds immediately on whichever channel they used, with a consistent, professional brand voice.",
      "It qualifies the enquiry, books the appointment, and sends confirmation details automatically.",
      "Your team receives a structured brief on every new booking - name, contact, purpose, and time.",
    ],
    features: [
      "Unified across phone, WhatsApp, and website chat",
      "Books and manages appointments across all channels",
      "Sends automatic confirmations and reminders",
      "Handles FAQs, directions, pricing, and availability queries",
      "Reduces no-shows with automated reminder sequences",
      "Captures and logs every interaction in your system",
      "Consistent, professional tone 24/7",
      "Custom-built for your specific business workflows",
    ],
    whoItsFor: [
      { industry: "Medical & Wellness", description: "Practices needing full reception coverage" },
      { industry: "Legal & Financial", description: "Service firms with high client contact" },
      { industry: "Any Business", description: "Spending too much on reception staff" },
    ],
    metrics: [
      { value: "∞", label: "Simultaneous enquiries handled" },
      { value: "£0", label: "In overtime or leave costs" },
      { value: "24/7", label: "Every hour of every day" },
      { value: "40%", label: "Average reduction in no-shows" },
    ],
    relatedProducts: ["voice-ai-agent", "whatsapp-ai-agent", "smart-scheduler"],
  },
  {
    slug: "lead-reactivation",
    name: "Lead Reactivation System",
    category: "Pipeline",
    tagline: "Your best leads are already in your database. You just stopped following up.",
    icon: "RefreshCw",
    whatItIs:
      "A systematic AI-powered outreach campaign that re-engages every cold or inactive lead in your existing database - people who enquired, visited, or showed interest but never converted. The system identifies dormant contacts, sends a personalised multi-step reactivation sequence via WhatsApp and SMS, qualifies who is still interested, and delivers hot leads directly to your team. Most businesses see their first responses within 24 hours.",
    problem:
      "The average business has hundreds of leads in their database that went cold - not because the prospect wasn't interested, but because the follow-up stopped. These are warm people who already know your business. Reactivating them costs a fraction of acquiring new leads.",
    howItWorks: [
      "We import your existing lead database - CRM export, spreadsheet, or any format.",
      "We clean and segment the list by recency, source, and last interaction.",
      "A personalised WhatsApp and SMS sequence goes out - Day 1, Day 3, Day 7 - with natural, non-salesy messaging.",
      "Replies are automatically qualified and hot leads are flagged and delivered to your team in real time.",
    ],
    features: [
      "Works with any existing lead database - CRM, spreadsheet, or raw data",
      "Personalised messaging at scale - every message feels individual",
      "Multi-step sequence across WhatsApp and SMS",
      "AI qualification of every reply - filters serious prospects",
      "Real-time notification when a hot lead responds",
      "Full reply and conversation history captured",
      "Suppression of opted-out or DNC contacts",
      "Detailed campaign reporting - responses, conversions, ROI",
    ],
    whoItsFor: [
      { industry: "Real Estate", description: "Agents with databases of past enquiries" },
      { industry: "Automotive", description: "Dealerships with unconverted leads" },
      { industry: "Any Business", description: "With 100+ contacts who haven't bought yet" },
    ],
    metrics: [
      { value: "15–25%", label: "Average reactivation response rate" },
      { value: "24h", label: "Typical time to first responses" },
      { value: "10x", label: "Lower cost per lead than paid ads" },
      { value: "Week 1", label: "ROI visible within the first week" },
    ],
    relatedProducts: ["automated-follow-up", "crm-and-pipeline", "whatsapp-ai-agent"],
  },
  {
    slug: "smart-scheduler",
    name: "Smart Scheduler",
    category: "Booking",
    tagline: "Bookings handled automatically. No back and forth. No no-shows.",
    icon: "Calendar",
    whatItIs:
      "An intelligent booking system that lets clients schedule appointments, consultations, and calls directly - without any manual coordination from your team. It connects to your calendar, shows live availability, handles confirmations, and sends automated reminders that dramatically reduce no-shows. Every booking flows into your system automatically and your team is notified instantly.",
    problem:
      "Scheduling back and forth wastes an average of 8 minutes per booking. For a business taking 20 bookings per day, that's nearly 3 hours of admin time - every single day. And with no automated reminders, no-show rates average 20–30%, destroying revenue and blocking your calendar.",
    howItWorks: [
      "A client visits your website, clicks the booking button, or is sent a booking link via WhatsApp.",
      "They see your live availability and select a time that works for them.",
      "An instant confirmation is sent to both the client and your team.",
      "Automated reminders go out 24 hours and 1 hour before the appointment - reducing no-shows significantly.",
    ],
    features: [
      "Real-time calendar availability - no double bookings",
      "Instant booking confirmation to client and team",
      "Automated reminders via WhatsApp and SMS",
      "No-show recovery sequence - reschedule offer sent automatically",
      "Buffer time between appointments managed automatically",
      "Multiple service types and durations supported",
      "Embedded on your website or sharable as a standalone link",
      "Integrates with your existing calendar",
    ],
    whoItsFor: [
      { industry: "Medical & Wellness", description: "Practices managing high appointment volumes" },
      { industry: "Attorneys & Consultants", description: "Professional service firms" },
      { industry: "Service Businesses", description: "Salons, gyms, and local service providers" },
    ],
    metrics: [
      { value: "0", label: "Scheduling back-and-forth eliminated" },
      { value: "40%", label: "Average reduction in no-shows" },
      { value: "24/7", label: "Clients book while you sleep" },
      { value: "2 min", label: "Average enquiry to confirmed booking" },
    ],
    relatedProducts: ["ai-receptionist", "smart-website", "crm-and-pipeline"],
  },
  {
    slug: "automated-follow-up",
    name: "Automated Follow-Up System",
    category: "Pipeline",
    tagline: "Follow up with every lead, every time - without lifting a finger.",
    icon: "Repeat",
    whatItIs:
      "A multi-step automated follow-up system that contacts every new lead, enquiry, or client at exactly the right time with exactly the right message - across WhatsApp, SMS, and email. No lead falls through the cracks. No follow-up gets forgotten. The system runs in the background while you focus on your business, and escalates hot responses to your team in real time.",
    problem:
      "Studies consistently show that 80% of sales require 5 or more follow-ups, but 44% of salespeople give up after just one attempt. Most businesses follow up once or twice and then move on - leaving a significant portion of their pipeline unconverted simply because the cadence stopped.",
    howItWorks: [
      "A new lead enters your system - from your website, WhatsApp, a call, or a manual entry.",
      "The follow-up sequence begins automatically - personalised messages sent at pre-set intervals.",
      "If the lead replies, they're removed from the automated sequence and flagged for personal attention.",
      "If there is no response after the full sequence, the lead is tagged as inactive for reactivation.",
    ],
    features: [
      "Fully automated - triggers on lead entry with no manual input",
      "Multi-channel - WhatsApp, SMS, and email in a single sequence",
      "Personalised messaging using the lead's name and enquiry details",
      "Smart exit - stops when a lead responds or books",
      "Escalation alerts when hot leads reply",
      "Customisable sequence length and timing",
      "Suppression of opted-out contacts",
      "Full sequence performance reporting",
    ],
    whoItsFor: [
      { industry: "Real Estate", description: "Agents managing large enquiry volumes" },
      { industry: "Service Businesses", description: "With long sales cycles" },
      { industry: "Any Business", description: "Receiving more leads than the team can manually follow up" },
    ],
    metrics: [
      { value: "100%", label: "Of leads receive follow-up - zero dropped" },
      { value: "3x", label: "Average improvement in lead conversion" },
      { value: "24/7", label: "Sequences run with zero staff time" },
      { value: "60s", label: "First follow-up sent after lead entry" },
    ],
    relatedProducts: ["lead-reactivation", "crm-and-pipeline", "whatsapp-ai-agent"],
  },
  {
    slug: "google-review-automation",
    name: "Google Review Automation",
    category: "Reputation",
    tagline: "Turn every happy client into a five-star review - automatically.",
    icon: "Star",
    whatItIs:
      "An automated system that requests a Google review from every client at the perfect moment - right after a positive interaction, delivery, or service completion. It sends a personalised WhatsApp message with a direct link to your Google review page, making the process so frictionless that clients actually complete it. Most businesses see their review count double within 60 days.",
    problem:
      "Happy clients rarely leave reviews unprompted - not because they're unhappy, but because they forget or the process feels like effort. Meanwhile, unhappy clients are highly motivated. This creates a skewed online reputation that doesn't reflect your actual service quality.",
    howItWorks: [
      "A service, delivery, or matter is marked as complete in your system.",
      "The system waits a set period - typically 24–48 hours - to let the positive experience settle.",
      "A personalised WhatsApp message is sent with a direct link to your Google review page.",
      "Reviews are tracked and your team is notified of new feedback.",
    ],
    features: [
      "Automated trigger - fires when service is marked complete",
      "Personalised message using client's name",
      "Direct link to your Google review page - zero friction",
      "Timing control - send after optimal delay period",
      "Tracks review submissions and notifies your team",
      "Handles follow-up if no review submitted after 7 days",
      "Works across any service type or industry",
      "Review count and rating trend reporting",
    ],
    whoItsFor: [
      { industry: "Medical & Dental", description: "Practices where reviews drive referrals" },
      { industry: "Legal & Professional", description: "Firms building online credibility" },
      { industry: "Local Businesses", description: "Restaurants, salons, automotive - where reviews drive traffic" },
    ],
    metrics: [
      { value: "2–4x", label: "Increase in monthly review volume" },
      { value: "48h", label: "First new reviews typically within" },
      { value: "Direct", label: "Impact on Google search ranking" },
      { value: "0", label: "Staff time required after setup" },
    ],
    relatedProducts: ["post-interaction-messenger", "crm-and-pipeline", "automated-follow-up"],
  },
  {
    slug: "crm-and-pipeline",
    name: "CRM & Pipeline Setup",
    category: "Intelligence",
    tagline: "Every client. Every deal. Every follow-up. One place.",
    icon: "LayoutDashboard",
    whatItIs:
      "A fully configured client relationship management system and visual sales pipeline built specifically for your business. Every lead, enquiry, client, and deal is tracked through a custom set of stages - from first contact to closed and beyond. Your team has complete visibility over the pipeline at all times, and automations trigger at each stage to keep deals moving without manual nudging.",
    problem:
      "Most small businesses manage their client relationships in WhatsApp chats, Excel spreadsheets, and their own memory. This works until it doesn't - leads get forgotten, follow-ups slip, and there is no clear picture of revenue in the pipeline. Scaling becomes impossible without a system.",
    howItWorks: [
      "We map your current sales and client management process - from first enquiry to payment to repeat business.",
      "We build a custom pipeline with stages that match your actual workflow.",
      "We connect all your lead sources so every contact flows in automatically.",
      "Automations trigger at each stage - follow-ups sent, tasks assigned, notifications pushed to your team.",
    ],
    features: [
      "Custom pipeline stages built around your actual workflow",
      "All lead sources connected - no manual data entry",
      "Automated follow-ups triggered at each stage",
      "Full contact history - every call, message, and interaction logged",
      "Task and reminder system for your team",
      "Deal value and revenue pipeline reporting",
      "Mobile accessible - full visibility from your phone",
      "Team access with role-based permissions",
    ],
    whoItsFor: [
      { industry: "Growing Businesses", description: "Managing 20+ active leads or clients at any time" },
      { industry: "Service Businesses", description: "With multi-step sales processes" },
      { industry: "Any Business", description: "That has lost a deal because of a missed follow-up" },
    ],
    metrics: [
      { value: "100%", label: "Of leads captured and tracked" },
      { value: "Any device", label: "Full pipeline visibility" },
      { value: "30%", label: "Average improvement in conversion rate" },
      { value: "7 days", label: "Setup and operational" },
    ],
    relatedProducts: ["automated-follow-up", "lead-reactivation", "smart-scheduler"],
  },
  {
    slug: "client-intake-automation",
    name: "Client Intake Automation",
    category: "Pipeline",
    tagline: "Clients arrive briefed. You arrive prepared. No admin required.",
    icon: "ClipboardList",
    whatItIs:
      "An automated pre-client intake system that collects every piece of information you need from a new client before their first appointment, consultation, or onboarding session - all via WhatsApp, without any manual chasing from your team. By the time the client arrives, you already have their full details, their situation, and the context you need to deliver a great first experience.",
    problem:
      "The first client interaction is often slowed down by information gathering - forms to fill, details to capture, documents to request. This wastes billable time, creates a poor first impression, and adds admin burden to your team. Most businesses either skip intake entirely or rely on staff to manually chase clients for information.",
    howItWorks: [
      "As soon as a consultation or appointment is booked, the intake sequence triggers automatically.",
      "The client receives a WhatsApp message with a short intake form - name, details, and relevant information specific to your service.",
      "Responses are captured and logged against the client record automatically.",
      "Your team receives a pre-meeting brief - everything you need to know before the appointment starts.",
    ],
    features: [
      "Triggered automatically on booking confirmation - no manual sending",
      "Fully customised intake questions for your specific service",
      "Delivered via WhatsApp - highest open and response rate",
      "Client details logged automatically into your system",
      "Pre-meeting brief sent to your team before every appointment",
      "Reminder sent if intake not completed 24 hours before appointment",
      "Supports document uploads for relevant service types",
      "Reduces first-session admin time by an average of 20–30 minutes",
    ],
    whoItsFor: [
      { industry: "Legal Professionals", description: "Attorneys requiring thorough client briefing" },
      { industry: "Medical & Wellness", description: "Practitioners needing patient history" },
      { industry: "Consultants & Coaches", description: "Who need context before every session" },
    ],
    metrics: [
      { value: "80%", label: "Average intake completion rate" },
      { value: "20–30 min", label: "Of admin saved per new client" },
      { value: "0", label: "Manual chasing by your team" },
      { value: "Before", label: "Information ready before client arrives" },
    ],
    relatedProducts: ["smart-scheduler", "crm-and-pipeline", "ai-receptionist"],
  },
  {
    slug: "post-interaction-messenger",
    name: "Post-Interaction Messenger",
    category: "Follow-Up",
    tagline: "The follow-up your team always intends to send but never does.",
    icon: "Send",
    whatItIs:
      "An automated messaging system that sends a personalised follow-up to every client after a completed interaction - appointment, call, delivery, or service. Whether it is a thank-you message, a summary of next steps, a feedback request, or a re-booking prompt, Post-Interaction Messenger ensures that every client feels acknowledged after every touchpoint, without your team having to remember to send anything.",
    problem:
      "The period immediately after a client interaction is the highest-value moment to cement the relationship, request a review, prompt a re-booking, or collect feedback - but most businesses do nothing. The team is onto the next thing, and the opportunity passes.",
    howItWorks: [
      "A service, appointment, or interaction is marked as complete.",
      "The appropriate follow-up sequence triggers automatically based on the interaction type.",
      "The client receives a personalised message - thank you, next steps, review request, or re-booking prompt - via WhatsApp.",
      "Responses are tracked and any actionable replies are flagged to your team.",
    ],
    features: [
      "Triggers automatically on interaction completion",
      "Multiple message types - thank you, feedback, re-booking, review request",
      "Personalised with client name and interaction details",
      "Delivered via WhatsApp for maximum open rate",
      "Response tracking and escalation to your team",
      "Configurable delay - send at the optimal time after completion",
      "Supports multiple service types with different follow-up flows",
      "Full message performance reporting",
    ],
    whoItsFor: [
      { industry: "Medical & Wellness", description: "Practices nurturing patient relationships" },
      { industry: "Service Businesses", description: "With repeat client relationships" },
      { industry: "Any Business", description: "Where post-service follow-up drives re-bookings or referrals" },
    ],
    metrics: [
      { value: "100%", label: "Of completed interactions followed up" },
      { value: "60%", label: "Average open rate on WhatsApp follow-ups" },
      { value: "Direct", label: "Impact on repeat booking rates" },
      { value: "0", label: "Additional staff time required" },
    ],
    relatedProducts: ["google-review-automation", "automated-follow-up", "smart-scheduler"],
  },
  {
    slug: "website-conversion-widget",
    name: "Website Conversion Widget",
    category: "Conversion",
    tagline: "Turn website visitors into conversations before they leave.",
    icon: "MessageSquare",
    whatItIs:
      "An intelligent chat and conversion widget that sits on your website and proactively engages visitors - turning passive browsers into active leads. It greets visitors after a set time, asks how it can help, answers common questions, captures contact details, and routes hot leads to WhatsApp or booking immediately. It works 24/7 and connects every conversation directly into your automation system.",
    problem:
      "The average website has a bounce rate of 50–70%. Most visitors read a page or two and leave without making contact - not because they weren't interested, but because nothing prompted them to take action. A static contact form captures a fraction of the leads a proactive widget captures.",
    howItWorks: [
      "A visitor lands on your website and browses for a set period - typically 15–30 seconds.",
      "The widget triggers with a friendly, personalised greeting - 'Hi there, can I help you find what you're looking for?'",
      "It answers common questions, guides the visitor to the right service, and captures their contact details.",
      "Hot leads are routed to WhatsApp for immediate follow-up, and all contacts are logged in your system.",
    ],
    features: [
      "Proactive trigger - initiates conversation after set browse time",
      "Custom greeting and flow matched to your brand",
      "Answers FAQs and guides visitors to the right service",
      "Captures name and contact details before they leave",
      "Routes to WhatsApp for immediate human follow-up when needed",
      "Works 24/7 - handles enquiries outside business hours",
      "Connects directly to your automation and CRM system",
      "Full visitor interaction reporting",
    ],
    whoItsFor: [
      { industry: "Any Website", description: "Businesses receiving website traffic" },
      { industry: "Service Businesses", description: "Where website visitors are high-intent" },
      { industry: "eCommerce", description: "Product businesses wanting to reduce cart abandonment" },
    ],
    metrics: [
      { value: "3–5x", label: "Increase in website lead capture rate" },
      { value: "24/7", label: "Active even when your team is offline" },
      { value: "100%", label: "Every conversation logged and tracked" },
      { value: "0", label: "Visitors leave silently without a conversation" },
    ],
    relatedProducts: ["smart-website", "whatsapp-ai-agent", "automated-follow-up"],
  },
];

export const productsByCategory = products.reduce(
  (acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  },
  {} as Record<ProductCategory, Product[]>
);

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getRelatedProducts = (slug: string): Product[] => {
  const product = getProductBySlug(slug);
  if (!product) return [];
  return product.relatedProducts
    .map((s) => getProductBySlug(s))
    .filter(Boolean) as Product[];
};

export const categoryGroups: { label: string; categories: ProductCategory[] }[] = [
  { label: "Presence", categories: ["Presence", "Conversion"] },
  { label: "Communication", categories: ["Messaging", "Communication"] },
  { label: "Pipeline", categories: ["Pipeline", "Booking", "Follow-Up"] },
  { label: "Intelligence", categories: ["Intelligence", "Reputation"] },
];
