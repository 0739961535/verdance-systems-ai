/**
 * The six delivery steps.
 *
 * One source of truth for the homepage timeline and for the detail page each
 * step links to. Same plain language rule as landing.ts: the reader is a
 * business owner who does not know what AI is and does not care.
 *
 * Every step names a deliverable and a time. That specificity is the product,
 * because "we'll get you sorted" is what everyone else says.
 */

export interface ProcessBeat {
  title: string;
  body: string;
}

export interface ProcessStep {
  /** Route segment: /how-it-works/<slug> */
  slug: string;
  /** 01 through 06. */
  n: string;
  name: string;
  /** One line, used on the timeline. */
  desc: string;
  /** Timing and deliverable, used on the timeline. */
  meta: string;
  /** The promise this step makes, used as the detail page headline. */
  promise: string;
  /** How long this step takes, in plain words. */
  duration: string;
  /** What actually happens, in order. */
  beats: ProcessBeat[];
  /** The thing that exists at the end that did not exist before. */
  deliverable: string;
  /** What we need from them for this step. Short, non technical. */
  fromYou: string[];
  /** The question people actually ask about this step. */
  question: { q: string; a: string };
}

export const PROCESS: ProcessStep[] = [
  {
    slug: "audit",
    n: "01",
    name: "Audit",
    desc: "A 30 minute call. We work out where you are losing the most money, and what to fix first.",
    meta: "Week 0 · you get: a plan, in order",
    promise: "Thirty minutes to find out where the money is going.",
    duration: "One call, thirty minutes",
    beats: [
      {
        title: "We follow an enquiry through your business",
        body: "Someone phones you at seven in the evening. What happens? Someone messages on a Saturday. What happens? We walk the route a real customer takes, from first contact to booked, and find every point where it stops.",
      },
      {
        title: "We put numbers on the gaps",
        body: "Not a feeling, a figure. How many calls go unanswered in a week, what a customer is worth to you, how many of them you would normally win. Three numbers and you have what the gap costs a year. Most owners have never done that arithmetic.",
      },
      {
        title: "We rank them",
        body: "Every business has more problems than budget. We put them in order of what pays back fastest, so the first thing we build funds the second.",
      },
    ],
    deliverable:
      "A written plan listing what is broken, what it costs you, and what to fix first, second and third. It is yours to keep, and you are free to take it to somebody else.",
    fromYou: [
      "Thirty minutes on a video call",
      "Roughly how many enquiries you get in a week",
      "What an average customer is worth to you",
      "Whoever answers the phone today, if they can join",
    ],
    question: {
      q: "Is this really free, or is it a sales call?",
      a: "It is free and you keep the plan. We would rather spend thirty minutes finding out we are not a fit than sell you something that does not pay for itself. If the numbers do not work, we will tell you on the call.",
    },
  },
  {
    slug: "blueprint",
    n: "02",
    name: "Blueprint",
    desc: "We write down exactly what gets built and what it will do, before anyone starts building.",
    meta: "Week 1 · you get: the written plan and a fixed price",
    promise: "Everything agreed in writing before anyone touches anything.",
    duration: "About a week after the audit call",
    beats: [
      {
        title: "We write the specification",
        body: "Exactly what gets built, in language you can read. What it will answer, what it will book, where it will send things, and what happens when something goes wrong. Specific enough to settle an argument later.",
      },
      {
        title: "We price it, once",
        body: "One build fee and one monthly, both fixed and both in writing. The price on the blueprint is the price you pay. No hourly rates, no scope creep conversation in week three.",
      },
      {
        title: "We put the maths beside the price",
        body: "What the gap costs you today against what the system costs. If the payback does not make obvious sense, this is where you find out, before any money moves.",
      },
    ],
    deliverable:
      "A document with the full scope, a fixed build fee, a fixed monthly, the return on investment worked out from your own numbers, and a launch date. Sign it or do not, but nothing is ambiguous.",
    fromYou: [
      "An hour to read it properly",
      "Any correction to the numbers you gave us",
      "A yes or a no, and a no is a fine answer",
    ],
    question: {
      q: "What if I want to change something after I have signed?",
      a: "Small changes during the build are part of the job and cost nothing. Anything that genuinely widens the scope gets quoted separately before we start it, so the original price still means something.",
    },
  },
  {
    slug: "build",
    n: "03",
    name: "Build",
    desc: "We build it, then test it against that plan line by line.",
    meta: "Weeks 2-3 · you get: something you can try before it goes live",
    promise: "Built, then tested against the plan line by line.",
    duration: "Usually two weeks",
    beats: [
      {
        title: "We build it on your accounts",
        body: "Everything is registered in your name from the first day, not ours. If we parted ways in week two you would still own what exists.",
      },
      {
        title: "We teach it your business",
        body: "Your services, your prices, your opening hours, the questions you get asked forty times a week and the answers you actually give. It should sound like your business because it is repeating your words.",
      },
      {
        title: "We try to break it",
        body: "The rude caller, the unclear message, the person asking for something you do not offer, the double booking. The interesting part is never the happy path.",
      },
    ],
    deliverable:
      "A working system you can use yourself, in test mode, before a single real customer touches it. You phone it. You message it. You decide whether it is good enough.",
    fromYou: [
      "Your five most common customer questions, in your own words",
      "Your services and what they cost",
      "An hour to test it and tell us what sounds wrong",
    ],
    question: {
      q: "Will it sound like a robot?",
      a: "You will judge that yourself before it goes live, which is the point of testing it in week three. If it sounds wrong to you, it does not launch. Most of the tuning at this stage is about tone rather than accuracy.",
    },
  },
  {
    slug: "connect",
    n: "04",
    name: "Connect",
    desc: "We hook it up to your phone, your calendar, and wherever your customers message you.",
    meta: "you get: everything talking to everything",
    promise: "Your phone, your calendar and your messages, all in one place.",
    duration: "A few days, inside the build weeks",
    beats: [
      {
        title: "The phone",
        body: "Calls you do not answer get picked up instead of ringing out. Your number stays your number and nothing about how you use your phone changes.",
      },
      {
        title: "The calendar",
        body: "Bookings land straight in the diary you already use, checked against what is already there so nothing double books.",
      },
      {
        title: "Everywhere else they message you",
        body: "WhatsApp, texts, the website, wherever they actually reach out. All of it arrives in one place instead of four, so nothing gets missed because it came in on the wrong channel.",
      },
    ],
    deliverable:
      "One connected setup. Every enquiry, whichever way it arrives, ends up somewhere you can see it, and every booking ends up in your calendar.",
    fromYou: [
      "Access to your calendar",
      "Your phone setup, which we handle with your provider if needed",
      "A list of every place customers currently message you",
    ],
    question: {
      q: "Do we have to change our phone number or our systems?",
      a: "No. Your number stays yours, and we connect to the tools you already use wherever that is the right call. We only suggest moving something if it genuinely pays for itself, and that trade-off was already worked out on the audit call.",
    },
  },
  {
    slug: "launch",
    n: "05",
    name: "Launch",
    desc: "It goes live on the date written into your contract, and we train your team to use it.",
    meta: "you get: a launch date in the contract",
    promise: "Live on the date in your contract, with your team trained.",
    duration: "One day, on a date agreed weeks earlier",
    beats: [
      {
        title: "It goes live on the agreed date",
        body: "The date is in the contract, not in an email. We build towards it in stages so it is never in doubt in the last week.",
      },
      {
        title: "Your team gets trained",
        body: "Two sessions and a written guide. Nobody needs to understand how it works, only what it does and when to step in. It is usually shorter than people expect.",
      },
      {
        title: "You get every login",
        body: "Every account, every password, everything. It is registered in your name and it stays that way whether or not you keep working with us.",
      },
    ],
    deliverable:
      "A system answering real customers, a trained team, written guides, and every credential in your hands.",
    fromYou: [
      "An hour of your front desk team's time, twice",
      "Someone to be the point of contact on the day",
    ],
    question: {
      q: "What if it goes wrong on day one?",
      a: "We are watching it on launch day and for the days after, and anything that stops working gets same day attention. Your team can also switch it off entirely at any point, which almost never happens but matters that it is possible.",
    },
  },
  {
    slug: "run-and-improve",
    n: "06",
    name: "Run and improve",
    desc: "We watch it, keep improving it, and send you the numbers every month.",
    meta: "monthly · you get: a performance report",
    promise: "It gets better every month, and you see the numbers.",
    duration: "Ongoing, for as long as you want it",
    beats: [
      {
        title: "We watch it",
        body: "Something breaking quietly is the real risk with any system like this. We monitor it so a failure reaches us before it reaches your customers.",
      },
      {
        title: "We keep tuning it",
        body: "Your services change, your prices change, your busy season arrives. It gets updated to match, and when better models come out you get them at no extra cost.",
      },
      {
        title: "You get the numbers",
        body: "How many enquiries came in, how many got answered, how fast, how many booked, what it was worth. Once a month, against the targets we agreed on the audit call.",
      },
    ],
    deliverable:
      "A monthly report with the numbers that matter, a call to go through them, and same day support on anything that stops working.",
    fromYou: [
      "Tell us when something about your business changes",
      "Half an hour a month on the reporting call, if you want it",
    ],
    question: {
      q: "What am I actually paying for every month?",
      a: "Everything it costs to keep running, all the monitoring and tuning, unlimited conversations with no fee per booking, the monthly reporting, same day support, and every upgrade. The monthly is what keeps it working and getting better, not a rental fee for something we could switch off.",
    },
  },
];

export const PROCESS_BY_SLUG: Record<string, ProcessStep> = Object.fromEntries(
  PROCESS.map((s) => [s.slug, s])
);
