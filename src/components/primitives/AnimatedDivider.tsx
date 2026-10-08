type Props = {
  className?: string;
  variant?: "subtle" | "accent" | "strong";
};

/** Hairline divider. Static (server component, zero JS). */
export function AnimatedDivider({ className = "", variant = "accent" }: Props) {
  const gradient =
    variant === "subtle"
      ? "linear-gradient(90deg, transparent, rgba(var(--hairline-rgb),0.12), transparent)"
      : variant === "strong"
        ? "linear-gradient(90deg, transparent, rgba(var(--accent-rgb),0.7), transparent)"
        : "linear-gradient(90deg, transparent, rgba(var(--accent-rgb),0.35), transparent)";
  return (
    <div className={`relative w-full ${className}`} aria-hidden>
      <div className="h-px w-full" style={{ background: gradient }} />
    </div>
  );
}
