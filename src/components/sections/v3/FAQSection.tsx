"use client";

import { Reveal } from "@/components/primitives/Reveal";
import { FAQAccordion } from "@/components/primitives/FAQAccordion";
import { FAQS } from "@/data/site";

export function FAQSection() {
  return (
    <section className="relative section-pad bg-canvas">
      <div className="container-narrow">
        <Reveal>
          <span className="eyebrow">FAQs</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 headline-section max-w-[18ch]">
            Quick answers, <span className="italic-accent">straight up.</span>
          </h2>
        </Reveal>

        <div className="mt-14">
          <FAQAccordion items={FAQS} />
        </div>
      </div>
    </section>
  );
}
