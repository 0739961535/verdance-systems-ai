"use client";

import { Reveal } from "@/components/primitives/Reveal";
import { StatCounter } from "@/components/primitives/StatCounter";
import { AnimatedDivider } from "@/components/primitives/AnimatedDivider";
import { PROBLEM_STATS } from "@/data/site";

export function ProblemSection() {
  return (
    <section className="relative section-pad bg-canvas">
      <div className="container-wide">
        <Reveal>
          <span className="eyebrow eyebrow-muted">The problem</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 headline-section max-w-[18ch]">
            Every missed call is a customer{" "}
            <span className="italic-accent">who called someone else.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-2xl text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
            Most local businesses lose 20–40% of their enquiries — calls during a
            treatment, messages after hours, quotes that never got a follow-up. You
            already paid to get those leads. They&apos;re slipping away quietly, every
            week.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {PROBLEM_STATS.map((s, i) => (
            <Reveal key={s.label} delay={0.15 + i * 0.08}>
              <div className="relative overflow-hidden surface surface-card-hover p-8 md:p-9 h-full">
                <div
                  className="font-display text-5xl md:text-6xl font-medium tracking-tight text-[color:var(--color-ink)]"
                  style={{ textShadow: "0 0 30px rgba(var(--accent-rgb),0.15)" }}
                >
                  {s.numeric ? (
                    <>
                      <StatCounter to={s.numeric} duration={1.6} />
                      {s.suffix}
                    </>
                  ) : (
                    s.value
                  )}
                </div>
                <div
                  className="mt-3 h-px w-12"
                  style={{ background: "var(--color-accent)" }}
                />
                <div className="mt-4 text-[color:var(--color-ink-soft)] text-base md:text-lg">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <AnimatedDivider variant="accent" />
        </div>
      </div>
    </section>
  );
}
