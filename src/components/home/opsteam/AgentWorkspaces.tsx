"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { SAMPLE_WORKSPACES, type SampleWorkspace } from "./opsData";

/**
 * Three agent workspaces, each on its own small screen. While on screen each
 * one runs its own loop: something arrives, the agent writes (typed out), the
 * cursor clicks Send or Save, and the job lands in its activity feed and ticks
 * the command centre on the laptop. Reduced motion: a still frame with the
 * draft written out and the feed filled. Fixed heights throughout (CLS 0).
 */

type Phase = "read" | "write" | "send" | "done";
type FeedItem = { id: number; text: string };

const PHASE_LABEL: Record<Phase, string> = { read: "Reading", write: "Writing", send: "Sending", done: "Done" };

export function AgentWorkspaces({ active, reduce, onDone }: { active: boolean; reduce: boolean; onDone: (agent: number) => void }) {
  return (
    <ul className="ows-row" aria-label="Agent workspaces, sample" tabIndex={0}>
      <style>{CSS}</style>
      {SAMPLE_WORKSPACES.map((w, i) => (
        <Workspace key={w.name} ws={w} index={i} active={active && !reduce} onDone={onDone} />
      ))}
    </ul>
  );
}

function Workspace({ ws, index, active, onDone }: { ws: SampleWorkspace; index: number; active: boolean; onDone: (agent: number) => void }) {
  const steps = ws.steps;
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("write");
  const [chars, setChars] = useState(steps[0].compose.length);
  const [feed, setFeed] = useState<FeedItem[]>(() => [
    { id: -1, text: steps[2].done },
    { id: -2, text: steps[1].done },
  ]);
  const stepRef = useRef(0);
  const idRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    let stopped = false;
    const timers = new Set<number>();
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const t = window.setTimeout(() => {
          timers.delete(t);
          resolve();
        }, ms);
        timers.add(t);
      });

    (async () => {
      // Stagger the three so they never move in lockstep.
      await wait(400 + index * 1300);
      while (!stopped) {
        const s = stepRef.current;
        const text = steps[s].compose;
        setStep(s);
        setChars(0);
        setPhase("read");
        await wait(1100);
        if (stopped) return;
        setPhase("write");
        for (let c = 2; c < text.length; c += 2) {
          setChars(c);
          await wait(34);
          if (stopped) return;
        }
        setChars(text.length);
        await wait(450);
        if (stopped) return;
        setPhase("send");
        await wait(750);
        if (stopped) return;
        setPhase("done");
        idRef.current += 1;
        const id = idRef.current;
        setFeed((f) => [{ id, text: steps[s].done }, ...f].slice(0, 3));
        onDone(ws.agent);
        await wait(1700);
        stepRef.current = (s + 1) % steps.length;
      }
    })();

    return () => {
      stopped = true;
      timers.forEach((t) => window.clearTimeout(t));
      timers.clear();
    };
  }, [active, index, steps, ws.agent, onDone]);

  const cur = steps[step];
  const typed = cur.compose.slice(0, chars);

  return (
    <li className="ows ix-card" data-phase={active ? phase : "still"} data-reveal="" style={{ ["--reveal-delay" as string]: `${index * 0.08}s` }}>
      <div className="ows-screen">
        <div className="ows-bar">
          <span className="ows-dots" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span className="ows-name">{ws.name}</span>
          <span className="ows-status">
            <span className="ows-dot" aria-hidden />
            <span key={active ? phase : "still"} className="ows-status-t">
              {active ? PHASE_LABEL[phase] : "Working"}
            </span>
          </span>
        </div>
        <div className="ows-body">
          <p className="ows-job">
            {ws.job} <span className="ows-sample">Sample</span>
          </p>
          <div className="ows-in" key={`in-${step}`}>
            <span className="ows-from">{cur.from}</span>
            <span className="ows-ctx">{cur.context}</span>
          </div>
          <div className="ows-compose">
            <p className="ows-text">
              {typed}
              <span className="ows-caret" aria-hidden />
            </p>
            <span className="ows-send" aria-hidden>
              {cur.button}
            </span>
            <span className="ows-cursor" aria-hidden>
              <svg viewBox="0 0 16 20" width="16" height="20">
                <path d="M1 1 L1 16 L5 12.5 L8 19 L10.6 17.8 L7.7 11.5 L13 11.5 Z" fill="#fff" stroke="#060B1A" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
          <p className="ows-feed-h">Activity</p>
          <ul className="ows-feed" aria-live="off">
            {feed.map((f, i) => (
              <li key={f.id} data-new={i === 0 && f.id > 0 ? "" : undefined}>
                <Check aria-hidden />
                <span className="ows-feed-t">{f.text}</span>
                <span className="ows-feed-w">{i === 0 && f.id > 0 ? "Now" : "Earlier"}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <span className="ows-neck" aria-hidden />
      <span className="ows-foot" aria-hidden />
    </li>
  );
}

const CSS = `
.ows-row { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
.ows-row:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 6px; border-radius: 16px; }
@media (max-width: 899px) {
  .ows-row { display: flex; gap: 12px; overflow-x: auto; overscroll-behavior-x: contain; scroll-snap-type: x mandatory;
    margin: 0 -1.25rem; padding: 6px 1.25rem 18px; scroll-padding-inline: 1.25rem; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
  .ows-row::-webkit-scrollbar { display: none; }
  .ows-row > .ows { flex: 0 0 min(82%, 340px); scroll-snap-align: start; }
}
@media (min-width: 768px) and (max-width: 899px) { .ows-row { margin: 0 -2.5rem; padding-inline: 2.5rem; scroll-padding-inline: 2.5rem; } }

.ows { --tx: #F2F5FC; --tx2: rgba(234,240,255,0.76); --tx3: rgba(234,240,255,0.58); --line: rgba(255,255,255,0.08); --blue: #4D7CFF; --sky: #8FB0FF; --ok: #4ADE80;
  display: flex; flex-direction: column; align-items: center; min-width: 0; border-radius: 16px; color: var(--tx); }
.ows-screen { width: 100%; height: 360px; padding: 7px; border-radius: 16px; background: #0B0C10;
  box-shadow: 0 0 0 1.5px #9EA4AF, 0 0 0 2.5px #5B616C, 0 30px 60px -30px rgba(77,124,255,0.35); display: flex; flex-direction: column; overflow: hidden; }
.ows-bar { flex: none; display: flex; align-items: center; gap: 8px; height: 34px; padding: 0 12px; border-radius: 10px 10px 0 0;
  background: #0E1A3A; border-bottom: 1px solid var(--line); font-size: 0.8125rem; }
.ows-dots { display: inline-flex; gap: 5px; }
.ows-dots i { width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,0.16); }
.ows-name { font-weight: 600; letter-spacing: -0.01em; }
.ows-status { margin-left: auto; display: inline-flex; align-items: center; gap: 7px; font-family: var(--font-mono); font-size: 0.6875rem; color: var(--tx2); }
.ows-status-t { display: inline-block; min-width: 7ch; animation: ows-fade .35s ease; }
.ows-dot { position: relative; width: 7px; height: 7px; border-radius: 50%; background: var(--ok); }
.ows-dot::after { content: ""; position: absolute; inset: 0; border-radius: 50%; background: var(--ok); opacity: 0; }
.ows[data-phase="write"] .ows-dot::after, .ows[data-phase="send"] .ows-dot::after { animation: ows-ping 1.4s cubic-bezier(.2,.7,.2,1) infinite; }
.ows[data-phase="read"] .ows-dot { background: var(--sky); }
.ows-body { flex: 1; min-height: 0; display: flex; flex-direction: column; padding: 12px; border-radius: 0 0 10px 10px;
  background: radial-gradient(120% 70% at 100% 0%, #13203F 0%, #0A1226 60%); }
.ows-job { margin: 0; display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 0.75rem; color: var(--tx3); }
.ows-sample { font-family: var(--font-mono); font-size: 0.625rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--sky);
  border: 1px solid rgba(143,176,255,0.35); border-radius: 999px; padding: 1px 7px; }
.ows-in { flex: none; margin-top: 10px; height: 54px; padding: 8px 10px; border-radius: 10px; background: rgba(6,11,26,0.6); border: 1px solid var(--line);
  display: flex; flex-direction: column; gap: 2px; overflow: hidden; animation: ows-rise .45s cubic-bezier(.2,.7,.2,1); }
.ows-from { display: block; line-height: 14px; font-family: var(--font-mono); font-size: 0.625rem; letter-spacing: 0.05em; text-transform: uppercase; color: var(--sky); }
.ows-ctx { display: block; font-size: 0.8125rem; line-height: 18px; color: var(--tx); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ows-compose { flex: none; position: relative; margin-top: 8px; height: 74px; padding: 8px 10px; border-radius: 10px; border: 1px solid rgba(143,176,255,0.28);
  background: rgba(77,124,255,0.07); display: flex; align-items: flex-end; gap: 8px; }
.ows[data-phase="read"] .ows-compose { border-color: var(--line); background: rgba(6,11,26,0.4); }
.ows-text { flex: 1; align-self: stretch; margin: 0; font-size: 0.8125rem; line-height: 1.4; color: var(--tx); overflow: hidden;
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; }
.ows-caret { display: inline-block; width: 1.5px; height: 1em; margin-left: 1px; vertical-align: -0.15em; background: var(--sky); opacity: 0; }
.ows[data-phase="write"] .ows-caret { opacity: 1; animation: ows-blink 1s steps(1) infinite; }
.ows-send { flex: none; display: inline-flex; align-items: center; height: 26px; padding: 0 11px; border-radius: 999px; background: var(--blue); color: #fff;
  font-size: 0.75rem; font-weight: 600; transition: opacity .3s ease; }
.ows[data-phase="read"] .ows-send { opacity: 0.45; }
.ows[data-phase="send"] .ows-send { animation: ows-press .75s ease; }
.ows[data-phase="done"] .ows-send { background: rgba(74,222,128,0.18); color: var(--ok); }
.ows-cursor { position: absolute; right: 20px; bottom: 0; width: 16px; height: 20px; pointer-events: none; opacity: 0;
  transform: translate3d(-90px, 14px, 0); transition: transform .55s cubic-bezier(.45,.05,.25,1), opacity .25s ease;
  filter: drop-shadow(0 2px 3px rgba(0,0,0,0.5)); }
.ows[data-phase="read"] .ows-cursor { opacity: 1; transform: translate3d(-150px, -34px, 0); }
.ows[data-phase="send"] .ows-cursor { opacity: 1; transform: none; }
.ows-feed-h { margin: 12px 0 0; font-family: var(--font-mono); font-size: 0.625rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--tx3); }
.ows-feed { flex: none; list-style: none; margin: 6px 0 0; padding: 0; display: grid; gap: 0; align-content: start; height: 96px; overflow: hidden; }
.ows-feed li { display: grid; grid-template-columns: 14px minmax(0, 1fr) auto; align-items: center; gap: 8px; height: 32px; border-top: 1px solid var(--line); font-size: 0.75rem; color: var(--tx2); }
.ows-feed li:first-child { border-top: 0; }
.ows-feed svg { width: 13px; height: 13px; color: var(--ok); }
.ows-feed-t { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ows-feed-w { font-family: var(--font-mono); font-size: 0.625rem; color: var(--tx3); }
.ows-feed li[data-new] { color: var(--tx); animation: ows-rise .5s cubic-bezier(.2,.7,.2,1); }
.ows-feed li[data-new] .ows-feed-w { color: var(--ok); }
.ows-neck { width: 18%; height: 18px; background: linear-gradient(180deg, #7E838D, #C9CCD3 40%, #9EA3AD); clip-path: polygon(8% 0, 92% 0, 100% 100%, 0 100%); }
.ows-foot { width: 42%; height: 6px; border-radius: 3px 3px 6px 6px; background: linear-gradient(180deg, #EEF0F3, #A9AEB7); box-shadow: 0 8px 14px -4px rgba(0,0,0,0.6); }

@keyframes ows-ping { 0% { transform: scale(1); opacity: 0.55; } 80%, 100% { transform: scale(2.8); opacity: 0; } }
@keyframes ows-blink { 50% { opacity: 0; } }
@keyframes ows-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes ows-rise { from { opacity: 0; transform: translate3d(0, 6px, 0); } to { opacity: 1; transform: none; } }
@keyframes ows-press { 0%, 60% { transform: none; } 75% { transform: scale(0.9); } 100% { transform: none; } }

@media (prefers-reduced-motion: reduce) {
  .ows-cursor { display: none; }
  .ows-in, .ows-feed li[data-new], .ows-status-t, .ows[data-phase] .ows-dot::after, .ows[data-phase] .ows-caret, .ows[data-phase] .ows-send { animation: none; }
}
`;
