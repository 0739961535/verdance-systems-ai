import type { CSSProperties } from "react";
import { TOOL_ICONS, type ToolIcon } from "./toolIcons";

/*
 * ToolsMarquee - "Works with anything you already use".
 * Integration capability only: these are tools we connect to, not partners
 * or customers. Marks come from simple-icons (CC0) via
 * scripts/build-tool-icons.mjs; brands it lacks (removed there for trademark
 * reasons) render as a text wordmark at the same optical height.
 *
 * A logo wall: every mark sits in a cell of the same width, monochrome at
 * rest, its brand colour on hover. The heading is centred above it.
 * Default: one calm row that drifts on a duplicated track (the copy is
 * aria-hidden), pausing on hover, focus or the Pause control. `still`: a
 * static grid with hairline cells (the services page). Reduced motion: the
 * moving row becomes the static grid too.
 */

// Brand colours this dark against the canvas would vanish on hover, so they
// fall back to the ink colour instead.
const NEAR_BLACK = new Set(["000000", "191919"]);
// Marks that are wordmarks inside the square icon box: drawn wider so they read at the same optical size.
const WIDE_MARKS = new Set(["WooCommerce", "Wix", "Sage"]);

const CSS = `
@keyframes tm-x { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.tm-head { display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center; }
.tm-title { margin: 0; font-size: 0.95rem; font-weight: 500; letter-spacing: -0.005em; color: var(--color-ink); }
.tm-sub { margin: 0; max-width: 46ch; font-family: var(--font-mono); font-size: 0.8125rem; line-height: 1.5; letter-spacing: 0.02em; color: var(--color-ink-muted); }

.tm-cell {
  --tm-c: var(--color-ink-muted);
  display: flex; align-items: center; justify-content: center; gap: 10px;
  height: 64px; padding: 0 12px; color: var(--tm-c); opacity: 0.72;
  transition: color .25s ease, opacity .25s ease, background-color .25s ease;
}
.tm-cell:hover { --tm-c: var(--brand); opacity: 1; }
.tm-mark { width: 22px; height: 22px; flex: none; transition: transform .35s cubic-bezier(0.16, 1, 0.3, 1); }
.tm-mark-wide { width: 36px; height: 36px; margin: -7px 0; }
.tm-cell:hover .tm-mark { transform: scale(1.08); }
.tm-name { font-size: 14px; font-weight: 500; line-height: 1; letter-spacing: -0.01em; white-space: nowrap; }
.tm-word { font-family: var(--font-display); font-size: 15.5px; font-weight: 600; line-height: 22px; letter-spacing: -0.02em; white-space: nowrap; }

/* moving row */
.tm-viewport {
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}
.tm-track { animation: tm-x 70s linear infinite; }
.tm-list { display: flex; flex-shrink: 0; margin: 0; padding: 0; list-style: none; }
.tm-list .tm-cell { width: 176px; }
.tm-viewport:hover .tm-track, .tm:focus-within .tm-track, .tm:has(.tm-pause input:checked) .tm-track { animation-play-state: paused; }
.tm-pause { position: relative; display: inline-flex; align-items: center; justify-content: center; min-height: 44px; min-width: 44px; padding: 0 14px; border-radius: 999px; border: 1px solid var(--hairline-2); font-size: 0.8125rem; color: var(--ink-soft); cursor: pointer; }
.tm-pause input { position: absolute; opacity: 0; inset: 0; cursor: pointer; }
.tm-pause:has(input:focus-visible) { outline: 2px solid var(--accent); outline-offset: 2px; }
.tm-pause .tm-on { display: none; }
.tm-pause:has(input:checked) .tm-on { display: inline; }
.tm-pause:has(input:checked) .tm-off { display: none; }

/* static wall: equal cells, the last row centred */
.tm-grid { display: flex; flex-wrap: wrap; justify-content: center; margin: 0; padding: 0; list-style: none; row-gap: 4px; }
.tm-grid .tm-cell { width: 50%; height: 56px; border-radius: 14px; }
@media (max-width: 639px) { .tm-grid .tm-name { font-size: 13px; } .tm-grid .tm-word { font-size: 14.5px; } }
.tm-grid .tm-cell:hover { background: rgba(var(--accent-rgb), 0.07); }
@media (min-width: 640px) { .tm-grid .tm-cell { width: 33.333%; } }
@media (min-width: 1024px) { .tm-grid .tm-cell { width: 16.666%; height: 80px; } }

.tm-still-rm { display: none; }
@media (prefers-reduced-motion: reduce) {
  .tm-moving { display: none; }
  .tm-still-rm { display: block; }
  .tm-pause { display: none; }
  .tm-cell, .tm-mark { transition: none; }
}
`;

/** Each mark's path is written once, as a <symbol>; every copy references it. */
const symbolId = (name: string) => `tm-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
function Symbols() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" style={{ position: "absolute" }}>
      {TOOL_ICONS.filter((t) => t.path).map((t) => (
        <symbol key={t.name} id={symbolId(t.name)} viewBox="0 0 24 24">
          <path d={t.path ?? undefined} />
        </symbol>
      ))}
    </svg>
  );
}

function Item({ tool }: { tool: ToolIcon }) {
  const brand = tool.hex && !NEAR_BLACK.has(tool.hex.toUpperCase()) ? `#${tool.hex}` : "var(--color-ink)";
  return (
    <li className="tm-cell" style={{ "--brand": brand } as CSSProperties}>
      {tool.path ? (
        <>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={WIDE_MARKS.has(tool.name) ? "tm-mark tm-mark-wide" : "tm-mark"}>
            <use href={`#${symbolId(tool.name)}`} />
          </svg>
          <span className="tm-name">{tool.name}</span>
        </>
      ) : (
        <span className="tm-word">{tool.name}</span>
      )}
    </li>
  );
}

function Grid() {
  return (
    <ul className="tm-grid" aria-label="Tools we connect to">
      {TOOL_ICONS.map((t) => (
        <Item key={t.name} tool={t} />
      ))}
    </ul>
  );
}

function Row({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className="tm-list" aria-hidden={duplicate || undefined} aria-label={duplicate ? undefined : "Tools we connect to"}>
      {TOOL_ICONS.map((t) => (
        <Item key={t.name} tool={t} />
      ))}
    </ul>
  );
}

/**
 * A centred heading over the logos. Default: a calm moving row with a pause
 * control. With `still`, the static logo wall (the services page).
 */
export function ToolsMarquee({ still = false, className = "" }: { still?: boolean; className?: string }) {
  return (
    <section className={`tm border-y py-10 md:py-14 ${className}`} style={{ borderColor: "var(--hairline)" }} aria-labelledby="tools-title">
      <style>{CSS}</style>
      <Symbols />
      <div className="container-wide tm-head">
        <h2 id="tools-title" className="tm-title">
          Works with anything you already use
        </h2>
        <p className="tm-sub">And most other apps. If it has an API (a way for apps to talk), we can connect it.</p>
      </div>
      {still ? (
        <div className="container-wide mt-8">
          <Grid />
        </div>
      ) : (
        <>
          <div className="tm-moving">
            <div className="tm-viewport mt-7 overflow-hidden">
              <div className="tm-track flex w-max">
                <Row />
                <Row duplicate />
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <label className="tm-pause">
                <input type="checkbox" aria-label="Pause the moving logos" />
                <span className="tm-off" aria-hidden>
                  Pause
                </span>
                <span className="tm-on" aria-hidden>
                  Play
                </span>
              </label>
            </div>
          </div>
          <div className="tm-still-rm container-wide mt-8">
            <Grid />
          </div>
        </>
      )}
    </section>
  );
}

export default ToolsMarquee;
