export interface Industry {
  slug: string;
  name: string;
  icon: string;
  headline: string;
  subheadline: string;
  /** shorter name for the page title (title stays within 60 characters) */
  metaName?: string;
  problems: { title: string; description: string }[];
  relevantProducts: string[];
  automationFlow: { step: number; label: string; description: string }[];
}

export const industries: Industry[] = [
  {
    slug: "legal-professional-services",
    name: "Legal & Professional Services",
    metaName: "Law and Professional Firms",
    icon: "Scale",
    headline: "New clients email after hours. We answer first.",
    subheadline:
      "New clients answered and booked in, so your team spends its time on paid work.",
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
      { step: 1, label: "Enquiry received", description: "Client calls or messages at any time" },
      { step: 2, label: "Answered straight away", description: "Verdance answers the call or WhatsApp within 60 seconds" },
      { step: 3, label: "Form sent", description: "A short form goes to them on WhatsApp" },
      { step: 4, label: "Consultation booked", description: "The appointment is confirmed from your live diary" },
      { step: 5, label: "Review requested", description: "A review request goes out by itself" },
    ],
  },
  {
    slug: "real-estate-property",
    name: "Real Estate & Property",
    icon: "Building2",
    headline: "Fifty people ask about one flat. Each one gets an answer.",
    subheadline:
      "Every buyer and tenant answered and booked for a viewing, so your agents can sell.",
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
      { step: 1, label: "Lead enquires", description: "Buyer or renter messages about a property" },
      { step: 2, label: "Questions asked", description: "Verdance asks about budget, timing and what they need" },
      { step: 3, label: "Viewing booked", description: "The viewing is booked and confirmed for you" },
      { step: 4, label: "Follow-up", description: "A friendly check-in after the viewing" },
      { step: 5, label: "Old leads woken up", description: "A monthly message to past enquiries who went quiet" },
    ],
  },
  {
    slug: "medical-wellness",
    name: "Medical & Wellness",
    icon: "Heart",
    headline: "The phones never stop. Every patient still gets an answer.",
    subheadline:
      "Bookings, reminders and questions handled, so your team can focus on patients.",
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
      { step: 1, label: "Patient calls", description: "Verdance answers every call, day or night" },
      { step: 2, label: "Appointment booked", description: "The appointment is confirmed from your live diary" },
      { step: 3, label: "Intake sent", description: "Patient completes the intake form on WhatsApp" },
      { step: 4, label: "Reminders sent", description: "A reminder the day before and an hour before, so fewer people miss it" },
      { step: 5, label: "Review requested", description: "A review request goes out by itself" },
    ],
  },
  {
    slug: "automotive",
    name: "Automotive",
    icon: "Car",
    headline: "Leads arrive on Saturday night. We reply before they go cold.",
    subheadline:
      "Every enquiry answered and booked in, for your dealership or workshop.",
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
      { step: 1, label: "Enquiry arrives", description: "Call or WhatsApp message received" },
      { step: 2, label: "Answered and sorted", description: "Verdance answers, asks the right questions and takes the details" },
      { step: 3, label: "Booking confirmed", description: "Service or test drive booked for you" },
      { step: 4, label: "Follow-up", description: "A check-in after the service, and a review request" },
    ],
  },
  {
    slug: "home-services-contractors",
    name: "Home Services & Contractors",
    metaName: "Builders and Contractors",
    icon: "Wrench",
    headline: "Quotes go out and nobody chases them. We follow up every one.",
    subheadline:
      "Every enquiry answered and every quote followed up, without you chasing.",
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
      { step: 1, label: "Client calls or messages", description: "Verdance answers straight away and takes the job details" },
      { step: 2, label: "Quote followed up", description: "Friendly check-ins after the quote goes out" },
      { step: 3, label: "Job booked", description: "The time is confirmed from your live diary" },
      { step: 4, label: "Review requested", description: "A review request goes out by itself" },
    ],
  },
  {
    slug: "fitness-gyms",
    name: "Fitness & Gyms",
    icon: "Dumbbell",
    headline: "People ask about joining, then never come in. We book their first visit.",
    subheadline:
      "Membership questions answered and first visits booked, for you.",
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
      { step: 1, label: "Enquiry received", description: "Verdance replies on WhatsApp within 60 seconds, with membership details" },
      { step: 2, label: "Trial booked", description: "The trial class is booked and confirmed from your live diary" },
      { step: 3, label: "Membership follow-up", description: "Friendly check-ins after the trial" },
      { step: 4, label: "Quiet members checked in on", description: "A friendly message to members who have stopped coming" },
    ],
  },
  {
    slug: "beauty-aesthetics",
    name: "Beauty & Aesthetics",
    icon: "Sparkles",
    headline: "Messages pile up while you are with a client. We reply and book them in.",
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
      { step: 1, label: "Booking request", description: "Verdance replies on WhatsApp within 60 seconds and takes the details" },
      { step: 2, label: "Appointment confirmed", description: "The booking is confirmed from your live diary" },
      { step: 3, label: "Reminders sent", description: "A reminder the day before and an hour before, so fewer people miss it" },
      { step: 4, label: "Follow-up and review", description: "A thank-you message after the visit, and a review request" },
    ],
  },
  {
    slug: "restaurants-hospitality",
    name: "Restaurants & Hospitality",
    icon: "UtensilsCrossed",
    headline: "Booking requests sit in the inbox during service. We confirm the table.",
    subheadline:
      "Booking requests answered for you, so your front of house can look after guests.",
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
      { step: 1, label: "Guest enquires", description: "Verdance replies on WhatsApp within 60 seconds and handles the reservation" },
      { step: 2, label: "Booking confirmed", description: "Booking made and confirmed for you" },
      { step: 3, label: "Reminder sent", description: "A reminder the day before, so fewer guests miss it" },
      { step: 4, label: "Review requested", description: "A WhatsApp after the visit with a review link" },
    ],
  },
  {
    slug: "education-coaching",
    name: "Education & Coaching",
    icon: "GraduationCap",
    headline: "Parents ask the same questions every week. We answer and book the open day.",
    subheadline:
      "Enquiries answered and sessions booked, for coaches and teachers.",
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
      { step: 1, label: "Enquiry received", description: "Verdance replies on WhatsApp within 60 seconds, with course details" },
      { step: 2, label: "Session booked", description: "The booking is confirmed from your live diary" },
      { step: 3, label: "Intake collected", description: "A background form sent and completed on WhatsApp" },
      { step: 4, label: "Follow-up after the session", description: "Notes and a link to book again, sent for you" },
    ],
  },
  {
    slug: "ecommerce-product-businesses",
    name: "E-commerce & Product Brands",
    icon: "ShoppingBag",
    headline: "Customers ask where their order is all day. We answer from your store.",
    subheadline:
      "Order, returns and wholesale questions answered from your own store.",
    problems: [
      { title: "Order questions all day", description: "Where's my order? arrives on WhatsApp, email and Instagram, and each one is looked up by hand." },
      { title: "Returns and swaps by hand", description: "Every return means the same questions and the same steps, typed out again." },
      { title: "Wholesale reorders waiting on a reply", description: "Trade customers want to reorder now. Their message waits in the inbox." },
    ],
    relevantProducts: ["whatsapp-ai-agent", "automated-follow-up", "post-interaction-messenger"],
    automationFlow: [
      { step: 1, label: "Customer asks", description: "On WhatsApp, email, Instagram or web chat" },
      { step: 2, label: "Order looked up", description: "Straight from your Shopify or WooCommerce store" },
      { step: 3, label: "Reply in 60 seconds", description: "Or a handover to a named person on your team" },
      { step: 4, label: "Monthly report", description: "Every question, and the hours it saved" },
    ],
  },
];

export const getIndustryBySlug = (slug: string): Industry | undefined =>
  industries.find((i) => i.slug === slug);
