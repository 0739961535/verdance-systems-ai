"use client";

import { useEffect, useRef, useState } from "react";
import { DASH_EVENTS, DASH_STATS } from "@/data/landing";

/**
 * LiveOpsDashboard - the simulated operations console that replaces
 * testimonials. Motion is deliberately sparse: one new event row every
 * ~4s, the affected stat increments with it, nothing else moves. The
 * whole panel is fixed-height so it can never shift layout, pauses when
 * off-screen or when the tab is hidden, and renders a static populated
 * snapshot under reduced motion.
 */

const VISIBLE_ROWS = 5;
const TICK_MS = 4200;

function chipColor(chip: string): string {
  return chip === "booking"
    ? "rgba(var(--accent-rgb), 0.5)"
    : "var(--hairline-2)";
}

type FeedRow = (typeof DASH_EVENTS)[number] & { key: number };

function clock(d: Date): string {
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function LiveOpsDashboard() {
  const [rows, setRows] = useState<FeedRow[]>(
    DASH_EVENTS.slice(0, VISIBLE_ROWS).map((e, i) => ({ ...e, key: i }))
  );
  const [leads, setLeads] = useState(DASH_STATS[0].value);
  const [booked, setBooked] = useState(DASH_STATS[2].value);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const runningRef = useRef(true);
  const cursorRef = useRef(VISIBLE_ROWS);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Re-stamp the seeded rows relative to the real clock on mount so the
  // feed's times always read as "just now", and every arriving event is
  // stamped with the actual time - times stay internally consistent.
  useEffect(() => {
    const offsets = [2, 6, 11, 17, 24]; // minutes ago, newest first
    setRows((rs) =>
      rs.map((r, i) => ({ ...r, time: clock(new Date(Date.now() - (offsets[i] ?? 30) * 60_000)) }))
    );
  }, []);

  useEffect(() => {
    if (reduced) return;

    const el = rootRef.current;
    const io = new IntersectionObserver(
      ([entry]) => { runningRef.current = entry.intersectionRatio >= 0.3; },
      { threshold: [0, 0.3] }
    );
    if (el) io.observe(el);

    const onVis = () => { runningRef.current = document.visibilityState === "visible"; };
    document.addEventListener("visibilitychange", onVis);

    const id = setInterval(() => {
      if (!runningRef.current) return;
      const c = cursorRef.current;
      cursorRef.current = c + 1;
      const next = DASH_EVENTS[c % DASH_EVENTS.length];
      if (next.booked) setBooked((b) => b + 1);
      else setLeads((l) => l + 1);
      setRows((rs) => [{ ...next, time: clock(new Date()), key: c }, ...rs].slice(0, VISIBLE_ROWS));
    }, TICK_MS);

    return () => {
      clearInterval(id);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduced]);

  const stats = [
    { label: DASH_STATS[0].label, display: `${leads}`, up: true },
    { label: DASH_STATS[1].label, display: "28s", up: false },
    { label: DASH_STATS[2].label, display: `${booked}`, up: true },
  ];

  return (
    <div
      ref={rootRef}
      className="surface relative overflow-hidden"
      style={{
        borderRadius: 20,
        background: "var(--bg-3)",
        border: "1px solid var(--hairline-2)",
      }}
    >
      {/* corner registration marks */}
      {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos) => (
        <span key={pos} aria-hidden className={`pointer-events-none absolute ${pos} font-mono text-[10px] text-[color:var(--color-ink-faint)]`}>+</span>
      ))}

      {/* header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3" style={{ borderBottom: "1px solid var(--hairline)" }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span key={i} className="w-2 h-2 rounded-full" style={{ background: "var(--ink-faint)" }} />
            ))}
          </div>
          <span className="font-mono text-[0.72rem] tracking-[0.12em] text-[color:var(--color-ink-muted)]">
            verdance-ops · live
          </span>
        </div>
        <span className="flex items-center gap-2 font-mono text-[0.66rem] tracking-[0.22em] text-[color:var(--color-ink-soft)]">
          <span className="relative flex w-2 h-2">
            {!reduced && (
              <span className="animate-pulse-ring absolute inline-flex w-full h-full rounded-full" style={{ background: "var(--signal)" }} />
            )}
            <span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: "var(--signal)" }} />
          </span>
          {reduced ? "TODAY'S ACTIVITY" : "LIVE"}
        </span>
      </div>

      {/* stat strip */}
      <div className="grid grid-cols-3" style={{ borderBottom: "1px solid var(--hairline)" }}>
        {stats.map((s) => (
          <div key={s.label} className="px-4 py-3 [&+&]:border-l" style={{ borderColor: "var(--hairline)" }}>
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[color:var(--color-ink-muted)] truncate">
              {s.label}
            </div>
            <div
              className="mt-1 font-mono text-lg md:text-2xl text-[color:var(--color-ink)]"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {s.display}
              {s.up && <span className="ml-1 text-sm" style={{ color: "var(--signal)" }}>↑</span>}
            </div>
          </div>
        ))}
      </div>

      {/* event feed - fixed height, newest on top */}
      <ul aria-live="off" className="h-[236px] md:h-[300px] overflow-hidden">
        {rows.map((e, i) => (
          <li
            key={e.key}
            className="flex items-center gap-3 px-5 py-3"
            style={{
              borderBottom: "1px solid var(--hairline)",
              borderLeft: e.booked ? "2px solid var(--signal)" : "2px solid transparent",
              animation: !reduced && i === 0 ? "lux-drop 0.5s var(--ease-out-expo) both" : undefined,
            }}
          >
            <span className="font-mono text-[0.7rem] text-[color:var(--color-ink-muted)]" style={{ fontVariantNumeric: "tabular-nums" }}>
              {e.time}
            </span>
            <span className="flex-1 text-[0.82rem] text-[color:var(--color-ink-soft)] truncate">
              {e.text}
            </span>
            <span
              className="hidden sm:inline font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[color:var(--color-ink-muted)] rounded-full px-2 py-0.5"
              style={{ border: `1px solid ${chipColor(e.chip)}` }}
            >
              {e.chip}
            </span>
          </li>
        ))}
      </ul>
      <span className="sr-only">
        A simulated feed of system activity: leads captured, calls answered and booked, reviews requested and invoices chased, around the clock.
      </span>

      {/* honesty label */}
      <div className="px-5 py-2.5" style={{ borderTop: "1px solid var(--hairline)" }}>
        <span className="font-mono text-[0.62rem] tracking-[0.08em] text-[color:var(--color-ink-faint)]">
          Simulated preview. A live view like this ships with every build.
        </span>
      </div>
    </div>
  );
}
