/**
 * "Ask your business": sample questions for a fictional business
 * (Northvale Active, an invented activewear brand). Every number here is
 * made up and round, and the panel says so. Never present as client results.
 */
export type AskVisual =
  | { kind: "bars"; items: { label: string; value: number; display: string; now?: boolean }[] }
  | { kind: "stats"; items: { label: string; value: string }[] }
  | { kind: "list"; items: { label: string; value: string }[] }
  | { kind: "invoices"; items: { who: string; amount: string; days: string }[]; action: string }
  | { kind: "split"; total: string; items: { label: string; value: string }[] }
  | { kind: "bullets"; items: string[] };

export type AskItem = { chip: string; q: string; a: string; visual: AskVisual; sources: string[] };

export const ASK_BUSINESS = "Northvale Active";

export const ASK_ITEMS: AskItem[] = [
  {
    chip: "This month",
    q: "How did we do this month?",
    a: "October so far: R482,000 in sales, up 12% on September.",
    visual: {
      kind: "bars",
      items: [
        { label: "Jul", value: 396, display: "R396,000" },
        { label: "Aug", value: 412, display: "R412,000" },
        { label: "Sep", value: 430, display: "R430,000" },
        { label: "Oct", value: 482, display: "R482,000", now: true },
      ],
    },
    sources: ["Shopify"],
  },
  {
    chip: "Profit",
    q: "What profit did we make in September?",
    a: "Gross profit of R172,000 on R430,000 in sales. That is a 40% margin, up from 37% in August.",
    visual: {
      kind: "stats",
      items: [
        { label: "Gross profit", value: "R172,000" },
        { label: "Margin", value: "40%" },
      ],
    },
    sources: ["Xero"],
  },
  {
    chip: "Best sellers",
    q: "Which products are selling best?",
    a: "This month the trail running jacket leads, then the running shorts and the hydration vest.",
    visual: {
      kind: "list",
      items: [
        { label: "Trail running jacket", value: "R192,000" },
        { label: "Running shorts", value: "R97,000" },
        { label: "Hydration vest", value: "R84,000" },
      ],
    },
    sources: ["Shopify"],
  },
  {
    chip: "Unpaid",
    q: "Who hasn't paid yet?",
    a: "Two wholesale invoices are overdue, R24,600 in total.",
    visual: {
      kind: "invoices",
      items: [
        { who: "Stockist, Durban", amount: "R18,400", days: "21 days late" },
        { who: "Running club", amount: "R6,200", days: "9 days late" },
      ],
      action: "Draft a polite reminder to both? You approve before it sends.",
    },
    sources: ["Xero"],
  },
  {
    chip: "After hours",
    q: "How many enquiries did we miss after hours?",
    a: "None missed. 46 came in after hours this month and every one got a reply within a minute.",
    visual: {
      kind: "split",
      total: "46 after hours",
      items: [
        { label: "Answered and closed", value: "41" },
        { label: "Handed to the team next morning", value: "5" },
      ],
    },
    sources: ["WhatsApp", "website chat", "email"],
  },
  {
    chip: "This week",
    q: "What should I focus on this week?",
    a: "Three things will make the most difference:",
    visual: {
      kind: "bullets",
      items: [
        "Chase the two overdue invoices (R24,600).",
        "Reorder the trail running jacket in medium: 9 left, selling 6 a day.",
        "Reply to the 3 wholesale quotes waiting since Friday.",
      ],
    },
    sources: ["Xero", "Shopify", "WhatsApp"],
  },
];
