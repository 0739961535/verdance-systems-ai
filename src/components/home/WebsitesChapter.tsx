import { GENERIC_BOOK_URL } from "@/data/booking";
import { SplitWords } from "@/components/primitives/Reveal";
import { WebsitesScroll } from "./WebsitesScroll";

/**
 * 07 Websites: the one light (paper) chapter. Sells websites as a service and
 * proves it with the studio's live site, shown full length.
 *
 * Mobile: a large phone frame pins under the header while its screen
 * scrolls through the site at a calm pace (about 1.4x the page), then the
 * desktop version in a browser frame, then what every site includes.
 * Desktop (lg): a sticky stage. The left column scrolls past while a browser
 * frame and a phone frame hold still and their screenshots scroll with the
 * section (WebsitesScroll, transform only, off under reduced motion).
 *
 * Paper colours are fixed here on purpose: below the fold is art directed and
 * renders the same in both site themes.
 * The screenshots leave out the studio's "about" section entirely (name,
 * founder, address, team photos); the logo and a house number are blurred.
 * No client names anywhere.
 */

const PAPER = "#F4F1EA";
const INK = "#0E0E10";
const MUTED = "#5E5B55";
const HAIRLINE = "rgba(14,14,16,0.12)";
const SHADOW = "0 48px 96px rgba(14,14,16,0.18)";

const BOOK = GENERIC_BOOK_URL;

const INCLUDED = [
  {
    title: "Made for a phone first.",
    line: "Most of your buyers will see it on one. It loads fast and reads well at arm's length.",
  },
  {
    title: "Every form goes somewhere.",
    line: "Enquiries land in your inbox and your customer records, and get a reply within 60 seconds.",
  },
  {
    title: "Written for your buyers.",
    line: "Plain words about what you do, in your voice, set out so people can find you on Google.",
  },
  {
    title: "Yours to keep.",
    line: "The domain, the content and the accounts are in your business's name.",
  },
] as const;

const DESKTOP_ALT =
  "The full home page of a luxury home design and build studio's website, built by Verdance, with the name hidden";
const PHONE_ALT =
  "The same studio website on a phone, built by Verdance, with the name hidden";

function DesktopShot({ className, scrolling }: { className?: string; scrolling?: boolean }) {
  return (
    <picture>
      <source srcSet="/work/studio-desktop.avif" type="image/avif" />
      <img
        src="/work/studio-desktop.webp"
        width={1440}
        height={1795}
        loading="lazy"
        decoding="async"
        alt={DESKTOP_ALT}
        className={className}
        data-ws-img={scrolling ? "" : undefined}
      />
    </picture>
  );
}

function PhoneShot() {
  return (
    <picture>
      <source srcSet="/work/studio-phone.avif" type="image/avif" />
      <img
        src="/work/studio-phone.webp"
        width={780}
        height={4790}
        loading="lazy"
        decoding="async"
        alt={PHONE_ALT}
        data-ws-img=""
        className="absolute left-0 top-0 block h-auto w-full will-change-transform"
      />
    </picture>
  );
}

/** Phone frame, radius 32, 1px ink hairline. 240 x 500 on the desktop stage; 9:16 and large when pinned on a phone. */
function PhoneFrame({ mode, className }: { mode: "stage" | "pin"; className?: string }) {
  return (
    <div
      data-ws-shot=""
      data-mode={mode}
      data-speed={mode === "stage" ? "1.2" : "1"}
      className={`${mode === "pin" ? "aspect-[9/16]" : "aspect-[240/500]"} overflow-hidden rounded-[32px] bg-[#0E0E10] ${className ?? ""}`}
      style={{ border: `1px solid ${HAIRLINE}`, boxShadow: SHADOW }}
    >
      <PhoneShot />
    </div>
  );
}

/** Hairline rows on mobile; 160px apart on desktop so each one passes the stage. */
function Included() {
  return (
    <ul className="flex flex-col lg:gap-[160px]">
      {INCLUDED.map((item) => (
        <li
          key={item.title}
          className="py-6 lg:pb-0"
          style={{ borderTop: `1px solid ${HAIRLINE}` }}
        >
          <h3 className="text-[22px] font-semibold leading-[1.2] tracking-[-0.02em]">{item.title}</h3>
          <p className="mt-2 text-[17px] leading-[1.55] lg:text-[18px]" style={{ color: MUTED }}>
            {item.line}
          </p>
        </li>
      ))}
    </ul>
  );
}

function Outro() {
  return (
    <div>
      <p className="font-serif text-[14px] leading-[1.4]" style={{ color: MUTED }}>
        A luxury home design and build studio in South Africa. Website and project brief form, built
        by Verdance. Name hidden at the client&apos;s request.
      </p>
      <a
        href={BOOK}
        className="group mt-8 inline-flex items-center gap-2 text-[16px] font-semibold"
        style={{ color: INK }}
      >
        <span
          className="underline decoration-1 underline-offset-[6px] transition-[text-decoration-thickness] duration-200 group-hover:decoration-2"
          style={{ textDecorationColor: "rgba(14,14,16,0.4)" }}
        >
          Talk to us about your website
        </span>
        <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-[3px]">
          &rarr;
        </span>
      </a>
      <p className="font-serif mt-3 text-[14px] leading-[1.4]" style={{ color: MUTED }}>
        You are on one of ours too.
      </p>
    </div>
  );
}

export function WebsitesChapter() {
  return (
    <section
      id="websites"
      aria-labelledby="websites-title"
      className="relative px-6 py-24 lg:min-h-[200vh] lg:px-16 lg:py-40"
      style={{ background: PAPER, color: INK }}
    >
      <WebsitesScroll />
      <div className="mx-auto w-full max-w-[1312px] lg:grid lg:grid-cols-12 lg:gap-x-6">
        {/* Left column: scrolls past the stage on desktop, the whole story on mobile */}
        <div className="lg:col-span-4">
          <p className="eyebrow" style={{ color: MUTED }}>
            <span className="chap-n" style={{ color: "#2A50C4" }}>07</span> Websites
          </p>
          <h2
            id="websites-title"
            data-reveal=""
            className="mt-4 text-[40px] font-semibold leading-[1.05] tracking-[-0.035em] lg:mt-6 lg:text-[64px]"
          >
            <SplitWords text="A website that brings in enquiries. Then" />{" "}
            <span className="font-serif">
              <SplitWords text="answers" start={7} />
            </span>{" "}
            <SplitWords text="them." start={8} />
          </h2>
          <p
            className="mt-6 max-w-[34ch] text-[18px] leading-[1.5] tracking-[-0.005em] lg:mt-8 lg:max-w-[48ch] lg:text-[22px]"
            style={{ color: MUTED }}
          >
            We design and build premium websites for owner-led businesses. The enquiry assistant,
            booking and follow-ups are built in from the first day.
          </p>

          {/* Mobile: the phone pins under the header while its screen scrolls
              (WebsitesScroll), then the desktop version in a browser frame */}
          <div className="lg:hidden">
            <div data-ws-pin="" className="relative mt-10 h-[210svh]">
              <div className="sticky top-[calc(64px+3svh)]">
                <PhoneFrame mode="pin" className="relative mx-auto w-[min(82vw,340px,calc((100svh-200px)*0.5625))]" />
              </div>
            </div>
            <div
              className="mt-12 overflow-hidden rounded-[12px] bg-white"
              style={{ border: `1px solid ${HAIRLINE}`, boxShadow: SHADOW }}
            >
              <div aria-hidden className="h-6" style={{ background: "#E9E5DC", borderBottom: `1px solid ${HAIRLINE}` }} />
              <div className="aspect-[16/10] overflow-hidden bg-[#0E0E10]">
                <DesktopShot className="block h-full w-full object-cover object-top" />
              </div>
            </div>
            <p className="font-serif mt-3 text-[14px]" style={{ color: MUTED }}>
              The same site on a laptop.
            </p>
          </div>

          <div className="mt-12 lg:mt-24">
            <Included />
          </div>
          <div className="mt-8 lg:mt-24">
            <Outro />
          </div>
        </div>

        {/* Right column (desktop only): the sticky stage */}
        <div className="hidden lg:col-span-8 lg:block">
          <div className="sticky top-24 pb-16 pr-8">
            <div className="relative">
              <div
                className="flex aspect-[880/560] w-full max-w-[880px] flex-col overflow-hidden rounded-[12px] bg-white"
                style={{ border: `1px solid ${HAIRLINE}`, boxShadow: SHADOW }}
              >
                <div aria-hidden className="h-8 shrink-0" style={{ background: "#E9E5DC", borderBottom: `1px solid ${HAIRLINE}` }} />
                <div data-ws-shot="" data-mode="stage" className="relative min-h-0 flex-1 overflow-hidden bg-[#0E0E10]">
                  <DesktopShot scrolling className="absolute left-0 top-0 block h-auto w-full will-change-transform" />
                </div>
              </div>
              <PhoneFrame mode="stage" className="absolute -bottom-16 -right-8 w-[clamp(150px,16.6vw,240px)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
