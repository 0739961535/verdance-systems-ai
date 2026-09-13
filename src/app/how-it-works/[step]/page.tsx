import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
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
    <main className="bg-canvas min-h-screen">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* header */}
      <section className="section-padding pt-32 pb-14">
        <div className="container-narrow">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-accent)] transition-colors"
          >
            <ArrowLeft size={13} aria-hidden />
            How we deliver
          </Link>

          <div className="mt-7 flex items-baseline gap-5">
            <span
              className="font-mono tabular-nums"
              style={{
                fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
                color: "rgba(var(--accent-rgb), 0.32)",
                lineHeight: 1,
              }}
            >
              {step.n}
            </span>
            <h1
              className="font-display font-bold tracking-tight text-[color:var(--color-ink)]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
            >
              {step.name}
            </h1>
          </div>

          <p className="mt-6 max-w-2xl text-[color:var(--color-ink-soft)] text-lg leading-relaxed">
            {step.promise}
          </p>
          <p className="mt-4 font-mono text-[0.76rem] uppercase tracking-[0.14em] text-[color:var(--color-ink-muted)]">
            {step.duration}
          </p>
        </div>
      </section>

      {/* what happens, on the same spine device as the homepage timeline */}
      <section className="section-padding py-16 border-t" style={{ borderColor: "var(--hairline)" }}>
        <div className="container-narrow">
          <Reveal>
            <h2 className="font-display font-bold tracking-tight text-[color:var(--color-ink)]" style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)" }}>
              What actually happens
            </h2>
          </Reveal>

          <ol className="relative mt-10 max-w-2xl" style={{ borderLeft: "1px solid var(--hairline-2)" }}>
            {step.beats.map((beat, i) => (
              <li key={beat.title} className="relative pl-7 md:pl-9 pb-9 last:pb-0">
                <Reveal delay={i * 0.06}>
                  <span
                    aria-hidden
                    className="absolute -left-[4px] top-[0.5rem] w-[7px] h-[7px] rounded-full"
                    style={{ background: "var(--color-accent)" }}
                  />
                  <h3 className="font-display font-semibold text-[color:var(--color-ink)]" style={{ fontSize: "1.12rem" }}>
                    {beat.title}
                  </h3>
                  <p className="mt-2 text-[color:var(--color-ink-soft)] leading-relaxed">
                    {beat.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* deliverable and what we need */}
      <section className="section-padding py-16 border-t" style={{ borderColor: "var(--hairline)" }}>
        <div className="container-narrow grid gap-10 md:grid-cols-2">
          <Reveal>
            <div
              className="rounded-2xl border p-6 h-full"
              style={{ borderColor: "var(--hairline)", background: "rgba(var(--accent-rgb),0.04)" }}
            >
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[color:var(--color-accent)]">
                What you get
              </span>
              <p className="mt-4 text-[color:var(--color-ink)] leading-relaxed">
                {step.deliverable}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full">
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">
                What we need from you
              </span>
              <ul className="mt-4 flex flex-col">
                {step.fromYou.map((item) => (
                  <li
                    key={item}
                    className="py-3 border-b text-[color:var(--color-ink-soft)] leading-relaxed"
                    style={{ borderColor: "var(--hairline)" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* the question people actually ask */}
      <section className="section-padding py-16 border-t" style={{ borderColor: "var(--hairline)" }}>
        <div className="container-narrow max-w-2xl">
          <Reveal>
            <h2 className="font-display font-semibold text-[color:var(--color-ink)]" style={{ fontSize: "1.3rem" }}>
              {step.question.q}
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-3 text-[color:var(--color-ink-soft)] leading-relaxed">
              {step.question.a}
            </p>
          </Reveal>
        </div>
      </section>

      {/* prev / next */}
      <section className="section-padding py-14 border-t" style={{ borderColor: "var(--hairline)" }}>
        <div className="container-narrow grid gap-4 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/how-it-works/${prev.slug}`}
              className="group rounded-2xl border p-5 transition-colors hover:bg-[rgba(var(--accent-rgb),0.04)]"
              style={{ borderColor: "var(--hairline)" }}
            >
              <span className="inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">
                <ArrowLeft size={12} aria-hidden />
                Step {prev.n}
              </span>
              <div className="mt-2 font-display font-semibold text-[color:var(--color-ink)]">{prev.name}</div>
            </Link>
          ) : (
            <span />
          )}

          {next && (
            <Link
              href={`/how-it-works/${next.slug}`}
              className="group rounded-2xl border p-5 transition-colors hover:bg-[rgba(var(--accent-rgb),0.04)] sm:text-right"
              style={{ borderColor: "var(--hairline)" }}
            >
              <span className="inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)] sm:flex-row-reverse">
                <ArrowRight size={12} aria-hidden />
                Step {next.n}
              </span>
              <div className="mt-2 font-display font-semibold text-[color:var(--color-ink)]">{next.name}</div>
            </Link>
          )}
        </div>
      </section>

      {/* close */}
      <section className="section-padding py-20 border-t" style={{ borderColor: "var(--hairline)" }}>
        <div className="container-narrow max-w-2xl">
          <Reveal>
            <h2 className="font-display font-bold tracking-tight text-[color:var(--color-ink)] max-w-[22ch]" style={{ fontSize: "clamp(1.6rem, 3vw, 2.3rem)" }}>
              All six steps start with the same thirty minutes.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 text-[color:var(--color-ink-soft)] leading-relaxed">
              Free, nothing to sign, and you keep the plan whether or not you work with us.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <Link href="/contact" className="btn btn-accent justify-center min-h-12 mt-8 inline-flex">
              Book a free audit call
              <ArrowUpRight size={15} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
