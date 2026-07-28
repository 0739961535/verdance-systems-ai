import type { MetadataRoute } from "next";
import { SERVICE_CATEGORIES } from "@/data/services";
import { products } from "@/data/products";
import { industries } from "@/data/industries";

const SITE_URL = "https://verdancesystemsai.com";

type Freq = MetadataRoute.Sitemap[number]["changeFrequency"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; freq: Freq }[] = [
    { path: "", priority: 1.0, freq: "weekly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/industries", priority: 0.8, freq: "monthly" },
    { path: "/products", priority: 0.8, freq: "monthly" },
    { path: "/how-it-works", priority: 0.8, freq: "monthly" },
    { path: "/contact", priority: 0.7, freq: "yearly" },
    { path: "/apply", priority: 0.8, freq: "monthly" },
    // Deliberately excluded until they carry real content:
    //   /portfolio (placeholder "coming soon"), /packages (placeholder).
  ];

  const serviceRoutes = SERVICE_CATEGORIES.map((c) => ({
    path: `/services/${c.slug}`,
    priority: 0.85,
    freq: "monthly" as Freq,
  }));

  const industryRoutes = industries.map((i) => ({
    path: `/industries/${i.slug}`,
    priority: 0.75,
    freq: "monthly" as Freq,
  }));

  const productRoutes = products.map((p) => ({
    path: `/products/${p.slug}`,
    priority: 0.7,
    freq: "monthly" as Freq,
  }));

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...productRoutes].map(
    ({ path, priority, freq }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: freq,
      priority,
    })
  );
}
