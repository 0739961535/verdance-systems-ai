"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { SITE } from "@/data/site";

/**
 * FAQControl: editorial-width accordion. One panel open at a time.
 * Panels stay mounted (so aria-controls always resolves) and animate
 * height with framer-motion; closed panels are inert so hidden links
 * cannot take focus. Arrow keys, Home and End move between questions.
 * Reduced motion: panels switch instantly.
 */
interface FAQControlProps {
  faqs: { q: string; a: string }[];
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function FAQControl({ faqs }: FAQControlProps) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const baseId = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = faqs.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown") next = i === last ? 0 : i + 1;
    else if (e.key === "ArrowUp") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      buttons.current[next]?.focus();
    }
  };

  return (
    <section className="section-pad bg-canvas" aria-labelledby="faq-title">
      <div className="mx-auto w-full max-w-[880px] px-5 md:px-10">
        <Reveal>
          <p className="eyebrow">Questions</p>
          <h2 id="faq-title" className="h2 mt-5">
            Asked <span className="italic-accent">before</span> booking.
          </h2>
        </Reveal>

        <div className="mt-10 border-t" style={{ borderColor: "var(--hairline)" }}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const btnId = `${baseId}-q-${i}`;
            const panelId = `${baseId}-a-${i}`;
            return (
              <Reveal key={f.q} delay={Math.min(i * 0.04, 0.2)}>
                <div className="border-b" style={{ borderColor: "var(--hairline)" }}>
                  <h3 className="m-0">
                    <button
                      ref={(el) => {
                        buttons.current[i] = el;
                      }}
                      id={btnId}
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      onKeyDown={(e) => onKeyDown(e, i)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="group flex min-h-14 w-full cursor-pointer items-center justify-between gap-6 py-5 text-left"
                    >
                      <span
                        className="text-[1rem] font-medium leading-snug transition-colors duration-150 md:text-[1.0625rem]"
                        style={{ color: isOpen ? "var(--color-ink)" : "var(--color-ink-soft)" }}
                      >
                        <span className="group-hover:text-[color:var(--color-ink)]">{f.q}</span>
                      </span>
                      <span
                        aria-hidden
                        className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors duration-150 group-hover:border-[color:var(--hairline-glow)]"
                        style={{
                          borderColor: isOpen ? "var(--hairline-glow)" : "var(--hairline-2, var(--hairline))",
                          color: isOpen ? "var(--color-accent)" : "var(--color-ink-muted)",
                        }}
                      >
                        <Plus
                          size={14}
                          strokeWidth={1.5}
                          className="absolute transition-all duration-200"
                          style={{ opacity: isOpen ? 0 : 1, transform: isOpen ? "scale(0.6)" : "none" }}
                        />
                        <Minus
                          size={14}
                          strokeWidth={1.5}
                          className="absolute transition-all duration-200"
                          style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? "none" : "scale(0.6)" }}
                        />
                      </span>
                    </button>
                  </h3>
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    aria-hidden={!isOpen}
                    inert={!isOpen}
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : {
                            height: { duration: 0.36, ease: EASE },
                            opacity: { duration: isOpen ? 0.28 : 0.16, delay: isOpen ? 0.06 : 0 },
                          }
                    }
                    style={{ overflow: "hidden" }}
                  >
                    <p className="max-w-[62ch] pb-6 pr-12 text-[0.95rem] leading-[1.65] text-[color:var(--color-ink-soft)]">
                      {f.a}
                    </p>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 text-[0.9rem] text-[color:var(--color-ink-soft)]">
            Still deciding?{" "}
            <a
              href={SITE.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1 font-medium text-[color:var(--color-accent)] underline-offset-4 hover:underline"
            >
              Ask on WhatsApp
              <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden />
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
