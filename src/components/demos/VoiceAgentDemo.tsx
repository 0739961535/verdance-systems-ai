"use client";

/**
 * VoiceAgentDemo — AI receptionist phone call.
 * Incoming-call header, animated turquoise waveform, transcript that
 * scrolls in word-by-word. After call ends a "Booked" stat card appears.
 *
 * Callers: src/app/services/page.tsx, src/app/how-it-works/page.tsx
 */

import { useDemoMotion } from "@/components/primitives/useDemoMotion";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DemoLabel, WaveformBars } from "./_micro";

type Turn = { speaker: "ai" | "caller"; text: string; ms: number };

const TRANSCRIPT: Turn[] = [
  { speaker: "ai", text: "Thanks for calling Bryant Electrical. This is Mia — how can I help?", ms: 4200 },
  { speaker: "caller", text: "Hi, I'd like to book a cleaning for next week.", ms: 3000 },
  { speaker: "ai", text: "Of course. We've got Tuesday at 10am or Wednesday at 3pm — which works?", ms: 3800 },
  { speaker: "caller", text: "Tuesday at 10.", ms: 1600 },
  { speaker: "ai", text: "Done. You'll get a confirmation text in a moment. See you Tuesday.", ms: 3800 },
];

const CALL_TOTAL = TRANSCRIPT.reduce((a, t) => a + t.ms, 0);
const SHOW_RESULT_FOR = 4500;
const LOOP_TOTAL = 1200 + CALL_TOTAL + SHOW_RESULT_FOR + 1200;

export function VoiceAgentDemo() {
  const reduce = useDemoMotion();
  const [phase, setPhase] = useState<"ringing" | "live" | "done">(reduce ? "done" : "ringing");
  const [turnIdx, setTurnIdx] = useState(reduce ? TRANSCRIPT.length : 0);
  const [shownText, setShownText] = useState<{ [k: number]: string }>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;

    let timers: number[] = [];
    const cleanup = () => timers.forEach((t) => window.clearTimeout(t));

    const startCycle = () => {
      cleanup();
      setPhase("ringing");
      setTurnIdx(0);
      setShownText({});

      timers.push(window.setTimeout(() => setPhase("live"), 1200));

      let acc = 1200;
      TRANSCRIPT.forEach((turn, i) => {
        const start = acc;
        const words = turn.text.split(" ");
        const perWord = Math.max(70, Math.floor(turn.ms / Math.max(1, words.length + 2)));

        timers.push(window.setTimeout(() => setTurnIdx(i + 1), start + 40));
        words.forEach((_, w) => {
          timers.push(
            window.setTimeout(() => {
              setShownText((m) => ({ ...m, [i]: words.slice(0, w + 1).join(" ") }));
            }, start + (w + 1) * perWord)
          );
        });
        acc += turn.ms;
      });

      timers.push(window.setTimeout(() => setPhase("done"), 1200 + CALL_TOTAL));
    };

    startCycle();
    const loop = window.setInterval(startCycle, LOOP_TOTAL);
    return () => {
      cleanup();
      window.clearInterval(loop);
    };
  }, [reduce]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [turnIdx, shownText, reduce]);

  return (
    <div className="p-6 md:p-7">
      <DemoLabel className="mb-5">Voice Receptionist · Live call</DemoLabel>

      <div
        className="relative rounded-2xl border overflow-hidden"
        style={{
          borderColor: "var(--color-hairline)",
          background:
            "linear-gradient(180deg, rgba(var(--accent-rgb),0.04), rgba(var(--hairline-rgb),0.01))",
        }}
      >
        <div
          className="flex items-center gap-3 px-5 py-4 border-b"
          style={{ borderColor: "var(--color-hairline)" }}
        >
          <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full"
            style={{ background: "rgba(var(--accent-rgb),0.12)", color: "var(--color-accent)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 4h3l2 5-2 1.5a11 11 0 005.5 5.5L15 14l5 2v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
            {phase === "ringing" && (
              <span aria-hidden className="absolute -inset-1 rounded-full"
                style={{ border: "1.5px solid rgba(var(--accent-rgb),0.5)", animation: "pulse-ring 2s ease-out infinite" }} />
            )}
          </span>
          <div className="leading-tight">
            <div className="text-[13px] font-medium text-[color:var(--color-ink)]">
              {phase === "ringing" ? "Mia · answering call" : "Mia · Mia"}
            </div>
            <div className="text-[10.5px] font-mono uppercase tracking-[0.25em] text-[color:var(--color-ink-muted)]">
              from +27 82 •••• 217 · Bryant Electrical
            </div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <WaveformBars bars={5} active={phase === "live"} height={26} />
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-accent)]">
              {phase === "ringing" ? "ringing" : phase === "live" ? "live" : "ended"}
            </div>
          </div>
        </div>

        <div ref={containerRef} className="px-5 py-5 space-y-3 max-h-[260px] overflow-y-auto">
          {TRANSCRIPT.slice(0, turnIdx).map((turn, i) => (
            <Line key={i} speaker={turn.speaker} text={shownText[i] ?? ""} />
          ))}
          {phase === "ringing" && (
            <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.25em] text-[color:var(--color-ink-muted)]">
              <span className="inline-block h-1.5 w-1.5 rounded-full animate-glow-pulse"
                style={{ background: "var(--color-accent)" }} />
              Connecting · 0.4s
            </div>
          )}
        </div>

        <AnimatePresence>
          {phase === "done" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
              className="m-4 rounded-xl border p-4 flex items-center gap-4"
              style={{
                borderColor: "rgba(var(--accent-rgb),0.35)",
                background: "rgba(var(--accent-rgb),0.08)",
              }}
            >
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-full"
                style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div className="flex-1 leading-tight">
                <div className="text-[13px] font-medium text-[color:var(--color-ink)]">Booked · Tue 10:00 — Cleaning</div>
                <div className="text-[11px] text-[color:var(--color-ink-muted)] mt-0.5">
                  Call duration 1m 12s · caller never waited on hold
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Line({ speaker, text }: { speaker: "ai" | "caller"; text: string }) {
  const isAI = speaker === "ai";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex gap-3 items-start"
    >
      <span
        className="mt-1 inline-flex h-5 min-w-[2.2rem] items-center justify-center rounded-full text-[9.5px] font-mono uppercase tracking-[0.15em] px-1.5"
        style={{
          background: isAI ? "var(--color-accent)" : "rgba(var(--hairline-rgb),0.06)",
          color: isAI ? "var(--color-on-accent)" : "var(--color-ink-soft)",
        }}
      >
        {isAI ? "Mia" : "Caller"}
      </span>
      <span
        className="text-[13.5px] leading-relaxed"
        style={{
          color: isAI ? "var(--color-ink)" : "var(--color-ink-soft)",
          fontStyle: isAI ? "normal" : "italic",
        }}
      >
        {text}
        {text.length > 0 && (
          <span
            aria-hidden
            className="inline-block ml-[2px] align-baseline animate-glow-pulse"
            style={{
              width: "0.45ch", height: "0.95em",
              background: "currentColor",
              opacity: 0.35,
              transform: "translateY(2px)",
            }}
          />
        )}
      </span>
    </motion.div>
  );
}
