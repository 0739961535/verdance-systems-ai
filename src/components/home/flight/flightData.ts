/** Shared by the server markup and the client controller of the flight. */
export const STAR_SPEEDS = [0.12, 0.3, 0.6];
/** The rocket stack's height as a multiple of its grid width (RocketArt STACK_H / 80). */
export const STACK_RATIO = 348.37 / 80;

/**
 * The three star layers (far, mid, near). Rendered once to static files in
 * public/flight/ by scripts/build-stars.mjs (npm run flight:stars), so
 * the 126 stars stay out of the page's HTML. Deterministic.
 */
export const STAR_LAYERS = [
  { seed: 7, count: 70, maxR: 0.55 },
  { seed: 31, count: 40, maxR: 0.85 },
  { seed: 97, count: 16, maxR: 1.25 },
];
export const starSrc = (i: number) => `/flight/stars-${i}.svg`;
export function stars(seed: number, count: number, maxR: number) {
  let s = seed;
  const rnd = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  return Array.from({ length: count }, () => ({
    x: +(rnd() * 400).toFixed(1),
    y: +(rnd() * 900).toFixed(1),
    r: +(0.35 + rnd() * maxR).toFixed(2),
    o: +(0.35 + rnd() * 0.65).toFixed(2),
  }));
}
// start: scroll progress at which the wisp enters from the top; k: its speed;
// front: a near layer that passes in front of the rocket
export const CLOUDS: { x: string; w: string; start: number; k: number; front?: boolean }[] = [
  { x: "4%", w: "64%", start: 0.04, k: 3.4 },
  { x: "44%", w: "72%", start: 0.12, k: 4.2 },
  { x: "-30%", w: "110%", start: 0.1, k: 6.4, front: true },
  { x: "-12%", w: "60%", start: 0.2, k: 3.8 },
  { x: "36%", w: "56%", start: 0.28, k: 4.6 },
  { x: "20%", w: "120%", start: 0.27, k: 7, front: true },
];
