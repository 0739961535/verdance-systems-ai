import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/primitives/Reveal";
import { MagneticButton } from "@/components/primitives/MagneticButton";
import { AnimatedDivider } from "@/components/primitives/AnimatedDivider";
import { GradientMesh } from "@/components/primitives/GradientMesh";
import { ServiceDemo } from "@/components/demos/DemoRegistry";
import { FinalCTA } from "@/components/sections/v3/FinalCTA";
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
  const title = `${category.name} for Local Businesses | Verdance Systems AI`;
  const description = `${category.name}: ${category.promise} Done-for-you AI that answers, follows up, and books appointments 24/7 for local service businesses. Free consult.`;
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* HERO */}
      <section className="relative isolate overflow-hidden pt-36 pb-16 md:pt-44 md:pb-24">
        <div className="absolute inset-0 -z-10">
          <GradientMesh intensity="soft" />
        </div>
        <div className="container-wide">
          {/* Breadcrumb */}
          <Reveal>
            <nav className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
              <Link href="/services" className="hover:text-[color:var(--color-accent)] transition-colors">
                Services
              </Link>
              <span className="mx-2 text-[color:var(--color-ink-faint)]">/</span>
              <span className="text-[color:var(--color-accent)]">{category.name}</span>
            </nav>
          </Reveal>

          <Reveal delay={0.05}>
            <span className="mt-6 inline-block eyebrow">
              {category.number} · {category.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 headline-hero max-w-[20ch]">
              {category.headline}{" "}
              <span className="italic-accent">{category.italicWord}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-[color:var(--color-ink-soft)] leading-relaxed">
              {category.promise}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap gap-3">
              <MagneticButton href="/contact" variant="accent">
                {category.ctaCopy}
              </MagneticButton>
              <MagneticButton href="/services" variant="ghost">
                All services
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DEMO */}
      <section className="relative section-pad-sm bg-canvas">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
            <Reveal>
              <span className="eyebrow">Live · See it in motion</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 headline-section">
                What it looks like -{" "}
                <span className="italic-accent">running.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ServiceDemo demoKey={category.demoKey} />
          </Reveal>
        </div>
      </section>

      <div className="container-wide">
        <AnimatedDivider variant="accent" />
      </div>

      {/* SUB-PRODUCTS */}
      <section className="relative section-pad bg-canvas-2">
        <div className="container-wide">
          <div className="max-w-3xl">
            <Reveal>
              <span className="eyebrow">What you get · {category.subProducts.length} sub-products</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 headline-section">
                Everything inside -{" "}
                <span className="italic-accent">unpacked.</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {category.subProducts.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.04}>
                <article
                  className="rounded-2xl border p-7 md:p-8 h-full surface-card-hover"
                  style={{ borderColor: "var(--color-hairline)" }}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl font-medium leading-tight text-[color:var(--color-ink)]">
                      {p.name}
                    </h3>
                  </div>
                  <p className="mt-4 text-[15px] text-[color:var(--color-ink-soft)] leading-relaxed">
                    {p.description}
                  </p>
                  <div className="mt-5 pt-5 border-t" style={{ borderColor: "var(--color-hairline)" }}>
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)] mb-3">
                      How it works
                    </div>
                    <ul className="space-y-2">
                      {p.howItWorks.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-[14px] text-[color:var(--color-ink-soft)]">
                          <span
                            className="mt-2 inline-block h-1 w-1 rounded-full flex-shrink-0"
                            style={{ background: "var(--color-accent)" }}
                          />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY + OUTCOME */}
      <section className="relative section-pad bg-canvas">
        <div className="container-wide grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div
              className="rounded-2xl border p-8 md:p-10 h-full"
              style={{
                borderColor: "var(--color-hairline)",
                background: "rgba(var(--hairline-rgb),0.02)",
              }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
                Why this matters
              </div>
              <p className="mt-5 font-display text-2xl md:text-3xl font-medium leading-snug text-[color:var(--color-ink)]">
                {category.whyItMatters}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div
              className="rounded-2xl border p-8 md:p-10 h-full"
              style={{
                borderColor: "rgba(var(--accent-rgb),0.3)",
                background: "rgba(var(--accent-rgb),0.05)",
              }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
                The outcome
              </div>
              <p className="mt-5 font-display text-2xl md:text-3xl font-medium leading-snug text-[color:var(--color-ink)]">
                {category.outcome}
              </p>
              <div className="mt-8">
                <MagneticButton href="/contact" variant="accent">
                  {category.ctaCopy}
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="relative section-pad bg-canvas-2">
          <div className="container-wide">
            <div className="max-w-3xl">
              <Reveal>
                <span className="eyebrow">Related capabilities</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 headline-section">
                  Stack it with -{" "}
                  <span className="italic-accent">these.</span>
                </h2>
              </Reveal>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {related.map((c, i) => (
                <Reveal key={c.slug} delay={i * 0.05}>
                  <Link
                    href={`/services/${c.slug}`}
                    className="group block relative overflow-hidden surface surface-card-hover h-full"
                  >
                    <div className="p-7 flex flex-col h-full">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
                        {c.number} · Category
                      </span>
                      <h3 className="mt-5 font-display text-xl font-medium leading-tight text-[color:var(--color-ink)]">
                        {c.name}
                      </h3>
                      <p className="mt-3 text-[14px] text-[color:var(--color-ink-soft)] leading-relaxed flex-1">
                        {c.promise}
                      </p>
                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-ink)] group-hover:gap-3 group-hover:text-[color:var(--color-accent)] transition-all">
                        Explore
                        <Arrow />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCTA />
    </>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
