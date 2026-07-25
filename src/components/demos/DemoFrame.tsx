"use client";

/**
 * DemoFrame & DemoSection - shared wrappers used by all pages.
 * Every demo lives inside a ConicBorder card for visual cohesion.
 *
 * Callers: src/app/page.tsx, src/app/services/page.tsx, src/app/how-it-works/page.tsx
 */

import { ConicBorder } from "@/components/primitives/ConicBorder";
import { Reveal } from "@/components/primitives/Reveal";
import React from "react";

export function DemoFrame({
  children,
  className = "",
  duration = 10,
  radius = 20,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  radius?: number;
}) {
  return (
    <div className={`relative ${className}`}>
      <ConicBorder
        glow="#4F8DFF"
        duration={duration}
        radius={radius}
        surface="var(--color-bg-glass)"
        border="rgba(var(--accent-rgb),0.18)"
        halo
      >
        {children}
      </ConicBorder>
    </div>
  );
}

export function DemoSection({
  eyebrow,
  title,
  subtitle,
  body,
  side,
  children,
  reversed = false,
  background = "bg-canvas",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  body?: React.ReactNode;
  side?: React.ReactNode;
  children: React.ReactNode;
  reversed?: boolean;
  background?: string;
}) {
  return (
    <section className={`relative section-pad ${background} overflow-hidden`}>
      <div className="container-wide">
        <div
          className={`grid gap-10 md:gap-14 items-center ${
            reversed ? "md:grid-cols-[1.15fr_1fr]" : "md:grid-cols-[1fr_1.15fr]"
          }`}
        >
          <div className={reversed ? "md:order-2" : ""}>
            {eyebrow && (
              <Reveal>
                <span className="eyebrow">{eyebrow}</span>
              </Reveal>
            )}
            <Reveal delay={0.05}>
              <h2 className="mt-4 headline-section max-w-[18ch]">{title}</h2>
            </Reveal>
            {subtitle && (
              <Reveal delay={0.1}>
                <div className="mt-5 font-display text-lg md:text-xl text-[color:var(--color-ink-soft)] max-w-xl">
                  {subtitle}
                </div>
              </Reveal>
            )}
            {body && (
              <Reveal delay={0.12}>
                <div className="mt-6 max-w-xl text-[color:var(--color-ink-soft)] leading-relaxed">
                  {body}
                </div>
              </Reveal>
            )}
            {side && <div className="mt-6">{side}</div>}
          </div>
          <Reveal delay={0.15} className={reversed ? "md:order-1" : ""}>
            <DemoFrame>{children}</DemoFrame>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
