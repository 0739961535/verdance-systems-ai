"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Beat, Conversation } from "@/data/conversations";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";
import { Phone } from "./Phone";
import { ChatView, LockView } from "./screens";

/**
 * ChatPhone - a phone playing sample WhatsApp-style conversations on a
 * gentle loop: message in, typing, reply, booking card, the owner's lock
 * screen, then a crossfade. Pass one `conversation` (niche pages) or a
 * `rotation` (homepage), which plays each in turn with chips to jump.
 *
 * Performance and resilience:
 * - The server renders the first finished conversation, so it reads without
 *   JS. While JS loads, CSS keeps those bubbles transparent (with a timed
 *   fallback that shows them if the script never runs).
 * - Playback waits for window load plus an idle slot, so it never competes
 *   with the headline (the LCP element).
 * - It pauses while off screen or in a background tab.
 * - Reduced motion: one finished conversation, static (chips still switch).
 * - The animated device is aria-hidden; screen readers get a transcript.
 */

type Step =
  | { t: "blank"; ms: number }
  | { t: "typing"; upTo: number; ms: number }
  | { t: "show"; upTo: number; ms: number }
  | { t: "lock"; ms: number }
  | { t: "fade"; ms: number };

function readMs(b: Beat) {
  if (b.kind === "out") {
    const extra = (b.options ? 900 : 0) + (b.product ? 900 : 0);
    return Math.min(5000, 1300 + b.text.length * 15 + extra);
  }
  if (b.kind === "card") return 2300;
  if (b.kind === "missed") return 1300;
  return 1400;
}

function buildSteps(beats: Beat[]): Step[] {
  const steps: Step[] = [{ t: "blank", ms: 600 }];
  beats.forEach((b, i) => {
    if (b.kind === "out" || b.kind === "card") {
      steps.push({ t: "typing", upTo: i, ms: b.kind === "out" ? 1300 : 900 });
    }
    steps.push({ t: "show", upTo: i + 1, ms: readMs(b) });
  });
  steps.push({ t: "lock", ms: 4000 });
  steps.push({ t: "fade", ms: 600 });
  return steps;
}

type RotationItem = { label: string; conversation: Conversation };

export function ChatPhone({
  conversation,
  rotation,
  size = "md",
  label = "Sample conversation",
  className,
}: {
  conversation?: Conversation;
  rotation?: RotationItem[];
  size?: "sm" | "md";
  label?: string;
  className?: string;
}) {
  const items: RotationItem[] = useMemo(
    () => rotation ?? (conversation ? [{ label, conversation }] : []),
    [rotation, conversation, label],
  );
  const [idx, setIdx] = useState(0);
  const current = items[idx].conversation;
  const steps = useMemo(() => buildSteps(current.beats), [current]);
  const total = current.beats.length;

  // -1 = server render / not started (full conversation, CSS-held).
  const [step, setStep] = useState(-1);
  const reduce = useReducedMotionPref();
  const [ready, setReady] = useState(false);
  const mode: "ssr" | "play" | "static" = reduce ? "static" : ready ? "play" : "ssr";
  const [visible, setVisible] = useState(false);
  const [wake, setWake] = useState(0);
  const rootRef = useRef<HTMLElement>(null);

  // Wait for load + idle before playing.
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

  // Advance the play-head; at the end of a conversation, move to the next.
  useEffect(() => {
    if (mode !== "play" || !visible || step < 0) return;
    const s = steps[step];
    const id = setTimeout(() => {
      if (document.hidden) return; // resumes on the next visibility change
      if (step + 1 >= steps.length) {
        setIdx((i) => (i + 1) % items.length);
        setStep(0);
      } else {
        setStep(step + 1);
      }
    }, s.ms);
    return () => clearTimeout(id);
  }, [mode, visible, step, steps, wake, items.length]);

  useEffect(() => {
    const onVis = () => {
      if (!document.hidden) setWake((w) => w + 1);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const jump = (i: number) => {
    setIdx(i);
    if (mode === "play") setStep(0);
  };

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

  const { business, lock } = current;
  const multi = items.length > 1;

  return (
    <figure ref={rootRef} className={`m-0 flex flex-col items-center ${className ?? ""}`}>
      <div className="chatphone" data-ssr={mode === "ssr" ? "" : undefined} aria-hidden>
        <Phone clock={locked ? lock.clock : current.clock} size={size}>
          <div className="chat-fade absolute inset-0" data-out={fading ? "" : undefined}>
            <ChatView
              business={business}
              beats={current.beats.slice(0, shown)}
              typing={typing}
              animate={mode === "play"}
              keyPrefix={`${idx}-${step < 0 ? "s" : "p"}`}
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

      <figcaption className="mt-5 flex flex-col items-center gap-2">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
          {multi ? `Sample conversation · ${items[idx].label}` : label}
        </span>
        <span className="sr-only">
          {items.map((it) => it.conversation.summary).join(" ")}
        </span>
        {multi && (
          <div className="flex max-w-[22rem] flex-wrap justify-center gap-1.5" role="group" aria-label="Choose a sample conversation">
            {items.map((it, i) => (
              <button
                key={it.label}
                type="button"
                onClick={() => jump(i)}
                aria-pressed={i === idx}
                className="hero-chip"
              >
                {it.label}
              </button>
            ))}
          </div>
        )}
      </figcaption>
    </figure>
  );
}
