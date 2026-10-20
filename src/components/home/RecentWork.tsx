import { SplitWords } from "@/components/primitives/Reveal";
/**
 * Recent work: two anonymised proof cards.
 * Rules: no client names, logos, URLs, phone numbers, faces, invented numbers or testimonials.
 * Screenshots in /public/work have the studio's logo and location line blurred.
 * Server component, no client JS, no animation.
 */

const BODY = "text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]";
const CARD =
  "rounded-[22px] border border-[color:var(--hairline-2)] bg-canvas p-5 sm:p-8 md:p-10";

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-[color:var(--hairline-2)] pt-4">
      <dt className="text-[0.8rem] font-medium uppercase tracking-[0.08em] text-[color:var(--color-ink-muted)]">
        {label}
      </dt>
      <dd className={`mt-1.5 ${BODY}`}>{children}</dd>
    </div>
  );
}

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
      <figcaption className="mt-3 text-[0.8125rem] italic text-[color:var(--color-ink-muted)]">
        Illustration of the kind of thread it handles. The customer and order are made up.
      </figcaption>
    </figure>
  );
}

export function RecentWork() {
  return (
    <section className="bg-canvas-2 pt-10 pb-12 md:pt-20 md:pb-16" aria-labelledby="work-title">
      <div className="container-wide">
        <div className="max-w-3xl" data-reveal="">
          <p className="eyebrow"><span className="chap-n">05</span> Proof</p>
          <h2 id="work-title" className="h2 mt-5">
            <SplitWords text="Built and running for South African businesses." />
          </h2>
          <p className={`mt-6 max-w-xl ${BODY}`}>
            Two recent builds. Client names are kept private.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:mt-16 md:gap-8">
          <li>
            <article className={`${CARD} lift`} aria-labelledby="work-studio" data-reveal="">
              <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-14">
                <div className="sm:pb-8">
                  <StudioVisual />
                </div>
                <div>
                  <h3
                    id="work-studio"
                    className="font-display text-[1.4rem] text-[color:var(--color-ink)] sm:text-[1.6rem]"
                    style={{ lineHeight: 1.15, letterSpacing: "-0.025em" }}
                  >
                    A South African luxury home design and build studio
                  </h3>
                  <dl className="mt-6 grid gap-4">
                    <Detail label="What we built">A premium website and a project-brief form.</Detail>
                    <Detail label="What it does">
                      The form asks for budget, estate and timeline. Every enquiry goes straight into
                      their sales pipeline.
                    </Detail>
                    <Detail label="Result">Enquiries arrive qualified, with the details needed to quote.</Detail>
                  </dl>
                </div>
              </div>
            </article>
          </li>

          <li>
            <article className={`${CARD} lift`} aria-labelledby="work-ecom" data-reveal="">
              <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-14">
                <ChatVisual />
                <div>
                  <h3
                    id="work-ecom"
                    className="font-display text-[1.4rem] text-[color:var(--color-ink)] sm:text-[1.6rem]"
                    style={{ lineHeight: 1.15, letterSpacing: "-0.025em" }}
                  >
                    A South African e-commerce brand
                  </h3>
                  <dl className="mt-6 grid gap-4">
                    <Detail label="What runs">
                      Every customer message answered across website chat, WhatsApp and email, after
                      hours included.
                    </Detail>
                    <Detail label="What it does">
                      Order questions and follow-ups handled, with a person taking over when it matters.
                    </Detail>
                    {/* TODO(Daniel): add "464 conversations in September, 138 after hours or at weekends" once Peter gives written OK. Do not publish before. */}
                    <Detail label="Result">Live and answering every day.</Detail>
                  </dl>
                </div>
              </div>
            </article>
          </li>
        </ul>
      </div>
    </section>
  );
}
