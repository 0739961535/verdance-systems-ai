"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";

type Variant = "accent" | "outline" | "ghost" | "glass";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  strength?: number;
  newTab?: boolean;
  ariaLabel?: string;
};

/**
 * A button that leans gently toward a fine pointer. Plain DOM transforms
 * with a CSS transition (no animation library). Touch and reduced-motion
 * visitors get a normal button.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "outline",
  className = "",
  strength = 0.22,
  newTab,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    const dy = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const inner = (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="magnetic-target"
      style={{ transition: "transform 0.35s var(--ease-out-expo)" }}
    >
      <span className={`btn btn-${variant} ${className}`}>{children}</span>
    </span>
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel");
    if (isExternal) {
      return (
        <a
          href={href}
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noopener noreferrer" : undefined}
          aria-label={ariaLabel}
          className="inline-block"
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} aria-label={ariaLabel} className="inline-block">
        {inner}
      </Link>
    );
  }

  return (
    <button onClick={onClick} aria-label={ariaLabel} className="inline-block">
      {inner}
    </button>
  );
}
