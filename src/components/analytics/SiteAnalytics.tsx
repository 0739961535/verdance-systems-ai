"use client";

import { useEffect, useSyncExternalStore } from "react";
import { CONSENT_EVENT, readConsent, type Consent } from "@/lib/consent";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { MetaPixel } from "./MetaPixel";
import { GA4_ID, isBookingUrl, rememberUtms, track, withUtms } from "@/lib/analytics";

/**
 * SiteAnalytics - the Google tag plus one delegated click listener that turns
 * every existing call to action into a GA4 event, so the CTA components stay
 * server-rendered and need no handlers of their own:
 *
 *   /book links (booking page)      audit_click (and UTM passthrough)
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
function subscribeConsent(cb: () => void) {
  window.addEventListener(CONSENT_EVENT, cb);
  return () => window.removeEventListener(CONSENT_EVENT, cb);
}

export function SiteAnalytics() {
  const pathname = usePathname();
  // Google and Meta load only after the visitor accepts cookies (CookieBanner).
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => null);
  useEffect(() => {
    const on = (e: Event) => {
      if ((e as CustomEvent<Consent>).detail !== "denied") return;
      // withdrawn after accepting: tell the tags already on the page to stop
      const w = window as unknown as { dataLayer?: unknown[]; fbq?: (...a: unknown[]) => void };
      if (w.dataLayer) {
        const update = function (...args: unknown[]) {
          void args;
          // eslint-disable-next-line prefer-rest-params
          w.dataLayer!.push(arguments);
        };
        update("consent", "update", { ad_storage: "denied", analytics_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
      }
      w.fbq?.("consent", "revoke");
    };
    window.addEventListener(CONSENT_EVENT, on);
    return () => window.removeEventListener(CONSENT_EVENT, on);
  }, []);
  const ok = consent === "granted";

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
      {GA4_ID && ok ? (
        <>
          {/* The Google tag, loaded after the page is interactive. Written out here
              instead of @next/third-parties, whose bundle pulled a YouTube embed
              into every page. */}
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});gtag('consent','update',{ad_storage:'granted',analytics_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});gtag('js',new Date());gtag('config','${GA4_ID}');`}
          </Script>
        </>
      ) : null}
      {ok ? <MetaPixel /> : null}
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
