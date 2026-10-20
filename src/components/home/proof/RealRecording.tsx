"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { useReducedMotionPref } from "@/lib/useReducedMotionPref";

/**
 * A real screen recording in a phone frame: poster first, the video only
 * loads when it comes near the screen, plays muted on a loop while it is in
 * view and pauses when it leaves. Under reduced motion it waits for a tap.
 * The recordings here are anonymised (names blurred, every number replaced
 * by a moving "live data" shimmer). Nothing from needs-peter-ok is used.
 */
export function RealRecording({ src, poster, label, caption }: { src: { webm: string; mp4: string }; poster: string; label: string; caption: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotionPref();
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const near = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setLoad(true);
        near.disconnect();
      }
    }, { rootMargin: "50% 0px" });
    near.observe(v);
    const seen = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) v.pause();
      else if (!reduce) v.play().catch(() => {});
    }, { threshold: 0.35 });
    seen.observe(v);
    return () => {
      near.disconnect();
      seen.disconnect();
    };
  }, [reduce, load]);

  return (
    <figure className="m-0">
      <div className="relative mx-auto w-[min(62vw,232px)] overflow-hidden rounded-[30px] border border-[color:var(--hairline-2)] bg-[#0b0d12] p-[6px] shadow-[0_30px_70px_rgba(14,14,16,0.22)]">
        <video
          ref={ref}
          className="block aspect-[720/1560] w-full rounded-[24px] bg-[#0b0d12] object-cover"
          poster={load ? poster : undefined}
          muted
          loop
          playsInline
          preload="none"
          aria-label={label}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          {load ? (
            <>
              <source src={src.webm} type="video/webm" />
              <source src={src.mp4} type="video/mp4" />
            </>
          ) : null}
        </video>
        {!playing && reduce ? (
          <button
            type="button"
            onClick={() => ref.current?.play().catch(() => {})}
            className="absolute inset-0 m-auto grid h-14 w-14 place-items-center rounded-full bg-white/90 text-[#0E0E10] shadow-lg"
            aria-label={`Play: ${label}`}
          >
            <Play size={20} aria-hidden />
          </button>
        ) : null}
      </div>
      <figcaption className="museum mt-3 text-center">{caption}</figcaption>
    </figure>
  );
}
