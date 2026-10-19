"use client";

import { FunnelChart } from "@/components/charts/bklit/funnel-chart";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";
import { PIPELINE } from "@/data/exampleCharts";

/**
 * Example month as a pipeline, drawn with Bklit UI's funnel (MIT, vendored
 * in components/charts/bklit). Segments sweep in on a stagger when the
 * island mounts (it only mounts once scrolled near). Hover a stage to lift it.
 */
export default function PipelineFunnel() {
  const reduce = useReducedMotionPref();
  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1">
        <FunnelChart
          data={PIPELINE.map((p, i) => ({
            ...p,
            gradient: [
              { offset: "0%", color: i === 1 ? "#3DD68C" : "#86ABFF" },
              { offset: "100%", color: i === 1 ? "#1FA76A" : "#2F6BEA" },
            ],
          }))}
          color="#5B8FFF"
          layers={3}
          gap={5}
          staggerDelay={reduce ? 0 : 0.12}
          enterTransition={
            reduce
              ? { duration: 0 }
              : { type: "spring", visualDuration: 0.8, bounce: 0.15 }
          }
          labelLayout="grouped"
          showLabels={false}
          grid={{
            bands: true,
            bandColor: "rgba(var(--hairline-rgb), 0.03)",
            lines: true,
            lineColor: "var(--hairline-2)",
          }}
          style={{ aspectRatio: "auto", height: "100%" }}
        />
      </div>
      <ol
        className="mt-2 grid grid-cols-5 gap-[5px]"
        aria-label="Example pipeline stages"
      >
        {PIPELINE.map((p) => (
          <li
            key={p.label}
            className="text-center text-[0.7rem] leading-tight text-[color:var(--color-ink-muted)] md:text-[0.75rem]"
          >
            <span className="sr-only">{p.value} </span>
            {p.label}
          </li>
        ))}
      </ol>
    </div>
  );
}
