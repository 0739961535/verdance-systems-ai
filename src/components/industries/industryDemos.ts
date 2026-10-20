import type { Demo } from "@/components/demos/SlowChatDemo";

/**
 * /industries: one entry per industry page. The pain line is how owners
 * tend to put it on a first call, written as a general line, never as a
 * quote from a real person. Every business name in a demo is made up, and
 * every demo is labelled "Sample" by SlowChatDemo.
 */
export type IndustryEntry = {
  /** matches /industries/<slug> (niches.ts or industries.ts) */
  slug: string;
  name: string;
  /** short name for the link: "How it works for venues" */
  short: string;
  pain: string;
  system: string;
  demo: Demo;
};

/** The five current offers (src/data/niches.ts). */
export const OFFER_ENTRIES: IndustryEntry[] = [
  {
    slug: "wedding-venues",
    name: "Wedding and event venues",
    short: "venues",
    pain: "Couples message at ten at night and book whoever answers first.",
    system: "After-hours replies that check the date and book a viewing.",
    demo: {
      business: "Oakridge Barn",
      channel: "WhatsApp · 22:14",
      messages: [
        { from: "them", text: "Hi, is Sat 13 March free for about 120 guests?", time: "22:14" },
        { from: "us", text: "It is. Would you like to see the venue? Sat 10:00 or Sun 14:00.", time: "22:14" },
        { from: "them", text: "Saturday please", time: "22:16" },
        { from: "card", title: "Viewing booked", lines: ["Sat 10:00 · in your diary"] },
      ],
    },
  },
  {
    slug: "lodges-and-venue-groups",
    name: "Lodges and venue groups",
    short: "lodges",
    pain: "My coordinator can't keep up.",
    system: "One assistant across every inbox that hands each enquiry to the right person.",
    demo: {
      business: "Kloofsig Lodge",
      channel: "Email · 06:40",
      messages: [
        { from: "them", text: "Two rooms for 3 nights in April, and a dinner for 8?", time: "06:40" },
        { from: "us", text: "Rooms are free from 17 April. I've passed the dinner to our events lead.", time: "06:41" },
        { from: "card", title: "Handed to events", lines: ["Rooms held for 24 hours", "Dinner request on the events list"], tone: "info" },
      ],
    },
  },
  {
    slug: "private-clinics",
    name: "Self-pay clinics",
    short: "clinics",
    pain: "Reception is on the phone all day and people still don't show.",
    system: "Consultations booked in the chat, with a reminder the day before.",
    demo: {
      business: "Harbour Smile Studio",
      channel: "WhatsApp · 19:05",
      messages: [
        { from: "them", text: "Any consultation slots Thursday morning?", time: "19:05" },
        { from: "card", title: "Booked: Thu 09:00", lines: ["Consent to message: recorded"] },
        { from: "us", text: "Reminder: your consultation is tomorrow at 09:00. Reply YES to confirm.", time: "Wed 17:00" },
        { from: "them", text: "YES", time: "17:02" },
      ],
    },
  },
  {
    slug: "estate-agents",
    name: "Estate agencies",
    short: "estate agents",
    pain: "Buyers ask on Sunday and we only reply on Monday.",
    system: "Listing questions answered on the spot and viewings booked in the chat.",
    demo: {
      business: "Brookside Properties",
      channel: "Website · Sun 16:20",
      messages: [
        { from: "them", text: "Is the 3-bed on Oak Street still available?", time: "16:20" },
        { from: "us", text: "It is. Viewings Tue 17:30 or Sat 11:00?", time: "16:20" },
        { from: "them", text: "Sat works", time: "16:23" },
        { from: "card", title: "Viewing booked", lines: ["Sat 11:00 · agent told"] },
      ],
    },
  },
  {
    slug: "trades",
    name: "Trades and home services",
    short: "trades",
    pain: "We miss the call on the roof and lose the job.",
    system: "Missed calls texted back in under a minute, with the call-out booked.",
    demo: {
      business: "Northline Plumbing",
      channel: "SMS · 13:12",
      messages: [
        { from: "us", text: "Sorry we missed your call, we're on a job. What do you need?", time: "13:12" },
        { from: "them", text: "Geyser leaking through the ceiling", time: "13:13" },
        { from: "us", text: "We can be there at 16:00 today. Shall I book it?", time: "13:13" },
        { from: "card", title: "Call-out booked", lines: ["Today · 16:00"] },
      ],
    },
  },
];

/** Everything else we build for (src/data/industries.ts). */
export const MORE_ENTRIES: IndustryEntry[] = [
  {
    slug: "ecommerce-product-businesses",
    name: "E-commerce and product brands",
    short: "e-commerce",
    pain: "We're drowning in where's-my-order WhatsApps.",
    system: "Order and tracking answers, straight from your store.",
    demo: {
      business: "Fynbos Home Co.",
      channel: "WhatsApp · 20:31",
      messages: [
        { from: "them", text: "Where's my order? #4821", time: "20:31" },
        { from: "us", text: "It left us yesterday. It's with the courier, due Thursday.", time: "20:31" },
        { from: "card", title: "Tracking link sent", lines: ["Order #4821 · on its way"], tone: "info" },
      ],
    },
  },
  {
    slug: "home-services-contractors",
    name: "Builders and design-build",
    short: "builders",
    pain: "Quotes go out and nobody follows them up.",
    system: "Every quote followed up, politely, until a site visit is booked.",
    demo: {
      business: "Stonehaven Build Studio",
      channel: "Email · 3 days after the quote",
      messages: [
        { from: "us", text: "Hi, did you get a chance to look at the kitchen extension quote?", time: "09:00" },
        { from: "them", text: "Yes. Can we meet on site?", time: "09:24" },
        { from: "us", text: "Of course. Wed 08:00 or Fri 14:00?", time: "09:24" },
        { from: "card", title: "Site visit booked", lines: ["Fri 14:00"] },
      ],
    },
  },
  {
    slug: "automotive",
    name: "Car dealers",
    short: "dealers",
    pain: "Leads come in on Saturday night and go cold by Monday.",
    system: "Weekend and after-hours replies, with the test drive booked.",
    demo: {
      business: "Ridgeway Motors",
      channel: "Website · Sat 21:08",
      messages: [
        { from: "them", text: "Is the white hatchback on your site still for sale?", time: "21:08" },
        { from: "us", text: "It is. Test drive Mon 10:00 or Tue 16:00?", time: "21:08" },
        { from: "them", text: "Monday", time: "21:11" },
        { from: "card", title: "Test drive booked", lines: ["Mon 10:00 · sales team told"] },
      ],
    },
  },
  {
    slug: "real-estate-property",
    name: "Property and rentals",
    short: "property",
    pain: "Fifty people ask about one flat.",
    system: "Rental enquiries answered and grouped into viewings.",
    demo: {
      business: "Westgate Rentals",
      channel: "Portal · 12:47",
      messages: [
        { from: "them", text: "Is the 2-bed flat still available? Small dog ok?", time: "12:47" },
        { from: "us", text: "Yes, and small pets are fine. Group viewing Sat 10:00?", time: "12:47" },
        { from: "them", text: "Please add me", time: "12:50" },
        { from: "card", title: "Added to the viewing", lines: ["Sat 10:00"] },
      ],
    },
  },
  {
    slug: "legal-professional-services",
    name: "Legal and professional firms",
    short: "firms",
    pain: "New clients email after hours and go to the next firm.",
    system: "New-client questions asked for you, and the consultation booked.",
    demo: {
      business: "Marsh Doyle Attorneys",
      channel: "Email · 19:52",
      messages: [
        { from: "them", text: "I need help with a lease dispute.", time: "19:52" },
        { from: "us", text: "We can help. Four quick questions first, then I'll book you in.", time: "19:52" },
        { from: "card", title: "Consultation booked", lines: ["Wed 11:00 · notes for the attorney"] },
      ],
    },
  },
  {
    slug: "medical-wellness",
    name: "Medical and wellness practices",
    short: "practices",
    pain: "The phones never stop, and the diary still has gaps.",
    system: "Cancelled slots offered to the waiting list straight away.",
    demo: {
      business: "Greenpoint Physio",
      channel: "WhatsApp · 08:05",
      messages: [
        { from: "card", title: "Slot opened: Thu 10:00", lines: ["Offered to the waiting list"], tone: "info" },
        { from: "us", text: "A 10:00 slot opened on Thursday. Would you like it?", time: "08:05" },
        { from: "them", text: "Yes please", time: "08:09" },
        { from: "card", title: "Booked", lines: ["Thu 10:00 · diary full again"] },
      ],
    },
  },
  {
    slug: "beauty-aesthetics",
    name: "Beauty and aesthetics",
    short: "salons",
    pain: "DMs pile up while I'm with a client.",
    system: "Instagram and WhatsApp replies that book straight into your diary.",
    demo: {
      business: "Velvet Room Studio",
      channel: "Instagram · 14:10",
      messages: [
        { from: "them", text: "Anything Saturday for a facial?", time: "14:10" },
        { from: "us", text: "Sat 11:30 is open. Shall I book it?", time: "14:10" },
        { from: "them", text: "Yes", time: "14:12" },
        { from: "card", title: "Booked", lines: ["Sat 11:30 · facial"] },
      ],
    },
  },
  {
    slug: "fitness-gyms",
    name: "Gyms and studios",
    short: "gyms",
    pain: "People ask about joining, then never come in.",
    system: "Trial sessions booked, and a nudge if they go quiet.",
    demo: {
      business: "Iron Tide Gym",
      channel: "Instagram · 18:45",
      messages: [
        { from: "them", text: "Do you do beginner classes?", time: "18:45" },
        { from: "us", text: "We do. Try one free: tomorrow 06:00 or 17:30?", time: "18:45" },
        { from: "them", text: "17:30", time: "18:47" },
        { from: "card", title: "Trial booked", lines: ["Tomorrow · 17:30"] },
      ],
    },
  },
  {
    slug: "restaurants-hospitality",
    name: "Restaurants and hospitality",
    short: "restaurants",
    pain: "Booking requests sit in the DMs all through service.",
    system: "Table and function bookings answered during the rush.",
    demo: {
      business: "Saltwater Kitchen",
      channel: "WhatsApp · 19:40",
      messages: [
        { from: "them", text: "Table for 6 on Friday at 19:00?", time: "19:40" },
        { from: "us", text: "19:00 is full. 18:30 or 20:15?", time: "19:40" },
        { from: "them", text: "20:15", time: "19:41" },
        { from: "card", title: "Table booked", lines: ["Fri 20:15 · 6 guests"] },
      ],
    },
  },
  {
    slug: "education-coaching",
    name: "Education and coaching",
    short: "tutors and coaches",
    pain: "Parents ask the same five questions every week.",
    system: "Common questions answered, and the first lesson booked.",
    demo: {
      business: "Bright Path Tutors",
      channel: "WhatsApp · 16:30",
      messages: [
        { from: "them", text: "Do you do Grade 10 maths?", time: "16:30" },
        { from: "us", text: "We do. Small groups, Tue and Thu after school. Book a first lesson?", time: "16:30" },
        { from: "them", text: "Yes please", time: "16:34" },
        { from: "card", title: "First lesson booked", lines: ["Tue 15:30"] },
      ],
    },
  },
];
