"use client";

import { Reveal } from "@/components/primitives/Reveal";
import { WHY_VERDANCE } from "@/data/site";

const ICONS = [
  (
    <svg key="i1" width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M4 18l6-12h8l6 12-10 6-10-6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M14 6v18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  (
    <svg key="i2" width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9 14l4 4 7-8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  (
    <svg key="i3" width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M14 8v6l4 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  (
    <svg key="i4" width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M14 4l9 5v10l-9 5-9-5V9l9-5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
];

export function WhyVerdance() {
  return (
    <section className="relative section-pad bg-canvas-2">
      <div className="container-wide">
        <Reveal>
          <span className="eyebrow">Why Verdance</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 headline-section max-w-[16ch]">
            Built different -{" "}
            <span className="italic-accent">on purpose.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {WHY_VERDANCE.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.06}>
              <div className="surface p-8 h-full surface-card-hover">
                <div
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border"
                  style={{
                    borderColor: "rgba(var(--accent-rgb),0.30)",
                    background: "rgba(var(--accent-rgb),0.06)",
                    color: "var(--color-accent)",
                  }}
                >
                  {ICONS[i]}
                </div>
                <h3 className="mt-6 font-display text-xl font-medium text-[color:var(--color-ink)]">
                  {w.title}
                </h3>
                <p className="mt-3 text-[color:var(--color-ink-soft)] leading-relaxed">
                  {w.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
