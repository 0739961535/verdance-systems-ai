import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceGlyph } from "@/components/services/ServiceGlyph";
import { ServiceConsole } from "@/components/visuals/hero/ServiceConsole";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { ServiceDepth } from "@/components/services/ServiceDepth";
import { SlowChatDemo, type Demo } from "@/components/demos/SlowChatDemo";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { SERVICE_CATEGORIES, SERVICE_BY_SLUG, SERVICE_STORY, depthFor } from "@/data/services";
import { SITE_URL } from "@/data/site";

/** The live demo beside "What it does" on the instant replies page. Made up, labelled Sample by the demo. */
const REPLY_DEMO: Demo = {
  business: "Sample shop",
  channel: "WhatsApp · 21:41",
  messages: [
    { from: "them", text: "Hi, do you deliver to Durban?", time: "21:41" },
    { from: "us", text: "Hi, yes we do. Delivery takes 2 to 3 days. Shall I send you the order link?", time: "21:41" },
    { from: "them", text: "Yes please", time: "21:42" },
    { from: "card", title: "Order link sent", lines: ["Saved to the customer record", "The team sees the whole chat"], tone: "info" },
  ],
};

/** "Pairs well with" as a row of compact links. */
const PAIRS_CSS = `
.sd-pairs { padding: 48px 0 56px; border-top: 1px solid var(--hairline); }
@media (min-width: 1024px) { .sd-pairs { padding: 56px 0 72px; } }
.sd-pairs-list { list-style: none; margin: 18px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 10px; }
.sd-pair {
  display: inline-flex; align-items: center; gap: 10px; min-height: 48px; padding: 6px 16px 6px 8px; border-radius: 999px;
  border: 1px solid var(--hairline); background: var(--color-canvas); color: var(--color-ink); font-weight: 500; font-size: 0.98rem;
  transition: border-color 200ms ease, transform 200ms cubic-bezier(.16,1,.3,1), box-shadow 200ms ease;
}
.sd-pair:hover { transform: translateY(-2px); border-color: var(--color-accent); box-shadow: 0 10px 24px -14px rgba(77, 124, 255, 0.55); }
.sd-pair:active { transform: translateY(0); }
.sd-pair:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
.sd-pair-arrow { color: var(--color-ink-muted); }
.sd-pair .sg path, .sd-pair .sg circle { stroke: #2554D4; }
.sd-pair .sg .sg-on { fill: rgba(37, 84, 212, 0.22); stroke: #1D3F8F; }
.sd-pair .sg .sg-core { fill: #2554D4; }
.sd-pair:hover .sd-pair-arrow { color: var(--color-accent); }
@media (prefers-reduced-motion: reduce) { .sd-pair { transition: none; } .sd-pair:hover { transform: none; } }
`;

export async function generateStaticParams() {
  return SERVICE_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = SERVICE_BY_SLUG[slug];
  if (!category) return {};
  const title = `${category.seoTitle} | Verdance`;
  const description = category.seoDescription;
  const url = `${SITE_URL}/services/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
    images: ["/opengraph-image"], title, description, url, type: "website", siteName: "Verdance Systems AI" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ServiceCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = SERVICE_BY_SLUG[slug];
  if (!category) notFound();

  const related = category.relatedSlugs
    .map((s) => SERVICE_BY_SLUG[s])
    .filter(Boolean);

  // Three questions on the page, and the same three in the FAQ schema.
  const fullDepth = depthFor(category);
  const depth = { ...fullDepth, faqs: fullDepth.faqs.slice(0, 3) };
  const story = SERVICE_STORY[slug];
  const url = `${SITE_URL}/services/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: category.name,
        serviceType: category.name,
        description: category.promise,
        url,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: "Worldwide",
      },
      {
        "@type": "FAQPage",
        mainEntity: depth.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
          { "@type": "ListItem", position: 3, name: category.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ServiceHero
        slug={slug}
        name={category.name}
        title={
          <>
            {category.headline} <span className="italic-accent">{category.italicWord}</span>
          </>
        }
        short={story?.short ?? category.promise}
        more={category.description}
        visual={
          <ServiceConsole
            title={category.name}
            parts={category.subProducts.map((sp) => ({ name: sp.name, steps: sp.howItWorks }))}
          />
        }
      />

      <ServiceDepth
        depth={depth}
        includes={category.whatYouGet}
        story={story}
        demo={slug === "conversation-ai" ? <SlowChatDemo demo={REPLY_DEMO} /> : undefined}
        compact
      />

      {related.length > 0 && (
        <nav className="sd-pairs bg-canvas-2" aria-labelledby="related-title">
          <style>{PAIRS_CSS}</style>
          <div className="container-wide">
            <h2 id="related-title" className="eyebrow">
              Pairs well with
            </h2>
            <ul className="sd-pairs-list">
              {related.map((c) => (
                <li key={c.slug}>
                  <Link href={`/services/${c.slug}`} className="sd-pair group">
                    <ServiceGlyph slug={c.slug} size={28} />
                    <span>{c.name}</span>
                    <ArrowUpRight size={15} aria-hidden className="nudge sd-pair-arrow" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}

      <StickyMobileCTA href={GENERIC_BOOK_URL} label="Book a free 30-minute call" />
    </>
  );
}
