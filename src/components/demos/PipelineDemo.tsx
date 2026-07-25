"use client";

/**
 * PipelineDemo - the 5-step Missed-Revenue Recovery pipeline.
 * A lead avatar travels along a turquoise hairline rail, lighting up each
 * stop as it arrives. Loops every ~14s with a new lead each cycle.
 */

import { useDemoMotion } from "@/components/primitives/useDemoMotion";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ConicBorder } from "@/components/primitives/ConicBorder";
import {
  DemoLabel,
  NumberTicker,
  TickRow,
  TypingDots,
  TypingText,
} from "./_micro";

const LEADS = [
  { initial: "S", name: "Sarah W.", service: "Site survey", revenue: 1200, time: "Thu 2:00 PM", greeting: "Hi Sarah, thanks for reaching out." },
  { initial: "M", name: "Mike D.", service: "Invisalign plan", revenue: 2400, time: "Fri 10:30", greeting: "Hi Mike, thanks for the message." },
  { initial: "L", name: "Lerato M.", service: "Veneers", revenue: 2900, time: "Tue 4:00 PM", greeting: "Hi Lerato, lovely to hear from you." },
  { initial: "J", name: "James P.", service: "Boiler service", revenue: 140, time: "Wed 11:00", greeting: "Hi James, thanks for reaching out." },
];

const CHANNELS = ["WhatsApp", "Phone", "Web Chat", "SMS"];

const STEPS = [
  { id: "inbound", label: "Inbound", caption: "Lead arrives" },
  { id: "engaged", label: "Engaged", caption: "AI replies in seconds" },
  { id: "qualified", label: "Qualified", caption: "Right fit, right service" },
  { id: "booked", label: "Booked", caption: "Slot held + confirmation sent" },
  { id: "showed", label: "Showed Up", caption: "Revenue captured" },
];

const STEP_DURATION = 2800; // ms per step
const LOOP_DURATION = STEP_DURATION * STEPS.length; // 14000

export function PipelineDemo({ size = "md" }: { size?: "md" | "xl" } = {}) {
  const reduce = useDemoMotion();
  const [cycle, setCycle] = useState(0);
  const [step, setStep] = useState(0);
  const lead = LEADS[cycle % LEADS.length];
  const channel = CHANNELS[cycle % CHANNELS.length];
  const xl = size === "xl";

  useEffect(() => {
    if (reduce) {
      setStep(STEPS.length - 1);
      return;
    }
    const stepId = window.setInterval(() => {
      setStep((s) => {
        if (s >= STEPS.length - 1) return s;
        return s + 1;
      });
    }, STEP_DURATION);
    const loopId = window.setInterval(() => {
      setStep(0);
      setCycle((c) => c + 1);
    }, LOOP_DURATION);
    return () => {
      window.clearInterval(stepId);
      window.clearInterval(loopId);
    };
  }, [reduce]);

  const railPct = (step / (STEPS.length - 1)) * 100;

  return (
    <ConicBorder glow="#4F8DFF" duration={11} radius={24} surface="var(--color-bg-glass)" border="rgba(var(--accent-rgb),0.18)" halo>
      <div className={xl ? "p-8 md:p-14 lg:p-16 relative" : "p-7 md:p-10 relative"}>
        <div className="flex items-center justify-between">
          <DemoLabel>Live · Missed-Revenue Recovery</DemoLabel>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
            Cycle {String((cycle % 99) + 1).padStart(2, "0")}
          </div>
        </div>

        {/* Rail */}
        <div className={xl ? "relative mt-20 mb-6 px-6" : "relative mt-12 mb-4 px-4"}>
          <div
            className={xl ? "absolute left-6 right-6 top-1/2" : "absolute left-4 right-4 top-1/2 h-px"}
            style={{
              height: xl ? 2 : 1,
              background: "var(--color-hairline-2)",
              transform: "translateY(-1px)",
            }}
          />
          <motion.div
            className={xl ? "absolute left-6 top-1/2 origin-left" : "absolute left-4 top-1/2 h-px origin-left"}
            style={{
              height: xl ? 2 : 1,
              transform: "translateY(-1px)",
              background:
                "linear-gradient(90deg, var(--color-accent-deep), var(--color-accent))",
              boxShadow: "0 0 18px rgba(var(--accent-rgb),0.65)",
            }}
            animate={{ width: `calc(${railPct}% * 0.92 + 8px)` }}
            transition={{ duration: (STEP_DURATION / 1000) * 0.55, ease: [0.19, 1, 0.22, 1] }}
          />

          <div className="relative flex justify-between items-center">
            {STEPS.map((s, i) => {
              const reached = i <= step;
              const isActive = i === step;
              const dotSize = xl ? 22 : 14;
              return (
                <div
                  key={s.id}
                  className="flex flex-col items-center"
                  style={{ width: xl ? 140 : 80 }}
                >
                  <span
                    className="relative inline-flex items-center justify-center rounded-full"
                    style={{
                      width: dotSize,
                      height: dotSize,
                      background: reached ? "var(--color-accent)" : "var(--color-bg-3)",
                      border: `${xl ? 2 : 1}px solid ${reached ? "var(--color-accent)" : "var(--color-hairline-2)"}`,
                      boxShadow: reached ? "0 0 18px rgba(var(--accent-rgb),0.7)" : undefined,
                      transition: "all 360ms cubic-bezier(0.19,1,0.22,1)",
                    }}
                  >
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute rounded-full"
                        style={{
                          inset: xl ? -10 : -8,
                          border: `${xl ? 2 : 1.5}px solid rgba(var(--accent-rgb),0.5)`,
                          animation: "pulse-ring 2s ease-out infinite",
                        }}
                      />
                    )}
                  </span>
                  <span
                    className={
                      xl
                        ? "mt-5 font-mono text-[11.5px] uppercase tracking-[0.3em] text-center"
                        : "mt-3 font-mono text-[9.5px] uppercase tracking-[0.22em] text-center"
                    }
                    style={{
                      color: reached ? "var(--color-accent)" : "var(--color-ink-muted)",
                      transition: "color 360ms",
                    }}
                  >
                    {s.label}
                  </span>
                  {xl && (
                    <span
                      className="mt-2 text-[12px] text-center max-w-[140px] leading-snug"
                      style={{
                        color: reached
                          ? "var(--color-ink-soft)"
                          : "var(--color-ink-faint)",
                        transition: "color 360ms",
                      }}
                    >
                      {s.caption}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <motion.div
            className="absolute top-1/2 -translate-y-1/2 z-10"
            style={{ left: xl ? 24 : 16, marginLeft: xl ? -28 : -16 }}
            animate={{ x: `calc(${railPct}% * 0.92 + 8px - ${xl ? 28 : 16}px)` }}
            transition={{ duration: (STEP_DURATION / 1000) * 0.55, ease: [0.19, 1, 0.22, 1] }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={lead.initial + cycle}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className={
                  xl
                    ? "relative rounded-full grid place-items-center font-display font-medium"
                    : "relative h-8 w-8 rounded-full grid place-items-center font-display font-medium text-[12px]"
                }
                style={{
                  width: xl ? 56 : undefined,
                  height: xl ? 56 : undefined,
                  fontSize: xl ? 20 : undefined,
                  background: "var(--color-accent)",
                  color: "var(--color-on-accent)",
                  boxShadow: xl
                    ? "0 0 36px rgba(var(--accent-rgb),0.65), 0 0 0 5px rgba(var(--bg-rgb),0.94)"
                    : "0 0 24px rgba(var(--accent-rgb),0.55), 0 0 0 3px rgba(var(--bg-rgb),0.94)",
                }}
              >
                {lead.initial}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <div
          className={
            xl
              ? "mt-20 grid gap-10 lg:grid-cols-[1.05fr_1fr] items-start"
              : "mt-10 grid gap-6 md:grid-cols-[1.05fr_1fr] items-start"
          }
        >
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`cap-${step}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
                className={
                  xl
                    ? "font-mono text-[11px] uppercase tracking-[0.32em] text-[color:var(--color-accent)]"
                    : "font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]"
                }
              >
                Step {String(step + 1).padStart(2, "0")} · {STEPS[step].label}
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.h3
                key={`h-${step}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className={
                  xl
                    ? "mt-4 font-display text-3xl md:text-5xl font-medium leading-tight text-[color:var(--color-ink)]"
                    : "mt-3 font-display text-2xl md:text-3xl font-medium leading-tight text-[color:var(--color-ink)]"
                }
              >
                {STEPS[step].caption}
              </motion.h3>
            </AnimatePresence>
            <p
              className={
                xl
                  ? "mt-6 text-lg md:text-xl text-[color:var(--color-ink-soft)] leading-relaxed"
                  : "mt-4 text-[color:var(--color-ink-soft)] leading-relaxed"
              }
            >
              {step === 0 && `Inbound lead from ${channel}. ${lead.name} requesting ${lead.service.toLowerCase()}.`}
              {step === 1 && `Mia picks up instantly and replies on-brand - no queue, no waiting.`}
              {step === 2 && `Three qualifying questions answered in the same thread.`}
              {step === 3 && `Calendar checked, slot held, confirmation sent - without anyone lifting a finger.`}
              {step === 4 && `Customer arrives. The booking is real money in your business.`}
            </p>
          </div>

          <div
            className={
              xl
                ? "relative rounded-xl border p-7 min-h-[280px]"
                : "relative rounded-xl border p-5 min-h-[200px]"
            }
            style={{
              borderColor: "var(--color-hairline)",
              background: "rgba(var(--hairline-rgb),0.02)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`detail-${step}-${cycle}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
                className="space-y-3"
              >
                {step === 0 && <InboundPanel lead={lead} channel={channel} />}
                {step === 1 && <EngagedPanel greeting={lead.greeting} />}
                {step === 2 && <QualifiedPanel service={lead.service} time={lead.time} />}
                {step === 3 && <BookedPanel time={lead.time} service={lead.service} />}
                {step === 4 && <ShowedPanel revenue={lead.revenue} cycle={cycle} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </ConicBorder>
  );
}

function InboundPanel({ lead, channel }: { lead: typeof LEADS[number]; channel: string }) {
  return (
    <>
      <div className="flex items-center gap-3">
        <span
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ background: "rgba(var(--accent-rgb),0.10)", color: "var(--color-accent)" }}
          aria-hidden
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M3 5h18v14H3z M3 5l9 7 9-7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        </span>
        <div>
          <div className="text-sm font-medium text-[color:var(--color-ink)]">{lead.name}</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-ink-muted)]">
            via {channel}
          </div>
        </div>
      </div>
      <div className="rounded-lg border px-3 py-2.5 text-[13px] text-[color:var(--color-ink-soft)]"
        style={{ borderColor: "var(--color-hairline)", background: "rgba(var(--hairline-rgb),0.03)" }}>
        &ldquo;Hi - do you take new clients for {lead.service.toLowerCase()}?&rdquo;
      </div>
    </>
  );
}

function EngagedPanel({ greeting }: { greeting: string }) {
  return (
    <>
      <div className="flex items-center gap-2 text-[color:var(--color-ink-muted)]">
        <TypingDots className="text-[color:var(--color-accent)]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Mia is typing</span>
      </div>
      <div
        className="rounded-xl rounded-tr-md px-3.5 py-2.5 text-[13px] font-medium"
        style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }}
      >
        <TypingText text={greeting + " Our soonest opening is Thursday at 2pm - does that work?"} speed={18} cursor={false} />
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
        Reply in 6 seconds
      </div>
    </>
  );
}

function QualifiedPanel({ service, time }: { service: string; time: string }) {
  return (
    <>
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
        Qualification
      </div>
      <div className="space-y-2.5 pt-1">
        <StaggeredTick label={`Service: ${service}`} delay={120} />
        <StaggeredTick label="Budget: confirmed" delay={520} />
        <StaggeredTick label={`Date preference: ${time}`} delay={960} />
      </div>
    </>
  );
}

function StaggeredTick({ label, delay }: { label: string; delay: number }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setOn(true), delay);
    return () => window.clearTimeout(id);
  }, [delay]);
  return <TickRow label={label} active={on} />;
}

function BookedPanel({ time, service }: { time: string; service: string }) {
  return (
    <>
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
        Booked
      </div>
      <motion.div
        initial={{ rotateY: 90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
        className="rounded-xl border p-4"
        style={{
          background: "rgba(var(--accent-rgb),0.07)",
          borderColor: "rgba(var(--accent-rgb),0.35)",
          transformStyle: "preserve-3d",
          perspective: 800,
        }}
      >
        <div className="font-display text-xl font-medium text-[color:var(--color-ink)]">{time}</div>
        <div className="mt-1 text-[13px] text-[color:var(--color-accent)]">{service}</div>
      </motion.div>
      <div className="text-[12px] text-[color:var(--color-ink-muted)]">
        Confirmation SMS sent · added to your calendar.
      </div>
    </>
  );
}

function ShowedPanel({ revenue, cycle }: { revenue: number; cycle: number }) {
  return (
    <>
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
        Revenue captured
      </div>
      <div className="relative">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: [0, 0.45, 0], scale: [0.7, 1.6, 1.6] }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          style={{
            borderRadius: 16,
            border: "1px solid rgba(var(--accent-rgb),0.5)",
            boxShadow: "0 0 40px rgba(var(--accent-rgb),0.45) inset",
          }}
        />
        <div className="font-display text-3xl font-medium text-[color:var(--color-ink)]">
          £0 → <span className="text-[color:var(--color-accent)]">
            <NumberTicker key={cycle} to={revenue} from={0} duration={1.2} play prefix="£" thousands />
          </span>
        </div>
      </div>
      <div className="text-[12px] text-[color:var(--color-ink-muted)]">
        That&rsquo;s one lead. The system handles every one.
      </div>
    </>
  );
}
