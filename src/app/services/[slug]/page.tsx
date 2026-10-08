import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { PageHero } from "@/components/kit/PageHero";
import { SectionHead } from "@/components/kit/SectionHead";
import { CTABand } from "@/components/kit/CTABand";
import { ServiceConsole } from "@/components/visuals/hero/ServiceConsole";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { plain } from "@/lib/plain";
import { SERVICE_CATEGORIES, SERVICE_BY_SLUG } from "@/data/services";

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
  const title = `${category.name} | Verdance Systems AI`;
  const description = `${category.name}: ${plain(category.promise)} Built and run for you in South Africa. Fixed quote after a free pre-audit.`;
  const url = `https://verdancesystemsai.com/services/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: { title, description, url, type: "website", siteName: "Verdance Systems AI" },
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

  const url = `https://verdancesystemsai.com/services/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: category.name,
        serviceType: category.name,
        description: category.promise,
        url,
        provider: { "@type": "Organization", name: "Verdance Systems AI", url: "https://verdancesystemsai.com" },
        areaServed: "Worldwide",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://verdancesystemsai.com/" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://verdancesystemsai.com/services" },
          { "@type": "ListItem", position: 3, name: category.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        eyebrow={`${category.number} · ${category.eyebrow}`}
        title={
          <>
            {plain(category.headline)} <span className="italic-accent">{category.italicWord}</span>
          </>
        }
        lead={plain(category.promise)}
        crumbs={[{ href: "/services", label: "Services" }, { label: category.name }]}
        visual={
          <ServiceConsole
            title={category.name}
            parts={category.subProducts.map((sp) => ({ name: sp.name.replace(/\s*\(.*\)\s*/, ""), steps: sp.howItWorks.slice(0, 4).map(plain) }))}
          />
        }
        note="Fixed quote after your free pre-audit"
      />

      {/* WHAT YOU GET */}
      <section className="section-pad bg-canvas-2" aria-labelledby="parts-title" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-wide">
          <SectionHead
            id="parts-title"
            eyebrow={`What you get · ${category.subProducts.length} parts`}
            title={
              <>
                Everything inside, <span className="italic-accent">unpacked.</span>
              </>
            }
            intro="Each part works on its own. Together they cover the whole route a customer takes, from first message to booked."
          />
          <ul className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2">
            {category.subProducts.map((sp, i) => (
              <li key={sp.name}>
                <Reveal delay={Math.min(i * 0.06, 0.3)} className="h-full">
                  <article className="card-x h-full p-6 md:p-8">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-[1.35rem] leading-tight text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.025em" }}>
                        {sp.name}
                      </h3>
                      <span className="font-mono text-[0.7rem] text-[color:var(--color-accent)] tabular">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <p className="mt-3 text-[0.98rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{plain(sp.description)}</p>
                    <ol className="mt-6 flex flex-col gap-2.5 border-t pt-5" style={{ borderColor: "var(--hairline)" }}>
                      {sp.howItWorks.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-[0.92rem] leading-[1.5] text-[color:var(--color-ink-soft)]">
                          <span className="mt-0.5 font-mono text-[0.68rem] text-[color:var(--color-ink-muted)] tabular">{idx + 1}</span>
                          <span>{plain(step)}</span>
                        </li>
                      ))}
                    </ol>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY + OUTCOME */}
      <section className="section-pad bg-canvas" aria-label="Why it matters" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-wide grid gap-4 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="card-x h-full p-8 md:p-10">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">Why this matters</p>
              <p className="mt-5 font-display text-[clamp(1.4rem,1.4vw+1rem,2rem)] leading-snug text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.025em" }}>
                {plain(category.whyItMatters)}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <div className="card-x is-accent h-full p-8 md:p-10">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--color-accent)]">The outcome</p>
              <p className="mt-5 font-display text-[clamp(1.4rem,1.4vw+1rem,2rem)] leading-snug text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.025em" }}>
                {plain(category.outcome)}
              </p>
              <a href={GENERIC_BOOK_URL} data-magnetic className="btn btn-accent mt-8 min-h-12">
                Book your free pre-audit
                <ArrowUpRight size={16} aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-pad bg-canvas-2" aria-labelledby="related-title" style={{ borderTop: "1px solid var(--hairline)" }}>
          <div className="container-wide">
            <SectionHead
              id="related-title"
              eyebrow="Works well with"
              title={
                <>
                  Stack it with <span className="italic-accent">these.</span>
                </>
              }
            />
            <ul className="mt-12 grid gap-4 md:grid-cols-3">
              {related.map((c, i) => (
                <li key={c.slug}>
                  <Reveal delay={i * 0.06} className="h-full">
                    <Link href={`/services/${c.slug}`} className="card-x group flex h-full flex-col p-6 md:p-7">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">{c.number}</span>
                        <ArrowUpRight size={17} aria-hidden className="nudge text-[color:var(--color-ink-muted)] group-hover:text-[color:var(--color-accent)]" />
                      </div>
                      <h3 className="mt-6 font-display text-[1.3rem] leading-tight text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.025em" }}>
                        {c.name}
                      </h3>
                      <p className="mt-3 flex-1 text-[0.95rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{plain(c.promise)}</p>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTABand />
      <StickyMobileCTA href={GENERIC_BOOK_URL} label="Book a free pre-audit" />
    </>
  );
}
