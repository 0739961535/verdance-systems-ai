import { SERVICE_PILLARS, PILLAR_CATEGORIES } from "@/data/services";

/**
 * SystemStack - the four pillars as stacked glass planes in an isometric
 * view. Each plane floats a little on its own beat (transform only); the
 * stack spreads on hover (desktop). Static under reduced motion.
 */
export function SystemStack() {
  const pillars = SERVICE_PILLARS.slice(0, 4);
  return (
    <div className="stack" aria-hidden>
      <div className="stack-scene">
        {pillars.map((p, i) => (
          <div key={p.slug} className="stack-plane" style={{ ["--i" as string]: pillars.length - 1 - i }}>
            <div className="stack-plane-inner">
              <span className="stack-index">{p.index}</span>
              <span className="stack-title">{p.title}</span>
              <span className="stack-chips">
                {PILLAR_CATEGORIES(p)
                  .slice(0, 3)
                  .map((c) => (
                    <span key={c.slug}>{c.name.split("&")[0].trim()}</span>
                  ))}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="stack-shadow" />
    </div>
  );
}
