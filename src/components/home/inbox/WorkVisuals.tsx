"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Small app screens for "Four jobs" (Answer / Follow up / Admin / Report).
 * Decorative (aria-hidden) and made-up sample content, labelled "Sample".
 *
 * Each screen runs a calm loop, only while it is on screen: an
 * IntersectionObserver starts a small setTimeout timeline and stops it when
 * the card leaves the viewport or the tab is hidden. The server HTML, no JS
 * and reduced motion all show the finished ("settled") frame. Every frame
 * keeps the same box size (ghost text and stacked chips), so CLS stays 0.
 * Only transform, opacity and a stroke offset move.
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
  position: relative; width: 58px; border-radius: 12px; text-align: center; flex: none;
  background: #F2F5FC; color: #0A1226; box-shadow: 0 8px 20px -12px rgba(0, 0, 0, 0.9);
}
.gv-date-in { border-radius: 12px; overflow: hidden; }
.gv-date b { display: block; padding: 3px 0; font-size: 11px; letter-spacing: 0.08em; color: #fff; background: #2E5BD8; }
.gv-date span { display: block; padding: 4px 0 6px; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.1; }
.gv-time { font-size: 1.25em; font-weight: 600; letter-spacing: -0.01em; color: #F2F5FC; }
.gv-row { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #A9B2C6; }
.gv-row svg { flex: none; color: #8FB0FF; }

/* chart */
.gv-chart { width: 100%; height: auto; display: block; overflow: visible; }
.gv-draw { stroke-dasharray: 1; stroke-dashoffset: 0; }

@media (min-width: 1024px) { .get-row-in .get-vis > .gv-card { padding: 22px; gap: 14px; } }

/* ---- shared live pieces ---- */
.gv-slot { display: grid; }
.gv-slot > * { grid-area: 1 / 1; }
.gv-flip { display: grid; justify-items: end; }
.gv-flip > * { grid-area: 1 / 1; }
.gv-fx { transition: opacity 0.35s ease-out, transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1); }
.gv-fx[data-on="0"] { opacity: 0; transform: translate3d(0, 7px, 0) scale(0.98); }
.gv-flip > .gv-fx[data-on="0"] { transform: translate3d(0, 7px, 0); }
.gv-flip > .gv-fx[data-gone] { transform: translate3d(0, -7px, 0); }
/* swaps: the old one leaves quickly, the new one follows, so text never overlaps */
:is(.gv-flip, .gv-slot, .gv-sub-live) > .gv-fx[data-on="0"] { transition-duration: 0.16s, 0.2s; transition-delay: 0s; }
:is(.gv-flip, .gv-slot, .gv-sub-live) > .gv-fx[data-on="1"] { transition-delay: 0.16s; }
.gv-card > :not(.gv-fx) { transition: opacity 0.45s ease-out; }
.gv-card[data-reset] > * { opacity: 0; transition: opacity 0.45s ease-in; }
.gv-sample { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #6F7990; }

/* Answer: typing dots, then the reply types itself in, then the read ticks */
.gv-typing {
  justify-self: end; align-self: start; display: inline-flex; gap: 4px; padding: 11px 13px; border-radius: 16px; border-top-right-radius: 5px;
  background: linear-gradient(180deg, #2E5BD8, #2149B8);
}
.gv-typing i { width: 6px; height: 6px; border-radius: 9999px; background: rgba(255, 255, 255, 0.85); }
.gv-typing[data-on="1"] i { animation: gv-dot 0.9s ease-in-out calc(var(--i) * 0.14s) infinite; }
.gv-reply { position: relative; }
.gv-ghost { visibility: hidden; }
.gv-typed { position: absolute; left: 12px; right: 12px; top: 8px; }
.gv-caret { display: inline-block; width: 2px; height: 1em; margin-left: 1px; vertical-align: -0.12em; background: rgba(255, 255, 255, 0.85); animation: gv-blink 0.9s steps(1) infinite; }
.gv-tick2 { transition: opacity 0.3s ease-out; }
.gv-tick2[data-on="0"] { opacity: 0; }
.gv-ticks { transition: stroke 0.3s ease-out; }
.gv-sub-live { display: grid; }
.gv-sub-live > * { grid-area: 1 / 1; }

/* Follow up: approve press, a clock ticks to 09:00, the chip flips to Sent */
.gv-act { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.gv-btn {
  display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 9999px; font-size: 12.5px; font-weight: 600;
  color: #0A1226; background: #F2F5FC; box-shadow: 0 6px 16px -10px rgba(0, 0, 0, 0.9);
  transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.3s, color 0.3s, box-shadow 0.3s;
}
.gv-btn[data-press] { transform: scale(0.93); box-shadow: 0 0 0 4px rgba(143, 176, 255, 0.22); }
.gv-btn[data-done] { color: #5FE0A3; background: rgba(61, 214, 140, 0.1); box-shadow: inset 0 0 0 1px rgba(61, 214, 140, 0.32); }
.gv-clock { display: inline-flex; align-items: center; gap: 7px; font-family: var(--font-mono); font-size: 12.5px; color: #C9D1E3; }
.gv-clock svg { color: #8FB0FF; }
.gv-count { font-size: 12px; color: #8B93A3; }
.gv-prog { position: relative; height: 3px; border-radius: 3px; background: rgba(255, 255, 255, 0.07); overflow: hidden; }
.gv-prog > i { position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(90deg, #2E5BD8, #8FB0FF); transform-origin: left; transform: scaleX(var(--p, 1)); transition: transform 1s linear; }
.gv-prog[data-snap] > i { transition: none; }
.gv-quote { transition: background-color 0.45s ease, border-color 0.45s ease, color 0.45s ease; }
.gv-quote[data-sent] { background: rgba(46, 91, 216, 0.16); border-color: rgba(143, 176, 255, 0.3); color: #E9EDF7; }

/* Admin: the highlight steps across the week, the slot fills, it books */
.gv-week { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
.gv-day {
  display: grid; justify-items: center; gap: 1px; padding: 6px 0 7px; border-radius: 10px; font-size: 11px; color: #8B93A3;
  background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06);
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease, transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.gv-day b { font-size: 15px; font-weight: 600; color: #DCE3F2; letter-spacing: -0.01em; }
.gv-day[data-full] { opacity: 0.55; }
.gv-day[data-full] b { text-decoration: line-through; text-decoration-color: rgba(255, 255, 255, 0.35); }
.gv-day[data-hot] { color: #DCE6FF; background: rgba(77, 124, 255, 0.16); border-color: rgba(143, 176, 255, 0.45); transform: translateY(-2px); }
.gv-day[data-booked] { color: #06231A; background: #5FE0A3; border-color: #5FE0A3; }
.gv-day[data-booked] b { color: #06231A; }
.gv-badge { position: absolute; right: -6px; top: -6px; width: 20px; height: 20px; border-radius: 9999px; background: #3DD68C; display: grid; place-items: center; box-shadow: 0 0 0 2px #0A1226; transition: opacity 0.3s ease-out, transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1); }
.gv-badge[data-on="0"] { opacity: 0; transform: scale(0.5); }
.gv-badge path { transition: stroke-dashoffset 0.35s ease-out 0.15s; }
.gv-badge[data-on="0"] path { stroke-dashoffset: 1; }
.gv-slotbar { position: relative; height: 4px; border-radius: 4px; background: rgba(255, 255, 255, 0.07); overflow: hidden; margin-top: 6px; }
.gv-slotbar > i { position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(90deg, #2E5BD8, #5FE0A3); transform-origin: left; transition: transform 1.1s cubic-bezier(0.4, 0, 0.2, 1); }
.gv-slotbar[data-on="0"] > i { transform: scaleX(0); transition: none; }

/* Report: bars grow in turn, the line draws, the Sample tooltip shows */
.gv-plot { position: relative; }
.gv-bar, .gv-pt, .gv-val { transform-box: fill-box; }
.gv-bar { transform-origin: 50% 100%; transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) calc(var(--i) * 0.09s); }
.gv-pt, .gv-val { transform-origin: center; transition: opacity 0.3s ease-out calc(var(--i, 0) * 0.08s), transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--i, 0) * 0.08s); }
.gv-line { transition: stroke-dashoffset 0.95s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s; }
.gv-area { transition: opacity 0.7s ease-out 0.4s; }
.gv-plot[data-s="0"] .gv-bar { transform: scaleY(0); transition: none; }
.gv-plot[data-s="0"] .gv-line, .gv-plot[data-s="1"] .gv-line { stroke-dashoffset: 1; opacity: 0; transition: none; }
.gv-plot[data-s="0"] .gv-area, .gv-plot[data-s="1"] .gv-area { opacity: 0; transition: none; }
.gv-plot[data-s="0"] .gv-pt, .gv-plot[data-s="1"] .gv-pt, .gv-plot[data-s="2"] .gv-pt,
.gv-plot[data-s="0"] .gv-val, .gv-plot[data-s="1"] .gv-val, .gv-plot[data-s="2"] .gv-val { opacity: 0; transform: scale(0.6); transition: none; }
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
  opacity: 0; transform: translateX(4px); transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}
.gv-tip b { display: block; font-size: 15px; font-weight: 600; color: #F2F5FC; }
.gv-tip small { display: block; margin-bottom: 3px; font-size: 10.5px; letter-spacing: 0.08em; text-transform: uppercase; color: #8B93A3; }
.gv-hit:hover .gv-tip, .gv-hit:focus-visible .gv-tip, .gv-plot[data-tip] .gv-tip { opacity: 1; transform: none; }
.gv-plot:has(.gv-hit:hover, .gv-hit:focus-visible) .gv-val > rect, .gv-plot:has(.gv-hit:hover, .gv-hit:focus-visible) .gv-val > text,
.gv-plot[data-tip] .gv-val > rect, .gv-plot[data-tip] .gv-val > text { opacity: 0; transition: opacity 160ms ease-out; }

@keyframes gv-dot { 0%, 100% { transform: translateY(0); opacity: 0.55; } 50% { transform: translateY(-3px); opacity: 1; } }
@keyframes gv-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }

@media (prefers-reduced-motion: reduce) {
  .gv-fx, .gv-tip, .gv-day, .gv-btn, .gv-badge, .gv-badge path, .gv-quote, .gv-bar, .gv-pt, .gv-val, .gv-line, .gv-area, .gv-prog > i, .gv-slotbar > i { transition: none; }
  .gv-typing i, .gv-caret { animation: none; }
}
`;

const vi = (i: number) => ({ ["--i" as string]: i });

/**
 * Runs a looping timeline of frame durations (ms) while the element is on
 * screen. Returns the current frame. Starts on the last frame (the fade
 * out), so the first visible move is a soft reset, not a jump.
 */
function useTimeline(frames: readonly number[], settled: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(settled);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let idx = frames.length - 1;
    let timer: number | undefined;
    let visible = false;

    const stop = () => {
      if (timer !== undefined) window.clearTimeout(timer);
      timer = undefined;
    };
    const run = () => {
      stop();
      setFrame(idx);
      timer = window.setTimeout(() => {
        idx = (idx + 1) % frames.length;
        run();
      }, frames[idx]);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          visible = true;
          if (!document.hidden) run();
        } else if (!entry.isIntersecting && visible) {
          visible = false;
          stop();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);

    const onVis = () => {
      if (document.hidden) stop();
      else if (visible) run();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      io.disconnect();
      stop();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [frames, settled]);

  return [ref, frame] as const;
}

const on = (v: boolean) => (v ? "1" : "0");

function Ticks({ read, double }: { read: boolean; double: boolean }) {
  const c = read ? "#BFD3FF" : "rgba(255,255,255,0.55)";
  return (
    <svg viewBox="0 0 16 11" width="15" height="10" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path className="gv-ticks" stroke={c} d="M1 6l3 3 6-7.5" />
      <path className="gv-tick2 gv-ticks" data-on={on(double)} stroke={c} d="M6.5 8.5l.5.5 6-7.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Answer                                                              */
/* ------------------------------------------------------------------ */
const REPLY = "Yes, we deliver to Durban. It takes 2 to 3 days.";
/* typed two characters per frame */
const TYPE_STEPS = Math.ceil(REPLY.length / 2);
/* 0 in, 1 dots, 2.. typing, then sent, read, reset */
const A_TYPE0 = 2;
const A_SENT = A_TYPE0 + TYPE_STEPS;
const A_READ = A_SENT + 1;
const A_FRAMES: readonly number[] = [900, 1300, ...Array(TYPE_STEPS).fill(42), 650, 3200, 600];

function Answer() {
  const [ref, f] = useTimeline(A_FRAMES, A_READ);
  const reset = f === A_FRAMES.length - 1;
  const dots = f === 1;
  const typing = f >= A_TYPE0 && f < A_SENT;
  const chars = f >= A_SENT ? REPLY.length : typing ? Math.min(REPLY.length, (f - A_TYPE0 + 1) * 2) : 0;
  const showReply = f >= A_TYPE0 && !reset;

  return (
    <div ref={ref} aria-hidden className="gv-card" data-reset={reset ? "" : undefined}>
      <div className="gv-top">
        <span className="gv-who">
          <span className="gv-av" data-tone="warm">NK</span>
          <span className="min-w-0">
            <span className="gv-name">New enquiry</span>
            <span className="gv-sub gv-sub-live">
              <span className="gv-fx" data-on={on(!(dots || typing))}>WhatsApp · after hours</span>
              <span className="gv-fx" data-on={on(dots || typing)} style={{ color: "#8FB0FF" }}>Replying in your voice</span>
            </span>
          </span>
        </span>
        <span className="gv-app">22:15</span>
      </div>
      <div className="gv-hr" />
      <p className="gv-msg gv-fx" data-dir="in" data-on="1">
        Do you deliver to Durban?
        <span className="gv-meta">22:15</span>
      </p>
      <div className="gv-slot">
        <span className="gv-typing gv-fx" data-on={on(dots)}>
          <i style={vi(0)} />
          <i style={vi(1)} />
          <i style={vi(2)} />
        </span>
        <p className="gv-msg gv-reply gv-fx" data-dir="out" data-on={on(showReply)}>
          <span className="gv-ghost">{REPLY}</span>
          <span className="gv-typed">
            {REPLY.slice(0, chars)}
            {typing ? <span className="gv-caret" /> : null}
          </span>
          <span className="gv-meta">
            22:15 <Ticks read={f >= A_READ} double={f >= A_SENT} />
          </span>
        </p>
      </div>
      <p className="gv-status">
        <span className="gv-sample" style={{ marginRight: "auto" }}>Sample</span>
        <span className="gv-fx" data-on={on(f >= A_READ && !reset)}>Delivered and read</span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Follow up                                                           */
/* ------------------------------------------------------------------ */
/* 0 waiting, 1 press, 2-5 clock ticks 08:59:56 to 08:59:59, 6 sent, 7 reset */
const F_FRAMES: readonly number[] = [1700, 450, 1000, 1000, 1000, 1000, 3000, 600];
const F_SENT = 6;

function FollowUp() {
  const [ref, f] = useTimeline(F_FRAMES, F_SENT);
  const reset = f === F_FRAMES.length - 1;
  const approved = f >= 2;
  const sent = f >= F_SENT && !reset;
  const counting = f >= 2 && f < F_SENT;
  const sec = counting ? 56 + (f - 2) : sent ? 0 : 55;
  const clock = sent ? "09:00:00" : `08:59:${String(sec).padStart(2, "0")}`;
  const left = counting ? 4 - (f - 2) : 0;
  /* progress: empty while waiting, ticks up each second, full when sent */
  const p = counting ? (f - 2 + 1) / 5 : sent ? 1 : 0;

  return (
    <div ref={ref} aria-hidden className="gv-card" data-reset={reset ? "" : undefined}>
      <div className="gv-top">
        <span className="gv-who">
          <span className="gv-av">LM</span>
          <span className="min-w-0">
            <span className="gv-name">Website lead</span>
            <span className="gv-sub">Asked for a quote · quiet 3 days</span>
          </span>
        </span>
        <span className="gv-flip">
          <span className="gv-chip gv-fx" data-tone="amber" data-on={on(!approved || reset)} data-gone={approved ? "" : undefined}>Waiting</span>
          <span className="gv-chip gv-fx" data-tone="green" data-on={on(approved && !sent && !reset)} data-gone={sent ? "" : undefined}>Approved</span>
          <span className="gv-chip gv-fx" data-tone="blue" data-on={on(sent)}>Sent 09:00</span>
        </span>
      </div>
      <p className="gv-quote" data-sent={sent ? "" : undefined}>Hi, just checking in on the quote. Happy to answer any questions.</p>
      <div className="gv-act">
        <span className="gv-clock">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="8" cy="8" r="6.25" />
            <path d="M8 4.5V8l2.25 1.5" />
          </svg>
          {clock}
        </span>
        <span className="gv-slot" style={{ justifyItems: "end", alignItems: "center" }}>
          <span className="gv-count gv-fx" data-on={on(counting)}>Sends in 0:0{left}</span>
          <span
            className="gv-btn gv-fx"
            data-on={on(!counting)}
            data-press={f === 1 ? "" : undefined}
            data-done={sent ? "" : undefined}
          >
            {sent ? "Sent" : "Approve"}
          </span>
        </span>
      </div>
      <span className="gv-prog" data-snap={f === 0 || reset ? "" : undefined} style={{ ["--p" as string]: p }}>
        <i />
      </span>
      <p className="gv-status" style={{ justifyContent: "space-between" }}>
        <span className="gv-sample">Sample</span>
        <span>Drafted for you, approved by you</span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Admin                                                               */
/* ------------------------------------------------------------------ */
const DAYS = [
  { d: "Mon", n: 13 },
  { d: "Tue", n: 14 },
  { d: "Wed", n: 15 },
  { d: "Thu", n: 16 },
  { d: "Fri", n: 17 },
];
/* 0 idle, 1 Mon checked (full), 2 Tue holding + slot fills, 3 booked, 4 reminder, 5 reset */
const D_FRAMES: readonly number[] = [800, 600, 1300, 700, 3000, 600];
const D_SETTLED = 4;

function Admin() {
  const [ref, f] = useTimeline(D_FRAMES, D_SETTLED);
  const reset = f === D_FRAMES.length - 1;
  const booked = f >= 3 && !reset;
  const holding = f === 2;

  return (
    <div ref={ref} aria-hidden className="gv-card" data-reset={reset ? "" : undefined}>
      <div className="gv-top">
        <span className="gv-app">Calendar · 07:30</span>
        <span className="gv-flip">
          <span className="gv-chip gv-fx" data-tone="muted" data-on={on(!booked)} data-gone={booked ? "" : undefined}>
            {holding ? "Holding slot" : "Finding a slot"}
          </span>
          <span className="gv-chip gv-fx" data-tone="green" data-on={on(booked)}>Booked</span>
        </span>
      </div>
      <div className="gv-week">
        {DAYS.map(({ d, n }, i) => (
          <span
            key={d}
            className="gv-day"
            data-full={i === 0 && f >= 1 && !reset ? "" : undefined}
            data-hot={(i === 0 && f === 1) || (i === 1 && holding) ? "" : undefined}
            data-booked={i === 1 && booked ? "" : undefined}
          >
            {d}
            <b>{n}</b>
          </span>
        ))}
      </div>
      <div className="gv-book">
        <span className="gv-date">
          <span className="gv-date-in block">
            <b>TUE</b>
            <span>14</span>
          </span>
          <span className="gv-badge" data-on={on(booked)}>
            <svg viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="#06231A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 6.3 5 8.6l4.5-5" pathLength={1} strokeDasharray="1" />
            </svg>
          </span>
        </span>
        <span className="min-w-0">
          <span className="gv-time block">07:30 to 09:00</span>
          <span className="gv-name">Geyser repair</span>
          <span className="gv-sub">Address and photos captured</span>
          <span className="gv-slotbar block" data-on={on(f >= 2 && !reset)}>
            <i />
          </span>
        </span>
      </div>
      <div className="gv-hr" />
      <p className="gv-row" style={{ justifyContent: "space-between" }}>
        <span className="gv-fx inline-flex items-center gap-2.5" data-on={on(f >= 4 && !reset)}>
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 11V7a4 4 0 0 1 8 0v4l1 1.5H3L4 11ZM6.5 14a1.5 1.5 0 0 0 3 0" />
          </svg>
          Reminder tonight at 20:00
        </span>
        <span className="gv-sample">Sample</span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Report                                                              */
/* ------------------------------------------------------------------ */
/* Sample series (made up, labelled "Sample" on the card and in the tooltip). */
const MONTHS = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const VALUES = [42, 48, 46, 58, 63, 74];
/* 0 empty, 1 bars grow, 2 line draws, 3 points + value, 4 tooltip, 5 reset */
const R_FRAMES: readonly number[] = [350, 1100, 1000, 900, 3000, 700];
const R_SETTLED = 3;

function Report() {
  const [ref, f] = useTimeline(R_FRAMES, R_SETTLED);
  const reset = f === R_FRAMES.length - 1;
  const stage = reset ? 3 : Math.min(f, 3);
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
    <div ref={ref} className="gv-card" data-reset={reset ? "" : undefined}>
      <div className="gv-top" aria-hidden>
        <span>
          <span className="gv-app block">Monthly report</span>
          <span className="gv-sub">Enquiries answered</span>
        </span>
        <span className="gv-chip" data-tone="muted">Sample</span>
      </div>
      <div className="gv-plot" data-s={stage} data-tip={f === 4 ? "" : undefined}>
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
          <g className="gv-val" style={vi(last)}>
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
      <p className="gv-status" aria-hidden style={{ justifyContent: "space-between" }}>
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
