/**
 * Daniel's real photos (never an AI face or a stock photo). Each value is a
 * base path in public/people/: the sizes are built by
 * scripts/build-founder-images.mjs as <base>-<width>.avif and .webp
 * (portrait 400 and 800, face 96 and 192). Empty shows the monogram.
 */
export const FOUNDER = {
  name: "Daniel Bouwer",
  role: "Founder, Verdance Systems AI",
  initials: "DB",
  /** The large "Who we are" portrait (home booking section, About). */
  portrait: "/people/daniel-portrait",
  /** The small face in the booking card. Falls back to the portrait. */
  face: "/people/daniel-face",
};
