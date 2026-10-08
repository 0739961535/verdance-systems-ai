import { TICKER_ITEMS } from "@/data/landing";

/** A slow marquee of what the system does. CSS only; stops under reduced motion. */
export function CapabilityMarquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {TICKER_ITEMS.map((t) => (
        <li key={t} className="flex items-center whitespace-nowrap px-6 font-display text-[1.05rem] text-[color:var(--color-ink-soft)] md:text-[1.25rem]" style={{ letterSpacing: "-0.02em" }}>
          {t}
          <span aria-hidden className="ml-12 h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="What it does" className="marquee-mask overflow-hidden py-8 md:py-10" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="animate-marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
