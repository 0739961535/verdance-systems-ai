import type { ReactNode } from "react";

/**
 * LegalLayout / LegalSection - a clean, legible reading layout for the
 * Privacy and Terms pages. Narrow measure, generous rhythm, site tokens.
 */

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-canvas" aria-labelledby="legal-title">
        <div aria-hidden className="aurora" />
        <div aria-hidden className="hero-grid" />
        <div className="container-wide relative pt-32 pb-14 md:pt-40 md:pb-20">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="enter-fade-up eyebrow">Legal</p>
              <h1
                id="legal-title"
                className="enter-rise mt-6 font-display text-[color:var(--color-ink)]"
                style={{ fontSize: "clamp(2.6rem, 4vw + 1rem, 5rem)", lineHeight: 0.98, letterSpacing: "-0.045em" }}
              >
                {title}
              </h1>
              <p className="enter-fade-up mt-6 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
                Last updated · {updated}
              </p>
            </div>
            <div className="legal-docs hidden lg:block" aria-hidden>
              <span />
              <span />
              <span>
                <i />
                <i />
                <i />
                <i />
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-canvas-2 py-14 md:py-20" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container-wide">
          <div className="card-x mx-auto max-w-3xl p-6 sm:p-10 md:p-14" style={{ ["--gb-bg" as string]: "var(--bg)" }}>
            <div className="legal-prose">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading?: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-9">
      {heading && (
        <h2 className="font-display text-xl md:text-2xl font-medium tracking-tight text-[color:var(--color-ink)] mb-3">
          {heading}
        </h2>
      )}
      <div className="space-y-4 text-[16px] leading-relaxed text-[color:var(--color-ink-soft)] [&_a]:text-[color:var(--color-accent)] [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-[color:var(--color-ink)] [&_strong]:font-medium [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:marker:text-[color:var(--color-accent)]">
        {children}
      </div>
    </section>
  );
}
