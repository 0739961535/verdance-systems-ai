"use client";

/**
 * Verdance · Demo Micro-Animations
 * Reusable primitives for the AI agent demonstration components.
 * Composable, lightweight, framer-motion driven. Respect prefers-reduced-motion.
 */

import { useDemoMotion } from "@/components/primitives/useDemoMotion";
import {
  motion,
  useAnimationFrame,
  useInView,
  AnimatePresence,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

/* ============================================================
   TypingText — types out a single line, char by char.
   ============================================================ */
export function TypingText({
  text,
  speed = 28,
  start = true,
  className = "",
  cursor = true,
  onDone,
}: {
  text: string;
  /** ms per character */
  speed?: number;
  /** when true, start typing */
  start?: boolean;
  className?: string;
  cursor?: boolean;
  onDone?: () => void;
}) {
  const [shown, setShown] = useState("");
  const reduce = useDemoMotion();
  const doneRef = useRef(false);

  useEffect(() => {
    if (!start) {
      setShown("");
      doneRef.current = false;
      return;
    }
    if (reduce) {
      setShown(text);
      if (!doneRef.current) {
        doneRef.current = true;
        onDone?.();
      }
      return;
    }
    let i = 0;
    setShown("");
    doneRef.current = false;
    const id = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        if (!doneRef.current) {
          doneRef.current = true;
          onDone?.();
        }
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed, start, reduce, onDone]);

  return (
    <span className={className}>
      {shown}
      {cursor && start && shown.length < text.length && !reduce && (
        <span
          aria-hidden
          className="inline-block ml-[1px] align-baseline animate-glow-pulse"
          style={{
            width: "0.5ch",
            height: "1em",
            background: "currentColor",
            transform: "translateY(2px)",
            opacity: 0.5,
          }}
        />
      )}
    </span>
  );
}

/* ============================================================
   TypingDots — three-dot "is typing…" indicator.
   ============================================================ */
export function TypingDots({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 ${className}`}
      aria-label="typing"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block rounded-full"
          style={{ width: 5, height: 5, background: "currentColor" }}
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}
    </span>
  );
}

/* ============================================================
   TickRow — a checklist row that ticks itself off when active.
   ============================================================ */
export function TickRow({
  label,
  active,
  className = "",
}: {
  label: string;
  active: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 text-sm ${className}`}
      style={{
        color: active ? "var(--color-ink)" : "var(--color-ink-muted)",
        transition: "color 480ms cubic-bezier(0.19,1,0.22,1)",
      }}
    >
      <span
        className="relative inline-flex h-5 w-5 items-center justify-center rounded-full"
        style={{
          background: active ? "var(--color-accent)" : "transparent",
          border: `1px solid ${active ? "var(--color-accent)" : "var(--color-hairline-2)"}`,
          transition:
            "background 360ms cubic-bezier(0.19,1,0.22,1), border-color 360ms cubic-bezier(0.19,1,0.22,1)",
        }}
      >
        <motion.svg
          width="11"
          height="11"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
          initial={false}
          animate={{ pathLength: active ? 1 : 0, opacity: active ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
        >
          <motion.path
            d="M3 8.5l3 3 7-7"
            stroke="var(--color-on-accent)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{ pathLength: active ? 1 : 0 }}
            transition={{ duration: 0.45 }}
          />
        </motion.svg>
      </span>
      <span>{label}</span>
    </div>
  );
}

/* ============================================================
   NumberTicker — counts from `from` to `to` when in view (or when `play` flips).
   ============================================================ */
export function NumberTicker({
  to,
  from = 0,
  duration = 1.4,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
  play,
  thousands = true,
}: {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** if undefined, ticker uses in-view to trigger. If defined, the boolean drives it. */
  play?: boolean;
  thousands?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useDemoMotion();
  const [value, setValue] = useState(reduce ? to : from);
  const trigger = play ?? inView;

  useEffect(() => {
    if (!trigger) return;
    if (reduce) {
      setValue(to);
      return;
    }
    let raf: number;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const v = from + (to - from) * ease(t);
      setValue(v);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [trigger, reduce, from, to, duration]);

  const display = thousands
    ? value.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : value.toFixed(decimals);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ============================================================
   PulseRing — pulsing turquoise ring you can drop behind any node.
   ============================================================ */
export function PulseRing({
  size = 56,
  color = "rgba(var(--accent-rgb),0.55)",
  duration = 2.6,
  className = "",
}: {
  size?: number;
  color?: string;
  duration?: number;
  className?: string;
}) {
  const reduce = useDemoMotion();
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute inset-0 grid place-items-center ${className}`}
    >
      <span
        className="block rounded-full"
        style={{
          width: size,
          height: size,
          border: `2px solid ${color}`,
          animation: reduce ? undefined : `pulse-ring ${duration}s ease-out infinite`,
        }}
      />
    </span>
  );
}

/* ============================================================
   HoverGlow — cursor-following turquoise glow halo wrapper.
   ============================================================ */
export function HoverGlow({
  children,
  className = "",
  radius = 220,
  intensity = 0.16,
}: {
  children: React.ReactNode;
  className?: string;
  radius?: number;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50, on: false });

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        setPos({
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
          on: true,
        });
      }}
      onMouseLeave={() => setPos((p) => ({ ...p, on: false }))}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: pos.on ? 1 : 0,
          background: `radial-gradient(${radius}px circle at ${pos.x}% ${pos.y}%, rgba(var(--accent-rgb),${intensity}), transparent 60%)`,
          borderRadius: "inherit",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ============================================================
   SignatureUnderline — draws a hand-script SVG underline.
   ============================================================ */
export function SignatureUnderline({
  className = "",
  color = "var(--color-accent)",
  width = 180,
  delay = 0,
}: {
  className?: string;
  color?: string;
  width?: number;
  delay?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <svg
      ref={ref}
      viewBox="0 0 200 14"
      width={width}
      height={14}
      className={className}
      style={{ display: "block" }}
      aria-hidden
    >
      <motion.path
        d="M2 9 C 40 2, 80 14, 120 6 S 180 4, 198 8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1], delay }}
      />
    </svg>
  );
}

/* ============================================================
   WaveformBars — animated voice waveform.
   ============================================================ */
export function WaveformBars({
  bars = 6,
  active = true,
  color = "var(--color-accent)",
  height = 36,
  className = "",
}: {
  bars?: number;
  active?: boolean;
  color?: string;
  height?: number;
  className?: string;
}) {
  const reduce = useDemoMotion();
  const seeds = useRef(
    Array.from({ length: bars }, () => ({
      phase: Math.random() * Math.PI * 2,
      freq: 0.55 + Math.random() * 0.5,
      base: 0.25 + Math.random() * 0.35,
    }))
  );

  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  useAnimationFrame((t) => {
    if (!active || reduce) return;
    const tt = t / 320;
    refs.current.forEach((el, i) => {
      if (!el) return;
      const s = seeds.current[i];
      const v = s.base + 0.55 * Math.abs(Math.sin(tt * s.freq + s.phase));
      el.style.transform = `scaleY(${v.toFixed(3)})`;
      el.style.opacity = (0.55 + 0.4 * v).toFixed(3);
    });
  });

  return (
    <span
      className={`inline-flex items-end gap-[3px] ${className}`}
      style={{ height }}
      aria-hidden
    >
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className="block rounded-[2px]"
          style={{
            width: 3,
            height,
            background: color,
            transformOrigin: "bottom center",
            transform: "scaleY(0.4)",
            transition: "opacity 200ms ease-out",
          }}
        />
      ))}
    </span>
  );
}

/* ============================================================
   DemoLabel — turquoise eyebrow with pulsing dot.
   ============================================================ */
export function DemoLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2.5 ${className}`}
      style={{ color: "var(--color-ink-muted)" }}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full animate-glow-pulse"
        style={{
          background: "var(--color-accent)",
          boxShadow: "0 0 8px rgba(var(--accent-rgb),0.7)",
        }}
      />
      <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
        {children}
      </span>
    </div>
  );
}

/* ============================================================
   useLoopStep — step through 0..n-1 on an interval.
   ============================================================ */
export function useLoopStep(steps: number, intervalMs: number, paused = false) {
  const [step, setStep] = useState(0);
  const reduce = useDemoMotion();
  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % steps);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [steps, intervalMs, paused, reduce]);
  return [step, setStep] as const;
}

/* ============================================================
   useSequencedTimeline — fire cues at specific offsets, then loop.
   ============================================================ */
export function useSequencedTimeline(
  cues: { at: number; id: string }[],
  totalMs: number,
  paused = false
) {
  const [fired, setFired] = useState<Set<string>>(new Set());
  const [cycle, setCycle] = useState(0);
  const reduce = useDemoMotion();

  useEffect(() => {
    if (paused) return;
    if (reduce) {
      setFired(new Set(cues.map((c) => c.id)));
      return;
    }
    setFired(new Set());
    const timers: number[] = [];
    cues.forEach((c) => {
      timers.push(
        window.setTimeout(() => {
          setFired((prev) => {
            const next = new Set(prev);
            next.add(c.id);
            return next;
          });
        }, c.at)
      );
    });
    const restart = window.setTimeout(() => {
      setFired(new Set());
      setCycle((n) => n + 1);
    }, totalMs);
    timers.push(restart);
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [cues, totalMs, paused, reduce, cycle]);

  return fired;
}

/* ============================================================
   FadeStage — smooth fade in/out wrapper.
   ============================================================ */
export function FadeStage({
  show,
  children,
  duration = 0.5,
  y = 8,
  className = "",
}: {
  show: boolean;
  children: React.ReactNode;
  duration?: number;
  y?: number;
  className?: string;
}) {
  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          className={className}
          initial={{ opacity: 0, y }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -y }}
          transition={{ duration, ease: [0.19, 1, 0.22, 1] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
