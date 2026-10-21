import { ArrowUpRight } from "lucide-react";
import film from "./flight/film-manifest.json";
import { Reveal, SplitWords } from "@/components/primitives/Reveal";
import { CTA_PRIMARY, SITE } from "@/data/site";
import { GENERIC_BOOK_URL } from "@/data/niches";
import { WhatsAppIcon } from "@/components/sections/v4/WhatsAppIcon";

/* ------------------------------------------------------------------ */
/* The closing scene: one line, one button, WhatsApp beside it, over   */
/* the film's orbit frame (design review fix 9). id="audit" so the     */
/* sticky bar steps aside; the footer drops its own button on home.    */
/* ------------------------------------------------------------------ */
const STILL = (n: string, ext: string) => `/flight/film/${n}.${ext}?v=${film.v}`;

export function SimpleFinalCTA({ title = ["Find out where your", "hours", "go."] }: { title?: [string, string, string] }) {
  return (
    <section id="audit" className="close-scene relative isolate overflow-hidden" aria-labelledby="final-title" style={{ scrollMarginTop: "5rem" }}>
      <picture className="close-scene-bg">
        <source type="image/avif" srcSet={STILL("still-d", "avif")} />
        <img src={STILL("still-d", "webp")} alt="" width={film.desktop.width} height={film.desktop.height} loading="lazy" decoding="async" />
      </picture>
      <div className="container-wide relative">
        <Reveal>
          <h2
            id="final-title"
            className="max-w-[12ch] font-display text-[#F2F5FC]"
            style={{ fontSize: "clamp(2.75rem, 5vw + 1rem, 5.75rem)", lineHeight: 0.96, letterSpacing: "-0.045em" }}
          >
            <SplitWords text={title[0]} /> <span className="italic-accent">{title[1]}</span> <SplitWords text={title[2]} />
          </h2>
          <p className="mt-6 max-w-md text-[1.0625rem] leading-[1.6] text-[rgba(234,240,255,0.84)]">
            A free 30-minute call. We look at how enquiries reach you today and show you what we would build first.
          </p>
          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a href={GENERIC_BOOK_URL} className="btn btn-accent min-h-[52px] w-full justify-center px-6 text-[1.02rem] sm:w-auto">
              {CTA_PRIMARY}
              <ArrowUpRight size={17} aria-hidden />
            </a>
            <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className="flm-wa">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
