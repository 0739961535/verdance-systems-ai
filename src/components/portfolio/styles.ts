/**
 * Styles for the home Portfolio chapter. Inlined by the server component, so
 * the section ships no client JS. Paper band outside, dark drawn screens inside.
 */
export const PORTFOLIO_CSS = `
.pf-grid { list-style: none; margin: 0; padding: 0; }
/* phones: a horizontal snap row with the next tile peeking in */
@media (max-width: 767.98px) {
  .pf-grid { display: flex; gap: 12px; overflow-x: auto; overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory; scroll-padding-inline: 1.25rem;
    margin-inline: -1.25rem; padding: 4px 1.25rem 20px; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
  .pf-grid::-webkit-scrollbar { display: none; }
  .pf-grid > li { flex: 0 0 84%; scroll-snap-align: start; display: flex; }
}
@media (min-width: 768px) {
  .pf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .pf-grid > li { display: flex; min-width: 0; }
  .pf-grid > li.pf-li-wide { grid-column: 1 / -1; }
}

.pf-tile { position: relative; display: flex; flex-direction: column; width: 100%; min-width: 0; overflow: hidden;
  border-radius: 22px; background: #FBFAF7; box-shadow: inset 0 0 0 1px var(--hairline-2), 0 22px 44px -34px rgba(14,14,16,0.45);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease; }
@media (hover: hover) {
  .pf-tile:hover { transform: translate3d(0, -3px, 0); box-shadow: inset 0 0 0 1px var(--hairline-3), 0 30px 60px -34px rgba(14,14,16,0.5); }
  .pf-tile:hover .pf-go-arrow { transform: translate3d(3px, 0, 0); }
}
.pf-tile:has(.pf-go:focus-visible) { box-shadow: 0 0 0 2px #2554D4, 0 22px 44px -34px rgba(14,14,16,0.45); }

.pf-vis { position: relative; overflow: hidden; aspect-ratio: 6 / 5; margin: 8px 8px 0; border-radius: 16px;
  background: radial-gradient(120% 90% at 85% 0%, rgba(77,124,255,0.26), rgba(77,124,255,0) 60%), #0A1226;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06); color: #E9EDEF; }
.pf-vis.is-warm { background: radial-gradient(120% 90% at 85% 0%, rgba(214,170,98,0.26), rgba(214,170,98,0) 60%), #0A1226; }
@media (min-width: 768px) { .pf-vis { aspect-ratio: 16 / 10; } }
.pf-stage { position: absolute; inset: 0; display: grid; place-items: center; padding: 18px; }
.pf-note { position: absolute; left: 12px; bottom: 10px; font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10.5px; letter-spacing: 0.04em; color: #8b93a3; }

.pf-text { display: flex; flex: 1; flex-direction: column; padding: 18px 18px 8px; }
@media (min-width: 1024px) { .pf-text { padding: 24px 26px 12px; } }
.pf-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; }
.pf-tag { display: inline-flex; align-items: center; min-height: 24px; padding: 0 10px; border-radius: 999px;
  font-size: 12px; font-weight: 600; color: #2554D4; background: rgba(37,84,212,0.08); box-shadow: inset 0 0 0 1px rgba(37,84,212,0.18); }
.pf-label { font-family: var(--font-mono, ui-monospace, monospace); font-size: 12px; letter-spacing: 0.02em; color: var(--color-ink-muted); }
.pf-name { margin-top: 14px; font-size: 0.875rem; color: var(--color-ink-muted); }
.pf-out { margin-top: 4px; font-family: var(--font-display); font-weight: 600; font-size: 1.25rem; line-height: 1.25;
  letter-spacing: -0.018em; color: var(--color-ink); }
@media (min-width: 1024px) { .pf-out { font-size: 1.4375rem; } }
.pf-go { margin-top: auto; padding-top: 10px; display: inline-flex; align-items: center; gap: 6px; min-height: 44px; align-self: flex-start;
  font-size: 0.9375rem; font-weight: 600; color: #2554D4; outline: none; }
.pf-go::after { content: ""; position: absolute; inset: 0; border-radius: 22px; }
.pf-go-arrow { transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1); }

/* wide tiles on desktop: screen left, words right */
@media (min-width: 1024px) {
  .pf-tile.is-wide { display: grid; grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr); }
  .pf-tile.is-wide .pf-vis { margin: 8px 0 8px 8px; }
  .pf-tile.is-wide .pf-text { justify-content: center; padding: 40px 44px; }
  .pf-tile.is-wide .pf-out { font-size: 1.75rem; line-height: 1.2; }
  .pf-tile.is-wide .pf-go { margin-top: 18px; }
  .pf-tile.is-wide.is-flip { grid-template-columns: minmax(0, 1fr) minmax(0, 1.55fr); }
  .pf-tile.is-wide.is-flip .pf-vis { order: 2; margin: 8px 8px 8px 0; }
}

/* drawn screens */
.pf-mock { width: min(100%, 360px); border-radius: 14px; background: #0F1A33; overflow: hidden;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08), 0 24px 48px -24px rgba(0,0,0,0.7); font-size: 12px; line-height: 1.4; }
@media (min-width: 1024px) { .pf-mock { width: min(100%, 380px); font-size: 12.5px; } }
.pf-mhead { display: flex; align-items: center; gap: 8px; padding: 9px 11px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.pf-av { display: grid; place-items: center; width: 24px; height: 24px; flex-shrink: 0; border-radius: 999px; background: #1D3F8F; color: #DCE6FF; font-size: 10px; font-weight: 700; }
.pf-mbody { display: flex; flex-direction: column; gap: 7px; padding: 10px 11px 12px; }
.pf-muted { color: #8b93a3; }
.pf-num { font-variant-numeric: tabular-nums; font-feature-settings: "tnum"; }
.pf-b { max-width: 86%; padding: 7px 10px; border-radius: 12px; }
.pf-b-in { align-self: flex-start; background: #1A2440; border-top-left-radius: 4px; }
.pf-b-out { align-self: flex-end; background: #1D3F8F; border-top-right-radius: 4px; }
.pf-inner { background: #13203F; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06); border-radius: 10px; }
.pf-chip { display: inline-flex; align-items: center; gap: 5px; min-height: 22px; padding: 0 8px; border-radius: 999px; font-size: 11px; font-weight: 600;
  background: rgba(77,124,255,0.16); color: #B9CCFF; box-shadow: inset 0 0 0 1px rgba(143,176,255,0.3); }
.pf-skel { display: block; height: 8px; border-radius: 4px; background: rgba(143,176,255,0.18); }
.pf-dot { width: 7px; height: 7px; border-radius: 999px; flex-shrink: 0; }
.pf-clamp2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

/* browser chrome over the website still */
.pf-chrome { position: absolute; inset: 0 0 auto 0; z-index: 1; display: flex; align-items: center; gap: 5px; height: 24px; padding: 0 10px;
  background: rgba(10,18,38,0.82); border-bottom: 1px solid rgba(255,255,255,0.08); }
.pf-chrome i { width: 7px; height: 7px; border-radius: 999px; background: rgba(255,255,255,0.22); }
.pf-chrome b { margin-left: 8px; height: 10px; width: 34%; border-radius: 999px; background: rgba(255,255,255,0.1); }
.pf-shot { position: absolute; inset: 24px 0 0 0; }
.pf-shot img { width: 100%; height: 100%; object-fit: cover; object-position: 22% 50%; display: block; }

.pf-ask { position: relative; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 6px 20px;
  border-top: 1px solid var(--hairline-2); border-bottom: 1px solid var(--hairline-2); padding: 10px 0; }

@media (prefers-reduced-motion: reduce) {
  .pf-tile, .pf-go-arrow { transition: none; }
  .pf-tile:hover { transform: none; }
  .pf-tile:hover .pf-go-arrow { transform: none; }
}
`;
