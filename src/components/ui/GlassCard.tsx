"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";

type GlassVariant = "default" | "teal" | "blue" | "dark" | "elevated";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: GlassVariant;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  as?: "div" | "article" | "section" | "li";
  animate?: boolean;
}

const variantClasses: Record<GlassVariant, string> = {
  default:
    "bg-[rgba(var(--hairline-rgb),0.04)] border border-[rgba(30,143,255,0.12)] shadow-[0_1px_0_rgba(var(--hairline-rgb),0.06)_inset,0_8px_32px_rgba(0,0,0,0.5)]",
  teal:
    "bg-[rgba(0,212,200,0.05)] border border-[rgba(0,212,200,0.18)] shadow-[0_1px_0_rgba(0,212,200,0.08)_inset,0_8px_32px_rgba(0,0,0,0.5)]",
  blue:
    "bg-[rgba(30,143,255,0.05)] border border-[rgba(30,143,255,0.18)] shadow-[0_1px_0_rgba(30,143,255,0.08)_inset,0_8px_32px_rgba(0,0,0,0.5)]",
  dark:
    "bg-[rgba(3,11,24,0.80)] border border-[rgba(var(--hairline-rgb),0.06)] shadow-[0_8px_32px_rgba(0,0,0,0.6)]",
  elevated:
    "bg-[rgba(12,30,58,0.90)] border border-[rgba(30,143,255,0.20)] shadow-[0_1px_0_rgba(var(--hairline-rgb),0.08)_inset,0_16px_48px_rgba(0,0,0,0.6)]",
};

const hoverClasses =
  "hover:bg-[rgba(var(--hairline-rgb),0.07)] hover:border-[rgba(0,212,200,0.28)] hover:shadow-[0_1px_0_rgba(var(--hairline-rgb),0.10)_inset,0_0_0_1px_rgba(0,212,200,0.30),0_12px_48px_rgba(0,0,0,0.6),0_4px_16px_rgba(0,212,200,0.10)] hover:-translate-y-0.5 transition-all duration-350";

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const MotionDiv = motion.div;

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      variant = "default",
      hover = false,
      padding = "md",
      as: Tag = "div",
      animate = false,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const base = "rounded-2xl backdrop-blur-xl relative overflow-hidden";
    const classes = `${base} ${variantClasses[variant]} ${hover ? hoverClasses : ""} ${paddingClasses[padding]} ${className}`;

    if (animate) {
      return (
        <MotionDiv
          ref={ref}
          className={classes}
          whileHover={hover ? { y: -2 } : undefined}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          {...(props as React.ComponentProps<typeof MotionDiv>)}
        >
          {children}
        </MotionDiv>
      );
    }

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";
