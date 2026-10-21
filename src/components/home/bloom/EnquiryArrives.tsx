"use client";

import { SampleTag } from "@/components/kit/SampleTag";
import { useEffect, useRef, useState } from "react";
import { CalendarCheck, Check, CheckCheck } from "lucide-react";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";

/**
 * 02 Demo, "the enquiry arrives": a phone. A WhatsApp lands as a
 * notification, opens into the chat, the reply types itself while a timer
 * runs 0:00 to 0:06, the customer picks a time and the booking card snaps
 * into the diary. A soft blue bloom opens behind the phone as the reply
 * lands. Loops only while on screen. Reduced motion: the finished chat.
 * Sample business and customer (labelled).
 */

const Q = "Hi, is Saturday 13 March free for about 120 guests?";
const A = "Hi Lerato, it is. The Garden or the Barn both seat 120. Would you like to see them on Thursday?";
const Q2 = "Thursday at 10 please";

type Stage = 0 | 1 | 2 | 3 | 4 | 5 | 6;
// 0 idle, 1 notification, 2 chat open, 3 typing reply, 4 replied, 5 second message, 6 booked

export function EnquiryArrives() {
  const reduce = useReducedMotionPref();
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  // until it first comes on screen, the finished conversation shows
  const [stage, setStage] = useState<Stage>(6);
  const [typed, setTyped] = useState(A.length);
  const [ms, setMs] = useState(6000);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || !on) return;
    const timers: number[] = [];
    let raf = 0;
    const at = (t: number, f: () => void) => timers.push(window.setTimeout(f, t));
    const run = () => {
      setStage(1);
      setTyped(0);
      setMs(0);
      at(1900, () => setStage(2));
      at(2700, () => {
        setStage(3);
        const t0 = performance.now();
        const dur = 6000;
        const step = (now: number) => {
          const k = Math.min(1, (now - t0) / dur);
          setMs(Math.round(k * 6000));
          setTyped(Math.round(k * A.length));
          if (k < 1) raf = requestAnimationFrame(step);
          else setStage(4);
        };
        raf = requestAnimationFrame(step);
      });
      at(10800, () => setStage(5));
      at(12400, () => setStage(6));
      at(17000, run);
    };
    run();
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      cancelAnimationFrame(raf);
    };
  }, [on, reduce]);

  const s: Stage = reduce ? 6 : stage;
  const shownTyped = reduce ? A.length : typed;
  const secs = reduce ? 6 : Math.floor(ms / 1000);

  return (
    <div ref={ref} className="ea" data-stage={s}>
      <style>{CSS}</style>
      <span aria-hidden className="ea-bloom" />
      <div className="ea-phone" aria-label="Sample conversation: an after-hours enquiry answered and booked">
        <SampleTag place="tr" style={{ top: -12, right: -6 }}>Sample</SampleTag>
        <div className="ea-notch" aria-hidden />
        {/* the notification, before the chat opens */}
        <div className="ea-note" aria-hidden={s !== 1}>
          <span className="ea-note-app">WhatsApp · now</span>
          <span className="ea-note-t">Oakridge Venue</span>
          <span className="ea-note-b">{Q}</span>
        </div>
        {/* the chat */}
        <div className="ea-chat">
          <div className="ea-head">
            <span className="ea-av">O</span>
            <span className="min-w-0">
              <span className="block text-[0.9rem] font-semibold">Oakridge Venue</span>
              <span className="block text-[0.72rem] text-white/55">WhatsApp · 21:41 · after hours</span>
            </span>
            <span className={`ea-timer ${s >= 4 ? "is-done" : ""}`} aria-hidden>
              0:{String(Math.min(secs, 6)).padStart(2, "0")}
              {s >= 4 ? <Check size={12} /> : null}
            </span>
          </div>
          <div className="ea-body">
            <p className="ea-them ea-in">
              {Q}
              <span className="ea-time">21:41 <CheckCheck size={12} /></span>
            </p>
            {s === 2 ? (
              <p className="ea-us ea-typing" aria-hidden>
                <i />
                <i />
                <i />
              </p>
            ) : null}
            {s >= 3 ? (
              <p className="ea-us ea-in">
                {A.slice(0, shownTyped)}
                {s === 3 ? <span className="ea-caret" aria-hidden /> : <span className="ea-time">21:41</span>}
              </p>
            ) : null}
            {s >= 4 ? <span className="ea-chip ea-in">Answered in 6 seconds</span> : null}
            {s >= 5 ? (
              <p className="ea-them ea-in">
                {Q2}
                <span className="ea-time">21:43 <CheckCheck size={12} /></span>
              </p>
            ) : null}
            {s >= 6 ? (
              <div className="ea-book ea-snap">
                <span className="ea-book-t">
                  <CalendarCheck size={14} aria-hidden /> Viewing booked
                </span>
                <div className="ea-cal" aria-hidden>
                  {["Tue", "Wed", "Thu", "Fri"].map((d) => (
                    <span key={d} className={d === "Thu" ? "is-on" : ""}>
                      <b>{d}</b>
                      {d === "Thu" ? "10:00" : "·"}
                    </span>
                  ))}
                </div>
                <span className="text-[0.75rem] text-white/65">Added to the venue diary. Reminder the day before.</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

const CSS = `
.ea { position: relative; display: grid; justify-items: center; isolation: isolate; }
.ea-bloom { position: absolute; left: 50%; top: 46%; width: min(120%, 620px); aspect-ratio: 1; transform: translate(-50%, -50%) scale(0.7); border-radius: 50%; z-index: -1; opacity: 0.4;
  background: radial-gradient(closest-side, rgba(77, 124, 255, 0.4), rgba(77, 124, 255, 0.1) 55%, rgba(77, 124, 255, 0)); transition: transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.4s ease; }
.ea[data-stage="4"] .ea-bloom, .ea[data-stage="5"] .ea-bloom, .ea[data-stage="6"] .ea-bloom { transform: translate(-50%, -50%) scale(1.05); opacity: 1; }
.ea-phone { position: relative; width: min(100%, 340px); height: 540px; border-radius: 42px; padding: 10px; background: #05070D;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 40px 90px rgba(2, 6, 20, 0.6), inset 0 0 0 1px rgba(255,255,255,0.05); overflow: hidden; color: #E9EDEF; }
.ea-notch { position: absolute; top: 18px; left: 50%; width: 92px; height: 26px; transform: translateX(-50%); border-radius: 99px; background: #000; z-index: 3; }
.ea-note { position: absolute; z-index: 2; left: 18px; right: 18px; top: 56px; padding: 12px 14px; border-radius: 20px; display: grid; gap: 2px;
  background: rgba(40, 46, 60, 0.82); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); box-shadow: 0 12px 30px rgba(0,0,0,0.4);
  opacity: 0; transform: translate3d(0, -24px, 0) scale(0.96); transition: opacity 0.45s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
.ea[data-stage="1"] .ea-note { opacity: 1; transform: none; }
/* the notification leaves upward first; the chat's messages appear once it has gone */
.ea[data-stage="2"] .ea-note { opacity: 0; transform: translate3d(0, -28px, 0) scale(0.96); transition: opacity 0.22s ease, transform 0.3s ease; }
.ea-body { transition: opacity 0.35s ease 0.3s; }
.ea[data-stage="0"] .ea-body, .ea[data-stage="1"] .ea-body { opacity: 0; transition: none; }
.ea-note-app { font-size: 0.68rem; color: rgba(255,255,255,0.6); }
.ea-note-t { font-size: 0.85rem; font-weight: 600; }
.ea-note-b { font-size: 0.85rem; line-height: 1.35; color: rgba(255,255,255,0.85); }
.ea-chat { position: absolute; inset: 10px; border-radius: 34px; background: linear-gradient(180deg, #0C1530, #0A1226); display: flex; flex-direction: column; overflow: hidden; transition: filter 0.5s ease; }
.ea[data-stage="1"] .ea-chat { filter: brightness(0.7); }
.ea-head { display: flex; align-items: center; gap: 10px; padding: 52px 14px 12px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.ea-av { display: grid; place-items: center; width: 32px; height: 32px; flex: none; border-radius: 99px; background: #1D3F8F; font-size: 0.8rem; font-weight: 600; }
.ea-timer { margin-left: auto; display: inline-flex; align-items: center; gap: 4px; padding: 3px 9px; border-radius: 99px; font-family: var(--font-mono); font-size: 0.75rem;
  background: rgba(77,124,255,0.14); color: #C9D8FF; box-shadow: inset 0 0 0 1px rgba(143,176,255,0.3); transition: background 0.4s, color 0.4s; }
.ea-timer.is-done { background: rgba(127,209,168,0.14); color: #BFF0D6; box-shadow: inset 0 0 0 1px rgba(127,209,168,0.35); }
.ea-body { flex: 1; display: grid; align-content: start; gap: 8px; padding: 14px; }
.ea-them, .ea-us { margin: 0; max-width: 86%; padding: 9px 12px; font-size: 0.86rem; line-height: 1.42; border-radius: 16px; }
.ea-them { justify-self: end; background: #1D3F8F; border-top-right-radius: 4px; }
.ea-us { justify-self: start; background: #13203F; border-top-left-radius: 4px; }
.ea-time { display: inline-flex; align-items: center; gap: 3px; margin-left: 8px; font-size: 0.6875rem; color: rgba(255,255,255,0.72); vertical-align: -1px; }
.ea-caret { display: inline-block; width: 7px; height: 14px; margin-left: 2px; vertical-align: -2px; background: #8FB0FF; animation: ea-blink 0.9s steps(2) infinite; }
@keyframes ea-blink { 50% { opacity: 0; } }
.ea-typing { display: inline-flex; gap: 4px; }
.ea-typing i { width: 6px; height: 6px; border-radius: 99px; background: rgba(255,255,255,0.55); animation: ea-dot 1.2s infinite ease-in-out; }
.ea-typing i:nth-child(2) { animation-delay: 0.15s; } .ea-typing i:nth-child(3) { animation-delay: 0.3s; }
@keyframes ea-dot { 0%, 60%, 100% { opacity: 0.35; transform: none; } 30% { opacity: 1; transform: translateY(-2px); } }
.ea-chip { justify-self: start; padding: 3px 10px; border-radius: 99px; font-size: 0.72rem; color: #BFF0D6; background: rgba(127,209,168,0.1); box-shadow: inset 0 0 0 1px rgba(127,209,168,0.3); }
.ea-in { animation: ea-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) both; }
@keyframes ea-in { from { opacity: 0; transform: translate3d(0, 8px, 0); } }
.ea-book { display: grid; gap: 8px; padding: 12px; border-radius: 16px; background: rgba(127,209,168,0.07); box-shadow: inset 0 0 0 1px rgba(127,209,168,0.32); }
.ea-snap { animation: ea-snap 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
@keyframes ea-snap { from { opacity: 0; transform: translate3d(0, 26px, 0) scale(0.92); } }
.ea-book-t { display: flex; align-items: center; gap: 6px; font-size: 0.85rem; font-weight: 600; color: #BFF0D6; }
.ea-cal { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
.ea-cal span { display: grid; gap: 2px; padding: 6px 4px; border-radius: 10px; text-align: center; font-size: 0.72rem; color: rgba(255,255,255,0.7); background: rgba(255,255,255,0.04); }
.ea-cal b { font-weight: 600; color: rgba(255,255,255,0.86); }
.ea-cal .is-on { color: #fff; background: #2554D4; box-shadow: 0 6px 18px rgba(37, 84, 212, 0.45); animation: ea-slot 0.6s 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
@keyframes ea-slot { from { transform: scale(0.8); background: rgba(255,255,255,0.04); } }
.ea-label { margin-top: 16px; text-align: center; }
@media (prefers-reduced-motion: reduce) {
  .ea-bloom, .ea-note, .ea-chat { transition: none; }
  .ea-in, .ea-snap, .ea-cal .is-on, .ea-caret, .ea-typing i { animation: none; }
}
`;
