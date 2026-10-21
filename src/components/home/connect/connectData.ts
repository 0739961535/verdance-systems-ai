export type ConnectStep = { n: string; title: string; tech: string; gloss: string };

/** The four steps. Copy agreed with Daniel; keep it word for word. */
export const STEPS: ConnectStep[] = [
  {
    n: "01",
    title: "Map your tools",
    tech: "We list what you use: WhatsApp, email, diary, store, accounts and your customer list (CRM).",
    gloss: "Audit: CRM, WhatsApp Business, email, calendar, e-commerce, accounting.",
  },
  {
    n: "02",
    title: "Connect them safely",
    tech: "We link your apps (through APIs: the way apps talk to each other). Each one gets only the access it needs.",
    gloss: "APIs and webhooks, OAuth sign-in, least-privilege access.",
  },
  {
    n: "03",
    title: "Teach it your business",
    tech: "It learns your prices, rules and tone. When it is unsure, it hands over to a person.",
    gloss: "Retrieval over your own knowledge, routing rules, human approval.",
  },
  {
    n: "04",
    title: "Run it from one app",
    tech: "Chats, approvals and reports in one place, on your phone.",
    gloss: "Command centre: conversations, pipeline, approvals, reports, audit log.",
  },
];

/** A tool at the root of the tree. `mark` is its symbol in /tools.svg; `path` an inline mark when the sprite has none. */
export type Chip = { label: string; short: string; color: string; does: string; mark?: string; path?: string; scale?: number };

// Plain envelope for tools the icon set has no mark for (Outlook).
const MAIL = "M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2.4V17h16V7.4l-8 5.3-8-5.3ZM5.6 7 12 11.2 18.4 7H5.6Z";
// "Anything with an API": a pair of code brackets.
const API = "M8.7 6.3a1 1 0 0 1 0 1.4L4.4 12l4.3 4.3a1 1 0 1 1-1.4 1.4l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 0 1 1.4 0Zm6.6 0a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 1 1-1.4-1.4l4.3-4.3-4.3-4.3a1 1 0 0 1 0-1.4Z";

/** The roots: real tool marks (simple-icons, CC0) tinted to brand, each with one plain line of what it sends up. */
export const CHIPS: Chip[] = [
  { label: "WhatsApp", short: "WhatsApp", mark: "tm-whatsapp", color: "#25D366", does: "Customer chats come in here." },
  { label: "Gmail", short: "Gmail", mark: "tm-gmail", color: "#EA4335", does: "Customer emails come in here." },
  { label: "Outlook", short: "Outlook", path: MAIL, color: "#DCE5FF", does: "Work emails come in here too." },
  { label: "Google Calendar", short: "Calendar", mark: "tm-google-calendar", color: "#4285F4", does: "Bookings go straight into your diary." },
  { label: "Shopify", short: "Shopify", mark: "tm-shopify", color: "#7AB55C", does: "Order questions get answered from your store." },
  { label: "WooCommerce", short: "Woo", mark: "tm-woocommerce", color: "#B583D6", does: "Order questions get answered from your shop.", scale: 1.6 },
  { label: "HubSpot", short: "HubSpot", mark: "tm-hubspot", color: "#FF7A59", does: "Every customer is saved in your customer list." },
  { label: "Xero", short: "Xero", mark: "tm-xero", color: "#13B5EA", does: "Invoices and payments get checked here." },
  { label: "Sage", short: "Sage", mark: "tm-sage", color: "#00D639", does: "Your accounts stay up to date." },
  { label: "Anything with an API", short: "Any app", path: API, color: "#8FB0FF", does: "Most other apps can join in too." },
];

/** Rows in the small command-centre card at the heart of the bloom. Illustration only, no numbers. */
export const APP_ROWS: { label: string; status: string; hot?: boolean }[] = [
  { label: "Live chats", status: "Live" },
  { label: "Approvals", status: "Needs you", hot: true },
  { label: "Reports", status: "Ready" },
];
