import { LOCATIONS } from "@/data/locations";

/**
 * LocationMap - where we work, as two glowing constellations: South Africa
 * and the United Kingdom, each city placed by its real latitude and
 * longitude. No map tiles or outlines, just points on a grid. The active
 * city (on a location page) is lit and labelled. CSS only.
 */
const COORDS: Record<string, [number, number]> = {
  johannesburg: [-26.2, 28.05],
  pretoria: [-25.75, 28.19],
  sandton: [-26.1, 28.06],
  centurion: [-25.86, 28.19],
  midrand: [-25.99, 28.13],
  "cape-town": [-33.92, 18.42],
  stellenbosch: [-33.93, 18.86],
  george: [-33.96, 22.46],
  durban: [-29.86, 31.02],
  pietermaritzburg: [-29.6, 30.38],
  gqeberha: [-33.96, 25.6],
  bloemfontein: [-29.12, 26.21],
  polokwane: [-23.9, 29.45],
  mbombela: [-25.47, 30.97],
  rustenburg: [-25.67, 27.24],
  london: [51.5, -0.12],
  manchester: [53.48, -2.24],
  birmingham: [52.48, -1.9],
};

const LABELLED = new Set(["johannesburg", "cape-town", "durban", "gqeberha", "bloemfontein", "polokwane", "london", "manchester"]);

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
  return (
    <div className="locmap browser-frame g-border" aria-hidden>
      <Panel country="ZA" label="South Africa" active={active} />
      <Panel country="GB" label="United Kingdom" active={active} />
      <p className="locmap-foot">Remote first · set up on a video call · runs on your own accounts</p>
    </div>
  );
}
