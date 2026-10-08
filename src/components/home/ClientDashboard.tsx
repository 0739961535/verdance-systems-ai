"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";

/**
 * ClientDashboard - what a client sees, inside a browser frame. Every figure
 * here is SAMPLE DATA and labelled as such on the frame and in the caption.
 * The activity feed adds a row every few seconds while on screen; static
 * under reduced motion.
 */

const TILES = [
  { label: "Conversations handled", value: "312", sub: "this month" },
  { label: "Typical first reply", value: "38 sec", sub: "day or night" },
  { label: "Bookings made", value: "47", sub: "into your diary" },
  { label: "After hours", value: "41%", sub: "of all enquiries" },
];

/** Counts a tile up from zero the first time the dashboard is on screen. */
function CountUp({ value, run }: { value: string; run: boolean }) {
  const m = value.match(/^(\d+)(.*)$/);
  const target = m ? Number(m[1]) : 0;
  const suffix = m ? m[2] : "";
  const [n, setN] = useState<number | null>(null);
  const done = useRef(false);
  useEffect(() => {
    if (!run || done.current || !target) return;
    done.current = true;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1300);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return <>{n === null ? value : `${n}${suffix}`}</>;
}

const BARS = [9, 12, 8, 14, 11, 6, 4, 13, 15, 10, 12, 16, 7, 5];

type Row = { time: string; channel: string; text: string; tag?: "booked" | "handover" };

const POOL: Row[] = [
  { time: "21:42", channel: "WhatsApp", text: "Wedding enquiry answered in 4 sec" },
  { time: "21:43", channel: "WhatsApp", text: "Viewing booked, Thu 10:00", tag: "booked" },
  { time: "21:51", channel: "Website", text: "Question about parking answered" },
  { time: "22:06", channel: "Missed call", text: "Text back sent in 8 sec" },
  { time: "22:09", channel: "Instagram", text: "Date check: 3 April is open" },
  { time: "22:14", channel: "WhatsApp", text: "Custom quote passed to your team", tag: "handover" },
  { time: "22:31", channel: "Website", text: "Consultation booked, Tue 09:30", tag: "booked" },
  { time: "22:40", channel: "WhatsApp", text: "Reminder sent for tomorrow" },
];

const INITIAL = POOL.slice(0, 4).reverse();

export function ClientDashboard() {
  const reduce = useReducedMotionPref();
  const [rows, setRows] = useState<(Row & { k: number })[]>(INITIAL.map((r, i) => ({ ...r, k: i })));
  const [visible, setVisible] = useState(false);
  const counter = useRef(4);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || !visible) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      const next = POOL[counter.current % POOL.length];
      const k = counter.current++;
      setRows((r) => [{ ...next, k }, ...r].slice(0, 4));
    }, 3200);
    return () => clearInterval(id);
  }, [reduce, visible]);

  const max = Math.max(...BARS);

  return (
    <div ref={ref} className="browser-frame light-sweep">
      {/* chrome */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid var(--hairline)" }}>
        <span className="flex gap-1.5" aria-hidden>
          <i className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(var(--hairline-rgb),0.18)" }} />
          <i className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(var(--hairline-rgb),0.18)" }} />
          <i className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(var(--hairline-rgb),0.18)" }} />
        </span>
        <span
          className="mx-auto hidden truncate rounded-full px-4 py-1 font-mono text-[0.7rem] text-[color:var(--color-ink-muted)] sm:block"
          style={{ background: "var(--surface-tint-2)" }}
        >
          Client portal · your business
        </span>
        <span
          className="ml-auto shrink-0 rounded-full px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] sm:ml-0"
          style={{ color: "var(--accent)", border: "1px solid rgba(var(--accent-rgb),0.35)" }}
        >
          Sample data
        </span>
      </div>

      <div className="grid md:grid-cols-[180px_1fr]">
        {/* sidebar */}
        <nav aria-hidden className="hidden flex-col gap-1 p-4 md:flex" style={{ borderRight: "1px solid var(--hairline)" }}>
          {["Overview", "Conversations", "Bookings", "Reports"].map((l, i) => (
            <span
              key={l}
              className="rounded-lg px-3 py-2 text-[0.85rem]"
              style={{
                color: i === 0 ? "var(--ink)" : "var(--ink-muted)",
                background: i === 0 ? "var(--surface-tint-3)" : undefined,
              }}
            >
              {l}
            </span>
          ))}
        </nav>

        <div className="min-w-0 p-4 sm:p-6">
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-display text-[1.15rem] text-[color:var(--color-ink)]">Overview</p>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[color:var(--color-ink-muted)]">October</p>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl xl:grid-cols-4" style={{ background: "var(--hairline)" }}>
            {TILES.map((t) => (
              <div key={t.label} className="p-4" style={{ background: "var(--bg-3)" }}>
                <dt className="text-[0.78rem] leading-tight text-[color:var(--color-ink-muted)]">{t.label}</dt>
                <dd
                  className="mt-2 font-display text-[color:var(--color-ink)] tabular"
                  style={{ fontSize: "clamp(1.5rem, 1.2vw + 1rem, 2rem)", letterSpacing: "-0.03em", lineHeight: 1 }}
                >
                  <CountUp value={t.value} run={visible && !reduce} />
                </dd>
                <dd className="mt-1 text-[0.72rem] text-[color:var(--color-ink-muted)]">{t.sub}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.15fr]">
            {/* chart */}
            <div className="flex flex-col rounded-2xl p-4" style={{ background: "var(--bg-3)", border: "1px solid var(--hairline)" }}>
              <p className="text-[0.8rem] text-[color:var(--color-ink-muted)]">Conversations, last 14 days</p>
              <div className="mt-4 flex h-28 flex-1 items-end gap-[5px] lg:h-auto lg:min-h-28" aria-hidden>
                {BARS.map((b, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-t-[3px]"
                    style={{
                      height: `${(b / max) * 100}%`,
                      background: i === BARS.length - 1 ? "var(--accent)" : "rgba(var(--accent-rgb),0.35)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* live feed */}
            <div className="rounded-2xl p-4" style={{ background: "var(--bg-3)", border: "1px solid var(--hairline)" }}>
              <div className="flex items-center justify-between">
                <p className="text-[0.8rem] text-[color:var(--color-ink-muted)]">Live activity</p>
                <span className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-[color:var(--color-ink-muted)]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: "var(--signal)" }} />
                    <span className="relative h-1.5 w-1.5 rounded-full" style={{ background: "var(--signal)" }} />
                  </span>
                  Live
                </span>
              </div>
              <ul className="mt-3 h-[14.5rem] overflow-hidden">
                {rows.map((r, i) => (
                  <li
                    key={r.k}
                    className={`flex items-center gap-3 py-2.5 ${i === 0 && r.k >= 4 ? "wa-enter" : ""}`}
                    style={{ borderTop: i ? "1px solid var(--hairline)" : undefined }}
                  >
                    <span className="w-11 shrink-0 font-mono text-[0.72rem] text-[color:var(--color-ink-muted)] tabular">{r.time}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.85rem] text-[color:var(--color-ink)]">{r.text}</span>
                      <span className="block font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[color:var(--color-ink-muted)]">
                        {r.channel}
                      </span>
                    </span>
                    {r.tag && (
                      <span
                        className="shrink-0 rounded-full px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.1em]"
                        style={
                          r.tag === "booked"
                            ? { color: "var(--signal)", background: "var(--signal-dim)" }
                            : { color: "var(--ink-soft)", background: "var(--surface-tint-3)" }
                        }
                      >
                        {r.tag}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
