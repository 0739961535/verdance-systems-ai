/**
 * Daniel with his crew at golden hour (real photo, consent noted in
 * growth-lab/founder-photos/CONSENTS.md), cropped 16:9 so Daniel is the clear
 * focus. Used in the Book section (home and /book) above "You speak with
 * Daniel Bouwer". Fixed aspect ratio (CLS 0), AVIF/WebP at 800 and 1600.
 * `eager` for /book, where it is near the top; lazy on the home page.
 */
const CSS = `
.bkp { position: relative; margin: 0; overflow: hidden; aspect-ratio: 16 / 9; border-radius: 20px; background: #0B1328;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08), 0 30px 80px -50px rgba(37,84,212,0.6); }
.bkp picture, .bkp img { display: block; width: 100%; height: 100%; }
.bkp img { object-fit: cover; object-position: 42% 30%; }
`;

export function BookingPhoto({ eager = false }: { eager?: boolean }) {
  const sizes = "(min-width: 1024px) 560px, 92vw";
  return (
    <figure className="bkp">
      <style>{CSS}</style>
      <picture>
        <source type="image/avif" srcSet="/people/daniel-booking-800.avif 800w, /people/daniel-booking-1600.avif 1600w" sizes={sizes} />
        <img
          src="/people/daniel-booking-1600.webp"
          srcSet="/people/daniel-booking-800.webp 800w, /people/daniel-booking-1600.webp 1600w"
          sizes={sizes}
          alt="Daniel Bouwer, founder of Verdance Systems AI, talking with his team outdoors at golden hour"
          width={1600}
          height={900}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      </picture>
    </figure>
  );
}
