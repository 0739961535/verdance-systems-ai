"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { PROCESS } from "@/data/process";

/**
 * DeliveryMethod - the numbered 01-06 process as product.
 *
 * The animation is one idea, done properly: a hairline spine that draws
 * itself as you scroll, with each step's marker filling the moment the line
 * reaches it. Nothing flies in from the side and nothing bounces. The line is
 * the only thing that moves, which is what makes it read as craft rather than
 * as a template.
 *
 * Scroll progress drives everything, so scrubbing back up reverses it exactly.
 * Under prefers-reduced-motion the spine is simply drawn and every marker is
 * filled, with no scroll binding at all.
 */

function Marker({ progress, threshold }: { progress: MotionValue<number>; threshold: number }) {
  // Fills over a short band just before the line arrives, so the marker is
  // already lit as the line touches it rather than a beat late.
  const fill = useTransform(progress, [threshold - 0.04, threshold], [0, 1]);
  const scale = useTransform(fill, [0, 1], [0.7, 1]);

  return (
    <span aria-hidden className="absolute -left-[5px] top-[0.55rem] w-[9px] h-[9px]">
      <span
        className="absolute inset-0 rounded-full"
        style={{ background: "var(--bg-2)", border: "1px solid var(--hairline-2)" }}
      />
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{
          opacity: fill,
          scale,
          background: "var(--color-accent)",
          boxShadow: "0 0 0 3px rgba(var(--accent-rgb), 0.12)",
        }}
      />
    </span>
  );
}

export function DeliveryMethod() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();

  // Starts drawing when the list is three quarters down the viewport and
  // finishes a little before the last step leaves, so the line lands on the
  // final marker rather than completing off screen.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.78", "end 0.65"],
  });

  // A little spring stops the line twitching on trackpads and momentum scroll.
  const drawn = useSpring(scrollYProgress, { stiffness: 130, damping: 30, mass: 0.35 });

  return (
    <section
      className="section-pad band-texture"
      style={{ background: "var(--bg-2)" }}
      aria-labelledby="process-title"
    >
      <div className="container-narrow grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 self-start">
          <Reveal>
            <span className="eyebrow">How we deliver</span>
            <h2
              id="process-title"
              className="font-display text-[color:var(--color-ink)] mt-4 max-w-[16ch]"
              style={{ fontSize: "clamp(1.9rem, 3.2vw + 1.2rem, 3.5rem)", lineHeight: 1.06, letterSpacing: "-0.035em" }}
            >
              A method, not a <span className="italic-accent">maybe</span>.
            </h2>
            <p className="mt-5 max-w-md text-[color:var(--color-ink-soft)]" style={{ lineHeight: 1.6 }}>
              Six steps, each with a named deliverable and a date. You always know what
              exists, what&apos;s next and what it costs.
            </p>
            <p className="mt-4 max-w-md text-[0.9rem] text-[color:var(--color-ink-muted)]">
              Open any step to see exactly what happens in it.
            </p>
          </Reveal>
        </div>

        <ol ref={listRef} className="relative">
          {/* the unlit track */}
          <span
            aria-hidden
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{ background: "var(--hairline-2)" }}
          />
          {/* the same line, drawn by scroll */}
          <motion.span
            aria-hidden
            className="absolute left-0 top-0 bottom-0 w-px origin-top"
            style={{
              scaleY: reduce ? 1 : drawn,
              background:
                "linear-gradient(to bottom, rgba(var(--accent-rgb),0.15), rgba(var(--accent-rgb),0.85))",
            }}
          />

          {PROCESS.map((step, i) => (
            <li key={step.n} className="relative pl-7 md:pl-10 pb-10 last:pb-0">
              {reduce ? (
                <span
                  aria-hidden
                  className="absolute -left-[5px] top-[0.55rem] w-[9px] h-[9px] rounded-full"
                  style={{ background: "var(--color-accent)" }}
                />
              ) : (
                <Marker progress={drawn} threshold={(i + 0.6) / PROCESS.length} />
              )}

              <Reveal delay={i * 0.04}>
                <Link
                  href={`/how-it-works/${step.slug}`}
                  className="group block rounded-xl -m-3 p-3 transition-colors hover:bg-[rgba(var(--accent-rgb),0.04)] focus-visible:bg-[rgba(var(--accent-rgb),0.06)]"
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className="font-mono transition-colors group-hover:text-[color:var(--color-accent)]"
                      style={{
                        fontSize: "clamp(1.5rem, 1.6vw + 1.1rem, 2.25rem)",
                        color: "rgba(var(--accent-rgb), 0.35)",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {step.n}
                    </span>
                    <h3
                      className="font-display text-[color:var(--color-ink)] flex items-center gap-1.5"
                      style={{ fontSize: "clamp(1.2rem, 1vw + 1rem, 1.6rem)" }}
                    >
                      {step.name}
                      <ArrowUpRight
                        size={16}
                        aria-hidden
                        className="text-[color:var(--color-accent)] opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                      />
                    </h3>
                  </div>
                  <p className="mt-2 max-w-md text-[0.95rem] leading-[1.6] text-[color:var(--color-ink-soft)]">
                    {step.desc}
                  </p>
                  <p className="mt-2 font-mono text-[0.75rem] tracking-[0.1em] text-[color:var(--color-ink-muted)]">
                    {step.meta}
                  </p>
                </Link>
              </Reveal>

              {i === 0 && (
                <Reveal delay={0.08}>
                  <Link
                    href="/contact"
                    className="mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[0.78rem] uppercase tracking-[0.14em] text-[color:var(--color-accent)]"
                    style={{ border: "1px solid rgba(var(--accent-rgb), 0.4)" }}
                  >
                    Start here, book a meeting
                    <ArrowUpRight size={13} aria-hidden />
                  </Link>
                </Reveal>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
