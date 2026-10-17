import { PhoneCall } from "lucide-react";

/**
 * Coming: "Hear it call you in 30 seconds". The /try page lives in the Ashford
 * app; do not link it until Daniel says it is live.
 *
 * Hidden by default. Renders a disabled placeholder card only when
 * NEXT_PUBLIC_SHOW_TRY_DEMO is "1". It must not link anywhere yet.
 */
export function HearItCallYou() {
  if (process.env.NEXT_PUBLIC_SHOW_TRY_DEMO !== "1") return null;
  return (
    <section className="bg-canvas-2 py-[var(--space-block)]" aria-labelledby="try-title" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="container-narrow">
        <div
          className="flex flex-col gap-4 rounded-[22px] p-6 sm:flex-row sm:items-center sm:justify-between md:p-8"
          style={{ background: "var(--bg-3)", border: "1px dashed var(--hairline-3)" }}
        >
          <div className="flex items-start gap-4">
            <PhoneCall size={20} strokeWidth={1.5} aria-hidden className="mt-1 shrink-0 text-[color:var(--color-ink-muted)]" />
            <div>
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">Coming soon</p>
              <h2 id="try-title" className="mt-2 font-display text-[1.375rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.025em" }}>
                Hear it call you in 30 seconds
              </h2>
            </div>
          </div>
          <span
            aria-disabled="true"
            className="inline-flex min-h-11 cursor-not-allowed items-center justify-center rounded-full px-5 text-[0.9rem] text-[color:var(--color-ink-muted)]"
            style={{ border: "1px solid var(--hairline-2)" }}
          >
            Not live yet
          </span>
        </div>
      </div>
    </section>
  );
}
