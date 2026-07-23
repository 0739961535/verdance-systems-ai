"use client";

/**
 * PaymentsDemo — three-stage invoice → payment link → confirmation flow.
 */

import { useDemoMotion } from "@/components/primitives/useDemoMotion";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ConicBorder } from "@/components/primitives/ConicBorder";
import { DemoLabel, NumberTicker } from "./_micro";

const ORDERS = [
  { service: "Bathroom install · deposit", total: 1200, customer: "Sarah W." },
  { service: "Invisalign · month 1", total: 2400, customer: "Mike D." },
  { service: "Veneers · deposit", total: 2900, customer: "Lerato M." },
];

const STAGE_MS = 3000;
const TOTAL = STAGE_MS * 3;

export function PaymentsDemo() {
  const reduce = useDemoMotion();
  const [cycle, setCycle] = useState(0);
  const [stage, setStage] = useState(0);
  const order = ORDERS[cycle % ORDERS.length];

  useEffect(() => {
    if (reduce) {
      setStage(2);
      return;
    }
    const stepId = window.setInterval(() => {
      setStage((s) => (s < 2 ? s + 1 : s));
    }, STAGE_MS);
    const loopId = window.setInterval(() => {
      setStage(0);
      setCycle((c) => c + 1);
    }, TOTAL);
    return () => {
      window.clearInterval(stepId);
      window.clearInterval(loopId);
    };
  }, [reduce]);

  return (
    <ConicBorder glow="#4F8DFF" duration={11} radius={20} surface="var(--color-bg-glass)" border="rgba(var(--accent-rgb),0.18)" halo>
      <div className="p-7 md:p-10 relative">
        <div className="flex items-center justify-between">
          <DemoLabel>Live · Payments flow</DemoLabel>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
            Stripe
          </div>
        </div>

        {/* Stage indicator */}
        <div className="mt-6 flex items-center gap-2">
          {["Invoice", "Payment link", "Paid"].map((label, i) => {
            const active = i === stage;
            const done = i < stage;
            return (
              <div key={label} className="flex items-center gap-2">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.28em]"
                  style={{
                    color: active
                      ? "var(--color-accent)"
                      : done
                      ? "var(--color-ink-soft)"
                      : "var(--color-ink-muted)",
                    transition: "color 320ms",
                  }}
                >
                  0{i + 1} · {label}
                </span>
                {i < 2 && (
                  <span
                    className="inline-block w-6 h-px"
                    style={{ background: done || active ? "var(--color-accent)" : "var(--color-hairline-2)" }}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-7 min-h-[330px] relative">
          <AnimatePresence mode="wait">
            {stage === 0 && (
              <motion.div
                key={`inv-${cycle}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
                className="rounded-2xl border p-6 max-w-md mx-auto"
                style={{
                  borderColor: "var(--color-hairline)",
                  background: "linear-gradient(180deg, rgba(var(--hairline-rgb),0.04), rgba(var(--hairline-rgb),0.01))",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
                    Invoice · #{1024 + cycle}
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
                    Draft → Send
                  </span>
                </div>
                <div className="mt-4 text-[color:var(--color-ink)] font-display text-lg">Verdance Studio</div>
                <div className="text-[12px] text-[color:var(--color-ink-muted)]">
                  Bill to · {order.customer}
                </div>
                <div className="mt-5 pt-4 border-t" style={{ borderColor: "var(--color-hairline)" }}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[14px] text-[color:var(--color-ink-soft)]">{order.service}</span>
                    <span className="text-[14px] text-[color:var(--color-ink)]">£{order.total.toLocaleString()}.00</span>
                  </div>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-[12px] text-[color:var(--color-ink-muted)]">VAT incl.</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t" style={{ borderColor: "var(--color-hairline)" }}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[13px] text-[color:var(--color-ink-soft)]">Total due</span>
                    <span className="font-display text-3xl text-[color:var(--color-ink)]">
                      £{order.total.toLocaleString()}
                    </span>
                  </div>
                </div>
                <button
                  className="mt-5 w-full rounded-xl py-3 font-mono text-[11px] uppercase tracking-[0.3em]"
                  style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }}
                >
                  Send pay link →
                </button>
              </motion.div>
            )}

            {stage === 1 && (
              <motion.div
                key={`link-${cycle}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
                className="mx-auto max-w-[320px]"
              >
                {/* Phone mock */}
                <div
                  className="rounded-[36px] border-2 p-3"
                  style={{
                    borderColor: "var(--color-hairline-2)",
                    background: "linear-gradient(180deg, var(--color-bg-2), var(--color-bg))",
                    boxShadow: "0 30px 80px rgba(var(--accent-rgb),0.18)",
                  }}
                >
                  <div className="rounded-[28px] p-5" style={{ background: "var(--color-bg-2)" }}>
                    <div className="flex justify-between text-[10px] font-mono text-[color:var(--color-ink-muted)]">
                      <span>14:22</span>
                      <span>SMS · Pay link</span>
                    </div>
                    <div
                      className="mt-5 rounded-2xl rounded-bl-md px-4 py-3"
                      style={{ background: "rgba(var(--hairline-rgb),0.04)" }}
                    >
                      <div className="text-[12px] text-[color:var(--color-ink-soft)]">Verdance Studio</div>
                      <div className="mt-1 text-[13px] text-[color:var(--color-ink)] leading-relaxed">
                        Hi {order.customer.split(" ")[0]} — invoice ready. Tap to pay £{order.total.toLocaleString()}.
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-3 rounded-xl px-3 py-2.5 inline-block font-mono text-[11px] uppercase tracking-[0.28em]"
                        style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }}
                      >
                        Tap to pay · £{order.total.toLocaleString()}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {stage === 2 && (
              <motion.div
                key={`paid-${cycle}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
                className="rounded-2xl border p-8 max-w-md mx-auto text-center relative overflow-hidden"
                style={{
                  borderColor: "rgba(var(--accent-rgb),0.4)",
                  background: "rgba(var(--accent-rgb),0.07)",
                }}
              >
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: [0, 0.55, 0], scale: [0.6, 1.6, 1.6] }}
                  transition={{ duration: 1.8 }}
                  style={{
                    border: "1px solid rgba(var(--accent-rgb),0.5)",
                    borderRadius: 16,
                    boxShadow: "0 0 40px rgba(var(--accent-rgb),0.5) inset",
                  }}
                />
                <div
                  className="mx-auto inline-flex h-14 w-14 rounded-full grid place-items-center"
                  style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }}
                >
                  <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8.5l3 3 7-7"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
                  Paid · 14:22 · Stripe
                </div>
                <div className="mt-3 font-display text-3xl text-[color:var(--color-ink)]">
                  £<NumberTicker key={cycle} to={order.total} from={0} duration={1.1} play thousands />
                </div>
                <div className="mt-1 text-[13px] text-[color:var(--color-ink-soft)]">
                  {order.customer} · {order.service}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.28em]"
                  style={{
                    border: "1px solid var(--color-hairline-2)",
                    background: "rgba(var(--hairline-rgb),0.03)",
                    color: "var(--color-ink-soft)",
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--color-accent)" }}
                  />
                  Marked complete in CRM
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ConicBorder>
  );
}
