"use client";

import { Reveal } from "@/components/primitives/Reveal";
import { MagneticButton } from "@/components/primitives/MagneticButton";
import { ConicBorder } from "@/components/primitives/ConicBorder";

// Risk-reversal section. The whole objection an owner has ("what if I pay and
// it doesn't work?") answered by flipping the model: we build first, you pay
// only once it books. Framed as three plain terms of the deal.
const TERMS = [
  {
    k: "First",
    t: "A free consult.",
    d: "We get on a call and learn how you win and lose customers today - and exactly where the money is leaking.",
  },
  {
    k: "Then",
    t: "We map out what we'd build.",
    d: "You get a clear plan: what we'd build for your business, how it works, and what it's worth. No obligation to go ahead.",
  },
  {
    k: "Then",
    t: "We build it out.",
    d: "Once you're happy with the plan, we build, launch and run the whole system for you - usually live within days.",
  },
];

export function TheOffer() {
  return (
    <section className="relative section-pad bg-canvas">
      <div className="container-wide">
        <ConicBorder
          glow="#4F8DFF"
          duration={0}
          radius={26}
          surface="var(--color-bg-3)"
          border="rgba(var(--accent-rgb),0.20)"
          halo
        >
          <div className="relative p-8 md:p-14">
            <Reveal>
              <span className="eyebrow">How we start</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 headline-section max-w-[22ch]">
                A free consult, then{" "}
                <span className="italic-accent">a clear plan before you commit.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-2xl text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
                No pressure and no guesswork. We start with a free consultation,
                map out exactly what we&apos;d build for your business and what it&apos;s
                worth - then, if it makes sense, we build it out.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
              {TERMS.map((p, i) => (
                <Reveal key={i} delay={0.15 + i * 0.08}>
                  <div className="relative h-full">
                    <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-accent)]">
                      {p.k}
                    </div>
                    <h3 className="mt-4 font-display text-xl md:text-2xl font-medium tracking-tight text-[color:var(--color-ink)]">
                      {p.t}
                    </h3>
                    <p className="mt-3 text-[color:var(--color-ink-soft)] leading-relaxed">
                      {p.d}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.24}>
              <div className="mt-14 flex flex-wrap items-center gap-x-5 gap-y-4">
                <MagneticButton href="/contact" variant="accent">
                  Book your free consult
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </MagneticButton>
                <span className="text-sm text-[color:var(--color-ink-muted)]">
                  Free consult · Clear plan · No obligation
                </span>
              </div>
            </Reveal>
          </div>
        </ConicBorder>
      </div>
    </section>
  );
}
