"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarCheck, Check, CheckCheck } from "lucide-react";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";

/**
 * One idea per demo, told slowly: 3 or 4 short messages, a typing pause
 * before each reply, about 1.8s between messages, then a calm hold and a
 * loop. It only plays while on screen. Under reduced motion every message
 * shows at once. Always labelled as a sample.
 *
 * Shared by /services, /how-it-works and /industries.
 */

export type DemoMsg =
  | { from: "them" | "us"; text: string; time?: string }
  | { from: "card"; title: string; lines: string[]; tone?: "booked" | "info" };

export type Demo = {
  /** who the business is, shown in the header (made up) */
  business: string;
  /** e.g. "WhatsApp · 21:41" */
  channel: string;
  messages: DemoMsg[];
};

const GAP_MS = 1800;
const TYPING_MS = 1100;
const HOLD_MS = 3800;

export function SlowChatDemo({ demo, className = "" }: { demo: Demo; className?: string }) {
  const reduce = useReducedMotionPref();
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const [visible, setVisible] = useState(false);
  const n = demo.messages.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || !visible) return;
    let t = 0;
    const next = shown >= n ? 0 : shown;
    const nextMsg = demo.messages[next];
    if (shown >= n) {
      // hold the finished conversation, then start again
      t = window.setTimeout(() => setShown(0), HOLD_MS);
    } else if (nextMsg.from !== "them" && shown > 0) {
      // our side "types" first
      t = window.setTimeout(() => {
        setTyping(true);
        t = window.setTimeout(() => {
          setTyping(false);
          setShown((s) => s + 1);
        }, TYPING_MS);
      }, GAP_MS - TYPING_MS);
    } else {
      t = window.setTimeout(() => setShown((s) => s + 1), shown === 0 ? 500 : GAP_MS);
    }
    return () => window.clearTimeout(t);
  }, [shown, visible, reduce, n, demo.messages]);

  const count = reduce ? n : shown;

  return (
    <div ref={ref} className={`sd-card ${className}`}>
      <style>{CSS}</style>
      <div className="sd-head">
        <span className="sd-av" aria-hidden>{demo.business.slice(0, 1)}</span>
        <span className="min-w-0">
          <span className="block truncate text-[0.9rem] font-semibold">{demo.business}</span>
          <span className="block truncate text-[0.72rem] text-white/55">{demo.channel}</span>
        </span>
        <span className="sd-sample">Sample</span>
      </div>
      <ol className="sd-body" aria-label={`Sample conversation for ${demo.business}`}>
        {demo.messages.map((m, i) => {
          const on = i < count;
          if (m.from === "card")
            return (
              <li key={i} className={`sd-row sd-left ${on ? "is-on" : ""}`} aria-hidden={!on}>
                <span className={`sd-bk ${m.tone === "info" ? "is-info" : ""}`}>
                  <span className="sd-bk-t">
                    {m.tone === "info" ? <Check size={14} aria-hidden /> : <CalendarCheck size={14} aria-hidden />}
                    {m.title}
                  </span>
                  {m.lines.map((l) => (
                    <span key={l} className="block text-[0.78rem] text-white/70">{l}</span>
                  ))}
                </span>
              </li>
            );
          return (
            <li key={i} className={`sd-row ${m.from === "us" ? "sd-left" : "sd-right"} ${on ? "is-on" : ""}`} aria-hidden={!on}>
              <span className={m.from === "us" ? "sd-us" : "sd-them"}>
                {m.text}
                <span className="sd-time">
                  {m.time}
                  {m.from === "them" ? <CheckCheck size={12} aria-hidden className="text-[#8FB0FF]" /> : null}
                </span>
              </span>
            </li>
          );
        })}
        <li className={`sd-row sd-left sd-typing-row ${typing ? "is-on" : ""}`} aria-hidden>
          <span className="sd-typing"><i /><i /><i /></span>
        </li>
      </ol>
    </div>
  );
}

const CSS = `
.sd-card { border-radius: 20px; border: 1px solid rgba(255,255,255,0.08); background: linear-gradient(180deg, #0C1530, #0A1226); color: #E9EDEF; box-shadow: inset 0 1px 0 rgba(255,255,255,0.07), 0 24px 60px rgba(2,6,20,0.45); overflow: hidden; }
.sd-head { display: flex; align-items: center; gap: 10px; padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.sd-av { display: grid; place-items: center; width: 32px; height: 32px; flex: none; border-radius: 999px; background: #1D3F8F; font-size: 0.8rem; font-weight: 600; }
.sd-sample { margin-left: auto; flex: none; border: 1px solid rgba(255,255,255,0.14); border-radius: 999px; padding: 2px 8px; font-size: 0.68rem; color: rgba(255,255,255,0.62); }
.sd-body { display: grid; align-content: start; gap: 8px; min-height: 15.5rem; padding: 14px; margin: 0; list-style: none; }
.sd-row { display: flex; opacity: 0; transform: translate3d(0, 6px, 0); transition: opacity 0.4s ease-out, transform 0.4s ease-out; }
.sd-row:not(.is-on) { height: 0; margin-top: -8px; overflow: hidden; }
.sd-row.is-on { opacity: 1; transform: none; }
.sd-left { justify-content: flex-start; }
.sd-right { justify-content: flex-end; }
.sd-them, .sd-us { max-width: 84%; padding: 8px 11px; font-size: 0.86rem; line-height: 1.42; border-radius: 14px; }
.sd-them { background: #1D3F8F; border-top-right-radius: 4px; }
.sd-us { background: #13203F; border-top-left-radius: 4px; }
.sd-time { display: inline-flex; align-items: center; gap: 3px; margin-left: 8px; font-size: 0.66rem; color: rgba(255,255,255,0.5); vertical-align: -1px; }
.sd-bk { display: grid; gap: 2px; min-width: 62%; padding: 9px 11px; border-radius: 12px; border: 1px solid rgba(127,209,168,0.35); background: rgba(127,209,168,0.08); }
.sd-bk.is-info { border-color: rgba(143,176,255,0.35); background: rgba(77,124,255,0.1); }
.sd-bk-t { display: flex; align-items: center; gap: 6px; font-size: 0.82rem; font-weight: 600; color: #BFF0D6; }
.sd-bk.is-info .sd-bk-t { color: #C9D8FF; }
.sd-typing { display: inline-flex; gap: 4px; padding: 10px 12px; border-radius: 14px; border-top-left-radius: 4px; background: #13203F; }
.sd-typing i { width: 6px; height: 6px; border-radius: 99px; background: rgba(255,255,255,0.55); animation: sd-dot 1.2s infinite ease-in-out; }
.sd-typing i:nth-child(2) { animation-delay: 0.15s; }
.sd-typing i:nth-child(3) { animation-delay: 0.3s; }
@keyframes sd-dot { 0%, 60%, 100% { opacity: 0.35; transform: none; } 30% { opacity: 1; transform: translateY(-2px); } }
@media (prefers-reduced-motion: reduce) { .sd-row { transition: none; } .sd-typing-row { display: none; } }
`;
