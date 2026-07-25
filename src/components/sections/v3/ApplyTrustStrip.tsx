"use client";

import { Reveal } from "@/components/primitives/Reveal";
import { FAQAccordion } from "@/components/primitives/FAQAccordion";

const BADGES = [
  "POPIA-compliant",
  "Data stays in your CRM",
  "No spam - us only",
  "Free build before you pay",
];

const FAQS = [
  {
    q: "What happens after I apply?",
    a: "We review every application personally - usually within 4 hours. Once you pick a time on the booking widget, you'll get a confirmation in your inbox and on WhatsApp. On the call we walk you through exactly what we'd build on your business - no slides, no pitch deck, just the working system.",
  },
  {
    q: "Is there a cost?",
    a: "No. The walkthrough is free, and so is the demo we build on your business. You only pay once it's live, integrated, and booking customers for you. If you decide it's not for you, we shake hands and part ways - no contracts.",
  },
  {
    q: "How long is the call?",
    a: "About 30 minutes. We spend the first 10 understanding how leads currently land with you, then 20 minutes showing you the system tailored to your business - phone, website, follow-up, calendar - all wired together.",
  },
];

export function ApplyTrustStrip() {
  return (
    <section className="relative section-pad-sm bg-canvas overflow-hidden">
      <div className="container-narrow">
        {/* Trust badges row */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {BADGES.map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em]"
                style={{
                  borderColor: "var(--color-hairline-2)",
                  background: "rgba(var(--hairline-rgb),0.02)",
                  color: "var(--color-ink-soft)",
                }}
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{
                    background: "var(--color-accent)",
                    boxShadow: "0 0 6px rgba(var(--accent-rgb),0.55)",
                  }}
                />
                {label}
              </span>
            ))}
          </div>
        </Reveal>

        {/* FAQ */}
        <Reveal delay={0.08} className="mt-14">
          <div className="text-center">
            <span className="eyebrow">Quick answers</span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-[color:var(--color-ink)]">
              Before you apply.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.14} className="mt-8">
          <FAQAccordion items={FAQS} />
        </Reveal>
      </div>
    </section>
  );
}
