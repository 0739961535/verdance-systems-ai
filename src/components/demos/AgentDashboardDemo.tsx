"use client";

/**
 * AgentDashboardDemo — live operations view.
 * - Three stat tiles ticking (Conversations live, Leads engaged, Bookings)
 * - Scrolling activity feed, new entries slide in from top
 * - Bottom turquoise stripe: "Mia · 24/7 · 87% reply rate"
 *
 * Callers: src/app/page.tsx, src/app/services/page.tsx, src/app/how-it-works/page.tsx
 */

import { useDemoMotion } from "@/components/primitives/useDemoMotion";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DemoLabel, NumberTicker, WaveformBars } from "./_micro";

type FeedEntry = { id: number; agent: string; verb: string; subject: string; time: string };

const FEED_TEMPLATES: { agent: string; verb: string; subject: string }[] = [
  { agent: "Mia AI", verb: "Booked", subject: "Sarah W. for Thu 14:00" },
  { agent: "Mia AI", verb: "Replied to", subject: "Mike D. (WhatsApp)" },
  { agent: "Voice AI", verb: "Answered call from", subject: "+27 82 ••• 217 (1m 8s)" },
  { agent: "Mia AI", verb: "Reactivated", subject: "James P. · 4-month-old lead" },
  { agent: "Mia AI", verb: "Sent review invite to", subject: "Anna B." },
  { agent: "Voice AI", verb: "Handled overflow call from", subject: "+27 83 ••• 412" },
  { agent: "Mia AI", verb: "Quoted", subject: "Lerato M. (boiler service)" },
  { agent: "Mia AI", verb: "Confirmed booking with", subject: "Jess L. — Fri 10:00" },
  { agent: "Mia AI", verb: "Replied to", subject: "Maya R. (Instagram DM)" },
  { agent: "Voice AI", verb: "Booked appointment for", subject: "Tasha M. (Tue 11:30)" },
];

const FEED_INTERVAL_MS = 1800;

export function AgentDashboardDemo() {
  const reduce = useDemoMotion();
  const [feed, setFeed] = useState<FeedEntry[]>([]);
  const idRef = useRef(0);
  const [counters, setCounters] = useState({ live: 7, leads: 23, bookings: 11 });

  useEffect(() => {
    if (reduce) {
      setFeed(
        FEED_TEMPLATES.slice(0, 4).map((t, i) => ({
          id: i,
          ...t,
          time: timeOffset(i),
        }))
      );
      return;
    }

    const seeded: FeedEntry[] = FEED_TEMPLATES.slice(0, 4).map((t, i) => ({
      id: i,
      ...t,
      time: timeOffset(i),
    }));
    idRef.current = seeded.length;
    setFeed(seeded);

    const id = window.setInterval(() => {
      idRef.current += 1;
      const tmpl = FEED_TEMPLATES[idRef.current % FEED_TEMPLATES.length];
      const entry: FeedEntry = { id: idRef.current, ...tmpl, time: "just now" };
      setFeed((prev) => [entry, ...prev].slice(0, 6));
      setCounters((prev) => ({
        live: 6 + Math.floor(Math.random() * 5),
        leads:
          prev.leads + (tmpl.verb.startsWith("Replied") || tmpl.verb.startsWith("Reactivated") ? 1 : 0),
        bookings:
          prev.bookings + (tmpl.verb.startsWith("Booked") || tmpl.verb.startsWith("Confirmed") ? 1 : 0),
      }));
    }, FEED_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className="p-6 md:p-7">
      <div className="flex items-center justify-between">
        <DemoLabel>Agent Dashboard · Live operations</DemoLabel>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-accent)]">
          <WaveformBars bars={4} height={14} active />
          Streaming
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <StatTile label="Conversations · live" value={counters.live} pulse />
        <StatTile label="Leads engaged today" value={counters.leads} />
        <StatTile label="Bookings · today" value={counters.bookings} accent />
      </div>

      <div
        className="mt-5 rounded-xl border overflow-hidden"
        style={{ borderColor: "var(--color-hairline)", background: "rgba(var(--hairline-rgb),0.02)" }}
      >
        <div
          className="flex items-center justify-between px-4 py-2.5 border-b"
          style={{ borderColor: "var(--color-hairline)" }}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-ink-muted)]">
            Activity feed
          </div>
          <div className="flex items-center gap-2 text-[10.5px] text-[color:var(--color-ink-muted)] font-mono">
            <span className="inline-block h-1.5 w-1.5 rounded-full animate-glow-pulse" style={{ background: "#4F8DFF" }} />
            Live
          </div>
        </div>
        <div className="max-h-[228px] overflow-hidden">
          <AnimatePresence initial={false}>
            {feed.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1 - i * 0.12, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="px-4 py-2.5 border-b last:border-b-0 flex items-center gap-3"
                style={{ borderColor: "var(--color-hairline)" }}
              >
                <span
                  className="font-mono text-[9.5px] uppercase tracking-[0.18em] rounded-full px-2 py-0.5 shrink-0"
                  style={{
                    background: entry.agent === "Voice AI" ? "rgba(var(--accent-rgb),0.12)" : "rgba(var(--accent-rgb),0.18)",
                    color: "var(--color-accent)",
                  }}
                >
                  {entry.agent}
                </span>
                <span className="text-[12.5px] text-[color:var(--color-ink-soft)] flex-1 truncate">
                  <span className="text-[color:var(--color-ink-muted)]">{entry.verb}</span>{" "}
                  <span className="text-[color:var(--color-ink)]">{entry.subject}</span>
                </span>
                <span className="font-mono text-[10px] text-[color:var(--color-ink-muted)] shrink-0">
                  {entry.time}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div
        className="mt-5 rounded-xl px-4 py-3 flex items-center justify-between"
        style={{
          background: "linear-gradient(90deg, var(--color-accent-deep), var(--color-accent))",
          color: "var(--color-on-accent)",
        }}
      >
        <div className="flex items-center gap-3 font-medium text-[13px]">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full animate-glow-pulse"
            style={{ background: "var(--color-on-accent)" }}
          />
          Mia · 24/7 · 87% reply rate
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.25em]">
          £4,200 booked today
        </div>
      </div>
    </div>
  );
}

function StatTile({
  label, value, accent = false, pulse = false,
}: {
  label: string; value: number; accent?: boolean; pulse?: boolean;
}) {
  return (
    <div
      className="relative rounded-xl border p-4 overflow-hidden"
      style={{
        background: accent ? "rgba(var(--accent-rgb),0.08)" : "rgba(var(--hairline-rgb),0.025)",
        borderColor: accent ? "rgba(var(--accent-rgb),0.3)" : "var(--color-hairline)",
      }}
    >
      {pulse && (
        <span
          aria-hidden
          className="absolute top-3 right-3 inline-block h-1.5 w-1.5 rounded-full animate-glow-pulse"
          style={{ background: "var(--color-accent)" }}
        />
      )}
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-ink-muted)]">
        {label}
      </div>
      <div className="mt-2 font-display text-3xl font-medium" style={{ color: accent ? "var(--color-accent)" : "var(--color-ink)" }}>
        <NumberTicker key={value} to={value} from={Math.max(0, value - 2)} duration={0.7} play />
      </div>
    </div>
  );
}

function timeOffset(i: number) {
  const mins = [1, 3, 5, 8, 11, 14];
  return `${mins[i] ?? 1}m ago`;
}
