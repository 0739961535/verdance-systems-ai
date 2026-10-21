"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown, Gift } from "lucide-react";
import type { Niche } from "@/data/niches";

/**
 * NicheTabs - "What's included", "How we work" and "Questions" in one
 * tabbed block, so the offer page stays short. Every panel stays in the
 * DOM (inactive ones are `hidden`), so the words are still there for search
 * and for the FAQ schema. Arrow keys move between tabs.
 */

const TABS = ["What's included", "How we work", "Questions"] as const;
const TERMS = ["A fixed quote, in writing, before any work starts", "Live in 10 working days", "You choose what needs your approval before it goes out"];

export function NicheTabs({ niche }: { niche: Niche }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };
    let next: number | null = null;
    if (e.key in step) next = (active + step[e.key] + TABS.length) % TABS.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = TABS.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };
  const id = niche.slug;

  return (
    <section className="section-pad bg-canvas nt" aria-labelledby="nt-title" style={{ borderTop: "1px solid var(--hairline)" }}>
      <style>{CSS}</style>
      <div className="container-narrow">
        <p className="eyebrow">The details</p>
        <h2 id="nt-title" className="h2 mt-5 max-w-[22ch]">
          What you get, <span className="italic-accent">and how.</span>
        </h2>

        <div className="nt-tabs" role="tablist" aria-label="About the offer" onKeyDown={onKey}>
          {TABS.map((t, i) => (
            <button
              key={t}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`nt-tab-${id}-${i}`}
              aria-selected={i === active}
              aria-controls={`nt-panel-${id}-${i}`}
              tabIndex={i === active ? 0 : -1}
              className="nt-tab"
              onClick={() => setActive(i)}
            >
              {t}
            </button>
          ))}
        </div>

        <div role="tabpanel" id={`nt-panel-${id}-0`} aria-labelledby={`nt-tab-${id}-0`} hidden={active !== 0} className="nt-panel">
          <ul className="nt-grid">
            {niche.included.map((item) => (
              <li key={item.title} className="nt-item">
                <Check size={16} strokeWidth={2.5} aria-hidden className="nt-check" />
                <div>
                  <h3 className="nt-h">{item.title}</h3>
                  <p className="nt-p">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="nt-bonus">
            <p className="nt-bonus-h">
              <Gift size={15} aria-hidden /> Also included
            </p>
            <ul>
              {niche.bonuses.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>

        <div role="tabpanel" id={`nt-panel-${id}-1`} aria-labelledby={`nt-tab-${id}-1`} hidden={active !== 1} className="nt-panel">
          <ol className="nt-steps">
            {niche.steps.map((s) => (
              <li key={s.title} className="nt-step">
                <h3 className="nt-h">{s.title}</h3>
                <p className="nt-p">{s.body}</p>
              </li>
            ))}
          </ol>
          <ul className="nt-terms" aria-label="Our terms">
            {TERMS.map((t) => (
              <li key={t}>
                <Check size={15} strokeWidth={2.5} aria-hidden className="nt-check" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div role="tabpanel" id={`nt-panel-${id}-2`} aria-labelledby={`nt-tab-${id}-2`} hidden={active !== 2} className="nt-panel">
          <div className="nt-faq">
            {niche.faqs.map((f, i) => (
              <details key={f.q} className="nt-q" open={i === 0}>
                <summary>
                  <span>{f.q}</span>
                  <ChevronDown size={18} aria-hidden className="nt-chev" />
                </summary>
                <p className="nt-p">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const CSS = `
.nt-tabs { margin-top: 32px; display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; padding: 2px; }
.nt-tabs::-webkit-scrollbar { display: none; }
.nt-tab {
  flex: none; min-height: 44px; padding: 0 18px; border-radius: 999px; cursor: pointer;
  border: 1px solid var(--hairline-2); background: transparent; color: var(--color-ink-soft);
  font-size: 0.95rem; font-weight: 500; transition: background-color 0.2s, color 0.2s, border-color 0.2s;
}
.nt-tab:hover { color: var(--color-ink); border-color: rgba(var(--accent-rgb), 0.4); }
.nt-tab[aria-selected="true"] { background: #2554D4; border-color: #2554D4; color: #fff; }
.nt-panel { margin-top: 28px; }
.nt-grid { display: grid; gap: 18px 28px; }
@media (min-width: 768px) { .nt-grid { grid-template-columns: 1fr 1fr; } }
.nt-item { display: flex; gap: 12px; align-items: flex-start; }
.nt-check { margin-top: 4px; flex: none; color: var(--color-accent); }
.nt-h { font-family: var(--font-display); font-weight: 500; font-size: 1.05rem; line-height: 1.3; color: var(--color-ink); }
.nt-p { margin-top: 4px; font-size: 0.95rem; line-height: 1.55; color: var(--color-ink-soft); }
.nt-bonus { margin-top: 28px; padding: 18px 20px; border-radius: 16px; background: rgba(var(--accent-rgb), 0.06); border: 1px solid rgba(var(--accent-rgb), 0.2); }
.nt-bonus-h { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-ink-muted); }
.nt-bonus ul { margin-top: 10px; display: grid; gap: 6px; }
.nt-bonus li { position: relative; padding-left: 16px; font-size: 0.95rem; line-height: 1.5; color: var(--color-ink); }
.nt-bonus li::before { content: ""; position: absolute; left: 0; top: 0.6em; width: 6px; height: 6px; border-radius: 999px; background: var(--color-accent); }
.nt-steps { display: grid; gap: 14px; counter-reset: none; }
@media (min-width: 768px) { .nt-steps { grid-template-columns: repeat(3, 1fr); } }
.nt-step { padding: 20px; border-radius: 18px; border: 1px solid var(--hairline); border-top: 2px solid rgba(var(--accent-rgb), 0.5); }
.nt-terms { margin-top: 20px; display: grid; gap: 8px; }
.nt-terms li { display: flex; gap: 10px; align-items: flex-start; font-size: 0.95rem; line-height: 1.5; color: var(--color-ink); }
.nt-terms .nt-check { margin-top: 3px; }
.nt-faq { display: grid; }
.nt-q { border-bottom: 1px solid var(--hairline); }
.nt-q summary { list-style: none; display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 56px; cursor: pointer; font-size: 1.02rem; font-weight: 500; color: var(--color-ink); }
.nt-q summary::-webkit-details-marker { display: none; }
.nt-chev { flex: none; color: var(--color-ink-muted); transition: transform 0.25s; }
.nt-q[open] .nt-chev { transform: rotate(180deg); }
.nt-q .nt-p { margin: 0 0 18px; max-width: 40rem; }
@media (prefers-reduced-motion: reduce) { .nt-tab, .nt-chev { transition: none; } }
`;
