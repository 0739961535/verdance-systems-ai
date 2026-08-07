import { TICKER_ITEMS } from "@/data/landing";

/**
 * CapabilityTicker - the single marquee allowed on the site. Pure CSS
 * transform loop (60s), duplicated list for the seamless wrap. Under
 * reduced motion the global override stops the animation and the first
 * half of the list reads as a static strip.
 */
export function CapabilityTicker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      aria-hidden
      className="relative overflow-hidden py-4"
      style={{ borderTop: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)" }}
    >
      <div className="animate-marquee flex w-max items-center gap-10 px-5">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[color:var(--color-ink-muted)]">
              {t}
            </span>
            <span className="w-1 h-1 rounded-full" style={{ background: "rgba(var(--accent-rgb), 0.5)" }} />
          </span>
        ))}
      </div>
    </div>
  );
}
