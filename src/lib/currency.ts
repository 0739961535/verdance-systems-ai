"use client";

import { useSyncExternalStore } from "react";

/**
 * Currency for money figures on the site: rand in South Africa, pounds in the
 * UK, dollars everywhere else. Guessed from the visitor's time zone (no
 * network, works on static pages), changeable with the R / £ / $ switch, and
 * remembered in this browser. Every calculator on a page shares one value.
 * Prices never appear on the site; this is only for the visitor's own sums.
 */

export type CurrencyCode = "ZAR" | "GBP" | "USD";

// priceLevel turns a typical South African amount into a typical local one
// (a R40 000 wedding booking is about £4 000 in the UK, not the £1 700 the
// exchange rate gives). Only used for starting values and slider ranges;
// the visitor's own numbers are never converted.
export const CURRENCY: Record<CurrencyCode, { symbol: string; locale: string; label: string; word: string; priceLevel: number }> = {
  ZAR: { symbol: "R", locale: "en-ZA", label: "Rand", word: "rand", priceLevel: 1 },
  GBP: { symbol: "£", locale: "en-GB", label: "Pounds", word: "pounds", priceLevel: 1 / 10 },
  USD: { symbol: "$", locale: "en-US", label: "Dollars", word: "dollars", priceLevel: 1 / 8 },
};
export const CODES = Object.keys(CURRENCY) as CurrencyCode[];

const KEY = "vs-currency";
const EVENT = "vs-currency-change";

export function guessCurrency(): CurrencyCode {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    if (tz === "Africa/Johannesburg" || tz === "Africa/Maseru" || tz === "Africa/Mbabane") return "ZAR";
    if (/^Europe\/(London|Belfast|Guernsey|Jersey|Isle_of_Man)$/.test(tz)) return "GBP";
    const lang = navigator.language ?? "";
    if (/-ZA$/i.test(lang)) return "ZAR";
    if (/-GB$/i.test(lang)) return "GBP";
  } catch {
    // Fall through to dollars.
  }
  return "USD";
}

function read(): CurrencyCode {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved && saved in CURRENCY) return saved as CurrencyCode;
  } catch {
    // Storage blocked: guess every time.
  }
  return guessCurrency();
}

export function setCurrency(code: CurrencyCode) {
  try {
    localStorage.setItem(KEY, code);
  } catch {
    // Not remembered, still switched for this page.
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

/** The visitor's currency. Rand on the server and the first paint. */
export function useCurrency(): CurrencyCode {
  return useSyncExternalStore(subscribe, read, () => "ZAR");
}

/** "R12 600", "£1.2 million", "$540". */
export function formatMoney(n: number, code: CurrencyCode): string {
  const { symbol, locale } = CURRENCY[code];
  const v = Math.max(0, n);
  if (v >= 1_000_000) {
    const m = v / 1_000_000;
    return `${symbol}${m >= 10 ? Math.round(m).toString() : m.toFixed(1).replace(/\.0$/, "")} million`;
  }
  const s = Math.round(v).toLocaleString(locale);
  return `${symbol}${code === "ZAR" ? s.replace(/[,  ]/g, " ") : s}`;
}

/** A typical rand amount as a sensible, round local figure (defaults and slider ranges). */
export function localAmount(rand: number, code: CurrencyCode): number {
  if (code === "ZAR") return rand;
  const v = rand * CURRENCY[code].priceLevel;
  if (v <= 0) return 0;
  const mag = 10 ** Math.max(0, Math.floor(Math.log10(v)) - 1);
  return Math.max(1, Math.round(v / mag) * mag);
}
