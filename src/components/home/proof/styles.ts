/** Styles for the proof illustrations. Plain module so the server chapter can inline it. */
export const PROOF_CSS = `
/* ---------- segmented control ---------- */
.pv-tabs { position: relative; display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 4px; padding: 4px; border-radius: 14px;
  background: rgba(10,18,38,0.05); box-shadow: inset 0 0 0 1px var(--hairline-2); isolation: isolate; }
.pv-ind { position: absolute; top: 4px; bottom: 4px; left: 0; z-index: 0; border-radius: 10px; overflow: hidden; opacity: 0;
  background: #0A1226; box-shadow: 0 1px 2px rgba(10,18,38,0.18), 0 6px 16px -8px rgba(10,18,38,0.45), inset 0 0 0 1px rgba(255,255,255,0.06);
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms ease-out; will-change: transform; }
.pv-ind[data-ready] { opacity: 1; }
.pv-prog { position: absolute; left: 10px; right: 10px; bottom: 4px; height: 2px; border-radius: 2px; transform-origin: left center;
  background: linear-gradient(90deg, #4D7CFF, #8FB0FF); transform: scaleX(0); animation-name: pv-prog; animation-timing-function: linear; animation-fill-mode: forwards; }
@keyframes pv-prog { to { transform: scaleX(1); } }
.pv-tab { position: relative; z-index: 1; min-height: 48px; border-radius: 10px; display: inline-flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px;
  font-size: 12.5px; font-weight: 600; letter-spacing: 0.005em; color: var(--color-ink-soft); transition: color 260ms ease-out; -webkit-tap-highlight-color: transparent; }
.pv-tab:hover { color: var(--color-ink); }
.pv-tab[aria-selected="true"] { color: #E9EDEF; }
.pv-tab:focus-visible { outline: 2px solid #4D7CFF; outline-offset: 2px; }

/* ---------- one shell, panels cross-fade inside it (all panels share one grid cell: no jump) ---------- */
.pv-stage { display: grid; margin-top: 12px; }
.pv-panel { grid-area: 1 / 1; min-width: 0; transition: opacity 420ms ease-out, transform 520ms cubic-bezier(0.22, 1, 0.36, 1), visibility 0s linear 0s; }
.pv-panel[data-active="false"] { opacity: 0; transform: translate3d(0, 6px, 0) scale(0.985); visibility: hidden; pointer-events: none;
  transition: opacity 300ms ease-in, transform 300ms ease-in, visibility 0s linear 300ms; }

.pv-card { position: relative; height: 100%; min-height: 468px; display: flex; flex-direction: column; overflow: hidden; border-radius: 18px;
  background: #0A1226; color: #E9EDEF; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.07), 0 18px 40px -24px rgba(10,18,38,0.55); }
.pv-card::before { content: ""; position: absolute; inset: 0 0 auto; height: 140px; pointer-events: none;
  background: radial-gradient(120% 100% at 50% -30%, rgba(77,124,255,0.14), transparent 70%); }
@media (min-width: 1024px) { .pv-card { min-height: 452px; } }
.pv-head { position: relative; display: flex; align-items: center; gap: 10px; padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.pv-body { position: relative; flex: 1; padding: 14px; display: flex; flex-direction: column; gap: 9px; }
.pv-foot { padding: 9px 14px 11px; border-top: 1px solid rgba(255,255,255,0.06); font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11px; letter-spacing: 0.04em; color: #8b93a3; }
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
.pv-live-dot { position: relative; display: inline-block; width: 7px; height: 7px; flex: none; border-radius: 50%; background: #7FD1A8; }
.pv-live-dot::after { content: ""; position: absolute; inset: 0; border-radius: 50%; background: #7FD1A8; opacity: 0; }
.pv-card[data-play] .pv-live-dot::after { animation: pv-ping 2.4s ease-out infinite; }
@keyframes pv-ping { 0% { transform: scale(1); opacity: 0.55; } 70%, 100% { transform: scale(2.8); opacity: 0; } }

/* ---------- entrances: hidden until the card has data-play, staggered by --i ---------- */
.pv-i, .pv-l, .pv-b { transition-delay: calc(60ms + var(--i, 0) * var(--st, 70ms)); }
.pv-i { opacity: 0; transform: translate3d(0, 8px, 0); transition-property: opacity, transform; transition-duration: 0.38s; transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
.pv-l { transform: scaleY(0); transform-origin: top; transition: transform 0.24s ease-out; transition-delay: calc(60ms + var(--i, 0) * var(--st, 70ms)); }
.pv-b { transform: scaleY(0); transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1); transition-delay: calc(60ms + var(--i, 0) * var(--st, 70ms)); }
.pv-card[data-play] .pv-i { opacity: 1; transform: none; }
.pv-card[data-play] .pv-l, .pv-card[data-play] .pv-b { transform: none; }

/* ---------- chat: typing dots hold the next reply's place, then hand over to it ---------- */
.pv-typing { position: absolute; top: 0; right: 0; display: inline-flex; gap: 4px; align-items: center; height: 34px; padding: 0 13px;
  border-radius: 14px 4px 14px 14px; opacity: 0; pointer-events: none; }
.pv-card[data-play] .pv-typing { animation: pv-type 780ms ease both; animation-delay: calc(60ms + var(--i, 0) * var(--st, 70ms) - 800ms); }
@keyframes pv-type { 0% { opacity: 0; transform: translate3d(0, 6px, 0); } 18%, 82% { opacity: 1; transform: none; } 100% { opacity: 0; transform: none; } }
.pv-dot { width: 6px; height: 6px; border-radius: 50%; background: #DCE6FF; opacity: 0.5; animation: pv-dot 900ms ease-in-out infinite; }
.pv-dot:nth-child(2) { animation-delay: 150ms; } .pv-dot:nth-child(3) { animation-delay: 300ms; }
@keyframes pv-dot { 0%, 60%, 100% { transform: none; opacity: 0.45; } 30% { transform: translate3d(0, -3px, 0); opacity: 1; } }
.pv-fill { transform: scaleX(0); transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1); transition-delay: calc(60ms + var(--i, 0) * var(--st, 70ms) + 250ms + var(--f, 0) * 160ms); }
.pv-card[data-play] .pv-fill { transform: none; }

/* ---------- pipeline kanban ---------- */
.pv-col { display: flex; flex-direction: column; gap: 5px; padding: 5px; border-radius: 12px; background: rgba(255,255,255,0.025); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05); }
.pv-count { display: inline-grid; min-width: 20px; height: 18px; padding: 0 5px; place-items: center; overflow: hidden; border-radius: 999px;
  font-size: 10.5px; font-weight: 700; color: #B9CCFF; background: rgba(77,124,255,0.16); }
.pv-count.is-won { color: #BFEBD3; background: rgba(127,209,168,0.16); }
.pv-card[data-play] .pv-tick { animation: pv-tick 360ms cubic-bezier(0.22, 1, 0.36, 1); }
@keyframes pv-tick { from { transform: translate3d(0, 8px, 0); opacity: 0; } to { transform: none; opacity: 1; } }
.pv-kcard { display: block; height: 60px; overflow: hidden; padding: 7px 8px; border-radius: 9px; background: #13203F; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06); }
.pv-kcard .pv-muted { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.pv-kcard.is-live { background: #182A55; box-shadow: inset 0 0 0 1px rgba(143,176,255,0.5), 0 10px 24px -10px rgba(77,124,255,0.6); }
.pv-slot { display: block; height: 60px; border-radius: 9px; box-shadow: inset 0 0 0 1px rgba(143,176,255,0.12); background-image: repeating-linear-gradient(135deg, rgba(143,176,255,0.05) 0 2px, transparent 2px 8px); }
.pv-mover { position: absolute; top: 0; left: 0; padding: 36px 5px 0; width: calc((100% - (var(--cols) - 1) * 6px) / var(--cols));
  transform: translate3d(calc(var(--pos) * (100% + 6px)), 0, 0); transition: transform 700ms cubic-bezier(0.65, 0, 0.35, 1); will-change: transform; pointer-events: none; }
.pv-mover[data-snap] { transition: none; }
.pv-mover-in { opacity: 0; transform: scale(0.94); transition: opacity 360ms ease-out, transform 360ms cubic-bezier(0.22, 1, 0.36, 1); transition-delay: 300ms; }
.pv-card[data-play] .pv-mover-in { opacity: 1; transform: none; }
.pv-card[data-play] .pv-mover[data-gone] .pv-mover-in { opacity: 0; transform: scale(0.94); transition-delay: 0s; }
.pv-swap { animation: none; }
.pv-card[data-play] .pv-swap { animation: pv-swap 420ms ease-out; }
@keyframes pv-swap { from { opacity: 0; transform: translate3d(0, 4px, 0); } to { opacity: 1; transform: none; } }
.pv-log { display: flex; align-items: center; gap: 8px; min-height: 36px; padding: 0 12px; border-radius: 10px; font-size: 12px;
  background: rgba(255,255,255,0.03); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06); }

/* ---------- automations: one loop split into five slots; pulse per connector, glow per node ---------- */
.pv-flow { --T: 3.6s; }
.pv-wire { display: block; width: 2px; height: 18px; margin-left: 17px; }
.pv-wire svg { display: block; overflow: visible; }
.pv-pulse { stroke-dasharray: 34 200; stroke-dashoffset: 34; opacity: 0; }
.pv-card[data-play] .pv-pulse { animation: pv-pulse var(--T) linear infinite; animation-delay: calc(900ms + (var(--n) - 1) * var(--T) / 5 + var(--T) / 10); }
@keyframes pv-pulse { 0% { stroke-dashoffset: 34; opacity: 1; } 10% { stroke-dashoffset: -100; opacity: 1; } 10.01%, 100% { stroke-dashoffset: -100; opacity: 0; } }
.pv-glow { position: absolute; inset: -3px; border-radius: 13px; box-shadow: 0 0 0 1px rgba(143,176,255,0.7), 0 0 18px 2px rgba(77,124,255,0.55); opacity: 0; pointer-events: none; }
.pv-card[data-play] .pv-glow { animation: pv-glow var(--T) ease-out infinite; animation-delay: calc(900ms + var(--n) * var(--T) / 5); }
@keyframes pv-glow { 0% { opacity: 0; } 4% { opacity: 1; } 22%, 100% { opacity: 0; } }
.pv-done { color: #0A1226; background: #7FD1A8; opacity: 0; transform: scale(0.6); }
.pv-card[data-play] .pv-done { animation: pv-done var(--T) cubic-bezier(0.22, 1, 0.36, 1) infinite; animation-delay: calc(900ms + var(--n) * var(--T) / 5); }
@keyframes pv-done { 0% { opacity: 0; transform: scale(0.6); } 6%, 80% { opacity: 1; transform: none; } 92%, 100% { opacity: 0; transform: scale(0.6); } }

/* ---------- report: bars rise, the line draws, the highlighted point gets its tooltip ---------- */
.pv-b.is-hi { background-image: repeating-linear-gradient(135deg, rgba(143,176,255,0.42) 0 2px, rgba(143,176,255,0.14) 2px 7px); }
.pv-line path { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 1.3s cubic-bezier(0.65, 0, 0.35, 1) 700ms; }
.pv-card[data-play] .pv-line path { stroke-dashoffset: 0; }
.pv-pt { position: absolute; width: 11px; height: 11px; margin: -5.5px 0 0 -5.5px; border-radius: 50%; background: #0A1226; box-shadow: 0 0 0 2px #8FB0FF, 0 0 0 6px rgba(143,176,255,0.18);
  opacity: 0; transform: scale(0.4); transition: opacity 260ms ease-out 1.9s, transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1) 1.9s; }
.pv-tip { position: absolute; width: 104px; padding: 7px 9px; border-radius: 9px; font-size: 11px; line-height: 1.25;
  background: #1A2440; box-shadow: inset 0 0 0 1px rgba(143,176,255,0.28), 0 10px 24px -10px rgba(0,0,0,0.6);
  opacity: 0; transform: translate3d(calc(-100% - 12px), -50%, 0) translate3d(6px, 0, 0); transition: opacity 300ms ease-out 2.1s, transform 400ms cubic-bezier(0.22, 1, 0.36, 1) 2.1s; }
.pv-tip .pv-skel { display: block; height: 7px; }
.pv-card[data-play] .pv-pt { opacity: 1; transform: none; }
.pv-card[data-play] .pv-tip { opacity: 1; transform: translate3d(calc(-100% - 12px), -50%, 0); }
.pv-shimmer { position: relative; overflow: hidden; }
.pv-shimmer::after { content: ""; position: absolute; inset: 0; transform: translate3d(-100%, 0, 0);
  background: linear-gradient(90deg, transparent, rgba(185,204,255,0.28), transparent); }
.pv-card[data-play] .pv-shimmer::after { animation: pv-shim 2.4s ease-in-out 1.2s infinite; }
@keyframes pv-shim { 0% { transform: translate3d(-100%, 0, 0); } 60%, 100% { transform: translate3d(100%, 0, 0); } }

/* ---------- reduced motion: static, everything drawn and visible ---------- */
@media (prefers-reduced-motion: reduce) {
  .pv-ind, .pv-panel, .pv-panel[data-active="false"], .pv-tab, .pv-mover, .pv-mover-in { transition: none; }
  .pv-prog { display: none; }
  .pv-panel[data-active="false"] { transform: none; }
  .pv-i, .pv-l, .pv-b, .pv-fill { opacity: 1; transform: none; transition: none; }
  .pv-typing, .pv-pulse, .pv-glow { display: none; }
  .pv-done { opacity: 1; transform: none; animation: none !important; }
  .pv-line path { stroke-dashoffset: 0; transition: none; }
  .pv-pt, .pv-tip { opacity: 1; transition: none; }
  .pv-pt { transform: none; }
  .pv-tip { transform: translate3d(calc(-100% - 12px), -50%, 0); }
  .pv-card .pv-live-dot::after, .pv-card .pv-tick, .pv-card .pv-swap, .pv-card .pv-shimmer::after, .pv-dot { animation: none !important; }
  .pv-mover-in { opacity: 1; transform: none; }
}
`;
