/** Shared by the server markup and the client controller of the flight. */
export const STAR_SPEEDS = [0.12, 0.3, 0.6];
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
