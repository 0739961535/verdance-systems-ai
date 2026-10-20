/**
 * Small app screens for "Work done" (Answer / Follow up / Admin / Report).
 * Decorative (aria-hidden) and made-up sample content. Server component, no
 * JS: each card is its own data-reveal element, so RevealObserver arms it
 * below the fold and marks it revealed when the card itself scrolls in. The
 * sequences then play once and only move transform, opacity and a stroke
 * offset. No JS, above the fold or reduced motion: the finished state.
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

.gv-draw { stroke-dasharray: 1; stroke-dashoffset: 0; }

/* ---- sequences (only when the card is armed below the fold, then revealed) ---- */
.gv-slot { display: grid; }
.gv-slot > * { grid-area: 1 / 1; }
.gv-typing { justify-self: end; align-self: start; display: inline-flex; gap: 4px; padding: 11px 13px; border-radius: 16px; border-top-right-radius: 5px; background: linear-gradient(180deg, #2E5BD8, #2149B8); opacity: 0; }
.gv-typing i { width: 6px; height: 6px; border-radius: 9999px; background: rgba(255, 255, 255, 0.85); }
.gv-tick2 { opacity: 1; }
.gv-flip { display: grid; justify-items: end; }
.gv-flip > * { grid-area: 1 / 1; }
.gv-flip > .gv-f1, .gv-flip > .gv-f2, .gv-flip > .gv-a1 { opacity: 0; }
.gv-badge { position: absolute; right: -6px; top: -6px; width: 20px; height: 20px; border-radius: 9999px; background: #3DD68C; display: grid; place-items: center; box-shadow: 0 0 0 2px #0A1226; }
.gv-date { position: relative; overflow: visible; }
.gv-date-in { border-radius: 12px; overflow: hidden; }
.gv-slotbar { position: relative; height: 4px; border-radius: 4px; background: rgba(255, 255, 255, 0.07); overflow: hidden; margin-top: 6px; }
.gv-slotbar > i { position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(90deg, #2E5BD8, #5FE0A3); transform-origin: left; }

@media (prefers-reduced-motion: no-preference) {
  .gv-card[data-armed] { --rv: 0.25s; }
  /* Answer: typing dots, then the reply, then the second tick */
  .gv-card[data-armed]:not([data-revealed]) .gv-typing, .gv-card[data-armed]:not([data-revealed]) .gv-reply { opacity: 0; }
  .gv-card[data-armed][data-revealed] .gv-typing { animation: gv-typing 1.15s ease-out var(--rv) both; }
  .gv-card[data-armed][data-revealed] .gv-typing i { animation: gv-dot 0.6s ease-in-out calc(var(--rv) + var(--i) * 0.12s) 2; }
  .gv-card[data-armed][data-revealed] .gv-reply { animation: gv-rise 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) calc(var(--rv) + 1.05s) both; }
  .gv-card[data-armed][data-revealed] .gv-tick2 { animation: gv-fade 0.3s ease-out calc(var(--rv) + 1.75s) both; }
  .gv-card[data-armed][data-revealed] .gv-read { animation: gv-rise 0.4s ease-out calc(var(--rv) + 1.85s) both; }

  /* Follow up: Waiting, then Approved, then Sent */
  .gv-card[data-armed][data-revealed] .gv-f1 { animation: gv-flip-a 1.4s ease-in-out var(--rv) both; }
  .gv-card[data-armed][data-revealed] .gv-f2 { animation: gv-flip-b 2.2s ease-in-out var(--rv) both; }
  .gv-card[data-armed][data-revealed] .gv-f3 { animation: gv-flip-in 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) calc(var(--rv) + 2s) both; }
  .gv-card[data-armed][data-revealed] .gv-fq { animation: gv-rise 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) calc(var(--rv) + 0.2s) both; }
  .gv-card[data-armed][data-revealed] .gv-fs { animation: gv-rise 0.4s ease-out calc(var(--rv) + 2.2s) both; }

  /* Admin: the slot fills, the badge ticks, the chip flips to Booked */
  .gv-card[data-armed][data-revealed] .gv-slotbar > i { animation: gv-fill 1s cubic-bezier(0.4, 0, 0.2, 1) calc(var(--rv) + 0.2s) both; }
  .gv-card[data-armed][data-revealed] .gv-badge { animation: gv-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--rv) + 1.2s) both; }
  .gv-card[data-armed][data-revealed] .gv-badge path { animation: gv-stroke 0.35s ease-out calc(var(--rv) + 1.4s) both; }
  .gv-card[data-armed][data-revealed] .gv-a1 { animation: gv-flip-a 1.5s ease-in-out var(--rv) both; }
  .gv-card[data-armed][data-revealed] .gv-a2 { animation: gv-flip-in 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) calc(var(--rv) + 1.2s) both; }
  .gv-card[data-armed][data-revealed] .gv-ar { animation: gv-rise 0.4s ease-out calc(var(--rv) + 1.55s) both; }

  /* Report: bars grow in turn, the line draws over them, dots and value pop */
  .gv-card[data-armed][data-revealed] .gv-bar { animation: gv-grow 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) calc(var(--rv) + var(--i) * 0.09s) both; }
  .gv-card[data-armed][data-revealed] .gv-line { animation: gv-draw 0.9s cubic-bezier(0.4, 0, 0.2, 1) calc(var(--rv) + 0.6s) both; }
  .gv-card[data-armed][data-revealed] .gv-area { animation: gv-fade 0.7s ease-out calc(var(--rv) + 1.1s) both; }
  .gv-card[data-armed][data-revealed] .gv-pt { animation: gv-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--rv) + 0.65s + var(--i) * 0.15s) both; }
  .gv-card[data-armed][data-revealed] .gv-val { animation: gv-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--rv) + 1.55s) both; }
  .gv-card[data-armed][data-revealed] .gv-rs { animation: gv-rise 0.4s ease-out calc(var(--rv) + 1.7s) both; }
}
@keyframes gv-typing { 0% { opacity: 0; transform: translateY(6px) scale(0.92); } 18% { opacity: 1; transform: none; } 80% { opacity: 1; transform: none; } 100% { opacity: 0; transform: scale(0.96); } }
@keyframes gv-dot { 0%, 100% { transform: translateY(0); opacity: 0.55; } 50% { transform: translateY(-3px); opacity: 1; } }
@keyframes gv-rise { from { opacity: 0; transform: translate3d(0, 8px, 0) scale(0.98); } to { opacity: 1; transform: none; } }
@keyframes gv-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes gv-flip-a { 0%, 72% { opacity: 1; transform: none; } 100% { opacity: 0; transform: translateY(-7px); } }
@keyframes gv-flip-b { 0%, 46% { opacity: 0; transform: translateY(7px); } 60%, 84% { opacity: 1; transform: none; } 100% { opacity: 0; transform: translateY(-7px); } }
@keyframes gv-flip-in { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: none; } }
@keyframes gv-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes gv-pop { from { opacity: 0; transform: scale(0.6); } to { opacity: 1; transform: none; } }
@keyframes gv-stroke { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes gv-grow { from { transform: scaleY(0); } to { transform: none; } }
@keyframes gv-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }

/* report chart */
.gv-plot { position: relative; }
.gv-bar, .gv-pt, .gv-val { transform-box: fill-box; }
.gv-bar { transform-origin: 50% 100%; }
.gv-pt, .gv-val { transform-origin: center; }
.gv-hit {
  position: absolute; top: 0; bottom: 0; width: 44px; transform: translateX(-50%);
  border-radius: 10px; background: transparent; border: 0; padding: 0; cursor: pointer;
}
.gv-hit:focus-visible { outline: 2px solid #8FB0FF; outline-offset: 2px; }
.gv-tip {
  position: absolute; z-index: 2; top: 4%; right: calc(100% + 4px); min-width: 9.5rem; padding: 9px 11px; border-radius: 12px;
  background: rgba(10, 18, 38, 0.96); border: 1px solid rgba(143, 176, 255, 0.28);
  box-shadow: 0 16px 30px -18px rgba(0, 0, 0, 0.9); text-align: left; pointer-events: none;
  font-size: 12.5px; line-height: 1.35; color: #C9D1E3; white-space: nowrap;
  opacity: 0; transform: translateX(4px); transition: opacity 160ms ease-out, transform 160ms ease-out;
}
.gv-tip b { display: block; font-size: 15px; font-weight: 600; color: #F2F5FC; }
.gv-tip small { display: block; margin-bottom: 3px; font-size: 10.5px; letter-spacing: 0.08em; text-transform: uppercase; color: #8B93A3; }
.gv-hit:hover .gv-tip, .gv-hit:focus-visible .gv-tip { opacity: 1; transform: none; }
.gv-plot:has(.gv-hit:hover, .gv-hit:focus-visible) .gv-val > rect, .gv-plot:has(.gv-hit:hover, .gv-hit:focus-visible) .gv-val > text { opacity: 0; transition: opacity 160ms ease-out; }
@media (prefers-reduced-motion: reduce) { .gv-tip { transition: none; } }
`;

const vi = (i: number) => ({ ["--i" as string]: i });

/** Each card is its own reveal target, so its sequence waits for the card. */
const CARD = { "data-reveal": "", style: { ["--reveal-y" as string]: "12px" } } as const;

function Ticks() {
  return (
    <svg viewBox="0 0 16 11" width="15" height="10" fill="none" stroke="#BFD3FF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 6l3 3 6-7.5" />
      <path className="gv-tick2" d="M6.5 8.5l.5.5 6-7.5" />
    </svg>
  );
}

function Answer() {
  return (
    <div aria-hidden className="gv-card" {...CARD}>
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
      <div className="gv-slot">
        <span className="gv-typing">
          <i style={vi(0)} />
          <i style={vi(1)} />
          <i style={vi(2)} />
        </span>
        <p className="gv-msg gv-reply" data-dir="out">
          Yes, it takes 2 to 3 working days.
          <span className="gv-meta">22:15 <Ticks /></span>
        </p>
      </div>
      <p className="gv-status gv-read">Delivered and read</p>
    </div>
  );
}

function FollowUp() {
  return (
    <div aria-hidden className="gv-card" {...CARD}>
      <div className="gv-top">
        <span className="gv-who">
          <span className="gv-av">LM</span>
          <span className="min-w-0">
            <span className="gv-name">Website lead</span>
            <span className="gv-sub">Asked for a quote · quiet 3 days</span>
          </span>
        </span>
        <span className="gv-flip">
          <span className="gv-chip gv-f1" data-tone="amber">Waiting</span>
          <span className="gv-chip gv-f2" data-tone="green">Approved</span>
          <span className="gv-chip gv-f3" data-tone="blue">Sent 09:00</span>
        </span>
      </div>
      <p className="gv-quote gv-fq">Hi, just checking in on the quote. Happy to answer any questions.</p>
      <p className="gv-status gv-fs" style={{ justifyContent: "flex-start" }}>Drafted for you, approved by you, sent at 09:00</p>
    </div>
  );
}

function Admin() {
  return (
    <div aria-hidden className="gv-card" {...CARD}>
      <div className="gv-top">
        <span className="gv-app">Calendar</span>
        <span className="gv-flip">
          <span className="gv-chip gv-a1" data-tone="muted">Holding slot</span>
          <span className="gv-chip gv-a2" data-tone="green">Booked</span>
        </span>
      </div>
      <div className="gv-book">
        <span className="gv-date">
          <span className="gv-date-in block">
            <b>TUE</b>
            <span>14</span>
          </span>
          <span className="gv-badge">
            <svg viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="#06231A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 6.3 5 8.6l4.5-5" pathLength={1} strokeDasharray="1" />
            </svg>
          </span>
        </span>
        <span className="min-w-0">
          <span className="gv-time block">07:30 to 09:00</span>
          <span className="gv-name">Geyser repair</span>
          <span className="gv-sub">Address and photos captured</span>
          <span className="gv-slotbar block">
            <i />
          </span>
        </span>
      </div>
      <div className="gv-hr" />
      <p className="gv-row gv-ar">
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 11V7a4 4 0 0 1 8 0v4l1 1.5H3L4 11ZM6.5 14a1.5 1.5 0 0 0 3 0" />
        </svg>
        Reminder tonight at 20:00
      </p>
    </div>
  );
}

/* Sample series (made up, labelled "Sample" on the card and in the tooltip). */
const MONTHS = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const VALUES = [42, 48, 46, 58, 63, 74];

function Report() {
  const W = 300;
  const H = 136;
  const pad = { l: 4, r: 4, t: 30, b: 22 };
  const max = 80;
  const band = (W - pad.l - pad.r) / VALUES.length;
  const bw = Math.min(26, band * 0.5);
  const x = (i: number) => pad.l + band * (i + 0.5);
  const y = (v: number) => pad.t + (1 - v / max) * (H - pad.t - pad.b);
  const base = H - pad.b;
  const line = VALUES.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${(y(v) - 6).toFixed(1)}`).join(" ");
  const area = `${line} L${x(VALUES.length - 1).toFixed(1)} ${base} L${x(0).toFixed(1)} ${base} Z`;
  const last = VALUES.length - 1;
  const lx = x(last);
  const ly = y(VALUES[last]) - 6;
  const prev = VALUES[last - 1];
  return (
    <div className="gv-card" {...CARD}>
      <div className="gv-top" aria-hidden>
        <span>
          <span className="gv-app block">Monthly report</span>
          <span className="gv-sub">Enquiries answered</span>
        </span>
        <span className="gv-chip" data-tone="muted">Sample</span>
      </div>
      <div className="gv-plot">
        <svg viewBox={`0 0 ${W} ${H}`} className="gv-chart" aria-hidden>
          <defs>
            <linearGradient id="gv-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#4D7CFF" stopOpacity="0.22" />
              <stop offset="1" stopColor="#4D7CFF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gv-barhi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8FB0FF" />
              <stop offset="1" stopColor="#4D7CFF" />
            </linearGradient>
          </defs>
          {[20, 40, 60, 80].map((g) => (
            <line key={g} x1={pad.l} x2={W - pad.r} y1={y(g)} y2={y(g)} stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 4" />
          ))}
          {VALUES.map((v, i) => (
            <rect
              key={i}
              className="gv-bar"
              style={vi(i)}
              x={x(i) - bw / 2}
              y={y(v)}
              width={bw}
              height={base - y(v)}
              rx="5"
              fill={i === last ? "url(#gv-barhi)" : "rgba(77,124,255,0.28)"}
            />
          ))}
          <line x1={pad.l} x2={W - pad.r} y1={base} y2={base} stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
          <path className="gv-area" d={area} fill="url(#gv-area)" />
          <path className="gv-line gv-draw" pathLength={1} d={line} stroke="#C9D6FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {VALUES.slice(0, last).map((v, i) => (
            <circle key={i} className="gv-pt" style={vi(i)} cx={x(i)} cy={y(v) - 6} r="2.75" fill="#0A1226" stroke="#C9D6FF" strokeWidth="1.5" />
          ))}
          <g className="gv-val">
            <circle cx={lx} cy={ly} r="9" fill="rgba(77,124,255,0.25)" />
            <circle cx={lx} cy={ly} r="4.5" fill="#fff" stroke="#4D7CFF" strokeWidth="2.5" />
            <rect x={lx - 42} y={ly - 27} width="34" height="18" rx="9" fill="#4D7CFF" />
            <text x={lx - 25} y={ly - 14.5} textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff" style={{ fontVariantNumeric: "tabular-nums" }}>
              {VALUES[last]}
            </text>
          </g>
          {MONTHS.map((m, i) => (
            <text key={m} x={x(i)} y={H - 6} textAnchor="middle" fontSize="10" fill={i === last ? "#C9D6FF" : "#7D879B"} fontWeight={i === last ? 600 : 400}>
              {m}
            </text>
          ))}
        </svg>
        <button
          type="button"
          className="gv-hit"
          style={{ left: `${((lx / W) * 100).toFixed(2)}%` }}
          aria-label={`Sample data, not a real client: ${MONTHS[last]}, ${VALUES[last]} enquiries answered, up ${VALUES[last] - prev} on ${MONTHS[last - 1]}`}
        >
          <span className="gv-tip" aria-hidden>
            <small>Sample · {MONTHS[last]}</small>
            <b>{VALUES[last]} answered</b>
            Up {VALUES[last] - prev} on {MONTHS[last - 1]}
          </span>
        </button>
      </div>
      <p className="gv-status gv-rs" aria-hidden style={{ justifyContent: "space-between" }}>
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
