"use client";

import { useEffect, useRef } from "react";
import { CLOUDS, STAR_SPEEDS } from "./flightData";

/**
 * Drives the flight (FlightStory.tsx renders the markup on the server, so
 * the star field and SVGs cost nothing to hydrate). See FlightStory for the
 * story and the performance notes.
 */

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
/** 0 to 1 between a and b, eased (smoothstep). */
const ramp = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** Opacity, and out of the compositor entirely once fully faded. */
const fade = (el: HTMLElement, o: number) => {
  el.style.opacity = o.toFixed(3);
  el.style.visibility = o < 0.005 ? "hidden" : "visible";
};

export function FlightController() {
  const markRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = markRef.current?.closest<HTMLElement>(".fl");
    if (!root) return;
    const still =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) return;

    const q = <T extends Element>(sel: string) => root.querySelector<T>(sel)!;
    const qa = <T extends Element>(sel: string) => Array.from(root.querySelectorAll<T>(sel));
    const stage = q<HTMLElement>(".fl-stage");
    const dusk = q<HTMLElement>(".fl-dusk");
    const glow = q<HTMLElement>(".fl-glow");
    const starEls = qa<HTMLElement>(".fl-stars");
    const cloudEls = qa<HTMLElement>(".fl-cloud");
    const earth = q<HTMLElement>(".fl-earth");
    const pad = q<HTMLElement>(".fl-pad");
    const ship = q<HTMLElement>(".fl-ship");
    const booster = q<HTMLElement>(".fl-booster");
    const boostFlame = q<SVGGElement>(".fl-bflame");
    const upFlame = q<SVGGElement>(".fl-uflame");
    const jet = q<HTMLElement>(".fl-jet");
    const orbit = q<HTMLElement>(".fl-orbit");
    const tags = qa<HTMLElement>(".fl-tag");
    const copies = qa<HTMLElement>(".fl-step");
    const fills = qa<HTMLElement>(".fl-seg-fill");
    const segs = qa<HTMLElement>(".fl-seg");

    let top = 0;
    let travel = 1;
    let vh = 800;
    let desktop = false;
    let active = -1;
    let raf = 0;
    let onScreen = false;

    const measure = () => {
      const r = root.getBoundingClientRect();
      top = r.top + window.scrollY;
      vh = stage.clientHeight || window.innerHeight;
      travel = Math.max(1, root.offsetHeight - vh);
      desktop = window.innerWidth >= 1024;
    };

    const setStage = (i: number) => {
      if (i === active) return;
      const prev = active;
      active = i;
      root.dataset.stage = String(i);
      segs.forEach((s, k) => s.toggleAttribute("data-on", k === i));
      // the "click" of a stage locking in: a small shudder on separation
      if (prev === 1 && i === 2) {
        ship.classList.remove("fl-kick");
        void ship.offsetWidth; // restart the one-shot keyframe
        ship.classList.add("fl-kick");
      }
    };

    const render = () => {
      raf = 0;
      const p = clamp01((window.scrollY - top) / travel);

      // sky: dusk fades into space, stars come out, horizon glow sinks
      const space = ramp(0.12, 0.6, p);
      fade(dusk, 1 - space);
      fade(glow, 1 - ramp(0.05, 0.45, p));
      glow.style.transform = `translate3d(0, ${(ramp(0, 0.5, p) * vh * 0.35).toFixed(1)}px, 0)`;
      starEls.forEach((el, i) => {
        const sp = STAR_SPEEDS[i];
        el.style.opacity = (0.15 + space * 0.85).toFixed(3);
        el.style.transform = `translate3d(0, ${(p * vh * sp).toFixed(1)}px, 0)`;
      });

      // clouds rush down past the rocket during launch and ascent
      cloudEls.forEach((el, i) => {
        const c = CLOUDS[i];
        const y = (p - c.start) * c.k * vh;
        const o = ramp(0.02, 0.12, p) * (1 - ramp(0.4, 0.58, p));
        fade(el, o * 0.9);
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
      });

      // ground falls away and curves into the Earth's rim
      const climb = ramp(0.02, 0.78, p);
      earth.style.transform = `translate3d(0, ${(lerp(0, desktop ? 0.2 : -0.04, climb) * vh).toFixed(1)}px, 0) scaleY(${lerp(0.16, desktop ? 0.7 : 0.5, climb).toFixed(3)})`;
      pad.style.transform = `translate3d(0, ${(ramp(0, 0.3, p) * vh * 0.7).toFixed(1)}px, 0)`;
      fade(pad, 1 - ramp(0.15, 0.3, p));

      // the ship: clears the pad, gravity turn, engine cut at orbit
      const lift = ramp(0, 0.22, p);
      const turn = ramp(0.3, 0.86, p);
      const sway = Math.sin(p * 26) * 2.5 * (1 - turn);
      const shipX = sway + turn * (desktop ? 40 : 18);
      const shipY = lerp(0.2, 0, lift) * vh - turn * vh * 0.04;
      ship.style.transform = `translate3d(${shipX.toFixed(1)}px, ${shipY.toFixed(1)}px, 0) rotate(${(turn * 64).toFixed(2)}deg)`;

      // first stage separates between ascent and orbit
      const sep = ramp(0.6, 0.78, p);
      booster.style.transform = `translate3d(${(-sep * 26).toFixed(1)}px, ${(sep * vh * 0.42).toFixed(1)}px, 0) rotate(${(-sep * 38).toFixed(2)}deg)`;
      fade(booster, 1 - ramp(0.66, 0.8, p));
      const thrust = lerp(0.85, 1.5, ramp(0.05, 0.45, p)) * (1 - ramp(0.56, 0.62, p));
      boostFlame.style.transform = `scale(${(0.8 + thrust * 0.2).toFixed(3)}, ${thrust.toFixed(3)})`;
      const upper = ramp(0.6, 0.64, p) * (1 - ramp(0.8, 0.86, p));
      upFlame.style.transform = `scale(1, ${(upper * 1.2).toFixed(3)})`;
      fade(jet, ramp(0.02, 0.1, p) * (1 - ramp(0.55, 0.62, p)));
      jet.style.transform = `scaleY(${(0.4 + thrust * 0.9).toFixed(3)})`;

      // orbit ring and what keeps running
      const orb = ramp(0.72, 0.88, p);
      fade(orbit, orb);
      orbit.style.transform = `scale(${lerp(0.86, 1, orb).toFixed(3)})`;
      tags.forEach((el, i) => {
        const t = ramp(0.78 + i * 0.04, 0.86 + i * 0.04, p);
        fade(el, t);
        el.style.transform = `translate3d(0, ${((1 - t) * 10).toFixed(1)}px, 0)`;
      });

      // words: one stage at a time, entering from below, leaving upward
      const o = [
        1 - ramp(0.26, 0.32, p),
        ramp(0.34, 0.4, p) * (1 - ramp(0.6, 0.66, p)),
        ramp(0.68, 0.74, p),
      ];
      copies.forEach((el, i) => {
        const leaving = (i === 0 && p > 0.2) || (i === 1 && p > 0.5);
        const y = (1 - o[i]) * (leaving ? -18 : 18);
        fade(el, o[i]);
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
      });

      fills.forEach((el, i) => {
        el.style.transform = `scaleX(${clamp01((p - i / 3) * 3).toFixed(3)})`;
      });
      setStage(p < 0.33 ? 0 : p < 0.67 ? 1 : 2);
    };

    const onScroll = () => {
      if (onScreen && !raf) raf = requestAnimationFrame(render);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    const io = new IntersectionObserver(
      ([e]) => {
        onScreen = e.isIntersecting;
        root.toggleAttribute("data-on", onScreen);
        if (onScreen) {
          measure();
          render();
        }
      },
      { rootMargin: "20% 0px" },
    );
    const ro = new ResizeObserver(onResize);

    root.setAttribute("data-live", "");
    measure();
    render();
    io.observe(root);
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <span ref={markRef} hidden />;
}
