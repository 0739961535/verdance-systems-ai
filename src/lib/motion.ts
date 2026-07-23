import type { Variants } from "framer-motion";

// ─── Core Easing ────────────────────────────────────────────
export const easings = {
  glass:   [0.25, 0.46, 0.45, 0.94] as const,
  spring:  [0.34, 1.56, 0.64, 1.0] as const,
  outExpo: [0.19, 1.00, 0.22, 1.00] as const,
  outCubic:[0.33, 1, 0.68, 1] as const,
};

// ─── Fade In Up ──────────────────────────────────────────────
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easings.glass },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easings.glass },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: easings.glass },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easings.glass },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easings.outExpo },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easings.outExpo },
  },
};

// ─── Stagger Containers ──────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

// ─── Floating Panel ──────────────────────────────────────────
export const floatingPanel = (yOffset = 8, duration = 4) => ({
  animate: {
    y: [0, -yOffset, 0],
    transition: {
      duration,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop" as const,
    },
  },
});

// ─── Glow Pulse ──────────────────────────────────────────────
export const glowPulse: Variants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

// ─── Hover States ────────────────────────────────────────────
export const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.2, ease: easings.glass } },
  whileTap:   { y: 0,  scale: 0.98, transition: { duration: 0.1 } },
};

export const hoverScale = {
  whileHover: { scale: 1.03, transition: { duration: 0.2, ease: easings.glass } },
  whileTap:   { scale: 0.97, transition: { duration: 0.1 } },
};

export const hoverGlow = {
  whileHover: {
    boxShadow: "0 0 32px rgba(0,212,200,0.25)",
    transition: { duration: 0.25 },
  },
};

// ─── Page Transition ─────────────────────────────────────────
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easings.glass },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.3, ease: easings.glass },
  },
};

// ─── Waveform Bars ───────────────────────────────────────────
export const waveformBar = (delay: number): Variants => ({
  animate: {
    scaleY: [0.3, 1, 0.3],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      repeat: Infinity,
      delay,
    },
  },
});

// ─── Number Counter ──────────────────────────────────────────
export const countUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easings.outExpo },
  },
};

// ─── Viewport Config (used with useInView) ───────────────────
export const viewportConfig = {
  once: true,
  margin: "-80px",
};
