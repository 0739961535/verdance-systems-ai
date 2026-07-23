"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  className?: string;
  variant?: "subtle" | "accent" | "strong";
};

/**
 * Hairline divider — the new look.
 * No wavy lines. Just a thin gradient line that softly emerges into view.
 */
export function AnimatedDivider({ className = "", variant = "accent" }: Props) {
  const reduce = useReducedMotion();

  const gradient =
    variant === "subtle"
      ? "linear-gradient(90deg, transparent, rgba(var(--hairline-rgb),0.12), transparent)"
      : variant === "strong"
      ? "linear-gradient(90deg, transparent, rgba(var(--accent-rgb),0.7), transparent)"
      : "linear-gradient(90deg, transparent, rgba(var(--accent-rgb),0.4), transparent)";

  return (
    <div className={`relative w-full ${className}`} aria-hidden>
      <motion.div
        className="h-px w-full origin-center"
        style={{ background: gradient }}
        initial={reduce ? false : { scaleX: 0.2, opacity: 0 }}
        whileInView={reduce ? undefined : { scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "var(--color-accent)",
          boxShadow: "0 0 12px rgba(var(--accent-rgb),0.7)",
        }}
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
      />
    </div>
  );
}
