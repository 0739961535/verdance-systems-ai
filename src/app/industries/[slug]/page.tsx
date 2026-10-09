import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { PageHero } from "@/components/kit/PageHero";
import { SectionHead } from "@/components/kit/SectionHead";
import { CTABand } from "@/components/kit/CTABand";
import { ServiceConsole } from "@/components/visuals/hero/ServiceConsole";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { industries, getIndustryBySlug } from "@/data/industries";
import { NICHES, getNicheBySlug } from "@/data/niches";
import { NicheOfferPage } from "@/components/niche/NicheOfferPage";
import { SERVICE_BY_SLUG } from "@/data/services";
import { PRODUCT_TO_SERVICE } from "@/data/productToService";
import { GENERIC_BOOK_URL } from "@/data/booking";
import type { Metadata } from "next";

function splitHeadline(headline: string): { lead: string; accent: string | null } {
  const sentences = headline.trim().split(/(?<=\.)\s+/).filter(Boolean);
  if (sentences.length < 2) return { lead: headline, accent: null };
  return { lead: sentences.slice(0, -1).join(" "), accent: sentences[sentences.length - 1] };
}

export async function generateStaticParams() {
  return [...NICHES.map((n) => ({ slug: n.slug })), ...industries.map((i) => ({ slug: i.slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  // Niche offer pages share this route but carry their own copy and metadata.
  const niche = getNicheBySlug(slug);
  if (niche) {
    const url = `https://verdancesystemsai.com/industries/${slug}`;
    return {
      title: niche.meta.title,
      description: niche.meta.description,
      alternates: { canonical: `/industries/${slug}` },
      openGraph: {
        title: niche.meta.ogTitle,
        description: niche.meta.description,
        url,
        type: "website",
        siteName: "Verdance Systems AI",
        locale: "en_ZA",
      },
      twitter: { card: "summary_large_image", title: niche.meta.ogTitle, description: niche.meta.description },
    };
  }

  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  const title = `Enquiry Answering and Booking for ${industry.name} | Verdance Systems AI`;
  const description = `${industry.subheadline} Every call and message answered within 5 minutes, day or night, and booked. Fixed quote after a free pre-audit.`;
  const url = `https://verdancesystemsai.com/industries/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: `/industries/${slug}` },
    openGraph: { title, description, url, type: "website", siteName: "Verdance Systems AI" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const niche = getNicheBySlug(slug);
  if (niche) return <NicheOfferPage niche={niche} />;

  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const services = Array.from(
    new Set(industry.relevantProducts.map((p) => PRODUCT_TO_SERVICE[p]).filter(Boolean)),
  )
    .map((slug) => SERVICE_BY_SLUG[slug])
    .filter(Boolean)
    .slice(0, 6);
  const { lead, accent } = splitHeadline(industry.headline);

  const url = `https://verdancesystemsai.com/industries/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://verdancesystemsai.com/" },
      { "@type": "ListItem", position: 2, name: "Industries", item: "https://verdancesystemsai.com/industries" },
      { "@type": "ListItem", position: 3, name: industry.name, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        eyebrow={industry.name}
        title={
          <>
            {lead} {accent && <span className="italic-accent">{accent}</span>}
          </>
        }
        lead={industry.subheadline}
        crumbs={[{ href: "/industries", label: "Industries" }, { label: industry.name }]}
        visual={
          <ServiceConsole
            title={`${industry.name} · how an enquiry is handled`}
            parts={[{ name: "From first message to booked", steps: industry.automationFlow.map((s) => s.label) }]}
          />
        }
        note="Fixed quote after your free pre-audit"
      />

      <section className="section-pad bg-canvas-2" aria-labelledby="problems-title" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-wide">
          <SectionHead
            id="problems-title"
            eyebrow="Where customers slip away"
            title={
              <>
                What is costing you <span className="italic-accent">customers.</span>
              </>
            }
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16">
            {industry.problems.map((problem, i) => (
              <li key={problem.title}>
                <Reveal delay={i * 0.06} className="h-full">
                  <div className="card-x h-full p-6 md:p-7">
                    <span className="font-mono text-[0.72rem] text-[color:var(--color-accent)] tabular">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3 font-display text-[1.3rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.025em" }}>
                      {problem.title}
                    </h3>
                    <p className="mt-2 text-[0.98rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{problem.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad bg-canvas" aria-labelledby="flow-title" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-wide grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              id="flow-title"
              eyebrow="How it works"
              title={
                <>
                  The system, <span className="italic-accent">step by step.</span>
                </>
              }
            />
          </div>
          <ol className="grid gap-3">
            {industry.automationFlow.map((step, i) => (
              <li key={step.step}>
                <Reveal delay={i * 0.06}>
                  <div className="card-x flex items-start gap-4 p-5 md:p-6">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full font-mono text-[0.75rem]" style={{ background: "var(--accent-3)", color: "var(--on-accent-3)" }}>
                      {step.step}
                    </span>
                    <span>
                      <span className="block font-display text-[1.1rem] text-[color:var(--color-ink)]">{step.label}</span>
                      <span className="mt-1 block text-[0.95rem] leading-[1.55] text-[color:var(--color-ink-soft)]">{step.description}</span>
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {services.length > 0 && (
        <section className="section-pad bg-canvas-2" aria-labelledby="build-title" style={{ borderTop: "1px solid var(--hairline)" }}>
          <div className="container-wide">
            <SectionHead
              id="build-title"
              eyebrow="What we would build"
              title={
                <>
                  Recommended for <span className="italic-accent">{industry.name.toLowerCase()}.</span>
                </>
              }
            />
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
              {services.map((c, i) => (
                <li key={c.slug}>
                  <Reveal delay={i * 0.06} className="h-full">
                    <Link href={`/services/${c.slug}`} className="card-x group flex h-full flex-col p-6 md:p-7">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">Service {c.number}</span>
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

      <CTABand />
      <StickyMobileCTA href={GENERIC_BOOK_URL} label="Get your free Operations Map" />
    </>
  );
}
