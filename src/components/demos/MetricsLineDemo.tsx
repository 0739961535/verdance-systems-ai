"use client";

/**
 * MetricsLineDemo — small line-chart card with metrics ticking up.
 * SVG line draws itself in, area-fill rises, three KPIs count up.
 *
 * Caller: src/app/how-it-works/page.tsx
 */

import { useDemoMotion } from "@/components/primitives/useDemoMotion";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DemoLabel, NumberTicker } from "./_micro";

// Weekly bookings the system recovers, climbing over the first 8 weeks live.
const POINTS = [6, 8, 9, 11, 13, 16, 18, 21];

function toPath(points: number[], w = 320, h = 100) {
  const xs = points.map((_, i) => (i / (points.length - 1)) * w);
  const ymax = Math.max(...points) * 1.15;
  const ys = points.map((v) => h - (v / ymax) * h * 0.92 - 4);
  let d = `M ${xs[0]} ${ys[0]}`;
  for (let i = 1; i < points.length; i++) {
    const x0 = xs[i - 1];
    const y0 = ys[i - 1];
    const x1 = xs[i];
    const y1 = ys[i];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
  }
  return { line: d, area: `${d} L ${xs[xs.length - 1]} ${h} L ${xs[0]} ${h} Z`, xs, ys };
}

export function MetricsLineDemo() {
  const reduce = useDemoMotion();
  const [play, setPlay] = useState(reduce);
  const { line, area, xs, ys } = toPath(POINTS);

  useEffect(() => {
    if (reduce) return;
    const id = window.setTimeout(() => setPlay(true), 350);
    return () => window.clearTimeout(id);
  }, [reduce]);

  return (
    <div className="p-6 md:p-7">
      <div className="flex items-center justify-between">
        <DemoLabel>Your bookings · first 8 weeks live</DemoLabel>
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-ink-muted)]">
          Live · week by week
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-[1.4fr_1fr]">
        <div
          className="relative rounded-xl border p-4"
          style={{ background: "rgba(var(--hairline-rgb),0.025)", borderColor: "var(--color-hairline)" }}
        >
          <svg viewBox="0 0 320 110" width="100%" height="120" aria-hidden>
            <defs>
              <linearGradient id="met-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(var(--accent-rgb),0.32)" />
                <stop offset="100%" stopColor="rgba(var(--accent-rgb),0)" />
              </linearGradient>
            </defs>
            {[20, 50, 80].map((y) => (
              <line key={y} x1={0} x2={320} y1={y} y2={y} stroke="rgba(var(--hairline-rgb),0.05)" strokeWidth="1" />
            ))}
            <motion.path
              d={area}
              fill="url(#met-area)"
              initial={{ opacity: 0 }}
              animate={{ opacity: play ? 1 : 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
            />
            <motion.path
              d={line}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: play ? 1 : 0 }}
              transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            />
            {xs.map((x, i) => (
              <motion.circle
                key={i}
                cx={x}
                cy={ys[i]}
                r={2.4}
                fill={i === xs.length - 1 ? "var(--color-accent)" : "rgba(var(--accent-rgb),0.6)"}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: play ? 1 : 0, scale: play ? 1 : 0 }}
                transition={{ duration: 0.35, delay: 0.8 + i * 0.07 }}
              />
            ))}
            <motion.g
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: play ? 1 : 0, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              <rect x={xs[xs.length - 1] - 26} y={ys[ys.length - 1] - 22} width={30} height={14} rx={4} fill="var(--color-accent)" />
              <text x={xs[xs.length - 1] - 11} y={ys[ys.length - 1] - 12} textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--color-on-accent)" fontFamily="ui-monospace,monospace">
                21/wk
              </text>
            </motion.g>
          </svg>
        </div>

        <div className="flex flex-col gap-3 justify-center">
          <KpiTile label="Bookings · week" from={6} to={21} accent />
          <KpiTile label="Revenue · week" from={900} to={3200} prefix="£" />
          <KpiTile label="First reply" from={28} to={6} suffix="s" inverse />
        </div>
      </div>

      <p className="mt-5 text-[12.5px] text-[color:var(--color-ink-muted)] max-w-xl leading-relaxed">
        Every week the system books more of the leads you were losing. You get the report — more booked customers, more revenue, month after month.
      </p>
    </div>
  );
}

function KpiTile({
  label, from, to, prefix = "", suffix = "", accent = false, inverse = false,
}: {
  label: string; from: number; to: number; prefix?: string; suffix?: string; accent?: boolean; inverse?: boolean;
}) {
  return (
    <div
      className="rounded-xl border px-3.5 py-3 flex items-center justify-between"
      style={{
        background: accent ? "rgba(var(--accent-rgb),0.08)" : "rgba(var(--hairline-rgb),0.025)",
        borderColor: accent ? "rgba(var(--accent-rgb),0.28)" : "var(--color-hairline)",
      }}
    >
      <div className="leading-tight">
        <div className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
          {label}
        </div>
        <div
          className="mt-1 font-display text-xl font-medium"
          style={{ color: accent ? "var(--color-accent)" : "var(--color-ink)" }}
        >
          <NumberTicker to={to} from={from} duration={1.4} prefix={prefix} suffix={suffix} />
        </div>
      </div>
      <span
        className="font-mono text-[10px] uppercase tracking-[0.18em] rounded-full px-2 py-0.5"
        style={{ background: "rgba(var(--accent-rgb),0.10)", color: "var(--color-accent)" }}
      >
        {inverse ? "↓" : "↑"} {prefix}{Math.abs(to - from).toLocaleString("en-US")}{suffix}
      </span>
    </div>
  );
}
