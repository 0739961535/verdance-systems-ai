"use client";

/**
 * WhatsAppDemo - turn-by-turn AI receptionist thread.
 * Phone-mockup frame with chat bubbles that type in sequentially.
 * Loops on ~22s cycle. Last bubble triggers a "Booked" badge that floats up.
 */

import { useDemoMotion } from "@/components/primitives/useDemoMotion";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { DemoLabel, TypingDots } from "./_micro";

type Msg =
  | { from: "customer"; time: string; text: string }
  | { from: "ai"; time: string; text: string; typingMs?: number };

const SCRIPT: Msg[] = [
  { from: "customer", time: "07:42", text: "Hi - do you have any availability this week?" },
  { from: "ai", time: "07:42", text: "Hi Sarah - yes! I've got Thursday at 2pm or Friday at 10am open. Which works for you?", typingMs: 1300 },
  { from: "customer", time: "07:43", text: "Thursday 2pm, please" },
  { from: "ai", time: "07:43", text: "Booked you in for Thursday at 2pm. I'll text a confirmation now. Anything I should pass on to the team?", typingMs: 1300 },
  { from: "customer", time: "07:43", text: "That's everything, thanks!" },
  { from: "ai", time: "07:43", text: "Perfect - see you Thursday, Sarah.", typingMs: 900 },
];

const TOTAL_MS = SCRIPT.length * 2400 + 4000;

export function WhatsAppDemo({ businessName = "Meridian Plumbing" }: { businessName?: string }) {
  const reduce = useDemoMotion();
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setCycle((c) => c + 1), TOTAL_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative">
      <PhoneFrame>
        <div
          className="relative h-full w-full overflow-hidden"
          style={{ background: "var(--color-bg-2)" }}
        >
          <div
            className="flex items-center gap-3 px-4 pt-8 pb-3 border-b"
            style={{ background: "var(--color-bg)", borderColor: "rgba(var(--hairline-rgb),0.06)" }}
          >
            <div
              className="h-9 w-9 rounded-full grid place-items-center font-display font-medium"
              style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }}
            >
              {businessName.charAt(0)}
            </div>
            <div className="leading-tight">
              <div className="text-[13px] font-medium text-[color:var(--color-ink)]">{businessName}</div>
              <div className="text-[10.5px] text-[color:var(--color-accent)] flex items-center gap-1.5">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: "#4F8DFF", boxShadow: "0 0 6px rgba(var(--accent-rgb),0.7)" }}
                />
                online
              </div>
            </div>
            <div className="ml-auto flex items-center gap-3 text-[color:var(--color-ink-muted)]" aria-hidden>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M2 7l9 6 9-6" stroke="currentColor" strokeWidth="1.4" />
                <rect x="2" y="6" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
              </svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
                <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </div>
          </div>

          <div className="relative h-[calc(100%-58px)] overflow-hidden px-3 pt-3">
            <ChatStream key={cycle} script={SCRIPT} />
          </div>
        </div>
      </PhoneFrame>

      <BookedBadge cycle={cycle} />
    </div>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto" style={{ width: 320, height: 580 }}>
      <div
        className="absolute inset-0"
        style={{
          borderRadius: 38,
          background: "linear-gradient(180deg, var(--color-bg-4) 0%, var(--color-bg-2) 100%)",
          padding: 12,
          boxShadow:
            "0 1px 0 rgba(var(--hairline-rgb),0.08) inset, 0 30px 80px rgba(var(--bg-rgb),0.6), 0 0 0 1px rgba(var(--accent-rgb),0.15)",
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden"
          style={{ borderRadius: 28, background: "#000" }}
        >
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 top-2 z-10 rounded-full"
            style={{ width: 100, height: 22, background: "#000" }}
          />
          {children}
        </div>
      </div>
    </div>
  );
}

function ChatStream({ script }: { script: Msg[] }) {
  const reduce = useDemoMotion();
  const [visibleIdx, setVisibleIdx] = useState(reduce ? script.length : 0);
  const [typingFor, setTypingFor] = useState<number | null>(null);

  useEffect(() => {
    if (reduce) {
      setVisibleIdx(script.length);
      return;
    }
    setVisibleIdx(0);
    setTypingFor(null);
    let cancelled = false;
    let acc = 600;
    const timers: number[] = [];

    script.forEach((m, i) => {
      const typingMs = m.from === "ai" ? m.typingMs ?? 1000 : 0;
      if (typingMs) {
        timers.push(
          window.setTimeout(() => {
            if (!cancelled) setTypingFor(i);
          }, acc)
        );
        acc += typingMs;
      }
      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          setTypingFor((t) => (t === i ? null : t));
          setVisibleIdx(i + 1);
        }, acc)
      );
      acc += m.from === "ai" ? 1100 : 1500;
    });

    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [script, reduce]);

  return (
    <div className="flex h-full flex-col gap-2 overflow-hidden pb-3">
      {script.slice(0, visibleIdx).map((m, i) => (
        <Bubble key={i} msg={m} />
      ))}
      <AnimatePresence>
        {typingFor !== null && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="self-start rounded-2xl rounded-tl-md px-3 py-2"
            style={{ background: "rgba(var(--hairline-rgb),0.06)", color: "var(--color-ink-soft)" }}
          >
            <TypingDots />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const isAI = msg.from === "ai";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
      className={`flex ${isAI ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 text-[12.5px] leading-snug ${
          isAI ? "rounded-tr-md" : "rounded-tl-md"
        }`}
        style={{
          background: isAI ? "var(--color-accent)" : "rgba(var(--hairline-rgb),0.06)",
          color: isAI ? "var(--color-on-accent)" : "var(--color-ink)",
          fontWeight: isAI ? 500 : 400,
        }}
      >
        {msg.text}
        <div
          className="mt-1 text-[10px]"
          style={{ color: isAI ? "rgba(4,32,29,0.55)" : "var(--color-ink-muted)" }}
        >
          {msg.time}
        </div>
      </div>
    </motion.div>
  );
}

function BookedBadge({ cycle }: { cycle: number }) {
  const reduce = useDemoMotion();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (reduce) {
      setShow(true);
      return;
    }
    setShow(false);
    const id = window.setTimeout(() => setShow(true), 14500);
    const off = window.setTimeout(() => setShow(false), 21000);
    return () => {
      window.clearTimeout(id);
      window.clearTimeout(off);
    };
  }, [cycle, reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: -10, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.9 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="absolute -right-2 top-[5.5rem] rounded-full px-3.5 py-2 text-[11px] font-medium font-mono uppercase tracking-[0.18em] flex items-center gap-2 z-20"
          style={{
            background: "var(--color-accent)",
            color: "var(--color-on-accent)",
            boxShadow: "0 16px 40px rgba(var(--accent-rgb),0.35), 0 0 0 1px rgba(var(--accent-rgb),0.5)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Booked · Thu 2pm
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Standalone card wrapper (label + caption around the phone) */
export function WhatsAppDemoCard({ label = "AI Receptionist · WhatsApp" }: { label?: string }) {
  return (
    <div className="p-7 md:p-8">
      <DemoLabel className="mb-6">{label}</DemoLabel>
      <WhatsAppDemo />
      <div className="mt-6 text-[12px] text-[color:var(--color-ink-muted)] text-center">
        Real reply, real booking - in under 60 seconds.
      </div>
    </div>
  );
}
