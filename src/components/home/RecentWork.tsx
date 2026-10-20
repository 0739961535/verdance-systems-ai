import { ArrowUpRight } from "lucide-react";
import { CTA_PRIMARY } from "@/data/site";
import { GENERIC_BOOK_URL } from "@/data/booking";
import { SplitWords } from "@/components/primitives/Reveal";
/**
 * 08 Proof: two anonymised builds as editorial spreads on the paper band.
 * Rules: no client names, logos, URLs, phone numbers, faces, invented numbers or testimonials.
 * Screenshots in /public/work have the studio's logo and location line blurred.
 * Server component, no client JS, no animation.
 */

const BODY = "text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]";
function StudioVisual() {
  return (
    <div className="relative">
      {/* Desktop screenshot in a thin browser frame (hidden on small phones) */}
      <figure className="hidden sm:block sm:pr-16 md:pr-20">
        <div className="overflow-hidden rounded-[14px] border border-[color:var(--hairline-2)] bg-[#141414]">
          <div className="flex h-8 items-center gap-1.5 border-b border-white/10 px-3" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="ml-3 h-4 flex-1 max-w-[16rem] rounded-full bg-white/10" />
          </div>
          <picture>
            <source srcSet="/work/studio-home-desktop.avif" type="image/avif" />
            <img
              src="/work/studio-home-desktop.webp"
              width={1600}
              height={1000}
              loading="lazy"
              decoding="async"
              alt="Home page of a luxury home design and build studio's website, built by Verdance (name hidden)"
              className="block h-auto w-full"
            />
          </picture>
        </div>
      </figure>

      {/* Phone screenshot: large on its own on phones, overlapping the corner from sm up */}
      <figure className="mx-auto w-[min(78%,300px)] sm:absolute sm:-bottom-8 sm:right-0 sm:mx-0 sm:w-[24%] sm:min-w-[130px] sm:max-w-[190px]">
        <div className="overflow-hidden rounded-[24px] border border-[color:var(--hairline-3)] bg-[#141414] p-1.5 sm:rounded-[20px] sm:p-1">
          <picture>
            <source srcSet="/work/studio-home-phone.avif" type="image/avif" />
            <img
              src="/work/studio-home-phone.webp"
              width={780}
              height={1390}
              loading="lazy"
              decoding="async"
              alt="The same studio's home page on a phone, built by Verdance (name hidden)"
              className="block h-auto w-full rounded-[18px] sm:rounded-[16px]"
            />
          </picture>
        </div>
      </figure>
    </div>
  );
}

/** An illustration of the kind of thread that runs for them: made-up customer and order. */
const THREAD = [
  { side: "in", time: "21:14", text: "Hi, I ordered on Wednesday. Any idea when it arrives?" },
  { side: "out", time: "21:14", text: "Hi Lerato, it left our warehouse on Friday and it's due on Tuesday. Here's your tracking link." },
  { side: "in", time: "21:16", text: "Perfect, thank you" },
  { side: "out", time: "21:16", text: "My pleasure. I'll message you here if anything changes." },
] as const;

function ChatVisual() {
  return (
    <figure className="m-0">
      <div aria-hidden className="overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#0A1226] text-[#E9EDEF]">
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1D3F8F] text-[0.8rem] font-semibold">S</span>
          <span>
            <span className="block text-[0.95rem] font-semibold">Store assistant</span>
            <span className="block text-[0.8rem] text-[#8b93a3]">WhatsApp · Sunday evening</span>
          </span>
        </div>
        <ul className="grid gap-2.5 p-4">
          {THREAD.map((m, i) => (
            <li key={i} className={m.side === "out" ? "flex justify-end" : "flex justify-start"}>
              <span
                className={`max-w-[84%] rounded-[14px] px-3.5 py-2.5 text-[0.95rem] leading-[1.45] ${
                  m.side === "out" ? "rounded-tr-[4px] bg-[#1D3F8F]" : "rounded-tl-[4px] bg-[#1F2C34]"
                }`}
              >
                {m.text}
                <span className="ml-2 align-bottom text-[0.75rem] text-white/55">{m.time}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}

/**
 * The copy for each case lives in one place, keyed by case, so a spread can only
 * ever show its own "What we built" and "What it does" lines.
 */
const CASES = {
  ecom: {
    built: "Replies to every order question across website chat, WhatsApp and email, after hours included.",
    does: "Order questions and follow-ups handled, with a person taking over when it matters.",
  },
  studio: {
    built: "A premium website and a project brief form.",
    does: "Enquiries arrive with the details needed to quote.",
  },
} as const;

function rowsFor(c: { built: string; does: string }): [string, string][] {
  return [
    ["What we built", c.built],
    ["What it does", c.does],
  ];
}

/** One case as an editorial spread: a big picture, then what we built and what it does. */
function Spread({ id, title, visual, caption, rows, flip }: { id: string; title: string; visual: React.ReactNode; caption: string; rows: [string, string][]; flip?: boolean }) {
  return (
    <article aria-labelledby={id} data-reveal="" className={`work-spread ${flip ? "is-flip" : ""}`}>
      <figure className="work-pic m-0">
        {visual}
        <figcaption className="museum mt-3">{caption}</figcaption>
      </figure>
      <div className="work-text">
        <h3 id={id} className="font-display text-[1.375rem] text-[color:var(--color-ink)] lg:text-[1.75rem]" style={{ lineHeight: 1.2, letterSpacing: "-0.02em" }}>
          {title}
        </h3>
        <dl className="mt-6 grid">
          {rows.map(([k, v]) => (
            <div key={`${id}-${k}`} className="border-t border-[color:var(--hairline-2)] py-4">
              <dt className="font-mono text-[0.75rem] text-[color:var(--color-ink-muted)]">{k}</dt>
              <dd className={`mt-1 ${BODY}`}>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

const CSS = `
.work-spread { display: grid; gap: 24px; }
.work-spread + .work-spread { margin-top: 64px; }
@media (min-width: 1024px) {
  .work-spread { grid-template-columns: 7fr 4fr; column-gap: 8.5%; align-items: center; }
  .work-spread.is-flip { grid-template-columns: 4fr 7fr; }
  .work-spread.is-flip .work-pic { order: 2; }
  .work-spread + .work-spread { margin-top: 128px; }
}
`;

export function RecentWork() {
  return (
    <section className="band-paper chapter-pad" aria-labelledby="work-title">
      <style>{CSS}</style>
      <div className="container-wide">
        <div className="max-w-3xl" data-reveal="">
          <p className="eyebrow"><span className="chap-n">08</span> Proof</p>
          <h2 id="work-title" className="h2 mt-4">
            <SplitWords text="Built and running for South African" /> <span className="italic-accent">businesses.</span>
          </h2>
          <p className="lead mt-6">Two recent builds. Client names stay private.</p>
        </div>

        <div className="mt-12 lg:mt-16">
          {/* TODO(Daniel): add a "Since" row (month and year) to each case, and one real
              number for the e-commerce brand once Peter gives written OK. Nothing shows until then. */}
          <Spread
            id="work-ecom"
            title="A South African e-commerce brand"
            visual={<ChatVisual />}
            caption="The customer and order in this picture are made up. The system is real."
            rows={rowsFor(CASES.ecom)}
          />
          <Spread
            id="work-studio"
            flip
            title="A South African luxury home design and build studio"
            visual={<StudioVisual />}
            caption="Website and project brief form, built by Verdance. Name hidden at the client's request."
            rows={rowsFor(CASES.studio)}
          />
        </div>

        <div className="mt-16 lg:mt-24">
          <a href={GENERIC_BOOK_URL} className="btn btn-accent min-h-[52px] w-full justify-center px-7 text-[1.02rem] sm:w-auto">
            {CTA_PRIMARY}
            <ArrowUpRight size={17} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
