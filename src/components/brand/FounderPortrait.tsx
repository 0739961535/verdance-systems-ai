import { FOUNDER } from "@/data/founder";

/**
 * The founder's photo, or a clean placeholder until a real one exists.
 * size "face" is the small round face in the booking card; "portrait" is
 * the tall "Who we are" slot. Swap the photo in src/data/founder.ts.
 */
export function FounderPortrait({ size = "portrait", className = "", tone = "dark" }: { size?: "face" | "portrait"; className?: string; tone?: "dark" | "paper" }) {
  const src = size === "face" ? FOUNDER.face || FOUNDER.portrait : FOUNDER.portrait;
  const alt = `${FOUNDER.name}, ${FOUNDER.role}`;
  if (size === "face") {
    return src ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} width={48} height={48} className={`fp-face ${className}`} loading="lazy" decoding="async" />
    ) : (
      <span className={`fp-face fp-mono ${className}`} role="img" aria-label={`${FOUNDER.name} (photo to come)`}>
        <style>{FP_CSS}</style>
        {FOUNDER.initials}
      </span>
    );
  }
  return (
    <figure className={`fp-portrait ${tone === "paper" ? "is-paper" : ""} ${className}`}>
      <style>{FP_CSS}</style>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} width={800} height={1000} loading="lazy" decoding="async" />
      ) : (
        <div className="fp-empty" role="img" aria-label={`Portrait of ${FOUNDER.name} (photo to come)`}>
          <span className="fp-big">{FOUNDER.initials}</span>
        </div>
      )}
      <figcaption>
        <span className="fp-name">{FOUNDER.name}</span>
        <span className="fp-role">{FOUNDER.role}</span>
      </figcaption>
    </figure>
  );
}

const FP_CSS = `
.fp-face { flex: none; display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; border-radius: 999px; object-fit: cover; }
.fp-mono { background: #13203F; color: #DCE6FF; font-size: 0.95rem; font-weight: 600; letter-spacing: 0.02em; box-shadow: inset 0 0 0 1px rgba(143,176,255,0.35); }
.fp-portrait { margin: 0; max-width: 22rem; }
.fp-portrait img, .fp-empty { display: block; width: 100%; aspect-ratio: 4 / 5; border-radius: 20px; object-fit: cover; }
.fp-empty {
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(160deg, #13203F, #0A1226 70%); box-shadow: inset 0 0 0 1px rgba(143,176,255,0.18);
}
.fp-portrait.is-paper .fp-empty { background: linear-gradient(160deg, #E9E4D8, #DCD5C6); box-shadow: inset 0 0 0 1px rgba(14,14,16,0.08); }
.fp-big { font-size: 3.5rem; font-weight: 600; letter-spacing: -0.03em; color: rgba(220,230,255,0.5); }
.fp-portrait.is-paper .fp-big { color: rgba(14,14,16,0.28); }
.fp-portrait figcaption { display: grid; gap: 2px; margin-top: 14px; }
.fp-name { font-weight: 600; font-size: 1.0625rem; color: var(--color-ink); }
.fp-role { font-size: 0.9375rem; color: var(--color-ink-muted); }
`;
