"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import s from "./charts.module.css";

/**
 * Chart islands: each chart's JavaScript (and Motion with it) only downloads
 * once its card is about to scroll into view. The card and its fixed-height
 * chart area are server-rendered, so nothing moves when a chart arrives.
 */
const ReplyRace = dynamic(() => import("./ReplyRace"), { ssr: false });
const HourlyCoverage = dynamic(() => import("./HourlyCoverage"), { ssr: false });
const PipelineFunnel = dynamic(() => import("./PipelineFunnel"), { ssr: false });

function WhenNear({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="absolute inset-0">
      {near ? children : <div className={s.placeholder} aria-hidden />}
    </div>
  );
}

export function RaceIsland() {
  return (
    <WhenNear>
      <ReplyRace />
    </WhenNear>
  );
}
export function HoursIsland() {
  return (
    <WhenNear>
      <HourlyCoverage />
    </WhenNear>
  );
}
export function FunnelIsland() {
  return (
    <WhenNear>
      <PipelineFunnel />
    </WhenNear>
  );
}
