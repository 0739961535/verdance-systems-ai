import type { Metadata } from "next";
import { Reveal } from "@/components/primitives/Reveal";
import Link from "next/link";
import { PROCESS } from "@/data/process";
import { ArrowUpRight as Arrow } from "lucide-react";
import { PageHero } from "@/components/kit/PageHero";
import { SectionHead } from "@/components/kit/SectionHead";
import { CTABand } from "@/components/kit/CTABand";
import { ProcessTrack } from "@/components/visuals/hero/ProcessTrack";
import { GuaranteeBlock } from "@/components/sections/v4/GuaranteeBlock";
import { StickyMobileCTA } from "@/components/sections/v4/StickyMobileCTA";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { NumberTicker } from "@/components/kit/NumberTicker";
export const metadata: Metadata = {
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How Verdance Works | Done-for-You AI Booking",
    description: "Six steps from a free 30-minute pre-audit to a system that answers and books for you, day or night. Fixed quote, fixed launch date, and you own all of it.",
    url: "https://verdancesystemsai.com/how-it-works",
    type: "website",
    siteName: "Verdance Systems AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "How Verdance Works | Done-for-You AI Booking",
    description: "Six steps from a free 30-minute pre-audit to a system that answers and books for you, day or night. Fixed quote, fixed launch date, and you own all of it.",
  },
  title: "How Verdance Works | Done-for-You AI Booking",
  description:
    "Six steps from a free 30-minute pre-audit to a system that answers and books for you, day or night. Fixed quote, fixed launch date, and you own all of it.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title={
          <>
            Simple to start. <span className="italic-accent">Built to keep running.</span>
          </>
        }
        lead="Six steps from a free 30-minute pre-audit to a system that answers and books for you, day or night. You keep working the way you always have. The building is on us."
        crumbs={[{ href: "/", label: "Home" }, { label: "How it works" }]}
        visual={<ProcessTrack />}
        note="Fixed quote · fixed launch date · you own all of it"
      />

      <section className="section-pad bg-canvas-2" aria-labelledby="steps-title" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-wide">
          <SectionHead
            id="steps-title"
            eyebrow="The six steps"
            title={
              <>
                Each one names what you get, <span className="italic-accent">and when.</span>
              </>
            }
            intro="Open any step to see exactly what happens in it, what you leave with, and what we need from you."
          />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
            {PROCESS.map((step, i) => (
              <li key={step.slug}>
                <Reveal delay={i * 0.06} className="h-full">
                  <Link href={`/how-it-works/${step.slug}`} className="card-x group flex h-full flex-col p-6 md:p-7">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-[2.4rem] leading-none text-[color:var(--color-accent)]" style={{ letterSpacing: "-0.04em" }}>
                        <NumberTicker value={Number(step.n)} pad={2} />
                      </span>
                      <Arrow size={17} aria-hidden className="nudge text-[color:var(--color-ink-muted)] group-hover:text-[color:var(--color-accent)]" />
                    </div>
                    <h3 className="mt-6 font-display text-[1.4rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.025em" }}>
                      {step.name}
                    </h3>
                    <p className="mt-2 flex-1 text-[0.95rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{step.promise}</p>
                    <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[color:var(--color-ink-muted)]">{step.duration}</p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad bg-canvas" aria-labelledby="you-title" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-wide grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal variant="wipe">
            <p className="eyebrow">What you do</p>
            <h2 id="you-title" className="h2 mt-5">
              Answer a few questions. <span className="italic-accent">Then get on with your day.</span>
            </h2>
          </Reveal>
          <ul className="grid gap-3">
            {[
              ["You don't need to be technical", "You never touch the system. It answers, books and tells you what it did."],
              ["You don't change how you work", "It fits around your diary, your channels and your team."],
              ["You decide on anything unusual", "Custom requests, complaints and pricing go straight to a person."],
            ].map(([t, b], i) => (
              <li key={t}>
                <Reveal delay={i * 0.06}>
                  <div className="card-x p-5 md:p-6">
                    <p className="font-display text-[1.15rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.02em" }}>{t}</p>
                    <p className="mt-1.5 text-[0.95rem] leading-[1.55] text-[color:var(--color-ink-soft)]">{b}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <GuaranteeBlock ctaHref={GENERIC_BOOK_URL} ctaLabel="Get your free Operations Map" />
      <CTABand />
      <StickyMobileCTA href={GENERIC_BOOK_URL} label="Get your free Operations Map" />
    </>
  );
}
