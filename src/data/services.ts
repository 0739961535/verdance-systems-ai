/**
 * Verdance Systems AI · the 12 services.
 *
 * Every service has its own page at /services/[slug] and appears in the
 * services index and the nav. Copy rules (house style):
 *   - plain words a business owner in South Africa or the UK gets in five seconds,
 *     outcome first: what happens for their customer and their day
 *   - no jargon, no acronyms unless explained, no dashes as punctuation,
 *     no hype, no emojis, British English
 *   - no prices, no client names, no invented numbers. The only numbers
 *     are our own commitments (reply within 60 seconds)
 */

export type ServicePart = {
  /** Plain name of one part of the service. */
  name: string;
  /** One or two sentences: what it does for the customer and the owner. */
  description: string;
  /** How it works, in three short steps. */
  howItWorks: string[];
};

export type ServiceCategory = {
  slug: string;
  number: string;
  /** Plain service name, used in cards, the nav and breadcrumbs. */
  name: string;
  /** Hero headline, then the words set in the serif accent. */
  headline: string;
  italicWord: string;
  /** One line, outcome first. Used on cards. */
  promise: string;
  /** Two or three sentences: the outcome, then how it works in one line. */
  description: string;
  /** Three to five "what you get" bullets in plain language. */
  whatYouGet: string[];
  /** Who it suits best, in one line. */
  bestFor: string;
  /** The parts of the service, shown as the live console and the cards. */
  subProducts: ServicePart[];
  whyItMatters: string;
  outcome: string;
  relatedSlugs: string[];
  /** SEO title (before the brand suffix) and meta description. */
  seoTitle: string;
  seoDescription: string;
  /** The depth page content ("How it works"), when this service has one. */
  depth?: ServiceDepth;
};

/* ------------------------------------------------------------------ */
/* Depth pages: how each build works, step by step (Oct 2026)          */
/* ------------------------------------------------------------------ */

export type DepthTone = "amber" | "green" | "blue" | "muted";

/** A small decorative app screen next to a step. Sample content only. */
export type DepthVisual =
  /** One of the four home page screens (Answer, Follow up, Admin, Report). */
  | { kind: "work"; word: "Answer" | "Follow up" | "Admin" | "Report" }
  /** A short chat: an optional message in, then our reply. */
  | { kind: "chat"; app: string; time: string; inMsg?: string; outMsg: string; status?: string }
  /** One item with a title, a sub line and status chips. */
  | { kind: "status"; app: string; title: string; sub: string; chips: { text: string; tone: DepthTone }[] }
  /** A list of rows, each with a chip. */
  | { kind: "rows"; app: string; rows: { text: string; chip: string; tone: DepthTone }[] }
  /** A small browser frame with a page title and a button. */
  | { kind: "page"; url: string; title: string; sub: string; button: string };

export type DepthStep = { title: string; body: string; visual: DepthVisual };

export type ServiceDepth = {
  /** What it does, in one line. */
  oneLine: string;
  /** Four to six steps, in the order they happen. */
  steps: DepthStep[];
  /** What the client does, and what we do. */
  youDo: string[];
  weDo: string[];
  /** What the build looks like inside the 10 working days (one line). */
  buildNote: string;
  /** What you see each week once it is live. */
  weekly: { label: string; text: string }[];
  /** The questions a buyer asks. True answers only. */
  faqs: { q: string; a: string }[];
};

const BASE_CATEGORIES: ServiceCategory[] = [
  {
    slug: "lead-generation",
    number: "01",
    name: "Finding new customers",
    headline: "More people enquiring,",
    italicWord: "and old leads coming back.",
    promise: "We bring back past enquirers who agreed to hear from you, and find new businesses that match your best customers.",
    description:
      "Most businesses have a list of people who asked about them once and never booked. Those who agreed to hear from you get a friendly message in your voice, with an easy opt-out, and we book the ones who reply. New businesses that match your best customers are emailed once, with a clear opt-out. Every enquiry lands in one place, ready to be answered.",
    whatYouGet: [
      "A friendly message to past enquirers and customers who agreed to hear from you, with an easy opt-out",
      "A checked list of businesses that match your best customers, contacted once by email with a clear opt-out (POPIA in South Africa, PECR in the UK)",
      "Enquiry forms and landing pages that are short and easy to fill in on a phone",
      "Every reply answered quickly and booked into your diary",
    ],
    bestFor: "Businesses with a list of old enquiries, or a quiet diary they want to fill.",
    subProducts: [
      {
        name: "Waking up old enquiries",
        description: "A friendly message to past enquirers and customers who agreed to hear from you, with an easy opt-out.",
        howItWorks: ["You share the people who agreed to hear from you", "We write a short, friendly message with an easy opt-out", "Replies are answered and booked into your diary"],
      },
      {
        name: "Finding new customers",
        description: "A checked list of businesses that match your best customers, contacted once by email with a clear opt-out (POPIA in South Africa, PECR in the UK).",
        howItWorks: ["We agree who your ideal customer is", "We build and check a list of businesses", "Each is emailed once, with a clear opt-out"],
      },
      {
        name: "Enquiry forms",
        description: "Short forms on your website that are quick to fill in on a phone, so more visitors actually send them.",
        howItWorks: ["We pick the right pages for them", "We design them to match your brand", "Every form that comes in gets a reply straight away"],
      },
      {
        name: "Landing pages",
        description: "A single page for one offer or one advert, written to get people to enquire.",
        howItWorks: ["You tell us the offer and who it is for", "We write and build the page", "Enquiries are tracked and answered automatically"],
      },
    ],
    whyItMatters: "The cheapest new customer is often someone who already asked about you. Most businesses never follow them up.",
    outcome: "A steady flow of enquiries, including people you thought you had lost.",
    relatedSlugs: ["conversation-ai", "follow-up-nurture", "marketing-social"],
    seoTitle: "Win Back Old Enquiries and Find New Customers",
    seoDescription:
      "Bring back past enquirers who agreed to hear from you, and find new businesses like your best customers. Every reply answered and booked.",
  },
  {
    slug: "conversation-ai",
    number: "02",
    name: "Instant message replies",
    headline: "Every message answered,",
    italicWord: "day or night.",
    promise: "WhatsApp, website chat, Instagram, Facebook and SMS answered within 60 seconds, usually in seconds.",
    description:
      "When a customer messages you at 21:00, they get a helpful reply straight away instead of waiting until morning. It answers the usual questions in your words, checks what they need and books them in. Anything unusual goes to you or your team.",
    whatYouGet: [
      "Automatic replies on WhatsApp, your website chat, Instagram, Facebook and SMS",
      "Answers to your common questions, written in your tone",
      "Bookings made inside the conversation, straight into your diary",
      "One inbox where you can see and take over any conversation",
      "A hand-over to a person whenever something needs judgement",
    ],
    bestFor: "Businesses that get enquiries by message and cannot answer them all quickly, especially after hours.",
    subProducts: [
      {
        name: "WhatsApp replies",
        description: "Your WhatsApp business number answers every message in seconds, day or night.",
        howItWorks: ["We connect your WhatsApp business number", "It answers questions and books appointments", "You can step in on any conversation"],
      },
      {
        name: "Website chat",
        description: "A small chat on your website that answers visitors while they are still on the page, and books them.",
        howItWorks: ["We add the chat to your website", "It greets visitors and answers their questions", "Bookings go straight into your diary"],
      },
      {
        name: "Instagram and Facebook messages",
        description: "Direct messages and replies to your posts answered and turned into bookings.",
        howItWorks: ["We connect your Instagram and Facebook pages", "It replies in your tone", "Interested people are booked in"],
      },
      {
        name: "SMS replies",
        description: "Text messages to your business number answered in seconds.",
        howItWorks: ["We use your number or set up a new one", "It replies and asks what they need", "Every conversation is saved in one inbox"],
      },
      {
        name: "One inbox for everything",
        description: "Every conversation from every channel in one place, on your phone or computer.",
        howItWorks: ["All channels flow into one view", "Filter by channel or by who is handling it", "Reply from anywhere"],
      },
    ],
    whyItMatters: "People usually book with the first business that replies. A slow reply often means a lost customer, not a late one.",
    outcome: "Every message answered within 60 seconds, at any hour, and more of them booked.",
    relatedSlugs: ["voice-ai", "booking-calendar", "follow-up-nurture"],
    seoTitle: "WhatsApp and Chat Replies in 60 Seconds",
    seoDescription:
      "WhatsApp, website chat, Instagram, Facebook and SMS answered within 60 seconds, day or night, in your words. Anything unusual comes to you.",
  },
  {
    slug: "voice-ai",
    number: "03",
    name: "Phone answering",
    headline: "Every call answered,",
    italicWord: "even after hours.",
    promise: "A phone assistant that picks up when you cannot, answers questions and books the caller in.",
    description:
      "When you are on a job or the office is closed, callers still get a friendly voice that answers. It takes their details, answers common questions and books them into your diary. Urgent calls are passed to you, and you get a short summary of every call.",
    whatYouGet: [
      "Every call answered, including evenings and weekends",
      "Common questions answered and callers booked in",
      "Urgent calls passed straight to you or your team",
      "A short written summary of every call",
      "Optional call-backs to people who enquired but did not book",
    ],
    bestFor: "Businesses that miss calls while they are busy with customers or on site.",
    subProducts: [
      {
        name: "Answering incoming calls",
        description: "Picks up every call, sounds natural, answers questions and books the caller in.",
        howItWorks: ["We forward your number or set up a new one", "It answers in your business's name and tone", "Bookings and urgent calls are handled for you"],
      },
      {
        name: "Calling people back",
        description: "Calls back people who enquired, follows up on quotes and books those who are ready.",
        howItWorks: ["You choose who should be called", "It calls, asks a few questions and books", "Every result is noted against the customer"],
      },
      {
        name: "Getting calls to the right person",
        description: "Sends each call to the right person, and only interrupts you when it matters.",
        howItWorks: ["We set the rules by topic and time of day", "It handles the first contact", "It transfers the call when a person is needed"],
      },
      {
        name: "Knowing where calls come from",
        description: "See which advert, listing or page each call came from.",
        howItWorks: ["Each source gets its own number", "Every call is recorded against its source", "You see it all in your monthly report"],
      },
    ],
    whyItMatters: "A caller who gets no answer usually rings the next business on the list. They rarely leave a voicemail.",
    outcome: "No more missed calls, and no more callers left hanging after hours.",
    relatedSlugs: ["conversation-ai", "follow-up-nurture", "booking-calendar"],
    seoTitle: "AI Receptionist: Every Call Answered",
    seoDescription:
      "A phone assistant that picks up when you can't, answers questions and books the caller in. Urgent calls come to you, with a summary of every call.",
  },
  {
    slug: "crm-pipeline",
    number: "04",
    name: "One place for every customer",
    headline: "Every customer and every job,",
    italicWord: "in one place.",
    promise: "All your customers, enquiries and jobs in one place, so nothing slips through the cracks.",
    description:
      "Every call, message and booking is filed against the right customer automatically. You can see at a glance who enquired, who is waiting for a quote and who needs a follow-up. This is a CRM (customer records system), set up around how your business actually works.",
    whatYouGet: [
      "Customer records that fill themselves in from calls, messages and bookings",
      "A clear view of every enquiry and job, from first contact to paid",
      "The keenest customers shown first, so your team knows who to call",
      "Alerts when something has been waiting too long",
      "An assistant your team can ask questions in plain English",
    ],
    bestFor: "Businesses running on spreadsheets, notebooks or memory, where enquiries get lost.",
    subProducts: [
      {
        name: "Customer records",
        description: "One record for every customer, with every call, message and booking attached.",
        howItWorks: ["We agree what you need to keep", "We set it up around your business", "Your team is shown how to use it in under an hour"],
      },
      {
        name: "Every job at a glance",
        description: "A simple board showing each enquiry and job and where it is up to.",
        howItWorks: ["We agree the stages with you", "Jobs move along automatically as things happen", "You see what needs attention at a glance"],
      },
      {
        name: "Who to call first",
        description: "Enquiries sorted so the most likely customers are at the top.",
        howItWorks: ["We agree what a good customer looks like", "Each enquiry is sorted as it arrives", "Your team works the best ones first"],
      },
      {
        name: "An assistant for your team",
        description: "Your staff can ask questions about customers and get draft replies in seconds.",
        howItWorks: ["It reads your customer records and inbox", "Your team asks in plain English", "Drafts are ready to check and send"],
      },
    ],
    whyItMatters: "When customer details live in five places, enquiries get forgotten and follow-ups never happen.",
    outcome: "Every customer accounted for, and everyone on the team knows what to do next.",
    relatedSlugs: ["conversation-ai", "booking-calendar", "analytics-compliance"],
    seoTitle: "CRM Setup: Every Customer in One Place",
    seoDescription:
      "Every call, message and booking filed against the right customer. See who is waiting for a quote and who needs a follow-up, at a glance.",
  },
  {
    slug: "booking-calendar",
    number: "05",
    name: "Online booking",
    headline: "Customers book themselves in,",
    italicWord: "without the back and forth.",
    promise: "Customers book a time that suits them, day or night, and get reminders so they turn up.",
    description:
      "Customers pick a time from your real availability, on their phone, at any hour. They get a confirmation and reminders, and can move the booking with one tap. It works with the diary you already use, so you are never double-booked.",
    whatYouGet: [
      "A booking page customers can use at any time, on any phone",
      "Bookings made inside WhatsApp or chat, without sending a link",
      "Works with Google Calendar or Outlook, with no double-bookings",
      "Confirmations and reminders by SMS, WhatsApp or email",
      "One-tap rescheduling, and a summary of tomorrow's bookings each evening",
    ],
    bestFor: "Clinics, salons, venues, consultants and anyone whose day runs on appointments.",
    subProducts: [
      {
        name: "Booking page",
        description: "A clean booking page that shows your real availability and works well on a phone.",
        howItWorks: ["We set up your services and how long each takes", "Customers pick a time that suits them", "Confirmations are sent automatically"],
      },
      {
        name: "Booking inside the conversation",
        description: "When a customer asks on WhatsApp or chat, they are offered times and booked in the same conversation.",
        howItWorks: ["It suggests two or three open times", "The customer picks one in their reply", "The booking is confirmed without a link"],
      },
      {
        name: "Your diary, kept accurate",
        description: "Works with Google Calendar or Outlook so your availability is always right.",
        howItWorks: ["We connect your calendar", "Bookings and blocked time stay in sync", "No double-bookings"],
      },
      {
        name: "Reminders",
        description: "Reminders before each booking, with an easy way to move it, so fewer people forget.",
        howItWorks: ["We set when reminders go out", "Customers can reschedule with one tap", "You get a summary of the next day's bookings"],
      },
    ],
    whyItMatters: "Every extra message between interest and a booked time loses people. The easier it is to book, the more people do.",
    outcome: "More bookings, fewer no-shows and no double-bookings.",
    relatedSlugs: ["conversation-ai", "voice-ai", "follow-up-nurture"],
    seoTitle: "Online Booking and Reminders",
    seoDescription:
      "Customers book a time from your real diary, at any hour, and get reminders so they turn up. Works with Google Calendar or Outlook.",
  },
  {
    slug: "follow-up-nurture",
    number: "06",
    name: "Follow-up and missed call text back",
    headline: "No enquiry left",
    italicWord: "to go cold.",
    promise: "Missed calls get a text back in seconds, and every quote and quiet enquiry is followed up politely.",
    description:
      "When you miss a call, the caller gets a friendly text within seconds asking how you can help. Quotes and enquiries that go quiet are followed up a set number of times in your voice, and it stops the moment they reply. Past customers who agreed to hear from you are reminded when it is time to book again, with an easy opt-out.",
    whatYouGet: [
      "A text back to every missed call, within seconds",
      "Polite follow-ups on quotes and quiet enquiries, stopped the moment they reply or opt out",
      "Reminders to past customers who agreed to hear from you, with an easy opt-out",
      "A recap message after phone calls, with the next step",
    ],
    bestFor: "Trades and service businesses that miss calls on the job or send quotes that go quiet.",
    subProducts: [
      {
        name: "Missed call text back",
        description: "Every missed call gets a text within seconds, so the caller books with you instead of calling someone else.",
        howItWorks: ["We connect your business number", "A missed call sends a friendly text straight away", "The conversation carries on and books them in"],
      },
      {
        name: "Following up quotes",
        description: "Quotes that go quiet are followed up a few times, politely, in your voice.",
        howItWorks: ["A quote goes out", "Follow-ups are sent on set days", "They stop the moment the customer replies"],
      },
      {
        name: "Bringing customers back",
        description: "Past customers who agreed to hear from you get a reminder when they are due again, with an easy opt-out.",
        howItWorks: ["We set the right gap for each service", "A personal message goes out at that time", "One tap to book again"],
      },
      {
        name: "After-call recap",
        description: "After a phone call, the customer gets a short summary and the next step by text.",
        howItWorks: ["The call is summarised", "A recap with the next step is written", "It is sent within a minute of hanging up"],
      },
    ],
    whyItMatters: "Most enquiries are not lost on price. They are lost because nobody followed up.",
    outcome: "Customers you would have lost, recovered every week without anyone chasing them by hand.",
    relatedSlugs: ["conversation-ai", "lead-generation", "reputation-reviews"],
    seoTitle: "Missed Call Text Back and Quote Follow-up",
    seoDescription:
      "Missed calls get a friendly text within seconds. Quiet quotes and enquiries are followed up politely in your voice, and it stops when they reply.",
  },
  {
    slug: "payments-invoicing",
    number: "07",
    name: "Invoices and payment links",
    headline: "Send the invoice,",
    italicWord: "get paid sooner.",
    promise: "Invoices and payment links sent the moment the work is done, then followed up until they are paid.",
    description:
      "Invoices go out as soon as a job is finished, with a link the customer can pay from on their phone. Deposits can be taken when someone books, and late payments get polite reminders automatically. You see who has paid without checking your bank.",
    whatYouGet: [
      "Branded invoices sent from your phone or computer",
      "Payment links by WhatsApp, SMS or email that customers pay in a tap",
      "Deposits taken at booking to hold the slot",
      "Polite reminders for late payments, sent automatically",
      "Payment status shown against each customer",
    ],
    bestFor: "Businesses that wait too long to get paid or spend evenings chasing invoices.",
    subProducts: [
      {
        name: "Invoices",
        description: "Branded invoices created and sent in a couple of taps.",
        howItWorks: ["We set up your items and tax once", "Create and send an invoice in seconds", "Its status is tracked until paid"],
      },
      {
        name: "Payment links",
        description: "A link the customer can pay from on WhatsApp, SMS or email.",
        howItWorks: ["Set the amount and reference", "Send the link in the conversation", "Payment shows against the customer"],
      },
      {
        name: "Deposits",
        description: "Take a deposit when someone books, so the slot is held and no-shows cost less.",
        howItWorks: ["Choose which services need a deposit", "The customer pays when booking", "The deposit is recorded with the booking"],
      },
      {
        name: "Payment reminders",
        description: "Late payments get polite reminders, so you do not have to chase.",
        howItWorks: ["An invoice passes its due date", "A friendly reminder goes out", "Reminders stop once it is paid"],
      },
    ],
    whyItMatters: "Money gets stuck between the quote and the payment. The fewer steps for the customer, the faster you are paid.",
    outcome: "Faster payments, fewer no-shows and less time chasing.",
    relatedSlugs: ["booking-calendar", "crm-pipeline", "follow-up-nurture"],
    seoTitle: "Invoices, Payment Links and Reminders",
    seoDescription:
      "Invoices and payment links sent the moment the job is done, deposits taken at booking, and late payers reminded politely. Get paid sooner.",
  },
  {
    slug: "reputation-reviews",
    number: "08",
    name: "Google reviews",
    headline: "More good reviews,",
    italicWord: "without having to ask.",
    promise: "Every customer is asked for a Google review the same way, at the right moment, and every review gets a reply.",
    description:
      "After each job or visit, the customer gets a short, friendly request with a link straight to your Google review page. Every customer is asked the same way, whatever they thought. New reviews are flagged to you, with a reply ready to send, so every review gets an answer.",
    whatYouGet: [
      "A review request after every job or visit, by SMS or WhatsApp",
      "Every customer asked the same way, never only the happy ones",
      "An alert for every new review, with a reply drafted for you",
      "Your best reviews shown on your website",
      "A reply to every review, good or bad, drafted for you to approve",
    ],
    bestFor: "Local businesses where customers check Google before they choose who to call.",
    subProducts: [
      {
        name: "Google review requests",
        description: "Every customer gets the same friendly request with a link straight to your Google review page.",
        howItWorks: ["A job or visit is marked as done", "A personal request goes out by SMS or WhatsApp", "One tap takes them to your review page"],
      },
      {
        name: "Hearing about problems",
        description: "Any customer can tell you about a problem at any time. You put it right, and they still choose whether to review.",
        howItWorks: ["A problem is flagged to you straight away", "You call or message them to put it right", "The review request still goes to everyone"],
      },
      {
        name: "Review alerts and replies",
        description: "Know the moment a new review appears, with a reply ready to check and post.",
        howItWorks: ["New reviews are spotted straight away", "A reply is drafted in your tone", "You approve it with one tap"],
      },
      {
        name: "Reviews on your website",
        description: "Your best reviews shown on your site, updated automatically.",
        howItWorks: ["We add a reviews section to your site", "It updates as new reviews come in", "It matches your branding"],
      },
    ],
    whyItMatters: "Good reviews bring in new customers every day. Most customers simply forget to leave one unless they are asked.",
    outcome: "A steady stream of new Google reviews, and a reply to every one.",
    relatedSlugs: ["follow-up-nurture", "marketing-social", "lead-generation"],
    seoTitle: "More Google Reviews, Asked at the Right Time",
    seoDescription:
      "Every customer gets the same friendly Google review request after each job, and every review gets a reply, drafted for you to approve.",
  },
  {
    slug: "websites-build",
    number: "09",
    name: "Websites that bring in enquiries",
    headline: "A website that",
    italicWord: "books customers.",
    promise: "A fast website that people find on Google and that turns visitors into enquiries and bookings.",
    description:
      "We build websites that load quickly on a phone, show up on Google and make it easy to get in touch. Chat, booking and enquiry forms are built in, so the site keeps working when you are not. If you already have a site, we can add these without starting again.",
    whatYouGet: [
      "A fast website that works well on phones",
      "Set up properly so Google can find and show it",
      "Chat, booking and enquiry forms built in",
      "Landing pages for your adverts and offers",
      "A private area where customers see their bookings and invoices, if you need one",
    ],
    bestFor: "Businesses whose website is out of date, slow, or does not bring in enquiries.",
    subProducts: [
      {
        name: "A new website",
        description: "A website built properly, quick to load and set up so Google can find you.",
        howItWorks: ["We plan the pages and design with you", "We write and build the site", "It goes live with tracking in place"],
      },
      {
        name: "Upgrading your current site",
        description: "Add chat, booking and enquiry tracking to the site you already have.",
        howItWorks: ["We look at your current site", "We add chat, booking and tracking", "Added to your site, without rebuilding it"],
      },
      {
        name: "Landing pages",
        description: "Single pages for one advert or offer, written to get people to enquire.",
        howItWorks: ["We match the page to the advert", "One clear next step", "Every enquiry is answered automatically"],
      },
      {
        name: "Customer area",
        description: "A private area where customers can see their bookings, invoices and files.",
        howItWorks: ["Customers get an account when they first book", "They find their history without calling you", "Less admin for your team"],
      },
    ],
    whyItMatters: "Most business websites are digital brochures. Yours should answer, capture and book, even when you are closed.",
    outcome: "A website that turns visitors into enquiries and bookings.",
    relatedSlugs: ["lead-generation", "conversation-ai", "marketing-social"],
    seoTitle: "Websites That Turn Visits into Enquiries",
    seoDescription:
      "Fast websites that show up on Google and make getting in touch easy, with chat, booking and enquiry forms built in. Free Operations Map.",
  },
  {
    slug: "marketing-social",
    number: "10",
    name: "Social media and ads",
    headline: "Show up every week,",
    italicWord: "without the effort.",
    promise: "Your social media keeps posting and your adverts keep working, even in your busiest weeks.",
    description:
      "We plan and prepare your posts in your voice, you approve them, and they go out on schedule. We can run your Facebook, Instagram and Google adverts and check them every week. Every enquiry they bring in is answered automatically.",
    whatYouGet: [
      "Regular posts on Instagram, Facebook, LinkedIn or TikTok, written in your voice",
      "Everything prepared for you to approve before it goes out",
      "Facebook, Instagram and Google adverts set up and checked weekly",
      "Email newsletters to past customers who agreed to hear from you, with an easy opt-out",
      "One calendar showing everything that is planned",
    ],
    bestFor: "Owners who know they should post more but never have the time.",
    subProducts: [
      {
        name: "Social media posting",
        description: "Posts planned, written and scheduled across your channels, in your voice.",
        howItWorks: ["We agree your topics and look", "We prepare the posts for you to approve", "They go out on schedule"],
      },
      {
        name: "Adverts",
        description: "Facebook, Instagram and Google adverts set up, written and checked every week.",
        howItWorks: ["You set the goal and the budget", "We create the adverts and choose who sees them", "We check and improve them weekly"],
      },
      {
        name: "Email newsletters",
        description: "Newsletters and offers to past customers who agreed to hear from you, each with an easy opt-out.",
        howItWorks: ["We agree how often and what about", "We write them for you to approve", "They are sent and you see the results"],
      },
      {
        name: "One content calendar",
        description: "Everything planned across every channel, in one simple calendar.",
        howItWorks: ["See the week at a glance", "Write once and post everywhere", "See what worked"],
      },
    ],
    whyItMatters: "People buy from businesses they see often. Posting regularly is the part most owners drop first when they get busy.",
    outcome: "A business that stays visible every week, and more people getting in touch.",
    relatedSlugs: ["websites-build", "lead-generation", "reputation-reviews"],
    seoTitle: "Social Media and Ads, Done for You",
    seoDescription:
      "Posts planned in your voice and approved by you, adverts checked every week, and every enquiry they bring in answered within 60 seconds.",
  },
  {
    slug: "custom-builds",
    number: "11",
    name: "Custom automation",
    headline: "The jobs only your business has,",
    italicWord: "done for you.",
    promise: "We automate the repetitive work that is unique to your business and connect the tools you already use.",
    description:
      "Every business has jobs no ready-made tool handles: copying details between systems, building the same document every week, chasing the same steps. We build something that does that work for you, safely, and connects to the tools you already run. You approve anything that matters before it happens.",
    whatYouGet: [
      "The repetitive copying and admin between your tools, done automatically",
      "Your existing systems passing information to each other",
      "An assistant trained on your own documents and rules",
      "Checks and alerts so you know it is working",
    ],
    bestFor: "Businesses where staff spend hours a week on the same manual steps.",
    subProducts: [
      {
        name: "Automating repeat work",
        description: "The same steps your team does every day, done automatically.",
        howItWorks: ["We find the job that eats the most time", "We build something that does it", "We watch it and improve it after launch"],
      },
      {
        name: "Connecting your tools",
        description: "Your existing systems sharing information, so nothing is typed in twice.",
        howItWorks: ["We look at the tools you use", "We connect them safely", "Alerts tell you if anything stops working"],
      },
      {
        name: "Your own assistant",
        description: "An assistant trained on your own documents and rules, that hands anything unsure to a person.",
        howItWorks: ["We agree what it should and should not do", "We train it on your own information", "It hands over to a person when unsure"],
      },
    ],
    whyItMatters: "Ready-made tools cover most of a business. The last part, the bit only you do, is usually where the hours go.",
    outcome: "The admin your team has been asking to get rid of, finally done for them.",
    relatedSlugs: ["crm-pipeline", "analytics-compliance", "websites-build"],
    seoTitle: "Custom Automation and AI Helpers",
    seoDescription:
      "We automate the work only your business has and connect the tools you already use. You approve anything that matters before it happens.",
  },
  {
    slug: "analytics-compliance",
    number: "12",
    name: "Reports and privacy",
    headline: "Know what is working,",
    italicWord: "and keep customer data safe.",
    promise: "A clear monthly report on enquiries, bookings and money, with customer data handled the way POPIA and UK GDPR require.",
    description:
      "You see how many people enquired, how fast they were answered and how many booked, in plain words and in money terms. Customer data is collected with consent and can be exported or deleted on request, as privacy law requires (POPIA in South Africa, UK GDPR in the UK). Each month we suggest one thing to improve.",
    whatYouGet: [
      "A live dashboard of enquiries, reply times and bookings",
      "A short monthly report in plain words, with the value in money terms",
      "Consent captured on every form, as POPIA and UK GDPR require",
      "Customer data that can be exported or deleted on request",
      "One clear suggestion each month on what to improve",
    ],
    bestFor: "Owners who want to know what is working, and anyone who handles customer data.",
    subProducts: [
      {
        name: "Your numbers, live",
        description: "Enquiries, reply times, bookings and where customers came from, in one dashboard.",
        howItWorks: ["We connect your website, inbox and diary", "The dashboard updates by itself", "You check it whenever you like"],
      },
      {
        name: "Monthly report",
        description: "A short report each month on what moved and why, in plain words.",
        howItWorks: ["It is built from your live numbers", "It explains what changed", "It ends with one thing to do next"],
      },
      {
        name: "Privacy basics",
        description: "Consent, data requests and a record of what happened, handled properly.",
        howItWorks: ["Consent is captured on every form", "Data can be exported or deleted on request", "There is a record if anyone asks"],
      },
      {
        name: "Steady improvements",
        description: "Small changes, tested one at a time, to turn more enquiries into bookings.",
        howItWorks: ["We find the weakest step", "We try a better version", "We keep what works"],
      },
    ],
    whyItMatters: "Without the numbers, decisions are guesses. With them, you can see what to fix first.",
    outcome: "Clear numbers every month, and customer data handled the right way.",
    relatedSlugs: ["crm-pipeline", "marketing-social", "custom-builds"],
    seoTitle: "Monthly Reports and Data Privacy",
    seoDescription:
      "A plain monthly report on enquiries, reply times and bookings, with customer data handled the way POPIA and UK GDPR require.",
  },
];

/**
 * Depth content per service slug. Sample screens only: names, times and
 * numbers in the visuals are made up and the page labels them as samples.
 */
const LIVE_FAQ = {
  q: "How long until it is live?",
  a: "The first phase is live in 10 working days from sign-off. You test it yourself before any customer sees it.",
};

const SERVICE_DEPTH: Record<string, ServiceDepth> = {
  "conversation-ai": {
    oneLine: "Every message on WhatsApp, your website, Instagram, Facebook and SMS gets a helpful reply within 60 seconds, day or night.",
    steps: [
      {
        title: "A customer messages you",
        body: "It might be WhatsApp at 22:15 or Instagram on a Sunday. Every channel lands in one inbox.",
        visual: {
          kind: "rows",
          app: "One inbox",
          rows: [
            { text: "WhatsApp: Do you deliver to Durban?", chip: "New", tone: "blue" },
            { text: "Instagram: Price for 40 units?", chip: "New", tone: "blue" },
            { text: "Website chat: Open on Saturday?", chip: "New", tone: "blue" },
          ],
        },
      },
      {
        title: "It replies within 60 seconds",
        body: "The answer comes from your own prices, hours and policies, written the way you speak.",
        visual: { kind: "work", word: "Answer" },
      },
      {
        title: "It asks what it needs to know",
        body: "One or two short questions, so your team gets the full picture instead of a vague first message.",
        visual: {
          kind: "chat",
          app: "Instagram",
          time: "16:02",
          inMsg: "Can I order 40 units for a function?",
          outMsg: "Yes, we can do 40. Which date do you need them by, and is it delivery or collection?",
        },
      },
      {
        title: "It books, or hands over",
        body: "Simple requests are booked in the same chat. Anything that needs judgement goes to a person with a short summary and the whole chat.",
        visual: {
          kind: "status",
          app: "Handover",
          title: "Bulk order with a custom label",
          sub: "Summary sent to your team",
          chips: [
            { text: "Needs a person", tone: "amber" },
            { text: "Taken over", tone: "green" },
          ],
        },
      },
    ],
    youDo: [
      "Tell us your prices, hours and the questions people ask most",
      "Choose which replies need your approval first",
      "Pick who takes over when a person is needed",
      "Reply to the handovers it sends you",
    ],
    weDo: [
      "Connect WhatsApp, website chat, Instagram, Facebook and SMS to one inbox",
      "Write and test the replies in your voice",
      "Set the rules for when a person takes over",
      "Watch the first weeks closely and fix anything unclear",
      "Update it when your prices or hours change",
    ],
    buildNote: "We connect your channels, write the replies and test them with you.",
    weekly: [
      { label: "Every day", text: "New enquiries answered, and a clear note of anything handed to your team." },
      { label: "Any time", text: "Open the inbox on your phone and take over any conversation." },
      { label: "When unsure", text: "It hands over instead of guessing. We add the answer so it knows next time." },
      { label: "Each month", text: "A short report on enquiries, reply times and bookings, with one thing to improve." },
    ],
    faqs: [
      {
        q: "Will it sound like a robot?",
        a: "It answers in your voice, using your own words, prices and policies. You read sample replies and approve them before it goes live.",
      },
      {
        q: "What happens when it does not know the answer?",
        a: "It tells the customer a person will reply, and hands the conversation to your team with a short summary. It does not guess.",
      },
      {
        q: "Can I approve replies before they go out?",
        a: "Yes. Approve every reply, or let routine ones go out on their own. You can change this at any time.",
      },
      {
        q: "Which channels does it cover?",
        a: "WhatsApp, website chat, Instagram, Facebook and SMS. Phone calls are a separate service.",
      },
      LIVE_FAQ,
      {
        q: "Where do the conversations live?",
        a: "In accounts set up in your business's name. Consent and data requests are handled the way POPIA and UK GDPR require.",
      },
    ],
  },

  "follow-up-nurture": {
    oneLine: "Missed calls get a text back in seconds, and quotes that go quiet are followed up politely until the customer replies.",
    steps: [
      {
        title: "A call is missed, or a quote goes quiet",
        body: "You are on site or with a customer. Normally that caller tries the next business on the list.",
        visual: {
          kind: "status",
          app: "Calls",
          title: "Missed call",
          sub: "07:42, while you were on site",
          chips: [{ text: "Missed", tone: "amber" }],
        },
      },
      {
        title: "A text goes back in seconds",
        body: "A friendly message asks how you can help, so the conversation carries on by text.",
        visual: {
          kind: "chat",
          app: "SMS",
          time: "07:42",
          outMsg: "Sorry we missed your call. How can we help? You can reply here.",
          inMsg: undefined,
          status: "Sent 07:42",
        },
      },
      {
        title: "Follow-ups go out at sensible times",
        body: "Quiet quotes and enquiries get a short, polite check-in in your voice, on the days you choose.",
        visual: { kind: "work", word: "Follow up" },
      },
      {
        title: "Replies come straight to you",
        body: "When the customer answers, the chat lands in your inbox and the follow-ups stop. A no thanks stops them too.",
        visual: {
          kind: "chat",
          app: "WhatsApp",
          time: "09:14",
          inMsg: "Yes, still keen. Can you start in March?",
          outMsg: "Great. I have passed this to the team, they will confirm a start date today.",
        },
      },
    ],
    youDo: [
      "Tell us how soon and how often to follow up",
      "Approve the wording once",
      "Reply when a customer comes back",
      "Tell us about anyone who must never be contacted",
    ],
    weDo: [
      "Set up the missed call text back on your business number",
      "Write the follow-ups in your voice",
      "Set the timing so nothing goes out late at night",
      "Stop follow-ups the moment someone replies or says no",
      "Check the results and adjust the wording",
    ],
    buildNote: "We set up the text back, write the follow-ups and test them on your own phone.",
    weekly: [
      { label: "Every day", text: "Missed callers texted back in seconds, and their replies in your inbox." },
      { label: "Every week", text: "Quiet quotes followed up on the days you chose, and stopped for anyone who replied." },
      { label: "Any time", text: "See who was followed up, who replied and who said no, in one place." },
      { label: "Each month", text: "A short report on enquiries won back, with one thing to improve." },
    ],
    faqs: [
      {
        q: "Will customers find it pushy?",
        a: "The messages are short and polite, go out at sensible hours, and stop the moment someone replies or asks us to stop.",
      },
      {
        q: "Can I see what goes out?",
        a: "Yes. You approve the wording before anything is sent, and you can see every message afterwards.",
      },
      {
        q: "Who gets followed up?",
        a: "Only people who contacted you first or asked for a quote. Every message has an easy way to opt out, as POPIA and UK GDPR require.",
      },
      {
        q: "What if a customer replies at night?",
        a: "The reply lands in your inbox. If you also have instant replies, they get an answer within 60 seconds.",
      },
      LIVE_FAQ,
    ],
  },

  "booking-calendar": {
    oneLine: "Bookings, reminders and the details that go with them are done for you, so nobody types the same thing twice.",
    steps: [
      {
        title: "A customer picks a time",
        body: "On your booking page or inside a WhatsApp chat, from your real availability, at any hour.",
        visual: { kind: "page", url: "yourbusiness.co.za/book", title: "Choose a time", sub: "Tuesday 14", button: "07:30 to 09:00" },
      },
      {
        title: "The details are captured once",
        body: "Name, number, address and photos are asked for in the booking, not in five phone calls later.",
        visual: {
          kind: "rows",
          app: "Booking details",
          rows: [
            { text: "Name and number", chip: "Saved", tone: "green" },
            { text: "Address", chip: "Saved", tone: "green" },
            { text: "Photos of the job", chip: "Saved", tone: "green" },
          ],
        },
      },
      {
        title: "It lands in your diary",
        body: "It works with Google Calendar or Outlook, so only free times are offered and nothing is double-booked.",
        visual: { kind: "work", word: "Admin" },
      },
      {
        title: "Reminders go out",
        body: "A confirmation straight away and a reminder before the visit, with one tap to move it. Each evening you get tomorrow's list.",
        visual: {
          kind: "chat",
          app: "WhatsApp",
          time: "20:00",
          outMsg: "Reminder: we see you tomorrow at 07:30. Reply 1 to confirm or 2 to move it.",
          inMsg: undefined,
          status: "Confirmed by the customer",
        },
      },
    ],
    youDo: [
      "Tell us your services and how long each one takes",
      "Choose which diary to use",
      "Say how far ahead people may book",
      "Turn up to the bookings",
    ],
    weDo: [
      "Build your booking page and booking inside chats",
      "Connect your diary so only free times are offered",
      "Set up confirmations and reminders",
      "Save every booking's details to the customer's record",
      "Adjust anything that does not fit how you work",
    ],
    buildNote: "We set up your services, connect your diary and make test bookings with you.",
    weekly: [
      { label: "Every evening", text: "A summary of tomorrow's bookings." },
      { label: "Every booking", text: "A confirmation and a reminder sent for you, with one tap to move it." },
      { label: "Any time", text: "Your diary, always showing what is really booked." },
      { label: "Each month", text: "A short report on bookings and no-shows, with one thing to improve." },
    ],
    faqs: [
      {
        q: "Which diary does it work with?",
        a: "Google Calendar or Outlook. Bookings and blocked time stay in sync both ways.",
      },
      {
        q: "Can customers move their own booking?",
        a: "Yes, with one tap from the reminder. The new time comes from your real availability.",
      },
      {
        q: "Can people book inside WhatsApp?",
        a: "Yes. When someone asks on WhatsApp or chat, they are offered two or three open times and booked in the same conversation.",
      },
      {
        q: "What if I need to block out time?",
        a: "Block it in your diary as normal. Those times are no longer offered.",
      },
      LIVE_FAQ,
    ],
  },

  "analytics-compliance": {
    oneLine: "A live view and a short monthly report on enquiries, reply times and bookings, with customer data handled the way POPIA and UK GDPR require.",
    steps: [
      {
        title: "Your channels are connected",
        body: "Your website, inbox and diary feed one place, so the numbers come from what really happened.",
        visual: {
          kind: "rows",
          app: "Sources",
          rows: [
            { text: "Website forms", chip: "Connected", tone: "green" },
            { text: "WhatsApp and chat", chip: "Connected", tone: "green" },
            { text: "Diary", chip: "Connected", tone: "green" },
          ],
        },
      },
      {
        title: "The numbers update by themselves",
        body: "Enquiries, reply times, bookings and where customers came from. Nobody fills in a spreadsheet.",
        visual: {
          kind: "rows",
          app: "Live view · Sample",
          rows: [
            { text: "Enquiries this week", chip: "38", tone: "blue" },
            { text: "Answered within 60 seconds", chip: "38", tone: "green" },
            { text: "Booked", chip: "14", tone: "blue" },
          ],
        },
      },
      {
        title: "The monthly report arrives",
        body: "A short report in plain words on what moved and why, ending with one thing to improve.",
        visual: { kind: "work", word: "Report" },
      },
      {
        title: "Privacy kept in order",
        body: "Consent on every form, data requests handled, and a record kept in case anyone asks.",
        visual: {
          kind: "rows",
          app: "Privacy",
          rows: [
            { text: "Consent on every form", chip: "On", tone: "green" },
            { text: "Export or delete on request", chip: "Ready", tone: "green" },
            { text: "Record of every request", chip: "Kept", tone: "green" },
          ],
        },
      },
    ],
    youDo: [
      "Tell us which numbers matter most to you",
      "Read the monthly report, it takes a few minutes",
      "Pass on any data requests you receive",
      "Decide which suggestion to try",
    ],
    weDo: [
      "Connect your website, inbox and diary",
      "Build the live view and the monthly report",
      "Add consent and opt-outs to every form",
      "Set up export and delete for data requests",
      "Suggest and test one improvement each month",
    ],
    buildNote: "We connect your sources, build the live view and check every number with you.",
    weekly: [
      { label: "Any time", text: "The live view: enquiries, reply times and bookings." },
      { label: "Every week", text: "Where enquiries came from, so you know which channels earn their keep." },
      { label: "Each month", text: "The report, in plain words, with one thing to improve." },
      { label: "On request", text: "Customer data exported or deleted, with a record kept." },
    ],
    faqs: [
      {
        q: "What is in the monthly report?",
        a: "How many people enquired, how fast they were answered, how many booked and what that was worth. Then one suggestion for next month.",
      },
      {
        q: "Do I have to log in to anything?",
        a: "No. The report comes to you. The live view is there if you want to look.",
      },
      {
        q: "Is this legal advice on POPIA?",
        a: "No. We build consent, opt-outs and data requests into the system. For legal questions, speak to your own adviser.",
      },
      {
        q: "Who can see the numbers?",
        a: "You, and anyone you choose to add. The accounts are in your business's name.",
      },
      LIVE_FAQ,
    ],
  },

  "websites-build": {
    oneLine: "A fast website that people find on Google, with enquiry forms that are answered within 60 seconds.",
    steps: [
      {
        title: "We learn who buys from you",
        body: "What they ask, what they worry about and why they choose you. The site is written for them.",
        visual: {
          kind: "rows",
          app: "Brief",
          rows: [
            { text: "Who buys", chip: "Agreed", tone: "green" },
            { text: "What they ask first", chip: "Agreed", tone: "green" },
            { text: "The one next step", chip: "Agreed", tone: "green" },
          ],
        },
      },
      {
        title: "We write and design it",
        body: "Plain words in your voice, set out so people can find you on Google. Made for a phone first.",
        visual: { kind: "page", url: "yourbusiness.co.za", title: "Homes built around how you live", sub: "Design and build", button: "Start a project brief" },
      },
      {
        title: "Every form goes somewhere",
        body: "Enquiries land in your inbox and your customer records, and get a reply within 60 seconds.",
        visual: {
          kind: "chat",
          app: "Website form",
          time: "21:08",
          inMsg: "New project brief: 4 bedrooms, plot in hand, start next year.",
          outMsg: "Thanks for the brief. Could we book a 20-minute call? Tuesday 10:00 or Thursday 14:00.",
        },
      },
      {
        title: "We test it on real phones",
        body: "Speed, forms and booking are checked on phones and laptops. It goes live in your business's name.",
        visual: {
          kind: "rows",
          app: "Checks",
          rows: [
            { text: "iPhone", chip: "Checked", tone: "green" },
            { text: "Android", chip: "Checked", tone: "green" },
            { text: "Laptop", chip: "Checked", tone: "green" },
          ],
        },
      },
    ],
    youDo: [
      "Tell us about your buyers and your best work",
      "Send photos, or let us arrange them",
      "Review the pages and ask for changes",
      "Approve it before it goes live",
    ],
    weDo: [
      "Plan the pages and write the words",
      "Design and build it, phone first",
      "Set it up so Google can find and show it",
      "Connect every form to your inbox and records",
      "Test it on phones and laptops, then launch",
    ],
    buildNote: "We write, design and build the pages, then connect every form.",
    weekly: [
      { label: "Every enquiry", text: "Answered within 60 seconds and saved to your customer records." },
      { label: "Every week", text: "How many people visited and how many got in touch." },
      { label: "Any time", text: "Changes to text or photos, made by us when you ask." },
      { label: "Each month", text: "A short report with one thing to improve on the site." },
    ],
    faqs: [
      {
        q: "Can you work with my current website?",
        a: "Often, yes. We can add chat, booking and enquiry tracking to the site you have, without rebuilding it.",
      },
      {
        q: "Who owns the website?",
        a: "You do. The domain, the content and the accounts are in your business's name.",
      },
      {
        q: "Do I need to write the words?",
        a: "No. We write them in your voice after talking to you, and you approve every page.",
      },
      {
        q: "Will it show up on Google?",
        a: "It is set up properly so Google can find and show it. Where you rank also depends on your market, so we will not promise a position.",
      },
      LIVE_FAQ,
    ],
  },

  "custom-builds": {
    oneLine: "The repetitive work only your business has, done by an automation or an assistant that follows your rules and asks before anything important.",
    steps: [
      {
        title: "We find the job that eats the most time",
        body: "We look at the steps your team repeats every day and pick the one worth doing first.",
        visual: {
          kind: "rows",
          app: "Repeat work",
          rows: [
            { text: "Copying orders into a spreadsheet", chip: "Daily", tone: "amber" },
            { text: "Building the weekly quote pack", chip: "Weekly", tone: "amber" },
            { text: "Chasing the same paperwork", chip: "Daily", tone: "amber" },
          ],
        },
      },
      {
        title: "We agree the rules",
        body: "What it may do on its own, what it must ask about, and who it asks.",
        visual: {
          kind: "rows",
          app: "Rules",
          rows: [
            { text: "Update the order sheet", chip: "On its own", tone: "green" },
            { text: "Email a supplier", chip: "Asks first", tone: "amber" },
            { text: "Anything that costs money", chip: "Asks first", tone: "amber" },
          ],
        },
      },
      {
        title: "We connect your tools",
        body: "Your email, spreadsheets and systems pass information to each other, so nothing is typed in twice.",
        visual: {
          kind: "rows",
          app: "Connected",
          rows: [
            { text: "Email", chip: "Connected", tone: "green" },
            { text: "Spreadsheet", chip: "Connected", tone: "green" },
            { text: "Accounting", chip: "Connected", tone: "green" },
          ],
        },
      },
      {
        title: "It asks before anything important",
        body: "Anything new to a client, a supplier or the public waits for your approval. If something breaks, you and we get an alert.",
        visual: {
          kind: "status",
          app: "Approval",
          title: "Send the weekly order to the supplier",
          sub: "Drafted and checked",
          chips: [{ text: "Waiting for your approval", tone: "amber" }],
        },
      },
    ],
    youDo: [
      "Show us the job, once, the way your team does it today",
      "Agree the rules: what it may do and what it must ask",
      "Approve the important steps when it asks",
      "Tell us when the way you work changes",
    ],
    weDo: [
      "Map the job step by step",
      "Build the automation or assistant",
      "Connect it safely to the tools you already use",
      "Add checks and alerts so you know it is working",
      "Watch it after launch and improve it",
    ],
    buildNote: "We build the first job, connect your tools and run it beside your team until it is right.",
    weekly: [
      { label: "Every day", text: "The repeat work done, with a record of each step." },
      { label: "When it matters", text: "A request for your approval, never a surprise." },
      { label: "If anything stops", text: "An alert to you and to us." },
      { label: "Each month", text: "A short report on the hours saved, with the next job worth doing." },
    ],
    faqs: [
      {
        q: "What is an agent?",
        a: "An assistant that can take steps for you, like reading an email and updating a record. Ours follow rules you agree, and ask before anything important.",
      },
      {
        q: "Will it replace my staff?",
        a: "It takes the repetitive part of their day, so they can do the work that needs a person.",
      },
      {
        q: "Can it work with our own systems?",
        a: "Usually, if the system can share information. We check on the call before we promise anything.",
      },
      {
        q: "What if it gets something wrong?",
        a: "Anything that matters waits for your approval, every step is recorded, and checks alert us if something looks off.",
      },
      LIVE_FAQ,
    ],
  },
};

export const SERVICE_CATEGORIES: ServiceCategory[] = BASE_CATEGORIES.map((c) =>
  SERVICE_DEPTH[c.slug] ? { ...c, depth: SERVICE_DEPTH[c.slug] } : c,
);

/** The Operations Team page (/services/ai-operations-system): the same depth sections, no questions (that page has its own). */
export const OPS_TEAM_DEPTH: Omit<ServiceDepth, "faqs"> = {
  oneLine: "One team that answers your customers, follows up, does the admin and reports back, with you approving what matters.",
  steps: [
    {
      title: "Every enquiry is answered",
      body: "WhatsApp, website, email and social, within 60 seconds, day or night.",
      visual: { kind: "work", word: "Answer" },
    },
    {
      title: "No one slips away",
      body: "Quiet quotes and enquiries get a polite check-in, and it stops when they reply.",
      visual: { kind: "work", word: "Follow up" },
    },
    {
      title: "The admin is done",
      body: "Bookings, notes and forms filled in once, and your diary kept accurate.",
      visual: { kind: "work", word: "Admin" },
    },
    {
      title: "You approve what matters",
      body: "Anything new to a client, a supplier or the public waits for you.",
      visual: {
        kind: "status",
        app: "Approval",
        title: "Reply to a new enquiry",
        sub: "Drafted in your voice",
        chips: [{ text: "Waiting for your approval", tone: "amber" }],
      },
    },
    {
      title: "It reports back",
      body: "A short report each month, in plain words and real numbers, with one thing to improve.",
      visual: { kind: "work", word: "Report" },
    },
  ],
  youDo: [
    "Join the free call and the Operations Map",
    "Tell us your prices, rules and who takes over",
    "Approve the important steps when asked",
    "Read the monthly report",
  ],
  weDo: [
    "Map where your time and money leak",
    "Build the team in accounts in your name",
    "Connect your inbox, diary and tools",
    "Test everything with you before it goes live",
    "Watch it, fix it and improve it every month",
  ],
  buildNote: "We build the first phase, connect your tools and test it with your team.",
  weekly: [
    { label: "Every day", text: "Enquiries answered, follow-ups sent and bookings in the diary." },
    { label: "When it matters", text: "A request for your approval, or a handover to your team." },
    { label: "Any time", text: "Every conversation and action, written down and easy to check." },
    { label: "Each month", text: "The report, with the value in money terms and one thing to improve." },
  ],
};

export const SERVICE_BY_SLUG: Record<string, ServiceCategory> = Object.fromEntries(
  SERVICE_CATEGORIES.map((c) => [c.slug, c]),
);

/**
 * The four pillars every service sits under. Shared by the nav mega menu,
 * the services page and the services hero, so the grouping cannot drift.
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
    title: "Getting found",
    promise: "More of the right people find you, and more of them get in touch.",
    slugs: ["lead-generation", "marketing-social", "reputation-reviews", "websites-build"],
  },
  {
    index: "02",
    slug: "sales",
    title: "Answering and booking",
    promise: "Every call and message answered within 60 seconds, at any hour, and booked in.",
    slugs: ["conversation-ai", "voice-ai", "booking-calendar", "follow-up-nurture"],
  },
  {
    index: "03",
    slug: "operations",
    title: "Running the business",
    promise: "Customers, payments and your numbers, kept in order without the admin.",
    slugs: ["crm-pipeline", "payments-invoicing", "analytics-compliance"],
  },
  {
    index: "04",
    slug: "automations",
    title: "Custom work",
    promise: "The jobs only your business has, done for you.",
    slugs: ["custom-builds"],
  },
];

export const PILLAR_CATEGORIES = (pillar: ServicePillar): ServiceCategory[] =>
  pillar.slugs.map((s) => SERVICE_BY_SLUG[s]).filter(Boolean);

/* ------------------------------------------------------------------ */
/* The short story per service (Oct 2026): the 20 to 25 word hero line  */
/* and the before-and-after strip ("Today" and "With Verdance").        */
/* ------------------------------------------------------------------ */

export type ServiceStory = {
  /** Hero paragraph, 20 to 25 words. The full description sits behind "Show me how". */
  short: string;
  /** Three beats each: what happens to the customer today, and with us. */
  today: [string, string, string];
  withUs: [string, string, string];
};

export const SERVICE_STORY: Record<string, ServiceStory> = {
  "conversation-ai": {
    short: "A customer messages at 21:00. They get a helpful reply straight away, in your words, and get booked in. Anything unusual comes to you.",
    today: ["Message at 21:00", "Seen next morning", "Booked elsewhere"],
    withUs: ["Message at 21:00", "Reply in seconds", "Booked in"],
  },
  "voice-ai": {
    short: "You're on a job and the phone rings. A friendly voice answers, books the caller in and passes urgent calls to you.",
    today: ["Call while you're busy", "Voicemail", "Calls someone else"],
    withUs: ["Call while you're busy", "Answered straight away", "Booked in"],
  },
  "follow-up-nurture": {
    short: "You miss a call on site. The caller gets a friendly text within seconds. Quiet quotes get a polite nudge until they reply.",
    today: ["Missed call", "Voicemail", "Lost"],
    withUs: ["Missed call", "Text back in seconds", "Booked"],
  },
  "booking-calendar": {
    short: "Customers pick a time from your real diary, on their phone, at any hour. They get reminders and can move it with one tap.",
    today: ["\u201cCan I book Tuesday?\u201d", "A day of back and forth", "No-show"],
    withUs: ["Picks a time online", "Confirmed and reminded", "Turns up"],
  },
  "lead-generation": {
    short: "People who asked about you and agreed to hear from you get a friendly message, with an easy opt-out. The ones who reply get booked in.",
    today: ["Past enquirers", "Never followed up", "Forgotten"],
    withUs: ["Past enquirers", "Message with opt-out", "Replies booked in"],
  },
  "crm-pipeline": {
    short: "Every call, message and booking is filed against the right customer by itself. You see who is waiting, and nothing slips through.",
    today: ["Notes in three places", "Who called back?", "Quote forgotten"],
    withUs: ["One customer record", "Next step shown", "Followed up on time"],
  },
  "payments-invoicing": {
    short: "The job is done and the invoice goes out with a link to pay by phone. Late payers get polite reminders, so you stop chasing.",
    today: ["Job done", "Invoice next week", "Weeks of chasing"],
    withUs: ["Job done", "Invoice and pay link sent", "Paid sooner"],
  },
  "reputation-reviews": {
    short: "After each job, every customer gets the same friendly link to your Google reviews. You reply to every review, good or bad.",
    today: ["Job done", "Never asked", "No review"],
    withUs: ["Job done", "Every customer asked", "New Google review"],
  },
  "websites-build": {
    short: "A fast website that shows up on Google and makes getting in touch easy. It answers and books people while you work.",
    today: ["Visitor on a phone", "Slow page, no reply", "Leaves"],
    withUs: ["Visitor on a phone", "Asks in the chat", "Enquiry booked"],
  },
  "marketing-social": {
    short: "Your posts are planned in your voice, you approve them, and they go out on time. Adverts are checked weekly and every enquiry answered.",
    today: ["Busy week", "No posts", "Quiet next month"],
    withUs: ["Busy week", "Posts go out on time", "Enquiries keep coming"],
  },
  "custom-builds": {
    short: "The jobs only your business has, like copying details between systems or the same report every week, done for you. You approve what matters.",
    today: ["Same details typed twice", "An hour a day gone", "Mistakes creep in"],
    withUs: ["Details move on their own", "Hours back", "You check what matters"],
  },
  "analytics-compliance": {
    short: "Each month, a short report in plain words: how many enquired, how fast they were answered and how many booked. Customer data kept safe.",
    today: ["Busy month", "No idea what worked", "Guessing"],
    withUs: ["Busy month", "A plain monthly report", "One thing to fix next"],
  },
};

const STEP_CHIPS: { chip: string; tone: DepthTone }[] = [
  { chip: "First", tone: "muted" },
  { chip: "Then", tone: "blue" },
  { chip: "Done", tone: "green" },
];

/**
 * The depth content for any service: its own when written, otherwise
 * built from its parts, so all twelve pages use one template.
 */
export function depthFor(c: ServiceCategory): ServiceDepth {
  if (c.depth) return c.depth;
  return {
    oneLine: c.promise,
    steps: c.subProducts.map((sp) => ({
      title: sp.name,
      body: sp.description,
      visual: {
        kind: "rows",
        app: sp.name,
        rows: sp.howItWorks.map((t, i) => ({ text: t, ...STEP_CHIPS[Math.min(i, STEP_CHIPS.length - 1)] })),
      },
    })),
    youDo: [
      "Join the free call and the Operations Map",
      "Tell us your prices, rules and who takes over",
      "Approve the important steps when asked",
      "Read the monthly report",
    ],
    weDo: [
      "Set it up in accounts in your business's name",
      "Connect it to the tools you already use",
      "Test it with you before any customer sees it",
      "Watch the first weeks closely and fix anything unclear",
    ],
    buildNote: "We set it up, connect your tools and test it with you.",
    weekly: [
      { label: "Every day", text: c.outcome },
      { label: "When it matters", text: "A request for your approval, or a handover to your team." },
      { label: "Each month", text: "A short report in plain words, with one thing to improve." },
    ],
    faqs: [
      { q: "Who is it best for?", a: c.bestFor },
      { q: "Why does it matter?", a: c.whyItMatters },
      LIVE_FAQ,
    ],
  };
}
