"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroSignal = dynamic(() => import("./HeroSignal"), { ssr: false });

/**
 * Downloads the hero overlay (and, inside it, Anime.js) well clear of the
 * first paint (3.5s after load, or on a tap or key press), and only in an
 * idle moment when the visitor is not scrolling, so evaluating it never
 * lands in the middle of the scroll story.
 */
const WAKE = ["pointerdown", "touchstart", "keydown"] as const;

export function LazyHeroSignal() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    let lastScroll = 0;
    let scheduled = false;
    const onScroll = () => {
      lastScroll = performance.now();
    };
    const attempt = () => {
      if (performance.now() - lastScroll < 300) {
        timer = window.setTimeout(attempt, 300);
        return;
      }
      const ric = window.requestIdleCallback;
      if (ric) ric(() => (performance.now() - lastScroll < 300 ? attempt() : setReady(true)), { timeout: 1500 });
      else setReady(true);
    };
    const go = () => {
      if (scheduled) return;
      scheduled = true;
      attempt();
    };
    const arm = () => {
      timer = window.setTimeout(go, 3500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    WAKE.forEach((e) => window.addEventListener(e, go, { passive: true, once: true }));
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      WAKE.forEach((e) => window.removeEventListener(e, go));
      window.removeEventListener("load", arm);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  return ready ? <HeroSignal /> : null;
}
