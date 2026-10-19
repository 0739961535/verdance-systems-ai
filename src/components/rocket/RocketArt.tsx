import type { Ref } from "react";

/**
 * The Verdance launch vehicle: a photoreal studio render (generated for us on
 * Higgsfield, upscaled to 4K, black background keyed out to clean alpha by
 * scripts/assets/key-rocket.mjs and split at the interstage into two
 * stages). The images ship as AVIF/WebP in public/rocket (built by
 * scripts/assets/build-images.mjs). Only the exhaust is drawn here, as
 * inline SVG, because it animates.
 *
 * Grid: 80 units wide (the body is 22 units, centred), so the plumes line up
 * with the images at any size:
 *   upper stage 0..UPPER_H, first stage 0..BOOSTER_H, stacked with no overlap.
 * The plume shapes were drawn with their tops at y 141 (upper) and 163
 * (first stage); each is shifted to sit at the bottom of its image.
 */
export const UPPER_H = 168.98;
export const BOOSTER_H = 179.39;
export const STACK_H = UPPER_H + BOOSTER_H;
export const UPPER_VIEWBOX = `0 0 80 ${UPPER_H}`;
export const BOOSTER_VIEWBOX = `0 0 80 ${BOOSTER_H}`;
/** Where the first stage's top edge sits on the upper stage's grid. */
export const BOOSTER_OFFSET = UPPER_H;

/** Responsive image sources (widths in px) for a rocket part. */
export const rocketSet = (name: "upper" | "booster" | "stack", ext: "avif" | "webp") =>
  (name === "stack" ? [120, 240] : [360, 720]).map((w) => `/rocket/${name}-${w}.${ext} ${w}w`).join(", ");

/** Vacuum plume of the upper stage (inline, animated). `flameClass` wraps it. */
export function UpperPlume({ id, flameClass, flickerClass, machClass }: { id: string; flameClass?: string; flickerClass?: string; machClass?: string }) {
  const p = `${id}-u`;
  return (
    <g transform={`translate(0 ${(UPPER_H - 141).toFixed(2)})`}>
      <defs>
        <linearGradient id={`${p}-vac`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DCE7FF" stopOpacity="0.7" />
          <stop offset="0.35" stopColor="#86ABFF" stopOpacity="0.3" />
          <stop offset="1" stopColor="#4F8DFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${p}-vcore`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor="#CFE0FF" stopOpacity="0.7" />
          <stop offset="1" stopColor="#CFE0FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* wide and faint, as it is in near-vacuum. Stacked cones of falling
          opacity give it soft edges without a blur filter. */}
      <g className={flameClass}>
        <path d="M31 141 C22 162 14 190 8 220 C24 228 56 228 72 220 C66 190 58 162 49 141 Z" fill={`url(#${p}-vac)`} opacity="0.35" />
        <path d="M32.5 141 C26.5 160 21 184 17 210 C30 216 50 216 63 210 C59 184 53.5 160 47.5 141 Z" fill={`url(#${p}-vac)`} opacity="0.5" />
        <path d="M34 141 C30.5 156 27.5 174 25.5 194 C34 198 46 198 54.5 194 C52.5 174 49.5 156 46 141 Z" fill={`url(#${p}-vac)`} opacity="0.7" />
        <g className={flickerClass}>
          <path d="M35.5 141 C35.5 153 37.8 164 40 176 C42.2 164 44.5 153 44.5 141 Z" fill={`url(#${p}-vcore)`} />
        </g>
        {/* shock diamonds: only seen at full power (opacity set by script) */}
        <g className={machClass} fill="#FFFFFF" opacity={machClass ? 0 : undefined}>
          <path d="M40 146 L42.2 150.5 L40 155 L37.8 150.5 Z" fillOpacity="0.9" />
          <path d="M40 158 L41.8 162 L40 166 L38.2 162 Z" fillOpacity="0.65" />
          <path d="M40 169 L41.3 172.2 L40 175.4 L38.7 172.2 Z" fillOpacity="0.4" />
        </g>
      </g>
    </g>
  );
}

/**
 * First-stage exhaust (inline, animated). `flameClass` wraps the whole plume
 * (scaled from its top edge by script), `flickerClass` the white core,
 * `outerClass` the outer plume. Soft gradients only: no hard flame shapes.
 */
export function BoosterPlume({
  id,
  flameRef,
  flameClass,
  flickerClass,
  outerClass,
}: {
  id: string;
  flameRef?: Ref<SVGGElement>;
  flameClass?: string;
  flickerClass?: string;
  outerClass?: string;
}) {
  const p = `${id}-b`;
  // sits under the engine cluster, a little wider than the drawn plume
  return (
    <g transform={`translate(0 ${(BOOSTER_H - 163).toFixed(2)}) translate(40 0) scale(1.25 1) translate(-40 0)`}>
      <defs>
        <linearGradient id={`${p}-plume`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EEF3FF" stopOpacity="0.9" />
          <stop offset="0.2" stopColor="#B4CAFF" stopOpacity="0.62" />
          <stop offset="0.55" stopColor="#6E9CFF" stopOpacity="0.22" />
          <stop offset="1" stopColor="#4F8DFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${p}-core`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.55" stopColor="#E3ECFF" stopOpacity="0.85" />
          <stop offset="1" stopColor="#CFE0FF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${p}-glow`} cx="0.5" cy="0.32" r="0.5">
          <stop offset="0" stopColor="#C8D8FF" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#6E9CFF" stopOpacity="0.14" />
          <stop offset="1" stopColor="#5B8FFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${p}-hot`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="1" stopColor="#CFE0FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* exhaust, behind the engines */}
      <g ref={flameRef} className={flameClass}>
        <ellipse cx="40" cy="190" rx="24" ry="38" fill={`url(#${p}-glow)`} />
        <g className={outerClass}>
          <path d="M29.5 163 C25.5 188 30 220 40 256 C50 220 54.5 188 50.5 163 Z" fill={`url(#${p}-plume)`} opacity="0.35" />
          <path d="M30.5 163 C28.5 186 33.5 216 40 244 C46.5 216 51.5 186 49.5 163 Z" fill={`url(#${p}-plume)`} />
        </g>
        <g className={flickerClass}>
          <path d="M34 163 C33.6 176 36.8 190 40 203 C43.2 190 46.4 176 46 163 Z" fill={`url(#${p}-core)`} />
        </g>
        <ellipse cx="40" cy="163.4" rx="11" ry="2.4" fill={`url(#${p}-hot)`} />
      </g>
    </g>
  );
}
