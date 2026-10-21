"use client";

import { useState } from "react";
import { Check, Pencil } from "lucide-react";
import { SAMPLE_AGENTS, SAMPLE_APPROVALS, SAMPLE_ASK, SAMPLE_BRIEF } from "./opsData";

/**
 * The command centre as it appears on the laptop screen (sample data).
 * Everything is sized in em off one font size set in cqw of the screen, so it
 * scales with the laptop and never shifts layout. The laptop always shows all
 * four panels. On phones the stage also renders a "zoom" copy that shows the
 * panel chosen by `tab` at readable size, and the laptop marks that panel.
 * Counts and ticks come from OpsCommandStage, which runs the live parts.
 */

type Decision = "approved" | "editing" | null;

export const SCREEN_PANELS = ["Brief", "Agents", "Ask", "Approvals"] as const;

export function CommandMock({
  counts = SAMPLE_AGENTS.map((a) => a.start),
  task = SAMPLE_AGENTS.map(() => 0),
  last = -1,
  tab = 0,
  variant = "screen",
}: {
  counts?: number[];
  task?: number[];
  last?: number;
  tab?: number;
  /** "screen": the full four-panel screen on the laptop. "zoom": one panel at phone-readable size. */
  variant?: "screen" | "zoom";
}) {
  const [decisions, setDecisions] = useState<Decision[]>(() => SAMPLE_APPROVALS.map(() => null));
  const decide = (i: number, d: Decision) => setDecisions((all) => all.map((v, j) => (j === i ? d : v)));
  const max = Math.max(...SAMPLE_ASK.bars.map((b) => b.v));
  const on = (i: number) => (tab === i ? "" : undefined);

  return (
    <div className="ocm" data-variant={variant}>
      {variant === "screen" && <style>{CSS}</style>}
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
        <section className="ocm-card ocm-brief" data-on={on(0)} style={{ ["--d" as string]: "0.1s" }} aria-label="Morning brief, sample">
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

        <section className="ocm-card ocm-agents" data-on={on(1)} style={{ ["--d" as string]: "0.18s" }} aria-label="Agents, sample">
          <div className="ocm-h">
            <span>Agents</span>
            <span className="ocm-time">Done today</span>
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

        <section className="ocm-card ocm-ask" data-on={on(2)} style={{ ["--d" as string]: "0.26s" }} aria-label="Ask your business, sample">
          <div className="ocm-h">
            <span>Ask your business</span>
          </div>
          <p className="ocm-q">{SAMPLE_ASK.q}</p>
          <p className="ocm-a">
            {SAMPLE_ASK.a.split(" ").map((w, i) => (
              <span key={i} style={{ ["--w" as string]: `${0.6 + i * 0.035}s` }}>
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

        <section className="ocm-card ocm-approvals" data-on={on(3)} style={{ ["--d" as string]: "0.34s" }} aria-label="Waiting for you, sample">
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
                      <Check aria-hidden /> Approved, sent in your name
                    </span>
                  ) : (
                    <>
                      <button type="button" className="ocm-btn ocm-btn-go" onClick={() => decide(i, "approved")}>
                        <Check aria-hidden /> Approve
                      </button>
                      <button
                        type="button"
                        className="ocm-btn"
                        aria-pressed={decisions[i] === "editing"}
                        onClick={() => decide(i, decisions[i] === "editing" ? null : "editing")}
                      >
                        <Pencil aria-hidden /> {decisions[i] === "editing" ? "Editing" : "Edit"}
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <p className="ocm-foot">You choose what goes out on its own.</p>
        </section>
      </div>
    </div>
  );
}

const CSS = `
.ocm { --p2: #13203F; --line: rgba(255,255,255,0.08); --line2: rgba(255,255,255,0.13);
  --tx: #F2F5FC; --tx2: rgba(234,240,255,0.76); --tx3: rgba(234,240,255,0.58); --blue: #4D7CFF; --sky: #8FB0FF; --ok: #4ADE80;
  position: absolute; inset: 0; display: flex; flex-direction: column; font-size: 1.3cqw; line-height: 1.4;
  color: var(--tx); background: radial-gradient(120% 80% at 80% 0%, #0E1A3A 0%, #0A1226 55%, #060B1A 100%); }
.ocm svg { width: 1.15em; height: 1.15em; flex: none; }
.ocm-bar { flex: none; display: flex; align-items: center; gap: 0.9em; height: 2.9em; padding: 0 1.2em; border-bottom: 1px solid var(--line); font-size: 0.95em; }
.ocm-dots { display: inline-flex; gap: 0.45em; }
.ocm-dots i { width: 0.7em; height: 0.7em; border-radius: 50%; background: rgba(255,255,255,0.16); }
.ocm-title { font-weight: 600; letter-spacing: -0.01em; }
.ocm-run { margin-left: auto; display: inline-flex; align-items: center; gap: 0.6em; color: var(--tx2); font-family: var(--font-mono); font-size: 0.9em; }
.ocm-sample { font-family: var(--font-mono); font-size: 0.8em; letter-spacing: 0.06em; text-transform: uppercase; color: var(--sky);
  border: 1px solid rgba(143,176,255,0.4); border-radius: 999px; padding: 0.2em 0.75em; }
.ocm-pulse { position: relative; width: 0.62em; height: 0.62em; border-radius: 50%; background: var(--ok); flex: none; }
.ocm-pulse::after { content: ""; position: absolute; inset: 0; border-radius: 50%; background: var(--ok); opacity: 0;
  animation: ocm-ping 2.4s cubic-bezier(.2,.7,.2,1) infinite; animation-play-state: var(--play, paused); }
.ocm-pulse-sm { width: 0.5em; height: 0.5em; }
@keyframes ocm-ping { 0% { transform: scale(1); opacity: 0.5; } 80%, 100% { transform: scale(3); opacity: 0; } }

.ocm-grid { flex: 1; min-height: 0; display: grid; grid-template-columns: 5fr 7fr; grid-template-rows: 1fr 1fr; gap: 0.9em; padding: 0.9em; }
.ocm-card { position: relative; overflow: hidden; background: var(--p2); border: 1px solid var(--line); border-radius: 1em; padding: 1.1em 1.2em; min-width: 0; min-height: 0;
  transition: opacity .7s cubic-bezier(.2,.7,.2,1) var(--d), transform .7s cubic-bezier(.2,.7,.2,1) var(--d); }
.ocm-h { display: flex; justify-content: space-between; align-items: baseline; gap: 1em; font-family: var(--font-mono); font-size: 0.85em;
  letter-spacing: 0.04em; text-transform: uppercase; color: var(--tx3); }
.ocm-time { text-transform: none; letter-spacing: 0; }

.ocm-greet { margin: 0.9em 0 0; font-size: 1.1em; line-height: 1.4; }
.ocm-brief-list { margin: 0.7em 0 0; padding: 0; list-style: none; }
.ocm-brief-list li { display: flex; align-items: baseline; gap: 0.9em; padding: 0.55em 0; border-top: 1px solid var(--line); color: var(--tx2); }
.ocm-num { min-width: 2.2ch; font-size: 1.35em; font-weight: 600; color: var(--tx); letter-spacing: -0.02em; }
.ocm-next { margin: 0.7em 0 0; padding: 0.75em 0.9em; border-radius: 0.8em; background: rgba(77,124,255,0.13); border: 1px solid rgba(77,124,255,0.3); font-size: 0.95em; line-height: 1.4; }
.ocm-k { display: block; margin-bottom: 0.15em; font-family: var(--font-mono); font-size: 0.8em; letter-spacing: 0.05em; text-transform: uppercase; color: var(--sky); }

.ocm-agents ul { margin: 0.5em 0 0; padding: 0; list-style: none; }
.ocm-agent { display: grid; grid-template-columns: auto 6.6em minmax(0,1fr) 3ch; align-items: center; gap: 0.9em; height: 3.1em; border-top: 1px solid var(--line);
  transition: background-color .5s ease; }
.ocm-agent:first-child { border-top: 0; }
.ocm-agent-name { font-weight: 600; }
.ocm-agent-task { color: var(--tx3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ocm-agent-task span { animation: ocm-in .5s cubic-bezier(.2,.7,.2,1); }
.ocm-count { text-align: right; font-weight: 600; font-size: 1.1em; }
.ocm-count span { display: inline-block; animation: ocm-tick .5s cubic-bezier(.2,.7,.2,1); }
.ocm-agent[data-hot] { background-color: rgba(77,124,255,0.1); }
.ocm-agent[data-hot] .ocm-count { color: var(--sky); }
@keyframes ocm-tick { from { transform: translate3d(0, 0.5em, 0); opacity: 0.2; } to { transform: none; opacity: 1; } }
@keyframes ocm-in { from { opacity: 0; } to { opacity: 1; } }

.ocm-q { margin: 0.9em 0 0 auto; width: fit-content; max-width: 90%; padding: 0.6em 0.95em; border-radius: 1em 1em 0.3em 1em; background: var(--blue); color: #fff; line-height: 1.35; }
.ocm-a { margin: 0.7em 0 0; line-height: 1.45; }
.ocm-a span { transition: opacity .35s ease var(--w); }
.ocm-chart { margin: 0.8em 0 0; padding: 0.7em 0.7em 0.5em; border-radius: 0.8em; background: rgba(6,11,26,0.55); border: 1px solid var(--line); }
.ocm-bars { display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.6em; }
.ocm-col { display: flex; flex-direction: column; align-items: center; min-width: 0; }
.ocm-v { font-size: 0.8em; line-height: 1.3; color: var(--tx3); }
.ocm-track { display: flex; align-items: flex-end; justify-content: center; width: 100%; height: 4.6em; margin-top: 0.2em; }
.ocm-bar-fill { display: block; width: 100%; max-width: 2em; border-radius: 0.35em 0.35em 0.15em 0.15em; background: rgba(143,176,255,0.35);
  transform-origin: bottom; transition: transform .8s cubic-bezier(.2,.7,.2,1) var(--b); }
.ocm-bar-fill[data-top] { background: var(--blue); }
.ocm-d { margin-top: 0.35em; font-family: var(--font-mono); font-size: 0.78em; color: var(--tx3); }

.ocm-appr-list { margin: 0.7em 0 0; padding: 0; list-style: none; display: grid; gap: 0.6em; }
.ocm-appr { padding: 0.75em 0.9em; border-radius: 0.8em; background: rgba(6,11,26,0.5); border: 1px solid var(--line); transition: border-color .3s, background-color .3s; }
.ocm-appr[data-state="approved"] { border-color: rgba(74,222,128,0.38); background: rgba(74,222,128,0.07); }
.ocm-appr[data-state="editing"] { border-color: rgba(143,176,255,0.5); }
.ocm-appr-top { display: flex; align-items: center; gap: 0.7em; min-width: 0; }
.ocm-chip { font-family: var(--font-mono); font-size: 0.8em; color: var(--sky); background: rgba(77,124,255,0.16); border-radius: 999px; padding: 0.2em 0.65em; flex: none; }
.ocm-appr-title { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ocm-draft { margin: 0.4em 0 0; font-size: 0.95em; line-height: 1.4; color: var(--tx2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ocm-appr[data-state="editing"] .ocm-draft { outline: 1px dashed rgba(143,176,255,0.5); outline-offset: 0.25em; border-radius: 0.25em; }
.ocm-actions { margin-top: 0.55em; display: flex; gap: 0.5em; min-height: 2.5em; align-items: center; }
.ocm-btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.4em; min-height: max(2.5em, 24px); padding: 0 1em; border-radius: 999px;
  border: 1px solid var(--line2); background: transparent; color: var(--tx); font: inherit; font-size: 0.95em; font-weight: 500; cursor: pointer;
  transition: background-color .2s, border-color .2s, transform .15s; }
.ocm-btn:hover { background: rgba(255,255,255,0.07); }
.ocm-btn:active { transform: scale(0.96); }
.ocm-btn:focus-visible { outline: 2px solid var(--sky); outline-offset: 2px; }
.ocm-btn-go { background: var(--blue); border-color: var(--blue); color: #fff; }
.ocm-btn-go:hover { background: #3E6AE8; }
.ocm-done { display: inline-flex; align-items: center; gap: 0.4em; color: var(--ok); animation: ocm-in .4s ease; }
.ocm-foot { margin: 0.6em 0 0; font-family: var(--font-serif); font-style: italic; color: var(--tx2); }

/* Entrance: held back until the stage is seen (OpsCommandStage sets the flags). */
.ocs[data-armed]:not([data-seen]) .ocm-card { opacity: 0; transform: translate3d(0, 1em, 0); }
.ocs[data-armed]:not([data-seen]) .ocm-a span { opacity: 0; }
.ocs[data-armed]:not([data-seen]) .ocm-bar-fill { transform: scaleY(0); }

/* Phones and small tablets: the laptop keeps the whole screen as a picture and
   marks the panel that is shown, zoomed, under it (OpsCommandStage). */
@container ocs (max-width: 899px) {
  .ocm[data-variant="screen"] .ocm-card { transition: opacity .4s ease, box-shadow .4s ease; }
  .ocm[data-variant="screen"] .ocm-card:not([data-on]) { opacity: 0.4; }
  .ocm[data-variant="screen"] .ocm-card[data-on] { box-shadow: 0 0 0 2px #8FB0FF, 0 0 24px rgba(143,176,255,0.45); }
}

/* The zoomed panel: real phone type sizes, body 15px, nothing under 13px. */
.ocm[data-variant="zoom"] { position: relative; inset: auto; height: 100%; font-size: 15px; line-height: 1.45; background: transparent; }
.ocm[data-variant="zoom"] .ocm-bar { display: none; }
.ocm[data-variant="zoom"] .ocm-grid { display: block; position: relative; padding: 0; height: 100%; }
.ocm[data-variant="zoom"] .ocm-card { position: absolute; inset: 0; padding: 16px 18px; border-radius: 18px; display: none; transition: none; }
.ocm[data-variant="zoom"] .ocm-card[data-on] { display: block; animation: ocm-swap .45s cubic-bezier(.2,.7,.2,1); }
.ocm[data-variant="zoom"] .ocm-h { font-size: 13px; }
.ocm[data-variant="zoom"] :is(.ocm-k, .ocm-chip, .ocm-v, .ocm-d, .ocm-time) { font-size: 13px; }
.ocm[data-variant="zoom"] .ocm-greet { font-size: 16px; margin-top: 10px; }
.ocm[data-variant="zoom"] .ocm-brief-list li { padding: 9px 0; }
.ocm[data-variant="zoom"] .ocm-num { font-size: 20px; }
.ocm[data-variant="zoom"] .ocm-next { font-size: 15px; }
.ocm[data-variant="zoom"] .ocm-agent { height: 50px; grid-template-columns: auto 6.2em minmax(0,1fr) 3ch; gap: 10px; }
.ocm[data-variant="zoom"] .ocm-agent-task { font-size: 14px; color: var(--tx2); }
.ocm[data-variant="zoom"] .ocm-a { font-size: 15px; }
.ocm[data-variant="zoom"] .ocm-track { height: 64px; }
.ocm[data-variant="zoom"] .ocm-bars { gap: 6px; }
.ocm[data-variant="zoom"] .ocm-appr-list { gap: 10px; }
.ocm[data-variant="zoom"] .ocm-draft { white-space: normal; font-size: 15px; }
.ocm[data-variant="zoom"] .ocm-btn { min-height: 44px; font-size: 15px; }
/* phones: the small laptop picture is a preview; its buttons are not tap targets (the zoomed panel below has the real ones) */
@media (max-width: 767px) { .ocm:not([data-variant="zoom"]) .ocm-btn { pointer-events: none; } }
.ocm[data-variant="zoom"] .ocm-actions { min-height: 44px; }
.ocm[data-variant="zoom"] .ocm-foot { font-size: 15px; }
@keyframes ocm-swap { from { opacity: 0; transform: translate3d(0, 0.6em, 0); } to { opacity: 1; transform: none; } }

@media (prefers-reduced-motion: reduce) {
  .ocm-card, .ocm-a span, .ocm-bar-fill, .ocm-btn, .ocm-agent { transition: none; }
  .ocs[data-armed]:not([data-seen]) .ocm-card, .ocs[data-armed]:not([data-seen]) .ocm-a span { opacity: 1; transform: none; }
  .ocs[data-armed]:not([data-seen]) .ocm-bar-fill { transform: none; }
  .ocm-pulse::after, .ocm-count span, .ocm-agent-task span, .ocm-done, .ocm-card[data-on] { animation: none; }
  .ocm[data-variant="screen"] .ocm-card { transition: none; }
}
`;
