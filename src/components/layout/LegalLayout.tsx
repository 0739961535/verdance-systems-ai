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
    <main className="bg-canvas min-h-screen">
      <section className="relative section-pad-sm pt-36 md:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-64 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(var(--accent-rgb),0.08), transparent 70%)",
          }}
        />
        <div className="container-wide">
          <div className="mx-auto max-w-2xl">
            <span className="eyebrow">Legal</span>
            <h1 className="mt-4 font-display text-4xl md:text-5xl font-medium tracking-tight text-[color:var(--color-ink)]">
              {title}
            </h1>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--color-ink-muted)]">
              Last updated · {updated}
            </p>
            <div
              className="mt-10 h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(var(--accent-rgb),0.35), rgba(var(--accent-rgb),0.08) 40%, transparent 80%)",
              }}
            />
            <div className="legal-prose mt-10 pb-24">{children}</div>
          </div>
        </div>
      </section>
    </main>
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
