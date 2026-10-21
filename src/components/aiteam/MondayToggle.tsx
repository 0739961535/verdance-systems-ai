"use client";

import { useState } from "react";
import { Check, Clock } from "lucide-react";
import { GROW_STEPS, MONDAY, MONDAY_SUMMARY } from "@/data/aiTeam";

/**
 * "Your Monday": one sample day, before and with Verdance, behind a two-way
 * switch. Replaces the six job cards and the five depth levels. Both texts
 * sit in the same grid cell and crossfade (opacity only), so the height never
 * changes when the visitor switches. Ends with how the team grows.
 */
export function MondayToggle() {
  const [withV, setWithV] = useState(true);
  const mode = withV ? "after" : "before";

  return (
    <div className="mt" data-mode={mode}>
      <style>{CSS}</style>
      <div className="mt-switch" role="group" aria-label="Show your Monday">
        <button type="button" className="mt-opt" aria-pressed={!withV} onClick={() => setWithV(false)}>
          Before
        </button>
        <button type="button" className="mt-opt" aria-pressed={withV} onClick={() => setWithV(true)}>
          With Verdance
        </button>
      </div>

      <div className="mt-panel ix-card">
        <ul className="mt-rows" aria-live="polite">
          {MONDAY.map((r) => (
            <li key={r.job} className="mt-row">
              <span className="mt-time tabular">{r.time}</span>
              <span className="mt-job">{r.job}</span>
              <span className="mt-cell">
                <span className="mt-txt mt-before" aria-hidden={withV}>
                  <Clock size={16} strokeWidth={1.6} aria-hidden />
                  {r.before}
                </span>
                <span className="mt-txt mt-after" aria-hidden={!withV}>
                  <Check size={16} strokeWidth={2} aria-hidden />
                  {r.after}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-sum">
          <span className="mt-txt mt-before" aria-hidden={withV}>
            {MONDAY_SUMMARY.before}
          </span>
          <span className="mt-txt mt-after" aria-hidden={!withV}>
            {MONDAY_SUMMARY.after}
          </span>
        </p>
      </div>

      <div className="mt-grow">
        <p className="mt-grow-k">How it grows</p>
        <ol className="mt-grow-list">
          {GROW_STEPS.map((g, i) => (
            <li key={g} data-last={i === GROW_STEPS.length - 1 ? "" : undefined}>
              {g}
            </li>
          ))}
        </ol>
        <p className="mt-grow-b">Start with one job. Add the next when it has proved itself in your own numbers.</p>
      </div>
    </div>
  );
}

const CSS = `
.mt-switch { display: inline-grid; grid-template-columns: 1fr 1fr; gap: 4px; padding: 4px; border-radius: 999px;
  background: var(--surface-tint-2); border: 1px solid var(--hairline-2); }
.mt-opt { min-height: 44px; padding: 0 20px; border: 0; border-radius: 999px; background: transparent; color: var(--color-ink-soft);
  font: inherit; font-size: 0.9375rem; font-weight: 500; cursor: pointer; transition: background-color .25s ease, color .25s ease, transform .15s ease; }
.mt-opt:hover { color: var(--color-ink); }
.mt-opt[aria-pressed="true"] { background: #2554D4; color: #fff; box-shadow: 0 6px 18px -8px rgba(37,84,212,0.7); }
.mt-opt:active { transform: scale(0.97); }
.mt-opt:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }

.mt-panel { margin-top: 20px; padding: 20px; border-radius: 22px; background: var(--bg-3); border: 1px solid var(--hairline-2); }
@media (min-width: 768px) { .mt-panel { padding: 28px 32px; } }
.mt-sample { margin: 0 0 8px; font-family: var(--font-mono); font-size: 0.8125rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-ink-muted); }
.mt-rows { list-style: none; margin: 0; padding: 0; }
.mt-row { display: grid; grid-template-columns: 3.4rem minmax(0, 1fr); gap: 2px 14px; padding: 14px 0; border-top: 1px solid var(--hairline-2); align-items: baseline; }
.mt-time { font-family: var(--font-mono); font-size: 0.875rem; color: var(--color-ink-muted); }
.mt-job { font-family: var(--font-display); font-weight: 600; font-size: 1.0625rem; letter-spacing: -0.015em; color: var(--color-ink); }
.mt-cell { grid-column: 2; display: grid; }
@media (min-width: 768px) {
  .mt-row { grid-template-columns: 4rem 11rem minmax(0, 1fr); gap: 18px; }
  .mt-cell { grid-column: auto; }
}
.mt-cell > .mt-txt, .mt-sum > .mt-txt { grid-area: 1 / 1; }
.mt-txt { display: flex; gap: 8px; align-items: baseline; font-size: 1rem; line-height: 1.5; transition: opacity .3s ease; }
.mt-txt svg { flex: none; position: relative; top: 2px; }
.mt-before { color: var(--color-ink-soft); }
.mt-before svg { color: #B4532A; }
.mt-after { color: var(--color-ink); }
.mt-after svg { color: var(--color-accent); }
.mt[data-mode="after"] .mt-before, .mt[data-mode="before"] .mt-after { opacity: 0; pointer-events: none; }
.mt-sum { display: grid; margin: 0; padding-top: 16px; border-top: 1px solid var(--hairline-2); }
.mt-sum .mt-txt { font-family: var(--font-display); font-size: 1.25rem; letter-spacing: -0.02em; line-height: 1.35; }

.mt-grow { margin-top: 40px; display: grid; gap: 14px; }
.mt-grow-k { margin: 0; font-family: var(--font-mono); font-size: 0.8125rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-ink-muted); }
.mt-grow-list { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px 28px; }
.mt-grow-list li { position: relative; font-size: 1rem; font-weight: 500; color: var(--color-ink); min-height: 32px; display: inline-flex; align-items: center;
  padding: 0 14px; border-radius: 999px; border: 1px solid var(--hairline-3); }
.mt-grow-list li:not([data-last])::after { content: ""; position: absolute; right: -24px; top: 50%; width: 20px; height: 1.5px; background: var(--accent); opacity: 0.6; }
.mt-grow-list li[data-last] { background: #2554D4; border-color: #2554D4; color: #fff; }
@media (max-width: 639px) {
  .mt-grow-list { flex-direction: column; align-items: flex-start; gap: 14px; }
  .mt-grow-list li:not([data-last])::after { right: auto; left: 24px; top: 100%; width: 1.5px; height: 14px; }
}
.mt-grow-b { margin: 0; max-width: 52ch; font-size: 1rem; line-height: 1.55; color: var(--color-ink-soft); }
@media (prefers-reduced-motion: reduce) { .mt-txt, .mt-opt { transition: none; } }
`;
