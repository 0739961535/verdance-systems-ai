"use client";

import { Reveal } from "@/components/primitives/Reveal";
import { FAQAccordion } from "@/components/primitives/FAQAccordion";

const BADGES = [
  "POPIA-compliant",
  "Data stays in your CRM",
  "No spam, only us",
  "Free Operations Map first",
];

const FAQS = [
  {
    q: "What happens after I apply?",
    a: "We review every application personally, usually within 4 hours. Once you pick a time on the booking widget, you'll get a confirmation in your inbox and on WhatsApp. On the call we look at how your enquiries, follow-ups and admin really run, and show you what we would build. No slides and no pitch deck.",
  },
  {
    q: "Is there a cost?",
    a: "The walkthrough and the Operations Map are free, and the map is yours to keep. If you want us to build, you get a fixed quote in writing, and two guarantees: every month that misses 99% of enquiries answered within 60 seconds is credited, and you can leave at day 90 if it has not paid for itself.",
  },
  {
    q: "How long is the call?",
    a: "About 30 minutes. We spend the first 10 understanding how leads currently land with you, then 20 minutes showing you the system for your business: phone, website, follow-up and calendar, working together.",
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
