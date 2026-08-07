"use client";

import React from "react";

/**
 * ConicBorder - static premium frame around any child.
 *
 * Previously rendered a continuously rotating conic-gradient sweep. That
 * class of motion is banned by the Control Room design direction (and Daniel
 * explicitly asked for it to go): continuous background rotation reads as
 * distracting and costs main-thread time on mobile. The component keeps its
 * name and API so all existing call sites work unchanged, but it now renders
 * a calm hairline frame with an optional soft halo. `duration` is accepted
 * and ignored.
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
  inset     = 1,
  radius    = 18,
  surface   = "var(--color-bg-glass)",
  border    = "rgba(var(--accent-rgb), 0.18)",
  blur      = 0,
  halo      = false,
  className = "",
}: ConicBorderProps) {
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
