/**
 * Cookie consent for analytics and advertising (Google tag, Meta Pixel).
 * Nothing that sets those cookies loads until the visitor accepts. The choice
 * is kept in this browser; "Cookie settings" in the footer reopens it.
 * Vercel Analytics is cookieless and is not covered here.
 */
export type Consent = "granted" | "denied";
const KEY = "vsa_consent_v1";
export const CONSENT_EVENT = "vsa:consent";
export const OPEN_EVENT = "vsa:consent-open";

export function readConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(c: Consent) {
  try {
    window.localStorage.setItem(KEY, c);
  } catch {
    /* private mode: the choice lasts for this page view */
  }
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: c }));
}

export function openConsent() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}
