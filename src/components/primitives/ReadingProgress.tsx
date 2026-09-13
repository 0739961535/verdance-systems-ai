"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * A hairline that fills across the top as you read down the page.
 *
 * Same idea as the spine on the delivery timeline, turned on its side, so the
 * two read as one design language rather than two effects. It is one pixel
 * tall and the only thing on the page that moves.
 *
 * Hidden entirely under prefers-reduced-motion: a progress bar that cannot
 * animate is just a stripe.
 */
export function ReadingProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-50 h-px w-full origin-left"
      style={{
        scaleX: width,
        background:
          "linear-gradient(to right, rgba(var(--accent-rgb),0.3), rgba(var(--accent-rgb),0.9))",
      }}
    />
  );
}
