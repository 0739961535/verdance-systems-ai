"use client";

/**
 * HomeDashboardSection - live operations dashboard between WhyVerdance & CapabilitySuite.
 *
 * Caller: src/app/page.tsx
 */

import { Reveal } from "@/components/primitives/Reveal";
import { AgentDashboardDemo } from "@/components/demos/AgentDashboardDemo";
import { DemoFrame } from "@/components/demos/DemoFrame";

export function HomeDashboardSection() {
  return (
    <section className="relative section-pad bg-canvas overflow-hidden">
      <div className="container-wide grid gap-12 lg:grid-cols-[1fr_1.2fr] items-center">
        <div>
          <Reveal>
            <span className="eyebrow">See what it&rsquo;s doing</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 headline-section max-w-[16ch]">
              Every action, in <span className="italic-accent">one live view.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
              Conversations, replies, bookings, reactivations. You see exactly
              what the system is doing - in the same place, 24/7. No spreadsheets,
              no guessing.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-7 space-y-3 text-[color:var(--color-ink-soft)]">
              {[
                "Live conversations across every channel",
                "Bookings, callbacks, and reactivations as they happen",
                "Reply-rate, response-time, conversion trends",
              ].map((t, i) => (
                <li key={i} className="flex items-center gap-3 text-[14.5px]">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--color-accent)" }}
                  />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <DemoFrame>
            <AgentDashboardDemo />
          </DemoFrame>
        </Reveal>
      </div>
    </section>
  );
}
