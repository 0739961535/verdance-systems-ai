import { BOOSTER_OFFSET } from "./RocketArt";

/**
 * The static hull of the Verdance launch vehicle (see RocketArt.tsx for the
 * design notes). Never imported by the site: scripts/build-rocket-svg.mjs
 * renders it to public/rocket/*.svg, which the site loads as cached images.
 */

const INK = "#1B2A4F";

/**
 * Studio-lit titanium white, as a product shot: a crisp key highlight on
 * the left, a soft fill strip on the right, a cool rim on the edge.
 */
function Hull({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#C4CAD6" />
      <stop offset="0.08" stopColor="#EEF1F5" />
      <stop offset="0.15" stopColor="#FFFFFF" />
      <stop offset="0.21" stopColor="#F1F3F7" />
      <stop offset="0.5" stopColor="#D5DAE3" />
      <stop offset="0.68" stopColor="#E4E8EE" />
      <stop offset="0.84" stopColor="#A3ACBD" />
      <stop offset="0.95" stopColor="#737E95" />
      <stop offset="1" stopColor="#A9BCE4" />
    </linearGradient>
  );
}

/** Brushed finish: hairline vertical grain, barely there. */
function Brushed({ id }: { id: string }) {
  return (
    <pattern id={id} width="0.7" height="9" patternUnits="userSpaceOnUse">
      <path d="M0.2 0 V9" stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="0.18" />
      <path d="M0.55 0 V9" stroke="#5A6478" strokeOpacity="0.06" strokeWidth="0.16" />
    </pattern>
  );
}

/** Engine bells: graphite with one narrow polished highlight. */
function Metal({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#3A3F4B" />
      <stop offset="0.24" stopColor="#A4ABB9" />
      <stop offset="0.36" stopColor="#5B616F" />
      <stop offset="0.8" stopColor="#24272F" />
      <stop offset="1" stopColor="#56688F" />
    </linearGradient>
  );
}

/** Space grey (interstage, legs, fins): anodised, soft sheen, cool rim. */
function Carbon({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#4A505D" />
      <stop offset="0.14" stopColor="#8A909E" />
      <stop offset="0.26" stopColor="#5A606D" />
      <stop offset="0.7" stopColor="#33373F" />
      <stop offset="0.92" stopColor="#262930" />
      <stop offset="1" stopColor="#62759F" />
    </linearGradient>
  );
}

/** Sky bounce on the shaded side: the blue around the rocket, reflected. */
function SkyBounce({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0.45" stopColor="#4F8DFF" stopOpacity="0" />
      <stop offset="0.9" stopColor="#4F8DFF" stopOpacity="0.14" />
      <stop offset="1" stopColor="#86ABFF" stopOpacity="0.1" />
    </linearGradient>
  );
}

/** A soft contact shadow that falls downward from a joint. */
function Contact({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#1A1D26" stopOpacity="0.26" />
      <stop offset="1" stopColor="#0E1630" stopOpacity="0" />
    </linearGradient>
  );
}

/** The Verdance "flow" mark, drawn small on the fairing. */
function FairingMark({ grad }: { grad: string }) {
  return (
    <g transform="translate(35.4 41.5) scale(0.19)" fill="none" stroke={`url(#${grad})`} strokeLinecap="round" strokeWidth="5">
      <path d="M8.5 8.5C11 21 16.5 30.5 22.6 36.4" />
      <path d="M39.5 8.5C37 21 31.5 30.5 25.4 36.4" />
      <path d="M24 13.5V29.5" strokeWidth="3.6" opacity="0.7" />
      <circle cx="24" cy="38.6" r="3.8" fill={`url(#${grad})`} stroke="none" />
    </g>
  );
}

/** Upper stage + payload fairing (static: rendered to public/rocket/). */
export function UpperBody({ id }: { id: string }) {
  const p = `${id}-u`;
  return (
    <g>
      <defs>
        <Hull id={`${p}-hull`} />
        <Brushed id={`${p}-brush`} />
        <Metal id={`${p}-metal`} />
        <SkyBounce id={`${p}-sky`} />
        <Contact id={`${p}-ao`} />
        <linearGradient id={`${p}-azure`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#86ABFF" />
          <stop offset="1" stopColor="#2F6BEA" />
        </linearGradient>
        <linearGradient id={`${p}-band`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3F78F0" />
          <stop offset="0.16" stopColor="#7FA6FF" />
          <stop offset="0.6" stopColor="#2F6BEA" />
          <stop offset="0.92" stopColor="#173A9E" />
          <stop offset="1" stopColor="#6E9CFF" />
        </linearGradient>
        <linearGradient id={`${p}-tipshade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={INK} stopOpacity="0.12" />
          <stop offset="0.5" stopColor={INK} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* vacuum engine bell */}
      <path d="M36 123 H44 L45 126 C46.5 132 48.3 137 50 141 H30 C31.7 137 33.5 132 35 126 Z" fill={`url(#${p}-metal)`} />
      <path d="M30.4 140.6 H49.6" stroke="#CFE0FF" strokeOpacity="0.5" strokeWidth="0.7" strokeLinecap="round" />

      {/* stage body */}
      <rect x="29" y="60" width="22" height="64" fill={`url(#${p}-hull)`} />
      <rect x="29" y="60" width="22" height="64" fill={`url(#${p}-brush)`} />
      <rect x="29" y="64" width="22" height="1.6" fill={`url(#${p}-band)`} />
      <path d="M29 94 H51" stroke={INK} strokeOpacity="0.14" strokeWidth="0.6" />
      <path d="M29 112 H51" stroke={INK} strokeOpacity="0.12" strokeWidth="0.6" />
      <rect x="29" y="60" width="22" height="64" fill={`url(#${p}-sky)`} />
      <rect x="29" y="60.4" width="22" height="3" fill={`url(#${p}-ao)`} />

      {/* payload fairing: ogive nose, short cylinder, boat tail */}
      <path
        d="M40 3 C46.5 7.5 52.5 20 52.5 38 V55 L51 60.5 H29 L27.5 55 V38 C27.5 20 33.5 7.5 40 3 Z"
        fill={`url(#${p}-hull)`}
      />
      <path d="M40 3 C46.5 7.5 52.5 20 52.5 38 H27.5 C27.5 20 33.5 7.5 40 3 Z" fill={`url(#${p}-tipshade)`} />
      <path d="M52.5 38 V55 L51 60.5 H29 L27.5 55 V38 C27.5 20 33.5 7.5 40 3 C46.5 7.5 52.5 20 52.5 38 Z" fill={`url(#${p}-brush)`} />
      <path d="M27.6 38 H52.4" stroke={INK} strokeOpacity="0.12" strokeWidth="0.5" />
      <path d="M41.2 6 V60" stroke={INK} strokeOpacity="0.16" strokeWidth="0.45" />
      <path d="M27.8 55 H52.2" stroke={INK} strokeOpacity="0.12" strokeWidth="0.5" />
      <path d="M52.5 38 V55 L51 60.5 H29 L27.5 55 V38 C27.5 20 33.5 7.5 40 3 C46.5 7.5 52.5 20 52.5 38 Z" fill={`url(#${p}-sky)`} />
      {/* soft specular streak down the lit side */}
      <path d="M31.2 24 C30.4 30 30.2 40 30.4 54" stroke="#FFFFFF" strokeOpacity="0.85" strokeWidth="1.1" strokeLinecap="round" />
      <FairingMark grad={`${p}-azure`} />
    </g>
  );
}

/** First stage (static: rendered to public/rocket/). */
export function BoosterBody({ id }: { id: string }) {
  const p = `${id}-b`;
  return (
    <g>
      <defs>
        <Hull id={`${p}-hull`} />
        <Brushed id={`${p}-brush`} />
        <Metal id={`${p}-metal`} />
        <Carbon id={`${p}-carbon`} />
        <SkyBounce id={`${p}-sky`} />
        <Contact id={`${p}-ao`} />
        <linearGradient id={`${p}-soot`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2A2E38" stopOpacity="0" />
          <stop offset="0.75" stopColor="#2A2E38" stopOpacity="0.08" />
          <stop offset="1" stopColor="#1C1F27" stopOpacity="0.28" />
        </linearGradient>
        <pattern id={`${p}-grid`} width="1.9" height="1.9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0 V1.9 M0 0 H1.9" stroke="#AEB4C0" strokeWidth="0.34" />
        </pattern>
      </defs>

      {/* engine skirt and three engine bells */}
      <path d="M29 150 H51 L52 154.5 H28 Z" fill={`url(#${p}-carbon)`} />
      <path d="M28 154.5 H52" stroke="#000" strokeOpacity="0.3" strokeWidth="0.5" />
      {[33, 40, 47].map((cx) => (
        <g key={cx}>
          <path d={`M${cx - 2.1} 154.5 H${cx + 2.1} C${cx + 2.4} 158 ${cx + 3} 161 ${cx + 3.4} 163 H${cx - 3.4} C${cx - 3} 161 ${cx - 2.4} 158 ${cx - 2.1} 154.5 Z`} fill={`url(#${p}-metal)`} />
          <path d={`M${cx - 3.3} 162.8 H${cx + 3.3}`} stroke="#D8E2F5" strokeOpacity="0.45" strokeWidth="0.45" strokeLinecap="round" />
        </g>
      ))}

      {/* body */}
      <rect x="29" y="23" width="22" height="127" fill={`url(#${p}-hull)`} />
      <rect x="29" y="98" width="22" height="52" fill={`url(#${p}-soot)`} />
      <rect x="29" y="23" width="22" height="127" fill={`url(#${p}-brush)`} />
      <rect x="29" y="28" width="22" height="0.9" fill="#4F8DFF" opacity="0.85" />
      {[58, 92, 124].map((y) => (
        <path key={y} d={`M29 ${y} H51`} stroke={INK} strokeOpacity="0.13" strokeWidth="0.6" />
      ))}
      <rect x="29" y="23" width="22" height="127" fill={`url(#${p}-sky)`} />
      <rect x="29" y="23.5" width="22" height="3.5" fill={`url(#${p}-ao)`} />
      {/* cable raceway on the shaded side */}
      <rect x="46.6" y="31" width="1.2" height="116" rx="0.5" fill="#9AA3B4" opacity="0.4" />

      {/* folded landing legs: two in profile, one facing us */}
      <path d="M29 109 L27 111.5 V146.5 L29 150 Z" fill={`url(#${p}-carbon)`} />
      <path d="M51 109 L53 111.5 V146.5 L51 150 Z" fill={`url(#${p}-carbon)`} />
      <path d="M38.4 110 H41.6 L42 148 C40.7 149.6 39.3 149.6 38 148 Z" fill={`url(#${p}-carbon)`} opacity="0.92" />
      <path d="M39.4 113 V146" stroke="#B9C0CD" strokeOpacity="0.3" strokeWidth="0.35" />

      {/* interstage (covers the upper stage's engine) */}
      <rect x="29" y="0" width="22" height="23.5" fill={`url(#${p}-carbon)`} />
      <rect x="29" y="0" width="22" height="1.1" fill="#7F8BA6" opacity="0.6" />
      <path d="M29 23.5 H51" stroke="#000" strokeOpacity="0.35" strokeWidth="0.6" />
      <path d="M29 8 H51 M29 16 H51" stroke="#B9C0CD" strokeOpacity="0.12" strokeWidth="0.35" />

      {/* grid fins, deployed */}
      {[
        { x: 20.6, hinge: "M27.6 8.4 H29" },
        { x: 51.4, hinge: "M51 8.4 H52.4" },
      ].map((f) => (
        <g key={f.x}>
          <rect x={f.x} y="4.4" width="8" height="8" rx="0.6" fill="#30343D" />
          <rect x={f.x} y="4.4" width="8" height="8" rx="0.6" fill={`url(#${p}-grid)`} />
          <rect x={f.x} y="4.4" width="8" height="8" rx="0.6" fill="none" stroke="#8A909E" strokeWidth="0.55" />
          <path d={f.hinge} stroke="#6A707D" strokeWidth="1.2" />
        </g>
      ))}
    </g>
  );
}

/** Both stages stacked, for the hero (which never separates). */
export function StackBody({ id }: { id: string }) {
  return (
    <g>
      <UpperBody id={id} />
      <g transform={`translate(0 ${BOOSTER_OFFSET})`}>
        <BoosterBody id={id} />
      </g>
    </g>
  );
}
