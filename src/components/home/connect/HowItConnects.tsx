"use client";

import { useEffect, useRef, useState, type AnimationEvent, type PointerEvent } from "react";
import { ShieldCheck } from "lucide-react";
import { ConnectDiagram } from "./ConnectDiagram";
import { STEPS } from "./connectData";

/**
 * "How it connects": a four-step flow from your tools, through the Verdance
 * core, to one command centre. Sits after the Operations Team showcase on a
 * band-night ground.
 *
 * Motion story: while the section is on screen the active step advances every
 * 4s and the diagram lights up cumulatively (chips, wires, core, app), with
 * pulses running along lit wires. Off screen everything pauses. Tapping a
 * step jumps to it and restarts the timer. The step cards lift like the
 * other cards (ix-card) and, only on hover or keyboard focus, a light runs
 * the whole way round their border (a conic gradient masked to a 1.5px ring,
 * its angle animated through a registered custom property); a tap on touch
 * runs it once. Reduced motion: no cycling, no pulses, no trace, every part
 * of the diagram lit and every step readable.
 */

const CYCLE_MS = 4000;

/** On touch there is no hover: a tap runs the border trace once. */
function traceOnTouch(e: PointerEvent<HTMLButtonElement>) {
  if (e.pointerType === "mouse") return;
  const el = e.currentTarget;
  el.removeAttribute("data-trace");
  void el.offsetWidth; // restart the one-shot animation on a repeat tap
  el.setAttribute("data-trace", "");
}
function endTrace(e: AnimationEvent<HTMLSpanElement>) {
  const btn = e.currentTarget.parentElement;
  if (btn?.hasAttribute("data-trace")) btn.removeAttribute("data-trace");
}

export function HowItConnects() {
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [live, setLive] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const el = root.current;
    if (!el) return () => mq.removeEventListener("change", sync);
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => {
      io.disconnect();
      mq.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!live || reduce) return;
    const t = window.setTimeout(() => setStep((s) => (s + 1) % STEPS.length), CYCLE_MS);
    return () => window.clearTimeout(t);
  }, [step, live, reduce]);

  const shown = reduce ? STEPS.length - 1 : step;

  return (
    <section
      ref={root}
      className="band-night chapter-pad hic"
      aria-labelledby="hic-title"
      data-live={live && !reduce ? "" : undefined}
    >
      <style>{CSS}</style>
      <div className="container-wide">
        <div className="hic-head" data-reveal="">
          <p className="eyebrow">How it connects</p>
          <h2 id="hic-title" className="h2 mt-4 hic-h">
            Your tools, joined up. <span className="italic-accent">One place to run them.</span>
          </h2>
          <p className="lead mt-6">
            We connect what you already use, add an assistant that knows your business, and give you one app to run it from.
          </p>
        </div>

        <div className="hic-stage">
          <ConnectDiagram step={shown} />
          <p className="museum mt-3">Illustration. Your tools and command centre will match your business.</p>
        </div>

        <ol className="hic-steps" aria-label="How we connect your business, in four steps">
          {STEPS.map((s, i) => {
            const active = !reduce && i === step;
            return (
              <li key={s.n}>
                <button
                  type="button"
                  className="hic-step ix-card"
                  data-active={active ? "" : undefined}
                  aria-current={active ? "step" : undefined}
                  onClick={() => setStep(i)}
                  onPointerDown={traceOnTouch}
                >
                  <span className="hic-trace" aria-hidden onAnimationEnd={endTrace} />
                  <span className="hic-n">{s.n}</span>
                  <span className="hic-t">{s.title}</span>
                  <span className="hic-tech">{s.tech}</span>
                  <span className="hic-gloss">{s.gloss}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <aside className="hic-sec" aria-labelledby="hic-sec-h" data-reveal="">
          <div className="hic-sec-head">
            <ShieldCheck size={18} aria-hidden className="hic-sec-ico" />
            <h3 id="hic-sec-h" className="hic-sec-h">Security</h3>
          </div>
          <ul className="hic-sec-list">
            <li>POPIA built in: consent records, opt-outs and an operator agreement.</li>
            <li>Every action is recorded in an audit log, with who did it and why.</li>
            <li>Your data stays in accounts you own.</li>
            {/* TODO(Daniel): confirm GDPR wording before UK launch; no "no training on your data" claim until confirmed. */}
            <li>For UK clients, GDPR terms on request.</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}

const CSS = `
.hic { overflow-x: clip; }
.hic-h { max-width: 17ch; text-wrap: balance; }
.hic-stage { margin-top: 48px; }
@media (min-width: 1024px) { .hic-stage { margin-top: 72px; } }

/* Diagram */
.hic-dia { position: relative; }
.hic-svg { display: block; width: 100%; height: auto; overflow: visible; }
.hic-svg-wide { display: none; }
.hic-svg-tall { max-width: 460px; margin: 0 auto; }
@media (min-width: 1024px) { .hic-svg-wide { display: block; } .hic-svg-tall { display: none; } }
.hic-svg text { font-family: var(--font-sans, inherit); fill: var(--ink); }

.hic-panel { fill: rgba(10,18,38,0.6); stroke: rgba(255,255,255,0.08); stroke-width: 1; }
.hic-panel-k { font-family: var(--font-mono) !important; font-size: 9.5px; letter-spacing: 0.16em; fill: rgba(143,176,255,0.8) !important; }
.hic-node-b { fill: #0E1730; stroke: rgba(255,255,255,0.11); stroke-width: 1; transition: stroke .5s ease; }
.hic-node-hi { fill: rgba(255,255,255,0.035); }
.hic-node-t { fill: rgba(234,240,255,0.72) !important; font-weight: 500; letter-spacing: -0.005em; }
.hic-chips[data-on] .hic-node-b { stroke: rgba(143,176,255,0.3); }

.hic-wire { fill: none; stroke: rgba(143,176,255,0.12); stroke-width: 1.25; transition: stroke .5s ease; }
.hic-in[data-on] .hic-wire, .hic-out[data-on] .hic-wire { stroke: rgba(143,176,255,0.3); }
.hic-pulse { fill: none; stroke: #BFD2FF; stroke-width: 2.25; stroke-linecap: round; stroke-dasharray: 9 91; stroke-dashoffset: 100; opacity: 0; }
.hic-pulse-out { stroke: #DDE7FF; }

.hic-core-b { stroke: rgba(143,176,255,0.45); stroke-width: 1; }
.hic-core-in { fill: rgba(255,255,255,0.04); }
.hic-core-dot { fill: #8FB0FF; }
.hic-ring { fill: none; stroke: #4D7CFF; stroke-width: 1; opacity: 0; transform-box: fill-box; transform-origin: center; }
.hic-orbit { fill: none; stroke: rgba(143,176,255,0.14); stroke-width: 1; stroke-dasharray: 2 7; transform-box: fill-box; transform-origin: center; }
.hic-orbit-2 { stroke: rgba(143,176,255,0.08); stroke-dasharray: 1 10; }
.hic-halo { opacity: 0.4; transition: opacity .6s ease; }
.hic-core[data-on] .hic-halo { opacity: 1; }
.hic-core-k { font-family: var(--font-mono) !important; font-size: 10px; letter-spacing: 0.16em; fill: #8FB0FF !important; }
.hic-core-t { font-weight: 600; letter-spacing: -0.02em; }
.hic-core-s { font-family: var(--font-mono) !important; font-size: 11px; fill: rgba(234,240,255,0.6) !important; }

.hic-win { fill: #0A1226; stroke: rgba(255,255,255,0.12); stroke-width: 1; }
.hic-phone-b { fill: #13203F; }
.hic-notch { fill: rgba(255,255,255,0.12); }
.hic-dot { fill: rgba(255,255,255,0.16); }
.hic-app-k { font-family: var(--font-mono) !important; font-size: 9px; letter-spacing: 0.16em; fill: rgba(143,176,255,0.75) !important; }
.hic-app-h { font-weight: 600; letter-spacing: -0.01em; }
.hic-rule { stroke: rgba(255,255,255,0.07); stroke-width: 1; }
.hic-row-t { fill: rgba(234,240,255,0.84) !important; }
.hic-led { fill: rgba(143,176,255,0.45); }
.hic-led-hot { fill: #4D7CFF; }
.hic-skel { fill: rgba(255,255,255,0.08); }
.hic-pill { fill: rgba(255,255,255,0.05); stroke: rgba(255,255,255,0.12); stroke-width: 1; }
.hic-pill-hot { fill: rgba(77,124,255,0.22); stroke: rgba(143,176,255,0.5); }
.hic-pill-t { font-family: var(--font-mono) !important; font-size: 10px; fill: rgba(234,240,255,0.7) !important; }
.hic-pill-t-hot { fill: #C9D8FF !important; }

@media (prefers-reduced-motion: no-preference) {
  .hic-g { transition: opacity .5s ease; opacity: 0.4; }
  .hic-g[data-on] { opacity: 1; }
  .hic-in[data-on] .hic-pulse { opacity: 1; animation: hic-flow 3s cubic-bezier(.45,0,.55,1) infinite; }
  .hic-out[data-on] .hic-pulse { opacity: 1; animation: hic-flow 2.2s cubic-bezier(.45,0,.55,1) infinite; }
  .hic-core[data-on] .hic-ring { animation: hic-ring 2.4s ease-out infinite; }
  .hic-orbit { animation: hic-spin 60s linear infinite; }
  .hic-orbit-2 { animation-duration: 90s; animation-direction: reverse; }
  .hic:not([data-live]) .hic-pulse, .hic:not([data-live]) .hic-ring, .hic:not([data-live]) .hic-orbit { animation-play-state: paused; }
}
@keyframes hic-flow { 0% { stroke-dashoffset: 100; opacity: 0; } 8% { opacity: 1; } 88% { opacity: 1; } 100% { stroke-dashoffset: 9; opacity: 0; } }
@keyframes hic-ring { 0% { opacity: .6; transform: scale(1); } 100% { opacity: 0; transform: scale(1.1); } }
@keyframes hic-spin { to { transform: rotate(360deg); } }

/* Steps */
.hic-steps { list-style: none; margin: 48px 0 0; padding: 0; display: grid; gap: 12px; }
@media (min-width: 768px) { .hic-steps { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (min-width: 1024px) { .hic-steps { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-top: 64px; } }
.hic-steps li { display: flex; }
.hic-step {
  all: unset; box-sizing: border-box; cursor: pointer; width: 100%; min-height: 44px;
  position: relative; isolation: isolate;
  display: flex; flex-direction: column; gap: 10px; padding: 22px 20px;
  border-radius: 18px; background: #0A1226; border: 1px solid rgba(255,255,255,0.07);
  transition: transform .5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow .5s cubic-bezier(0.16, 1, 0.3, 1), border-color .4s ease, background-color .4s ease;
  -webkit-tap-highlight-color: transparent;
}
.hic-step:focus-visible { outline: 2px solid #8FB0FF; outline-offset: 3px; }
.hic-step[data-active] { border-color: rgba(143,176,255,0.4); background: #0D1730; }

/* The border trace: a conic light masked to a ring, its angle animated. */
@property --hic-a { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
.hic-trace {
  position: absolute; inset: -1px; z-index: 1; border-radius: inherit; padding: 2px; pointer-events: none;
  background: conic-gradient(from var(--hic-a), transparent 0deg 190deg, rgba(77,124,255,0.55) 270deg, #A9C2FF 335deg, #FFFFFF 355deg, transparent 360deg);
  filter: drop-shadow(0 0 3px rgba(143,176,255,0.7));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
  opacity: 0; transition: opacity .3s ease;
}
@media (prefers-reduced-motion: no-preference) {
  @media (hover: hover) {
    .hic-step:hover .hic-trace { opacity: 1; animation: hic-trace 2.4s linear infinite; }
  }
  .hic-step:focus-visible .hic-trace { opacity: 1; animation: hic-trace 2.4s linear infinite; }
  .hic-step[data-trace] .hic-trace { opacity: 1; animation: hic-trace-once 1.3s cubic-bezier(.4,0,.2,1) 1 both; }
}
@media (prefers-reduced-motion: reduce) { .hic-trace { display: none; } }
@keyframes hic-trace { from { --hic-a: 0deg; } to { --hic-a: 360deg; } }
@keyframes hic-trace-once { 0% { --hic-a: 0deg; opacity: 1; } 85% { opacity: 1; } 100% { --hic-a: 360deg; opacity: 0; } }

.hic-n { font-family: var(--font-mono); font-size: 0.8125rem; color: #8FB0FF; font-variant-numeric: tabular-nums; }
.hic-t { font-family: var(--font-display); font-weight: 600; font-size: 1.25rem; letter-spacing: -0.02em; line-height: 1.2; color: var(--color-ink); }
.hic-tech { font-size: 1.0625rem; line-height: 1.5; color: var(--color-ink); }
.hic-gloss { margin-top: auto; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.07); font-family: var(--font-mono); font-size: 0.8125rem; line-height: 1.5; color: #9AA3B5; }

/* Security */
.hic-sec { margin-top: 48px; padding: 22px 20px; border-radius: 18px; border: 1px solid rgba(255,255,255,0.07); background: linear-gradient(180deg, rgba(19,32,63,0.55), rgba(10,18,38,0.55)); display: grid; gap: 14px; }
@media (min-width: 1024px) { .hic-sec { margin-top: 64px; padding: 26px 28px; grid-template-columns: 200px 1fr; align-items: start; gap: 24px; } }
.hic-sec-head { display: flex; align-items: center; gap: 10px; }
.hic-sec-ico { color: #8FB0FF; flex: none; }
.hic-sec-h { margin: 0; font-family: var(--font-mono); font-weight: 500; font-size: 0.8125rem; letter-spacing: 0.02em; color: var(--color-ink); }
.hic-sec-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; font-size: 0.9375rem; line-height: 1.5; color: var(--color-ink-soft); }
@media (min-width: 768px) { .hic-sec-list { grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 28px; } }
.hic-sec-list li { position: relative; padding-left: 16px; }
.hic-sec-list li::before { content: ""; position: absolute; left: 0; top: 0.62em; width: 5px; height: 5px; border-radius: 50%; background: #4D7CFF; }
`;
