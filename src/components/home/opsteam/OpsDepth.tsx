import { OPS_DEPTH_LEVELS } from "./opsData";

/**
 * "How deep it goes": five levels on one path, from answering enquiries to a
 * full Operations Team. Horizontal from 900px, a vertical path on phones.
 * The path line draws once on view through the shared [data-reveal] observer.
 */
export function OpsDepth() {
  return (
    <div className="odp" data-reveal="">
      <style>{CSS}</style>
      <span className="odp-line" aria-hidden>
        <span className="odp-fill" />
      </span>
      <ol className="odp-list">
        {OPS_DEPTH_LEVELS.map((l, i) => (
          <li key={l.word} className="odp-step" style={{ ["--i" as string]: i }} data-last={i === OPS_DEPTH_LEVELS.length - 1 ? "" : undefined}>
            <span className="odp-node tabular" aria-hidden>
              {i + 1}
            </span>
            <div className="odp-text">
              <p className="odp-k">Level {i + 1}</p>
              <h3 className="odp-t">{l.word}</h3>
              <p className="odp-b">{l.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

const CSS = `
.odp { position: relative; }
.odp-list { position: relative; display: grid; gap: 28px; }
.odp-line { position: absolute; left: 19px; top: 20px; bottom: 20px; width: 1px; background: var(--hairline-2); }
.odp-fill { position: absolute; inset: 0; background: linear-gradient(180deg, #4D7CFF, #8FB0FF); transform-origin: top;
  transition: transform 1.4s cubic-bezier(.2,.7,.2,1) .2s; }
.odp[data-armed]:not([data-revealed]) .odp-fill { transform: scaleY(0); }
.odp-step { position: relative; display: grid; grid-template-columns: 40px minmax(0, 1fr); gap: 16px; align-items: start; align-content: start; }
.odp-node { position: relative; z-index: 1; display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%;
  font-family: var(--font-mono); font-size: 0.875rem; color: var(--color-ink); background: var(--ops-node, var(--bg));
  border: 1px solid var(--hairline-3); transition: border-color .4s ease calc(.3s + var(--i) * .22s), background-color .4s ease calc(.3s + var(--i) * .22s); }
.odp[data-revealed] .odp-node, .odp:not([data-armed]) .odp-node { border-color: #4D7CFF; }
.odp-step[data-last] .odp-node { background: #4D7CFF; border-color: #4D7CFF; color: #fff; }
.odp-k { margin: 0; font-family: var(--font-mono); font-size: 0.6875rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-ink-muted); }
.odp-t { margin: 4px 0 0; font-family: var(--font-display); font-weight: 600; font-size: 1.1875rem; letter-spacing: -0.02em; line-height: 1.2; color: var(--color-ink); }
.odp-step[data-last] .odp-t { color: var(--color-accent); }
.odp-b { margin: 6px 0 0; font-size: 0.9375rem; line-height: 1.55; color: var(--color-ink-soft); max-width: 34ch; }
@media (min-width: 900px) {
  .odp-list { grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 20px; }
  .odp-line { left: 20px; right: calc((100% - 80px) / 5 - 20px); top: 19px; bottom: auto; width: auto; height: 1px; }
  .odp-fill { background: linear-gradient(90deg, #4D7CFF, #8FB0FF); transform-origin: left; }
  .odp[data-armed]:not([data-revealed]) .odp-fill { transform: scaleX(0); }
  .odp-step { grid-template-columns: minmax(0, 1fr); gap: 18px; }
}
@media (prefers-reduced-motion: reduce) { .odp-fill, .odp-node { transition: none; } }
`;
