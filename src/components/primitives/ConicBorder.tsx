"use client";

import { motion, useReducedMotion } from "framer-motion";
import React from "react";

/**
 * ConicBorder - rotating conic-gradient border that frames any child.
 * Ported from the Framer Conic_Gradient_Component, tuned for the
 * dark + turquoise Verdance system.
 *
 * Wrap any element; the rotating glow appears as a thin frame.
 */

interface ConicBorderProps {
  children: React.ReactNode;
  glow?: string;
  duration?: number;
  inset?: number;
  radius?: number;
  surface?: string;
  border?: string;
  blur?: number;
  halo?: boolean;
  className?: string;
}

export function ConicBorder({
  children,
  glow      = "#4F8DFF",
  duration  = 0,
  inset     = 1,
  radius    = 18,
  surface   = "var(--color-bg-glass)",
  border    = "rgba(var(--accent-rgb), 0.18)",
  blur      = 0,
  halo      = false,
  className = "",
}: ConicBorderProps) {
  const reduce = useReducedMotion();
  // duration <= 0 → render the gilt frame statically (no spin). Premium/quiet.
  const still = reduce || !duration || duration <= 0;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ borderRadius: radius }}
    >
      {halo && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            borderRadius: radius,
            boxShadow: `0 0 48px -8px ${glow}33, 0 24px 80px -24px ${glow}55`,
          }}
        />
      )}

      <motion.div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          top: "-450%",
          left: 0,
          right: 0,
          height: "1000%",
          background: `conic-gradient(from 0deg, transparent 200deg, ${glow})`,
          borderRadius: radius,
          zIndex: 1,
        }}
        initial={still ? false : { rotate: 0 }}
        animate={still ? undefined : { rotate: 360 }}
        transition={
          still
            ? undefined
            : { duration, ease: "linear", repeat: Infinity, repeatType: "loop" }
        }
      />

      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: inset,
          left: inset,
          right: inset,
          bottom: inset,
          backgroundColor: surface,
          border: `1px solid ${border}`,
          borderRadius: Math.max(0, radius - inset),
          backdropFilter: blur > 0 ? `blur(${blur}px)` : undefined,
          zIndex: 2,
        }}
      />

      <div className="relative" style={{ zIndex: 3, borderRadius: radius }}>
        {children}
      </div>
    </div>
  );
}
