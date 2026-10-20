/**
 * GA4 events for verdancesystemsai.com.
 *
 * The names and parameters mirror Ashford's apps/command-centre/src/lib/
 * analytics/events.ts (the single source of truth, from the SEO plan section
 * 8.1). Change a name there and here together, never one side alone: GA4
 * history stays under the old name.
 *
 * Everything here is a no-op until NEXT_PUBLIC_GA4_ID (Google) or
 * NEXT_PUBLIC_META_PIXEL_ID (Meta) is set, so the site can ship with tracking
 * wired but dormant. track() is the one place conversions fire; it mirrors the
 * events in META_EVENTS to the Meta Pixel.
 */
import { sendGAEvent } from "@next/third-parties/google";
import { BOOK_BASE } from "@/data/booking";

export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";

/** Meta Pixel (dataset) ID. Digits only; empty means the pixel never loads. */
export const META_PIXEL_ID = (process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "").replace(/\D/g, "");

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const WEB_EVENTS = {
  audit_booked: ["niche", "booking_page"],
  audit_click: ["cta_location", "page_type", "niche"],
  try_call_requested: ["niche", "page_type"],
  try_call_connected: ["call_seconds"],
  form_submitted: ["form_id", "niche"],
  whatsapp_click: ["cta_location", "page_type"],
  phone_click: ["cta_location"],
  email_click: ["cta_location"],
  calculator_completed: ["niche", "currency"],
  lead_test_started: ["channel"],
  lead_test_completed: ["channel", "reply_seconds"],
  chat_opened: [],
} as const satisfies Record<string, readonly string[]>;

export type WebEvent = keyof typeof WEB_EVENTS;

/**
 * Which site events Meta also sees, mirrored from track() so there is one
 * place that fires conversions. Standard events where one fits.
 */
const META_EVENTS: Partial<Record<WebEvent, ["track" | "trackCustom", string]>> = {
  audit_click: ["trackCustom", "AuditClick"],
  whatsapp_click: ["track", "Contact"],
  phone_click: ["track", "Contact"],
  email_click: ["track", "Contact"],
  form_submitted: ["track", "Lead"],
  audit_booked: ["track", "Schedule"],
};

/**
 * Event-scoped custom dimensions. Register each one in GA4 Admin (Custom
 * definitions, scope Event, same parameter name) so reports and the Ashford
 * /analytics page can read them.
 */
export const CUSTOM_DIMENSIONS = ["niche", "cta_location", "page_type", "form_id", "booking_page"] as const;

type ParamName = (typeof WEB_EVENTS)[WebEvent][number];
export type EventParams<E extends WebEvent> = Partial<Record<(typeof WEB_EVENTS)[E][number], string | number>>;

/** What kind of page a path is, for the page_type dimension. */
export function pageType(pathname: string): string {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/") return "home";
  const [first, second] = p.split("/").filter(Boolean);
  switch (first) {
    case "services":
      return second ? "service" : "services";
    case "industries":
      return second ? "industry" : "industries";
    case "ai-agency":
      return second ? "location" : "locations";
    case "how-it-works":
      return second ? "process_step" : "process";
    case "missed-call-calculator":
      return "calculator";
    case "privacy":
    case "terms":
      return "legal";
    default:
      return first;
  }
}

/** The niche or industry slug from /industries/<slug>, else undefined. */
export function nicheFromPath(pathname: string): string | undefined {
  const m = pathname.match(/^\/industries\/([^/?#]+)/);
  return m?.[1];
}

/**
 * Fire one GA4 event. Unknown parameters are dropped so a typo can never
 * create a stray dimension. Adds page_type and niche from the current URL
 * when the event takes them and the caller did not set them.
 */
export function track<E extends WebEvent>(event: E, params: EventParams<E> = {}): void {
  if (typeof window === "undefined") return;
  const meta = META_EVENTS[event];
  if (META_PIXEL_ID && meta) window.fbq?.(meta[0], meta[1]);
  if (!GA4_ID) return;
  const allowed = WEB_EVENTS[event] as readonly ParamName[];
  const path = window.location.pathname;
  const auto: Partial<Record<ParamName, string>> = {
    page_type: pageType(path),
    niche: nicheFromPath(path),
  };
  const out: Record<string, string | number> = {};
  for (const key of allowed) {
    const value = (params as Record<string, string | number | undefined>)[key] ?? auto[key];
    if (value !== undefined && value !== "") out[key] = value;
  }
  sendGAEvent("event", event, out);
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const UTM_STORE = "verdance_utm";

/**
 * Remember the UTM tags a visitor landed with for the rest of the session, so
 * they still reach the booking page after the visitor has clicked around.
 */
export function rememberUtms(search: string): void {
  const url = new URLSearchParams(search);
  const found: Record<string, string> = {};
  for (const k of UTM_KEYS) {
    const v = url.get(k);
    if (v) found[k] = v;
  }
  if (!Object.keys(found).length) return;
  try {
    sessionStorage.setItem(UTM_STORE, JSON.stringify(found));
  } catch {
    // Storage blocked: the current URL still carries them for this page.
  }
}

function storedUtms(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_STORE) || "{}") as Record<string, string>;
  } catch {
    return {};
  }
}

/** True for links to the booking page (/book, /book?for=..., /book/...), or the old booking site. */
export function isBookingUrl(href: string): boolean {
  if (href.startsWith("https://book.verdancesystemsai.com")) return true;
  let path = href;
  if (/^https?:\/\//.test(href)) {
    try {
      const u = new URL(href);
      if (typeof window !== "undefined" && u.origin !== window.location.origin) return false;
      path = u.pathname;
    } catch {
      return false;
    }
  }
  return path === BOOK_BASE || /^\/book[/?#]/.test(path);
}

/**
 * The same booking link with the visitor's UTM tags added. Tags already on
 * the link win, so a deliberately tagged link is never overwritten.
 */
export function withUtms(href: string): string {
  if (!isBookingUrl(href)) return href;
  const tags = { ...storedUtms() };
  const current = new URLSearchParams(window.location.search);
  for (const k of UTM_KEYS) {
    const v = current.get(k);
    if (v) tags[k] = v;
  }
  if (!Object.keys(tags).length) return href;
  const url = new URL(href, window.location.href);
  for (const [k, v] of Object.entries(tags)) {
    if (!url.searchParams.has(k)) url.searchParams.set(k, v);
  }
  // keep same-site links relative
  return url.origin === window.location.origin ? url.pathname + url.search + url.hash : url.toString();
}
