import type { CSSProperties } from "react";
import { TOOL_ICONS, type ToolIcon } from "./toolIcons";

/*
 * ToolsMarquee - "Works with anything you already use".
 * Integration capability only: these are tools we connect to, not partners
 * or customers. Marks come from simple-icons (CC0) via
 * scripts/build-tool-icons.mjs; brands it lacks render as a text wordmark.
 * One row scrolls on a duplicated track (the copy is aria-hidden), pauses on
 * hover, and becomes a wrapped static grid under reduced motion.
 */

// Brand colours this dark against the canvas would vanish on hover, so they
// fall back to the ink colour instead.
const NEAR_BLACK = new Set(["000000", "191919"]);

const CSS = `
@keyframes tm-x { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.tm-viewport {
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}
.tm-track { animation: tm-x 45s linear infinite; }
.tm-viewport:hover .tm-track, .tm:focus-within .tm-track, .tm:has(.tm-pause input:checked) .tm-track { animation-play-state: paused; }
.tm-pause { position: relative; display: inline-flex; align-items: center; justify-content: center; min-height: 44px; min-width: 44px; padding: 0 14px; border-radius: 999px; border: 1px solid var(--hairline-2); font-size: 0.8125rem; color: var(--ink-soft); cursor: pointer; }
.tm-pause input { position: absolute; opacity: 0; inset: 0; cursor: pointer; }
.tm-pause:has(input:focus-visible) { outline: 2px solid var(--accent); outline-offset: 2px; }
.tm-pause .tm-on { display: none; }
.tm-pause:has(input:checked) .tm-on { display: inline; }
.tm-pause:has(input:checked) .tm-off { display: none; }
@media (prefers-reduced-motion: reduce) {
  .tm-viewport { -webkit-mask-image: none; mask-image: none; }
  .tm-track { animation: none; width: 100%; }
  .tm-list { flex-wrap: wrap; justify-content: center; row-gap: 1.25rem; padding-right: 0; }
  .tm-dup { display: none; }
  .tm-pause { display: none; }
}
`;

/** Each mark's path is written once, as a <symbol>; both copies of the track reference it. */
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
    <li
      className="flex shrink-0 items-center gap-2.5 text-[color:var(--color-ink-muted)] opacity-70 transition-[color,opacity] duration-200 hover:text-[color:var(--brand)] hover:opacity-100"
      style={{ "--brand": brand } as CSSProperties}
    >
      {tool.path ? (
        <>
          <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor" aria-hidden="true" focusable="false" className="h-[22px] w-[22px] shrink-0">
            <use href={`#${symbolId(tool.name)}`} />
          </svg>
          <span className="text-[14px] font-medium leading-none tracking-[-0.01em]">{tool.name}</span>
        </>
      ) : (
        <span className="font-display flex h-[22px] items-center text-[16px] leading-none">{tool.name}</span>
      )}
    </li>
  );
}

function List({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      className={`tm-list flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12${duplicate ? " tm-dup" : ""}`}
      aria-hidden={duplicate || undefined}
      aria-label={duplicate ? undefined : "Tools we connect to"}
    >
      {TOOL_ICONS.map((t) => (
        <Item key={t.name} tool={t} />
      ))}
    </ul>
  );
}

/** One slim row: a short label, the moving strip and a pause control. */
export function ToolsMarquee() {
  return (
    <section className="tm border-y py-8 md:py-10" style={{ borderColor: "var(--hairline)" }} aria-labelledby="tools-title">
      <style>{CSS}</style>
      <Symbols />
      <div className="container-wide flex items-center justify-between gap-4">
        <h2 id="tools-title" className="text-[0.95rem] font-medium text-[color:var(--color-ink)]">
          Works with anything you already use
        </h2>
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
      <div className="tm-viewport mt-5 overflow-hidden py-1">
        <div className="tm-track flex w-max">
          <List />
          <List duplicate />
        </div>
      </div>
    </section>
  );
}

export default ToolsMarquee;
