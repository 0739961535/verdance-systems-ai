import Script from "next/script";
import { SITE } from "@/data/site";

/**
 * GHLBookingEmbed - the live GoHighLevel booking calendar.
 *
 * Rendered bare (no card, border or background) so it sits flush with no bubble
 * or padding around it. Sizing is deliberately defensive: GHL's resize helper
 * (link.msgsndr.com/js/form_embed.js) is loaded and will fit the iframe exactly
 * on browsers where it fires - but it proved unreliable in practice, so we also
 * give the iframe a sensible min-height (taller on mobile, where the calendar
 * stacks) and leave scrolling enabled. That way the widget is never cut off:
 * if it's taller than the min-height it simply scrolls inside the frame.
 *
 * CSP already allows the frame (*.leadconnectorhq.com) and the script
 * (link.msgsndr.com), so this needs no server config.
 */
const CALENDAR_ID = SITE.ghlBooking.split("/").filter(Boolean).pop() || "booking";

export function GHLBookingEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <iframe
        src={SITE.ghlBooking}
        title="Book a meeting"
        className="block w-full border-0 min-h-[740px] md:min-h-[660px]"
        id={`${CALENDAR_ID}_calendar`}
      />
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
