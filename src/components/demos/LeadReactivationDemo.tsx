"use client";

/**
 * LeadReactivationDemo - old database awakening.
 * Six "dormant" lead rows. One by one their tag flips from
 * "Lost"/"Stale"/"No-show" to a turquoise "Reactivated", with a
 * chat-bubble preview that slides out showing the outreach message.
 *
 * Caller: src/app/services/page.tsx
 */

import { useDemoMotion } from "@/components/primitives/useDemoMotion";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { DemoLabel, NumberTicker } from "./_micro";

type Lead = {
  name: string;
  initial: string;
  service: string;
  tag: string;
  message: string;
};

const LEADS: Lead[] = [
  { name: "James Pillay", initial: "J", service: "Boiler service", tag: "Lost · 4 mo", message: "Hi James - quick note from Verdance Plumbing. We've had a couple of cancellations open up this week for boiler services. Want me to hold one for you?" },
  { name: "Anna Bekker", initial: "A", service: "Boiler service", tag: "Stale · 90 days", message: "Hi Anna - it's been 3 months since your last touch-up. We can fit you in Thu morning if that helps." },
  { name: "Mike Davies", initial: "M", service: "Quote visit", tag: "No-show · 2 mo", message: "Hi Mike - sorry we didn't connect last time. Happy to rebook whenever it suits you." },
  { name: "Lerato Mokoena", initial: "L", service: "Rewire", tag: "Quote · 3 mo", message: "Hi Lerato - your quote is still valid. Free to book this week?" },
  { name: "Jess Lourens", initial: "J", service: "Boiler service", tag: "Cold · 6 mo", message: "Hi Jess - we've got a free slot this week if that boiler service is still on your list. Want me to book it?" },
  { name: "Maya Reddy", initial: "M", service: "Callback", tag: "Lost · 5 mo", message: "Hi Maya - touch-up slots open Fri afternoon. Should I save you one?" },
];

const STEP_MS = 1600;
const TAIL_MS = 3000;
const TOTAL_MS = LEADS.length * STEP_MS + TAIL_MS + 1500;

export function LeadReactivationDemo() {
  const reduce = useDemoMotion();
  const [activated, setActivated] = useState(reduce ? LEADS.length : 0);
  const [bubbleIdx, setBubbleIdx] = useState<number | null>(null);

  useEffect(() => {
    if (reduce) return;
    let timers: number[] = [];
    const run = () => {
      timers.forEach((t) => window.clearTimeout(t));
      timers = [];
      setActivated(0);
      setBubbleIdx(null);
      LEADS.forEach((_, i) => {
        timers.push(window.setTimeout(() => {
          setActivated(i + 1);
          setBubbleIdx(i);
        }, 600 + i * STEP_MS));
        timers.push(window.setTimeout(() => {
          setBubbleIdx((b) => (b === i ? null : b));
        }, 600 + i * STEP_MS + 1300));
      });
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
        <DemoLabel>Lead Reactivation · Waking up your old database</DemoLabel>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
          218 dormant leads
        </div>
      </div>

      <div className="mt-6 space-y-2">
        {LEADS.map((lead, i) => (
          <Row key={i} lead={lead} active={i < activated} showBubble={bubbleIdx === i} />
        ))}
      </div>

      <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 rounded-xl border px-4 py-3.5"
        style={{ background: "rgba(var(--accent-rgb),0.06)", borderColor: "rgba(var(--accent-rgb),0.28)" }}
      >
        <div className="leading-tight">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-accent)]">
            This week
          </div>
          <div className="mt-1 text-[13.5px] text-[color:var(--color-ink)]">
            <span className="font-medium">
              <NumberTicker to={12} from={0} duration={1.4} key={activated} play={activated === LEADS.length} />
              {" of 218"}
            </span>{" "}
            dormant leads reactivated · <span className="text-[color:var(--color-accent)] font-medium">4 bookings</span>
          </div>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]">
          £2,480 recovered
        </div>
      </div>
    </div>
  );
}

function Row({
  lead, active, showBubble,
}: {
  lead: Lead; active: boolean; showBubble: boolean;
}) {
  return (
    <div className="relative">
      <motion.div
        animate={{ opacity: active ? 1 : 0.65 }}
        transition={{ duration: 0.35 }}
        className="flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5"
        style={{
          background: active ? "rgba(var(--accent-rgb),0.04)" : "rgba(var(--hairline-rgb),0.025)",
          borderColor: active ? "rgba(var(--accent-rgb),0.22)" : "var(--color-hairline)",
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="inline-flex h-8 w-8 items-center justify-center rounded-full font-display font-medium text-[12px] shrink-0"
            style={{
              background: active ? "var(--color-accent)" : "rgba(var(--hairline-rgb),0.06)",
              color: active ? "var(--color-on-accent)" : "var(--color-ink-muted)",
              transition: "all 360ms cubic-bezier(0.19,1,0.22,1)",
            }}
          >
            {lead.initial}
          </span>
          <div className="leading-tight min-w-0">
            <div className="text-[13.5px] font-medium text-[color:var(--color-ink)] truncate">{lead.name}</div>
            <div className="text-[11px] text-[color:var(--color-ink-muted)] truncate">{lead.service}</div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {active ? (
            <motion.span
              key="on"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.35 }}
              className="font-mono text-[9.5px] uppercase tracking-[0.22em] rounded-full px-2.5 py-1 shrink-0 flex items-center gap-1.5"
              style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--color-on-accent)" }} />
              Reactivated
            </motion.span>
          ) : (
            <motion.span
              key="off"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-mono text-[9.5px] uppercase tracking-[0.22em] rounded-full px-2.5 py-1 shrink-0"
              style={{ background: "rgba(var(--hairline-rgb),0.04)", color: "var(--color-ink-muted)" }}
            >
              {lead.tag}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, x: -8, y: -4 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="absolute left-12 right-3 -bottom-2 translate-y-full rounded-2xl rounded-tl-md px-3 py-2 text-[12px] font-medium z-10"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-on-accent)",
              boxShadow: "0 16px 36px rgba(var(--accent-rgb),0.25)",
              maxWidth: 460,
            }}
          >
            {lead.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
