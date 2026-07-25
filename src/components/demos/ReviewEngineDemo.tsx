"use client";

/**
 * ReviewEngineDemo - Google review accumulation.
 * Stars fill 1→5, review text types in, then rating ticks 4.6→4.8.
 * Halo pulse on the new average. Loops every ~16s.
 *
 * Caller: src/app/services/page.tsx
 */

import { useDemoMotion } from "@/components/primitives/useDemoMotion";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { DemoLabel, NumberTicker, TypingText } from "./_micro";

const REVIEW = `Sarah's whitening at Bryant Electrical was incredible. Their booking process was so smooth - got my appointment confirmed in under a minute. Genuinely the easiest experience I've had.`;

const STAR_INTERVAL = 280;
const REVIEW_START = STAR_INTERVAL * 5 + 600;
const REVIEW_MS = 5500;
const RATING_PHASE_AT = REVIEW_START + REVIEW_MS + 400;
const TOTAL_MS = RATING_PHASE_AT + 5800;

export function ReviewEngineDemo() {
  const reduce = useDemoMotion();
  const [stars, setStars] = useState(reduce ? 5 : 0);
  const [showText, setShowText] = useState(reduce);
  const [showRating, setShowRating] = useState(reduce);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduce) return;
    let timers: number[] = [];
    const run = () => {
      timers.forEach((t) => window.clearTimeout(t));
      timers = [];
      setStars(0);
      setShowText(false);
      setShowRating(false);

      for (let i = 1; i <= 5; i++) {
        timers.push(window.setTimeout(() => setStars(i), 400 + i * STAR_INTERVAL));
      }
      timers.push(window.setTimeout(() => setShowText(true), REVIEW_START));
      timers.push(window.setTimeout(() => setShowRating(true), RATING_PHASE_AT));
      timers.push(window.setTimeout(() => setCycle((n) => n + 1), TOTAL_MS - 200));
    };
    run();
    const loop = window.setInterval(run, TOTAL_MS);
    return () => {
      window.clearInterval(loop);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [reduce]);

  return (
    <div className="p-6 md:p-7">
      <div className="flex items-center justify-between">
        <DemoLabel>Reputation Engine · 5-star pipeline</DemoLabel>
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
          <GoogleG />
          Google
        </div>
      </div>

      <div
        className="mt-5 rounded-2xl border p-5"
        style={{ background: "rgba(var(--hairline-rgb),0.025)", borderColor: "var(--color-hairline)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="h-9 w-9 rounded-full grid place-items-center font-display font-medium"
            style={{ background: "rgba(var(--accent-rgb),0.12)", color: "var(--color-accent)" }}
          >
            T
          </div>
          <div className="leading-tight">
            <div className="text-[13px] font-medium text-[color:var(--color-ink)]">Tasha M.</div>
            <div className="text-[11px] text-[color:var(--color-ink-muted)]">Local Guide · 47 reviews</div>
          </div>
          <div className="ml-auto flex items-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} active={i < stars} />
            ))}
          </div>
        </div>

        <div className="mt-4 min-h-[88px] text-[13.5px] leading-relaxed text-[color:var(--color-ink-soft)]">
          {showText ? (
            <TypingText key={cycle} text={REVIEW} speed={22} cursor={false} />
          ) : (
            <span className="text-[color:var(--color-ink-faint)]">Composing review…</span>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showRating && (
          <motion.div
            key={cycle}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.55 }}
            className="mt-5 relative rounded-xl border p-5 flex items-center justify-between gap-4 overflow-hidden"
            style={{
              background: "rgba(var(--accent-rgb),0.06)",
              borderColor: "rgba(var(--accent-rgb),0.3)",
            }}
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-xl"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: [0, 0.5, 0], scale: [0.85, 1.4, 1.4] }}
              transition={{ duration: 2, ease: "easeOut" }}
              style={{ boxShadow: "0 0 0 1px rgba(var(--accent-rgb),0.45) inset, 0 0 50px rgba(var(--accent-rgb),0.30) inset" }}
            />
            <div className="leading-tight">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-accent)]">
                47-day average
              </div>
              <div className="mt-1 font-display text-2xl md:text-3xl font-medium text-[color:var(--color-ink)] flex items-baseline gap-2">
                <span className="text-[color:var(--color-ink-muted)] line-through text-xl">4.6 ★</span>
                <span>→</span>
                <span>
                  <NumberTicker
                    key={cycle}
                    to={4.8}
                    from={4.6}
                    decimals={1}
                    duration={1.4}
                    play
                    thousands={false}
                  />{" "}
                  ★
                </span>
              </div>
            </div>
            <div className="text-right leading-tight">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
                New reviews
              </div>
              <div className="mt-1 font-display text-2xl font-medium text-[color:var(--color-accent)]">
                <NumberTicker key={`r-${cycle}`} to={32} from={0} duration={1.6} play />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Star({ active }: { active: boolean }) {
  return (
    <motion.svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      animate={{
        scale: active ? [0.5, 1.2, 1] : 1,
        opacity: active ? 1 : 0.25,
      }}
      transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
      aria-hidden
    >
      <path
        d="M12 2l3 6.5 7.2.7-5.4 4.9 1.7 7.1L12 17.8 5.5 21.2l1.7-7.1L1.8 9.2 9 8.5 12 2z"
        fill={active ? "#FBBF24" : "rgba(var(--hairline-rgb),0.12)"}
      />
    </motion.svg>
  );
}

function GoogleG() {
  return (
    <svg width="11" height="11" viewBox="0 0 48 48" aria-hidden>
      <path d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.5 2.5 30.1.5 24 .5 14.9.5 7.2 5.7 3.4 13.3l7.8 6c1.8-5.4 6.8-9.3 12.8-9.3z" fill="#EA4335" />
      <path d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.5 2.8-2.2 5.2-4.7 6.8l7.6 5.9c4.4-4.1 6.9-10.1 6.9-17.2z" fill="#4285F4" />
      <path d="M11.2 28.7c-.4-1.3-.7-2.7-.7-4.2 0-1.5.2-2.9.7-4.2l-7.8-6C1.7 17.6.5 20.7.5 24.5s1.2 6.9 3 9.9l7.7-5.7z" fill="#FBBC05" />
      <path d="M24 47.5c6.1 0 11.3-2 15-5.5l-7.6-5.9c-2.1 1.4-4.8 2.2-7.4 2.2-6 0-11.1-3.9-12.9-9.3l-7.7 5.7C7.2 42.3 14.9 47.5 24 47.5z" fill="#34A853" />
    </svg>
  );
}
