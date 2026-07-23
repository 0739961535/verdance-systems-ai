"use client";

import { Reveal } from "@/components/primitives/Reveal";
import { MagneticButton } from "@/components/primitives/MagneticButton";
import { ConicBorder } from "@/components/primitives/ConicBorder";

export function FinalCTA() {
  return (
    <section className="relative section-pad-sm bg-canvas overflow-hidden">
      {/* Site-bottom ambient — a single static gilt glow, no motion */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-1/3"
          style={{
            width: 760, height: 420, transform: "translate(-50%,-50%)", borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(var(--accent-rgb),0.13), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-40"
             style={{ background: "linear-gradient(to bottom, var(--color-bg), transparent)" }} />
        <div className="absolute inset-x-0 bottom-0 h-40"
             style={{ background: "linear-gradient(to top, var(--color-bg), transparent)" }} />
      </div>

      <div className="container-wide">
        <ConicBorder
          glow="#4F8DFF"
          duration={0}
          inset={1}
          radius={24}
          surface="var(--color-bg-3)"
          border="rgba(var(--accent-rgb), 0.20)"
          halo
        >
        <div className="relative overflow-hidden p-10 md:p-16 lg:p-20">
          {/* Spotlight / Lamp effect */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-full -z-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(var(--accent-rgb),0.20), transparent 60%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(var(--accent-rgb),0.8), transparent)",
            }}
          />
          {/* lamp light beam */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[300px] w-[600px] opacity-50 animate-glow-pulse -z-0"
            style={{
              background:
                "conic-gradient(from 90deg at 50% 0%, transparent, rgba(var(--accent-rgb),0.18), transparent)",
              filter: "blur(40px)",
            }}
          />

          <div className="relative">
            <Reveal>
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.3em] backdrop-blur"
                style={{
                  borderColor: "rgba(var(--accent-rgb),0.3)",
                  background: "rgba(var(--accent-rgb),0.04)",
                  color: "var(--color-accent)",
                }}
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--color-accent)" }}
                />
                Free consult · No obligation
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-8 font-display font-medium leading-[1.04] text-4xl md:text-6xl lg:text-7xl tracking-tight max-w-[18ch] text-[color:var(--color-ink)]">
                Let&apos;s map out{" "}
                <span className="italic-accent">what we&apos;d build for you.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-2xl text-lg md:text-xl text-[color:var(--color-ink-soft)] leading-relaxed">
                Start with a free consult. We&apos;ll show you exactly where
                you&apos;re losing customers and what we&apos;d build to fix it —
                then you decide.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <MagneticButton href="/contact" variant="accent">
                  Book your free consult
                  <Arrow />
                </MagneticButton>
                <a href="/how-it-works" className="btn btn-ghost">
                  See how it works
                </a>
              </div>
            </Reveal>
          </div>
        </div>
        </ConicBorder>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
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
