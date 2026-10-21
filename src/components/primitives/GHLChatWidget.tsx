"use client";

/**
 * GHLChatWidget - the real Verdance chat widget (Conversation AI), served by
 * the CRM. Loaded after hydration so it never blocks first paint.
 */

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { CONSENT_EVENT, readConsent } from "@/lib/consent";

/**
 * Routes where the floating widget is suppressed: on the form pages the
 * qualifying form IS the conversion, and the fixed bottom-right bubble
 * physically overlaps the form's submit control.
 */
const HIDE_ON = ["/book", "/apply"];

const WIDGET_ID = "6a7337fa97ea74e60aff69a1";

/**
 * The widget opens with a greeting bubble that sits over the hero's main
 * button on phones. So the loader only runs after LOAD_AFTER_MS, or sooner
 * once the visitor scrolls past the hero (they have seen it and are reading
 * on). Daniel approved the 20-second delay, Oct 2026.
 *
 * On the home page the pinned rocket flight (.fl) follows the hero. The
 * widget's script costs 50 to 200ms of main thread as it boots and its
 * bubble covers the flight's words, so while the flight is on screen the
 * load waits, and it happens as soon as the visitor scrolls out of it.
 */
const LOAD_AFTER_MS = 20_000;

function inFlight() {
  const fl = document.querySelector(".fl");
  if (!fl) return false;
  const r = fl.getBoundingClientRect();
  return r.top < window.innerHeight && r.bottom > 0;
}

function useDeferredLoad() {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (load) return;
    // phones: no chat bubble at all; the sticky bar carries WhatsApp
    // (design re-review, Oct 2026). Not even downloaded.
    if (window.innerWidth < 768) return;
    let due = false;
    const go = () => {
      due = true;
      if (!inFlight()) setLoad(true);
    };
    const timer = window.setTimeout(go, LOAD_AFTER_MS);
    const onScroll = () => {
      const fl = document.querySelector(".fl");
      const hero = document.querySelector("main section, section");
      const past = fl
        ? fl.getBoundingClientRect().bottom < window.innerHeight * 0.25
        : hero
          ? hero.getBoundingClientRect().bottom < window.innerHeight * 0.25
          : window.scrollY > 600;
      if (past || (due && !inFlight())) go();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [load]);
  return load;
}

/**
 * The bubble only shows once the visitor is past half the page (and never
 * over the film; see html[data-in-flight] in globals.css). Sets
 * html[data-chat-ok], which the CSS reads.
 */
function useChatAfterHalfway() {
  useEffect(() => {
    const html = document.documentElement;
    const check = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      // after the hero: once the page's first section has mostly scrolled away
      const first = document.querySelector("main section");
      const pastHero = first ? first.getBoundingClientRect().bottom < window.innerHeight * 0.5 : window.scrollY > window.innerHeight;
      html.toggleAttribute("data-chat-ok", max <= 0 || pastHero);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      html.removeAttribute("data-chat-ok");
    };
  }, []);
}

function subscribeConsent(cb: () => void) {
  window.addEventListener(CONSENT_EVENT, cb);
  return () => window.removeEventListener(CONSENT_EVENT, cb);
}

/** Open the real widget once its script has booted (it exposes a small API). */
function openWhenReady() {
  const started = Date.now();
  const t = window.setInterval(() => {
    const api = (window as unknown as { leadConnector?: { chatWidget?: { openWidget?: () => void } } }).leadConnector?.chatWidget;
    // the widget's own launcher, once it has rendered
    const launcher = document.querySelector("chat-widget")?.shadowRoot?.querySelector<HTMLElement>(".lc_text-widget--bubble, .lc_text-widget, [class*='bubble']");
    if (api?.openWidget) {
      api.openWidget();
      window.clearInterval(t);
    } else if (launcher) {
      launcher.click();
      window.clearInterval(t);
    } else if (Date.now() - started > 15_000) window.clearInterval(t);
  }, 250);
}

/**
 * The chat is a third-party widget that sets its own storage. It does not
 * load until the visitor asks for it (taps the look-alike button below) or
 * has accepted cookies, which keeps UK visitors inside PECR and keeps its
 * script off the first load.
 */
export function GHLChatWidget() {
  useChatAfterHalfway();
  const pathname = usePathname();
  const deferred = useDeferredLoad();
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => null);
  const [asked, setAsked] = useState(false);
  const load = asked || (deferred && consent === "granted");
  const hidden =
    !!pathname && HIDE_ON.some((p) => pathname === p || pathname.startsWith(p + "/"));

  /**
   * On mobile the sticky CTA bar occupies the bottom 64px+, and the widget's
   * bubble parks at bottom: 20px as an inline style inside its shadow root,
   * directly on top of the bar's WhatsApp button. So it needs lifting there.
   *
   * How this is done matters. The previous version called
   * `el.style.removeProperty("bottom")` on desktop, which deleted the
   * widget's own inline `bottom: 20px`. A position: fixed element with
   * `bottom: auto` falls back to its static position in document flow, so the
   * bubble appeared near the top of the page and scrolled away with the
   * content instead of staying pinned. That is the bug this replaces.
   *
   * The fix is strictly additive: a stylesheet injected into the shadow root
   * plus a class we toggle. An `!important` declaration in an author
   * stylesheet outranks a normal inline declaration, so the lift wins on
   * mobile, and removing the class hands positioning straight back to the
   * widget on desktop without ever destroying its own styles.
   *
   * A stylesheet in the *main document* genuinely cannot pierce a shadow
   * root, which is what the old comment was about. One appended inside it
   * can.
   */
  useEffect(() => {
    if (!load) return;
    const LIFT_BELOW = 768;
    const STYLE_ID = "verdance-widget-lift";
    const LIFTED = "verdance-lifted";
    const GIVE_UP_AFTER = 20_000;

    let observer: MutationObserver | null = null;
    let poll: ReturnType<typeof setInterval> | null = null;
    let giveUp: ReturnType<typeof setTimeout> | null = null;

    const stopPolling = () => {
      if (poll) { clearInterval(poll); poll = null; }
      if (giveUp) { clearTimeout(giveUp); giveUp = null; }
    };

    const apply = () => {
      const root = document.querySelector("chat-widget")?.shadowRoot;
      if (!root) return false;

      const els = root.querySelectorAll<HTMLElement>(
        ".lc_text-widget, .lc_text-widget--bubble"
      );
      if (!els.length) return false;

      if (!root.querySelector(`#${STYLE_ID}`)) {
        const style = document.createElement("style");
        style.id = STYLE_ID;
        // no "Have a question?" greeting card that opens by itself, on any
        // device: it sits over the page's content. The bubble itself stays.
        style.textContent = `.${LIFTED}{bottom:88px !important;}.lc_text-widget--prompt{display:none !important;}`;
        root.appendChild(style);
      }

      const lift = window.innerWidth < LIFT_BELOW;
      els.forEach((el) => el.classList.toggle(LIFTED, lift));
      return true;
    };

    /**
     * Third-party widgets re-render their own nodes (opening, closing, lazy
     * mounting), which drops any class we set. Watch the shadow root and
     * re-assert. Toggling to a value a node already has is a no-op, so this
     * cannot loop against its own mutations.
     */
    const watch = () => {
      const root = document.querySelector("chat-widget")?.shadowRoot;
      if (!root || observer) return;
      observer = new MutationObserver(() => apply());
      observer.observe(root, { childList: true, subtree: true });
    };

    if (apply()) {
      watch();
    } else {
      poll = setInterval(() => {
        if (apply()) {
          watch();
          stopPolling();
        }
      }, 400);
      // The widget may be blocked or fail to load. Stop rather than poll
      // for the life of the page.
      giveUp = setTimeout(stopPolling, GIVE_UP_AFTER);
    }

    window.addEventListener("resize", apply);
    return () => {
      stopPolling();
      observer?.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, [load]);

  return (
    <>
      {/* The loader injects a <chat-widget> custom element; toggling it with
          CSS (rather than unmounting the script) survives client-side route
          changes in both directions. */}
      {hidden && <style>{`chat-widget{display:none !important;}`}</style>}
      {!load && !hidden && (
        <button
          type="button"
          className="chat-fake"
          aria-label="Open chat"
          onClick={() => {
            setAsked(true);
            openWhenReady();
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.2 3.6c-.5.4-1.3.1-1.3-.6V16A2.5 2.5 0 0 1 4 13.5v-8Z" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          <style>{FAKE_CSS}</style>
        </button>
      )}
      {load && (
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id={WIDGET_ID}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}

/** A light stand-in for the widget's bubble, same place and size; desktop only, like the real one. Shows after the hero. */
const FAKE_CSS = `
.chat-fake { position: fixed; right: 20px; bottom: 20px; z-index: 60; width: 56px; height: 56px; border-radius: 999px; display: grid; place-items: center;
  background: #2554D4; border: 0; cursor: pointer; box-shadow: 0 12px 30px -10px rgba(37,84,212,0.7); transition: transform .25s cubic-bezier(.2,.8,.2,1), opacity .3s; }
.chat-fake:hover { transform: translate3d(0,-2px,0); }
.chat-fake:focus-visible { outline: 2px solid #BFD2FF; outline-offset: 3px; }
@media (max-width: 767px) { .chat-fake { display: none; } }
html:not([data-chat-ok]) .chat-fake, html[data-in-flight] .chat-fake, html[data-consent-open] .chat-fake { opacity: 0; visibility: hidden; pointer-events: none; }
`;
