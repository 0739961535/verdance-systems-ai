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
/** 0 to 1 between a and b, linear (for things that travel at constant speed). */
const lin = (a: number, b: number, v: number) => clamp01((v - a) / (b - a));
/** A one-shot pulse: up quickly from a to peak, then an eased fall to end. */
const pulse = (a: number, peak: number, end: number, v: number) =>
  v <= a || v >= end ? 0 : v < peak ? ramp(a, peak, v) : 1 - ramp(peak, end, v);

/* Story beats, as scroll progress (0 to 1). */
const PIERCE = 0.48; // the rocket breaks through the sky into space
const BURST = 0.87; // the finale: the upper stage's full-power burn
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
    const scene = q<HTMLElement>(".fl-scene");
    const wrap = q<HTMLElement>(".fl-ship-wrap");
    const veil = q<HTMLElement>(".fl-veil");
    const wash = q<HTMLElement>(".fl-wash");
    const collars = qa<HTMLElement>(".fl-collar");
    const flash = q<HTMLElement>(".fl-flash");
    const shocks = qa<HTMLElement>(".fl-shock");
    const mach = q<SVGGElement>(".fl-umach");
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
    let noseY = 300; // the rocket's nose, in stage pixels, once airborne
    let active = -1;
    let raf = 0;
    let onScreen = false;

    const measure = () => {
      const r = root.getBoundingClientRect();
      top = r.top + window.scrollY;
      vh = stage.clientHeight || window.innerHeight;
      travel = Math.max(1, root.offsetHeight - vh);
      desktop = window.innerWidth >= 1024;
      noseY = wrap.offsetTop;
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

      // sky: blue thins to indigo, then black once we are through; stars
      // come out; the horizon glow sinks away
      // most of the blue goes on the climb, the last of it at the break-through
      const space = 0.65 * ramp(0.12, PIERCE - 0.02, p) + 0.35 * ramp(PIERCE - 0.01, PIERCE + 0.04, p);
      fade(dusk, 1 - space);
      fade(glow, 1 - ramp(0.05, 0.45, p));
      glow.style.transform = `translate3d(0, ${(ramp(0, 0.5, p) * vh * 0.35).toFixed(1)}px, 0)`;
      // after the break-through everything slows: the silence of space
      const travelled = Math.min(p, PIERCE) + Math.max(0, p - PIERCE) * 0.35;
      starEls.forEach((el, i) => {
        const sp = STAR_SPEEDS[i];
        el.style.opacity = (0.15 + space * 0.85).toFixed(3);
        el.style.transform = `translate3d(0, ${(travelled * vh * sp).toFixed(1)}px, 0)`;
      });

      // cloud layers rush past; the near ones pass in front of the rocket,
      // faster and growing as they come at the viewer (depth)
      cloudEls.forEach((el, i) => {
        const c = CLOUDS[i];
        const t = p - c.start;
        const y = t * c.k * vh;
        const s = c.front ? lerp(0.9, 1.9, clamp01(t * 3)) : lerp(0.9, 1.25, clamp01(t * 3));
        const o = ramp(0.02, 0.1, p) * (1 - ramp(0.36, 0.46, p));
        fade(el, o * (c.front ? 0.55 : 0.9));
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${s.toFixed(3)})`;
      });

      // the break-through: a luminous boundary in the sky sweeps down past
      // the rocket; as it crosses the nose a collar of light ripples down the
      // body and a soft wash of light passes over the scene
      const veilY = noseY - vh * 0.2 + (p - PIERCE) * vh * 9;
      fade(veil, pulse(PIERCE - 0.08, PIERCE - 0.03, PIERCE + 0.09, p));
      veil.style.transform = `translate3d(0, ${veilY.toFixed(1)}px, 0)`;
      collars.forEach((el, i) => {
        const k = lin(PIERCE - 0.004 + i * 0.008, PIERCE + 0.05 + i * 0.008, p);
        fade(el, k > 0 && k < 1 ? (1 - k) * (1 - k) * 0.95 : 0);
        el.style.transform = `translate3d(0, ${(k * 46).toFixed(1)}px, 0) scale(${(0.5 + k * 2.4).toFixed(3)})`;
      });

      // the finale burst: one confident full-power burn, then it settles
      const surge = pulse(BURST - 0.012, BURST, BURST + 0.06, p);
      const kFlash = pulse(BURST - 0.01, BURST + 0.002, BURST + 0.045, p);
      fade(flash, kFlash);
      flash.style.transform = `scale(${(0.4 + lin(BURST - 0.01, BURST + 0.04, p) * 1.3).toFixed(3)})`;
      shocks.forEach((el, i) => {
        const k = lin(BURST - 0.004 + i * 0.012, BURST + 0.065 + i * 0.012, p);
        const e = 1 - (1 - k) * (1 - k) * (1 - k); // fast out, slow finish
        fade(el, k > 0 && k < 1 ? (1 - k) * (1 - k) * 0.95 : 0);
        el.style.transform = `scale(${(0.25 + e * 4.6).toFixed(3)})`;
      });
      mach.style.opacity = surge.toFixed(3);
      fade(wash, Math.max(pulse(PIERCE - 0.02, PIERCE + 0.004, PIERCE + 0.05, p) * 0.32, kFlash * 0.55 + surge * 0.12));
      // a short, damped camera nudge on ignition (scene only, never the words)
      const sk = lin(BURST - 0.004, BURST + 0.05, p);
      if (sk > 0 && sk < 1) {
        const a = (1 - sk) * (1 - sk) * (desktop ? 5 : 3.5);
        scene.style.transform = `translate3d(${(Math.sin(sk * Math.PI * 7) * a).toFixed(2)}px, ${(Math.cos(sk * Math.PI * 9) * a * 0.6).toFixed(2)}px, 0)`;
      } else if (scene.style.transform) scene.style.transform = "";

      // ground falls away and curves into the Earth's rim
      const climb = ramp(0.02, 0.78, p);
      earth.style.transform = `translate3d(0, ${(lerp(0, desktop ? 0.2 : -0.04, climb) * vh).toFixed(1)}px, 0) scaleY(${lerp(0.16, desktop ? 0.7 : 0.5, climb).toFixed(3)})`;
      pad.style.transform = `translate3d(0, ${(ramp(0, 0.3, p) * vh * 0.7).toFixed(1)}px, 0)`;
      fade(pad, 1 - ramp(0.15, 0.3, p));

      // the ship: clears the pad, gravity turn, engine cut at orbit. Weighted
      // and exact: every value is a pure function of scroll (no springs, no
      // wobble), so it tracks the scrollbar like a product film being scrubbed.
      const lift = ramp(0, 0.22, p);
      const turn = ramp(0.3, 0.86, p);
      const shipX = turn * (desktop ? 40 : 14);
      const shipY = lerp(0.2, 0, lift) * vh - turn * vh * 0.04;
      // depth: it recedes a little as it climbs to orbit
      const depth = lerp(1, desktop ? 0.82 : 0.86, ramp(0.2, 0.9, p));
      ship.style.transform = `translate3d(${shipX.toFixed(1)}px, ${shipY.toFixed(1)}px, 0) rotate(${(turn * 64).toFixed(2)}deg) scale(${depth.toFixed(4)})`;

      // first stage separates between ascent and orbit: a clean break, then
      // the two drift gently apart (the stage falls back and turns away slowly)
      const sep = ramp(0.6, 0.84, p);
      const drift = sep * sep;
      booster.style.transform = `translate3d(${(-drift * 10).toFixed(1)}px, ${(2 + sep * vh * 0.22).toFixed(1)}px, 0) rotate(${(-drift * 12).toFixed(2)}deg)`;
      fade(booster, 1 - ramp(0.7, 0.86, p));
      const thrust = lerp(0.85, 1.5, ramp(0.05, 0.45, p)) * (1 - ramp(0.56, 0.62, p));
      boostFlame.style.transform = `scale(${(0.8 + thrust * 0.2).toFixed(3)}, ${thrust.toFixed(3)})`;
      // upper stage: a soft light-up after separation, the burst, then a calm burn
      const upper = ramp(0.62, 0.68, p);
      const settle = 0.75 + 0.3 * ramp(BURST, BURST + 0.08, p);
      upFlame.style.transform = `scale(${(1 + surge * 0.55).toFixed(3)}, ${(upper * (settle + surge * 1.9)).toFixed(3)})`;
      fade(jet, ramp(0.02, 0.1, p) * (1 - ramp(0.55, 0.62, p)));
      jet.style.transform = `scaleY(${(0.4 + thrust * 0.9).toFixed(3)})`;

      // orbit ring and what keeps running
      const orb = ramp(0.72, 0.88, p);
      fade(orbit, orb);
      orbit.style.transform = `scale(${lerp(0.86, 1, orb).toFixed(3)})`;
      tags.forEach((el, i) => {
        const t = ramp(BURST + 0.04 + i * 0.025, BURST + 0.08 + i * 0.025, p);
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
