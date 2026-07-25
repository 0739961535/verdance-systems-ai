"use client";

/**
 * CalendarDemo - week-view that auto-fills with bookings.
 * Empty hairline slots become turquoise pills one by one. Final
 * "Week 23 · 87% booked" summary pill animates in. Loops every ~14s.
 */

import { useDemoMotion } from "@/components/primitives/useDemoMotion";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { DemoLabel } from "./_micro";

type Slot = {
  day: number;
  hour: number;
  half?: boolean;
  service: string;
  who: string;
  highlight?: boolean;
};

const SLOTS: Slot[] = [
  { day: 0, hour: 10, service: "Callout", who: "Sarah W." },
  { day: 0, hour: 14, half: true, service: "Site visit", who: "Mike D." },
  { day: 1, hour: 9, service: "Rewire", who: "Lerato M." },
  { day: 1, hour: 11, service: "Callout", who: "Jess L." },
  { day: 2, hour: 13, service: "Boiler service", who: "Anna B." },
  { day: 3, hour: 14, service: "Callout", who: "Sarah W.", highlight: true },
  { day: 4, hour: 10, service: "New consult", who: "James P." },
  { day: 4, hour: 16, half: true, service: "Callback", who: "Maya R." },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];
const SLOT_INTERVAL_MS = 1100;
const TAIL_MS = 3200;
const TOTAL_MS = SLOTS.length * SLOT_INTERVAL_MS + TAIL_MS + 1500;

export function CalendarDemo() {
  const reduce = useDemoMotion();
  const [filled, setFilled] = useState(reduce ? SLOTS.length : 0);
  const [showSummary, setShowSummary] = useState(reduce);

  useEffect(() => {
    if (reduce) return;

    let timers: number[] = [];
    const run = () => {
      timers.forEach((t) => window.clearTimeout(t));
      timers = [];
      setFilled(0);
      setShowSummary(false);
      SLOTS.forEach((_, i) => {
        timers.push(
          window.setTimeout(() => setFilled(i + 1), 600 + i * SLOT_INTERVAL_MS)
        );
      });
      timers.push(
        window.setTimeout(
          () => setShowSummary(true),
          600 + SLOTS.length * SLOT_INTERVAL_MS + 200
        )
      );
    };
    run();
    const loop = window.setInterval(run, TOTAL_MS);
    return () => {
      window.clearInterval(loop);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [reduce]);

  return (
    <div className="p-6 md:p-7 relative">
      <div className="flex items-center justify-between">
        <DemoLabel>Smart Scheduler · Auto-booking week view</DemoLabel>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
          This week
        </div>
      </div>

      <div className="mt-6 relative">
        <div
          className="grid gap-1 mb-2"
          style={{ gridTemplateColumns: `48px repeat(7, minmax(0, 1fr))` }}
        >
          <div />
          {DAYS.map((d) => (
            <div
              key={d}
              className="text-center font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]"
            >
              {d}
            </div>
          ))}
        </div>

        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: `48px repeat(7, minmax(0, 1fr))` }}
        >
          {HOURS.map((h) => (
            <RowContents key={h} hour={h} filled={filled} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showSummary && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="mt-5 flex items-center justify-between rounded-full px-4 py-2.5"
            style={{
              background: "rgba(var(--accent-rgb),0.10)",
              border: "1px solid rgba(var(--accent-rgb),0.32)",
            }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[color:var(--color-accent)]">
              Booked while you worked
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)]">
              8 new appointments
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RowContents({ hour, filled }: { hour: number; filled: number }) {
  const hourLabel = `${hour}:00`;
  return (
    <>
      <div className="flex items-center justify-end pr-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-ink-faint)]">
          {hourLabel}
        </span>
      </div>
      {DAYS.map((_, dayIdx) => {
        const slotIdx = SLOTS.findIndex((s) => s.day === dayIdx && s.hour === hour);
        const slot = slotIdx >= 0 ? SLOTS[slotIdx] : null;
        const isFilled = slot && slotIdx < filled;
        return (
          <div key={dayIdx} className="relative h-9">
            <div
              className="absolute inset-0 rounded-md"
              style={{
                border: "1px dashed var(--color-hairline)",
                background: "rgba(var(--hairline-rgb),0.015)",
              }}
            />
            <AnimatePresence>
              {isFilled && slot && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  className="absolute inset-0 rounded-md flex flex-col justify-center px-2 overflow-hidden"
                  style={{
                    background: slot.highlight
                      ? "var(--color-accent)"
                      : "rgba(var(--accent-rgb),0.16)",
                    border: slot.highlight
                      ? "1px solid var(--color-accent)"
                      : "1px solid rgba(var(--accent-rgb),0.32)",
                    color: slot.highlight ? "var(--color-on-accent)" : "var(--color-ink)",
                    boxShadow: slot.highlight
                      ? "0 0 24px rgba(var(--accent-rgb),0.45)"
                      : undefined,
                  }}
                >
                  <div
                    className="text-[10px] font-mono leading-none truncate"
                    style={{
                      color: slot.highlight ? "rgba(4,32,29,0.78)" : "var(--color-accent)",
                      fontWeight: 500,
                    }}
                  >
                    {slot.half ? `${slot.hour}:30` : `${slot.hour}:00`}
                  </div>
                  <div className="mt-0.5 text-[10.5px] leading-tight truncate font-medium">
                    {slot.service}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </>
  );
}
