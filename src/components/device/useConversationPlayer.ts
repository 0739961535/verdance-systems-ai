"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Beat, Conversation } from "@/data/conversations";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";

/**
 * useConversationPlayer - the play-head shared by ChatPhone (phones) and
 * LaptopInbox (the homepage laptop). Waits for load + idle, pauses off
 * screen and in background tabs, static under reduced motion, and moves to
 * the next conversation in a rotation when one finishes.
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

export type RotationItem = { label: string; conversation: Conversation };


export function useConversationPlayer(items: RotationItem[]) {
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


  return { idx, current, shown, typing, locked, fading, mode, step, jump, rootRef };
}
