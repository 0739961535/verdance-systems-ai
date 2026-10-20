import type { DepthVisual as DepthVisualData } from "@/data/services";
import { GetVisual } from "@/components/home/inbox/WorkVisuals";

/**
 * Small app screens for the depth pages ("How it works" steps). Decorative
 * (aria-hidden), made-up sample content, built on the same gv-* styles as
 * the home page Work done screens (WorkVisualsStyle must be on the page).
 * Server component, no JS. The reveal motion hangs off the parent Reveal.
 */

const d = (s: number) => ({ ["--d" as string]: `${s}s` });

function Ticks() {
  return (
    <svg viewBox="0 0 16 11" width="15" height="10" fill="none" stroke="#BFD3FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 6l3 3 6-7.5M6.5 8.5l.5.5 6-7.5" />
    </svg>
  );
}

export function DepthVisual({ visual }: { visual: DepthVisualData }) {
  switch (visual.kind) {
    case "work":
      return <GetVisual word={visual.word} />;

    case "chat":
      return (
        <div aria-hidden className="gv-card">
          <div className="gv-top">
            <span className="gv-app">{visual.app}</span>
            <span className="gv-app">{visual.time}</span>
          </div>
          <div className="gv-hr" />
          {visual.inMsg ? (
            <p className="gv-msg" data-dir="in">
              {visual.inMsg}
              <span className="gv-meta">{visual.time}</span>
            </p>
          ) : null}
          <p className="gv-msg gv-in" data-dir="out" style={d(0.4)}>
            {visual.outMsg}
            <span className="gv-meta">
              {visual.time} <Ticks />
            </span>
          </p>
          {visual.status ? (
            <p className="gv-status gv-in" style={d(0.7)}>
              {visual.status}
            </p>
          ) : null}
        </div>
      );

    case "status":
      return (
        <div aria-hidden className="gv-card">
          <div className="gv-top">
            <span className="gv-app">{visual.app}</span>
          </div>
          <div className="min-w-0">
            <span className="gv-name">{visual.title}</span>
            <span className="gv-sub">{visual.sub}</span>
          </div>
          <div className="gv-steps">
            {visual.chips.map((c, i) => (
              <span key={c.text} className="gv-chip gv-pop" data-tone={c.tone} style={d(0.45 + i * 0.2)}>
                {c.text}
              </span>
            ))}
          </div>
        </div>
      );

    case "rows":
      return (
        <div aria-hidden className="gv-card">
          <div className="gv-top">
            <span className="gv-app">{visual.app}</span>
          </div>
          <ul className="grid gap-2">
            {visual.rows.map((r, i) => (
              <li key={r.text} className="dv-row gv-in" style={d(0.25 + i * 0.12)}>
                <span className="min-w-0">{r.text}</span>
                <span className="gv-chip" data-tone={r.tone}>
                  {r.chip}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "page":
      return (
        <div aria-hidden className="gv-card dv-page">
          <div className="dv-bar">
            <span className="dv-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="dv-url">{visual.url}</span>
          </div>
          <div className="dv-body">
            <span className="gv-sub">{visual.sub}</span>
            <span className="dv-title">{visual.title}</span>
            <span className="dv-btn gv-pop" style={d(0.5)}>
              {visual.button}
            </span>
          </div>
        </div>
      );
  }
}

/** Extra styles for the depth screens. Render once per page. */
export const DEPTH_VISUAL_CSS = `
.dv-row {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding: 9px 12px; border-radius: 12px;
  background: #13203F; border: 1px solid rgba(255, 255, 255, 0.06); color: #C9D1E3;
}
.dv-page { padding: 0; gap: 0; overflow: hidden; }
.dv-bar { display: flex; align-items: center; gap: 10px; padding: 9px 12px; background: #13203F; border-bottom: 1px solid rgba(255, 255, 255, 0.07); }
.dv-dots { display: inline-flex; gap: 5px; flex: none; }
.dv-dots i { width: 7px; height: 7px; border-radius: 9999px; background: rgba(255, 255, 255, 0.18); }
.dv-url { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-family: var(--font-mono); font-size: 11.5px; color: #8B93A3; }
.dv-body { display: grid; gap: 8px; justify-items: start; padding: 18px 16px 20px; }
.dv-title { font-family: var(--font-display); font-size: 1.25rem; line-height: 1.15; letter-spacing: -0.02em; color: #F2F5FC; }
.dv-btn {
  margin-top: 4px; padding: 7px 14px; border-radius: 9999px; font-size: 13px; font-weight: 600; color: #fff;
  background: linear-gradient(180deg, #2E5BD8, #2149B8); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
}
`;
