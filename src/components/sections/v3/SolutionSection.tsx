"use client";

/**
 * SolutionSection - REPLACED.
 * Now uses live WhatsAppDemo + CalendarDemo instead of static reveals.
 *
 * Caller: src/app/page.tsx
 */

import { Reveal } from "@/components/primitives/Reveal";
import { WhatsAppDemo } from "@/components/demos/WhatsAppDemo";
import { CalendarDemo } from "@/components/demos/CalendarDemo";
import { DemoFrame } from "@/components/demos/DemoFrame";

export function SolutionSection() {
  return (
    <section className="relative section-pad bg-ambient-soft overflow-hidden">
      <div className="container-wide">
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow">The solution</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 headline-section max-w-[16ch]">
              We plug the leak -{" "}
              <span className="italic-accent">automatically.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-xl text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
              Verdance catches every lead the moment it arrives and books it for you.
              It replies in seconds, answers the usual questions, and fills your
              calendar - nights, weekends, and lunch breaks included.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] items-start">
          <Reveal delay={0.05}>
            <DemoFrame>
              <div className="p-7 md:p-8">
                <WhatsAppDemo />
              </div>
            </DemoFrame>
          </Reveal>
          <Reveal delay={0.12}>
            <DemoFrame>
              <CalendarDemo />
            </DemoFrame>
          </Reveal>
        </div>

        <Reveal delay={0.18}>
          <div className="mt-10 max-w-2xl">
            <p className="text-[color:var(--color-ink-soft)] leading-relaxed">
              On one side - the conversation. On the other - the booking. Both
              happen automatically, on-brand, and inside the system you already
              use.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
