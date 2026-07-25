"use client";

type Props = {
  size?: number;
  className?: string;
  withWordmark?: boolean;
};

/**
 * Verdance Systems AI mark - refined V with a turquoise hairline accent.
 * Designed for dark backgrounds: white V on a near-black tile, edged with turquoise.
 */
export function VSAILogo({ size = 36, className = "", withWordmark = false }: Props) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Verdance Systems AI"
      >
        <defs>
          <linearGradient id="vsai-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4F8DFF" />
            <stop offset="100%" stopColor="#4F8DFF" />
          </linearGradient>
          <linearGradient id="vsai-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#12161B" />
            <stop offset="100%" stopColor="#0A0D10" />
          </linearGradient>
        </defs>
        <rect
          x="0.75"
          y="0.75"
          width="38.5"
          height="38.5"
          rx="9"
          fill="url(#vsai-fill)"
          stroke="url(#vsai-stroke)"
          strokeWidth="1.25"
        />
        <path
          d="M11 11 L20 28 L29 11"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="30.6" r="1.6" fill="#4F8DFF" />
      </svg>
      {withWordmark && (
        <span
          className="font-display tracking-tight text-[color:var(--color-ink)]"
          style={{ fontWeight: 500, fontSize: size * 0.5, lineHeight: 1 }}
        >
          Verdance
          <span className="text-[color:var(--color-ink-muted)] ml-1.5 font-mono text-[0.55em] uppercase tracking-[0.3em]">
            Systems
          </span>
        </span>
      )}
    </div>
  );
}
