"use client";

/**
 * SocialMediaDemo — weekly content calendar that fills itself out post by post,
 * then an engagement counter ticks up.
 */

import { useDemoMotion } from "@/components/primitives/useDemoMotion";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ConicBorder } from "@/components/primitives/ConicBorder";
import { DemoLabel, NumberTicker } from "./_micro";

type Post = { day: string; platform: "IG" | "FB" | "LI" | "TT"; caption: string; time: string };

const POSTS: Post[] = [
  { day: "Mon", platform: "IG", caption: "Behind the scenes at the clinic", time: "10:00" },
  { day: "Tue", platform: "TT", caption: "How it works · 60s", time: "14:30" },
  { day: "Wed", platform: "FB", caption: "5★ from Sarah W.", time: "11:00" },
  { day: "Thu", platform: "LI", caption: "Why we automate follow-ups", time: "09:00" },
  { day: "Fri", platform: "IG", caption: "Weekend slots open ✨", time: "17:00" },
  { day: "Sat", platform: "TT", caption: "Before / after", time: "13:00" },
  { day: "Sun", platform: "IG", caption: "Reset for the week", time: "19:30" },
];

const PLATFORM_COLOR: Record<Post["platform"], string> = {
  IG: "linear-gradient(135deg, #F58529, #DD2A7B, #8134AF)",
  FB: "linear-gradient(135deg, #1877F2, #0D5BC5)",
  LI: "linear-gradient(135deg, #0A66C2, #074E96)",
  TT: "linear-gradient(135deg, #25F4EE, #FE2C55)",
};

const STEP_MS = 700;
const TOTAL = POSTS.length * STEP_MS + 4500;

export function SocialMediaDemo() {
  const reduce = useDemoMotion();
  const [cycle, setCycle] = useState(0);
  const [filled, setFilled] = useState(reduce ? POSTS.length : 0);
  const [showStats, setShowStats] = useState(reduce);

  useEffect(() => {
    if (reduce) return;
    setFilled(0);
    setShowStats(false);
    const timers: number[] = [];
    POSTS.forEach((_, i) => {
      timers.push(window.setTimeout(() => setFilled(i + 1), 500 + i * STEP_MS));
    });
    timers.push(
      window.setTimeout(() => setShowStats(true), 500 + POSTS.length * STEP_MS + 300)
    );
    const loop = window.setTimeout(() => setCycle((c) => c + 1), TOTAL);
    timers.push(loop);
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [cycle, reduce]);

  return (
    <ConicBorder glow="#4F8DFF" duration={11} radius={20} surface="var(--color-bg-glass)" border="rgba(var(--accent-rgb),0.18)" halo>
      <div className="p-7 md:p-10 relative">
        <div className="flex items-center justify-between">
          <DemoLabel>Live · Weekly content planner</DemoLabel>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
            IG · FB · LI · TikTok
          </div>
        </div>

        {/* Week grid */}
        <div className="mt-7 grid grid-cols-7 gap-2">
          {POSTS.map((p, i) => {
            const on = i < filled;
            return (
              <div
                key={`${cycle}-${i}`}
                className="rounded-lg border p-2 min-h-[110px] flex flex-col"
                style={{
                  borderColor: on ? "rgba(var(--accent-rgb),0.35)" : "var(--color-hairline)",
                  background: on ? "rgba(var(--accent-rgb),0.04)" : "rgba(var(--hairline-rgb),0.02)",
                  transition: "all 360ms cubic-bezier(0.19,1,0.22,1)",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
                    {p.day}
                  </span>
                </div>
                <AnimatePresence>
                  {on && (
                    <motion.div
                      key={`post-${cycle}-${i}`}
                      initial={{ opacity: 0, scale: 0.85, y: 6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.45, ease: [0.34, 1.3, 0.64, 1] }}
                      className="mt-2 flex-1 flex flex-col gap-1.5"
                    >
                      <div
                        className="h-9 rounded-md grid place-items-center font-mono text-[10px] font-bold text-[color:var(--color-ink)]"
                        style={{ background: PLATFORM_COLOR[p.platform] }}
                      >
                        {p.platform}
                      </div>
                      <div className="text-[10px] text-[color:var(--color-ink-soft)] leading-tight">
                        {p.caption}
                      </div>
                      <div className="mt-auto font-mono text-[9px] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
                        {p.time}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <AnimatePresence>
          {showStats && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="mt-7 grid grid-cols-3 gap-3"
            >
              <Stat label="Reach" value={12400} accent={false} />
              <Stat label="Enquiries" value={64} accent={false} />
              <Stat label="Booked from social" value={18} accent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ConicBorder>
  );
}

function Stat({
  label,
  value,
  accent,
  suffix,
}: {
  label: string;
  value: number;
  accent: boolean;
  suffix?: string;
}) {
  return (
    <div
      className="rounded-xl border px-3 py-3 text-center"
      style={{
        borderColor: accent ? "rgba(var(--accent-rgb),0.4)" : "var(--color-hairline)",
        background: accent ? "rgba(var(--accent-rgb),0.07)" : "rgba(var(--hairline-rgb),0.02)",
      }}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
        {label}
      </div>
      <div
        className="mt-1 font-display text-2xl"
        style={{ color: accent ? "var(--color-accent)" : "var(--color-ink)" }}
      >
        <NumberTicker key={value} to={value} from={0} duration={1.1} play thousands suffix={suffix} />
      </div>
    </div>
  );
}
