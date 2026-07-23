"use client";

/**
 * HowItWorksDemos — five steps, each paired with the matching live demo.
 * Replaces the previous static 5-step grid on /how-it-works.
 *
 * Caller: src/app/how-it-works/page.tsx
 */

import React from "react";
import { Reveal } from "@/components/primitives/Reveal";
import { DemoFrame } from "@/components/demos/DemoFrame";
import { CalendarDemo } from "@/components/demos/CalendarDemo";
import { WhatsAppDemo } from "@/components/demos/WhatsAppDemo";
import { VoiceAgentDemo } from "@/components/demos/VoiceAgentDemo";
import { AgentDashboardDemo } from "@/components/demos/AgentDashboardDemo";
import { MetricsLineDemo } from "@/components/demos/MetricsLineDemo";

type Step = {
  n: string;
  title: string;
  body: string;
  visual: React.ReactNode;
  reverse?: boolean;
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Discovery & free consult",
    body: "We study how leads enter, who handles them, and where they leak. Then we map out exactly what we'd build for you — free, before you commit to anything.",
    visual: <DiscoveryVisual />,
  },
  {
    n: "02",
    title: "Onboarding",
    body: "Quick call to connect your phone, calendar, website, and lead sources. The calendar syncs cleanly — and starts auto-filling on its own.",
    visual: <CalendarDemo />,
    reverse: true,
  },
  {
    n: "03",
    title: "Go live",
    body: "Within days, every WhatsApp message and every phone call is answered and booked — 24/7, on-brand, on-script.",
    visual: <ChatAndCall />,
  },
  {
    n: "04",
    title: "Runs 24/7",
    body: "Every lead captured, qualified, and booked. Nights, weekends, lunch breaks, holidays. You see it all in one live dashboard.",
    visual: <AgentDashboardDemo />,
    reverse: true,
  },
  {
    n: "05",
    title: "We optimise & report",
    body: "Every week we tune the script, the routing, the timing — and report the numbers. Reply-rate up, response-time down, bookings up.",
    visual: <MetricsLineDemo />,
  },
];

export function HowItWorksDemos() {
  return (
    <section className="relative section-pad bg-canvas overflow-hidden">
      <div className="container-wide">
        <Reveal>
          <span className="eyebrow">The full process</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 headline-section max-w-[18ch]">
            Five steps. <span className="italic-accent">Then forever.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg text-[color:var(--color-ink-soft)]">
            Each step pairs with what the system actually does. Watch it work,
            stage by stage.
          </p>
        </Reveal>

        <div className="mt-16 space-y-20">
          {STEPS.map((s) => (
            <StepRow key={s.n} step={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepRow({ step }: { step: Step }) {
  return (
    <div
      className={`grid gap-10 md:gap-14 items-center ${
        step.reverse ? "md:grid-cols-[1.15fr_1fr]" : "md:grid-cols-[1fr_1.15fr]"
      }`}
    >
      <div className={step.reverse ? "md:order-2" : ""}>
        <Reveal>
          <div className="flex items-center gap-4">
            <span
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg font-mono text-xs"
              style={{
                background: "rgba(var(--accent-rgb),0.08)",
                border: "1px solid rgba(var(--accent-rgb),0.28)",
                color: "var(--color-accent)",
              }}
            >
              {step.n}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
              Step {step.n}
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h3 className="mt-5 font-display text-3xl md:text-5xl font-medium tracking-tight leading-[1.04] text-[color:var(--color-ink)]">
            {step.title}
          </h3>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-lg text-lg text-[color:var(--color-ink-soft)] leading-relaxed">
            {step.body}
          </p>
        </Reveal>
      </div>
      <Reveal delay={0.15} className={step.reverse ? "md:order-1" : ""}>
        <DemoFrame>{step.visual}</DemoFrame>
      </Reveal>
    </div>
  );
}

function DiscoveryVisual() {
  return (
    <div className="p-7 md:p-8">
      <div className="flex items-center gap-2" style={{ color: "var(--color-ink-muted)" }}>
        <span
          className="inline-block h-1.5 w-1.5 rounded-full animate-glow-pulse"
          style={{ background: "var(--color-accent)" }}
        />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Consult & plan · Free
        </span>
      </div>
      <h4 className="mt-4 font-display text-2xl font-medium text-[color:var(--color-ink)]">
        Mapping your lead flow
      </h4>
      <ul className="mt-6 space-y-3">
        {[
          "Where leads enter (phone, WhatsApp, web, walk-in)",
          "Who handles them and when they go quiet",
          "Where revenue is leaking — every week",
        ].map((t, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-[14px] text-[color:var(--color-ink-soft)]"
          >
            <span
              className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium shrink-0"
              style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }}
            >
              {i + 1}
            </span>
            {t}
          </li>
        ))}
      </ul>
      <div
        className="mt-7 rounded-xl border px-4 py-3 flex items-center justify-between"
        style={{
          background: "rgba(var(--accent-rgb),0.06)",
          borderColor: "rgba(var(--accent-rgb),0.28)",
        }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-accent)]">
          Mapped before you commit
        </span>
        <span className="text-[13px] font-medium text-[color:var(--color-ink)]">£0 consult</span>
      </div>
    </div>
  );
}

function ChatAndCall() {
  return (
    <div className="p-5 md:p-6">
      <div className="grid gap-5 lg:grid-cols-2">
        <div
          className="rounded-xl border overflow-hidden"
          style={{ borderColor: "var(--color-hairline)", background: "rgba(var(--hairline-rgb),0.02)" }}
        >
          <div className="px-4 pt-4">
            <div className="flex items-center gap-2" style={{ color: "var(--color-ink-muted)" }}>
              <span
                className="inline-block h-1.5 w-1.5 rounded-full animate-glow-pulse"
                style={{ background: "var(--color-accent)" }}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em]">WhatsApp</span>
            </div>
          </div>
          <div className="p-4 pt-2 flex items-center justify-center">
            <WhatsAppDemo />
          </div>
        </div>
        <div
          className="rounded-xl border overflow-hidden"
          style={{ borderColor: "var(--color-hairline)", background: "rgba(var(--hairline-rgb),0.02)" }}
        >
          <VoiceAgentDemo />
        </div>
      </div>
    </div>
  );
}
