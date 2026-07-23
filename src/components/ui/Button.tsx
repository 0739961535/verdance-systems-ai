"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { forwardRef } from "react";

type Variant = "primary" | "emerald" | "ghost" | "minimal";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-[0.82rem] gap-1.5",
  md: "px-6 py-3 text-[0.9rem] gap-2",
  lg: "px-8 py-4 text-[0.95rem] gap-2.5",
};

/* Luxury palette: cream primary, emerald jewel accent, hairlined ghost, naked minimal */
const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-[#ECE7DD] to-[#C9C3B7] text-[#050807] font-semibold border border-[rgba(236,231,221,0.4)] shadow-[0_1px_0_rgba(var(--hairline-rgb),0.4)_inset,0_8px_24px_rgba(0,0,0,0.45)] hover:shadow-[0_1px_0_rgba(var(--hairline-rgb),0.5)_inset,0_12px_32px_rgba(0,0,0,0.55)] hover:-translate-y-px active:translate-y-0",
  emerald:
    "bg-gradient-to-b from-[#4F8DFF] to-[#00C896] text-[#050807] font-semibold border border-[rgba(0,200,150,0.5)] shadow-[0_1px_0_rgba(var(--hairline-rgb),0.25)_inset,0_8px_24px_rgba(0,200,150,0.22)] hover:shadow-[0_1px_0_rgba(var(--hairline-rgb),0.3)_inset,0_12px_32px_rgba(0,200,150,0.32)] hover:-translate-y-px active:translate-y-0",
  ghost:
    "bg-transparent text-[#ECE7DD] font-medium border border-[rgba(236,231,221,0.18)] hover:bg-[rgba(236,231,221,0.04)] hover:border-[#D4B27E]",
  minimal:
    "bg-transparent text-[#8B968F] hover:text-[#ECE7DD] font-medium",
};

const MotionButton = motion.button;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      external,
      icon,
      iconPosition = "right",
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center rounded-md cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] select-none whitespace-nowrap relative overflow-hidden";
    const classes = `${base} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

    const content = (
      <>
        {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
        {children}
        {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
      </>
    );

    if (href) {
      if (external) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
            {content}
          </a>
        );
      }
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      );
    }

    return (
      <MotionButton
        ref={ref}
        className={classes}
        whileTap={{ scale: 0.98 }}
        {...(props as React.ComponentProps<typeof MotionButton>)}
      >
        {content}
      </MotionButton>
    );
  }
);

Button.displayName = "Button";
