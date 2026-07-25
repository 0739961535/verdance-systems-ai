"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/primitives/Reveal";
import { ConicBorder } from "@/components/primitives/ConicBorder";

export function FounderTeaser() {
  const reduce = useReducedMotion();
  return (
    <section className="relative section-pad bg-canvas overflow-hidden">
      <div className="container-wide grid gap-14 md:grid-cols-[1fr_1.2fr] items-center">
        <Reveal>
          <div className="relative">
            <ConicBorder
              glow="#4F8DFF"
              duration={11}
              inset={1}
              radius={20}
              surface="var(--color-bg-glass)"
              border="rgba(var(--accent-rgb), 0.16)"
              halo
            >
              <div className="aspect-[4/5] w-full overflow-hidden relative">
                <div className="absolute inset-0"
                     style={{ background: "linear-gradient(135deg, rgba(var(--accent-rgb),0.16), rgba(var(--accent-deep-rgb),0.10) 60%, rgba(var(--bg-rgb),0.7))" }} />
                <motion.div
                  className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(var(--accent-rgb),0.22), transparent 60%)", filter: "blur(20px)" }}
                  animate={reduce ? undefined : { x: [0, 20, -10, 0], y: [0, 10, -10, 0] }}
                  transition={reduce ? undefined : { duration: 14, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute inset-0 opacity-50"
                     style={{
                       backgroundImage:
                         "linear-gradient(to right, rgba(var(--hairline-rgb),0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(var(--hairline-rgb),0.04) 1px, transparent 1px)",
                       backgroundSize: "32px 32px",
                       maskImage:
                         "radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 80%)",
                     }} />
                <div className="absolute inset-0 flex flex-col justify-between p-7">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur"
                          style={{ background: "rgba(var(--bg-rgb),0.7)", border: "1px solid var(--color-hairline-2)" }}>
                      <span className="inline-block h-1.5 w-1.5 rounded-full"
                            style={{ background: "var(--color-accent)", boxShadow: "0 0 8px rgba(var(--accent-rgb),0.7)" }} />
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink)]">
                        Remote-first · Worldwide
                      </span>
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
                      Founder · 01
                    </span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="font-display leading-[0.85] tracking-[-0.06em] text-[color:var(--color-ink)]"
                           style={{ fontSize: "clamp(5rem, 10vw, 9rem)", textShadow: "0 0 60px rgba(var(--accent-rgb),0.32)" }}>
                        D<span className="italic-accent">b</span>
                      </div>
                      <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-soft)]">
                        Daniel Bouwer
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
                        Verdance · Founder & Operator
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-col items-end gap-1 text-right">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
                        Building since
                      </span>
                      <span className="font-display text-2xl text-[color:var(--color-ink)]">2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </ConicBorder>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow">Founder</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 headline-section max-w-[18ch]">
              Started from nothing.{" "}
              <span className="italic-accent">
                Now building for businesses worldwide.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-xl text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
              I started this from a bedroom in Pretoria, paused university, and went
              all in on helping local businesses stop losing customers to bad
              follow-up. Verdance is what came out of that obsession.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 font-medium text-[color:var(--color-ink)] group"
            >
              <span className="border-b border-white/40 group-hover:border-[color:var(--color-accent)] group-hover:text-[color:var(--color-accent)] transition-colors">
                Book a call with us
              </span>
              <Arrow />
            </Link>
          </Reveal>
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
