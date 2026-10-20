export interface Industry {
  slug: string;
  name: string;
  icon: string;
  headline: string;
  subheadline: string;
  problems: { title: string; description: string }[];
  relevantProducts: string[];
  automationFlow: { step: number; label: string; description: string }[];
}

export const industries: Industry[] = [
  {
    slug: "legal-professional-services",
    name: "Legal & Professional Services",
    icon: "Scale",
    headline: "Stop losing clients to slow response times.",
    subheadline:
      "New clients answered, sorted and followed up for you, so your team spends its time on paid work, not admin.",
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
      { step: 3, label: "Form Sent", description: "A short form goes to them on WhatsApp" },
      { step: 4, label: "Consultation Booked", description: "Smart Scheduler confirms the appointment" },
      { step: 5, label: "Review Requested", description: "A review request goes out by itself" },
    ],
  },
  {
    slug: "real-estate-property",
    name: "Real Estate & Property",
    icon: "Building2",
    headline: "More viewings. More offers. Less admin.",
    subheadline:
      "Every buyer and tenant answered, followed up and booked for a viewing, so your agents sell instead of chase.",
    problems: [
      {
        title: "Slow lead response",
        description:
          "Property enquiries come in 24/7, agents can't respond fast enough and lose buyers to competitors.",
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
          "People who didn't buy straight away are rarely followed up, so many sales are lost.",
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
      { step: 3, label: "Viewing Booked", description: "The viewing is booked and confirmed for you" },
      { step: 4, label: "Follow-Up", description: "A friendly check-in after the viewing" },
      { step: 5, label: "Cold Leads Reactivated", description: "Monthly reactivation campaign to dormant database" },
    ],
  },
  {
    slug: "medical-wellness",
    name: "Medical & Wellness",
    icon: "Heart",
    headline: "Full appointment books. Every call answered or texted back.",
    subheadline:
      "Bookings, reminders and questions handled for you, so your team can focus on patients.",
    problems: [
      {
        title: "High call volume",
        description:
          "Reception can't handle peak call demand, calls go unanswered and appointments are lost.",
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
      { step: 5, label: "Review Requested", description: "A review request goes out by itself" },
    ],
  },
  {
    slug: "automotive",
    name: "Automotive",
    icon: "Car",
    headline: "More service bookings. More vehicle sales. Less missed follow-up.",
    subheadline:
      "Every enquiry answered, services booked and old leads brought back, for your dealership or workshop.",
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
      { step: 3, label: "Booking Confirmed", description: "Service or test drive booked for you" },
      { step: 4, label: "Follow-Up Sequence", description: "Post-service follow-up and review request" },
    ],
  },
  {
    slug: "home-services-contractors",
    name: "Home Services & Contractors",
    icon: "Wrench",
    headline: "Every job enquiry answered and followed up.",
    subheadline:
      "Every enquiry answered, every job booked and every quote followed up, without you chasing.",
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
      { step: 2, label: "Quote Followed Up", description: "Friendly check-ins after the quote goes out" },
      { step: 3, label: "Job Booked", description: "Smart Scheduler confirms timing" },
      { step: 4, label: "Review Requested", description: "A review request goes out by itself" },
    ],
  },
  {
    slug: "fitness-gyms",
    name: "Fitness & Gyms",
    icon: "Dumbbell",
    headline: "Fill your classes. Reduce cancellations. Keep members longer.",
    subheadline:
      "Membership questions answered, classes booked and quiet members checked in on, for you.",
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
      { step: 3, label: "Membership Follow-Up", description: "Friendly check-ins after the trial" },
      { step: 4, label: "Retention Sequences", description: "Re-engagement for at-risk members" },
    ],
  },
  {
    slug: "beauty-aesthetics",
    name: "Beauty & Aesthetics",
    icon: "Sparkles",
    headline: "Every enquiry followed up. Reminders before every booking.",
    subheadline:
      "Bookings, reminders and review requests done for you, while you focus on clients.",
    problems: [
      {
        title: "No-shows and last-minute cancellations",
        description:
          "Empty appointment slots from clients who forget or cancel without warning.",
      },
      {
        title: "Enquiries going unanswered",
        description:
          "WhatsApp and DM enquiries coming in while you're with clients, replied to too late.",
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
  },
  {
    slug: "restaurants-hospitality",
    name: "Restaurants & Hospitality",
    icon: "UtensilsCrossed",
    headline: "More bookings. Better reviews. Guests that come back.",
    subheadline:
      "Bookings, follow-ups and reviews done for you, so your front of house can look after guests.",
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
          "Google and TripAdvisor reviews are key to new customer acquisition, most businesses don't ask.",
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
      { step: 2, label: "Booking Confirmed", description: "Booking made and confirmed for you" },
      { step: 3, label: "Reminder Sent", description: "Day-before reminder reduces no-shows" },
      { step: 4, label: "Review Requested", description: "Post-visit WhatsApp message with review link" },
    ],
  },
  {
    slug: "education-coaching",
    name: "Education & Coaching",
    icon: "GraduationCap",
    headline: "More enrolments. Better retention. Less admin.",
    subheadline:
      "Enquiries answered, sessions booked and clients followed up, for coaches and teachers.",
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
      { step: 4, label: "Post-Session Follow-Up", description: "Notes and a link to book again, sent for you" },
    ],
  },
  {
    slug: "ecommerce-product-businesses",
    name: "eCommerce & Product Businesses",
    icon: "ShoppingBag",
    headline: "More sales. Fewer abandoned carts. Better reviews.",
    subheadline:
      "Customer questions answered, orders followed up and reviews asked for, however busy you get.",
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
      { step: 4, label: "Review Requested", description: "A review request goes out 2 days after delivery" },
    ],
  },
];

export const getIndustryBySlug = (slug: string): Industry | undefined =>
  industries.find((i) => i.slug === slug);
