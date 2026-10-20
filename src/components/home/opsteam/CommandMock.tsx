"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Pencil } from "lucide-react";
import { SAMPLE_AGENTS, SAMPLE_APPROVALS, SAMPLE_ASK, SAMPLE_BRIEF } from "./opsData";

/**
 * A live-feeling sample of the Operations Team's command centre.
 * Motion: cards rise in once on view, then one agent ticks every couple of
 * seconds while the panel is on screen. Reduced motion gets the static view.
 * Every box has a fixed height so nothing shifts (CLS 0).
 */

type Decision = "approved" | "editing" | null;

export function CommandMock() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [counts, setCounts] = useState(() => SAMPLE_AGENTS.map((a) => a.start));
  const [task, setTask] = useState(() => SAMPLE_AGENTS.map(() => 0));
  const [last, setLast] = useState(-1);
  const [decisions, setDecisions] = useState<Decision[]>(() => SAMPLE_APPROVALS.map(() => null));

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    // Only hold the cards back when they start below the fold and motion is welcome.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Written straight to the DOM (no re-render): data-armed hides, data-seen plays the entrance.
    if (!reduce && el.getBoundingClientRect().top > window.innerHeight * 0.9) el.dataset.armed = "";
    else el.dataset.seen = "";
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.dataset.seen = "";
        setActive(e.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // A fixed, uneven order so it feels like real work, not a metronome.
    const order = [0, 2, 0, 1, 3, 0, 2, 4, 1, 0];
    let i = 0;
    const id = window.setInterval(() => {
      const k = order[i % order.length];
      i += 1;
      setCounts((c) => c.map((v, j) => (j === k ? v + 1 : v)));
      setTask((t) => t.map((v, j) => (j === k ? (v + 1) % SAMPLE_AGENTS[j].tasks.length : v)));
      setLast(k);
    }, 2200);
    return () => window.clearInterval(id);
  }, [active]);

  const decide = (i: number, d: Decision) => setDecisions((all) => all.map((v, j) => (j === i ? d : v)));
  const max = Math.max(...SAMPLE_ASK.bars.map((b) => b.v));

  return (
    <div ref={root} className="ocm">
      <style>{CSS}</style>
      <div className="ocm-bar">
        <span className="ocm-dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="ocm-title">Operations Team</span>
        <span className="ocm-run">
          <span className="ocm-pulse" aria-hidden />
          Running
        </span>
        <span className="ocm-sample">Sample</span>
      </div>

      <div className="ocm-grid">
        {/* Morning brief */}
        <section className="ocm-card ocm-brief" style={{ ["--d" as string]: "0s" }} aria-label="Morning brief, sample">
          <div className="ocm-h">
            <span>Morning brief</span>
            <span className="ocm-time tabular">07:00</span>
          </div>
          <p className="ocm-greet">Good morning. Here is what happened while you were away.</p>
          <ul className="ocm-brief-list">
            {SAMPLE_BRIEF.map((b) => (
              <li key={b.t}>
                <span className="ocm-num tabular">{b.n}</span>
                <span>{b.t}</span>
              </li>
            ))}
          </ul>
          <p className="ocm-next">
            <span className="ocm-k">First thing today</span> Approve the wedding reply, it has been waiting since 21:14.
          </p>
        </section>

        {/* Agents */}
        <section className="ocm-card ocm-agents" style={{ ["--d" as string]: "0.08s" }} aria-label="Agents, sample">
          <div className="ocm-h">
            <span>Agents</span>
            <span className="ocm-time">Today</span>
          </div>
          <ul>
            {SAMPLE_AGENTS.map((a, i) => (
              <li key={a.name} className="ocm-agent" data-hot={last === i ? "" : undefined}>
                <span className="ocm-pulse ocm-pulse-sm" aria-hidden />
                <span className="ocm-agent-name">{a.name}</span>
                <span className="ocm-agent-task" aria-hidden>
                  <span key={task[i]}>{a.tasks[task[i]]}</span>
                </span>
                <span className="ocm-count tabular">
                  <span key={counts[i]}>{counts[i]}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Approvals */}
        <section className="ocm-card ocm-approvals" style={{ ["--d" as string]: "0.16s" }} aria-label="Approvals, sample">
          <div className="ocm-h">
            <span>Waiting for you</span>
            <span className="ocm-time tabular">{decisions.filter((d) => d !== "approved").length} to check</span>
          </div>
          <ul className="ocm-appr-list">
            {SAMPLE_APPROVALS.map((a, i) => (
              <li key={a.title} className="ocm-appr" data-state={decisions[i] ?? undefined}>
                <div className="ocm-appr-top">
                  <span className="ocm-chip">{a.app}</span>
                  <span className="ocm-appr-title">{a.title}</span>
                </div>
                <p className="ocm-draft">{a.draft}</p>
                <div className="ocm-actions">
                  {decisions[i] === "approved" ? (
                    <span className="ocm-done" role="status">
                      <Check size={15} aria-hidden /> Approved, sent in your name
                    </span>
                  ) : (
                    <>
                      <button type="button" className="ocm-btn ocm-btn-go" onClick={() => decide(i, "approved")}>
                        <Check size={15} aria-hidden /> Approve
                      </button>
                      <button
                        type="button"
                        className="ocm-btn"
                        aria-pressed={decisions[i] === "editing"}
                        onClick={() => decide(i, decisions[i] === "editing" ? null : "editing")}
                      >
                        <Pencil size={14} aria-hidden /> {decisions[i] === "editing" ? "Editing" : "Edit"}
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <p className="ocm-foot">You choose what goes out on its own.</p>
        </section>

        {/* Ask your business */}
        <section className="ocm-card ocm-ask" style={{ ["--d" as string]: "0.24s" }} aria-label="Ask your business, sample">
          <div className="ocm-h">
            <span>Ask your business</span>
          </div>
          <p className="ocm-q">{SAMPLE_ASK.q}</p>
          <p className="ocm-a">
            {SAMPLE_ASK.a.split(" ").map((w, i) => (
              <span key={i} style={{ ["--w" as string]: `${0.5 + i * 0.035}s` }}>
                {w}{" "}
              </span>
            ))}
          </p>
          <figure className="ocm-chart" aria-label="After-hours enquiries by day, sample">
            <div className="ocm-bars">
              {SAMPLE_ASK.bars.map((b, i) => (
                <div key={b.d} className="ocm-col">
                  <span className="ocm-v tabular">{b.v}</span>
                  <span className="ocm-track">
                    <span
                      className="ocm-bar-fill"
                      data-top={b.v === max ? "" : undefined}
                      style={{ height: `${(b.v / max) * 100}%`, ["--b" as string]: `${1.1 + i * 0.06}s` }}
                    />
                  </span>
                  <span className="ocm-d">{b.d}</span>
                </div>
              ))}
            </div>
          </figure>
        </section>
      </div>
    </div>
  );
}

const CSS = `
.ocm { --p1: #0A1226; --p2: #13203F; --line: rgba(255,255,255,0.08); --line2: rgba(255,255,255,0.13);
  --tx: #F2F5FC; --tx2: rgba(234,240,255,0.74); --tx3: rgba(234,240,255,0.56); --blue: #4D7CFF; --sky: #8FB0FF; --ok: #4ADE80;
  background: var(--p1); color: var(--tx); border-radius: 22px; border: 1px solid var(--line2);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 40px 120px -48px rgba(77,124,255,0.45); overflow: hidden; }
.ocm-bar { display: flex; align-items: center; gap: 12px; height: 48px; padding: 0 16px; border-bottom: 1px solid var(--line); font-size: 0.8125rem; }
.ocm-dots { display: inline-flex; gap: 6px; }
.ocm-dots i { width: 9px; height: 9px; border-radius: 50%; background: rgba(255,255,255,0.14); }
.ocm-title { font-weight: 600; letter-spacing: -0.01em; }
.ocm-run { margin-left: auto; display: inline-flex; align-items: center; gap: 8px; color: var(--tx2); font-family: var(--font-mono); font-size: 0.75rem; }
.ocm-sample { font-family: var(--font-mono); font-size: 0.6875rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--sky);
  border: 1px solid rgba(143,176,255,0.35); border-radius: 999px; padding: 3px 9px; }
.ocm-pulse { position: relative; width: 8px; height: 8px; border-radius: 50%; background: var(--ok); flex: none; }
.ocm-pulse::after { content: ""; position: absolute; inset: 0; border-radius: 50%; background: var(--ok); opacity: 0.5; animation: ocm-ping 2.4s cubic-bezier(.2,.7,.2,1) infinite; }
.ocm-pulse-sm { width: 6px; height: 6px; }
@keyframes ocm-ping { 0% { transform: scale(1); opacity: 0.5; } 80%, 100% { transform: scale(3); opacity: 0; } }

.ocm-grid { display: grid; gap: 12px; padding: 12px; }
@media (min-width: 900px) { .ocm-grid { grid-template-columns: 5fr 7fr; gap: 14px; padding: 14px; } }
.ocm-card { background: var(--p2); border: 1px solid var(--line); border-radius: 16px; padding: 18px; min-width: 0;
  transition: opacity .7s cubic-bezier(.2,.7,.2,1) var(--d), transform .7s cubic-bezier(.2,.7,.2,1) var(--d); }
.ocm[data-armed]:not([data-seen]) .ocm-card { opacity: 0; transform: translate3d(0, 14px, 0); }
.ocm-h { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; font-family: var(--font-mono); font-size: 0.75rem;
  letter-spacing: 0.04em; text-transform: uppercase; color: var(--tx3); }
.ocm-time { text-transform: none; letter-spacing: 0; }

.ocm-greet { margin: 14px 0 0; font-size: 1rem; line-height: 1.45; color: var(--tx); }
.ocm-brief-list { margin: 14px 0 0; display: grid; gap: 2px; }
.ocm-brief-list li { display: flex; align-items: baseline; gap: 12px; padding: 9px 0; border-top: 1px solid var(--line); font-size: 0.9375rem; color: var(--tx2); }
.ocm-num { min-width: 2.2ch; font-size: 1.25rem; font-weight: 600; color: var(--tx); letter-spacing: -0.02em; }
.ocm-next { margin: 12px 0 0; padding: 12px; border-radius: 12px; background: rgba(77,124,255,0.12); border: 1px solid rgba(77,124,255,0.28);
  font-size: 0.875rem; line-height: 1.45; color: var(--tx); }
.ocm-k { display: block; margin-bottom: 2px; font-family: var(--font-mono); font-size: 0.6875rem; letter-spacing: 0.05em; text-transform: uppercase; color: var(--sky); }

.ocm-agents ul { margin: 10px 0 0; }
.ocm-agent { display: grid; grid-template-columns: auto 6.5rem minmax(0,1fr) 3ch; align-items: center; gap: 12px; height: 46px;
  border-top: 1px solid var(--line); font-size: 0.875rem; }
.ocm-agent:first-child { border-top: 0; }
.ocm-agent-name { font-weight: 600; color: var(--tx); }
.ocm-agent-task { color: var(--tx3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ocm-agent-task span { display: inline; animation: ocm-in .5s cubic-bezier(.2,.7,.2,1); }
.ocm-count { text-align: right; font-weight: 600; color: var(--tx); font-size: 1rem; }
.ocm-count span { display: inline-block; animation: ocm-tick .5s cubic-bezier(.2,.7,.2,1); }
.ocm-agent[data-hot] .ocm-count { color: var(--sky); }
@keyframes ocm-tick { from { transform: translate3d(0, 6px, 0); opacity: 0.2; } to { transform: none; opacity: 1; } }
@keyframes ocm-in { from { opacity: 0; } to { opacity: 1; } }
@media (max-width: 520px) { .ocm-agent { grid-template-columns: auto minmax(0,1fr) 3ch; height: 58px; row-gap: 0; }
  .ocm-agent-name { grid-column: 2; } .ocm-agent-task { grid-column: 2; grid-row: 2; font-size: 0.8125rem; }
  .ocm-agent .ocm-pulse { grid-row: 1 / span 2; } .ocm-count { grid-column: 3; grid-row: 1 / span 2; } }

.ocm-appr-list { margin: 12px 0 0; display: grid; gap: 10px; }
.ocm-appr { padding: 14px; border-radius: 12px; background: rgba(10,18,38,0.6); border: 1px solid var(--line); transition: border-color .3s, background-color .3s; }
.ocm-appr[data-state="approved"] { border-color: rgba(74,222,128,0.35); background: rgba(74,222,128,0.06); }
.ocm-appr[data-state="editing"] { border-color: rgba(143,176,255,0.45); }
.ocm-appr-top { display: flex; align-items: center; gap: 10px; min-width: 0; }
.ocm-chip { font-family: var(--font-mono); font-size: 0.6875rem; color: var(--sky); background: rgba(77,124,255,0.14); border-radius: 999px; padding: 3px 8px; flex: none; }
.ocm-appr-title { font-weight: 600; font-size: 0.9375rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ocm-draft { margin: 8px 0 0; font-size: 0.875rem; line-height: 1.45; color: var(--tx2); }
.ocm-appr[data-state="editing"] .ocm-draft { outline: 1px dashed rgba(143,176,255,0.45); outline-offset: 4px; border-radius: 4px; }
.ocm-actions { margin-top: 10px; display: flex; gap: 8px; min-height: 44px; align-items: center; }
.ocm-btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 44px; padding: 0 16px; border-radius: 999px;
  border: 1px solid var(--line2); background: transparent; color: var(--tx); font-size: 0.875rem; font-weight: 500; cursor: pointer;
  transition: background-color .2s, border-color .2s; }
.ocm-btn:hover { background: rgba(255,255,255,0.06); }
.ocm-btn:focus-visible { outline: 2px solid var(--sky); outline-offset: 2px; }
.ocm-btn-go { background: var(--blue); border-color: var(--blue); color: #fff; }
.ocm-btn-go:hover { background: #3E6AE8; }
.ocm-done { display: inline-flex; align-items: center; gap: 6px; font-size: 0.875rem; color: var(--ok); animation: ocm-in .4s ease; }
.ocm-foot { margin: 12px 0 0; font-family: var(--font-serif); font-style: italic; font-size: 0.9375rem; color: var(--tx2); }

.ocm-q { margin: 14px 0 0; margin-left: auto; width: fit-content; max-width: 90%; padding: 10px 14px; border-radius: 14px 14px 4px 14px;
  background: var(--blue); color: #fff; font-size: 0.9375rem; line-height: 1.4; }
.ocm-a { margin: 12px 0 0; font-size: 0.9375rem; line-height: 1.5; color: var(--tx); }
.ocm-a span { transition: opacity .35s ease var(--w); }
.ocm[data-armed]:not([data-seen]) .ocm-a span { opacity: 0; }
.ocm-chart { margin: 14px 0 0; padding: 12px 10px 8px; border-radius: 12px; background: rgba(10,18,38,0.6); border: 1px solid var(--line); }
.ocm-bars { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; height: 122px; }
.ocm-col { display: flex; flex-direction: column; align-items: center; min-width: 0; }
.ocm-v { font-size: 0.6875rem; line-height: 16px; color: var(--tx3); }
.ocm-track { display: flex; align-items: flex-end; justify-content: center; width: 100%; height: 80px; margin-top: 4px; }
.ocm-bar-fill { display: block; width: 100%; max-width: 26px; border-radius: 5px 5px 2px 2px; background: rgba(143,176,255,0.35);
  transform-origin: bottom; transition: transform .8s cubic-bezier(.2,.7,.2,1) var(--b); }
.ocm-bar-fill[data-top] { background: var(--blue); }
.ocm[data-armed]:not([data-seen]) .ocm-bar-fill { transform: scaleY(0); }
.ocm-d { margin-top: 6px; font-family: var(--font-mono); font-size: 0.6875rem; color: var(--tx3); }

@media (prefers-reduced-motion: reduce) {
  .ocm-card, .ocm-a span, .ocm-bar-fill { transition: none; }
  .ocm[data-armed]:not([data-seen]) .ocm-card, .ocm[data-armed]:not([data-seen]) .ocm-a span { opacity: 1; transform: none; }
  .ocm[data-armed]:not([data-seen]) .ocm-bar-fill { transform: none; }
  .ocm-pulse::after, .ocm-count span, .ocm-agent-task span, .ocm-done { animation: none; }
}
`;
