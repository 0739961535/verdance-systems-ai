"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";
import { MetaPixel } from "./MetaPixel";
import { GA4_ID, isBookingUrl, rememberUtms, track, withUtms } from "@/lib/analytics";

/**
 * SiteAnalytics - the Google tag plus one delegated click listener that turns
 * every existing call to action into a GA4 event, so the CTA components stay
 * server-rendered and need no handlers of their own:
 *
 *   book.verdancesystemsai.com links  audit_click (and UTM passthrough)
 *   wa.me links                       whatsapp_click
 *   tel: links                        phone_click
 *   mailto: links                     email_click
 *   the chat bubble                   chat_opened
 *
 * cta_location comes from the nearest [data-cta-location], else the nav or
 * footer, else the nearest section id, else "page".
 *
 * The same events go to the Meta Pixel (see META_EVENTS in lib/analytics).
 * Without NEXT_PUBLIC_GA4_ID / NEXT_PUBLIC_META_PIXEL_ID that tag does not load
 * and no event is sent to it. UTM
 * passthrough to the booking site works either way.
 */
export function SiteAnalytics() {
  const pathname = usePathname();

  // Keep the landing UTM tags for the session.
  useEffect(() => {
    rememberUtms(window.location.search);
  }, [pathname]);

  useEffect(() => {
    let lastChat = 0;

    const onClick = (e: MouseEvent) => {
      // The chat widget lives in a shadow root; composedPath sees inside it.
      const path = e.composedPath() as Element[];
      if (path.some((el) => el instanceof Element && el.tagName === "CHAT-WIDGET")) {
        const onBubble = path.some(
          (el) => el instanceof Element && /\blc_text-widget(--bubble)?\b/.test(el.getAttribute?.("class") ?? ""),
        );
        // The bubble toggles the chat; count an open at most once in 5 s.
        if (onBubble && Date.now() - lastChat > 5000) {
          lastChat = Date.now();
          track("chat_opened");
        }
        return;
      }

      const target = e.target instanceof Element ? e.target : null;
      const a = target?.closest<HTMLAnchorElement>("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const where = ctaLocation(a);

      if (isBookingUrl(href)) {
        // Add UTMs before the browser follows the link.
        a.href = withUtms(href);
        track("audit_click", { cta_location: where });
      } else if (href.startsWith("https://wa.me/") || href.startsWith("https://api.whatsapp.com/")) {
        track("whatsapp_click", { cta_location: where });
      } else if (href.startsWith("tel:")) {
        track("phone_click", { cta_location: where });
      } else if (href.startsWith("mailto:")) {
        track("email_click", { cta_location: where });
      }
    };

    // Capture phase so the href is rewritten before navigation, and auxclick
    // for middle-click "open in new tab".
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);

  return (
    <>
      {GA4_ID ? <GoogleAnalytics gaId={GA4_ID} /> : null}
      <MetaPixel />
    </>
  );
}

function ctaLocation(el: Element): string {
  const tagged = el.closest<HTMLElement>("[data-cta-location]");
  if (tagged?.dataset.ctaLocation) return tagged.dataset.ctaLocation;
  if (el.closest("footer")) return "footer";
  if (el.closest("header, nav")) return "nav";
  const section = el.closest<HTMLElement>("section[id], [id][aria-labelledby]");
  if (section?.id) return section.id;
  return "page";
}
