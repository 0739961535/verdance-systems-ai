"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
  intensity?: "soft" | "vibrant";
};

/**
 * Dark-luxury ambient mesh - drifting turquoise glows behind page heroes.
 *
 * Desktop renders three large `filter: blur(80-100px)` layers drifting via
 * framer-motion. That is far too expensive for iOS Safari: each blurred
 * 55vmax layer forces a huge offscreen GPU buffer, and animating them
 * re-composites those buffers every frame - on a memory-limited iPhone it
 * exhausts the tab and WebKit reloads the page in a loop (happens on every
 * page that renders this, but not the blur-free home page).
 *
 * So on mobile / touch / reduced-motion we render a STATIC, filter-free
 * version built from plain radial-gradients: the same soft glow, composited
 * once, with no blur filter and no per-frame work. Only a wide, fine-pointer
 * (desktop) viewport gets the animated blur mesh.
 */
export function GradientMesh({ className = "", intensity = "soft" }: Props) {
  const reduce = useReducedMotion();
  const [rich, setRich] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const on = () => setRich(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const opacity = intensity === "vibrant" ? 0.32 : 0.18;

  // Mobile / touch / reduced-motion: cheap static gradients. No blur filter,
  // no framer-motion - composited once, so it can never OOM the tab.
  if (!rich || reduce) {
    return (
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        aria-hidden
      >
        <div className="absolute inset-0 bg-canvas" />
        <div
          className="absolute inset-0"
          style={{
            background: [
              `radial-gradient(60vmax 60vmax at 12% -5%, rgba(var(--accent-rgb),${opacity}) 0%, transparent 60%)`,
              `radial-gradient(55vmax 55vmax at 105% 18%, rgba(var(--accent-deep-rgb),${opacity * 0.9}) 0%, transparent 60%)`,
              `radial-gradient(55vmax 55vmax at 38% 112%, rgba(var(--accent-glow-rgb),${opacity * 0.75}) 0%, transparent 62%)`,
            ].join(", "),
          }}
        />
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

  // Desktop only: the full animated blur mesh.
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
        animate={{ x: [0, 40, -30, 0], y: [0, 30, -20, 0] }}
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
        animate={{ x: [0, -40, 30, 0], y: [0, 30, -40, 0] }}
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
        animate={{ x: [0, 30, -40, 0], y: [0, -20, 20, 0] }}
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
