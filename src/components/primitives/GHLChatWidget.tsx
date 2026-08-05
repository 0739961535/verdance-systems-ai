"use client";

/**
 * GHLChatWidget - the real Verdance chat widget (Conversation AI), served by
 * the CRM. Replaces the scripted Mia demo: conversations here get answered by
 * the live AI agent and tracked in the CRM inbox. Loaded after hydration so it
 * never blocks first paint.
 */

import Script from "next/script";
import { usePathname } from "next/navigation";

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
