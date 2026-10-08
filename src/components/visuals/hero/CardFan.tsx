import { NICHES } from "@/data/niches";
import { NicheIcon } from "@/components/niche/NicheIcon";

/**
 * CardFan - the five current offers as a fanned hand of glass cards. The
 * fan opens wider on hover (desktop). Decorative: the real links are in the
 * grid below.
 */
export function CardFan() {
  const n = NICHES.length;
  return (
    <div className="fan" aria-hidden>
      {NICHES.map((niche, i) => {
        const k = i - (n - 1) / 2;
        return (
          <div key={niche.slug} className="fan-card" style={{ ["--k" as string]: k, zIndex: 10 - Math.abs(Math.round(k)) }}>
            <span className="fan-icon">
              <NicheIcon icon={niche.icon} size={18} />
            </span>
            <span className="fan-name">{niche.shortName}</span>
            <span className="fan-offer">{niche.offerName}</span>
            <span className="fan-badge">Replies within 5 min</span>
          </div>
        );
      })}
    </div>
  );
}
