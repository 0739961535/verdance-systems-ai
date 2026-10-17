"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import type { Moment } from "@/data/aiTeam";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";
import m from "./moments.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * One "Before / With AI" moment. Before is static and muted. On reveal the
 * With AI spine draws (700ms), its stamps arrive 120ms apart and the clock
 * counts up once (600ms). Server HTML is the final state, so nothing hides
 * without JavaScript; the card only arms the reveal when it starts below the
 * fold. Reduced motion: final state, no count.
 */
export function MomentCard({ moment, index }: { moment: Moment; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotionPref();
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const id = requestAnimationFrame(() => {
      const r = ref.current?.getBoundingClientRect();
      if (r && r.top > window.innerHeight) setArmed(true);
    });
    return () => cancelAnimationFrame(id);
  }, [reduce]);

  const hidden = armed && !inView;
  const playing = armed && inView;

  const match = /^(\d+)(.*)$/.exec(moment.after.clock);
  useEffect(() => {
    const el = numRef.current;
    if (!el || !match) return;
    const [, n, rest] = match;
    if (hidden) {
      el.textContent = `0${rest}`;
      return;
    }
    if (!playing) return;
    const controls = animate(0, Number(n), {
      duration: 0.6,
      ease: EASE,
      delay: 0.15,
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${rest}`;
      },
    });
    return () => controls.stop();
    // match is derived from a constant string
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidden, playing]);

  const t = (delay: number) => (hidden ? { duration: 0 } : { duration: 0.32, ease: EASE, delay });

  return (
    <article ref={ref} className={m.card}>
      <header className={m.head}>
        <span>{moment.stamp}</span>
        <span className={m.idx}>{String(index + 1).padStart(2, "0")}</span>
      </header>
      <h3 className={m.title}>{moment.title}</h3>
      <p className={m.bubble}>&ldquo;{moment.quote}&rdquo;</p>

      <div className={m.split}>
        <div className={m.col} data-side="before">
          <span className={m.colLabel}>Before</span>
          <p className={m.clock}>
            <span className={m.clockNum}>{moment.before.clock}</span>
            <span className={m.clockCap}>{moment.before.caption}</span>
          </p>
          <div className={m.spineWrap}>
            <span aria-hidden className={m.line} />
            <ol className={m.spine}>
            {moment.before.steps.map((st) => (
              <li key={st} className={m.stamp}>
                {st}
              </li>
            ))}
            <li className={`${m.stamp} ${m.outcome}`}>{moment.before.outcome}</li>
            </ol>
          </div>
        </div>

        <div className={m.col} data-side="after">
          <span className={m.colLabel}>With AI</span>
          <p className={m.clock}>
            <span ref={numRef} className={m.clockNum}>
              {moment.after.clock}
            </span>
            <span className={m.clockCap}>{moment.after.caption}</span>
          </p>
          <div className={m.spineWrap}>
            <motion.span
              aria-hidden
              className={m.line}
              initial={false}
              animate={{ scaleY: hidden ? 0 : 1 }}
              transition={hidden ? { duration: 0 } : { duration: 0.7, ease: EASE }}
            />
            <ol className={m.spine}>
            {moment.after.steps.map((st, i) => (
              <motion.li
                key={st}
                className={m.stamp}
                initial={false}
                animate={hidden ? { opacity: 0, y: 6 } : { opacity: 1, y: 0 }}
                transition={t(0.2 + i * 0.12)}
              >
                {st}
              </motion.li>
            ))}
            </ol>
          </div>
        </div>
      </div>

      <footer className={m.foot}>
        <p className={m.delta}>{moment.delta}</p>
        <p className={m.note}>Illustrative scenario</p>
      </footer>
    </article>
  );
}
