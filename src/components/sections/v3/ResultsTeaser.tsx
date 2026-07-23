"use client";

import Link from "next/link";
import { Reveal } from "@/components/primitives/Reveal";
import { AnimatedDivider } from "@/components/primitives/AnimatedDivider";

export function ResultsTeaser() {
  return (
    <section className="relative section-pad bg-canvas-2">
      <div className="container-wide">
        <div className="grid gap-14 md:grid-cols-[1.1fr_1fr] items-center">
          <div>
            <Reveal>
              <span className="eyebrow">Results / ROI</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 headline-section max-w-[14ch]">
                What it&apos;s <span className="italic-accent">worth.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-xl text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
                If you book just a handful of extra appointments a month from leads
                you were already losing, the system pays for itself many times over.
                Tell us your numbers on the demo call and we&apos;ll show you the math
                for your business.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <Link
              href="/results"
              className="group block surface p-8 surface-card-hover"
            >
              <div className="flex items-center justify-between">
                <span className="eyebrow">Featured case study</span>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
                  001
                </span>
              </div>
              <h3 className="mt-5 font-display text-3xl font-medium leading-tight text-[color:var(--color-ink)]">
                Sky Dounny
              </h3>
              <p className="mt-3 text-[color:var(--color-ink-soft)] leading-relaxed">
                A complete operating system: GHL CRM, WhatsApp automation, invoice
                generation, and a new website — built to handle every inbound enquiry
                without missing one.
              </p>
              <div className="mt-7 grid grid-cols-3 gap-3">
                {[
                  { k: "CRM", v: "GHL" },
                  { k: "Channel", v: "WhatsApp" },
                  { k: "Stack", v: "Web + Invoice" },
                ].map((p) => (
                  <div
                    key={p.k}
                    className="rounded-lg p-3 border"
                    style={{
                      borderColor: "var(--color-hairline)",
                      background: "rgba(var(--hairline-rgb),0.02)",
                    }}
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
                      {p.k}
                    </div>
                    <div className="mt-1 font-display text-sm font-medium text-[color:var(--color-ink)]">
                      {p.v}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-ink)] group-hover:gap-3 group-hover:text-[color:var(--color-accent)] transition-all">
                See full case study
                <Arrow />
              </div>
            </Link>
          </Reveal>
        </div>

        <div className="mt-20">
          <AnimatedDivider variant="accent" />
        </div>
      </div>
    </section>
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
