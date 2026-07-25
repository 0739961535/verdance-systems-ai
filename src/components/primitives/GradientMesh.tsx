"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  className?: string;
  intensity?: "soft" | "vibrant";
};

/**
 * Dark-luxury ambient mesh - drifting turquoise glows behind page heroes.
 * Replaces the old vibrant green+blue+lime mesh.
 */
export function GradientMesh({ className = "", intensity = "soft" }: Props) {
  const reduce = useReducedMotion();
  const opacity = intensity === "vibrant" ? 0.32 : 0.18;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {/* base - pure black */}
      <div className="absolute inset-0 bg-canvas" />

      {/* top-left jewel turquoise */}
      <motion.div
        className="absolute -top-[15%] -left-[10%] h-[55vmax] w-[55vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(var(--accent-rgb),0.7) 0%, rgba(var(--accent-rgb),0) 60%)",
          opacity,
          filter: "blur(80px)",
        }}
        animate={reduce ? undefined : { x: [0, 40, -30, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* right deep teal */}
      <motion.div
        className="absolute top-[10%] -right-[10%] h-[55vmax] w-[55vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(var(--accent-deep-rgb),0.5) 0%, rgba(var(--accent-deep-rgb),0) 60%)",
          opacity,
          filter: "blur(90px)",
        }}
        animate={reduce ? undefined : { x: [0, -40, 30, 0], y: [0, 30, -40, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* bottom-center soft turquoise */}
      <motion.div
        className="absolute -bottom-[15%] left-[20%] h-[50vmax] w-[50vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(var(--accent-glow-rgb),0.45) 0%, rgba(var(--accent-glow-rgb),0) 60%)",
          opacity: opacity * 0.85,
          filter: "blur(100px)",
        }}
        animate={reduce ? undefined : { x: [0, 30, -40, 0], y: [0, -20, 20, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* vignette darkening */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 75% at 50% 50%, transparent 30%, rgba(var(--bg-rgb),0.7) 100%)",
        }}
      />
    </div>
  );
}
