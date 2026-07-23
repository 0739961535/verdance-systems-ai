"use client";

/**
 * HomePipelineSection — 5-step Missed-Revenue Recovery pipeline.
 * Bigger, full-bleed surface, generous vertical padding, clear break from hero.
 *
 * Layout: copy block above (centered) → giant pipeline visual below, full width.
 * No more cramped side-by-side grid that competed with the hero.
 */

import { Reveal } from "@/components/primitives/Reveal";
import { PipelineDemo } from "@/components/demos/PipelineDemo";
import { MagneticButton } from "@/components/primitives/MagneticButton";

export function HomePipelineSection() {
  return (
    <section className="relative section-pad bg-ambient-soft overflow-hidden">
      {/* Top divider — clean break from the hero */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(var(--accent-rgb),0.4) 30%, rgba(var(--accent-rgb),0.4) 70%, transparent)",
        }}
      />

      <div className="container-wide">
        {/* Title block — wider, centered, generous spacing */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <Reveal>
            <span className="eyebrow">Live · See the system work</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 headline-section">
              From inbound to booked —{" "}
              <span className="italic-accent">automatically.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 text-lg md:text-xl text-[color:var(--color-ink-soft)] leading-relaxed">
              Watch the system turn a single inbound message into a confirmed
              booking — without a human touching it. Every lead, every channel,
              every hour.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <MagneticButton href="/contact" variant="accent">
                See it on your business
              </MagneticButton>
              <MagneticButton href="/how-it-works" variant="ghost">
                How it works
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        {/* Giant pipeline visual — full width within container */}
        <Reveal delay={0.2}>
          <PipelineDemo size="xl" />
        </Reveal>
      </div>
    </section>
  );
}
