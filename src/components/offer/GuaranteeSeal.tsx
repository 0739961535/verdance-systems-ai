import { Scale, Timer } from "lucide-react";
import type { Guarantee } from "@/data/offer";

/**
 * GuaranteeSeal - a certificate, not a badge. Every seal states the exact
 * trigger (IF) and the exact remedy (THEN). Static on purpose: a promise
 * should not wiggle. See docs/design-system-v2.md section 2.2.
 */
export function SealMark({ kind, size = 44 }: { kind: Guarantee["key"]; size?: number }) {
  const Icon = kind === "sixty" ? Timer : Scale;
  return (
    <span aria-hidden className="relative inline-flex shrink-0 items-center justify-center rounded-full" style={{ width: size, height: size }}>
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full">
        <circle cx="24" cy="24" r="23" fill="none" stroke="var(--hairline-3)" strokeWidth="1" />
        <circle cx="24" cy="24" r="18.5" fill="none" stroke="var(--seal-ring)" strokeWidth="1" strokeDasharray="2 2.6" />
      </svg>
      <Icon size={Math.round(size * 0.4)} strokeWidth={1.6} className="relative text-[color:var(--color-accent)]" />
    </span>
  );
}

export function GuaranteeSeal({ g, compact = false }: { g: Guarantee; compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex items-start gap-4 rounded-[18px] p-4 sm:p-5" style={{ background: "var(--bg-3)", border: "1px solid var(--hairline-2)" }}>
        <SealMark kind={g.key} size={36} />
        <div className="min-w-0">
          <p className="font-display text-[1.05rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.02em" }}>{g.name}</p>
          <p className="mt-1 text-[0.9rem] leading-[1.5] text-[color:var(--color-ink-soft)]">
            If {g.ifText}, {g.thenText}
          </p>
        </div>
      </div>
    );
  }
  return (
    <article className="seal-card relative h-full rounded-[22px] p-6 md:p-8" style={{ background: "var(--bg-3)", border: "1px solid var(--hairline-2)" }}>
      <span aria-hidden className="seal-corner tl" />
      <span aria-hidden className="seal-corner tr" />
      <span aria-hidden className="seal-corner bl" />
      <span aria-hidden className="seal-corner br" />
      <div className="flex items-center justify-between gap-4">
        <SealMark kind={g.key} />
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">Guarantee {g.n}</span>
      </div>
      <h3 className="mt-6 font-display text-[color:var(--color-ink)]" style={{ fontSize: "clamp(1.45rem, 1vw + 1.1rem, 1.9rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
        {g.name}
      </h3>
      <dl className="mt-6 grid gap-3">
        <div className="grid grid-cols-[3.25rem_1fr] items-baseline gap-2">
          <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">If</dt>
          <dd className="text-[1rem] leading-[1.55] text-[color:var(--color-ink-soft)]">{g.ifText}</dd>
        </div>
        <div className="grid grid-cols-[3.25rem_1fr] items-baseline gap-2">
          <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--color-accent)]">Then</dt>
          <dd className="text-[1.05rem] font-medium leading-[1.5] text-[color:var(--color-ink)]">{g.thenText}</dd>
        </div>
      </dl>
      <p className="mt-6 pt-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]" style={{ borderTop: "1px solid var(--hairline)" }}>
        Written into your agreement
      </p>
    </article>
  );
}
