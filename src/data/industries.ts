export interface Industry {
  slug: string;
  name: string;
  icon: string;
  headline: string;
  subheadline: string;
  problems: { title: string; description: string }[];
  relevantProducts: string[];
  automationFlow: { step: number; label: string; description: string }[];
  outcomes: { metric: string; description: string }[];
}

export const industries: Industry[] = [
  {
    slug: "legal-professional-services",
    name: "Legal & Professional Services",
    icon: "Scale",
    headline: "Stop losing clients to slow response times.",
    subheadline:
      "Automate intake, qualification, and follow-up so your team focuses on billable work - not admin.",
    problems: [
      {
        title: "Slow enquiry response",
        description:
          "Potential clients calling or messaging after hours get no response and move to the next firm.",
      },
      {
        title: "Manual intake process",
        description:
          "First consultations are delayed by gathering basic information that could be collected automatically.",
      },
      {
        title: "Inconsistent follow-up",
        description:
          "Leads that don't book immediately are often never followed up again.",
      },
      {
        title: "Low Google review volume",
        description:
          "Happy clients don't leave reviews unprompted, limiting your online credibility.",
      },
    ],
    relevantProducts: [
      "voice-ai-agent",
      "ai-receptionist",
      "client-intake-automation",
      "smart-scheduler",
      "automated-follow-up",
      "google-review-automation",
    ],
    automationFlow: [
      { step: 1, label: "Enquiry Received", description: "Client calls or messages at any time" },
      { step: 2, label: "AI Responds Instantly", description: "Voice AI or WhatsApp agent answers immediately" },
      { step: 3, label: "Intake Triggered", description: "Automated intake form sent via WhatsApp" },
      { step: 4, label: "Consultation Booked", description: "Smart Scheduler confirms the appointment" },
      { step: 5, label: "Review Requested", description: "Post-matter review automation fires automatically" },
    ],
    outcomes: [
      { metric: "100%", description: "Enquiries answered - including after hours" },
      { metric: "20–30 min", description: "Admin saved per new client intake" },
      { metric: "2–4x", description: "Increase in Google review volume" },
    ],
  },
  {
    slug: "real-estate-property",
    name: "Real Estate & Property",
    icon: "Building2",
    headline: "More viewings. More offers. Less admin.",
    subheadline:
      "Automate lead qualification, follow-up, and scheduling so your agents spend time closing - not chasing.",
    problems: [
      {
        title: "Slow lead response",
        description:
          "Property enquiries come in 24/7 - agents can't respond fast enough and lose buyers to competitors.",
      },
      {
        title: "Database of cold leads",
        description:
          "Hundreds of past enquiries that went cold without a structured reactivation process.",
      },
      {
        title: "Scheduling back-and-forth",
        description:
          "Coordinating viewing times manually wastes hours of agent time every week.",
      },
      {
        title: "Inconsistent follow-up",
        description:
          "Leads who didn't buy immediately are rarely followed up, leaving significant pipeline unconverted.",
      },
    ],
    relevantProducts: [
      "whatsapp-ai-agent",
      "lead-reactivation",
      "smart-scheduler",
      "automated-follow-up",
      "crm-and-pipeline",
    ],
    automationFlow: [
      { step: 1, label: "Lead Enquires", description: "Buyer or renter messages about a property" },
      { step: 2, label: "AI Qualifies", description: "WhatsApp AI asks budget, timeline, requirements" },
      { step: 3, label: "Viewing Booked", description: "Smart Scheduler confirms the viewing automatically" },
      { step: 4, label: "Follow-Up Sequence", description: "Automated follow-up after viewing" },
      { step: 5, label: "Cold Leads Reactivated", description: "Monthly reactivation campaign to dormant database" },
    ],
    outcomes: [
      { metric: "<5s", description: "Average lead response time, 24/7" },
      { metric: "15–25%", description: "Reactivation response rate from cold database" },
      { metric: "3h+", description: "Scheduling admin saved per agent per day" },
    ],
  },
  {
    slug: "medical-wellness",
    name: "Medical & Wellness",
    icon: "Heart",
    headline: "Full appointment books. Fewer no-shows. Zero missed calls.",
    subheadline:
      "Let your admin run itself so your practitioners can focus on patients.",
    problems: [
      {
        title: "High call volume",
        description:
          "Reception can't handle peak call demand - calls go unanswered and appointments are lost.",
      },
      {
        title: "High no-show rate",
        description:
          "Patients forget appointments without reminders, leaving holes in the schedule.",
      },
      {
        title: "Slow patient intake",
        description:
          "First appointments delayed by manual information gathering.",
      },
      {
        title: "Limited Google reviews",
        description:
          "Patients rarely leave reviews without a prompt, limiting referral traffic.",
      },
    ],
    relevantProducts: [
      "voice-ai-agent",
      "ai-receptionist",
      "smart-scheduler",
      "client-intake-automation",
      "google-review-automation",
      "post-interaction-messenger",
    ],
    automationFlow: [
      { step: 1, label: "Patient Calls", description: "Voice AI answers immediately, 24/7" },
      { step: 2, label: "Appointment Booked", description: "Smart Scheduler confirms with live availability" },
      { step: 3, label: "Intake Sent", description: "Patient completes intake form via WhatsApp" },
      { step: 4, label: "Reminders Fire", description: "24h and 1h reminders reduce no-shows" },
      { step: 5, label: "Review Requested", description: "Post-visit review automation triggers" },
    ],
    outcomes: [
      { metric: "100%", description: "Call answer rate - no missed appointments" },
      { metric: "40%", description: "Reduction in no-show rate" },
      { metric: "2–4x", description: "Monthly Google review volume increase" },
    ],
  },
  {
    slug: "automotive",
    name: "Automotive",
    icon: "Car",
    headline: "More service bookings. More vehicle sales. Less missed follow-up.",
    subheadline:
      "Automate inbound enquiries, service scheduling, and lead reactivation across your dealership or workshop.",
    problems: [
      {
        title: "Missed inbound calls",
        description:
          "Service desk and sales enquiries go unanswered during busy periods, losing customers.",
      },
      {
        title: "Unconverted vehicle enquiries",
        description:
          "Large databases of past enquiries that were never followed up systematically.",
      },
      {
        title: "Manual service scheduling",
        description:
          "Booking service appointments by phone creates bottlenecks and double-bookings.",
      },
    ],
    relevantProducts: [
      "voice-ai-agent",
      "whatsapp-ai-agent",
      "lead-reactivation",
      "smart-scheduler",
      "automated-follow-up",
      "google-review-automation",
    ],
    automationFlow: [
      { step: 1, label: "Enquiry Arrives", description: "Call or WhatsApp message received" },
      { step: 2, label: "AI Handles It", description: "Voice or WhatsApp AI qualifies and captures details" },
      { step: 3, label: "Booking Confirmed", description: "Service or test drive booked automatically" },
      { step: 4, label: "Follow-Up Sequence", description: "Post-service follow-up and review request" },
    ],
    outcomes: [
      { metric: "0", description: "Missed inbound calls or messages" },
      { metric: "15–25%", description: "Reactivation rate from past enquiry database" },
      { metric: "40%", description: "Reduction in no-shows for service appointments" },
    ],
  },
  {
    slug: "home-services-contractors",
    name: "Home Services & Contractors",
    icon: "Wrench",
    headline: "Never miss a job enquiry again.",
    subheadline:
      "Capture every lead, book every job, and follow up every quote automatically.",
    problems: [
      {
        title: "Leads lost after hours",
        description:
          "Potential clients call when you're on a job and never leave a message.",
      },
      {
        title: "Quote follow-up falls away",
        description:
          "Quotes sent without automated follow-up convert at a fraction of their potential.",
      },
      {
        title: "No review system",
        description:
          "Happy clients don't leave reviews, limiting new inbound job enquiries.",
      },
    ],
    relevantProducts: [
      "voice-ai-agent",
      "whatsapp-ai-agent",
      "smart-scheduler",
      "automated-follow-up",
      "google-review-automation",
    ],
    automationFlow: [
      { step: 1, label: "Client Calls or Messages", description: "AI answers immediately, captures job details" },
      { step: 2, label: "Quote Follow-Up Triggered", description: "Automated sequence follows up after quote sent" },
      { step: 3, label: "Job Booked", description: "Smart Scheduler confirms timing" },
      { step: 4, label: "Review Requested", description: "Post-job review automation fires automatically" },
    ],
    outcomes: [
      { metric: "100%", description: "Enquiries captured including after hours" },
      { metric: "3x", description: "Quote follow-up conversion improvement" },
      { metric: "2–4x", description: "Google review volume increase" },
    ],
  },
  {
    slug: "fitness-gyms",
    name: "Fitness & Gyms",
    icon: "Dumbbell",
    headline: "Fill your classes. Reduce cancellations. Keep members longer.",
    subheadline:
      "Automate membership enquiries, class bookings, and retention follow-up.",
    problems: [
      {
        title: "Slow membership enquiry response",
        description:
          "Potential members enquire on social media or WhatsApp and get slow responses.",
      },
      {
        title: "High cancellation rates",
        description:
          "Members cancel without automated re-engagement or incentive sequences.",
      },
      {
        title: "Manual class booking",
        description:
          "Staff spend significant time managing class bookings and cancellations.",
      },
    ],
    relevantProducts: [
      "whatsapp-ai-agent",
      "smart-scheduler",
      "automated-follow-up",
      "lead-reactivation",
      "google-review-automation",
    ],
    automationFlow: [
      { step: 1, label: "Enquiry Received", description: "WhatsApp AI responds instantly with membership info" },
      { step: 2, label: "Trial Booked", description: "Smart Scheduler books the free trial class" },
      { step: 3, label: "Membership Follow-Up", description: "Automated sequence after trial to convert" },
      { step: 4, label: "Retention Sequences", description: "Re-engagement for at-risk members" },
    ],
    outcomes: [
      { metric: "<5s", description: "Response to every membership enquiry" },
      { metric: "3x", description: "Trial-to-membership conversion improvement" },
      { metric: "30%", description: "Reduction in member churn with re-engagement" },
    ],
  },
  {
    slug: "beauty-aesthetics",
    name: "Beauty & Aesthetics",
    icon: "Sparkles",
    headline: "Fully booked. Always followed up. Zero no-shows.",
    subheadline:
      "Let your booking, reminders, and review system run automatically while you focus on clients.",
    problems: [
      {
        title: "No-shows and last-minute cancellations",
        description:
          "Empty appointment slots from clients who forget or cancel without warning.",
      },
      {
        title: "Enquiries going unanswered",
        description:
          "WhatsApp and DM enquiries coming in while you're with clients - replied to too late.",
      },
      {
        title: "Not enough Google reviews",
        description:
          "Happy clients don't leave reviews without a direct, frictionless prompt.",
      },
    ],
    relevantProducts: [
      "whatsapp-ai-agent",
      "smart-scheduler",
      "post-interaction-messenger",
      "google-review-automation",
      "website-conversion-widget",
    ],
    automationFlow: [
      { step: 1, label: "Booking Request", description: "WhatsApp AI responds instantly, captures details" },
      { step: 2, label: "Appointment Confirmed", description: "Smart Scheduler books and sends confirmation" },
      { step: 3, label: "Reminders Sent", description: "24h and 1h reminders reduce no-shows" },
      { step: 4, label: "Follow-Up & Review", description: "Post-visit message + review request" },
    ],
    outcomes: [
      { metric: "40%", description: "Reduction in no-shows with automated reminders" },
      { metric: "24/7", description: "WhatsApp enquiries answered automatically" },
      { metric: "2–4x", description: "Monthly review volume growth" },
    ],
  },
  {
    slug: "restaurants-hospitality",
    name: "Restaurants & Hospitality",
    icon: "UtensilsCrossed",
    headline: "More bookings. Better reviews. Guests that come back.",
    subheadline:
      "Automate reservations, follow-up, and reviews so your front-of-house runs itself.",
    problems: [
      {
        title: "Manual reservation handling",
        description:
          "Reservation calls and messages during busy service take staff away from guests.",
      },
      {
        title: "No post-visit follow-up",
        description:
          "Guests leave without receiving a follow-up, reducing repeat visits and reviews.",
      },
      {
        title: "Low online review count",
        description:
          "Google and TripAdvisor reviews are key to new customer acquisition - most businesses don't ask.",
      },
    ],
    relevantProducts: [
      "whatsapp-ai-agent",
      "smart-scheduler",
      "post-interaction-messenger",
      "google-review-automation",
      "website-conversion-widget",
    ],
    automationFlow: [
      { step: 1, label: "Guest Enquires", description: "WhatsApp AI handles reservation enquiries" },
      { step: 2, label: "Booking Confirmed", description: "Reservation booked with automated confirmation" },
      { step: 3, label: "Reminder Sent", description: "Day-before reminder reduces no-shows" },
      { step: 4, label: "Review Requested", description: "Post-visit WhatsApp message with review link" },
    ],
    outcomes: [
      { metric: "24/7", description: "Reservation handling with no staff required" },
      { metric: "2–4x", description: "Monthly Google/TripAdvisor review increase" },
      { metric: "30%", description: "Increase in repeat guest visits" },
    ],
  },
  {
    slug: "education-coaching",
    name: "Education & Coaching",
    icon: "GraduationCap",
    headline: "More enrolments. Better retention. Less admin.",
    subheadline:
      "Automate enquiry handling, session booking, and client follow-up for coaches and educators.",
    problems: [
      {
        title: "Slow response to course enquiries",
        description:
          "Prospective students enquire on social media and wait too long for a response.",
      },
      {
        title: "Session scheduling inefficiency",
        description:
          "Coordinating 1:1 coaching or tutoring sessions manually creates admin backlog.",
      },
      {
        title: "Poor intake process",
        description:
          "First sessions delayed because client background information wasn't collected beforehand.",
      },
    ],
    relevantProducts: [
      "whatsapp-ai-agent",
      "smart-scheduler",
      "client-intake-automation",
      "automated-follow-up",
      "post-interaction-messenger",
    ],
    automationFlow: [
      { step: 1, label: "Enquiry Received", description: "WhatsApp AI responds with course/service info" },
      { step: 2, label: "Session Booked", description: "Smart Scheduler confirms the booking" },
      { step: 3, label: "Intake Collected", description: "Background form sent and completed via WhatsApp" },
      { step: 4, label: "Post-Session Follow-Up", description: "Resources and re-booking prompt sent automatically" },
    ],
    outcomes: [
      { metric: "3x", description: "Enquiry-to-enrolment conversion improvement" },
      { metric: "0", description: "Admin time spent on scheduling coordination" },
      { metric: "20–30 min", description: "Saved per client from automated intake" },
    ],
  },
  {
    slug: "ecommerce-product-businesses",
    name: "eCommerce & Product Businesses",
    icon: "ShoppingBag",
    headline: "More conversions. Fewer abandoned carts. Stronger reviews.",
    subheadline:
      "Automate customer enquiries, post-purchase follow-up, and review collection at scale.",
    problems: [
      {
        title: "High website bounce rate",
        description:
          "Visitors browse and leave without making contact because nothing prompts them to act.",
      },
      {
        title: "Abandoned cart recovery",
        description:
          "Customers who add to cart but don't complete purchase are rarely followed up.",
      },
      {
        title: "Low review volume",
        description:
          "Happy customers don't leave reviews without a direct, frictionless ask.",
      },
    ],
    relevantProducts: [
      "website-conversion-widget",
      "whatsapp-ai-agent",
      "automated-follow-up",
      "google-review-automation",
      "post-interaction-messenger",
    ],
    automationFlow: [
      { step: 1, label: "Visitor Arrives", description: "Website widget proactively engages after 20 seconds" },
      { step: 2, label: "Enquiry Captured", description: "Contact details collected before they leave" },
      { step: 3, label: "Purchase Follow-Up", description: "Post-purchase message confirms and upsells" },
      { step: 4, label: "Review Requested", description: "Automated review request 48h after delivery" },
    ],
    outcomes: [
      { metric: "3–5x", description: "Increase in website lead capture rate" },
      { metric: "2–4x", description: "Monthly review volume growth" },
      { metric: "100%", description: "Of enquiries followed up automatically" },
    ],
  },
];

export const getIndustryBySlug = (slug: string): Industry | undefined =>
  industries.find((i) => i.slug === slug);
