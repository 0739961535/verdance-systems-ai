import { SampleTag } from "@/components/kit/SampleTag";
/**
 * "On your desk": the real Operations Team command centre (CommandMock)
 * composited onto the blank screen of a laptop in window light. The screen
 * was warped with a CSS matrix3d from the four measured screen corners and
 * rendered once at 2x (scripts/build-site-images.mjs), so it costs no JS and
 * looks the same at every width. Empty scene, no people. Lazy, fixed aspect
 * ratio (CLS 0), grain on top.
 */

const CSS = `
.odk { position: relative; }
.odk-in { display: grid; gap: 32px; }
@media (min-width: 1024px) { .odk-in { grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); align-items: center; gap: 64px; } }
.odk-fig { position: relative; margin: 0; overflow: hidden; aspect-ratio: 1344 / 752; border-radius: 20px; background: #0B1328;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08), 0 40px 100px -50px rgba(37,84,212,0.6); isolation: isolate; }
@media (min-width: 1024px) { .odk-fig { border-radius: 28px; } }
.odk-fig picture, .odk-fig img { display: block; width: 100%; height: 100%; }
.odk-fig img { object-fit: cover; }
.odk-fig::after { content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none; opacity: 0.06; background-image: var(--grain); background-size: 160px 160px; }
.odk-cap { margin-top: 12px; }
`;

export function OpsDesk() {
  const sizes = "(min-width: 1280px) 780px, (min-width: 1024px) 62vw, 92vw";
  return (
    <section className="odk band-night chapter-pad" aria-labelledby="desk-title">
      <style>{CSS}</style>
      <div className="container-wide odk-in">
        <div>
          <p className="eyebrow">On your desk</p>
          <h2 id="desk-title" className="h2 mt-4">
            Open your laptop. <span className="italic-accent">The work is done.</span>
          </h2>
          <p className="lead mt-6">Your morning brief, what each helper did, and the replies that wait for you. All on one screen.</p>
        </div>
        <div>
          <figure className="odk-fig">
            <picture>
              <source type="image/avif" srcSet="/site/workspace-1344.avif 1344w, /site/workspace-2688.avif 2688w" sizes={sizes} />
              <source type="image/webp" srcSet="/site/workspace-1344.webp 1344w, /site/workspace-2688.webp 2688w" sizes={sizes} />
              <img
                src="/site/workspace-1344.webp"
                alt="A laptop on a wooden desk in window light, showing the Operations Team command centre: a morning brief, five helpers and their tasks, and two replies waiting for approval. Sample data."
                width={1344}
                height={752}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <SampleTag place="tr">Sample data</SampleTag>
          </figure>
        </div>
      </div>
    </section>
  );
}
