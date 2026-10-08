/**
 * Sample conversations played on the phone mockups.
 *
 * These are illustrations, not real customers, and every phone that plays one
 * is labelled "Sample conversation". Keep them believable and short: each
 * message must fit the phone at 260px wide without scrolling. No prices.
 *
 * The phone plays the beats in order. A typing indicator is inserted
 * automatically before every reply ("out") and booking card.
 */

export interface ProductCard {
  name: string;
  detail: string;
  cta: string;
}

export type Beat =
  | { kind: "in"; text: string; time: string; picked?: boolean }
  | {
      kind: "out";
      text: string;
      time: string;
      meta?: string;
      /** A list message (rows inside the bubble) or quick-reply buttons under it. */
      options?: { style: "list" | "quick"; title?: string; items: string[] };
      product?: ProductCard;
    }
  | { kind: "card"; title: string; lines: string[]; time: string; dir?: "in" | "out" }
  | { kind: "missed"; text: string; time: string };

export interface Conversation {
  /** Who the customer is messaging (shown in the chat header). */
  business: { name: string; initials: string };
  /** Clock in the status bar while the chat plays. */
  clock: string;
  /** Lock screen shown to the owner at the end. */
  lock: { clock: string; date: string; app: string; title: string; body: string };
  beats: Beat[];
  /** Plain-language transcript for screen readers. */
  summary: string;
}

export const HOME_CONVERSATION: Conversation = {
  business: { name: "Oakridge Venue", initials: "OV" },
  clock: "21:42",
  lock: {
    clock: "21:44",
    date: "Monday 12 October",
    app: "Bookings",
    title: "New viewing booked",
    body: "Thu 10:00. Wedding on 14 March, about 90 guests.",
  },
  beats: [
    { kind: "in", time: "21:42", text: "Hi, do you have 14 March free for a wedding of about 90 people?" },
    {
      kind: "out",
      time: "21:42",
      meta: "Replied in 4 sec",
      text: "Hi, thanks for asking. Sunday 14 March 2027 is open. For 90 guests the Garden package fits best: ceremony on the lawn, dinner in the barn. Would you like to come and see it? Thu 10:00 or Sat 11:00.",
    },
    { kind: "in", time: "21:43", text: "Thursday 10:00 please" },
    {
      kind: "card",
      time: "21:43",
      title: "Viewing booked, Thu 10:00",
      lines: ["Oakridge Venue, main gate", "Added to the venue diary", "Reminder the day before"],
    },
  ],
  summary:
    "Sample conversation. At 21:42 a customer asks if 14 March is free for a wedding of about 90 people. Four seconds later the venue replies that the date is open, suggests the Garden package and offers two viewing times. The customer picks Thursday 10:00, a viewing is booked into the diary, and the owner gets a notification: new viewing booked, Thursday 10:00.",
};

export const NICHE_CONVERSATIONS: Record<string, Conversation> = {
  "wedding-venues": {
    business: { name: "Oakridge Venue", initials: "OV" },
    clock: "21:40",
    lock: {
      clock: "21:43",
      date: "Monday 12 October",
      app: "Bookings",
      title: "New viewing booked",
      body: "Sat 10:00. 14 March 2027, about 110 guests.",
    },
    beats: [
      { kind: "in", time: "21:40", text: "Hi, is 14 March 2027 still open? About 110 guests." },
      {
        kind: "out",
        time: "21:40",
        meta: "Replied in 5 sec",
        text: "It is. 110 guests suits the Barn and Lawn package. Would you like to see the venue? Saturday 10:00 or Sunday 14:00.",
      },
      { kind: "in", time: "21:42", text: "Saturday 10:00 works for us" },
      {
        kind: "card",
        time: "21:42",
        title: "Viewing booked, Sat 10:00",
        lines: ["In the venue diary", "Reminder sent the day before"],
      },
    ],
    summary:
      "Sample conversation. At 21:40 a couple asks if 14 March 2027 is open for about 110 guests. The venue replies within seconds, suggests a package and offers two viewing times. The couple picks Saturday 10:00 and the viewing is booked into the diary.",
  },

  "lodges-and-venue-groups": {
    business: { name: "Kloofhuis Lodge", initials: "KL" },
    clock: "18:52",
    lock: {
      clock: "18:58",
      date: "Wednesday 14 October",
      app: "Bookings",
      title: "Site visit booked",
      body: "Thu 11:00 with the events manager. Offsite for 24, May.",
    },
    beats: [
      { kind: "in", time: "18:52", text: "Looking for a 2-night leadership offsite for 24 people in May. Rooms and a venue?" },
      {
        kind: "out",
        time: "18:52",
        meta: "Replied in 6 sec",
        text: "We can host that. May has two open weekends for 24, with the conference room and all rooms on site. Shall I set up a site visit with our events manager?",
      },
      { kind: "in", time: "18:55", text: "Yes please, Thursday morning if possible" },
      {
        kind: "card",
        time: "18:55",
        title: "Site visit booked, Thu 11:00",
        lines: ["With the events manager", "Enquiry passed on with full details"],
      },
    ],
    summary:
      "Sample conversation. At 18:52 a company asks about a two-night offsite for 24 people in May. The lodge replies within seconds with availability and offers a site visit. A site visit is booked for Thursday 11:00 with the events manager.",
  },

  "private-clinics": {
    business: { name: "Parkside Practice", initials: "PP" },
    clock: "20:04",
    lock: {
      clock: "20:07",
      date: "Tuesday 13 October",
      app: "Practice diary",
      title: "Consultation booked",
      body: "Thu 15:00. New patient, details captured.",
    },
    beats: [
      { kind: "in", time: "20:04", text: "Hi, I'd like to book a consultation. Do you have anything next week?" },
      {
        kind: "out",
        time: "20:04",
        meta: "Replied in 5 sec",
        text: "Thank you for contacting the practice. We have Tuesday 09:30 or Thursday 15:00 for a consultation. Which suits you?",
      },
      { kind: "in", time: "20:06", text: "Thursday 15:00 please" },
      {
        kind: "card",
        time: "20:06",
        title: "Consultation booked, Thu 15:00",
        lines: ["In the practice diary", "Reminder the day before"],
      },
    ],
    summary:
      "Sample conversation. At 20:04 a patient asks for a consultation next week. The practice replies within seconds with two times. The patient picks Thursday 15:00 and the consultation is booked into the practice diary.",
  },

  "estate-agents": {
    business: { name: "Harbour Properties", initials: "HP" },
    clock: "21:14",
    lock: {
      clock: "21:18",
      date: "Thursday 15 October",
      app: "Viewings",
      title: "Viewing booked",
      body: "Sat 11:30 with your agent. Buyer pre-qualified.",
    },
    beats: [
      { kind: "in", time: "21:14", text: "Is the 3-bed on Main Road still available? Can I view this weekend?" },
      {
        kind: "out",
        time: "21:14",
        meta: "Replied in 4 sec",
        text: "It is. Are you buying with a bond, and have you sold your current home? Saturday 09:00 or 11:30 are open.",
      },
      { kind: "in", time: "21:16", text: "Bond pre-approved, nothing to sell. 11:30 is great" },
      {
        kind: "card",
        time: "21:16",
        title: "Viewing booked, Sat 11:30",
        lines: ["With the listing agent", "Buyer details in your CRM"],
      },
    ],
    summary:
      "Sample conversation. At 21:14 a buyer asks if a 3-bedroom house is available and if they can view it at the weekend. The agency replies within seconds, asks two qualifying questions and offers two times. The buyer is pre-approved and books Saturday 11:30.",
  },

  trades: {
    business: { name: "Rietvlei Plumbing", initials: "RP" },
    clock: "10:22",
    lock: {
      clock: "10:31",
      date: "Monday 12 October",
      app: "Jobs",
      title: "Quote visit booked",
      body: "Wed 08:00. Leaking geyser, address captured.",
    },
    beats: [
      { kind: "missed", time: "10:22", text: "Missed call from 082 ··· ··45" },
      {
        kind: "out",
        time: "10:22",
        meta: "Sent in 8 sec",
        text: "Sorry we missed you, we're on a job. What do you need help with, and what's the address?",
      },
      { kind: "in", time: "10:25", text: "Geyser is leaking through the ceiling. 14 Vygie Street" },
      {
        kind: "card",
        time: "10:26",
        title: "Quote visit booked, Wed 08:00",
        lines: ["Photos requested before the visit", "Added to the job board"],
      },
    ],
    summary:
      "Sample conversation. At 10:22 a customer calls and nobody can answer. Within seconds they get a text back asking what they need. They describe a leaking geyser and give the address, and a quote visit is booked for Wednesday 08:00.",
  },
};

/**
 * The homepage hero cycles through these, one after another. Each one plays
 * fully, holds, then crossfades to the next. Times are after hours on
 * purpose. All names are invented.
 */
export const HOME_ROTATION: { label: string; conversation: Conversation }[] = [
  {
    label: "Home services",
    conversation: {
      business: { name: "Rietvlei Plumbing", initials: "RP" },
      clock: "21:42",
      lock: {
        clock: "21:44",
        date: "Monday 12 October",
        app: "Jobs",
        title: "New job booked",
        body: "Tue 07:30. Geyser repair, address captured.",
      },
      beats: [
        { kind: "in", time: "21:42", text: "Hi, my geyser is leaking, can someone come out today?" },
        {
          kind: "out",
          time: "21:42",
          meta: "Replied in 4s",
          text: "Sorry to hear that. We can help. What do you need?",
          options: { style: "list", title: "Choose a service", items: ["Geyser repair", "Leak detection", "New installation", "Something else"] },
        },
        { kind: "in", time: "21:43", text: "Geyser repair", picked: true },
        { kind: "out", time: "21:43", meta: "Replied in 3s", text: "The next available slot is tomorrow at 07:30. Shall I book it?" },
        { kind: "in", time: "21:43", text: "Yes please" },
        { kind: "card", time: "21:44", title: "Booked, Tue 07:30", lines: ["Geyser repair", "Reminder tonight at 20:00"] },
      ],
      summary:
        "Sample conversation, home services. At 21:42 a customer says their geyser is leaking. The business replies in 4 seconds with a list of services. The customer picks geyser repair, is offered the next slot at 07:30 the next morning, and the job is booked.",
    },
  },
  {
    label: "Online store",
    conversation: {
      business: { name: "Homeware Store", initials: "HS" },
      clock: "22:15",
      lock: {
        clock: "22:17",
        date: "Monday 12 October",
        app: "Orders",
        title: "New order",
        body: "Linen bedding set, large. Delivery to Durban.",
      },
      beats: [
        { kind: "in", time: "22:15", text: "Hi, is the large linen set back in stock? Do you deliver to Durban?" },
        {
          kind: "out",
          time: "22:15",
          meta: "Replied in 3s",
          text: "It's back in stock. Delivery to Durban takes 2 to 3 working days.",
          product: { name: "Linen bedding set, large", detail: "In stock · ships tomorrow", cta: "Buy now" },
        },
        { kind: "in", time: "22:16", text: "Perfect, just ordered" },
        { kind: "card", time: "22:16", title: "Order confirmed", lines: ["Linen bedding set, large", "Tracking link sent when it ships"] },
      ],
      summary:
        "Sample conversation, online store. At 22:15 a customer asks if the large linen set is back in stock and if it delivers to Durban. The store replies in 3 seconds with stock, delivery time and a buy button. The customer orders and gets an order confirmation.",
    },
  },
  { label: "Venues", conversation: HOME_CONVERSATION },
  {
    label: "Clinics",
    conversation: {
      business: { name: "Parkside Practice", initials: "PP" },
      clock: "21:58",
      lock: {
        clock: "21:59",
        date: "Monday 12 October",
        app: "Practice diary",
        title: "Consultation booked",
        body: "Thu 15:00. Implant consultation, new patient.",
      },
      beats: [
        { kind: "in", time: "21:58", text: "Do you have a consult for implants next week?" },
        {
          kind: "out",
          time: "21:58",
          meta: "Replied in 4s",
          text: "We do. These times are open for an implant consultation:",
          options: { style: "quick", items: ["Tue 09:30", "Thu 15:00"] },
        },
        { kind: "in", time: "21:59", text: "Thu 15:00", picked: true },
        { kind: "card", time: "21:59", title: "Consultation booked, Thu 15:00", lines: ["In the practice diary", "Reminder the day before"] },
      ],
      summary:
        "Sample conversation, clinic. At 21:58 a patient asks for an implant consultation next week. The practice replies in 4 seconds with two times as buttons. The patient taps Thursday 15:00 and the consultation is booked.",
    },
  },
];
