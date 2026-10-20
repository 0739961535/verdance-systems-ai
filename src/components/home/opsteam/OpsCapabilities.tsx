import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OPS_CAPABILITIES } from "./opsData";

/**
 * What the Operations Team can do: eight tiles, each linking to the page
 * that explains it. Works on any band (it reads the band's ink and hairline
 * tokens); set --ops-tile on a parent to change the tile surface.
 */
export function OpsCapabilities() {
  return (
    <ul className="ocap">
      <style>{CSS}</style>
      {OPS_CAPABILITIES.map((c, i) => {
        const Icon = c.icon;
        return (
          <li key={c.title} className="ocap-tile" data-reveal="" style={{ ["--reveal-delay" as string]: `${Math.min(i * 0.05, 0.3)}s` }}>
            <div className="ocap-top">
              <span className="ocap-icon" aria-hidden>
                <Icon size={20} strokeWidth={1.6} />
              </span>
              {c.onRequest && <span className="ocap-tag">On request</span>}
            </div>
            <h3 className="ocap-t">{c.title}</h3>
            <p className="ocap-b">{c.body}</p>
            <Link href={c.href} className="ocap-link" aria-label={`How it works: ${c.title}`}>
              How it works <ArrowRight size={15} aria-hidden />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

const CSS = `
.ocap { display: grid; gap: 12px; grid-template-columns: minmax(0, 1fr); }
@media (min-width: 640px) { .ocap { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (min-width: 1100px) { .ocap { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; } }
.ocap-tile { display: flex; flex-direction: column; min-width: 0; padding: 22px 22px 12px; border-radius: 18px;
  background: var(--ops-tile, var(--surface-tint-2)); border: 1px solid var(--hairline-2);
  transition: border-color .25s ease, transform .25s ease; }
.ocap-tile:hover { border-color: var(--hairline-3); }
.ocap-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.ocap-icon { display: inline-grid; place-items: center; width: 40px; height: 40px; border-radius: 12px;
  color: var(--color-accent); background: rgba(77, 124, 255, 0.12); border: 1px solid rgba(77, 124, 255, 0.25); }
.ocap-tag { font-family: var(--font-mono); font-size: 0.6875rem; letter-spacing: 0.05em; text-transform: uppercase;
  color: var(--color-ink-muted); border: 1px solid var(--hairline-3); border-radius: 999px; padding: 3px 9px; }
.ocap-t { margin: 18px 0 0; font-family: var(--font-display); font-weight: 600; font-size: 1.125rem; line-height: 1.25; letter-spacing: -0.02em; color: var(--color-ink); }
.ocap-b { margin: 8px 0 0; flex: 1; font-size: 0.9375rem; line-height: 1.55; color: var(--color-ink-soft); }
.ocap-link { margin-top: 10px; display: inline-flex; align-items: center; gap: 6px; min-height: 44px; width: fit-content;
  font-size: 0.875rem; font-weight: 500; color: var(--color-accent); text-decoration: none; }
.ocap-link:hover { text-decoration: underline; text-underline-offset: 4px; }
.ocap-link:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; border-radius: 6px; }
.ocap-link svg { transition: transform .2s ease; }
.ocap-link:hover svg { transform: translateX(3px); }
@media (prefers-reduced-motion: reduce) { .ocap-link svg, .ocap-tile { transition: none; } }
`;
