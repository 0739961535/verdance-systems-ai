import { createDrawable, createMotionPath, createTimeline, type Timeline } from "animejs";

/**
 * The hero's signature loop, choreographed with Anime.js (MIT): each channel
 * chip pings, an enquiry travels along its curve into the inbox while the
 * trail draws and retracts behind it, the screen ripples, an "Answered" tag
 * rises and the example counter ticks up. Five channels, overlapping, on
 * one looping timeline so the timing stays exact however long it runs.
 *
 * Kept in its own module so Anime.js is only downloaded when the hero
 * overlay mounts (after the page has loaded), never on the critical path.
 */

export type HeroTimelineEls = {
  chips: HTMLElement[];
  rings: HTMLElement[];
  dots: SVGGElement[];
  trails: SVGPathElement[];
  ripple: SVGCircleElement;
  tag: HTMLElement;
  /** Where the tag rises from, in stage pixels. */
  target: { x: number; y: number };
  /** Reply time shown per channel, in seconds (always under 60). */
  secs: number[];
  onAnswered: (i: number) => void;
};

const GAP = 1150; // ms between enquiries
const TRAVEL = 950; // ms for an enquiry to reach the inbox

export function buildHeroTimeline(els: HeroTimelineEls): Timeline {
  const n = els.dots.length;
  const tl = createTimeline({ loop: true, autoplay: false, defaults: { ease: "outQuad" } });

  for (let i = 0; i < n; i++) {
    const at = i * GAP;
    const drawable = createDrawable(els.trails[i]);
    const motionPath = createMotionPath(els.trails[i]);

    tl
      // chip pings: a little lift and a ring that breathes out
      .add(els.chips[i], { scale: [1, 1.1, 1], duration: 520, ease: "outBack(2)" }, at)
      .add(els.rings[i], { opacity: [0.9, 0], scale: [1, 1.7], duration: 760, ease: "outExpo" }, at)
      // the enquiry travels in, trail drawing behind it
      .add(els.dots[i], { ...motionPath, opacity: [0, 1, 1, 0.9], duration: TRAVEL, ease: "inOutSine" }, at + 120)
      .add(drawable, { draw: ["0 0", "0 1"], duration: TRAVEL, ease: "inOutSine" }, at + 120)
      .add(drawable, { draw: ["0 1", "1 1"], duration: 520, ease: "inQuad" }, at + 120 + TRAVEL)
      .add(els.dots[i], { opacity: 0, duration: 200 }, at + 120 + TRAVEL)
      // lands: the screen ripples, the tag rises, the counter ticks
      .add(els.ripple, { r: [4, 46], opacity: [0.55, 0], duration: 900, ease: "outExpo" }, at + 120 + TRAVEL)
      .call(() => {
        els.tag.textContent = `Answered in ${els.secs[i]}s`;
        els.onAnswered(i);
      }, at + 120 + TRAVEL)
      .add(
        els.tag,
        {
          x: [els.target.x, els.target.x],
          y: [els.target.y - 6, els.target.y - 34],
          opacity: [0, 1, 1, 0],
          duration: 1050,
          ease: "outCubic",
        },
        at + 120 + TRAVEL,
      );
  }

  // a short breath before the loop starts again
  tl.add({ duration: 900 }, n * GAP + TRAVEL);
  return tl;
}
