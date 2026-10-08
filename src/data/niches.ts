/**
 * Niche offer pages. One entry per page at /industries/<slug>.
 *
 * Copy rules (same as landing.ts): plain, short sentences, South African
 * English, rand, no em dashes, no exclamation marks, no hype words, never name
 * the CRM vendor, never name a client. No invented statistics: any number a
 * visitor sees is either our own commitment (reply time, guarantee terms,
 * price) or a number they typed into the calculator.
 *
 * Every "Book" CTA on a niche page goes to the pre-audit booking flow at
 * BOOK_BASE/<bookSlug>.
 */

export const BOOK_BASE = "https://book.verdancesystemsai.com";
export const GENERIC_BOOK_URL = `${BOOK_BASE}/audit`;
export const bookUrl = (bookSlug: string) => `${BOOK_BASE}/${bookSlug}`;

export type CalcFormat = "int" | "rand" | "pct";

export interface CalcField {
  key: string;
  label: string;
  hint: string;
  min: number;
  max: number;
  step: number;
  initial: number;
  format: CalcFormat;
}

export interface NicheCalculator {
  title: string;
  intro: string;
  /**
   * The result is the product of every field (percentages as fractions),
   * per month. Keep the fields in the order a person would reason through
   * them, so each intermediate line reads as a sentence.
   */
  fields: CalcField[];
  /** Labels for the running totals after field 2, 3, ... (one fewer than fields - 1). */
  steps: string[];
  resultLabel: string;
  assumptions: string[];
}

export interface PriceCard {
  name: string;
  tag?: string;
  lines: { label: string; value: string }[];
  note: string;
  featured?: boolean;
}

export interface Niche {
  slug: string;
  bookSlug: string;
  name: string;
  shortName: string;
  offerName: string;
  icon: "venue" | "lodge" | "clinic" | "estate" | "trades";
  meta: { title: string; description: string; ogTitle: string };
  card: { line: string };
  hero: {
    eyebrow: string;
    lines: string[];
    accent: string;
    lead: string;
  };
  thread: {
    channel: string;
    inbound: { time: string; text: string };
    reply: { time: string; text: string };
    outcome: { time: string; text: string };
  };
  deltas: { label: string; before: string; after: string }[];
  steps: { title: string; body: string }[];
  included: { title: string; body: string }[];
  bonuses: string[];
  calculator: NicheCalculator;
  pricing: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: PriceCard[];
    footnote: string;
  };
  guarantee: {
    title: string;
    accent: string;
    columns: { n: string; label: string; text: string }[];
    note: string;
  };
  urgency?: string;
  faqs: { q: string; a: string }[];
  cta: { title: string; accent: string; body: string };
  compliance?: string;
}

const PROOF_LINE =
  "Running today at a South African luxury home design and build studio: website, WhatsApp AI concierge, CRM pipeline and quote generator.";
export const PROOF = PROOF_LINE;

const PRE_AUDIT_FAQ = {
  q: "What happens on the pre-audit call?",
  a: "Thirty minutes on a video call with Daniel. We look at where your enquiries come from, how fast they are answered today, and what that is likely costing you. If it is a fit, we agree a 7-day audit that sets the baseline the guarantee is measured against. If it is not a fit, we say so.",
};

const BASELINE_FAQ = {
  q: "How is the baseline measured?",
  a: "Before you sign, we run a 7-day audit. We send test enquiries through each channel and time the replies, and we count your enquiries and bookings from the last 60 days using your own inbox and diary. Both sides sign the baseline, so the guarantee is measured against numbers you agreed to.",
};

const OWNERSHIP_FAQ = {
  q: "Who owns it?",
  a: "You do. The accounts, the number, the messages and the customer records sit in your name. If we stop working together, it keeps running and stays yours.",
};

export const NICHES: Niche[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "wedding-venues",
    bookSlug: "venues",
    name: "Wedding and Event Venues",
    shortName: "Venues",
    offerName: "Venue Viewing Pilot",
    icon: "venue",
    meta: {
      title: "Wedding Venue Enquiry Replies in 5 Minutes | Verdance Systems AI",
      description:
        "Every venue enquiry answered within 5 minutes, day or night, and viewings booked into your diary. Start with a 30-day pilot. Refunded if no viewings are attended.",
      ogTitle: "The first venue to reply gets the viewing.",
    },
    card: { line: "Every enquiry answered in 5 minutes. Viewings booked into your diary." },
    hero: {
      eyebrow: "Wedding and event venues · South Africa",
      lines: ["Couples enquire with four venues."],
      accent: "The first to reply gets the viewing.",
      lead: "We set up a system that replies to every enquiry within 5 minutes, day or night, on your website, email, WhatsApp and Instagram. It answers the usual questions, checks the date, and books the viewing into your diary. You show the venue.",
    },
    thread: {
      channel: "WhatsApp · venue enquiry",
      inbound: { time: "21:40", text: "Hi, is 14 March 2027 still open? About 110 guests." },
      reply: { time: "21:41", text: "14 March is open. Would you like to see the venue? I have Saturday 10:00 or Sunday 14:00." },
      outcome: { time: "21:43", text: "Viewing booked: Sat 10:00" },
    },
    deltas: [
      { label: "Reply to a 9pm enquiry", before: "next morning", after: "within 5 minutes" },
      { label: "Weekend and holiday enquiries", before: "wait for Monday", after: "answered the same night" },
      { label: "Booking a viewing", before: "days of back and forth", after: "in the first conversation" },
      { label: "Couples who go quiet", before: "forgotten", after: "followed up, politely" },
    ],
    steps: [
      {
        title: "Pre-audit and baseline",
        body: "A 30-minute call, then a 7-day audit. We time how fast your enquiries are answered today and count your enquiries and viewings from the last 60 days. Both sides sign the numbers.",
      },
      {
        title: "We build it on your channels",
        body: "Your website form, email, WhatsApp and Instagram feed into one reply system, trained on your dates, packages and FAQs. It books into your diary and hands anything unusual to your team.",
      },
      {
        title: "It replies, books and reports",
        body: "Every enquiry gets a reply within 5 minutes, day or night. Viewings land in your diary with reminders. You get a monthly report on enquiries, viewings and bookings, in rand.",
      },
    ],
    included: [
      { title: "5-minute replies, around the clock", body: "Website, email, WhatsApp and Instagram. Same standard on a Sunday night as on a Tuesday morning." },
      { title: "Date checks and viewing booking", body: "Checks availability, offers viewing slots and puts the booking straight into your diary." },
      { title: "Viewing reminders and no-show rescue", body: "Reminders before the viewing. If a couple does not arrive, it offers a new time." },
      { title: "Polite follow-up", body: "Couples who go quiet are followed up a set number of times, and it stops the moment they reply." },
      { title: "Handover to your team", body: "Pricing negotiations, special requests and anything sensitive go straight to the right person." },
      { title: "Monthly recovery report", body: "Enquiries, reply times, viewings and bookings, with the value in rand." },
    ],
    bonuses: [
      "Your audit report, yours to keep either way",
      "A message to past enquiries from the last 24 months, to fill open 2027 dates",
      "A Google review request after each event (on the Engine)",
    ],
    calculator: {
      title: "What slow replies cost your venue",
      intro: "Five numbers about your venue. Nothing is sent anywhere.",
      fields: [
        { key: "enquiries", label: "Enquiries a month", hint: "All channels: website, email, WhatsApp, Instagram and phone.", min: 1, max: 150, step: 1, initial: 20, format: "int" },
        { key: "slow", label: "Share that wait more than an hour for a reply", hint: "Evenings, weekends and busy event days count. Most venues guess low here.", min: 0, max: 100, step: 5, initial: 40, format: "pct" },
        { key: "viewing", label: "Of those, the share who would have booked a viewing", hint: "If they had heard back from you first.", min: 0, max: 100, step: 5, initial: 25, format: "pct" },
        { key: "book", label: "Viewings that turn into a booking", hint: "Your own conversion from viewing to signed booking.", min: 0, max: 100, step: 5, initial: 25, format: "pct" },
        { key: "value", label: "Average booking value", hint: "Venue hire plus anything you sell with it, per event.", min: 5000, max: 300000, step: 5000, initial: 40000, format: "rand" },
      ],
      steps: ["slow replies a month", "viewings you could have had", "bookings a month"],
      resultLabel: "Bookings at risk, in rand",
      assumptions: [
        "Starting values are examples, not averages. Move them to your own numbers.",
        "It assumes a couple who waits is more likely to view another venue first. It does not assume every slow reply is lost.",
        "Your pre-audit replaces these guesses with your real numbers from the last 60 days.",
      ],
    },
    pricing: {
      eyebrow: "Investment",
      title: "Start small.",
      intro: "Most venues start with the 30-day pilot. If it works, you move onto the Engine and the pilot setup fee is credited.",
      cards: [
        {
          name: "Venue Viewing Pilot",
          tag: "30 days",
          lines: [
            { label: "Investment", value: "Fixed quote" },
            { label: "Quoted after", value: "Your free pre-audit" },
            { label: "Surprises", value: "None, agreed in writing" },
          ],
          note: "You pay per viewing the system books that the couple actually attends. The pilot fee is credited against the Engine setup if you continue.",
          featured: true,
        },
        {
          name: "Venue 5-Minute Enquiry Engine",
          tag: "Ongoing",
          lines: [
            { label: "Investment", value: "Fixed quote" },
            { label: "Quoted after", value: "Your free pre-audit" },
            { label: "Surprises", value: "None, agreed in writing" },
          ],
          note: "50% deposit on setup. The monthly fee starts at go-live. Includes the past-enquiry message, no-show rescue, review requests and the monthly report.",
        },
      ],
      footnote: "For venues with at least 10 enquiries a month. Every system is scoped to your business, so we quote after the free pre-audit. The quote is fixed and in writing.",
    },
    guarantee: {
      title: "Measured against your own numbers.",
      accent: "Or you get your money back.",
      columns: [
        { n: "01", label: "Pilot: viewings or a refund", text: "If the system books no attended viewings in the 30 days, your setup fee is refunded." },
        { n: "02", label: "Engine: the 5-minute standard", text: "95% of enquiries on web, email, WhatsApp and Instagram get a first reply within 5 minutes, day or night. Any month that misses it is free." },
        { n: "03", label: "Engine: viewings up 25% by day 60", text: "If booked viewings are not 25% above your audited baseline at day 60, we work free until they are. Or you cancel and get both monthly fees back. The setup fee covers the build and is not refunded." },
      ],
      note: "Both guarantees are measured against the baseline from your 7-day audit, signed by both sides, and apply to venues with at least 10 enquiries a month.",
    },
    urgency: "We run three pilots at a time, because each one is built and watched by hand.",
    faqs: [
      PRE_AUDIT_FAQ,
      {
        q: "Will couples know they are talking to a system?",
        a: "Replies are written in your venue's voice and sound like a person, but we never pretend it is one if a couple asks. Anything that needs judgement, like a custom quote, goes straight to your team.",
      },
      {
        q: "What counts as an attended viewing on the pilot?",
        a: "A viewing the system booked, where the couple arrived at the venue at the booked time or a time it rescheduled to. Viewings your team booked by hand do not count.",
      },
      {
        q: "What happens at day 30?",
        a: "You choose. Move onto the Engine with the pilot fee already credited against the setup, or walk away. If no attended viewings were booked, your setup fee is refunded.",
      },
      BASELINE_FAQ,
      {
        q: "Do we have to change our booking system or diary?",
        a: "No. We connect to the diary you use today where we can. If something needs to change, we tell you on the pre-audit, before you commit to anything.",
      },
      OWNERSHIP_FAQ,
    ],
    cta: {
      title: "Find out how fast your venue",
      accent: "really replies.",
      body: "Book the pre-audit. Thirty minutes, no cost. You leave knowing your reply times, what they are costing you, and whether a pilot makes sense.",
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "lodges-and-venue-groups",
    bookSlug: "lodges",
    name: "Boutique Lodges and Venue Groups",
    shortName: "Lodges",
    offerName: "Lodge and Venue Group Revenue System",
    icon: "lodge",
    meta: {
      title: "Enquiry System for Boutique Lodges and Venue Groups | Verdance Systems AI",
      description:
        "One 5-minute reply standard across weddings, rooms and conferences, day or night. Plus a campaign to your last 24 months of unbooked enquiries. Built in South Africa.",
      ogTitle: "Weddings, rooms and conferences. One reply standard.",
    },
    card: { line: "One 5-minute reply standard across weddings, rooms and conferences." },
    hero: {
      eyebrow: "Boutique lodges and venue groups · South Africa",
      lines: ["Weddings. Rooms. Conferences.", "Four inboxes."],
      accent: "Nobody owns the first reply.",
      lead: "We set one standard across every department and every channel: each enquiry gets a reply within 5 minutes, day or night, and is routed to the right person. Then we go back to the enquiries you never booked.",
    },
    thread: {
      channel: "Email · conference enquiry",
      inbound: { time: "18:52", text: "Looking for a 2-night leadership offsite for 24 people in May. Do you have rooms and a venue?" },
      reply: { time: "18:55", text: "We do. May has two open weekends for 24. Shall I set up a site visit with our events manager?" },
      outcome: { time: "18:58", text: "Site visit booked: Thu 11:00" },
    },
    deltas: [
      { label: "First reply, any department", before: "depends who is on shift", after: "within 5 minutes" },
      { label: "Who owns each enquiry", before: "whoever sees it first", after: "routed to the right person" },
      { label: "Unbooked enquiries from the last 2 years", before: "sitting in old inboxes", after: "worked into site visits" },
      { label: "Seeing where revenue comes from", before: "four separate inboxes", after: "one monthly review" },
    ],
    steps: [
      {
        title: "Pre-audit and baseline",
        body: "A 30-minute call, then a 7-day audit across every department inbox and channel. We time the replies and count enquiries and bookings from the last 60 days.",
      },
      {
        title: "One system across every department",
        body: "Weddings, rooms and conferences feed into one reply standard with clear routing. It answers the common questions, books site visits and viewings, and hands the rest to the right person.",
      },
      {
        title: "Revive, reply, review",
        body: "We work through your last 24 months of unbooked enquiries. New enquiries are answered within 5 minutes. Each month you review the numbers with Daniel.",
      },
    ],
    included: [
      { title: "5-minute replies across every department", body: "Web, email, WhatsApp, Instagram and missed calls, for weddings, rooms and conferences." },
      { title: "Routing and ownership", body: "Each enquiry goes to the right person, with the conversation so far, so nobody starts from scratch." },
      { title: "Site visits and viewings in the diary", body: "Booked in the first conversation, with reminders and a new time offered if someone does not arrive." },
      { title: "24-month revival campaign", body: "A careful message to unbooked enquiries from the last two years, aimed at your open dates." },
      { title: "Monthly review with Daniel", body: "Enquiries, reply times, visits and bookings by department, and what to change next." },
      { title: "Review requests", body: "A Google review request after each stay or event." },
    ],
    bonuses: [
      "A revival campaign every quarter",
      "A monthly review call with Daniel",
      "Review requests after every stay and event",
    ],
    calculator: {
      title: "What slow replies cost across your departments",
      intro: "Use your totals across weddings, rooms and conferences. Nothing is sent anywhere.",
      fields: [
        { key: "enquiries", label: "Enquiries a month, all departments", hint: "Weddings, rooms, conferences and functions together.", min: 5, max: 400, step: 5, initial: 40, format: "int" },
        { key: "slow", label: "Share that wait more than an hour for a reply", hint: "After hours, weekends and shift changes count.", min: 0, max: 100, step: 5, initial: 25, format: "pct" },
        { key: "convert", label: "Share of those you would normally book", hint: "Your own conversion from enquiry to confirmed booking.", min: 0, max: 100, step: 5, initial: 10, format: "pct" },
        { key: "value", label: "Average booking value", hint: "A blend across departments: a wedding, a conference, a two-night stay.", min: 2000, max: 300000, step: 1000, initial: 20000, format: "rand" },
      ],
      steps: ["slow replies a month", "bookings a month"],
      resultLabel: "Bookings at risk, in rand",
      assumptions: [
        "Starting values are examples, not averages. Use your own.",
        "It does not count the value of the 24-month revival campaign, which comes on top.",
        "Your pre-audit replaces these guesses with real numbers per department.",
      ],
    },
    pricing: {
      eyebrow: "Investment",
      title: "One system, three revenue lines.",
      intro: "Built for properties with weddings, rooms and conferences, or groups with two or more venues.",
      cards: [
        {
          name: "Lodge and Venue Group Revenue System",
          tag: "Premium",
          lines: [
            { label: "Investment", value: "Fixed quote" },
            { label: "Quoted after", value: "Your free pre-audit" },
            { label: "Surprises", value: "None, agreed in writing" },
          ],
          note: "Includes every department and channel, the 24-month revival campaign, quarterly revivals, review requests and a monthly review with Daniel.",
          featured: true,
        },
      ],
      footnote: "Every system is scoped to your venues and departments, so we quote after the free pre-audit. The quote is fixed and in writing.",
    },
    guarantee: {
      title: "Two promises.",
      accent: "Both in writing.",
      columns: [
        { n: "01", label: "The 5-minute standard", text: "95% of enquiries across every department and channel get a first reply within 5 minutes, day or night. Any month that misses it is free." },
        { n: "02", label: "8 site visits in 45 days", text: "The revival campaign books at least 8 site visits or viewings from your last 24 months of unbooked enquiries within 45 days. If it does not, month 2 is free and we run the campaign again." },
        { n: "03", label: "Agreed before you sign", text: "Both are measured against the baseline from your 7-day audit, signed by both sides." },
      ],
      note: "Applies to properties with at least 10 enquiries a month.",
    },
    urgency: "We build one premium system at a time. The build takes about two weeks.",
    faqs: [
      PRE_AUDIT_FAQ,
      {
        q: "We already use a booking engine for rooms. Does this replace it?",
        a: "No. Room bookings that go through your booking engine stay there. This handles the enquiries that need a conversation first: weddings, groups, conferences and questions before booking.",
      },
      {
        q: "How do you handle old enquiries without annoying people?",
        a: "One careful, personal message about your open dates, with an easy way to say no thanks. Anyone who opts out is never contacted again. You approve the wording before anything is sent.",
      },
      BASELINE_FAQ,
      {
        q: "We have more than one property. Does it work across all of them?",
        a: "Yes. Each property keeps its own voice, dates and team, and you see the numbers for each one and for the group.",
      },
      OWNERSHIP_FAQ,
    ],
    cta: {
      title: "See where your enquiries",
      accent: "are going.",
      body: "Book the pre-audit. Thirty minutes, no cost. We look at every department's reply times and what your old enquiries are worth.",
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "private-clinics",
    bookSlug: "clinics",
    name: "Private Clinics: Dental Implant and Aesthetics",
    shortName: "Clinics",
    offerName: "Consult Recovery System",
    icon: "clinic",
    meta: {
      title: "Consult Enquiry Replies for Dental and Aesthetics Clinics | Verdance Systems AI",
      description:
        "Every WhatsApp, Instagram, form and missed call answered within 5 minutes, day or night, and consults booked into your diary. Administrative replies only. No clinical advice.",
      ogTitle: "The enquiry came in at 8pm. Your front desk was closed.",
    },
    card: { line: "Every consult enquiry answered in 5 minutes, including after hours." },
    hero: {
      eyebrow: "Dental implant and aesthetics practices · South Africa",
      lines: ["A patient messages at 8pm.", "Your front desk is closed."],
      accent: "Who replies first?",
      lead: "We set up a system that replies to every WhatsApp, Instagram message, web form and missed call within 5 minutes, day or night. It handles the admin: times, fees for a consult, directions. It books the consult into your diary. It never gives clinical advice.",
    },
    thread: {
      channel: "WhatsApp · consult enquiry",
      inbound: { time: "20:04", text: "Hi, I'd like to book a consultation. Do you have anything next week?" },
      reply: { time: "20:06", text: "Thank you for contacting the practice. We have Tuesday 09:30 or Thursday 15:00 for a consultation. Which suits you?" },
      outcome: { time: "20:09", text: "Consult booked: Thu 15:00" },
    },
    deltas: [
      { label: "Reply to an after-hours enquiry", before: "next working day", after: "within 5 minutes" },
      { label: "Missed calls at the front desk", before: "lost", after: "texted back within 5 minutes" },
      { label: "Quoted but not booked", before: "followed up when there is time", after: "followed up on schedule" },
      { label: "Consult no-shows", before: "an empty chair", after: "reminded and rebooked" },
    ],
    steps: [
      {
        title: "Pre-audit and baseline",
        body: "A 30-minute call, then a 7-day audit. We time how fast enquiries are answered on each channel and count enquiries and booked consults from the last 60 days. Both sides sign the numbers.",
      },
      {
        title: "We build it around your practice",
        body: "WhatsApp, Instagram, your web form and missed calls feed into one reply system. It knows your consult times, fees, location and policies. You approve every message template before go-live.",
      },
      {
        title: "It replies, books and follows up",
        body: "Every enquiry gets a reply within 5 minutes. Consults go into your diary with reminders. Patients who were given a treatment plan and did not book are followed up on a schedule your practice sets.",
      },
    ],
    included: [
      { title: "5-minute replies, day or night", body: "WhatsApp, Instagram, web forms and missed-call text-back." },
      { title: "Consult booking", body: "Offers open consult times and books straight into your practice diary." },
      { title: "Reminders and no-show rescue", body: "Reminders before each consult, and a new time offered if someone does not arrive." },
      { title: "Treatment-plan follow-up", body: "Polite follow-up for patients who received a quote and have not booked, on a schedule you approve." },
      { title: "Recall messages", body: "Reminders to existing patients who are due back, in your practice's wording." },
      { title: "Clear handover", body: "Any clinical question goes straight to your team. The system does not answer it." },
    ],
    bonuses: [
      "Treatment-plan follow-up for quoted, unbooked patients",
      "Recall messages to existing patients",
      "A review request flow, set up to fit your professional rules",
    ],
    calculator: {
      title: "What slow replies cost your practice",
      intro: "Business numbers only. Nothing is sent anywhere.",
      fields: [
        { key: "enquiries", label: "Consult enquiries a month", hint: "WhatsApp, Instagram, web forms and calls together.", min: 5, max: 300, step: 5, initial: 40, format: "int" },
        { key: "slow", label: "Share that wait more than an hour for a reply", hint: "After hours, lunch, and busy clinic sessions count.", min: 0, max: 100, step: 5, initial: 25, format: "pct" },
        { key: "consult", label: "Share of those who would have booked a consult", hint: "Your normal rate from enquiry to booked consult.", min: 0, max: 100, step: 5, initial: 30, format: "pct" },
        { key: "proceed", label: "Consults that go ahead with treatment", hint: "Your own figure from consult to accepted treatment plan.", min: 0, max: 100, step: 5, initial: 25, format: "pct" },
        { key: "value", label: "Average treatment plan value", hint: "Use your average, not your largest case.", min: 1000, max: 300000, step: 1000, initial: 15000, format: "rand" },
      ],
      steps: ["slow replies a month", "consults you could have had", "treatment plans a month"],
      resultLabel: "Revenue at risk, in rand",
      assumptions: [
        "Starting values are examples, not industry averages. Use your own.",
        "This is practice revenue maths only. It says nothing about clinical results.",
        "Your pre-audit replaces these guesses with your own numbers from the last 60 days.",
      ],
    },
    pricing: {
      eyebrow: "Investment",
      title: "Clear, from day one.",
      intro: "One system for every channel your patients use to reach the practice.",
      cards: [
        {
          name: "Consult Recovery System",
          tag: "Ongoing",
          lines: [
            { label: "Investment", value: "Fixed quote" },
            { label: "Quoted after", value: "Your free pre-audit" },
            { label: "Surprises", value: "None, agreed in writing" },
          ],
          note: "Includes 5-minute replies, consult booking, reminders, no-show rescue, treatment-plan follow-up, recall messages and a monthly report.",
          featured: true,
        },
      ],
      footnote: "For practices with at least 10 enquiries a month. Every system is scoped to your business, so we quote after the free pre-audit. The quote is fixed and in writing.",
    },
    guarantee: {
      title: "Measured against your own diary.",
      accent: "Or you get your money back.",
      columns: [
        { n: "01", label: "The 5-minute standard", text: "95% of enquiries on WhatsApp, Instagram, web forms and missed calls get a first reply within 5 minutes, day or night. Any month that misses it is free." },
        { n: "02", label: "15 more booked consults in 60 days", text: "If you do not have 15 more booked consults than your audited baseline by day 60, we work free until you do. Or you cancel and get both monthly fees back. The setup fee covers the build and is not refunded." },
        { n: "03", label: "Agreed before you sign", text: "Both are measured against the baseline from your 7-day audit, signed by both sides." },
      ],
      note: "Applies to practices with at least 10 enquiries a month. The guarantee covers booked consults, not treatment decisions or clinical outcomes.",
    },
    faqs: [
      PRE_AUDIT_FAQ,
      {
        q: "Does the system give medical or clinical advice?",
        a: "No. It handles admin only: booking, times, consult fees, directions and practice policies. Any question about symptoms, treatment or suitability is handed to your team straight away.",
      },
      {
        q: "How do you handle patient information?",
        a: "Health information is special personal information under POPIA, so we collect only what is needed to book a consult. Forms do not ask health questions. Data sits in accounts in your practice's name, and nothing about patients goes into advertising tools or links.",
      },
      {
        q: "What about HPCSA advertising rules?",
        a: "Messages are factual and administrative. They make no claims about treatment results and use no patient testimonials or before-and-after images. You approve every template before go-live, and your professional obligations stay with your practice, so we build to fit your rules.",
      },
      BASELINE_FAQ,
      {
        q: "Does it work with our practice software?",
        a: "Where your practice software allows it, we book straight into it. Where it does not, we use a shared diary your front desk already works from. We confirm which on the pre-audit.",
      },
      OWNERSHIP_FAQ,
    ],
    cta: {
      title: "Find out how fast your practice",
      accent: "really replies.",
      body: "Book the pre-audit. Thirty minutes, no cost. You leave with your reply times by channel and what a faster reply is likely worth.",
    },
    compliance:
      "Administrative replies only. The system does not give clinical advice, make claims about treatment results or use patient testimonials.",
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "estate-agents",
    bookSlug: "estate-agents",
    name: "Independent Estate Agencies",
    shortName: "Estate agents",
    offerName: "Portal Lead 5-Minute Response",
    icon: "estate",
    meta: {
      title: "Portal Lead Response for Estate Agencies | Verdance Systems AI",
      description:
        "Every portal, website and WhatsApp lead gets a reply and qualifying questions within 5 minutes, day or night, and the viewing goes into the agent's calendar. Done for you.",
      ogTitle: "The buyer enquired at 21:14. Who replied first?",
    },
    card: { line: "Every portal lead answered in 5 minutes, and the viewing in the agent's diary." },
    hero: {
      eyebrow: "Independent estate agencies · South Africa",
      lines: ["A buyer enquires on three listings at 21:14."],
      accent: "The first agent to reply gets the viewing.",
      lead: "We set up a system that replies to every portal, website and WhatsApp lead within 5 minutes, day or night. It asks the qualifying questions your agents would ask, and puts the viewing straight into the right agent's calendar.",
    },
    thread: {
      channel: "Portal lead · 3-bed listing",
      inbound: { time: "21:14", text: "Is this property still available? Can I view this weekend?" },
      reply: { time: "21:16", text: "It is. Are you buying with a bond, and have you sold your current home? Saturday 09:00 or 11:30 are open." },
      outcome: { time: "21:19", text: "Viewing booked: Sat 11:30 with agent" },
    },
    deltas: [
      { label: "Reply to an evening portal lead", before: "next morning", after: "within 5 minutes" },
      { label: "Qualifying the buyer", before: "on the first phone call", after: "before the viewing" },
      { label: "Getting the viewing in the diary", before: "a few messages back and forth", after: "in the first conversation" },
      { label: "Old buyer leads", before: "never contacted again", after: "asked if they are still looking" },
    ],
    steps: [
      {
        title: "Pre-audit and baseline",
        body: "A 30-minute call, then a 7-day audit. We time replies to portal, website and WhatsApp leads and count leads and viewings from the last 60 days.",
      },
      {
        title: "We connect your lead sources",
        body: "Portal lead emails, your website and WhatsApp feed into one reply system that knows your listings, areas and agents. Each agent's calendar is connected.",
      },
      {
        title: "It replies, qualifies and books",
        body: "Every lead gets a reply and qualifying questions within 5 minutes. Viewings go into the right agent's calendar with reminders. Agents get a short summary before they arrive.",
      },
    ],
    included: [
      { title: "5-minute replies, day or night", body: "Portal leads, website forms and WhatsApp." },
      { title: "Qualifying questions", body: "Finance, timing and whether they need to sell first, asked politely before the viewing." },
      { title: "Viewings in the agent's calendar", body: "Booked straight into the right agent's diary, with reminders for the buyer." },
      { title: "Agent summary", body: "Each agent gets the buyer's answers before the viewing." },
      { title: "Seller valuation requests", body: "Valuation enquiries are answered and booked like buyer leads." },
      { title: "Old buyer revival", body: "A message to past buyer leads asking if they are still looking." },
    ],
    bonuses: [
      "Old buyer lead revival on your agency's past leads",
      "A seller valuation-request flow",
    ],
    calculator: {
      title: "What one slow reply can cost in commission",
      intro: "Use your agency's own numbers. Nothing is sent anywhere.",
      fields: [
        { key: "leads", label: "Portal, website and WhatsApp leads a month", hint: "Per branch.", min: 5, max: 500, step: 5, initial: 60, format: "int" },
        { key: "slow", label: "Share that wait more than an hour for a reply", hint: "Evenings, weekends and while agents are at viewings.", min: 0, max: 100, step: 5, initial: 30, format: "pct" },
        { key: "viewing", label: "Share of those who would have viewed with you", hint: "Your normal rate from lead to viewing.", min: 0, max: 100, step: 5, initial: 20, format: "pct" },
        { key: "sale", label: "Viewings that end in a sale", hint: "Your own figure. It is usually a small number, which is fine.", min: 0, max: 50, step: 1, initial: 5, format: "pct" },
        { key: "commission", label: "Average commission per sale", hint: "Your agency's share, before splits if you prefer.", min: 5000, max: 300000, step: 5000, initial: 40000, format: "rand" },
      ],
      steps: ["slow replies a month", "viewings you could have had", "sales a month"],
      resultLabel: "Commission at risk, in rand",
      assumptions: [
        "Starting values are examples, not market averages. Use your own.",
        "A fraction of a sale a month still adds up over a year. That is what the yearly figure shows.",
        "Your pre-audit replaces these guesses with your own numbers.",
      ],
    },
    pricing: {
      eyebrow: "Investment",
      title: "Per branch. Done for you.",
      intro: "We build it, connect it and run it. Your agents keep doing viewings.",
      cards: [
        {
          name: "Portal Lead 5-Minute Response",
          tag: "Per branch",
          lines: [
            { label: "Investment", value: "Fixed quote" },
            { label: "Quoted after", value: "Your free pre-audit" },
            { label: "Surprises", value: "None, agreed in writing" },
          ],
          note: "Includes 5-minute replies, qualifying questions, calendar booking, agent summaries, the seller valuation flow and old buyer revival.",
          featured: true,
        },
      ],
      footnote: "For branches with at least 10 leads a month. Every system is scoped to your business, so we quote after the free pre-audit. The quote is fixed and in writing.",
    },
    guarantee: {
      title: "Measured against your own leads.",
      accent: "Or you get your money back.",
      columns: [
        { n: "01", label: "The 5-minute standard", text: "95% of portal, website and WhatsApp leads get a first reply within 5 minutes, day or night. Any month that misses it is free." },
        { n: "02", label: "Viewings up 20% by day 60", text: "If booked viewings are not 20% above your audited baseline at day 60, we work free until they are. Or you cancel and get both monthly fees back. The setup fee covers the build and is not refunded." },
        { n: "03", label: "Agreed before you sign", text: "Both are measured against the baseline from your 7-day audit, signed by both sides." },
      ],
      note: "Applies per branch, for branches with at least 10 leads a month.",
    },
    faqs: [
      PRE_AUDIT_FAQ,
      {
        q: "We already have a chatbot. What is different?",
        a: "Most chatbots reply. This replies, asks the questions your agents need answered, and puts the viewing in the right agent's calendar. We build it and run it for you, and it comes with a guarantee measured against your own numbers.",
      },
      {
        q: "Which portals does it work with?",
        a: "Any portal that sends you a lead by email or notification can be connected. We confirm your exact sources on the pre-audit.",
      },
      BASELINE_FAQ,
      {
        q: "What about POPIA and old leads?",
        a: "Old leads are only contacted where you have a lawful basis to do so, with an easy way to opt out. Anyone who opts out is never contacted again.",
      },
      OWNERSHIP_FAQ,
    ],
    cta: {
      title: "See how fast your branch",
      accent: "really replies.",
      body: "Book the pre-audit. Thirty minutes, no cost. You leave with your reply times by lead source and what they are likely costing you in commission.",
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "trades",
    bookSlug: "trades",
    name: "Trades and Home Services",
    shortName: "Trades",
    offerName: "Trades 5-Minute Enquiry Engine",
    icon: "trades",
    meta: {
      title: "Missed-Call Text-Back and Quote Follow-Up for Trades | Verdance Systems AI",
      description:
        "For landscapers, plumbers, electricians and home service businesses. Every call and enquiry gets a reply within 5 minutes, quotes are followed up, and jobs are booked. South Africa.",
      ogTitle: "You were on a job when they called.",
    },
    card: { line: "Missed calls texted back, quotes followed up, jobs booked." },
    hero: {
      eyebrow: "Landscaping, plumbing, electrical and home services · South Africa",
      lines: ["You were on a job when they called."],
      accent: "By lunch, they had booked someone else.",
      lead: "We set up a system that texts back every missed call and replies to every enquiry within 5 minutes, day or night. It gets the details, follows up every quote you send, and books the job into your diary. You keep your hands on the work.",
    },
    thread: {
      channel: "Missed call · text-back",
      inbound: { time: "10:22", text: "Missed call from 082 ··· ··45" },
      reply: { time: "10:23", text: "Sorry we missed you, we're on a job. What do you need help with, and what's the address?" },
      outcome: { time: "10:31", text: "Site visit booked: Wed 08:00" },
    },
    deltas: [
      { label: "A call you miss on a job", before: "voicemail", after: "texted back within 5 minutes" },
      { label: "Website and WhatsApp enquiries", before: "answered tonight, maybe", after: "within 5 minutes" },
      { label: "Quotes you send", before: "followed up once, if at all", after: "followed up on schedule" },
      { label: "Google reviews", before: "when someone remembers", after: "asked after every job" },
    ],
    steps: [
      {
        title: "Pre-audit",
        body: "A 30-minute call. We look at how many calls and enquiries you get, how many go unanswered, and what happens to the quotes you send.",
      },
      {
        title: "We set it up on your number",
        body: "Your phone, website and WhatsApp feed into one reply system that knows your services, areas and call-out rules. Your diary is connected.",
      },
      {
        title: "It replies, chases and books",
        body: "Missed calls get a text within 5 minutes. Enquiries get the details taken. Quotes are followed up until the customer says yes or no. Jobs land in your diary, and review requests go out when the work is done.",
      },
    ],
    included: [
      { title: "Missed-call text-back", body: "Every missed call gets a text within 5 minutes, so the customer does not ring the next name." },
      { title: "5-minute replies on every channel", body: "Website, WhatsApp and Facebook messages, day or night." },
      { title: "Details taken for you", body: "Address, photos, what needs doing and how urgent it is, before you call back." },
      { title: "Quote follow-up", body: "Every quote is followed up on a schedule until the customer replies. It stops the moment they do." },
      { title: "Jobs in the diary", body: "Site visits and jobs booked into your calendar with reminders for the customer." },
      { title: "Review requests", body: "A Google review request after every finished job." },
    ],
    bonuses: [
      "A message to past customers and old quotes, to fill quiet weeks",
      "A simple monthly report: calls, enquiries, quotes and jobs",
    ],
    calculator: {
      title: "What missed calls cost your business",
      intro: "Four numbers about your business. Nothing is sent anywhere.",
      fields: [
        { key: "calls", label: "Calls and enquiries a month", hint: "Phone, WhatsApp, website and Facebook together.", min: 5, max: 400, step: 5, initial: 60, format: "int" },
        { key: "missed", label: "Share missed or answered late", hint: "On a job, driving, after hours. Your phone's call log is the honest source.", min: 0, max: 100, step: 5, initial: 20, format: "pct" },
        { key: "win", label: "Share of those you would normally win", hint: "Out of people who actually reach you, the share that becomes a job.", min: 0, max: 100, step: 5, initial: 30, format: "pct" },
        { key: "value", label: "Average job value", hint: "The typical job, not the biggest one.", min: 500, max: 100000, step: 500, initial: 3500, format: "rand" },
      ],
      steps: ["missed or late a month", "jobs a month"],
      resultLabel: "Jobs at risk, in rand",
      assumptions: [
        "Starting values are examples, not averages. Use your own.",
        "It does not count quotes that go cold after you send them, which the follow-up also covers.",
        "Your pre-audit replaces these guesses with your real numbers.",
      ],
    },
    pricing: {
      eyebrow: "Investment",
      title: "A fixed price, after one call.",
      intro: "Trades vary a lot, from a one-van business to a team with several crews. We quote a fixed setup and monthly fee after the pre-audit, in writing, before any work starts.",
      cards: [
        {
          name: "Trades 5-Minute Enquiry Engine",
          tag: "After one call",
          lines: [
            { label: "Investment", value: "Fixed quote" },
            { label: "Quoted after", value: "Your free pre-audit" },
            { label: "Surprises", value: "None, agreed in writing" },
          ],
          note: "Includes missed-call text-back, 5-minute replies, quote follow-up, diary booking and review requests.",
          featured: true,
        },
      ],
      footnote: "The price on the quote is the price you pay.",
    },
    guarantee: {
      title: "Fixed price. Fixed launch date.",
      accent: "Full ownership.",
      columns: [
        { n: "01", label: "Fixed quote", text: "The price is agreed in writing before any work begins, and it does not change." },
        { n: "02", label: "Fixed launch date", text: "Your go-live date is part of the agreement, with visible progress every week." },
        { n: "03", label: "Full ownership", text: "The number, the accounts and the customer records are set up in your name from day one." },
      ],
      note: "These three terms are written into every agreement we sign.",
    },
    faqs: [
      PRE_AUDIT_FAQ,
      {
        q: "Do I need to change my phone number?",
        a: "No. We work with the number your customers already have. We confirm the simplest way to connect it on the pre-audit.",
      },
      {
        q: "Will it quote prices to customers?",
        a: "Only if you want it to, and only the prices you give it, like a call-out fee. Anything that needs you to look at the job goes to you with the details already taken.",
      },
      {
        q: "I'm not good with tech. Is that a problem?",
        a: "No. We set it up and run it. You get the booked jobs in your diary and a text when something needs you.",
      },
      OWNERSHIP_FAQ,
    ],
    cta: {
      title: "Find out how many calls",
      accent: "you are missing.",
      body: "Book the pre-audit. Thirty minutes, no cost. You leave knowing how many calls and enquiries slip through and what they are worth.",
    },
  },
];

export const getNicheBySlug = (slug: string): Niche | undefined =>
  NICHES.find((n) => n.slug === slug);
