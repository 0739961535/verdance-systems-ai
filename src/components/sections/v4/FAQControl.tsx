"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/primitives/Reveal";
import { LANDING_FAQS } from "@/data/landing";
import { SITE } from "@/data/site";

/**
 * FAQControl - editorial-width accordion. One open at a time; panels
 * animate via grid-template-rows (no layout-thrash height tweens);
 * the plus icon's 45-degree turn is the one permitted rotation.
 */
export function FAQControl() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-pad bg-canvas" aria-labelledby="faq-title">
      <div className="mx-auto w-full max-w-[880px] px-5 md:px-10">
        <Reveal>
          <span className="eyebrow">Questions</span>
          <h2
            id="faq-title"
            className="font-display text-[color:var(--color-ink)] mt-4"
            style={{ fontSize: "clamp(1.9rem, 3.2vw + 1.2rem, 3.5rem)", lineHeight: 1.06, letterSpacing: "-0.035em" }}
          >
            Asked <span className="italic-accent">before</span> booking.
          </h2>
        </Reveal>

        <div className="mt-10">
          {LANDING_FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={Math.min(i * 0.04, 0.2)}>
                <div style={{ borderBottom: "1px solid var(--hairline)", borderTop: i === 0 ? "1px solid var(--hairline)" : undefined }}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left cursor-pointer min-h-14"
                  >
                    <span className="font-medium text-[color:var(--color-ink)]">{f.q}</span>
                    <Plus
                      size={16}
                      aria-hidden
                      className="shrink-0 text-[color:var(--color-ink-muted)]"
                      style={{ transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.2s var(--ease-luxury)" }}
                    />
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-label={f.q}
                    className="grid"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", transition: "grid-template-rows 0.3s var(--ease-luxury)" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 max-w-[62ch] text-[0.95rem] leading-[1.65] text-[color:var(--color-ink-soft)]">
                        {f.a}
                      </p>
                    </div>
                  </div>
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
              className="font-medium text-[color:var(--color-accent)]"
            >
              Ask on WhatsApp →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
