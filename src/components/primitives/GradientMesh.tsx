type Props = {
  className?: string;
  intensity?: "soft" | "vibrant";
};

/**
 * Ambient glow behind page heroes. Static radial gradients only: no blur
 * filters and no animation (quiet, cheap, safe on iOS Safari). Server
 * component, zero JS.
 */
export function GradientMesh({ className = "", intensity = "soft" }: Props) {
  const opacity = intensity === "vibrant" ? 0.24 : 0.13;
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute inset-0 bg-canvas" />
      <div
        className="absolute inset-0"
        style={{
          background: [
            `radial-gradient(60vmax 60vmax at 12% -5%, rgba(var(--accent-rgb),${opacity}) 0%, transparent 60%)`,
            `radial-gradient(55vmax 55vmax at 105% 18%, rgba(var(--accent-deep-rgb),${opacity * 0.9}) 0%, transparent 60%)`,
          ].join(", "),
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 75% 75% at 50% 50%, transparent 30%, rgba(var(--bg-rgb),0.7) 100%)" }}
      />
    </div>
  );
}
