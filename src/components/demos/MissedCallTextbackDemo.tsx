"use client";

/**
 * MissedCallTextbackDemo - three-frame story.
 * 1) Missed call notification
 * 2) Mia sends an instant SMS
 * 3) Customer replies, booking confirmed
 *
 * Caller: src/app/services/page.tsx
 */

import { useDemoMotion } from "@/components/primitives/useDemoMotion";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { DemoLabel } from "./_micro";

type Frame = "missed" | "sms-sent" | "reply" | "booked";

const FRAMES: { id: Frame; ms: number }[] = [
  { id: "missed", ms: 3000 },
  { id: "sms-sent", ms: 3800 },
  { id: "reply", ms: 4200 },
  { id: "booked", ms: 4000 },
];
const TOTAL = FRAMES.reduce((a, f) => a + f.ms, 0);

export function MissedCallTextbackDemo() {
  const reduce = useDemoMotion();
  const [frame, setFrame] = useState<Frame>(reduce ? "booked" : "missed");

  useEffect(() => {
    if (reduce) return;
    let timers: number[] = [];
    const run = () => {
      timers.forEach((t) => window.clearTimeout(t));
      timers = [];
      let acc = 0;
      FRAMES.forEach((f) => {
        timers.push(window.setTimeout(() => setFrame(f.id), acc));
        acc += f.ms;
      });
    };
    run();
    const loop = window.setInterval(run, TOTAL);
    return () => {
      window.clearInterval(loop);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [reduce]);

  return (
    <div className="p-6 md:p-7">
      <DemoLabel className="mb-5">Missed-Call Text-Back · Instant recovery</DemoLabel>

      <div className="grid gap-5 md:grid-cols-[1.05fr_1.1fr] items-stretch">
        <div className="relative mx-auto md:mx-0">
          <PhoneShell>
            <div
              className="relative h-full w-full p-4 flex flex-col gap-3"
              style={{ background: "var(--color-bg-2)" }}
            >
              <StatusBar />
              <AnimatePresence mode="wait">
                {frame === "missed" && (
                  <ScreenWrap key="missed">
                    <MissedCallNotification />
                  </ScreenWrap>
                )}
                {(frame === "sms-sent" || frame === "reply" || frame === "booked") && (
                  <ScreenWrap key="sms">
                    <SmsScreen frame={frame} />
                  </ScreenWrap>
                )}
              </AnimatePresence>
            </div>
          </PhoneShell>
        </div>

        <div className="flex flex-col gap-4 justify-center">
          <Annotation
            active={frame === "missed"}
            badge="00s"
            title="Call comes in, goes to voicemail."
            body="A potential customer just hit your voicemail. Most never call back."
          />
          <Annotation
            active={frame === "sms-sent"}
            badge="05s"
            title="Mia texts them back."
            body="A friendly, on-brand SMS within 5 seconds. No human required."
          />
          <Annotation
            active={frame === "reply" || frame === "booked"}
            badge="42s"
            title="Conversation continues. They book."
            body="They reply, the AI replies. They walk into your business instead of a competitor's."
          />
          <AnimatePresence>
            {frame === "booked" && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.55 }}
                className="mt-2 rounded-xl border px-4 py-3.5"
                style={{
                  background: "rgba(var(--accent-rgb),0.08)",
                  borderColor: "rgba(var(--accent-rgb),0.32)",
                }}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-accent)]">
                  Result
                </div>
                <div className="mt-1.5 text-[13.5px] text-[color:var(--color-ink)] leading-snug">
                  <span className="font-medium">Answered in 42 seconds</span> - before they called anyone else.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Annotation({
  active, badge, title, body,
}: {
  active: boolean; badge: string; title: string; body: string;
}) {
  return (
    <div
      className="rounded-xl border px-4 py-3.5 transition-all"
      style={{
        borderColor: active ? "rgba(var(--accent-rgb),0.45)" : "var(--color-hairline)",
        background: active ? "rgba(var(--accent-rgb),0.05)" : "rgba(var(--hairline-rgb),0.02)",
        opacity: active ? 1 : 0.55,
      }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.22em] rounded-full px-2 py-0.5"
          style={{
            background: active ? "var(--color-accent)" : "rgba(var(--hairline-rgb),0.06)",
            color: active ? "var(--color-on-accent)" : "var(--color-ink-muted)",
          }}
        >
          T+{badge}
        </span>
        <div className="text-[13.5px] font-medium text-[color:var(--color-ink)] leading-tight">{title}</div>
      </div>
      <div className="mt-1.5 text-[12.5px] text-[color:var(--color-ink-soft)] leading-relaxed">
        {body}
      </div>
    </div>
  );
}

function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative" style={{ width: 280, height: 480 }}>
      <div
        className="absolute inset-0"
        style={{
          borderRadius: 34,
          background: "linear-gradient(180deg, var(--color-bg-4) 0%, var(--color-bg-2) 100%)",
          padding: 10,
          boxShadow:
            "0 1px 0 rgba(var(--hairline-rgb),0.08) inset, 0 24px 60px rgba(var(--bg-rgb),0.6), 0 0 0 1px rgba(var(--accent-rgb),0.13)",
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden"
          style={{ borderRadius: 26, background: "#000" }}
        >
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 top-1.5 z-10 rounded-full"
            style={{ width: 90, height: 18, background: "#000" }}
          />
          {children}
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)] pt-1.5">
      <span>9:42</span>
      <span className="opacity-60">•••</span>
      <span>87%</span>
    </div>
  );
}

function ScreenWrap({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}

function MissedCallNotification() {
  return (
    <div className="flex-1 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border p-4 mt-6"
        style={{
          borderColor: "rgba(239,68,68,0.32)",
          background: "rgba(239,68,68,0.08)",
        }}
      >
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#f87171]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M5 4h3l2 5-2 1.5a11 11 0 005.5 5.5L15 14l5 2v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z M2 22L22 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          Missed call
        </div>
        <div className="mt-2 text-[14px] font-medium text-[color:var(--color-ink)]">+27 83 •••• 412</div>
        <div className="mt-1 text-[11px] text-[color:var(--color-ink-muted)]">just now · went to voicemail</div>
      </motion.div>
      <div className="mt-4 text-center text-[10px] font-mono uppercase tracking-[0.25em] text-[color:var(--color-ink-muted)]">
        Most callers never call back
      </div>
    </div>
  );
}

function SmsScreen({ frame }: { frame: Frame }) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center gap-2 pb-2 border-b" style={{ borderColor: "rgba(var(--hairline-rgb),0.06)" }}>
        <div className="h-7 w-7 rounded-full grid place-items-center font-display font-medium text-[11px]"
          style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }}>V</div>
        <div className="leading-tight">
          <div className="text-[11.5px] font-medium text-[color:var(--color-ink)]">Mia</div>
          <div className="text-[9.5px] font-mono uppercase tracking-[0.22em] text-[color:var(--color-accent)]">SMS</div>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2 overflow-hidden">
        <SmsBubble from="ai" delay={0.15}>
          Hi, sorry we missed your call. What&rsquo;s the best service to help with?
        </SmsBubble>
        {(frame === "reply" || frame === "booked") && (
          <SmsBubble from="customer" delay={0.15}>Need a quote for kitchen install</SmsBubble>
        )}
        {(frame === "reply" || frame === "booked") && (
          <SmsBubble from="ai" delay={0.6}>
            Got it. We can do a free on-site quote on Thu morning or Fri 2pm - which?
          </SmsBubble>
        )}
        {frame === "booked" && (
          <SmsBubble from="customer" delay={0.15}>Thu morning works</SmsBubble>
        )}
        {frame === "booked" && (
          <SmsBubble from="ai" delay={0.6}>
            Booked. You&rsquo;ll get a text reminder Wed evening. ✓
          </SmsBubble>
        )}
      </div>
    </div>
  );
}

function SmsBubble({
  from, delay, children,
}: {
  from: "ai" | "customer"; delay: number; children: React.ReactNode;
}) {
  const isAI = from === "ai";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1], delay }}
      className={`flex ${isAI ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 text-[11.5px] leading-snug ${
          isAI ? "rounded-tr-md" : "rounded-tl-md"
        }`}
        style={{
          background: isAI ? "var(--color-accent)" : "rgba(var(--hairline-rgb),0.06)",
          color: isAI ? "var(--color-on-accent)" : "var(--color-ink)",
          fontWeight: isAI ? 500 : 400,
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
