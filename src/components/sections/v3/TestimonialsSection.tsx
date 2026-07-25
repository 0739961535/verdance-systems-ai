"use client";

/**
 * "The Verdance promise" - an honest trust beat for a hands-on, early-stage
 * team. No fabricated testimonials or invented metrics; just the real
 * commitments that de-risk working with us. (Swap in real client quotes here
 * once they're available.)
 */

import { Reveal } from "@/components/primitives/Reveal";
import { Map, Wrench, Sparkles } from "lucide-react";

const PROMISES = [
  {
    icon: Map,
    title: "See the plan before you pay",
    body: "On a free consult we map exactly what we'd build and what it's worth. If it isn't right for you, we'll tell you.",
  },
  {
    icon: Wrench,
    title: "We run it, you own it",
    body: "We build, connect and maintain the whole system. It's yours - no lock-in, no jargon, nothing to learn.",
  },
  {
    icon: Sparkles,
    title: "Answered like you'd answer",
    body: "Trained on your services, your prices and your tone - so every reply sounds like your business, not a robot.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative section-pad bg-canvas overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(var(--accent-rgb),0.06), transparent 60%)",
        }}
      />

      <div className="container-wide">
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow">The Verdance promise</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 headline-section max-w-[20ch]">
              No hype, no lock-in -{" "}
              <span className="italic-accent">just a system that answers.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
              We&apos;re a small, hands-on team - so you get real attention and a
              system built properly, not a template and a login.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {PROMISES.map((p, i) => (
            <Reveal key={p.title} delay={0.1 + i * 0.08}>
              <div
                className="group relative flex h-full flex-col rounded-2xl border p-8 transition-all duration-300"
                style={{ background: "var(--color-bg-3)", borderColor: "var(--color-hairline)" }}
              >
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ background: "rgba(var(--accent-rgb),0.10)", color: "var(--color-accent)" }}
                >
                  <p.icon size={20} strokeWidth={1.9} />
                </span>
                <h3 className="mt-5 font-display text-xl font-medium tracking-tight text-[color:var(--color-ink)]">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-[color:var(--color-ink-soft)]">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
