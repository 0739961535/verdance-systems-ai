"use client";

/**
 * RotatingHeadline - cycles a set of phrases in place with a soft blur/slide.
 * Used in the hero after a fixed lead-in ("AI for …") so the headline keeps
 * saying, in different ways, exactly what Verdance does.
 *
 * Layout-stable: an invisible copy of the longest phrase reserves width/height
 * in the same grid cell, so nothing around it reflows as phrases swap (good for
 * CLS). Reduced-motion → a gentle cross-fade only. The full first phrase is
 * exposed to assistive tech via aria-label on the wrapper.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export function RotatingHeadline({
  phrases,
  interval = 2600,
  className = "",
}: {
  phrases: string[];
  interval?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || phrases.length <= 1) return;
    const id = window.setInterval(
      () => setI((n) => (n + 1) % phrases.length),
      interval
    );
    return () => window.clearInterval(id);
  }, [reduce, phrases.length, interval]);

  const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span
      className={`relative inline-block text-left ${className}`}
      style={{ verticalAlign: "top" }}
      aria-label={phrases[0]}
    >
      {/* invisible size-reserver (longest phrase) keeps the block from jumping */}
      <span aria-hidden className="invisible">
        {longest}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={i}
          aria-hidden
          className="absolute left-0 top-0"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: "0.42em", filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: "-0.42em", filter: "blur(6px)" }}
          transition={{ duration: reduce ? 0.25 : 0.55, ease: [0.19, 1, 0.22, 1] }}
        >
          {phrases[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
