type Speed = "normal" | "fast" | "slow";

interface StaggerChildrenProps {
  children: React.ReactNode;
  speed?: Speed;
  className?: string;
  delay?: number;
}

/**
 * StaggerChildren - kept for API compatibility. Children are plain visible
 * markup; wrap each child in <Reveal delay={...}> for a staggered entrance.
 */
export function StaggerChildren({ children, className = "" }: StaggerChildrenProps) {
  return <div className={className}>{children}</div>;
}
