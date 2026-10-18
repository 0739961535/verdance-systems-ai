import type { NextConfig } from "next";
import { LOCATION_REDIRECTS } from "./src/data/locations";

const isDev = process.env.NODE_ENV !== "production";
// LOCAL_HTTP=1 → viewing the production build over plain http (localhost / LAN
// IP / a temporary tunnel) for QA on a phone. Drops the HTTPS-only hardening
// (`upgrade-insecure-requests` + HSTS) that would otherwise rewrite every asset
// URL to https:// and break styling on a non-localhost http origin. NEVER set
// this on the real HTTPS deploy - the hardening must stay on there.
const localHttp = process.env.LOCAL_HTTP === "1";

// Content-Security-Policy. Kept strict where it doesn't break the site:
// - 'unsafe-inline' is required for the pre-paint theme script and inline styles.
// - 'unsafe-eval' + ws: are dev-only (Turbopack HMR).
// - frame-src allows the GoHighLevel booking widget embedded on /contact.
// - script-src allows link.msgsndr.com/js/form_embed.js, the official
//   LeadConnector helper that auto-resizes the booking iframe to fit its
//   content (otherwise the widget clips or shows an internal scrollbar).
// - *.leadconnectorhq.com (script/style/font/media) + fonts.bunny.net (style/
//   font) are the sitewide chat widget (Conversation AI) loaded by
//   GHLChatWidget: it chains resources off widgets./stcdn./services. subdomains.
// - Google tag (GA4): googletagmanager.com loads gtag.js, which sends hits to
//   google-analytics.com and its regional *.google-analytics.com hosts and
//   *.analytics.google.com. Google Ads conversion hosts are listed now so the
//   Ads tag works the day it is added. Nothing loads unless NEXT_PUBLIC_GA4_ID
//   is set (see src/components/analytics/SiteAnalytics.tsx).
const googleTag = [
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
  "https://*.google-analytics.com",
  "https://*.analytics.google.com",
  "https://www.googleadservices.com",
  "https://googleads.g.doubleclick.net",
].join(" ");
// - Meta Pixel: connect.facebook.net serves fbevents.js; hits go to
//   www.facebook.com/tr (as an image or a fetch). img-src already allows
//   https:. Nothing loads unless NEXT_PUBLIC_META_PIXEL_ID is set (see
//   src/components/analytics/MetaPixel.tsx).
const metaPixel = ["https://connect.facebook.net", "https://www.facebook.com"].join(" ");
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://*.leadconnectorhq.com https://fonts.bunny.net",
  "style-src 'self' 'unsafe-inline' https://*.leadconnectorhq.com https://fonts.bunny.net",
  `script-src 'self' 'unsafe-inline' https://link.msgsndr.com https://*.leadconnectorhq.com ${googleTag} ${metaPixel}${isDev ? " 'unsafe-eval'" : ""}`,
  "worker-src 'self' blob:",
  `connect-src 'self' https: ${googleTag} ${metaPixel}${isDev ? " ws: wss:" : ""}`,
  "frame-src 'self' https://api.leadconnectorhq.com https://*.leadconnectorhq.com https://*.google.com",
  "form-action 'self' https://*.leadconnectorhq.com",
  "manifest-src 'self'",
  "media-src 'self' https://*.leadconnectorhq.com",
  ...(isDev || localHttp ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  ...(localHttp
    ? []
    : [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]),
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Legacy pages replaced by newer ones (round 4). Permanent redirects keep
  // any old links and search results working.
  async redirects() {
    const productToService: Record<string, string> = {
      "smart-website": "websites-build",
      "website-conversion-widget": "conversation-ai",
      "whatsapp-ai-agent": "conversation-ai",
      "voice-ai-agent": "voice-ai",
      "ai-receptionist": "voice-ai",
      "lead-reactivation": "lead-generation",
      "smart-scheduler": "booking-calendar",
      "automated-follow-up": "follow-up-nurture",
      "post-interaction-messenger": "follow-up-nurture",
      "google-review-automation": "reputation-reviews",
      "crm-and-pipeline": "crm-pipeline",
      "client-intake-automation": "custom-builds",
    };
    return [
      ...Object.entries(productToService).map(([from, to]) => ({
        source: `/products/${from}`,
        destination: `/services/${to}`,
        permanent: true,
      })),
      { source: "/products/:slug*", destination: "/services", permanent: true },
      { source: "/products", destination: "/services", permanent: true },
      { source: "/packages", destination: "/services", permanent: true },
      { source: "/portfolio", destination: "/#proof", permanent: true },
      // City pages folded from 18 to 4 (SEO plan, fix 6): each retired page
      // points at the closest kept city, or the /ai-agency index.
      ...Object.entries(LOCATION_REDIRECTS).map(([from, to]) => ({
        source: `/ai-agency/${from}`,
        destination: to,
        statusCode: 301 as const,
      })),
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
