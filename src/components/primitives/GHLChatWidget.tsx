"use client";

/**
 * GHLChatWidget - the real Verdance chat widget (Conversation AI), served by
 * the CRM. Replaces the scripted Mia demo: conversations here get answered by
 * the live AI agent and tracked in the CRM inbox. Loaded after hydration so it
 * never blocks first paint.
 */

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Routes where the floating widget is suppressed - same reasoning as Mia: on
 * the form pages the qualifying form IS the conversion, and the fixed
 * bottom-right bubble physically overlaps the form's submit control.
 */
const HIDE_ON = ["/contact", "/apply"];

const WIDGET_ID = "6a7337fa97ea74e60aff69a1";

export function GHLChatWidget() {
  const pathname = usePathname();
  const hidden =
    !!pathname && HIDE_ON.some((p) => pathname === p || pathname.startsWith(p + "/"));

  // On mobile the sticky CTA bar occupies the bottom 64px+, and the widget's
  // bubble parks at bottom: 20px as an inline style inside its shadow root -
  // exactly on top of the bar's WhatsApp button. Stylesheet overrides don't
  // reach it reliably, so lift it with inline !important styles once the
  // shadow elements exist, and re-assert on resize.
  useEffect(() => {
    const LIFT_BELOW = 768;

    const apply = () => {
      const root = document.querySelector("chat-widget")?.shadowRoot;
      if (!root) return false;
      const els = root.querySelectorAll<HTMLElement>(".lc_text-widget, .lc_text-widget--bubble");
      if (!els.length) return false;
      els.forEach((el) => {
        if (window.innerWidth < LIFT_BELOW) {
          el.style.setProperty("bottom", "88px", "important");
        } else {
          el.style.removeProperty("bottom");
        }
      });
      return true;
    };

    // The widget loads asynchronously after hydration - poll gently until its
    // shadow DOM exists, then stop.
    const poll = setInterval(() => {
      if (apply()) clearInterval(poll);
    }, 500);
    window.addEventListener("resize", apply);
    return () => {
      clearInterval(poll);
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
