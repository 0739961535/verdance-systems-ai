"use client";

/**
 * GHLChatWidget - the real Verdance chat widget (Conversation AI), served by
 * the CRM. Loaded after hydration so it never blocks first paint.
 */

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Routes where the floating widget is suppressed: on the form pages the
 * qualifying form IS the conversion, and the fixed bottom-right bubble
 * physically overlaps the form's submit control.
 */
const HIDE_ON = ["/contact", "/apply"];

const WIDGET_ID = "6a7337fa97ea74e60aff69a1";

export function GHLChatWidget() {
  const pathname = usePathname();
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
        style.textContent = `.${LIFTED}{bottom:88px !important;}`;
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
  }, []);

  return (
    <>
      {/* The loader injects a <chat-widget> custom element; toggling it with
          CSS (rather than unmounting the script) survives client-side route
          changes in both directions. */}
      {hidden && <style>{`chat-widget{display:none !important;}`}</style>}
      <Script
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id={WIDGET_ID}
        strategy="afterInteractive"
      />
    </>
  );
}
