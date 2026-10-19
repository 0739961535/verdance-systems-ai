/**
 * More of our work: a compact swipe row of our own demos, straight after the
 * two proof cards. Native CSS scroll-snap, no autoplay, no JS. On phones one
 * card shows with a peek of the next; from tablet up both sit side by side.
 * Rules: only our own demo pages (names that could belong to a real
 * business are replaced at capture), no client or prospect work without
 * their written OK, no invented results. Every button in the images reads
 * "Book a free 30-minute call".
 * Removed in the v8 round: the studio (already in Recent work), the lodge
 * concept (a pitch to a real prospect) and the training institute concept
 * (now a client): add back only with their OK.
 */

type Slide = { key: string; title: string; caption: string; img: string; alt: string };

const SLIDES: Slide[] = [
  {
    key: "ecommerce",
    title: "Online stores",
    caption: "Order questions answered after hours, with the tracking link sent.",
    img: "ecommerce",
    alt: "Verdance for E-commerce demo page: a customer's order question answered on WhatsApp",
  },
  {
    key: "venues",
    title: "Wedding and event venues",
    caption: "Late night enquiries answered, viewings booked, then handed to the coordinator.",
    img: "venues",
    alt: "Verdance for Venues demo page: late night wedding enquiries answered",
  },
];

const SIZES = "(min-width: 768px) 50vw, 80vw";

function Shot({ img, alt }: { img: string; alt: string }) {
  const set = (ext: string) => `/work/slider/${img}-800.${ext} 800w, /work/slider/${img}-1280.${ext} 1280w`;
  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={SIZES} />
      <source type="image/webp" srcSet={set("webp")} sizes={SIZES} />
      <img
        src={`/work/slider/${img}-800.webp`}
        width={1280}
        height={800}
        loading="lazy"
        decoding="async"
        alt={alt}
        className="block aspect-[16/10] h-auto w-full"
      />
    </picture>
  );
}

export function OurWorkSlider() {
  return (
    <section className="bg-canvas-2 pb-20 md:pb-28" aria-labelledby="our-work-title">
      <style>{`
        .ow-scroller {
          display: grid; grid-auto-flow: column; grid-auto-columns: 80%; gap: 0.875rem;
          overflow-x: auto; overscroll-behavior-x: contain; scroll-snap-type: x mandatory;
          scroll-padding-inline: 1.25rem; padding: 0.25rem 1.25rem 0.5rem; margin-inline: -1.25rem;
          scrollbar-width: none; -webkit-overflow-scrolling: touch;
        }
        .ow-scroller::-webkit-scrollbar { display: none; }
        .ow-scroller:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; border-radius: 16px; }
        .ow-slide { scroll-snap-align: start; }
        @media (min-width: 768px) {
          .ow-scroller { grid-auto-flow: row; grid-template-columns: 1fr 1fr; gap: 1.5rem; overflow: visible; padding: 0; margin: 0; }
        }
      `}</style>
      <div className="container-wide">
        <div className="flex items-baseline justify-between gap-4">
          <h3 id="our-work-title" className="font-display text-[1.35rem] text-[color:var(--color-ink)]" style={{ letterSpacing: "-0.02em" }}>
            Our own demos
          </h3>
          <span className="text-[0.8125rem] text-[color:var(--color-ink-muted)] md:hidden" aria-hidden>
            Swipe
          </span>
        </div>
        <div className="mt-5 ow-scroller" role="region" aria-label="Our own demos" tabIndex={0}>
          {SLIDES.map((s, i) => (
            <figure key={s.key} data-reveal="" className="ow-slide m-0" aria-label={`${i + 1} of ${SLIDES.length}: ${s.title}`}>
              <div className="overflow-hidden rounded-[14px] border border-[color:var(--hairline-2)] bg-[#141414]">
                <Shot img={s.img} alt={s.alt} />
              </div>
              <figcaption className="mt-3 text-[0.95rem] leading-[1.5] text-[color:var(--color-ink-soft)]">
                <span className="font-semibold text-[color:var(--color-ink)]">{s.title}.</span> {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
