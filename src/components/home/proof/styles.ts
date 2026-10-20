/** Styles for the proof illustrations. Plain module so the server chapter can inline it. */
export const PROOF_CSS = `
.pv-tabs { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 4px; padding: 4px; border-radius: 14px;
  background: rgba(10,18,38,0.05); box-shadow: inset 0 0 0 1px var(--hairline-2); }
.pv-tab { min-height: 44px; border-radius: 10px; display: inline-flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px;
  font-size: 12.5px; font-weight: 600; letter-spacing: 0.005em; color: var(--color-ink-soft); transition: background-color 200ms ease-out, color 200ms ease-out; -webkit-tap-highlight-color: transparent; }
.pv-tab[aria-selected="true"] { background: #0A1226; color: #E9EDEF; box-shadow: 0 1px 2px rgba(10,18,38,0.18); }
.pv-tab:focus-visible { outline: 2px solid #4D7CFF; outline-offset: 2px; }
.pv-grid { display: grid; gap: 14px; margin-top: 12px; }
.pv-panel { min-width: 0; }
@media (max-width: 1023.98px) { .pv-panel:not([data-active="true"]) { display: none; } }
@media (min-width: 1024px) {
  .pv-tabs { display: none; }
  .pv-grid { grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 0; }
}
.pv-card { position: relative; height: 100%; min-height: 448px; display: flex; flex-direction: column; overflow: hidden; border-radius: 18px;
  background: #0A1226; color: #E9EDEF; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.07), 0 18px 40px -24px rgba(10,18,38,0.55); }
@media (min-width: 1024px) { .pv-card { min-height: 372px; } }
.pv-head { display: flex; align-items: center; gap: 10px; padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.pv-body { flex: 1; padding: 14px; display: flex; flex-direction: column; gap: 9px; }
.pv-foot { padding: 9px 14px 11px; border-top: 1px solid rgba(255,255,255,0.06); font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10.5px; letter-spacing: 0.04em; color: #8b93a3; }
.pv-muted { color: #8b93a3; }
.pv-num { font-variant-numeric: tabular-nums; font-feature-settings: "tnum"; }
.pv-in { background: #1A2440; }
.pv-out { background: #1D3F8F; }
.pv-inner { background: #13203F; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06); }
.pv-chip { display: inline-flex; align-items: center; gap: 6px; min-height: 26px; padding: 0 10px; border-radius: 999px; font-size: 12px; font-weight: 600; }
.pv-chip-blue { background: rgba(77,124,255,0.16); color: #B9CCFF; box-shadow: inset 0 0 0 1px rgba(143,176,255,0.32); }
.pv-chip-ghost { color: #C9D2E3; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.14); }
.pv-skel { display: inline-block; height: 10px; border-radius: 4px; background: rgba(143,176,255,0.16); }
.pv-hatch { background-image: repeating-linear-gradient(135deg, rgba(143,176,255,0.22) 0 2px, rgba(143,176,255,0.07) 2px 7px); }

/* entrances (CSS only): hidden until the card has data-play, staggered by --i */
.pv-i, .pv-l, .pv-b { transition-delay: calc(60ms + var(--i, 0) * var(--st, 70ms)); }
.pv-i { opacity: 0; transform: translate3d(0, 8px, 0); transition-property: opacity, transform; transition-duration: 0.32s; transition-timing-function: ease-out; }
.pv-l { transform: scaleY(0); transition: transform 0.24s ease-out; transition-delay: calc(60ms + var(--i, 0) * var(--st, 70ms)); }
.pv-b { transform: scaleY(0); transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1); transition-delay: calc(60ms + var(--i, 0) * var(--st, 70ms)); }
.pv-card[data-play] .pv-i { opacity: 1; transform: none; }
.pv-card[data-play] .pv-l, .pv-card[data-play] .pv-b { transform: none; }
@media (prefers-reduced-motion: reduce) { .pv-i, .pv-l, .pv-b { opacity: 1; transform: none; transition: none; } }
`;
