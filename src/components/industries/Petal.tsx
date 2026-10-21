/**
 * Petal - the bloom motif in one leaf. Each industry card carries one,
 * tinted per industry, so the /industries grid reads as one flower of
 * many petals. Decorative only.
 */
export function Petal({ tint, size = 44, className = "" }: { tint: string; size?: number; className?: string }) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 44 44"
      className={className}
      style={{ display: "block", flex: "none" }}
    >
      <path
        d="M22 4C31 12 33.5 24 22 40C10.5 24 13 12 22 4Z"
        fill={tint}
        fillOpacity="0.16"
        stroke={tint}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M22 10V34" stroke={tint} strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}
