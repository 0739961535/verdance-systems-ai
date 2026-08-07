import type { MetadataRoute } from "next";

const SITE_URL = "https://verdancesystemsai.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // AI assistants and their crawlers are explicitly welcome - being
      // citable in AI answers is part of the site's conversion strategy
      // (the "Ask an AI about us" chips).
      ...["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-Web", "PerplexityBot", "Google-Extended", "CCBot"].map(
        (userAgent) => ({ userAgent, allow: "/" as const })
      ),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
