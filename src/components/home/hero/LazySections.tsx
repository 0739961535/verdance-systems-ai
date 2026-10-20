"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/**
 * The Operations Team showcase and How it connects are the heaviest parts
 * of the page (live mocks and the flow diagram). Their code loads only when
 * the reader is about a screen and a half away, so the first paint of the
 * page never waits for them. The placeholder holds roughly their height.
 */
const OpsTeamShowcase = dynamic(() => import("../opsteam").then((m) => m.OpsTeamShowcase), { ssr: false });
const HowItConnects = dynamic(() => import("../connect").then((m) => m.HowItConnects), { ssr: false });

export function LazySections() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "150% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="band-night" style={show ? undefined : { minHeight: "320svh" }}>
      {show ? (
        <>
          <OpsTeamShowcase />
          <HowItConnects />
        </>
      ) : null}
    </div>
  );
}
