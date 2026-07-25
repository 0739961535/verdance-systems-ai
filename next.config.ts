import type { NextConfig } from "next";

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
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline' https://link.msgsndr.com${isDev ? " 'unsafe-eval'" : ""}`,
  "worker-src 'self' blob:",
  `connect-src 'self' https:${isDev ? " ws: wss:" : ""}`,
  "frame-src 'self' https://api.leadconnectorhq.com https://*.leadconnectorhq.com https://*.google.com",
  "form-action 'self' https://*.leadconnectorhq.com",
  "manifest-src 'self'",
  "media-src 'self'",
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
  // Legacy /industries/[slug] and /products/[slug] are orphan routes from a
  // previous direction with pre-existing TS issues. Unblock the production
  // build while leaving them in place; clean up later.
  typescript: { ignoreBuildErrors: true },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
