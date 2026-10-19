"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useTransform } from "motion/react";
import { Check, RotateCcw } from "lucide-react";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";
import { RACE } from "@/data/exampleCharts";
import s from "./charts.module.css";

/**
 * Reply-time race, Before vs With AI, for one example enquiry. Both lanes
 * run to the same finish line (the customer gets a reply); the AI lane gets
 * there on a spring in under a second, the Before lane crawls while its
 * clock runs to 47 minutes. Replays on demand. Reduced motion: the finished
 * frame. Figures are an example, labelled on the card.
 */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export default function ReplyRace() {
  const reduce = useReducedMotionPref();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [run, setRun] = useState(0);
  const ai = useMotionValue(0);
  const before = useMotionValue(0);
  const [aiSecs, setAiSecs] = useState(0);
  const [beforeMins, setBeforeMins] = useState(0);

  useMotionValueEvent(ai, "change", (v) => setAiSecs(Math.round(clamp01(v) * RACE.after.seconds)));
  useMotionValueEvent(before, "change", (v) => setBeforeMins(Math.round(clamp01(v) * RACE.before.minutes)));

  useEffect(() => {
    if (reduce) {
      ai.jump(1);
      before.jump(1);
      return;
    }
    if (!inView) return;
    ai.jump(0);
    before.jump(0);
    const a = animate(ai, 1, { type: "spring", visualDuration: 0.75, bounce: 0.28, delay: 0.3 });
    const b = animate(before, 1, { duration: 4.6, ease: [0.3, 0.1, 0.6, 1], delay: 0.3 });
    return () => {
      a.stop();
      b.stop();
    };
  }, [inView, run, reduce, ai, before]);

  const aiX = useTransform(ai, (v) => `${Math.min(v, 1.04) * 100}%`);
  const beforeX = useTransform(before, (v) => `${clamp01(v) * 100}%`);
  // Reduced motion shows the finished frame.
  const aiShown = reduce ? RACE.after.seconds : aiSecs;
  const beforeShown = reduce ? RACE.before.minutes : beforeMins;
  const aiDone = aiShown >= RACE.after.seconds;
  const beforeDone = beforeShown >= RACE.before.minutes;

  return (
    <div ref={ref} className="flex h-full flex-col justify-between">
      <div className={s.lanes}>
        {/* With AI */}
        <div className={s.lane}>
          <div className={s.laneTop}>
            <span className={s.laneLabel} data-ai="">
              {RACE.after.label}
            </span>
            <span className={s.timer} data-ai="">
              {aiShown} s
            </span>
          </div>
          <div className={s.track}>
            <motion.span className={s.fill} data-ai="" style={{ scaleX: ai }} />
            <span className={s.finish} />
            <motion.span className={s.runner} data-ai="" style={{ left: aiX }} />
          </div>
          <p className={s.laneNote}>
            {aiDone ? (
              <motion.span className={s.done} initial={reduce ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
                <Check size={13} strokeWidth={2.4} aria-hidden /> Replied. {RACE.after.note}
              </motion.span>
            ) : (
              "Message comes in"
            )}
          </p>
        </div>

        {/* Before */}
        <div className={s.lane}>
          <div className={s.laneTop}>
            <span className={s.laneLabel}>{RACE.before.label}</span>
            <span className={s.timer}>{beforeShown} min</span>
          </div>
          <div className={s.track}>
            <motion.span className={s.fill} style={{ scaleX: before }} />
            <span className={s.finish} />
            <motion.span className={s.runner} style={{ left: beforeX }} />
          </div>
          <p className={s.laneNote}>{beforeDone ? `Replied. ${RACE.before.note}` : "Still waiting"}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[color:var(--color-ink-muted)]">Finish: the customer has a reply</span>
        {!reduce && (
          <button type="button" className={s.replay} onClick={() => setRun((r) => r + 1)}>
            <RotateCcw size={13} aria-hidden /> Replay
          </button>
        )}
      </div>
    </div>
  );
}
