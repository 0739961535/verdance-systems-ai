
/**
 * Header art for the inner pages (/services, /how-it-works, /about): the
 * Earth at night from orbit, sunrise on the limb. Brand art, no people.
 *
 * It sits behind the hero (z-index -1, so the parent must isolate) and is
 * the page's LCP image: preloaded with high priority, eager, and never
 * animated in. A phone crop keeps the sunrise in frame under 768px.
 * Parallax runs through the site's shared [data-parallax] helper, which is
 * transform-only, desktop only and off under reduced motion.
 * A scrim keeps every line of text on a dark area (4.5:1 or better) and a
 * fine grain sits on top so the photo reads as part of the page.
 */

const WIDE = "/site/earth-960.avif 960w, /site/earth-1344.avif 1344w";
const WIDE_WEBP = "/site/earth-960.webp 960w, /site/earth-1344.webp 1344w";
const PHONE = "/site/earth-m-412.avif 412w, /site/earth-m-824.avif 824w";
const PHONE_WEBP = "/site/earth-m-412.webp 412w, /site/earth-m-824.webp 824w";
const PHONE_MQ = "(max-width: 767px)";

const CSS = `
.ea { position: absolute; inset: 0; z-index: -1; overflow: hidden; pointer-events: none; background: #060B1A; }
.ea-move { position: absolute; left: 0; right: 0; top: -18%; bottom: -6%; will-change: transform; }
.ea-move img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: 50% 62%; }
.ea-scrim { position: absolute; inset: 0;
  background:
    linear-gradient(180deg, rgba(6,11,26,0.55) 0%, rgba(6,11,26,0.15) 22%, rgba(6,11,26,0) 48%, rgba(6,11,26,0.7) 80%, #060B1A 100%),
    linear-gradient(90deg, rgba(6,11,26,0.9) 0%, rgba(6,11,26,0.84) 40%, rgba(6,11,26,0.42) 64%, rgba(6,11,26,0.18) 100%); }
.ea-grain { position: absolute; inset: 0; opacity: 0.07; background-image: var(--grain); background-size: 160px 160px; }
@media (max-width: 767px) {
  .ea-move { top: -4%; bottom: auto; height: 72%; }
  .ea-move img { object-position: 60% 0%; }
  .ea-scrim { background: linear-gradient(180deg, rgba(6,11,26,0.3) 0px, rgba(6,11,26,0.5) 70px, rgba(6,11,26,0.86) 120px, rgba(6,11,26,0.88) 320px, rgba(6,11,26,0.92) 50%, #060B1A 70%); }
}
`;

export function EarthArt() {
  // no preload(): React would also emit it into the prefetched payload of
  // every page that links here, so pages without this art preloaded it too.
  // The image itself is in the HTML with fetchPriority high.
  return (
    <div aria-hidden className="ea">
      <style>{CSS}</style>
      <div className="ea-move" data-parallax="0.16">
        <picture>
          <source media={PHONE_MQ} type="image/avif" srcSet={PHONE} sizes="100vw" />
          <source media={PHONE_MQ} type="image/webp" srcSet={PHONE_WEBP} sizes="100vw" />
          <source type="image/avif" srcSet={WIDE} sizes="100vw" />
          <source type="image/webp" srcSet={WIDE_WEBP} sizes="100vw" />
          <img src="/site/earth-1344.webp" alt="" width={1344} height={752} loading="eager" fetchPriority="high" />
        </picture>
      </div>
      <div className="ea-scrim" />
      <div className="ea-grain" />
    </div>
  );
}
