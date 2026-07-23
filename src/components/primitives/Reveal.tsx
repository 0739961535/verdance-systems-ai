"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";

/**
 * Reveal / RevealWords / RevealLines
 *
 * Scroll-in reveals for decorative page motion (respects OS reduce-motion —
 * unlike the live demos, which always animate; see useDemoMotion).
 *
 * IMPORTANT (hydration): the SSR markup and the initial ("hidden") styles must
 * be IDENTICAL whether or not the visitor prefers reduced motion. framer's
 * useReducedMotion returns false on the server but can return true on the
 * client's first paint, so branching the *structure* or the *initial* state on
 * `reduce` produces a server/client mismatch (React #418). We therefore keep
 * structure + initial state constant and let `reduce` change only the
 * transition timing (duration/stagger → 0), which is applied after mount and
 * never appears in the SSR HTML. Reduce-motion users get an instant, motionless
 * appearance instead of a frozen/blank section.
 */

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "p" | "h1" | "h2" | "h3" | "span";
  once?: boolean;
};

export function Reveal({ children, delay = 0, y = 24, className, as = "div", once = true }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.85, ease: [0.19, 1, 0.22, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealWords({
  text,
  className,
  delay = 0,
  staggerChildren = 0.06,
  as = "h1",
}: {
  text: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduce ? 0 : staggerChildren,
        delayChildren: reduce ? 0 : delay,
      },
    },
  };
  // `hidden` stays constant so SSR + first client paint match regardless of
  // reduce-motion; only the transition duration changes.
  const child: Variants = {
    hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
    visible: {
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { duration: reduce ? 0 : 0.75, ease: [0.19, 1, 0.22, 1] },
    },
  };

  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={child}
          style={{ display: "inline-block", marginRight: "0.28em", willChange: "transform, opacity" }}
        >
          {w}
        </motion.span>
      ))}
    </MotionTag>
  );
}

export function RevealLines({
  lines,
  className,
  delay = 0,
  staggerChildren = 0.18,
}: {
  lines: string[];
  className?: string;
  delay?: number;
  staggerChildren?: number;
}) {
  const reduce = useReducedMotion();
  const container: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduce ? 0 : staggerChildren,
        delayChildren: reduce ? 0 : delay,
      },
    },
  };
  const child: Variants = {
    hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
    visible: {
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { duration: reduce ? 0 : 0.95, ease: [0.19, 1, 0.22, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {lines.map((l, i) => (
        <div key={i} style={{ overflow: "hidden" }}>
          <motion.div variants={child} style={{ willChange: "transform, opacity, filter" }}>
            {l}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}
