import { TOOL_ICONS } from "../toolIcons";

export type ConnectStep = { n: string; title: string; tech: string; gloss: string };

/** The four steps. Copy agreed with Daniel; keep it word for word. */
export const STEPS: ConnectStep[] = [
  {
    n: "01",
    title: "Map your stack",
    tech: "We audit your tools: CRM, WhatsApp Business, email, calendar, e-commerce platform, accounting and spreadsheets.",
    gloss: "You tell us what you use. We check how each one can share information.",
  },
  {
    n: "02",
    title: "Connect over APIs",
    tech: "Secure API and webhook integrations, OAuth access, least-privilege permissions, and data kept in accounts you own.",
    gloss: "We plug your tools into each other safely, with only the access each job needs.",
  },
  {
    n: "03",
    title: "Add the intelligence layer",
    tech: "AI agents trained on your products, prices, policies and tone, with retrieval over your own knowledge, routing rules, and human approval where it matters.",
    gloss: "The assistant learns your business and knows when to hand over to a person.",
  },
  {
    n: "04",
    title: "Run it from one app",
    tech: "One command centre for you and your team: live conversations, pipeline, approvals, reports and an audit log, on web and phone.",
    gloss: "Everything in one place you can check from your phone.",
  },
];

export type Chip = { label: string; short: string; path: string | null; color: string; scale?: number };

/** [full name, short label under the node] */
const NAMES: [string, string][] = [
  ["WhatsApp", "WhatsApp"],
  ["Gmail", "Gmail"],
  ["Outlook", "Outlook"],
  ["Google Calendar", "Calendar"],
  ["Shopify", "Shopify"],
  ["WooCommerce", "WooCommerce"],
  ["HubSpot", "HubSpot"],
  ["Xero", "Xero"],
  ["Sage", "Sage"],
];

// Plain envelope for tools the icon set has no path for (Outlook).
const MAIL = "M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2.4V17h16V7.4l-8 5.3-8-5.3ZM5.6 7 12 11.2 18.4 7H5.6Z";
// "Anything with an API": a pair of code brackets.
const API = "M8.7 6.3a1 1 0 0 1 0 1.4L4.4 12l4.3 4.3a1 1 0 1 1-1.4 1.4l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 0 1 1.4 0Zm6.6 0a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 1 1-1.4-1.4l4.3-4.3-4.3-4.3a1 1 0 0 1 0-1.4Z";
const INK = "#DCE5FF";

/** Tool nodes, with the monochrome simple-icons (CC0) paths the site already ships, tinted to brand. */
export const CHIPS: Chip[] = [
  ...NAMES.map(([name, short]) => {
    const t = TOOL_ICONS.find((x) => x.name === name);
    const color = t?.path && t.hex ? `#${t.hex}` : INK;
    // WooCommerce's mark is a wide wordmark: draw it larger, in a lighter tint of its purple so it reads on navy.
    return name === "WooCommerce"
      ? { label: name, short, path: t?.path ?? MAIL, color: "#B583D6", scale: 1.7 }
      : { label: name, short, path: t?.path ?? MAIL, color };
  }),
  { label: "Anything with an API", short: "Any API", path: API, color: "#8FB0FF" },
];

/** Rows in the small command-centre mockup. Illustration only, no numbers. */
export const APP_ROWS: { label: string; status: string }[] = [
  { label: "Live conversations", status: "Live" },
  { label: "Pipeline", status: "Moving" },
  { label: "Approvals", status: "Needs you" },
  { label: "Reports", status: "Ready" },
  { label: "Audit log", status: "Recorded" },
];
