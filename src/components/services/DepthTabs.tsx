"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { DrawOnView } from "@/components/services/DrawOnView";

/**
 * "How it works" on the service pages as a strip of tabs, one part visible
 * at a time. WAI-ARIA tabs: role=tablist, roving tabindex, Left/Right
 * arrows (wrapping), Home and End, automatic activation. Every tab is at
 * least 44px tall. A thin stem runs along the top of the strip and draws in
 * once on view (DrawOnView: stroke-dashoffset, static under reduced motion);
 * each tab carries a small bud that fills when its part is shown.
 *
 * Every panel is rendered on the server (hidden when not selected), so the
 * words are in the HTML for search engines and without JavaScript.
 */

const CSS = `
.dt-strip { position: relative; }
.dt-stem { position: absolute; left: 0; right: 0; top: 0; width: 100%; height: 2px; overflow: visible; pointer-events: none; }
.dt-stem line { stroke: rgba(143, 176, 255, 0.55); stroke-width: 1.5; }
.dt-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; padding-top: 14px; }
@media (min-width: 768px) { .dt-list { grid-template-columns: repeat(var(--n, 4), minmax(0, 1fr)); gap: 12px; } }
.dt-tab {
  position: relative; display: flex; align-items: flex-start; gap: 10px; min-height: 56px; padding: 12px 14px;
  border-radius: 14px; border: 1.5px solid rgba(143, 176, 255, 0.16); background: #0A1226;
  color: #C9D1E3; font: inherit; font-size: 0.95rem; font-weight: 500; line-height: 1.3; text-align: left; cursor: pointer;
  transition: border-color 200ms ease, background-color 200ms ease, color 200ms ease, transform 200ms cubic-bezier(.16,1,.3,1);
}
@media (min-width: 1024px) { .dt-tab { font-size: 1rem; padding: 14px 16px; min-height: 64px; } }
.dt-tab:hover { color: #F2F5FC; border-color: rgba(143, 176, 255, 0.36); transform: translateY(-2px); }
.dt-tab:active { transform: translateY(0); }
.dt-tab:focus-visible { outline: 2px solid #4D7CFF; outline-offset: 2px; }
.dt-tab[aria-selected="true"] { color: #F2F5FC; background: linear-gradient(180deg, #13203F, #0A1226); border-color: rgba(143, 176, 255, 0.55); }
.dt-bud { flex: none; margin-top: 4px; width: 10px; height: 10px; border-radius: 999px 999px 999px 0; transform: rotate(-45deg); border: 1.5px solid #8FB0FF; transition: background-color 200ms ease; }
.dt-tab[aria-selected="true"] .dt-bud { background: #4D7CFF; border-color: #BFD3FF; }
.dt-panel { margin-top: 28px; }
.dt-panel:focus-visible { outline: 2px solid #4D7CFF; outline-offset: 6px; border-radius: 12px; }
.dt-panel:not([hidden]) { animation: dt-in 0.35s ease both; }
@keyframes dt-in { from { opacity: 0; } to { opacity: 1; } }
@media (min-width: 1024px) { .dt-panel { margin-top: 40px; } }
@media (prefers-reduced-motion: reduce) {
  .dt-tab { transition: none; }
  .dt-tab:hover { transform: none; }
  .dt-panel:not([hidden]) { animation: none; }
}
`;

export type DepthTab = { label: string; panel: ReactNode };

export function DepthTabs({ tabs, label }: { tabs: DepthTab[]; label: string }) {
  const [active, setActive] = useState(0);
  const base = useId().replace(/:/g, "");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = (i: number) => {
    const n = (i + tabs.length) % tabs.length;
    setActive(n);
    refs.current[n]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      go(i + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      go(i - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0);
    } else if (e.key === "End") {
      e.preventDefault();
      go(tabs.length - 1);
    }
  };

  return (
    <div>
      <style>{CSS}</style>
      <DrawOnView className="dt-strip">
        <svg className="dt-stem" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden>
          <line className="dv-line" pathLength={1} x1="0" y1="1" x2="100" y2="1" />
        </svg>
        <div role="tablist" aria-label={label} className="dt-list" style={{ ["--n" as string]: tabs.length }}>
          {tabs.map((t, i) => (
            <button
              key={t.label}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${base}-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`${base}-panel-${i}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className="dt-tab"
            >
              <span className="dt-bud" aria-hidden />
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </DrawOnView>
      {tabs.map((t, i) => (
        <div
          key={t.label}
          role="tabpanel"
          id={`${base}-panel-${i}`}
          aria-labelledby={`${base}-tab-${i}`}
          hidden={active !== i}
          tabIndex={0}
          className="dt-panel"
        >
          {t.panel}
        </div>
      ))}
    </div>
  );
}
