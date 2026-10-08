"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Beat, Conversation } from "@/data/conversations";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";
import { Phone } from "./Phone";

/**
 * ChatPhone - a phone playing a WhatsApp-style conversation on a gentle loop:
 * message in, typing, reply, booking card, then the owner's lock screen.
 *
 * Performance and resilience:
 * - The server renders the finished conversation, so it reads without JS.
 *   While JS is loading, CSS keeps those bubbles transparent (with a timed
 *   fallback that shows them if the script never runs).
 * - Playback waits for window load plus an idle slot, so it never competes
 *   with the headline (the LCP element).
 * - It pauses while off screen or in a background tab.
 * - Reduced motion: the finished conversation, static.
 * - The animated device is aria-hidden; screen readers get a transcript.
 */

type Step =
  | { t: "blank"; ms: number }
  | { t: "typing"; upTo: number; ms: number }
  | { t: "show"; upTo: number; ms: number }
  | { t: "lock"; ms: number }
  | { t: "fade"; ms: number };

function buildSteps(beats: Beat[]): Step[] {
  const steps: Step[] = [{ t: "blank", ms: 700 }];
  beats.forEach((b, i) => {
    if (b.kind === "out" || b.kind === "card") {
      steps.push({ t: "typing", upTo: i, ms: b.kind === "out" ? 1500 : 1000 });
    }
    const read =
      b.kind === "out" ? Math.min(4200, 1400 + b.text.length * 16) :
      b.kind === "card" ? 2400 :
      b.kind === "missed" ? 1300 :
      1500;
    steps.push({ t: "show", upTo: i + 1, ms: read });
  });
  steps.push({ t: "lock", ms: 4600 });
  steps.push({ t: "fade", ms: 650 });
  return steps;
}

export function ChatPhone({
  conversation,
  size = "md",
  label = "Sample conversation",
  className,
}: {
  conversation: Conversation;
  size?: "sm" | "md";
  label?: string;
  className?: string;
}) {
  const steps = useMemo(() => buildSteps(conversation.beats), [conversation]);
  const total = conversation.beats.length;

  // -1 = server render / not started (full conversation, CSS-held).
  const [step, setStep] = useState(-1);
  const reduce = useReducedMotionPref();
  const [ready, setReady] = useState(false);
  const mode: "ssr" | "play" | "static" = reduce ? "static" : ready ? "play" : "ssr";
  const [visible, setVisible] = useState(false);
  const [wake, setWake] = useState(0);
  const rootRef = useRef<HTMLElement>(null);

  // Decide the mode and wait for load + idle before playing.
  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const go = () => {
      if (cancelled) return;
      setStep(0);
      setReady(true);
    };
    const schedule = () => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      if (ric) idleId = ric(go, { timeout: 1500 });
      else timeoutId = setTimeout(go, 400);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      if (timeoutId) clearTimeout(timeoutId);
      const cic = (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
      if (idleId && cic) cic(idleId);
    };
  }, [reduce]);

  // Pause off screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Advance the play-head.
  useEffect(() => {
    if (mode !== "play" || !ready || !visible || step < 0) return;
    const current = steps[step];
    const id = setTimeout(() => {
      if (document.hidden) return; // resumes on the next visibility change
      setStep((s) => (s + 1) % steps.length);
    }, current.ms);
    return () => clearTimeout(id);
  }, [mode, ready, visible, step, steps, wake]);

  useEffect(() => {
    const onVis = () => {
      if (!document.hidden) setWake((w) => w + 1); // re-arm the timer effect
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Derive what is on screen.
  let shown = total;
  let typing = false;
  let locked = false;
  let fading = false;
  if (mode === "play" && step >= 0) {
    const s = steps[step];
    if (s.t === "blank") shown = 0;
    else if (s.t === "typing") { shown = s.upTo; typing = true; }
    else if (s.t === "show") shown = s.upTo;
    else if (s.t === "lock") { shown = total; locked = true; }
    else if (s.t === "fade") { shown = total; locked = true; fading = true; }
  }

  const { business, lock } = conversation;

  return (
    <figure ref={rootRef} className={`m-0 flex flex-col items-center ${className ?? ""}`}>
      <div
        className="chatphone"
        data-ssr={mode === "ssr" ? "" : undefined}
        aria-hidden
      >
        <Phone clock={locked ? lock.clock : conversation.clock} size={size}>
          <div className="chat-fade absolute inset-0" data-out={fading ? "" : undefined}>
            <div className="wa-header">
              <BackChevron />
              <div className="wa-avatar">{business.initials}</div>
              <div className="min-w-0 leading-tight">
                <div className="truncate font-semibold" style={{ fontSize: "1.05em" }}>{business.name}</div>
                <div style={{ fontSize: "0.8em", color: "#8696A0" }}>{typing ? "typing…" : "online"}</div>
              </div>
            </div>

            <div className="wa-body">
              <div className="wa-chip">Today</div>
              {conversation.beats.slice(0, shown).map((b, i) => (
                <BeatView key={`${step < 0 ? "s" : "p"}-${i}`} beat={b} animate={mode === "play"} />
              ))}
              {typing && (
                <div className="wa-typing wa-enter">
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>

            <div className="wa-composer">
              <div className="wa-composer-field">Message</div>
              <div className="wa-composer-mic">
                <MicIcon />
              </div>
            </div>

            <div className="lock" data-on={locked ? "" : undefined}>
              <div className="lock-date">{lock.date}</div>
              <div className="lock-clock">{lock.clock}</div>
              <div className="lock-note">
                <div className="lock-app">
                  <CalendarIcon />
                </div>
                <div className="min-w-0 text-left">
                  <div className="flex items-baseline justify-between gap-2" style={{ fontSize: "0.82em" }}>
                    <span className="font-semibold uppercase tracking-wide opacity-80">{lock.app}</span>
                    <span className="opacity-70">now</span>
                  </div>
                  <div className="mt-[0.15em] font-semibold" style={{ fontSize: "1.02em" }}>{lock.title}</div>
                  <div className="opacity-85" style={{ fontSize: "0.92em", lineHeight: 1.35 }}>{lock.body}</div>
                </div>
              </div>
            </div>
          </div>
        </Phone>
      </div>
      <figcaption className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
        {label}
        <span className="sr-only">: {conversation.summary}</span>
      </figcaption>
    </figure>
  );
}

function BeatView({ beat, animate }: { beat: Beat; animate: boolean }) {
  const enter = animate ? " wa-enter" : "";
  if (beat.kind === "missed") {
    return (
      <div className={`wa-missed${enter}`}>
        <PhoneMissedIcon />
        <span>{beat.text}</span>
        <span style={{ color: "#8696A0", fontSize: "0.85em" }}>{beat.time}</span>
      </div>
    );
  }
  if (beat.kind === "card") {
    return (
      <div className={`wa-card${enter}`}>
        <div className="wa-card-head">
          <CalendarIcon />
          <span>{beat.title}</span>
        </div>
        <div className="wa-card-body">
          {beat.lines.map((l) => (
            <div key={l}>{l}</div>
          ))}
          <span className="wa-time" style={{ marginTop: "0.1em" }}>
            {beat.time}
            <Ticks />
          </span>
          <div style={{ clear: "both" }} />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className={`wa-bubble${enter}`} data-dir={beat.kind}>
        {beat.text}
        <span className="wa-time">
          {beat.time}
          {beat.kind === "out" && <Ticks />}
        </span>
      </div>
      {beat.kind === "out" && beat.meta && <div className={`wa-meta${enter}`}>{beat.meta}</div>}
    </>
  );
}

function Ticks() {
  return (
    <svg viewBox="0 0 16 11" width="1.3em" height="0.9em" fill="none" stroke="#53BDEB" strokeWidth="1.6" aria-hidden>
      <path d="M1 6l3 3 6-7.5M6.5 8.5l.5.5 6-7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BackChevron() {
  return (
    <svg viewBox="0 0 10 16" width="0.7em" height="1.1em" fill="none" stroke="#E9EDEF" strokeWidth="2" aria-hidden>
      <path d="M8.5 1.5 2 8l6.5 6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1.2em" height="1.2em" fill="#fff" aria-hidden>
      <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-2.1A7 7 0 0 0 19 12h-2Z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1.25em" height="1.25em" fill="none" stroke="#fff" strokeWidth="1.8" aria-hidden>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" strokeLinecap="round" />
      <path d="m9 14.5 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneMissedIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1.1em" height="1.1em" fill="none" stroke="#F15C6D" strokeWidth="2" aria-hidden>
      <path d="M3 5.5 8 10.5l4-4M16 3h5v5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 16.5v2a2 2 0 0 1-2.2 2A17 17 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3h2" strokeLinecap="round" />
    </svg>
  );
}
