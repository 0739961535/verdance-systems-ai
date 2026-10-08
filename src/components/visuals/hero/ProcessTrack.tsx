import { PROCESS } from "@/data/process";

/**
 * ProcessTrack - the six steps on one track. A light fills the track and
 * each step lights as it passes, on a slow loop. Pure CSS (scale and
 * opacity); horizontal on desktop, vertical on phones; static under
 * reduced motion.
 */
export function ProcessTrack() {
  return (
    <div className="ptrack" aria-hidden>
      <div className="ptrack-rail">
        <span className="ptrack-fill" />
      </div>
      <ol className="ptrack-steps">
        {PROCESS.map((s, i) => (
          <li key={s.slug} className="ptrack-step" style={{ ["--i" as string]: i }}>
            <span className="ptrack-dot">
              <span className="ptrack-dot-on" />
            </span>
            <span className="ptrack-n">{s.n}</span>
            <span className="ptrack-name">{s.name}</span>
            <span className="ptrack-dur">{s.duration}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
