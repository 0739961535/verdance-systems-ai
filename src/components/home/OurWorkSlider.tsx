import { OurWorkSliderNav } from "./OurWorkSliderNav";

/**
 * Our work: a swipeable carousel of live builds, concepts and demos.
 * Native CSS scroll-snap, no autoplay. Server component; only the desktop
 * Previous / Next buttons ship JS (OurWorkSliderNav).
 * Rules: every screenshot in /public/work/slider has client and prospect names,
 * logos and photos of people removed (blurred before capture). No URLs, numbers
 * or results invented in captions.
 */

type Label = "Live build" | "Concept" | "Demo" | "Built for us";

type Slide = {
  key: string;
  title: string;
  caption: string;
  label: Label;
  /** Base name in /public/work/slider ({img}-800 / {img}-1280 .avif / .webp). Omitted for the mock. */
  img?: string;
  alt?: string;
};

const SLIDES: Slide[] = [
  {
    key: "studio",
    title: "Luxury home design and build studio",
    caption: "The website we built and run for them, live today.",
    label: "Live build",
    img: "studio",
    alt: "Home page of a luxury home design and build studio's website, with the studio's name and logo blurred",
  },
  {
    key: "lodge",
    title: "Safari lodge group: enquiry assistant",
    caption: "A concept showing a family's Saturday night enquiry answered in the lodge's own voice.",
    label: "Concept",
    img: "lodge",
    alt: "Example WhatsApp conversation between a family and a safari lodge's reservations assistant, with lodge and place names blurred",
  },
  {
    key: "institute",
    title: "Training institute: website redesign",
    caption: "A concept redesign where learners can apply from their phone.",
    label: "Concept",
    img: "institute",
    alt: "Step one of an online application form on a training institute's redesigned website, with the logo blurred",
  },
  {
    key: "ecommerce",
    title: "Online store: Verdance for E-commerce",
    caption: "Our demo of order questions answered after hours, with tracking sent.",
    label: "Demo",
    img: "ecommerce",
    alt: "Verdance for E-commerce demo page with a customer's order question answered on WhatsApp",
  },
  {
    key: "venues",
    title: "Wedding and event venues",
    caption: "Our demo of late night enquiries answered, then handed to the coordinator.",
    label: "Demo",
    img: "venues",
    alt: "Demo page for wedding and event venues about late night enquiries being answered, with the product name blurred",
  },
  {
    key: "os",
    title: "Our own AI operating system",
    caption: "What we run Verdance on each day, shown here as an illustration.",
    label: "Built for us",
  },
];

const SCROLLER_ID = "our-work-scroller";
const SIZES = "(min-width: 768px) min(70vw, 1100px), 86vw";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-[color:var(--hairline-2)] bg-[#141414]">
      <div className="flex h-7 items-center gap-1.5 border-b border-white/10 px-3 md:h-8" aria-hidden>
        <span className="h-2 w-2 rounded-full bg-white/20 md:h-2.5 md:w-2.5" />
        <span className="h-2 w-2 rounded-full bg-white/20 md:h-2.5 md:w-2.5" />
        <span className="h-2 w-2 rounded-full bg-white/20 md:h-2.5 md:w-2.5" />
        <span className="ml-3 h-3.5 max-w-[14rem] flex-1 rounded-full bg-white/10 md:h-4" />
      </div>
      {children}
    </div>
  );
}

function Shot({ img, alt }: { img: string; alt: string }) {
  const set = (ext: string) => `/work/slider/${img}-800.${ext} 800w, /work/slider/${img}-1280.${ext} 1280w`;
  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={SIZES} />
      <source type="image/webp" srcSet={set("webp")} sizes={SIZES} />
      <img
        src={`/work/slider/${img}-1280.webp`}
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

/** A drawn stand-in for our own operating system: no real screen, names or numbers. */
function OsMock() {
  const tiles = [
    { label: "Today", bars: [78, 54, 66] },
    { label: "Enquiries", bars: [62, 84, 40] },
    { label: "Approvals", bars: [48, 70, 58] },
    { label: "Reports", bars: [86, 44, 72] },
  ];
  return (
    <div
      role="img"
      aria-label="Illustration of a dark dashboard with tiles for today, enquiries, approvals and reports"
      className="ow-mock relative aspect-[16/10] w-full bg-[#0C0D10]"
    >
      <div className="absolute inset-0 grid grid-cols-[18%_1fr]">
        {/* Sidebar */}
        <div className="flex flex-col gap-[6%] border-r border-white/[0.07] p-[8%] pt-[10%]">
          <span className="h-[3%] w-[55%] rounded-full bg-[#5B8FFF]/70" />
          {[70, 82, 60, 76, 52, 68].map((w, i) => (
            <span key={i} className="h-[2.4%] rounded-full bg-white/10" style={{ width: `${w}%` }} />
          ))}
        </div>
        {/* Main */}
        <div className="flex flex-col p-[3.5%]">
          <div className="flex items-center justify-between border-b border-white/[0.07] pb-[2.5%]">
            <span className="h-[0.9cqw] min-h-1 w-[28%] rounded-full bg-white/20" />
            <span className="h-[2.2cqw] w-[2.2cqw] rounded-full border border-white/15" />
          </div>
          <div className="mt-[3.5%] grid flex-1 grid-cols-2 gap-[3%]">
            {tiles.map((t) => (
              <div key={t.label} className="flex flex-col rounded-[1cqw] border border-white/[0.08] bg-white/[0.025] p-[6%]">
                <span className="ow-mock-label text-white/75">{t.label}</span>
                <div className="mt-auto flex flex-col gap-[0.9cqw]">
                  {t.bars.map((w, i) => (
                    <span
                      key={i}
                      className={`h-[0.85cqw] min-h-1 rounded-full ${i === 0 ? "bg-[#5B8FFF]/60" : "bg-white/10"}`}
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const LABEL_STYLE: Record<Label, string> = {
  "Live build": "border-[color:var(--signal)] text-[color:var(--signal)]",
  Concept: "border-[color:var(--hairline-3)] text-[color:var(--color-ink-soft)]",
  Demo: "border-[color:var(--accent)] text-[color:var(--accent)]",
  "Built for us": "border-[color:var(--hairline-3)] text-[color:var(--color-ink-soft)]",
};

export function OurWorkSlider() {
  return (
    <section className="section-pad bg-canvas" aria-labelledby="our-work-title">
      <style>{`
        .ow-scroller {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          overscroll-behavior-x: contain;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          scroll-padding-inline: 1.25rem;
          padding: 0.25rem 1.25rem 1rem;
          margin-inline: -1.25rem;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .ow-scroller::-webkit-scrollbar { display: none; }
        .ow-scroller:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; border-radius: 16px; }
        .ow-slide { flex: 0 0 86vw; max-width: 1100px; scroll-snap-align: start; }
        .ow-scroller::after { content: ""; flex: 0 0 max(0px, calc(100% - 86vw - 1rem)); }
        .ow-mock { container-type: inline-size; }
        .ow-mock-label { font-family: var(--font-mono); font-size: max(8px, 1.5cqw); letter-spacing: 0.14em; text-transform: uppercase; }
        @media (min-width: 768px) {
          .ow-scroller { gap: 1.75rem; scroll-padding-inline: 2.5rem; padding-inline: 2.5rem; margin-inline: -2.5rem; }
          .ow-slide { flex-basis: 70%; }
          .ow-scroller::after { flex-basis: max(0px, calc(100% - min(70%, 1100px) - 1.75rem)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ow-scroller { scroll-behavior: auto; }
        }
      `}</style>
      <div className="container-wide">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">Our work</p>
            <h2 id="our-work-title" className="h2 mt-5">
              Live builds and concepts.
            </h2>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]">
              Names and logos are hidden. Live builds run for real businesses; concepts were made for prospects.
            </p>
          </div>
          <OurWorkSliderNav targetId={SCROLLER_ID} />
        </div>

        <div className="mt-10 md:mt-14">
          <div
            id={SCROLLER_ID}
            className="ow-scroller"
            role="region"
            aria-label="Our work"
            tabIndex={0}
          >
            {SLIDES.map((s, i) => (
              <div key={s.key} data-slide className="ow-slide" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${SLIDES.length}`}>
                <figure>
                  <Frame>{s.img && s.alt ? <Shot img={s.img} alt={s.alt} /> : <OsMock />}</Frame>
                  <figcaption className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-3">
                    <span
                      className={`inline-flex w-fit shrink-0 items-center rounded-full border px-2.5 py-0.5 text-[0.72rem] font-medium uppercase tracking-[0.12em] ${LABEL_STYLE[s.label]}`}
                    >
                      {s.label}
                    </span>
                    <p className="text-[1rem] leading-[1.5] text-[color:var(--color-ink-soft)]">
                      <span className="font-semibold text-[color:var(--color-ink)]">{s.title}.</span> {s.caption}
                    </p>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
