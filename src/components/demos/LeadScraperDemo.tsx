"use client";

/**
 * LeadScraperDemo — Google Maps style results streaming in with AI scoring.
 * Loops every ~14s with a new niche.
 */

import { useDemoMotion } from "@/components/primitives/useDemoMotion";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ConicBorder } from "@/components/primitives/ConicBorder";
import { DemoLabel, NumberTicker, TypingText } from "./_micro";

type Score = "A" | "B" | "C";
type Biz = { name: string; rating: number; address: string; phone: string; score: Score };

const NICHES = [
  {
    query: "skincare clinics near me",
    items: [
      { name: "Atelier Joinery", rating: 4.9, address: "Lynnwood Bridge", phone: "+27 12 369 4421", score: "A" as Score },
      { name: "Lumin Electrical", rating: 4.8, address: "Brooklyn Mall", phone: "+27 12 460 7115", score: "A" as Score },
      { name: "Dermatica Clinic", rating: 4.7, address: "Menlyn Maine", phone: "+27 12 348 2199", score: "A" as Score },
      { name: "Rosé Beauty Bar", rating: 4.5, address: "Centurion", phone: "+27 12 663 0021", score: "B" as Score },
      { name: "Glow Studio", rating: 4.4, address: "Hatfield", phone: "+27 12 343 8801", score: "B" as Score },
      { name: "Pure Fit Joinery", rating: 3.9, address: "Pretoria North", phone: "+27 12 549 2010", score: "C" as Score },
    ],
  },
  {
    query: "dental practices in Johannesburg",
    items: [
      { name: "Bryant Electrical", rating: 4.9, address: "Sandton City", phone: "+27 11 783 1144", score: "A" as Score },
      { name: "Algar Plumbing & Heating", rating: 4.9, address: "Morningside", phone: "+27 11 884 7720", score: "A" as Score },
      { name: "Oakbarn Plumbing", rating: 4.7, address: "Rivonia", phone: "+27 11 234 5510", score: "A" as Score },
      { name: "Smile Studio", rating: 4.5, address: "Bryanston", phone: "+27 11 706 0088", score: "B" as Score },
      { name: "Care Plumbing Co.", rating: 4.3, address: "Sunninghill", phone: "+27 11 234 9988", score: "B" as Score },
      { name: "Quick Dent", rating: 3.7, address: "Sandown", phone: "+27 11 884 1100", score: "C" as Score },
    ],
  },
];

const STEP_MS = 1100;

export function LeadScraperDemo() {
  const reduce = useDemoMotion();
  const [cycle, setCycle] = useState(0);
  const [shown, setShown] = useState(reduce ? 6 : 0);
  const niche = NICHES[cycle % NICHES.length];

  useEffect(() => {
    if (reduce) return;
    setShown(0);
    const timers: number[] = [];
    niche.items.forEach((_, i) => {
      timers.push(window.setTimeout(() => setShown(i + 1), 1100 + i * STEP_MS));
    });
    const loop = window.setTimeout(() => setCycle((c) => c + 1), 1100 + niche.items.length * STEP_MS + 4000);
    timers.push(loop);
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [cycle, niche.items.length, reduce]);

  const hotLeads = niche.items.slice(0, shown).filter((b) => b.score === "A").length;

  return (
    <ConicBorder glow="#4F8DFF" duration={11} radius={20} surface="var(--color-bg-glass)" border="rgba(var(--accent-rgb),0.18)" halo>
      <div className="p-7 md:p-10 relative">
        <div className="flex items-center justify-between">
          <DemoLabel>Live · Lead Scraper</DemoLabel>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
            Google Maps · Niche search
          </div>
        </div>

        {/* Search bar */}
        <div
          className="mt-7 flex items-center gap-3 rounded-xl px-4 py-3 border"
          style={{ borderColor: "var(--color-hairline-2)", background: "rgba(var(--hairline-rgb),0.03)" }}
        >
          <span className="text-[color:var(--color-accent)]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6" />
              <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={cycle}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="text-[14px] md:text-[15px] text-[color:var(--color-ink)] font-medium"
            >
              <TypingText text={niche.query} speed={28} cursor={false} />
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="mt-7 grid gap-6 md:grid-cols-[1.55fr_1fr] items-start">
          {/* Results list */}
          <div className="space-y-2.5">
            {niche.items.map((b, i) => {
              const visible = i < shown;
              return (
                <AnimatePresence key={`${cycle}-${i}`} mode="popLayout">
                  {visible && (
                    <motion.div
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
                      className="flex items-center gap-4 rounded-xl border px-4 py-3"
                      style={{ borderColor: "var(--color-hairline)", background: "rgba(var(--hairline-rgb),0.025)" }}
                    >
                      <div
                        className="h-9 w-9 rounded-lg grid place-items-center text-[14px] font-display font-medium"
                        style={{
                          background: "rgba(var(--accent-rgb),0.10)",
                          color: "var(--color-accent)",
                        }}
                      >
                        {b.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[14px] text-[color:var(--color-ink)] font-medium truncate">{b.name}</div>
                        <div className="text-[12px] text-[color:var(--color-ink-muted)] truncate">
                          ★ {b.rating} · {b.address} · {b.phone}
                        </div>
                      </div>
                      <ScoreBadge score={b.score} delayMs={400} />
                    </motion.div>
                  )}
                </AnimatePresence>
              );
            })}
          </div>

          {/* Side panel */}
          <div
            className="rounded-xl border p-5 space-y-4"
            style={{ borderColor: "var(--color-hairline)", background: "rgba(var(--hairline-rgb),0.02)" }}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
              Live counters
            </div>
            <Counter label="Scored" value={shown} accent={false} />
            <Counter label="Hot leads (A)" value={hotLeads} accent={true} />
            <Counter label="In outreach queue" value={Math.min(hotLeads, 3)} accent={false} />
            <div className="pt-3 border-t" style={{ borderColor: "var(--color-hairline)" }}>
              <div className="text-[12px] text-[color:var(--color-ink-soft)]">
                A-grade leads auto-load into the Conversation AI outreach queue.
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConicBorder>
  );
}

function ScoreBadge({ score, delayMs }: { score: Score; delayMs: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setShow(true), delayMs);
    return () => window.clearTimeout(id);
  }, [delayMs]);
  const colors: Record<Score, { bg: string; fg: string; border: string }> = {
    A: { bg: "var(--color-accent)", fg: "var(--color-on-accent)", border: "var(--color-accent)" },
    B: { bg: "rgba(218,196,140,0.18)", fg: "#DAC48C", border: "rgba(218,196,140,0.5)" },
    C: { bg: "rgba(var(--hairline-rgb),0.05)", fg: "var(--color-ink-muted)", border: "var(--color-hairline-2)" },
  };
  const c = colors[score];
  return (
    <motion.span
      initial={{ scale: 0.6, opacity: 0 }}
      animate={show ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.4, ease: [0.34, 1.3, 0.64, 1] }}
      className="inline-flex h-7 min-w-7 items-center justify-center rounded-full font-mono text-[11px] font-medium px-2 border"
      style={{ background: c.bg, color: c.fg, borderColor: c.border }}
    >
      {score}
    </motion.span>
  );
}

function Counter({ label, value, accent }: { label: string; value: number; accent: boolean }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-[12px] text-[color:var(--color-ink-muted)]">{label}</span>
      <span
        className="font-display text-3xl font-medium"
        style={{ color: accent ? "var(--color-accent)" : "var(--color-ink)" }}
      >
        <NumberTicker key={value} to={value} from={0} duration={0.6} play thousands />
      </span>
    </div>
  );
}
