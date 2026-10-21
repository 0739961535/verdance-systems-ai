import { EarthLimbScroll } from "./EarthLimbScroll";

/**
 * The turn from the four jobs into the Operations Team they run on: a
 * real photograph of the Earth's limb from the space station (NASA), full
 * bleed and sharp (2880px), with its own blue atmosphere. It drifts up a
 * little slower than the page (parallax, transform only) and the paper
 * above fades into space, under the bridge line.
 * Lazy image, fixed size, so CLS stays 0.
 */
export function EarthLimb() {
  return (
    <section className="el" aria-labelledby="el-title">
      <style>{CSS}</style>
      <EarthLimbScroll />
      <div className="el-img" aria-hidden>
        <picture>
          <source type="image/avif" srcSet="/flight/limb-1280.avif 1280w, /flight/limb-2880.avif 2880w" sizes="(min-width: 768px) 100vw, 180vw" />
          <img
            src="/flight/limb-2880.webp"
            srcSet="/flight/limb-1280.webp 1280w, /flight/limb-2880.webp 2880w"
            sizes="(min-width: 768px) 100vw, 180vw"
            alt=""
            width={2880}
            height={1805}
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
      <div className="el-copy container-wide">
        <h2 id="el-title" className="el-h">
          All four run on one system: <span className="italic-accent">your Operations Team.</span>
        </h2>
      </div>
    </section>
  );
}

const CSS = `
.el { --y: 0; position: relative; height: clamp(420px, 78svh, 820px); overflow: hidden; background: #03060F; isolation: isolate; color: #F2F5FC; }
.el::before { content: ""; position: absolute; inset: 0 0 auto 0; height: 34%; z-index: 2; pointer-events: none; background: linear-gradient(#0E1A3A, rgba(14, 26, 58, 0)); }
.el::after { content: ""; position: absolute; inset: auto 0 0 0; height: 30%; z-index: 2; pointer-events: none; background: linear-gradient(rgba(6, 11, 26, 0), #060B1A); }
.el-img { position: absolute; left: 50%; bottom: 0; width: 180vw; transform: translate3d(-50%, calc(14% - var(--y) * 14%), 0); will-change: transform; }
@media (min-width: 768px) { .el-img { width: 100vw; } }
.el-img img { display: block; width: 100%; height: auto; }
.el-copy { position: relative; z-index: 3; padding-top: clamp(96px, 18svh, 200px); text-align: center; }
.el-eyebrow { justify-content: center; color: rgba(234, 240, 255, 0.7); }
.el-h { margin: 16px auto 0; max-width: 18ch; font-family: var(--font-display); font-weight: 600; font-size: clamp(2.2rem, 3.4vw + 1rem, 4.5rem); line-height: 1; letter-spacing: -0.04em; text-wrap: balance; text-shadow: 0 2px 30px rgba(3, 6, 15, 0.6); }
.el-h .italic-accent { color: #8FB0FF; }
@media (prefers-reduced-motion: reduce) { .el-img { transform: translate3d(-50%, 0, 0); } }
`;
