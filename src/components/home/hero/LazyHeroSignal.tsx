"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroSignal = dynamic(() => import("./HeroSignal"), { ssr: false });

/**
 * Waits until the page has loaded and the main thread is idle before it
 * downloads the hero overlay (and, inside it, Anime.js). The headline and
 * laptop are already painted by then, so this never touches LCP.
 */
export function LazyHeroSignal() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    let timer: number | undefined;
    const go = () => {
      const ric = window.requestIdleCallback;
      if (ric) idleId = ric(() => setReady(true), { timeout: 2500 });
      else timer = window.setTimeout(() => setReady(true), 600);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  return ready ? <HeroSignal /> : null;
}
