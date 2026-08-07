import Script from "next/script";
import { SITE } from "@/data/site";

/**
 * GHLBookingEmbed - embeds the live GoHighLevel booking calendar (the same
 * calendar behind SITE.ghlBooking) as an iframe. The official
 * link.msgsndr.com/js/form_embed.js helper listens for the widget's postMessage
 * and auto-resizes the iframe to its content, so there is no inner scrollbar.
 *
 * Unlike the API-backed BookingCard, this needs no server env vars - it works
 * from the public widget URL alone. The site CSP already allows the frame
 * (*.leadconnectorhq.com) and the resize script (link.msgsndr.com).
 *
 * Calendar look-and-feel (colours, fonts) is controlled inside GoHighLevel's
 * calendar settings, not here.
 */
export function GHLBookingEmbed({ className = "" }: { className?: string }) {
  return (
    <div
      className={`surface relative overflow-hidden ${className}`}
      style={{ borderRadius: 20, border: "1px solid var(--hairline-2)", background: "var(--bg-3)" }}
    >
      <iframe
        src={SITE.ghlBooking}
        title="Book a meeting"
        loading="lazy"
        scrolling="no"
        style={{ width: "100%", minHeight: 720, border: "none", display: "block" }}
        id="vsai-booking-calendar"
      />
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
