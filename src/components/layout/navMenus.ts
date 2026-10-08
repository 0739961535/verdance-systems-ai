import { SERVICE_CATEGORIES, SERVICE_PILLARS, PILLAR_CATEGORIES } from "@/data/services";
import { industries } from "@/data/industries";
import { NICHES } from "@/data/niches";
import type { MegaMenu, MegaMenuGroup, MegaMenuItem, NicheLink } from "./Navbar";


const INDUSTRY_ITEMS: MegaMenuItem[] = industries.map((ind, i) => ({
  slug: ind.slug,
  name: ind.name,
  number: String(i + 1).padStart(2, "0"),
}));
const INDUSTRY_HALF = Math.ceil(INDUSTRY_ITEMS.length / 2);
const INDUSTRY_GROUPS: MegaMenuGroup[] = [
  {
    title: "Current offers",
    items: NICHES.map((n, i) => ({ slug: n.slug, name: n.name, number: String(i + 1).padStart(2, "0") })),
  },
  { title: "More industries", items: INDUSTRY_ITEMS.slice(0, INDUSTRY_HALF) },
  { title: "\u00a0", items: INDUSTRY_ITEMS.slice(INDUSTRY_HALF) },
];

const SERVICE_GROUPS: MegaMenuGroup[] = [
  ...SERVICE_PILLARS.map((p) => ({
    title: p.title,
    items: PILLAR_CATEGORIES(p).map((c) => ({ slug: c.slug, name: c.name, number: c.number })),
  })),
];

export const MEGA_MENUS: Record<string, MegaMenu> = {
  "/services": {
    eyebrow: "Four pillars",
    heading: "Every system -",
    headingAccent: "one operator.",
    base: "/services",
    items: SERVICE_CATEGORIES.map((c) => ({ slug: c.slug, name: c.name, number: c.number })),
    groups: SERVICE_GROUPS,
    feature: {
      href: "/services/ai-operations-system",
      label: "Ashford's Staff",
      note: "Your private AI operations team, with a live command centre",
    },
  },
  "/industries": {
    eyebrow: "Built for how you work",
    heading: "Every industry -",
    headingAccent: "one system.",
    base: "/industries",
    items: INDUSTRY_ITEMS,
    groups: INDUSTRY_GROUPS,
  },
};


export const NICHE_LINKS: NicheLink[] = NICHES.map((n) => ({ slug: n.slug, name: n.name, bookSlug: n.bookSlug }));
