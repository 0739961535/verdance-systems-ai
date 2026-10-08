import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { GENERIC_BOOK_URL } from "@/data/niches";
import { LeakCalculator } from "./LeakCalculator";
import { ChannelOrbit } from "./ChannelOrbit";

/**
 * The niche-neutral homepage story, told with type and one simple diagram
 * (the only phone on the homepage is in the hero).
 */


/* ------------------------------------------------------------------ */
/* What we do: channels -> your system -> outcomes                    */
/* ------------------------------------------------------------------ */
export function WhatWeDoSection() {
  return (
    <section className="section-pad bg-canvas" aria-labelledby="what-title" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="container-wide">
        <Reveal variant="wipe" className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">What we do</p>
            <h2 id="what-title" className="h2 mt-5">
              If your business runs on enquiries, <span className="italic-accent">none of them wait.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]">
            Customers get in touch however suits them. We build one system that catches every enquiry, wherever it lands, and does the work a good receptionist would.
          </p>
        </Reveal>

        <div className="mt-12 md:mt-16">
          <ChannelOrbit />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How it works: typographic, three steps on one rule                 */
/* ------------------------------------------------------------------ */
const STEPS = [
  {
    n: "01",
    name: "Audit",
    title: "We measure how fast you reply today.",
    body: "A free 30-minute pre-audit. We look at where your enquiries come from, how quickly they are answered and what that is costing you.",
    meta: "Free · 30 minutes",
  },
  {
    n: "02",
    name: "Build",
    title: "We build it on the channels you already use.",
    body: "Trained on your services, dates and the questions you always get. It books into your diary. Every account is in your name.",
    meta: "Fixed launch date",
  },
  {
    n: "03",
    name: "Run",
    title: "It replies, books and reports. Day or night.",
    body: "Every enquiry answered within 5 minutes. You see it all in your dashboard, and get a short monthly report in plain words and rand.",
    meta: "You own all of it",
  },
];

export function HowItWorksSection() {
  return (
    <section className="section-pad bg-canvas" aria-labelledby="how-title" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="container-wide">
        <Reveal variant="wipe" className="max-w-3xl">
          <p className="eyebrow">How it works</p>
          <h2 id="how-title" className="h2 mt-5">
            Audit. Build. <span className="italic-accent">Run.</span>
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
          {STEPS.map((s, i) => (
            <li key={s.n} className="relative pt-8" style={{ borderTop: "1px solid var(--hairline-2)" }}>
              <span aria-hidden className="absolute -top-px left-0 h-px w-16" style={{ background: "var(--accent)" }} />
              <Reveal delay={i * 0.06}>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[0.8rem] text-[color:var(--color-accent)] tabular">{s.n}</span>
                  <span className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">{s.name}</span>
                </div>
                <h3
                  className="mt-5 font-display text-[color:var(--color-ink)]"
                  style={{ fontSize: "clamp(1.5rem, 1.2vw + 1.1rem, 2rem)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
                >
                  {s.title}
                </h3>
                <p className="mt-4 text-[1rem] leading-[1.6] text-[color:var(--color-ink-soft)]">{s.body}</p>
                <p className="mt-5 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">{s.meta}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal
          delay={0.1}
          className="mt-14 flex flex-col gap-6 rounded-[22px] p-6 sm:p-8 md:mt-20 md:flex-row md:items-center md:justify-between md:p-10"
          style={{ background: "var(--bg-2)", border: "1px solid var(--hairline-2)" }}
        >
          <p
            className="font-display text-[color:var(--color-ink)]"
            style={{ fontSize: "clamp(1.5rem, 1.6vw + 1rem, 2.4rem)", lineHeight: 1.1, letterSpacing: "-0.035em" }}
          >
            No price list. <span className="italic-accent">Fixed quote after your free pre-audit.</span>
          </p>
          <a href={GENERIC_BOOK_URL} data-magnetic className="btn btn-accent min-h-12 shrink-0 justify-center">
            Book the pre-audit
            <ArrowUpRight size={16} aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* What slow replies cost                                             */
/* ------------------------------------------------------------------ */
export function CostSection() {
  return (
    <section className="section-pad bg-canvas" aria-labelledby="cost-title" id="calculator" style={{ borderTop: "1px solid var(--hairline)", scrollMarginTop: "5rem" }}>
      <div className="container-wide">
        <Reveal variant="wipe" className="max-w-3xl">
          <p className="eyebrow">Your numbers</p>
          <h2 id="cost-title" className="h2 mt-5">
            What a slow reply <span className="italic-accent">costs you.</span>
          </h2>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]">
            Most people who get no answer do not wait. They try the next business. Two numbers about yours:
          </p>
        </Reveal>
        <Reveal delay={0.06} className="mt-10">
          <LeakCalculator />
        </Reveal>
      </div>
    </section>
  );
}
