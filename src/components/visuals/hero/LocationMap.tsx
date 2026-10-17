import { LOCATIONS } from "@/data/locations";

/**
 * LocationMap - where we work, as a glowing constellation per country (only
 * countries with a city page are drawn), each city placed by its real
 * latitude and longitude. No map tiles or outlines, just points on a grid. The active
 * city (on a location page) is lit and labelled. CSS only.
 */
const COORDS: Record<string, [number, number]> = {
  johannesburg: [-26.2, 28.05],
  "cape-town": [-33.92, 18.42],
  stellenbosch: [-33.93, 18.86],
  durban: [-29.86, 31.02],
};

const LABELLED = new Set(["johannesburg", "cape-town", "durban"]);

const BOUNDS = {
  ZA: { lat: [-21.5, -35.5], lon: [16, 33.5] },
  GB: { lat: [56, 50], lon: [-5.5, 2.5] },
} as const;

function place(slug: string, country: "ZA" | "GB") {
  const c = COORDS[slug];
  if (!c) return null;
  const b = BOUNDS[country];
  const x = ((c[1] - b.lon[0]) / (b.lon[1] - b.lon[0])) * 100;
  const y = ((c[0] - b.lat[0]) / (b.lat[1] - b.lat[0])) * 100;
  return { x, y };
}

function Panel({ country, label, active }: { country: "ZA" | "GB"; label: string; active?: string }) {
  const locs = LOCATIONS.filter((l) => l.country === country);
  return (
    <div className={`locmap-panel ${country === "GB" ? "is-small" : ""}`}>
      <span className="locmap-label">{label}</span>
      <div className="locmap-field">
        {locs.map((l, i) => {
          const p = place(l.slug, country);
          if (!p) return null;
          const on = l.slug === active;
          return (
            <span
              key={l.slug}
              className={`locmap-dot ${on ? "is-on" : ""} ${p.x > 62 ? "is-left" : ""}`}
              style={{ left: `${p.x}%`, top: `${p.y}%`, ["--i" as string]: i }}
            >
              {(on || (!active && LABELLED.has(l.slug))) && <span className="locmap-name">{l.name}</span>}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function LocationMap({ active }: { active?: string }) {
  const hasZA = LOCATIONS.some((l) => l.country === "ZA");
  const hasGB = LOCATIONS.some((l) => l.country === "GB");
  return (
    <div className={`locmap browser-frame g-border ${hasZA && hasGB ? "" : "is-single"}`} aria-hidden>
      {hasZA && <Panel country="ZA" label="South Africa" active={active} />}
      {hasGB && <Panel country="GB" label="United Kingdom" active={active} />}
      <p className="locmap-foot">Remote first · set up on a video call · runs on your own accounts</p>
    </div>
  );
}
