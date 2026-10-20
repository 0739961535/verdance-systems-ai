"use client";

import { useEffect, useRef, useState } from "react";
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
 * step jumps to it and restarts the timer. Reduced motion: no cycling, no
 * pulses, every part of the diagram lit and every step readable.
 */

const CYCLE_MS = 4000;

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
                  className="hic-step"
                  data-active={active ? "" : undefined}
                  aria-current={active ? "step" : undefined}
                  onClick={() => setStep(i)}
                >
                  <span className="hic-bar" aria-hidden>
                    <span key={active ? `on-${step}` : "off"} className="hic-bar-fill" />
                  </span>
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
.hic-svg-tall { max-width: 520px; margin: 0 auto; }
@media (min-width: 1024px) { .hic-svg-wide { display: block; } .hic-svg-tall { display: none; } }
.hic-svg text { font-family: var(--font-sans, inherit); fill: var(--ink); }

.hic-chip rect { fill: #0A1226; stroke: rgba(255,255,255,0.12); stroke-width: 1; transition: stroke .5s ease; }
.hic-ico { fill: rgba(234,240,255,0.78); }
.hic-chip-t { fill: rgba(234,240,255,0.88) !important; font-weight: 500; }
.hic-chip-more { fill: #8FB0FF !important; }
.hic-chips[data-on] .hic-chip rect { stroke: rgba(143,176,255,0.42); }

.hic-wire, .hic-bus { fill: none; stroke: rgba(255,255,255,0.12); stroke-width: 1.25; transition: stroke .5s ease; }
.hic-in[data-on] .hic-wire, .hic-in[data-on] .hic-bus, .hic-out[data-on] .hic-wire { stroke: rgba(143,176,255,0.38); }
.hic-pulse { fill: none; stroke: #8FB0FF; stroke-width: 2; stroke-linecap: round; stroke-dasharray: 7 93; stroke-dashoffset: 100; opacity: 0; }

.hic-core-b { fill: #13203F; stroke: rgba(143,176,255,0.35); stroke-width: 1; }
.hic-ring { fill: none; stroke: #4D7CFF; stroke-width: 1; opacity: 0; transform-box: fill-box; transform-origin: center; }
.hic-halo { opacity: 0.35; transition: opacity .6s ease; }
.hic-core[data-on] .hic-halo { opacity: 1; }
.hic-core-k { font-family: var(--font-mono) !important; font-size: 10px; letter-spacing: 0.14em; fill: #8FB0FF !important; }
.hic-core-t { font-weight: 600; letter-spacing: -0.02em; }
.hic-core-s { font-family: var(--font-mono) !important; font-size: 11px; fill: rgba(234,240,255,0.6) !important; }

.hic-win { fill: #0A1226; stroke: rgba(255,255,255,0.12); stroke-width: 1; }
.hic-phone-b { fill: #13203F; }
.hic-dot { fill: rgba(255,255,255,0.16); }
.hic-app-h { font-weight: 600; letter-spacing: -0.01em; }
.hic-rule { stroke: rgba(255,255,255,0.07); stroke-width: 1; }
.hic-row-t { fill: rgba(234,240,255,0.82) !important; }
.hic-skel { fill: rgba(255,255,255,0.08); }
.hic-pill { fill: rgba(255,255,255,0.05); stroke: rgba(255,255,255,0.12); stroke-width: 1; }
.hic-pill-hot { fill: rgba(77,124,255,0.22); stroke: rgba(143,176,255,0.5); }
.hic-pill-t { font-family: var(--font-mono) !important; font-size: 10px; fill: rgba(234,240,255,0.7) !important; }
.hic-pill-t-hot { fill: #C9D8FF !important; }

@media (prefers-reduced-motion: no-preference) {
  .hic-g { transition: opacity .5s ease; opacity: 0.42; }
  .hic-g[data-on] { opacity: 1; }
  .hic-in[data-on] .hic-pulse, .hic-out[data-on] .hic-pulse { opacity: 1; animation: hic-flow 2.4s linear infinite; }
  .hic-core[data-on] .hic-ring { animation: hic-ring 2.4s ease-out infinite; }
  .hic:not([data-live]) .hic-pulse, .hic:not([data-live]) .hic-ring { animation-play-state: paused; }
}
@keyframes hic-flow { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
@keyframes hic-ring { 0% { opacity: .7; transform: scale(1); } 100% { opacity: 0; transform: scale(1.12); } }

/* Steps */
.hic-steps { list-style: none; margin: 48px 0 0; padding: 0; display: grid; gap: 12px; }
@media (min-width: 768px) { .hic-steps { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (min-width: 1024px) { .hic-steps { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-top: 64px; } }
.hic-steps li { display: flex; }
.hic-step {
  all: unset; box-sizing: border-box; cursor: pointer; width: 100%; min-height: 44px;
  display: flex; flex-direction: column; gap: 10px; padding: 0 20px 22px;
  border-radius: 18px; background: #0A1226; border: 1px solid rgba(255,255,255,0.07);
  transition: border-color .4s ease, background-color .4s ease;
}
.hic-step:hover { border-color: rgba(255,255,255,0.14); }
.hic-step:focus-visible { outline: 2px solid #8FB0FF; outline-offset: 3px; }
.hic-step[data-active] { border-color: rgba(143,176,255,0.4); background: #0D1730; }
.hic-bar { display: block; height: 2px; margin: 0 -20px 10px; border-radius: 18px 18px 0 0; overflow: hidden; background: rgba(255,255,255,0.06); }
.hic-bar-fill { display: block; height: 100%; background: #4D7CFF; transform: scaleX(0); transform-origin: left; }
.hic-step[data-active] .hic-bar-fill { transform: scaleX(1); }
@media (prefers-reduced-motion: no-preference) {
  .hic-step[data-active] .hic-bar-fill { animation: hic-fill ${CYCLE_MS}ms linear both; }
  .hic:not([data-live]) .hic-bar-fill { animation-play-state: paused; }
}
@keyframes hic-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.hic-n { font-family: var(--font-mono); font-size: 0.8125rem; color: #8FB0FF; font-variant-numeric: tabular-nums; }
.hic-t { font-family: var(--font-display); font-weight: 600; font-size: 1.25rem; letter-spacing: -0.02em; line-height: 1.2; color: var(--color-ink); }
.hic-tech { font-size: 0.9375rem; line-height: 1.55; color: var(--color-ink-soft); }
.hic-gloss { margin-top: auto; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.07); font-family: var(--font-serif); font-style: italic; font-size: 1rem; line-height: 1.45; color: var(--color-ink-muted); }

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
