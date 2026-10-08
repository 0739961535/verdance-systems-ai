import { MARKS, MARK_DEFAULT, type MarkConcept } from "./marks";

/**
 * LogoMark - the Verdance mark. Colours come from the theme tokens, so it
 * flips with light and dark mode. The node can breathe (motion detail),
 * which stops under reduced motion.
 */
export function LogoMark({
  size = 32,
  concept = MARK_DEFAULT,
  animated = false,
  className,
  title = "Verdance Systems AI",
}: {
  size?: number;
  concept?: MarkConcept;
  animated?: boolean;
  className?: string;
  title?: string | null;
}) {
  const m = MARKS[concept];
  const gid = `vg-${concept}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title ?? undefined}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id={gid} gradientUnits="userSpaceOnUse" x1="0" y1="6" x2="0" y2="42">
          <stop offset="0" stopColor="rgb(var(--accent-bright-rgb))" />
          <stop offset="1" stopColor="rgb(var(--accent-rgb))" />
        </linearGradient>
      </defs>
      {[...m.strokes, ...(m.extra ?? [])].map((d) => (
        <path key={d} d={d} fill="none" stroke={`url(#${gid})`} strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      {m.inner && (
        <path d={m.inner} fill="none" stroke={`url(#${gid})`} strokeWidth="3.2" strokeLinecap="round" opacity="0.7" className={animated ? "mark-inner" : undefined} />
      )}
      <circle cx={m.node.cx} cy={m.node.cy} r={m.node.r} fill="rgb(var(--accent-rgb))" className={animated ? "mark-node" : undefined} />
    </svg>
  );
}

/** Mark + wordmark: "Verdance" in Satoshi, "Systems AI" in Instrument Serif italic. */
export function Logo({ size = 32, concept = MARK_DEFAULT, wordmark = true, animated = false }: { size?: number; concept?: MarkConcept; wordmark?: boolean; animated?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark size={size} concept={concept} animated={animated} title={wordmark ? null : "Verdance Systems AI"} />
      {wordmark && (
        <span className="inline-flex items-baseline gap-1.5 leading-none" aria-label="Verdance Systems AI">
          <span className="font-display text-[color:var(--color-ink)]" style={{ fontSize: size * 0.56, fontWeight: 600, letterSpacing: "-0.035em" }}>
            Verdance
          </span>
          <span className="font-serif text-[color:var(--color-ink-muted)]" style={{ fontSize: size * 0.56 }}>
            Systems AI
          </span>
        </span>
      )}
    </span>
  );
}
