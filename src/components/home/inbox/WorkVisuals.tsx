/**
 * Small app screens for "06 Work done" (Answer / Follow up / Admin / Report).
 * Decorative (aria-hidden) and made-up sample content. Server component, no
 * JS: the reveal motion hangs off the parent <Reveal> data attributes, plays
 * once, and only moves transform, opacity and a stroke offset. Reduced
 * motion shows the finished state.
 */

const CSS = `
.gv-card {
  position: relative; margin-top: 1.5rem; max-width: 22rem; border-radius: 18px; padding: 14px;
  font-size: 0.875rem; line-height: 1.45; color: #E9EDF7;
  background: linear-gradient(180deg, #0F1A38, #0A1226 55%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 24px 48px -28px rgba(0, 0, 0, 0.8), 0 30px 80px -50px rgba(77, 124, 255, 0.45);
  display: grid; gap: 10px; align-content: center;
  font-variant-numeric: tabular-nums;
}
@media (min-width: 768px) { .gv-card { margin-top: 2rem; max-width: 28rem; padding: 18px; font-size: 0.9375rem; gap: 12px; } }
.gv-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.gv-app { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: #8B93A3; }
.gv-who { display: flex; align-items: center; gap: 10px; min-width: 0; }
.gv-av {
  width: 34px; height: 34px; border-radius: 9999px; flex: none; display: grid; place-items: center;
  font-size: 12px; font-weight: 700; letter-spacing: 0.02em; color: #fff;
  background: linear-gradient(145deg, #5B8BFF, #2448B8);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 0 0 1px rgba(143, 176, 255, 0.25);
}
.gv-av[data-tone="warm"] { background: linear-gradient(145deg, #F2C46D, #B9822B); color: #1A1204; }
.gv-name { display: block; font-weight: 600; color: #F2F5FC; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.gv-sub { display: block; font-size: 12.5px; color: #8B93A3; }
.gv-hr { height: 1px; background: rgba(255, 255, 255, 0.07); }
.gv-chip {
  display: inline-flex; align-items: center; gap: 6px; flex: none; white-space: nowrap;
  padding: 3px 10px; border-radius: 9999px; font-size: 12.5px; font-weight: 500; border: 1px solid;
}
.gv-chip::before { content: ""; width: 6px; height: 6px; border-radius: 9999px; background: currentColor; }
.gv-chip[data-tone="amber"] { color: #F2C46D; background: rgba(242, 196, 109, 0.08); border-color: rgba(242, 196, 109, 0.3); }
.gv-chip[data-tone="green"] { color: #5FE0A3; background: rgba(61, 214, 140, 0.08); border-color: rgba(61, 214, 140, 0.32); }
.gv-chip[data-tone="blue"] { color: #A9C2FF; background: rgba(77, 124, 255, 0.1); border-color: rgba(143, 176, 255, 0.32); }
.gv-chip[data-tone="muted"] { color: #9AA4B8; background: rgba(255, 255, 255, 0.03); border-color: rgba(255, 255, 255, 0.12); }
.gv-chip[data-tone="muted"]::before { display: none; }

/* chat */
.gv-msg { width: fit-content; max-width: 86%; padding: 8px 12px 6px; border-radius: 16px; }
.gv-msg[data-dir="in"] { background: #16213D; border: 1px solid rgba(255, 255, 255, 0.07); border-top-left-radius: 5px; }
.gv-msg[data-dir="out"] {
  margin-left: auto; color: #fff; border-top-right-radius: 5px;
  background: linear-gradient(180deg, #2E5BD8, #2149B8);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 8px 20px -12px rgba(46, 91, 216, 0.9);
}
.gv-meta { display: flex; align-items: center; justify-content: flex-end; gap: 4px; margin-top: 2px; font-size: 11.5px; color: rgba(233, 237, 247, 0.6); }
.gv-msg[data-dir="out"] .gv-meta { color: rgba(255, 255, 255, 0.75); }
.gv-status { display: flex; justify-content: flex-end; align-items: center; gap: 6px; font-size: 12px; color: #8B93A3; }

/* follow up */
.gv-quote { padding: 10px 12px; border-radius: 12px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); color: #C9D1E3; }
.gv-steps { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.gv-arrow { color: #5B6478; font-size: 12px; }

/* booking */
.gv-book { display: grid; grid-template-columns: auto 1fr; gap: 14px; align-items: center; }
.gv-date {
  width: 58px; border-radius: 12px; overflow: hidden; text-align: center; flex: none;
  background: #F2F5FC; color: #0A1226; box-shadow: 0 8px 20px -12px rgba(0, 0, 0, 0.9);
}
.gv-date b { display: block; padding: 3px 0; font-size: 11px; letter-spacing: 0.08em; color: #fff; background: #2E5BD8; }
.gv-date span { display: block; padding: 4px 0 6px; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.1; }
.gv-time { font-size: 1.25em; font-weight: 600; letter-spacing: -0.01em; color: #F2F5FC; }
.gv-row { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #A9B2C6; }
.gv-row svg { flex: none; color: #8FB0FF; }

/* chart */
.gv-chart { width: 100%; height: auto; display: block; overflow: visible; }

@media (min-width: 1024px) { .get-row-in .get-vis > .gv-card { padding: 22px; gap: 14px; } }

@media (prefers-reduced-motion: no-preference) {
  [data-reveal][data-armed] .gv-in { transition: opacity 0.5s ease-out var(--d, 0.3s), transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) var(--d, 0.3s); }
  [data-reveal][data-armed]:not([data-revealed]) .gv-in { opacity: 0; transform: translate3d(0, 8px, 0); }
  [data-reveal][data-armed] .gv-pop { transition: opacity 0.3s ease-out var(--d, 0.6s), transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) var(--d, 0.6s); }
  [data-reveal][data-armed]:not([data-revealed]) .gv-pop { opacity: 0; transform: scale(0.8); }
  [data-reveal][data-armed] .gv-draw { transition: stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.45s; }
  [data-reveal][data-armed]:not([data-revealed]) .gv-draw { stroke-dashoffset: 1; }
  [data-reveal][data-armed] .gv-fill { transition: opacity 0.8s ease-out 0.9s; }
  [data-reveal][data-armed]:not([data-revealed]) .gv-fill { opacity: 0; }
}
.gv-draw { stroke-dasharray: 1; stroke-dashoffset: 0; }
`;

const d = (s: number) => ({ ["--d" as string]: `${s}s` });

function Ticks() {
  return (
    <svg viewBox="0 0 16 11" width="15" height="10" fill="none" stroke="#BFD3FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 6l3 3 6-7.5M6.5 8.5l.5.5 6-7.5" />
    </svg>
  );
}

function Answer() {
  return (
    <div aria-hidden className="gv-card">
      <div className="gv-top">
        <span className="gv-who">
          <span className="gv-av" data-tone="warm">NK</span>
          <span className="min-w-0">
            <span className="gv-name">New enquiry</span>
            <span className="gv-sub">WhatsApp · after hours</span>
          </span>
        </span>
        <span className="gv-app">22:15</span>
      </div>
      <div className="gv-hr" />
      <p className="gv-msg" data-dir="in">
        Do you deliver to Durban?
        <span className="gv-meta">22:15</span>
      </p>
      <p className="gv-msg gv-in" data-dir="out" style={d(0.45)}>
        Yes, it takes 2 to 3 working days.
        <span className="gv-meta">22:15 <Ticks /></span>
      </p>
      <p className="gv-status gv-in" style={d(0.75)}>Delivered and read</p>
    </div>
  );
}

function FollowUp() {
  return (
    <div aria-hidden className="gv-card">
      <div className="gv-top">
        <span className="gv-who">
          <span className="gv-av">LM</span>
          <span className="min-w-0">
            <span className="gv-name">Website lead</span>
            <span className="gv-sub">Asked for a quote</span>
          </span>
        </span>
        <span className="gv-chip" data-tone="amber">Quiet for 3 days</span>
      </div>
      <p className="gv-quote gv-in" style={d(0.35)}>Hi, just checking in on the quote. Happy to answer any questions.</p>
      <div className="gv-steps">
        <span className="gv-chip gv-pop" data-tone="green" style={d(0.6)}>Approved</span>
        <span className="gv-arrow gv-pop" style={d(0.75)}>then</span>
        <span className="gv-chip gv-pop" data-tone="blue" style={d(0.9)}>Sent 09:00</span>
      </div>
    </div>
  );
}

function Admin() {
  return (
    <div aria-hidden className="gv-card">
      <div className="gv-top">
        <span className="gv-app">Calendar</span>
        <span className="gv-chip gv-pop" data-tone="green" style={d(0.55)}>Booked</span>
      </div>
      <div className="gv-book">
        <span className="gv-date">
          <b>TUE</b>
          <span>14</span>
        </span>
        <span className="min-w-0">
          <span className="gv-time block">07:30 to 09:00</span>
          <span className="gv-name">Geyser repair</span>
          <span className="gv-sub">Address and photos captured</span>
        </span>
      </div>
      <div className="gv-hr" />
      <p className="gv-row gv-in" style={d(0.7)}>
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 11V7a4 4 0 0 1 8 0v4l1 1.5H3L4 11ZM6.5 14a1.5 1.5 0 0 0 3 0" />
        </svg>
        Reminder tonight at 20:00
      </p>
    </div>
  );
}

/* Sample series (made up, labelled "Sample" on the card). */
const MONTHS = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const VALUES = [42, 48, 46, 58, 63, 74];

function Report() {
  const W = 300;
  const H = 120;
  const pad = { l: 4, r: 4, t: 26, b: 22 };
  const max = 80;
  const x = (i: number) => pad.l + (i * (W - pad.l - pad.r)) / (VALUES.length - 1);
  const y = (v: number) => pad.t + (1 - v / max) * (H - pad.t - pad.b);
  const line = VALUES.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const area = `${line} L${x(VALUES.length - 1).toFixed(1)} ${H - pad.b} L${x(0).toFixed(1)} ${H - pad.b} Z`;
  const last = VALUES.length - 1;
  const lx = x(last);
  const ly = y(VALUES[last]);
  return (
    <div aria-hidden className="gv-card">
      <div className="gv-top">
        <span>
          <span className="gv-app block">Monthly report</span>
          <span className="gv-sub">Enquiries answered</span>
        </span>
        <span className="gv-chip" data-tone="muted">Sample</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="gv-chart" role="presentation">
        <defs>
          <linearGradient id="gv-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4D7CFF" stopOpacity="0.32" />
            <stop offset="1" stopColor="#4D7CFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[20, 40, 60, 80].map((g) => (
          <line key={g} x1={pad.l} x2={W - pad.r} y1={y(g)} y2={y(g)} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        ))}
        <line x1={pad.l} x2={W - pad.r} y1={H - pad.b} y2={H - pad.b} stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
        <path className="gv-fill" d={area} fill="url(#gv-area)" />
        <path className="gv-draw" pathLength={1} d={line} stroke="#8FB0FF" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {VALUES.slice(0, last).map((v, i) => (
          <circle key={i} cx={x(i)} cy={y(v)} r="2.5" fill="#0A1226" stroke="#8FB0FF" strokeWidth="1.5" />
        ))}
        <g className="gv-pop" style={{ ...d(1.4), transformOrigin: `${lx}px ${ly}px`, transformBox: "view-box" }}>
          <circle cx={lx} cy={ly} r="9" fill="rgba(77,124,255,0.25)" />
          <circle cx={lx} cy={ly} r="4.5" fill="#fff" stroke="#4D7CFF" strokeWidth="2.5" />
          <rect x={lx - 34} y={ly - 27} width="34" height="18" rx="9" fill="#4D7CFF" />
          <text x={lx - 17} y={ly - 14.5} textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff" style={{ fontVariantNumeric: "tabular-nums" }}>
            {VALUES[last]}
          </text>
        </g>
        {MONTHS.map((m, i) => (
          <text
            key={m}
            x={x(i)}
            y={H - 6}
            textAnchor={i === 0 ? "start" : i === last ? "end" : "middle"}
            fontSize="11"
            fill={i === last ? "#C9D6FF" : "#7D879B"}
            fontWeight={i === last ? 600 : 400}
          >
            {m}
          </text>
        ))}
      </svg>
      <p className="gv-status gv-in" style={{ ...d(1.1), justifyContent: "space-between" }}>
        <span>Sent on the 1st of each month</span>
        <span className="gv-chip" data-tone="blue">Sent</span>
      </p>
    </div>
  );
}

export function GetVisual({ word }: { word: string }) {
  if (word === "Answer") return <Answer />;
  if (word === "Follow up") return <FollowUp />;
  if (word === "Admin") return <Admin />;
  return <Report />;
}

/** Render once per page, next to the list. */
export function WorkVisualsStyle() {
  return <style>{CSS}</style>;
}
