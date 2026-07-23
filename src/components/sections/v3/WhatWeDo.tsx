"use client";

import { Reveal } from "@/components/primitives/Reveal";
import { PhoneCall, MessagesSquare, CalendarCheck } from "lucide-react";

// The plain-language "what we actually do" explainer. Three jobs a lead moves
// through — Answer → Follow up → Book — stated so a non-technical owner gets it
// in five seconds. Deliberately simple; the live demos below prove each one.
const JOBS = [
  {
    icon: PhoneCall,
    title: "Answer",
    line: "Every call, text and website message — answered in seconds, 24/7, in your business's own voice.",
  },
  {
    icon: MessagesSquare,
    title: "Follow up",
    line: "Every lead chased until they decide — including the ones you'd normally forget to call back.",
  },
  {
    icon: CalendarCheck,
    title: "Book",
    line: "Qualified customers dropped straight into your calendar. You just show up and do the work.",
  },
];

export function WhatWeDo() {
  return (
    <section className="relative section-pad bg-canvas">
      <div className="container-wide">
        <Reveal>
          <span className="eyebrow">What we do</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 headline-section max-w-[20ch]">
            One system that does the three jobs{" "}
            <span className="italic-accent">you never have time for.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-2xl text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
            No new software to learn and no change to how you work. We install an AI
            system that answers, follows up, and books — then simply hands you the
            customers.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {JOBS.map((j, i) => {
            const Icon = j.icon;
            return (
              <Reveal key={j.title} delay={0.15 + i * 0.1}>
                <div className="relative h-full surface surface-card-hover p-8 md:p-9">
                  <div className="flex items-center gap-4">
                    <span
                      className="grid place-items-center h-12 w-12 rounded-xl shrink-0"
                      style={{
                        background: "rgba(var(--accent-rgb),0.10)",
                        border: "1px solid rgba(var(--accent-rgb),0.24)",
                        color: "var(--color-accent)",
                      }}
                    >
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-[color:var(--color-ink)]">
                      {j.title}
                    </h3>
                  </div>
                  <p className="mt-6 text-[color:var(--color-ink-soft)] leading-relaxed">
                    {j.line}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
