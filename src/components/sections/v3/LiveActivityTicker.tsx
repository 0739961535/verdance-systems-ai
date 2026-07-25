"use client";

import { motion, useReducedMotion } from "framer-motion";

type Activity = {
  time: string;
  agent: "VOICE AI" | "MIA AI" | "REVIEW AI" | "REACTIVATION AI" | "BOOKING AI";
  action: string;
};

const ACTIVITY: Activity[] = [
  { time: "just now", agent: "VOICE AI", action: "Booked Sarah W. for Thu 14:00 at Bryant Dental" },
  { time: "3m ago",   agent: "MIA AI", action: "Replied to Lerato M. via WhatsApp - quoted aligners" },
  { time: "12m ago",  agent: "REACTIVATION AI", action: "Sent reactivation to Mike D. - 3 mo dormant" },
  { time: "21m ago",  agent: "REVIEW AI", action: "Collected 5★ review from Jess L. - Atelier Skin" },
  { time: "34m ago",  agent: "BOOKING AI", action: "Rescheduled Karabo N. to Fri 10:30" },
  { time: "48m ago",  agent: "VOICE AI", action: "Answered after-hours call from Daniels Property" },
  { time: "1h ago",   agent: "MIA AI", action: "Qualified inbound lead - routed to owner" },
  { time: "1h ago",   agent: "REACTIVATION AI", action: "Recovered 2 dormant leads at Oakbarn Home Svc" },
  { time: "2h ago",   agent: "BOOKING AI", action: "Booked Pieter J. for valuation on Sat 09:00" },
  { time: "2h ago",   agent: "REVIEW AI", action: "Filtered 2★ feedback to owner - private follow-up" },
  { time: "3h ago",   agent: "VOICE AI", action: "Captured 4 missed calls at Algar Dental" },
  { time: "4h ago",   agent: "MIA AI", action: "Closed quote thread - booked consult at Acacia" },
];

export function LiveActivityTicker() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-label="Live operations ticker"
      className="relative border-y bg-canvas"
      style={{ borderColor: "var(--color-hairline)" }}
    >
      <div className="container-wide pt-7 pb-4 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
          - Live operations · Last 24 hours
        </span>
        <span className="hidden sm:inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{
              background: "var(--color-accent)",
              boxShadow: "0 0 8px rgba(var(--accent-rgb),0.7)",
            }}
          />
          Streaming
        </span>
      </div>

      <div className="relative w-full overflow-hidden pb-7">
        <div
          className={`flex will-change-transform ${reduce ? "" : "animate-marquee"}`}
          style={{ animationDuration: "80s" }}
        >
          <TickerRow rows={ACTIVITY} />
          <TickerRow rows={ACTIVITY} />
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-32"
          style={{
            background:
              "linear-gradient(90deg, rgba(var(--bg-rgb),1) 0%, rgba(var(--bg-rgb),0.85) 40%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-32"
          style={{
            background:
              "linear-gradient(-90deg, rgba(var(--bg-rgb),1) 0%, rgba(var(--bg-rgb),0.85) 40%, transparent 100%)",
          }}
        />
      </div>
    </section>
  );
}

function TickerRow({ rows }: { rows: Activity[] }) {
  return (
    <ul className="flex shrink-0 items-center gap-0 whitespace-nowrap">
      {rows.map((r, i) => (
        <li key={i} className="flex items-center px-8">
          <ActivityItem {...r} />
          <span
            className="ml-8 inline-block h-1 w-1 rounded-full align-middle"
            style={{ background: "rgba(var(--accent-rgb),0.35)" }}
          />
        </li>
      ))}
    </ul>
  );
}

function ActivityItem({ time, agent, action }: Activity) {
  return (
    <div className="inline-flex items-center gap-4">
      <span className="relative inline-flex h-2 w-2">
        <PulseDot />
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--color-ink-muted)] inline-block min-w-[72px]">
        {time}
      </span>
      <span
        className="font-mono text-[10px] uppercase tracking-[0.25em] px-2.5 py-1 rounded border"
        style={{
          color: "var(--color-accent)",
          borderColor: "rgba(var(--accent-rgb),0.25)",
          background: "rgba(var(--accent-rgb),0.05)",
        }}
      >
        {agent}
      </span>
      <span className="text-sm text-[color:var(--color-ink-soft)]">{action}</span>
    </div>
  );
}

function PulseDot() {
  const reduce = useReducedMotion();
  return (
    <>
      {!reduce && (
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ background: "rgba(var(--accent-rgb),0.6)" }}
          animate={{ scale: [1, 2.2, 1], opacity: [0.55, 0, 0.55] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <span
        className="relative inline-block h-2 w-2 rounded-full"
        style={{
          background: "var(--color-accent)",
          boxShadow: "0 0 8px rgba(var(--accent-rgb),0.8)",
        }}
      />
    </>
  );
}
