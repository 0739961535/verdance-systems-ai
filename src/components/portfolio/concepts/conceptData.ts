/**
 * Four concept demos for /portfolio: made-up businesses in the niches where
 * one answered enquiry is worth the most. Every name, time and message here is
 * invented, and the page labels each one "Concept". No numbers, no prices.
 */

export type ConceptMsg = { from: "them" | "us"; text: string; time: string };

export type ConceptDemo = {
  id: string;
  niche: string;
  business: string;
  kind: string;
  channel: string;
  /** What the tab says the demo shows. */
  blurb: string;
  columns: [string, string, string];
  /** The card that moves through the pipeline. */
  card: { title: string; sub: string };
  /** Quiet cards already sitting in the pipeline, by column. */
  ghosts: [string[], string[], string[]];
  messages: [ConceptMsg, ConceptMsg, ConceptMsg, ConceptMsg];
  /** Column the card sits in once each message has landed. */
  moves: [number, number, number, number];
  outcome: { title: string; lines: string[]; handoff: string };
  warm?: boolean;
};

export const CONCEPT_DEMOS: ConceptDemo[] = [
  {
    id: "venue",
    niche: "Venues and lodges",
    business: "Kloofwater Estate",
    kind: "Wine estate, venue and stays",
    channel: "WhatsApp",
    blurb: "A late wedding enquiry becomes a booked viewing before bedtime.",
    columns: ["New enquiry", "Answered", "Viewing booked"],
    card: { title: "Wedding enquiry", sub: "Saturday 14 March" },
    ghosts: [["Anniversary weekend"], ["Corporate lunch"], ["Garden ceremony"]],
    messages: [
      { from: "them", text: "Hi, is Saturday 14 March still open for a wedding?", time: "21:42" },
      { from: "us", text: "It is. The Barrel Room and the lawn are both free that day. Would you like to see them? Thursday at 10:00 or Saturday at 11:00.", time: "21:42" },
      { from: "them", text: "Saturday works for us.", time: "21:45" },
      { from: "us", text: "Booked for Saturday at 11:00 with Lindiwe, our events coordinator. The details and a map are in your inbox.", time: "21:45" },
    ],
    moves: [0, 1, 1, 2],
    outcome: { title: "Viewing booked", lines: ["Saturday, 11:00", "With the events coordinator", "Details and map sent"], handoff: "In the coordinator's diary" },
    warm: true,
  },
  {
    id: "wholesale",
    niche: "Wholesale and distribution",
    business: "Harbour and Reed Supply",
    kind: "Homeware wholesaler",
    channel: "WhatsApp",
    blurb: "An early reorder from a stockist is drafted, confirmed and sent to the warehouse.",
    columns: ["New request", "Order drafted", "Confirmed"],
    card: { title: "Stockist reorder", sub: "Same as last month, plus napkins" },
    ghosts: [["Price list request"], ["Sample box"], ["Restock, linen range"]],
    messages: [
      { from: "them", text: "Morning. Can I reorder the same as last month, plus two more boxes of the linen napkins?", time: "07:10" },
      { from: "us", text: "Morning, Thandi. Here is last month's order with the extra napkins added. Shall I confirm it for delivery on Thursday?", time: "07:10" },
      { from: "them", text: "Yes please, go ahead.", time: "07:12" },
      { from: "us", text: "Confirmed. It is with the warehouse now, the invoice is on its way to your accounts email, and tracking follows when it ships.", time: "07:12" },
    ],
    moves: [0, 1, 1, 2],
    outcome: { title: "Order confirmed", lines: ["Delivery on Thursday", "Sent to the warehouse", "Invoice emailed"], handoff: "Packing list ready for the team" },
  },
  {
    id: "builder",
    niche: "Builders and design studios",
    business: "Stonefield Build and Design",
    kind: "Design and build studio",
    channel: "Website chat",
    blurb: "A new home enquiry arrives with a brief and leaves with a site visit in the diary.",
    columns: ["New lead", "Brief collected", "Site visit booked"],
    card: { title: "New family home", sub: "Plot in Hermanus" },
    ghosts: [["Kitchen extension"], ["Pool house"], ["Renovation quote"]],
    messages: [
      { from: "them", text: "We have a plot in Hermanus and want a quote for a new family home. Can someone come and see it?", time: "19:05" },
      { from: "us", text: "Yes. So the quote is right: do you have plans yet, and when would you like to start?", time: "19:05" },
      { from: "them", text: "No plans yet. Hoping to start next year. Any morning next week is fine.", time: "19:09" },
      { from: "us", text: "Booked: a site visit on Tuesday at 09:00 with Pieter, our project lead. Your design brief is in your inbox to fill in before then.", time: "19:09" },
    ],
    moves: [0, 0, 1, 2],
    outcome: { title: "Site visit booked", lines: ["Tuesday, 09:00", "With the project lead", "Design brief sent"], handoff: "Brief attached to the lead" },
  },
  {
    id: "clinic",
    niche: "Self-pay clinics",
    business: "Lumen Skin Clinic",
    kind: "Aesthetics clinic",
    channel: "Instagram",
    blurb: "A night-time booking request is answered and booked, with treatment questions kept for the doctor.",
    columns: ["New enquiry", "Times offered", "Consultation booked"],
    card: { title: "Booking request", sub: "Pigmentation" },
    ghosts: [["Follow-up visit"], ["Peel enquiry"], ["Review appointment"]],
    messages: [
      { from: "them", text: "Hi, I'd like to book a consultation for pigmentation. Anything this week?", time: "22:30" },
      { from: "us", text: "Yes. The doctor has Thursday at 16:00 or Friday at 08:30. Questions about treatment are best answered in the consultation itself.", time: "22:30" },
      { from: "them", text: "Friday morning please.", time: "22:33" },
      { from: "us", text: "Booked for Friday at 08:30. A reminder comes the day before, and your private intake form is ready to fill in online.", time: "22:33" },
    ],
    moves: [0, 1, 1, 2],
    outcome: { title: "Consultation booked", lines: ["Friday, 08:30", "Reminder the day before", "Intake form sent privately"], handoff: "Consent recorded with the booking" },
  },
];
