import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/kit/PageHero";
import { SectionHead } from "@/components/kit/SectionHead";
import { CTABand } from "@/components/kit/CTABand";
import { StepRing } from "@/components/visuals/hero/StepRing";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { Reveal } from "@/components/primitives/Reveal";
import { ReadingProgress } from "@/components/primitives/ReadingProgress";
import { PROCESS, PROCESS_BY_SLUG } from "@/data/process";

const SITE_URL = "https://verdancesystemsai.com";

export async function generateStaticParams() {
  return PROCESS.map((s) => ({ step: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ step: string }>;
}): Promise<Metadata> {
  const { step: slug } = await params;
  const step = PROCESS_BY_SLUG[slug];
  if (!step) return {};

  const title = `${step.n} ${step.name} | How We Deliver | Verdance Systems AI`;
  const description = `${step.promise} ${step.desc} ${step.duration}.`;
  const url = `${SITE_URL}/how-it-works/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: `/how-it-works/${slug}` },
    openGraph: { title, description, url, type: "article", siteName: "Verdance Systems AI" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProcessStepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step: slug } = await params;
  const step = PROCESS_BY_SLUG[slug];
  if (!step) notFound();

  const index = PROCESS.findIndex((s) => s.slug === slug);
  const prev = index > 0 ? PROCESS[index - 1] : null;
  const next = index < PROCESS.length - 1 ? PROCESS[index + 1] : null;
  const url = `${SITE_URL}/how-it-works/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowToSection",
        "@id": `${url}/#step`,
        name: step.name,
        position: index + 1,
        description: step.promise,
        url,
        itemListElement: step.beats.map((beat, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: beat.title,
          text: beat.body,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: step.question.q,
            acceptedAnswer: { "@type": "Answer", text: step.question.a },
          },
          {
            "@type": "Question",
            name: `How long does the ${step.name.toLowerCase()} step take?`,
            acceptedAnswer: { "@type": "Answer", text: `${step.duration}. ${step.deliverable}` },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "How it works", item: `${SITE_URL}/how-it-works` },
          { "@type": "ListItem", position: 3, name: step.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        eyebrow={`Step ${step.n} · ${step.duration}`}
        title={
          <>
            {step.name}. <span className="italic-accent">Step {Number(step.n)} of six.</span>
          </>
        }
        lead={`${step.promise} ${step.desc}`}
        crumbs={[{ href: "/how-it-works", label: "How it works" }, { label: step.name }]}
        visual={<StepRing index={index} deliverable={step.deliverable} />}
      />

      <section className="section-pad bg-canvas-2" aria-labelledby="beats-title" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-wide grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              id="beats-title"
              eyebrow="What actually happens"
              title={
                <>
                  In order, <span className="italic-accent">in plain words.</span>
                </>
              }
            />
          </div>
          <ol className="grid gap-4">
            {step.beats.map((beat, i) => (
              <li key={beat.title}>
                <Reveal delay={i * 0.06}>
                  <div className="card-x p-6 md:p-7">
                    <span className="font-mono text-[0.72rem] text-[color:var(--color-accent)] tabular">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3 font-display text-[1.3rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.025em" }}>
                      {beat.title}
                    </h3>
                    <p className="mt-2 text-[0.98rem] leading-[1.65] text-[color:var(--color-ink-soft)]">{beat.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad bg-canvas" aria-label="What we need and common question" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-wide grid gap-4 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="card-x h-full p-7 md:p-9">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">What we need from you</p>
              <ul className="mt-5 flex flex-col">
                {step.fromYou.map((item, i) => (
                  <li key={item} className="py-3 text-[0.98rem] leading-[1.55] text-[color:var(--color-ink-soft)]" style={{ borderTop: i ? "1px solid var(--hairline)" : undefined }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <div className="card-x is-accent h-full p-7 md:p-9">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--color-accent)]">Asked about this step</p>
              <h2 className="mt-4 font-display text-[1.45rem] leading-snug text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.025em" }}>
                {step.question.q}
              </h2>
              <p className="mt-3 text-[0.98rem] leading-[1.65] text-[color:var(--color-ink-soft)]">{step.question.a}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <nav aria-label="Steps" className="bg-canvas-2" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-wide grid gap-4 py-12 sm:grid-cols-2">
          {prev ? (
            <Link href={`/how-it-works/${prev.slug}`} className="card-x group p-6">
              <span className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">
                <ArrowLeft size={12} aria-hidden />
                Step {prev.n}
              </span>
              <span className="mt-2 block font-display text-[1.25rem] text-[color:var(--color-ink)]">{prev.name}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/how-it-works/${next.slug}`} className="card-x group p-6 sm:text-right">
              <span className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)] sm:flex-row-reverse">
                <ArrowRight size={12} aria-hidden />
                Step {next.n}
              </span>
              <span className="mt-2 block font-display text-[1.25rem] text-[color:var(--color-ink)]">{next.name}</span>
            </Link>
          )}
        </div>
      </nav>

      <CTABand
        title={
          <>
            All six steps start with <span className="italic-accent">the same thirty minutes.</span>
          </>
        }
      />
      <StickyMobileCTA href={GENERIC_BOOK_URL} label="Book a free pre-audit" />
    </>
  );
}
