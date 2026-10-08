/**
 * AuditReport - what the free pre-audit hands you, as a sample report.
 * Bars grow in on a loop (scaleX). Sample only, labelled.
 */
const ROWS = [
  { k: "Website form", v: "6 h 10 min", w: 0.92 },
  { k: "WhatsApp", v: "52 min", w: 0.46 },
  { k: "Instagram DMs", v: "next day", w: 1 },
  { k: "Missed calls", v: "no text back", w: 0.78 },
];

export function AuditReport() {
  return (
    <div className="browser-frame g-border audit-report" aria-hidden>
      <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid var(--hairline)" }}>
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <i key={i} className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(var(--hairline-rgb),0.18)" }} />
          ))}
        </span>
        <span className="ml-auto rounded-full px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em]" style={{ color: "var(--accent)", border: "1px solid rgba(var(--accent-rgb),0.35)" }}>
          Sample report
        </span>
      </div>
      <div className="p-5 sm:p-6">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)]">Pre-audit · your business</p>
        <p className="mt-2 font-display text-[1.5rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.025em" }}>How fast you reply today</p>
        <ul className="mt-5 flex flex-col gap-3.5">
          {ROWS.map((r, i) => (
            <li key={r.k}>
              <div className="flex items-baseline justify-between text-[0.88rem]">
                <span className="text-[color:var(--color-ink-soft)]">{r.k}</span>
                <span className="font-mono text-[0.8rem] text-[color:#F59AA4]">{r.v}</span>
              </div>
              <span className="audit-bar mt-1.5 block" style={{ ["--w" as string]: r.w, ["--i" as string]: i }}>
                <span />
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-2xl p-4" style={{ background: "rgba(var(--accent-rgb),0.08)", border: "1px solid rgba(var(--accent-rgb),0.25)" }}>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[color:var(--color-accent)]">Fix first</p>
          <p className="mt-1.5 text-[0.95rem] text-[color:var(--color-ink)]">Reply to website forms within 5 minutes, day or night.</p>
        </div>
      </div>
    </div>
  );
}
