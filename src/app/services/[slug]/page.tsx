import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionHead } from "@/components/kit/SectionHead";
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
    { from: "us", text: "Hi, yes we do. Delivery takes 2 to 3 working days. Shall I send you the order link?", time: "21:41" },
    { from: "them", text: "Yes please", time: "21:42" },
    { from: "card", title: "Order link sent", lines: ["Saved to the customer record", "The team sees the whole chat"], tone: "info" },
  ],
};

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

  const depth = depthFor(category);
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
      />

      {related.length > 0 && (
        <section className="section-pad bg-canvas-2" aria-labelledby="related-title" style={{ borderTop: "1px solid var(--hairline)" }}>
          <div className="container-wide">
            <SectionHead
              id="related-title"
              eyebrow="Works well with"
              title={
                <>
                  Pairs well with <span className="italic-accent">these.</span>
                </>
              }
            />
            <ul className="mt-12 grid gap-4 md:grid-cols-3">
              {related.map((c, i) => (
                <li key={c.slug}>
                  <Reveal delay={i * 0.06} className="h-full">
                    <Link href={`/services/${c.slug}`} className="card-x ix-card group flex h-full flex-col p-6 md:p-7">
                      <div className="flex items-center justify-between">
                        <ServiceGlyph slug={c.slug} size={40} />
                        <ArrowUpRight size={17} aria-hidden className="nudge text-[color:var(--color-ink-muted)] group-hover:text-[color:var(--color-accent)]" />
                      </div>
                      <h3 className="mt-6 font-display text-[1.3rem] leading-tight text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.025em" }}>
                        {c.name}
                      </h3>
                      <p className="mt-3 flex-1 text-[0.95rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{c.promise}</p>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <StickyMobileCTA href={GENERIC_BOOK_URL} label="Book a free 30-minute call" />
    </>
  );
}
