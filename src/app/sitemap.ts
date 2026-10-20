import type { MetadataRoute } from "next";
import { SERVICE_CATEGORIES } from "@/data/services";
import { industries } from "@/data/industries";
import { NICHES } from "@/data/niches";
import { LOCATIONS } from "@/data/locations";
import { SITE_URL } from "@/data/site";

type Freq = MetadataRoute.Sitemap[number]["changeFrequency"];

/**
 * The date each page's content last really changed (YYYY-MM-DD). A build date
 * on every URL tells Google nothing, so these are set by hand: when you change
 * what a page says, bump its date here in the same commit.
 */
const UPDATED = {
  // The redesign (PR 11) and the SEO fixes landed on these on 17 Oct 2026.
  site: "2026-10-17",
  about: "2026-10-17",
  contact: "2026-10-08",
  calculator: "2026-09-13",
  privacy: "2026-10-17",
  terms: "2026-07-25",
} as const;

type Route = { path: string; priority: number; freq: Freq; updated: string };

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: Route[] = [
    { path: "", priority: 1.0, freq: "weekly", updated: UPDATED.site },
    { path: "/services", priority: 0.9, freq: "monthly", updated: UPDATED.site },
    { path: "/services/ai-operations-system", priority: 0.9, freq: "monthly", updated: UPDATED.site },
    { path: "/audit", priority: 0.9, freq: "monthly", updated: UPDATED.site },
    { path: "/about", priority: 0.8, freq: "monthly", updated: UPDATED.about },
    { path: "/industries", priority: 0.8, freq: "monthly", updated: UPDATED.site },
    { path: "/how-it-works", priority: 0.8, freq: "monthly", updated: UPDATED.site },
    { path: "/contact", priority: 0.7, freq: "yearly", updated: UPDATED.contact },
    { path: "/apply", priority: 0.8, freq: "monthly", updated: UPDATED.site },
    { path: "/ai-agency", priority: 0.85, freq: "monthly", updated: UPDATED.site },
    { path: "/missed-call-calculator", priority: 0.9, freq: "monthly", updated: UPDATED.calculator },
    { path: "/privacy", priority: 0.3, freq: "yearly", updated: UPDATED.privacy },
    { path: "/terms", priority: 0.3, freq: "yearly", updated: UPDATED.terms },
    // /products, /packages and /portfolio were retired in round 4 and now
    // redirect (see next.config.ts). /try stays out until it is live here.
  ];

  const serviceRoutes: Route[] = SERVICE_CATEGORIES.map((c) => ({
    path: `/services/${c.slug}`,
    priority: 0.85,
    freq: "monthly",
    updated: UPDATED.site,
  }));

  // Niche offer pages are the main paid and organic landing pages.
  const nicheRoutes: Route[] = NICHES.map((n) => ({
    path: `/industries/${n.slug}`,
    priority: 0.9,
    freq: "monthly",
    updated: UPDATED.site,
  }));

  const industryRoutes: Route[] = industries.map((i) => ({
    path: `/industries/${i.slug}`,
    priority: 0.75,
    freq: "monthly",
    updated: UPDATED.site,
  }));

  // Only the four city pages with genuinely local content. The retired ones
  // redirect (LOCATION_REDIRECTS) and must never be listed here.
  const locationRoutes: Route[] = LOCATIONS.map((l) => ({
    path: `/ai-agency/${l.slug}`,
    priority: 0.8,
    freq: "monthly",
    updated: UPDATED.site,
  }));

  // /how-it-works/<step> pages redirect to /how-it-works (next.config), so none are listed

  return [...staticRoutes, ...nicheRoutes, ...serviceRoutes, ...industryRoutes, ...locationRoutes].map(
    ({ path, priority, freq, updated }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(`${updated}T00:00:00Z`),
      changeFrequency: freq,
      priority,
    })
  );
}
