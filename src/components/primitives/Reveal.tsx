import type { CSSProperties, ReactNode } from "react";

/**
 * Reveal / RevealWords / RevealLines - progressive-enhancement scroll reveals.
 *
 * These render plain, fully visible HTML on the server. Nothing is hidden by
 * an inline style, so content shows without JavaScript, in reader modes, to
 * crawlers, and if an observer never fires (the old framer `initial={{
 * opacity: 0 }}` pattern left /services as a dark empty screen when that
 * happened).
 *
 * The motion is layered on by <RevealObserver/> (mounted once in the root
 * layout): it marks anything already on screen as revealed, then adds
 * `reveal-ready` to <html>. Only from that point can CSS hold an element
 * below the fold back until it scrolls into view. Reduced-motion visitors
 * never get the hidden state at all. See `[data-reveal]` in globals.css.
 *
 * No "use client": these are server components and ship zero JS.
 */

type Tag = "div" | "section" | "p" | "h1" | "h2" | "h3" | "span" | "li";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: Tag;
  /** Kept for API compatibility. Reveals always run once. */
  once?: boolean;
  style?: CSSProperties;
  id?: string;
};

function revealStyle(delay: number, y: number, style?: CSSProperties): CSSProperties {
  return {
    ...style,
    ["--reveal-delay" as string]: `${Math.max(0, delay)}s`,
    ["--reveal-y" as string]: `${y}px`,
  };
}

export function Reveal({ children, delay = 0, y = 20, className, as = "div", style, id }: RevealProps) {
  const Tag = as;
  return (
    <Tag data-reveal="" id={id} className={className} style={revealStyle(delay, y, style)}>
      {children}
    </Tag>
  );
}

export function RevealWords({
  text,
  className,
  delay = 0,
  staggerChildren = 0.05,
  as = "h1",
}: {
  text: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const Tag = as;
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          data-reveal=""
          style={{ display: "inline-block", marginRight: "0.28em", ...revealStyle(delay + i * staggerChildren, 24) }}
        >
          {w}
        </span>
      ))}
    </Tag>
  );
}

export function RevealLines({
  lines,
  className,
  delay = 0,
  staggerChildren = 0.12,
}: {
  lines: string[];
  className?: string;
  delay?: number;
  staggerChildren?: number;
}) {
  return (
    <div className={className}>
      {lines.map((l, i) => (
        <div key={i} data-reveal="" style={revealStyle(delay + i * staggerChildren, 32)}>
          {l}
        </div>
      ))}
    </div>
  );
}
