/**
 * Verdance Systems AI · the 12 services.
 *
 * Every service has its own page at /services/[slug] and appears in the
 * services index and the nav. Copy rules (house style):
 *   - plain words a South African business owner gets in five seconds,
 *     outcome first: what happens for their customer and their day
 *   - no jargon, no acronyms unless explained, no dashes as punctuation,
 *     no hype, no emojis, British English
 *   - no prices, no client names, no invented numbers. The only numbers
 *     are our own commitments (reply within 5 minutes)
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
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: "lead-generation",
    number: "01",
    name: "Finding New Customers",
    headline: "More people enquiring,",
    italicWord: "and old leads coming back.",
    promise: "We bring back people who enquired before and find new ones who match your best customers.",
    description:
      "Most businesses already have a list of people who asked about them once and never booked. We message them in your voice and book the ones who reply, then help new people find you and get in touch. Every enquiry lands in one place, ready to be answered.",
    whatYouGet: [
      "A friendly message to your old enquiries and past customers, in your voice",
      "Lists of new businesses or people who match your best customers",
      "Enquiry forms and landing pages that are short and easy to fill in on a phone",
      "Every reply answered quickly and booked into your diary",
    ],
    bestFor: "Businesses with a list of old enquiries, or a quiet diary they want to fill.",
    subProducts: [
      {
        name: "Waking up old enquiries",
        description: "We message the people who enquired before and went quiet, and book the ones who reply.",
        howItWorks: ["You share your list of old enquiries and past customers", "We write a short, friendly message in your voice", "Replies are answered and booked into your diary"],
      },
      {
        name: "Finding new customers",
        description: "A list of businesses or people who look like your best customers, checked and ready to contact.",
        howItWorks: ["We agree who your ideal customer is", "We build and check the list", "It goes into your customer records, ready for outreach"],
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
    seoTitle: "Lead Generation and Database Reactivation in South Africa",
    seoDescription:
      "Win back old enquiries and find new customers. We message your past leads in your voice, build lists of people like your best customers and book every reply. Free pre-audit.",
  },
  {
    slug: "conversation-ai",
    number: "02",
    name: "Instant Message Replies",
    headline: "Every message answered,",
    italicWord: "day or night.",
    promise: "WhatsApp, website chat, Instagram, Facebook and SMS answered within 5 minutes, usually in seconds.",
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
    outcome: "Every message answered within 5 minutes, at any hour, and more of them booked.",
    relatedSlugs: ["voice-ai", "booking-calendar", "follow-up-nurture"],
    seoTitle: "WhatsApp Auto Reply for Business in South Africa",
    seoDescription:
      "Automatic WhatsApp, website chat, Instagram and SMS replies for South African businesses. Every message answered within 5 minutes, day or night, and booked into your diary.",
  },
  {
    slug: "voice-ai",
    number: "03",
    name: "Phone Answering",
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
    seoTitle: "AI Receptionist and After Hours Call Answering, South Africa",
    seoDescription:
      "A phone assistant that answers every call, day or night, books callers into your diary and passes urgent calls to you. Built for South African businesses. Free pre-audit.",
  },
  {
    slug: "crm-pipeline",
    number: "04",
    name: "One Place for Every Customer",
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
    seoTitle: "Simple CRM for Small Business in South Africa",
    seoDescription:
      "Keep every customer, enquiry and job in one place. Records fill themselves in from calls, messages and bookings, so nothing slips through. Set up for South African businesses.",
  },
  {
    slug: "booking-calendar",
    number: "05",
    name: "Online Booking",
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
    seoTitle: "Online Booking System for South African Businesses",
    seoDescription:
      "An online booking system that works with your diary: customers book at any hour, get reminders and reschedule with one tap. Bookings inside WhatsApp too. Free pre-audit.",
  },
  {
    slug: "follow-up-nurture",
    number: "06",
    name: "Follow-up and Missed Call Text Back",
    headline: "No enquiry left",
    italicWord: "to go cold.",
    promise: "Missed calls get a text back in seconds, and every quote and quiet enquiry is followed up politely.",
    description:
      "When you miss a call, the caller gets a friendly text within seconds asking how you can help. Quotes and enquiries that go quiet are followed up a set number of times in your voice, and it stops the moment they reply. Past customers are reminded when it is time to book again.",
    whatYouGet: [
      "A text back to every missed call, within seconds",
      "Polite follow-ups on quotes and quiet enquiries, stopped the moment they reply",
      "Reminders to past customers when it is time to come back",
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
        description: "Past customers get a reminder when they are due again, with one tap to book.",
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
    seoTitle: "Missed Call Text Back and Automatic Follow-up, South Africa",
    seoDescription:
      "Every missed call gets a text back in seconds, and quotes that go quiet are followed up politely in your voice. Built for South African trades and service businesses.",
  },
  {
    slug: "payments-invoicing",
    number: "07",
    name: "Invoices and Payment Links",
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
    seoTitle: "Payment Links and Invoice Reminders for Small Business, SA",
    seoDescription:
      "Send invoices and payment links by WhatsApp, SMS or email, take deposits at booking and let polite reminders chase late payments. For South African businesses.",
  },
  {
    slug: "reputation-reviews",
    number: "08",
    name: "Google Reviews",
    headline: "More good reviews,",
    italicWord: "without having to ask.",
    promise: "Every happy customer is asked for a Google review at the right moment, and problems come to you first.",
    description:
      "After each job or visit, the customer gets a short, friendly request with a link straight to your Google review page. If someone is unhappy, their feedback comes to you privately so you can put it right. New reviews are flagged to you, with a reply ready to send.",
    whatYouGet: [
      "A review request after every job or visit, by SMS or WhatsApp",
      "Unhappy customers routed to you privately first",
      "An alert for every new review, with a reply drafted for you",
      "Your best reviews shown on your website",
      "A gentle nudge to happy customers to refer a friend",
    ],
    bestFor: "Local businesses where customers check Google before they choose who to call.",
    subProducts: [
      {
        name: "Google review requests",
        description: "Every happy customer gets a friendly request with a link straight to your Google review page.",
        howItWorks: ["A job or visit is marked as done", "A personal request goes out by SMS or WhatsApp", "One tap takes them to your review page"],
      },
      {
        name: "Catching problems early",
        description: "If a customer is unhappy, their feedback comes to you privately first.",
        howItWorks: ["The customer answers one quick question", "Unhappy answers come straight to you", "Happy customers are asked for a review"],
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
    whyItMatters: "Good reviews bring in new customers every day. Most happy customers simply forget to leave one unless they are asked.",
    outcome: "A steady stream of new Google reviews, and unhappy customers caught before they post.",
    relatedSlugs: ["follow-up-nurture", "marketing-social", "lead-generation"],
    seoTitle: "Get More Google Reviews for Your Business, South Africa",
    seoDescription:
      "Automatic Google review requests after every job, private feedback from unhappy customers first, and alerts with replies drafted for you. For South African businesses.",
  },
  {
    slug: "websites-build",
    number: "09",
    name: "Websites that Bring in Enquiries",
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
        howItWorks: ["We look at your current site", "We add chat, booking and tracking", "Done in days, without rebuilding"],
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
    whyItMatters: "Most small business websites are digital brochures. Yours should answer, capture and book, even when you are closed.",
    outcome: "A website that turns visitors into enquiries and bookings.",
    relatedSlugs: ["lead-generation", "conversation-ai", "marketing-social"],
    seoTitle: "Website Design for Small Business in South Africa",
    seoDescription:
      "Fast websites for South African businesses that show up on Google and turn visitors into enquiries, with chat, booking and enquiry forms built in. Free pre-audit.",
  },
  {
    slug: "marketing-social",
    number: "10",
    name: "Social Media and Ads",
    headline: "Show up every week,",
    italicWord: "without the effort.",
    promise: "Your social media keeps posting and your adverts keep working, even in your busiest weeks.",
    description:
      "We plan and prepare your posts in your voice, you approve them, and they go out on schedule. We can run your Facebook, Instagram and Google adverts and check them every week. Every enquiry they bring in is answered automatically.",
    whatYouGet: [
      "Regular posts on Instagram, Facebook, LinkedIn or TikTok, written in your voice",
      "Everything prepared for you to approve before it goes out",
      "Facebook, Instagram and Google adverts set up and checked weekly",
      "Email newsletters to past customers",
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
        description: "Newsletters and offers to past customers that bring them back.",
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
    seoTitle: "Social Media Management for Small Business, South Africa",
    seoDescription:
      "Regular social media posts in your voice, Facebook, Instagram and Google adverts checked every week, and newsletters to past customers. For South African businesses.",
  },
  {
    slug: "custom-builds",
    number: "11",
    name: "Custom Automation",
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
    seoTitle: "Business Automation Services in South Africa",
    seoDescription:
      "Custom automation for South African businesses: repetitive admin done for you, your existing tools connected, and an assistant trained on your own rules. Free pre-audit.",
  },
  {
    slug: "analytics-compliance",
    number: "12",
    name: "Reports and POPIA",
    headline: "Know what is working,",
    italicWord: "and stay on the right side of POPIA.",
    promise: "A clear monthly report on enquiries, bookings and money, with customer data handled the way POPIA requires.",
    description:
      "You see how many people enquired, how fast they were answered and how many booked, in plain words and in rand. Customer data is collected with consent and can be exported or deleted on request, as POPIA (South Africa's privacy law) requires. Each month we suggest one thing to improve.",
    whatYouGet: [
      "A live dashboard of enquiries, reply times and bookings",
      "A short monthly report in plain words, with the value in rand",
      "Consent captured on every form, as POPIA requires",
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
        name: "POPIA basics",
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
    seoTitle: "Business Dashboard and POPIA Compliance for Small Business",
    seoDescription:
      "A live dashboard and plain monthly report on enquiries, reply times and bookings, with consent and data requests handled the way POPIA requires. South Africa.",
  },
];

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
    title: "Getting Found",
    promise: "More of the right people find you, and more of them get in touch.",
    slugs: ["lead-generation", "marketing-social", "reputation-reviews", "websites-build"],
  },
  {
    index: "02",
    slug: "sales",
    title: "Answering and Booking",
    promise: "Every call and message answered within 5 minutes, at any hour, and booked in.",
    slugs: ["conversation-ai", "voice-ai", "booking-calendar", "follow-up-nurture"],
  },
  {
    index: "03",
    slug: "operations",
    title: "Running the Business",
    promise: "Customers, payments and your numbers, kept in order without the admin.",
    slugs: ["crm-pipeline", "payments-invoicing", "analytics-compliance"],
  },
  {
    index: "04",
    slug: "automations",
    title: "The Custom Work",
    promise: "The jobs only your business has, done without anyone doing them.",
    slugs: ["custom-builds"],
  },
];

export const PILLAR_CATEGORIES = (pillar: ServicePillar): ServiceCategory[] =>
  pillar.slugs.map((s) => SERVICE_BY_SLUG[s]).filter(Boolean);
