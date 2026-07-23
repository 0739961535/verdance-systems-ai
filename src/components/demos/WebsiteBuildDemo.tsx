"use client";

/**
 * WebsiteBuildDemo — laptop frame mockup where a site assembles itself.
 * navbar → hero → hero image → services → contact form → footer,
 * then Lighthouse / SEO / CWV badges drop in.
 */

import { useDemoMotion } from "@/components/primitives/useDemoMotion";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ConicBorder } from "@/components/primitives/ConicBorder";
import { DemoLabel } from "./_micro";

const STEP_MS = 900;
const STEPS = 6; // nav, hero, image, services, form, footer
const BADGE_DELAY = STEPS * STEP_MS + 600;
const TOTAL = BADGE_DELAY + 3500;

export function WebsiteBuildDemo() {
  const reduce = useDemoMotion();
  const [step, setStep] = useState(reduce ? STEPS : 0);
  const [showBadges, setShowBadges] = useState(reduce);

  useEffect(() => {
    if (reduce) return;
    const timers: number[] = [];
    setStep(0);
    setShowBadges(false);
    for (let i = 0; i < STEPS; i++) {
      timers.push(window.setTimeout(() => setStep(i + 1), 600 + i * STEP_MS));
    }
    timers.push(window.setTimeout(() => setShowBadges(true), BADGE_DELAY));
    const loop = window.setInterval(() => {
      setStep(0);
      setShowBadges(false);
      for (let i = 0; i < STEPS; i++) {
        timers.push(window.setTimeout(() => setStep(i + 1), 600 + i * STEP_MS));
      }
      timers.push(window.setTimeout(() => setShowBadges(true), BADGE_DELAY));
    }, TOTAL);
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.clearInterval(loop);
    };
  }, [reduce]);

  return (
    <ConicBorder glow="#4F8DFF" duration={11} radius={20} surface="var(--color-bg-glass)" border="rgba(var(--accent-rgb),0.18)" halo>
      <div className="p-7 md:p-10 relative">
        <div className="flex items-center justify-between">
          <DemoLabel>Live · Website assembly</DemoLabel>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
            Fast · Found on Google · Mobile-ready
          </div>
        </div>

        {/* Laptop frame */}
        <div className="mt-7 relative mx-auto max-w-[540px]">
          <div
            className="rounded-t-2xl border p-2"
            style={{
              borderColor: "var(--color-hairline-2)",
              background: "linear-gradient(180deg, var(--color-bg-3), var(--color-bg-2))",
              boxShadow: "0 30px 80px rgba(var(--accent-rgb),0.18)",
            }}
          >
            {/* Browser chrome */}
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-t-xl"
              style={{ background: "var(--color-bg-2)", borderBottom: "1px solid var(--color-hairline)" }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: "#3E4750" }} />
              <span className="h-2 w-2 rounded-full" style={{ background: "#3E4750" }} />
              <span className="h-2 w-2 rounded-full" style={{ background: "#3E4750" }} />
              <div
                className="ml-3 flex-1 rounded-md px-3 py-1 font-mono text-[10px]"
                style={{ background: "rgba(var(--hairline-rgb),0.04)", color: "var(--color-ink-muted)" }}
              >
                yourbusiness.com
              </div>
            </div>

            {/* Page */}
            <div
              className="relative rounded-b-xl p-4 min-h-[300px] overflow-hidden"
              style={{ background: "linear-gradient(180deg, var(--color-bg), var(--color-bg-2))" }}
            >
              {/* navbar */}
              <AnimatePresence>
                {step >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    className="flex items-center justify-between"
                  >
                    <div className="h-2 w-16 rounded" style={{ background: "var(--color-accent)" }} />
                    <div className="flex gap-3">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-1.5 w-10 rounded"
                          style={{ background: "rgba(var(--hairline-rgb),0.18)" }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* hero headline */}
              <AnimatePresence>
                {step >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    className="mt-7"
                  >
                    <div className="h-3 w-44 rounded" style={{ background: "var(--color-ink)" }} />
                    <div className="mt-2 h-3 w-32 rounded" style={{ background: "var(--color-accent)" }} />
                    <div className="mt-3 h-1.5 w-56 rounded" style={{ background: "rgba(var(--hairline-rgb),0.18)" }} />
                    <div className="mt-1.5 h-1.5 w-40 rounded" style={{ background: "rgba(var(--hairline-rgb),0.10)" }} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* hero image */}
              <AnimatePresence>
                {step >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mt-4 h-20 rounded-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(var(--accent-rgb),0.25), rgba(var(--accent-deep-rgb),0.55))",
                      border: "1px solid var(--color-hairline-2)",
                    }}
                  />
                )}
              </AnimatePresence>

              {/* services grid */}
              <AnimatePresence>
                {step >= 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, staggerChildren: 0.08 }}
                    className="mt-4 grid grid-cols-3 gap-2"
                  >
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        className="rounded-md p-2 border"
                        style={{
                          borderColor: "var(--color-hairline)",
                          background: "rgba(var(--hairline-rgb),0.03)",
                        }}
                      >
                        <div className="h-1.5 w-10 rounded mb-1.5" style={{ background: "var(--color-accent)" }} />
                        <div className="h-1 w-full rounded" style={{ background: "rgba(var(--hairline-rgb),0.18)" }} />
                        <div className="h-1 w-3/4 rounded mt-1" style={{ background: "rgba(var(--hairline-rgb),0.10)" }} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* contact form */}
              <AnimatePresence>
                {step >= 5 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="mt-4 rounded-md p-2.5 border space-y-1.5"
                    style={{
                      borderColor: "var(--color-hairline)",
                      background: "rgba(var(--hairline-rgb),0.025)",
                    }}
                  >
                    <div className="h-2 rounded" style={{ background: "rgba(var(--hairline-rgb),0.10)" }} />
                    <div className="h-2 rounded" style={{ background: "rgba(var(--hairline-rgb),0.10)" }} />
                    <div
                      className="mt-1 h-3 w-20 rounded ml-auto"
                      style={{ background: "var(--color-accent)" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* footer */}
              <AnimatePresence>
                {step >= 6 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="mt-4 pt-3 border-t flex justify-between items-center"
                    style={{ borderColor: "var(--color-hairline)" }}
                  >
                    <div className="h-1.5 w-14 rounded" style={{ background: "var(--color-accent)" }} />
                    <div className="flex gap-2">
                      <div className="h-1.5 w-8 rounded" style={{ background: "rgba(var(--hairline-rgb),0.18)" }} />
                      <div className="h-1.5 w-8 rounded" style={{ background: "rgba(var(--hairline-rgb),0.18)" }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          {/* Laptop base */}
          <div
            className="mx-auto h-2 rounded-b-2xl"
            style={{
              width: "92%",
              background: "linear-gradient(180deg, var(--color-bg-4), var(--color-bg))",
            }}
          />
        </div>

        {/* Score badges */}
        <AnimatePresence>
          {showBadges && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="mt-7 grid grid-cols-3 gap-3 max-w-[540px] mx-auto"
            >
              <Badge label="Speed" value="96" />
              <Badge label="SEO" value="100" />
              <Badge label="Mobile" value="Pass" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ConicBorder>
  );
}

function Badge({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-xl border px-3 py-3 text-center"
      style={{
        borderColor: "rgba(var(--accent-rgb),0.4)",
        background: "rgba(var(--accent-rgb),0.07)",
      }}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
        {label}
      </div>
      <div className="mt-1 font-display text-2xl text-[color:var(--color-ink)]">{value}</div>
    </div>
  );
}
