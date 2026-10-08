import { Reveal } from "@/components/primitives/Reveal";

type Direction = "up" | "in" | "scale" | "left" | "right";

interface FadeInProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

/**
 * FadeIn - thin alias of Reveal (progressive enhancement: visible without JS,
 * animated in by RevealObserver). Direction is reduced to "up" or "none".
 */
export function FadeIn({ children, direction = "up", delay = 0, className = "" }: FadeInProps) {
  return (
    <Reveal delay={delay} y={direction === "up" ? 24 : 0} className={className}>
      {children}
    </Reveal>
  );
}
