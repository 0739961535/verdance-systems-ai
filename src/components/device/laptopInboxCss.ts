/**
 * Scoped styles for the homepage inbox demo (section 05). Everything sits
 * under figure.lpx so the phone demos (ChatPhone) keep their own look.
 * Only transform and opacity animate; reduced motion holds everything still.
 */
export const LAPTOP_INBOX_CSS = `
figure.lpx { position: relative; isolation: isolate; }

/* a calm glow behind the app window, static (no per-frame work) */
figure.lpx .lpx-glow {
  position: absolute; z-index: -1; inset: 8% 6% 14%; pointer-events: none;
  background: radial-gradient(60% 55% at 50% 45%, rgba(77, 124, 255, 0.28), rgba(77, 124, 255, 0) 70%);
  filter: blur(24px); opacity: 0.9;
}

/* the window: gradient hairline, inner top light, layered depth */
figure.lpx .laptop-lid {
  padding: 1px; border-radius: 22px;
  background: linear-gradient(180deg, rgba(143, 176, 255, 0.34), rgba(143, 176, 255, 0.06) 40%, rgba(255, 255, 255, 0.05));
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.04),
    0 24px 48px -24px rgba(0, 0, 0, 0.7),
    0 60px 140px -50px rgba(77, 124, 255, 0.4);
}
figure.lpx .laptop-screen {
  border: 0; border-radius: 21px;
  background: linear-gradient(180deg, #0C1631, #0A1226 30%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07);
}

/* window bar */
figure.lpx .lp-bar { background: rgba(12, 21, 48, 0.9); border-bottom-color: rgba(255, 255, 255, 0.06); }
figure.lpx .lp-lights i { width: 0.7em; height: 0.7em; box-shadow: inset 0 0 0 0.5px rgba(0, 0, 0, 0.25); }
figure.lpx .lp-title { flex: 1; text-align: center; margin-right: 3.2em; color: #9AA4B8; letter-spacing: 0.02em; }
figure.lpx .lpx-live {
  display: inline-flex; align-items: center; gap: 0.45em; flex: none;
  font-family: var(--font-mono); font-size: max(12px, 0.72em); color: #8FB0FF; letter-spacing: 0.04em;
}
figure.lpx .lpx-live::before { content: ""; width: 0.5em; height: 0.5em; border-radius: 9999px; background: #3DD68C; box-shadow: 0 0 0 0.22em rgba(61, 214, 140, 0.16); }

/* list */
figure.lpx .lp-list { background: rgba(9, 17, 40, 0.7); border-right-color: rgba(255, 255, 255, 0.06); padding: 0.6em; }
figure.lpx .lp-row { border-radius: 0.8em; transition: background-color 0.4s ease; }
figure.lpx .lp-row[data-on] { background: linear-gradient(180deg, rgba(77, 124, 255, 0.16), rgba(77, 124, 255, 0.08)); box-shadow: inset 0 0 0 1px rgba(143, 176, 255, 0.24); }
figure.lpx .lp-time, figure.lpx .lp-status { font-variant-numeric: tabular-nums; }

/* avatars: ring + presence dot in the chat head */
figure.lpx .wa-avatar { background: linear-gradient(145deg, #5B8BFF, #2448B8); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 0 0 1px rgba(143, 176, 255, 0.25); letter-spacing: 0.02em; }
figure.lpx .lpx-av-wrap { position: relative; flex: none; display: inline-grid; }
figure.lpx .lpx-av-wrap::after {
  content: ""; position: absolute; right: -0.05em; bottom: -0.05em; width: 0.62em; height: 0.62em; border-radius: 9999px;
  background: #3DD68C; box-shadow: 0 0 0 0.16em #0B1530;
}
figure.lpx .lp-head { background: rgba(10, 18, 38, 0.6); border-bottom-color: rgba(255, 255, 255, 0.06); }
figure.lpx .lp-status { color: #8B93A3; }
figure.lpx .lp-status[data-typing] { color: #8FB0FF; }

/* messages: crisp bubbles, soft tails, light hairlines */
figure.lpx .lp-msgs { background-image: none; background: radial-gradient(120% 70% at 50% 0%, rgba(77, 124, 255, 0.06), transparent 60%); }
figure.lpx .wa-stack { gap: 0.5em; padding: 0.9em 1em 1em; }
figure.lpx .wa-chip { background: rgba(255, 255, 255, 0.05); color: #9AA4B8; border: 1px solid rgba(255, 255, 255, 0.06); font-size: max(12px, 0.75em); letter-spacing: 0.02em; }
figure.lpx .wa-bubble { border-radius: 1.05em; padding: 0.55em 0.8em 0.45em; line-height: 1.42; box-shadow: 0 1px 0 rgba(255, 255, 255, 0.04) inset, 0 6px 16px -10px rgba(0, 0, 0, 0.8); }
figure.lpx .wa-bubble[data-dir="in"] { background: #16213D; border: 1px solid rgba(255, 255, 255, 0.07); border-top-left-radius: 0.35em; color: #E9EDF7; }
figure.lpx .wa-bubble[data-dir="out"] { background: linear-gradient(180deg, #2E5BD8, #2149B8); border-top-right-radius: 0.35em; color: #fff; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 8px 20px -12px rgba(46, 91, 216, 0.9); }
figure.lpx .wa-time { color: rgba(233, 237, 247, 0.6); font-variant-numeric: tabular-nums; }
figure.lpx .wa-bubble[data-dir="out"] .wa-time { color: rgba(255, 255, 255, 0.72); }
/* read ticks: a calm light blue on the blue bubble */
figure.lpx .wa-time svg { stroke: #BFD3FF; }
figure.lpx .wa-quick span { background: rgba(77, 124, 255, 0.1); border-color: rgba(143, 176, 255, 0.28); color: #BFD3FF; border-radius: 0.9em; }
figure.lpx .wa-list { border-top-color: rgba(255, 255, 255, 0.16); }
figure.lpx .wa-card { border-radius: 1em; border-top-right-radius: 0.35em; background: linear-gradient(180deg, #2E5BD8, #2149B8); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 10px 24px -14px rgba(46, 91, 216, 0.9); }
figure.lpx .wa-card-head { background: rgba(0, 0, 0, 0.14); border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
figure.lpx .wa-meta {
  display: inline-flex; align-items: center; gap: 0.45em; padding: 0.25em 0.7em; border-radius: 9999px;
  background: rgba(61, 214, 140, 0.1); border: 1px solid rgba(61, 214, 140, 0.28); color: #7BE3B0; letter-spacing: 0.02em; margin-top: 0.1em;
}
figure.lpx .wa-meta::before { content: ""; width: 0.45em; height: 0.45em; border-radius: 9999px; background: #3DD68C; }

/* typing: a small bubble with three soft dots */
figure.lpx .wa-typing { background: #1F3F9E; border: 1px solid rgba(143, 176, 255, 0.22); border-radius: 1.05em; border-top-right-radius: 0.35em; padding: 0.7em 0.85em; gap: 0.32em; }
figure.lpx .wa-typing span { width: 0.42em; height: 0.42em; background: #DCE6FF; }

/* composer */
figure.lpx .lp-composer {
  justify-content: space-between; background: rgba(19, 32, 63, 0.8); border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 9999px; padding: 0 0.35em 0 1.1em; color: #6F7A90;
}
figure.lpx .lpx-send { width: 2.1em; height: 2.1em; border-radius: 9999px; display: grid; place-items: center; background: linear-gradient(180deg, #4D7CFF, #2E5BD8); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25); }

/* industry pills: each pill carries its own selected state (no sliding
   layer, so nothing can ever sit over a neighbour) */
figure.lpx .lp-pills { gap: 8px; align-items: center; }
figure.lpx .lp-pills .hero-chip {
  display: inline-flex; align-items: center; gap: 0.5em; min-height: 44px; padding: 0 1rem;
  font-size: 0.875rem; white-space: nowrap; position: static; z-index: auto;
  border-color: rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.02); color: #9AA4B8;
  transition: color 0.25s ease, background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}
figure.lpx .lp-pills .hero-chip:active { transform: none; }
figure.lpx .lp-pills .hero-chip:focus-visible { outline: 2px solid #4D7CFF; outline-offset: 2px; }
figure.lpx .lp-pills .hero-chip[aria-pressed="true"]:not(.lp-pause) {
  color: #fff; background: rgba(77, 124, 255, 0.18); border-color: rgba(143, 176, 255, 0.6);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 6px 18px -8px rgba(77, 124, 255, 0.7);
}
figure.lpx .lpx-dot { width: 6px; height: 6px; border-radius: 9999px; background: currentColor; opacity: 0.35; flex: none; transition: opacity 0.25s ease, background-color 0.25s ease; }
figure.lpx .hero-chip[aria-pressed="true"] .lpx-dot { background: #8FB0FF; opacity: 1; box-shadow: 0 0 0 3px rgba(143, 176, 255, 0.2); }
figure.lpx .lp-pause { color: #9AA4B8; }

@media (max-width: 639px) {
  figure.lpx .laptop-lid { padding: 1px; border-radius: 22px; }
  figure.lpx .laptop-screen { border: 0; }
  figure.lpx .lp-composer { display: flex; height: 2.6em; margin: 0 0.6em 0.6em; font-size: 15px; }
  figure.lpx .wa-stack { padding: 0.8em 0.8em 0.9em; }
}
@media (prefers-reduced-motion: reduce) {
  figure.lpx .lp-pills .hero-chip, figure.lpx .lpx-dot, figure.lpx .lp-row { transition: none; }
}
`;
