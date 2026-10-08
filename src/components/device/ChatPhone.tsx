"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Beat, Conversation } from "@/data/conversations";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";
import { Phone } from "./Phone";
import { ChatView, LockView } from "./screens";

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
      <div className="chatphone" data-ssr={mode === "ssr" ? "" : undefined} aria-hidden>
        <Phone clock={locked ? lock.clock : conversation.clock} size={size}>
          <div className="chat-fade absolute inset-0" data-out={fading ? "" : undefined}>
            <ChatView
              business={business}
              beats={conversation.beats.slice(0, shown)}
              typing={typing}
              animate={mode === "play"}
              keyPrefix={step < 0 ? "s" : "p"}
            >
              <LockView
                on={locked}
                clock={lock.clock}
                date={lock.date}
                notes={[{ app: lock.app, title: lock.title, body: lock.body }]}
              />
            </ChatView>
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
