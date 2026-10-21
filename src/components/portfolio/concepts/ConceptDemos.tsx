"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Bot, CalendarCheck, Check, PackageCheck, RotateCcw, UserRound } from "lucide-react";
import { CONCEPT_DEMOS, type ConceptDemo } from "./conceptData";

/**
 * "Ideas we built to show what is possible": four concept demos, one per
 * niche, behind a tab selector. Each plays a short conversation at a calm
 * pace while its card moves across a small pipeline, then shows the outcome.
 * Everything is made up and labelled Concept. Only opacity and transform
 * animate; every message is in the layout from the start (just invisible), so
 * nothing shifts. Plays when the panel is on screen; reduced motion shows the
 * finished state.
 */

const CSS = `
.cd { position: relative; isolation: isolate; overflow: hidden; }
.cd-glow { position: absolute; z-index: -1; left: 50%; top: -260px; width: 1100px; height: 700px; margin-left: -550px; border-radius: 999px; pointer-events: none;
  background: radial-gradient(closest-side, rgba(77,124,255,0.2), rgba(77,124,255,0) 70%); }
.cd-tabs { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-top: 40px; }
@media (min-width: 1024px) { .cd-tabs { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin-top: 56px; } }
.cd-tab { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; min-height: 96px; padding: 14px 14px 16px; border-radius: 18px; text-align: left; cursor: pointer;
  background: #0A1226; color: #F2F5FC; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.09); outline: none; }
@media (min-width: 1024px) { .cd-tab { min-height: 128px; padding: 20px 20px 22px; } }
.cd-tab:focus-visible { box-shadow: 0 0 0 2px #8FB0FF; }
.cd-tab[aria-selected="true"] { background: #13203F; box-shadow: inset 0 0 0 1px rgba(143,176,255,0.55), 0 20px 50px -28px rgba(77,124,255,0.7); }
.cd-tab-n { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.04em; color: #8FB0FF; font-variant-numeric: tabular-nums; }
.cd-tab-niche { font-family: var(--font-display); font-weight: 600; font-size: 1rem; line-height: 1.2; letter-spacing: -0.015em; }
@media (min-width: 1024px) { .cd-tab-niche { font-size: 1.1875rem; } }
.cd-tab-biz { margin-top: auto; font-size: 12.5px; color: rgba(234,240,255,0.6); }
.cd-tab-bar { display: block; width: 100%; height: 2px; margin-top: 10px; border-radius: 2px; background: rgba(255,255,255,0.08); overflow: hidden; }
.cd-tab-bar i { display: block; height: 100%; width: 100%; background: #4D7CFF; transform-origin: 0 50%; transform: scaleX(0); }
.cd-tab[aria-selected="true"] .cd-tab-bar i { transform: scaleX(var(--prog, 0)); transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1); }

.cd-panel { position: relative; margin-top: 16px; border-radius: 24px; padding: 14px; background: #0A1226; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08), 0 40px 80px -50px rgba(0,0,0,0.9); }
@media (min-width: 1024px) { .cd-panel { margin-top: 20px; padding: 28px; border-radius: 28px; } }
.cd-panel::before { content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  background: radial-gradient(70% 60% at 100% 0%, rgba(77,124,255,0.18), transparent 70%); }
.cd-panel.is-warm::before { background: radial-gradient(70% 60% at 100% 0%, rgba(214,170,98,0.2), transparent 70%); }
.cd-top { position: relative; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px 16px; }
.cd-label { display: inline-flex; align-items: center; gap: 7px; min-height: 28px; padding: 0 12px; border-radius: 999px; font-size: 12px; font-weight: 600;
  color: #B9CCFF; background: rgba(77,124,255,0.14); box-shadow: inset 0 0 0 1px rgba(143,176,255,0.3); }
.cd-label i { width: 6px; height: 6px; border-radius: 999px; background: #8FB0FF; }
.cd-biz { font-size: 13px; color: rgba(234,240,255,0.6); }
.cd-biz b { color: #F2F5FC; font-weight: 600; }
.cd-replay { display: inline-flex; align-items: center; gap: 6px; min-height: 40px; padding: 0 14px; border-radius: 999px; font-size: 13px; font-weight: 600; color: #DCE6FF;
  background: rgba(255,255,255,0.04); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.14); transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.2s; }
.cd-replay:hover { background: rgba(255,255,255,0.08); }
.cd-replay:focus-visible { outline: 2px solid #8FB0FF; outline-offset: 2px; }
.cd-replay:active { transform: scale(0.97); }
.cd-replay svg { transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
@media (hover: hover) { .cd-replay:hover svg { transform: rotate(-120deg); } }

.cd-grid { position: relative; display: grid; gap: 14px; margin-top: 14px; }
@media (min-width: 1024px) { .cd-grid { grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr); gap: 24px; margin-top: 22px; } }

/* chat */
.cd-chat { display: flex; flex-direction: column; min-width: 0; border-radius: 18px; overflow: hidden; background: #0B1328; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.07); }
.cd-chat-h { display: flex; align-items: center; gap: 10px; padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,0.07); }
.cd-av { display: grid; place-items: center; width: 32px; height: 32px; flex-shrink: 0; border-radius: 999px; background: #1D3F8F; color: #DCE6FF; }
.cd-chat-n { display: block; font-weight: 600; font-size: 14px; line-height: 1.2; color: #F2F5FC; }
.cd-chat-s { display: block; font-size: 11.5px; line-height: 1.2; color: #7FD1A8; }
.cd-chan { margin-left: auto; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.04em; color: rgba(234,240,255,0.55); }
.cd-msgs { list-style: none; margin: 0; padding: 14px 12px 16px; display: flex; flex-direction: column; gap: 8px; min-height: 300px; font-size: 13.5px; line-height: 1.45; }
@media (min-width: 1024px) { .cd-msgs { min-height: 360px; padding: 18px 16px 20px; font-size: 14.5px; gap: 10px; } }
.cd-m { position: relative; max-width: 86%; }
.cd-m.is-them { align-self: flex-start; }
.cd-m.is-us { align-self: flex-end; }
.cd-bub { display: block; padding: 9px 12px; border-radius: 15px; color: #E9EDEF; opacity: 0; transform: translate3d(0, 10px, 0) scale(0.98);
  transition: opacity 0.55s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
.cd-m.is-them .cd-bub { background: #1A2440; border-top-left-radius: 5px; transform-origin: 0 0; }
.cd-m.is-us .cd-bub { background: #1D3F8F; border-top-right-radius: 5px; transform-origin: 100% 0; }
.cd-m.is-on .cd-bub { opacity: 1; transform: none; }
.cd-t { display: block; margin-top: 3px; font-size: 10.5px; color: #8b93a3; font-variant-numeric: tabular-nums; }
.cd-m.is-us .cd-t { color: #A9BBEA; }
.cd-dots { position: absolute; top: 0; right: 0; display: inline-flex; gap: 4px; padding: 11px 13px; border-radius: 15px; border-top-right-radius: 5px; background: #1D3F8F;
  opacity: 0; transform: scale(0.9); transform-origin: 100% 0; transition: opacity 0.3s ease, transform 0.3s ease; }
.cd-dots i { width: 6px; height: 6px; border-radius: 999px; background: #DCE6FF; animation: cd-dot 1.1s ease-in-out infinite; }
.cd-dots i:nth-child(2) { animation-delay: 0.15s; }
.cd-dots i:nth-child(3) { animation-delay: 0.3s; }
.cd-m.is-typing .cd-dots { opacity: 1; transform: none; }
@keyframes cd-dot { 0%, 60%, 100% { opacity: 0.35; transform: translate3d(0, 0, 0); } 30% { opacity: 1; transform: translate3d(0, -3px, 0); } }

/* pipeline */
.cd-side { display: flex; flex-direction: column; gap: 14px; min-width: 0; }
.cd-board { border-radius: 18px; padding: 12px; background: #0B1328; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.07); }
@media (min-width: 1024px) { .cd-board { padding: 16px; } }
.cd-board-h { display: flex; align-items: center; justify-content: space-between; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.04em; color: rgba(234,240,255,0.55); }
.cd-cols { position: relative; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-top: 12px; }
@media (min-width: 1024px) { .cd-cols { gap: 10px; } }
.cd-col { min-width: 0; border-radius: 12px; padding: 8px; background: rgba(255,255,255,0.025); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05); }
.cd-col-h { display: block; min-height: 30px; font-size: 11px; font-weight: 600; line-height: 1.25; color: rgba(234,240,255,0.72); }
@media (min-width: 1024px) { .cd-col-h { font-size: 12px; min-height: 18px; } }
.cd-slot { height: 74px; margin-top: 8px; border-radius: 10px; box-shadow: inset 0 0 0 1px rgba(143,176,255,0); transition: box-shadow 0.5s ease; }
.cd-slot.is-target { box-shadow: inset 0 0 0 1px rgba(143,176,255,0.28); }
.cd-ghost { margin-top: 6px; padding: 8px; border-radius: 9px; font-size: 11px; line-height: 1.3; color: rgba(234,240,255,0.42); background: rgba(255,255,255,0.03); box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05); }
.cd-lane { position: absolute; left: 0; right: 0; top: 46px; height: 74px; pointer-events: none; }
@media (min-width: 1024px) { .cd-lane { top: 34px; } }
.cd-live { position: absolute; left: 8px; top: 0; width: calc((100% - 16px) / 3 - 16px); height: 74px; padding: 8px 9px; border-radius: 10px;
  background: #13203F; box-shadow: inset 0 0 0 1px rgba(143,176,255,0.5), 0 14px 30px -12px rgba(77,124,255,0.55);
  opacity: 0; transform: translate3d(calc(var(--col, 0) * (100% + 16px + 8px)), 8px, 0) scale(0.96);
  transition: transform 0.9s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.5s ease; }
@media (min-width: 1024px) { .cd-live { width: calc((100% - 20px) / 3 - 16px); transform: translate3d(calc(var(--col, 0) * (100% + 16px + 10px)), 8px, 0) scale(0.96); } }
.cd-live.is-on { opacity: 1; transform: translate3d(calc(var(--col, 0) * (100% + 16px + 8px)), 0, 0); }
@media (min-width: 1024px) { .cd-live.is-on { transform: translate3d(calc(var(--col, 0) * (100% + 16px + 10px)), 0, 0); } }
.cd-live b { display: block; font-size: 11.5px; line-height: 1.25; color: #F2F5FC; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cd-live small { display: block; margin-top: 2px; font-size: 10.5px; line-height: 1.25; color: rgba(234,240,255,0.6); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cd-live em { position: absolute; left: 9px; bottom: 7px; display: inline-flex; align-items: center; gap: 4px; font-style: normal; font-size: 10px; font-weight: 600; color: #8FB0FF; white-space: nowrap; }
.cd-live em.is-done { color: #7FD1A8; }
.cd-live em .cd-s { display: none; }
@media (max-width: 1023.98px) { .cd-live em .cd-l { display: none; } .cd-live em .cd-s { display: inline; } }
@media (max-width: 1023.98px) { .cd-live b { white-space: normal; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; } .cd-live small { display: none; } }
@media (min-width: 1024px) { .cd-live b { font-size: 12.5px; } .cd-live small { font-size: 11px; } }

/* outcome */
.cd-out { position: relative; display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 14px; align-items: start; padding: 16px; border-radius: 18px;
  background: linear-gradient(160deg, rgba(31,107,71,0.22), rgba(31,107,71,0.06)); box-shadow: inset 0 0 0 1px rgba(127,209,168,0.3);
  opacity: 0; transform: translate3d(0, 14px, 0); transition: opacity 0.6s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
.cd-out.is-on { opacity: 1; transform: none; }
@media (min-width: 1024px) { .cd-out { padding: 20px 22px; } }
.cd-out-ic { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 12px; background: rgba(127,209,168,0.16); color: #7FD1A8; }
.cd-out-t { font-family: var(--font-display); font-weight: 600; font-size: 1.25rem; letter-spacing: -0.02em; line-height: 1.2; color: #F2F5FC; }
.cd-out ul { list-style: none; margin: 8px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; }
.cd-out li { display: inline-flex; align-items: center; gap: 5px; min-height: 26px; padding: 0 10px; border-radius: 999px; font-size: 12px; color: #DDF3E8; background: rgba(127,209,168,0.1); box-shadow: inset 0 0 0 1px rgba(127,209,168,0.22); }
.cd-out p { margin-top: 10px; font-size: 12.5px; color: rgba(234,240,255,0.6); }
.cd-note { margin-top: 18px; font-family: var(--font-serif); font-style: italic; font-size: 0.9375rem; color: rgba(234,240,255,0.6); }

@media (prefers-reduced-motion: reduce) {
  .cd-bub, .cd-dots, .cd-live, .cd-out, .cd-slot, .cd-replay, .cd-replay svg, .cd-tab-bar i { transition: none !important; }
  .cd-dots i { animation: none; }
}
`;

/** When each step lands, in ms from the start. Steps 1 to 4 are messages, 5 the outcome. */
const TIMELINE: { at: number; step: number; typing: boolean }[] = [
  { at: 400, step: 1, typing: false },
  { at: 1500, step: 1, typing: true },
  { at: 3000, step: 2, typing: false },
  { at: 4700, step: 3, typing: false },
  { at: 5800, step: 3, typing: true },
  { at: 7400, step: 4, typing: false },
  { at: 8600, step: 5, typing: false },
];

const DONE = 5;

function cardStatus(d: ConceptDemo, step: number) {
  if (step >= 4) return { text: d.outcome.title, done: true };
  if (step >= 2) return { text: "Answered", done: false };
  return { text: "New", done: false };
}

export function ConceptDemos() {
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(DONE);
  const [typing, setTyping] = useState(false);
  const [run, setRun] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers: number[] = [];
    let played = false;
    const play = () => {
      played = true;
      setStep(0);
      setTyping(false);
      for (const t of TIMELINE) {
        timers.push(
          window.setTimeout(() => {
            setStep(t.step);
            setTyping(t.typing);
          }, t.at),
        );
      }
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (played) return;
        if (e.isIntersecting) {
          play();
          io.disconnect();
        } else {
          // off screen: hold at the start so it plays from the top when it arrives
          setStep(0);
          setTyping(false);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [active, run]);

  const pick = (i: number) => {
    if (i === active) {
      setRun((r) => r + 1);
      return;
    }
    setActive(i);
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = CONCEPT_DEMOS.length;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  const d = CONCEPT_DEMOS[active];
  const col = step >= 1 ? d.moves[Math.min(step, 4) - 1] : 0;
  const status = cardStatus(d, step);
  const OutIcon = d.id === "wholesale" ? PackageCheck : CalendarCheck;

  return (
    <section id="concepts" className="cd band-night chapter-pad" aria-labelledby="concepts-title">
      <style>{CSS}</style>
      <span className="cd-glow" aria-hidden />
      <div className="container-wide">
        <div className="max-w-3xl" data-reveal="">
          <p className="eyebrow">
            <span className="chap-n">Concepts</span>
          </p>
          <h2 id="concepts-title" className="h2 mt-4">
            Ideas we built to show what is possible
          </h2>
          <p className="lead mt-6">Made-up businesses in four fields where one answered enquiry matters most. Pick one and watch it run.</p>
        </div>

        <div className="cd-tabs" role="tablist" aria-label="Concept demos">
          {CONCEPT_DEMOS.map((c, i) => (
            <button
              key={c.id}
              ref={(b) => {
                tabs.current[i] = b;
              }}
              type="button"
              role="tab"
              id={`cd-tab-${c.id}`}
              aria-selected={i === active}
              aria-controls="cd-panel"
              tabIndex={i === active ? 0 : -1}
              className="cd-tab ix-card"
              onClick={() => pick(i)}
              onKeyDown={(e) => onKey(e, i)}
              style={i === active ? ({ "--prog": step / DONE } as CSSProperties) : undefined}
            >
              <span className="cd-tab-n">{String(i + 1).padStart(2, "0")}</span>
              <span className="cd-tab-niche">{c.niche}</span>
              <span className="cd-tab-biz">{c.business}</span>
              <span className="cd-tab-bar" aria-hidden>
                <i />
              </span>
            </button>
          ))}
        </div>

        <div
          ref={panel}
          id="cd-panel"
          role="tabpanel"
          aria-labelledby={`cd-tab-${d.id}`}
          className={`cd-panel ix-card ${d.warm ? "is-warm" : ""}`}
        >
          <div className="cd-top">
            <span className="cd-label">
              <i aria-hidden />
              Concept: built by Verdance to show what is possible
            </span>
            <span className="cd-biz">
              <b>{d.business}</b>, {d.kind.toLowerCase()}. Made up.
            </span>
            <button type="button" className="cd-replay" onClick={() => setRun((r) => r + 1)}>
              <RotateCcw size={14} aria-hidden />
              Replay
            </button>
          </div>

          <p className="sr-only">{d.blurb}</p>

          <div className="cd-grid">
            <div className="cd-chat">
              <div className="cd-chat-h">
                <span className="cd-av" aria-hidden>
                  <Bot size={16} />
                </span>
                <span className="min-w-0">
                  <span className="cd-chat-n">{d.business}</span>
                  <span className="cd-chat-s">Online, day and night</span>
                </span>
                <span className="cd-chan">{d.channel}</span>
              </div>
              <ol className="cd-msgs" aria-label="Sample conversation">
                {d.messages.map((m, i) => {
                  const on = step >= i + 1;
                  const isTyping = typing && !on && step === i && m.from === "us";
                  return (
                    <li key={`${d.id}-${i}`} className={`cd-m ${m.from === "us" ? "is-us" : "is-them"} ${on ? "is-on" : ""} ${isTyping ? "is-typing" : ""}`}>
                      <span className="sr-only">{m.from === "us" ? "Assistant: " : "Customer: "}</span>
                      <span className="cd-bub">
                        {m.text}
                        <span className="cd-t">{m.time}</span>
                      </span>
                      {m.from === "us" ? (
                        <span className="cd-dots" aria-hidden>
                          <i />
                          <i />
                          <i />
                        </span>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="cd-side">
              <div className="cd-board" aria-label="Sample pipeline">
                <div className="cd-board-h">
                  <span>Pipeline</span>
                  <span>Sample</span>
                </div>
                <div className="cd-cols">
                  {d.columns.map((name, ci) => (
                    <div key={name} className="cd-col">
                      <span className="cd-col-h">{name}</span>
                      <div className={`cd-slot ${step >= 1 && col === ci ? "is-target" : ""}`} aria-hidden />
                      {d.ghosts[ci].map((g) => (
                        <div key={g} className="cd-ghost" aria-hidden>
                          {g}
                        </div>
                      ))}
                    </div>
                  ))}
                  <div className="cd-lane" aria-hidden>
                    <div className={`cd-live ${step >= 1 ? "is-on" : ""}`} style={{ "--col": col } as CSSProperties}>
                      <b>{d.card.title}</b>
                      <small>{d.card.sub}</small>
                      <em className={status.done ? "is-done" : ""}>
                        {status.done ? <Check size={11} /> : <UserRound size={11} />}
                        <span className="cd-l">{status.text}</span>
                        <span className="cd-s">{status.done ? "Done" : status.text}</span>
                      </em>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`cd-out ${step >= DONE ? "is-on" : ""}`}>
                <span className="cd-out-ic" aria-hidden>
                  <OutIcon size={20} />
                </span>
                <div className="min-w-0">
                  <p className="cd-out-t" style={{ marginTop: 0 }}>
                    {d.outcome.title}
                  </p>
                  <ul>
                    {d.outcome.lines.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                  <p>{d.outcome.handoff}. A person takes over whenever it matters.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="cd-note">Made-up businesses, names and messages. Each one could run for your business.</p>
      </div>
    </section>
  );
}
