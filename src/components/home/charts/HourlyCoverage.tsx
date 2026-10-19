"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "motion/react";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";
import { ENQUIRIES_BY_HOUR, OFFICE_CLOSE, OFFICE_OPEN, answeredBefore } from "@/data/exampleCharts";
import s from "./charts.module.css";

/**
 * Enquiries answered within the hour, by hour of one example day. Ghost
 * columns are what came in; the fill is what got answered. "Before" only
 * fills office hours; "With AI" fills the night as well, in green, so the
 * after-hours cover is the thing you see. Starts on Before and switches
 * itself once, then it is the visitor's toggle. Reduced motion: With AI,
 * static.
 */

const MAX = Math.max(...ENQUIRIES_BY_HOUR);
const TOTAL = ENQUIRIES_BY_HOUR.reduce((a, b) => a + b, 0);
const BEFORE = ENQUIRIES_BY_HOUR.reduce((a, n, h) => a + answeredBefore(h, n), 0);
const pad = (h: number) => String(h).padStart(2, "0");
const isNight = (h: number) => h < OFFICE_OPEN || h >= OFFICE_CLOSE;

type Mode = "before" | "after";

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const last = useRef(value);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const from = last.current;
    last.current = value;
    if (from === value) return;
    const c = animate(from, value, {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = String(Math.round(v))),
    });
    return () => c.stop();
  }, [value]);
  return (
    <span ref={ref} className={s.statNum}>
      {value}
    </span>
  );
}

export default function HourlyCoverage() {
  const reduce = useReducedMotionPref();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const [mode, setMode] = useState<Mode>("before");
  const [touched, setTouched] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const shownMode: Mode = reduce && !touched ? "after" : mode;

  // Play the story once: grow on Before, then switch to With AI.
  useEffect(() => {
    if (!inView || touched || reduce) return;
    const t = window.setTimeout(() => setMode("after"), 1900);
    return () => window.clearTimeout(t);
  }, [inView, touched, reduce]);

  const pick = (m: Mode) => {
    setTouched(true);
    setMode(m);
  };

  const answered = shownMode === "after" ? TOTAL : BEFORE;
  const grown = inView || reduce;

  return (
    <div ref={ref} className="flex h-full flex-col">
      <div className={s.hoursTop}>
        <div className={s.toggle} role="group" aria-label="Show before or with AI">
          {(["before", "after"] as const).map((m) => (
            <button key={m} type="button" className={s.toggleBtn} aria-pressed={shownMode === m} onClick={() => pick(m)}>
              {shownMode === m && (
                <motion.span layoutId="hours-pill" className={s.togglePill} transition={{ type: "spring", visualDuration: 0.35, bounce: 0.2 }} />
              )}
              {m === "before" ? "Before" : "With AI"}
            </button>
          ))}
        </div>
        <p className={s.stat} aria-live="polite">
          Answered within the hour: <Counter value={answered} /> of <span className={s.statNum}>{TOTAL}</span>
        </p>
      </div>

      <div
        className={s.plot}
        role="img"
        aria-label={`Example day: ${TOTAL} messages. Before, ${BEFORE} answered within the hour, office hours only. With AI, all ${TOTAL}, including ${TOTAL - BEFORE} after hours.`}
        onMouseLeave={() => setHover(null)}
      >
        <span aria-hidden className={s.night} style={{ left: 0, width: `${(OFFICE_OPEN / 24) * 100}%` }}>
          <span className={s.nightLabel} style={{ left: 8 }}>
            After hours
          </span>
        </span>
        <span aria-hidden className={s.night} style={{ left: `${(OFFICE_CLOSE / 24) * 100}%`, right: 0 }}>
          <span className={s.nightLabel} style={{ right: 8 }}>
            After hours
          </span>
        </span>

        {ENQUIRIES_BY_HOUR.map((n, h) => {
          const got = shownMode === "after" ? n : answeredBefore(h, n);
          const frac = n ? got / n : 0;
          const height = n ? Math.max(6, (n / MAX) * 100) : 2;
          return (
            <div key={h} className={s.col} aria-hidden onMouseEnter={() => setHover(h)}>
              <motion.div
                className={s.colBox}
                style={{ height: `${height}%`, transformOrigin: "50% 100%" }}
                initial={reduce ? false : { scaleY: 0, opacity: 0 }}
                animate={grown ? { scaleY: 1, opacity: 1 } : undefined}
                transition={{ type: "spring", visualDuration: 0.6, bounce: 0.18, delay: reduce ? 0 : h * 0.025 }}
              >
                <span className={s.ghost} />
                <motion.span
                  className={s.bar}
                  data-after={isNight(h) && shownMode === "after" ? "" : undefined}
                  initial={false}
                  animate={{ scaleY: grown ? frac : 0 }}
                  transition={{
                    type: "spring",
                    visualDuration: 0.55,
                    bounce: 0.22,
                    // night bars fill outward from the office day, like a tide
                    delay: reduce ? 0 : isNight(h) ? 0.1 + (h < OFFICE_OPEN ? OFFICE_OPEN - h : h - OFFICE_CLOSE + 1) * 0.045 : 0.3 + h * 0.02,
                  }}
                />
                {hover === h && (
                  <span className={s.tip}>
                    <b>{pad(h)}:00</b> · {n} in · {got} answered
                  </span>
                )}
              </motion.div>
              {h % 3 === 0 && (
                <span className={`${s.tick} ${h % 6 ? "hidden md:inline" : ""}`}>{pad(h)}</span>
              )}
            </div>
          );
        })}
      </div>

      <div className={s.legend} aria-hidden>
        <span className={s.key}>
          <i className={s.sw3} /> Came in
        </span>
        <span className={s.key}>
          <i className={s.sw1} /> Answered, office hours
        </span>
        <span className={s.key}>
          <i className={s.sw2} /> Answered, after hours
        </span>
      </div>
    </div>
  );
}
