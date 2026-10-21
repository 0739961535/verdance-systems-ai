"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { OPEN_EVENT, readConsent, writeConsent, type Consent } from "@/lib/consent";

/**
 * The cookie choice: a small card fixed to the bottom of the screen (so it
 * never moves the page), shown after first paint, with Accept and Reject
 * given the same weight. Nothing for analytics or ads loads before Accept.
 */
export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const accept = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // after first paint and once the browser is idle, so it costs nothing at load
    const show = () => {
      if (readConsent() === null) setOpen(true);
    };
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const id = w.requestIdleCallback ? w.requestIdleCallback(show, { timeout: 2500 }) : window.setTimeout(show, 1200);
    const reopen = () => {
      setOpen(true);
      requestAnimationFrame(() => accept.current?.focus());
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => {
      window.removeEventListener(OPEN_EVENT, reopen);
      if (!w.requestIdleCallback) window.clearTimeout(id);
    };
  }, []);

  if (!open) return null;
  const choose = (c: Consent) => {
    writeConsent(c);
    setOpen(false);
  };
  return (
    <div className="ck" role="dialog" aria-modal="false" aria-labelledby="ck-title" aria-describedby="ck-text">
      <style>{CSS}</style>
      <p id="ck-title" className="ck-t">
        Cookies
      </p>
      <p id="ck-text" className="ck-p">
        We would like to use cookies to see which pages and adverts lead to a booked call. Only if you say yes.{" "}
        <Link href="/privacy#cookies">How we use them</Link>
      </p>
      <div className="ck-b">
        <button type="button" onClick={() => choose("denied")}>
          Reject
        </button>
        <button type="button" ref={accept} onClick={() => choose("granted")}>
          Accept
        </button>
      </div>
    </div>
  );
}

const CSS = `
.ck { position: fixed; z-index: 70; left: 12px; right: 12px; bottom: calc(12px + env(safe-area-inset-bottom)); max-width: 26rem; margin-left: auto;
  padding: 16px 16px 14px; border-radius: 18px; background: #0B1430; color: #EEF2FB; border: 1px solid rgba(143,176,255,0.3);
  box-shadow: 0 24px 60px -24px rgba(0,0,0,0.6); }
@media (max-width: 767px) { .ck { bottom: calc(92px + env(safe-area-inset-bottom)); } }
@media (min-width: 768px) { .ck { right: 24px; bottom: 24px; left: auto; } }
@media (prefers-reduced-motion: no-preference) { .ck { animation: ck-in .35s cubic-bezier(.2,.8,.2,1) both; } }
@keyframes ck-in { from { opacity: 0; transform: translate3d(0, 8px, 0); } to { opacity: 1; transform: none; } }
.ck-t { margin: 0; font-weight: 600; font-size: 1rem; }
.ck-p { margin: 4px 0 0; font-size: 0.9375rem; line-height: 1.5; color: #C9D2E6; }
.ck-p a { color: #BFD2FF; text-decoration: underline; text-underline-offset: 3px; }
.ck-b { margin-top: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.ck-b button { min-height: 44px; border-radius: 999px; font-weight: 600; font-size: 0.9375rem; cursor: pointer;
  color: #F2F5FC; background: rgba(255,255,255,0.06); border: 1px solid rgba(191,210,255,0.55); }
.ck-b button:hover { background: rgba(255,255,255,0.12); }
.ck-b button:focus-visible { outline: 2px solid #BFD2FF; outline-offset: 2px; }
`;
