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

const CHANNELS = [
  { channel: "Website chat", line: "Customer question received", side: "in" },
  { channel: "WhatsApp", line: "Order question answered", side: "out" },
  { channel: "Email", line: "Follow-up sent", side: "out" },
] as const;

function ChatVisual() {
  return (
    <div
      aria-hidden
      className="rounded-[18px] border border-[color:var(--hairline-2)] bg-canvas-2 p-4 sm:p-6"
    >
      <ul className="grid gap-3">
        {CHANNELS.map(({ channel, line, side }) => (
          <li key={channel} className={side === "out" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={`max-w-[85%] rounded-[16px] border border-[color:var(--hairline-2)] px-4 py-3 ${
                side === "out" ? "bg-[color:var(--surface-tint-3)]" : "bg-canvas"
              }`}
            >
              <p className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-[color:var(--color-ink-muted)]">
                {channel}
              </p>
              <div className="mt-2 flex flex-col gap-1.5">
                <span className="text-[0.95rem] text-[color:var(--color-ink)]">{line}</span>
                <span className="h-1.5 w-28 rounded-full bg-[color:var(--hairline-2)]" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RecentWork() {
  return (
    <section className="section-pad bg-canvas-2" aria-labelledby="work-title">
      <div className="container-wide">
        <div className="max-w-3xl">
          <p className="eyebrow">Recent work</p>
          <h2 id="work-title" className="h2 mt-5">
            Built and running for South African businesses.
          </h2>
          <p className={`mt-6 max-w-xl ${BODY}`}>
            Two recent builds. Client names are kept private.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:mt-16 md:gap-8">
          <li>
            <article className={CARD} aria-labelledby="work-studio">
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
            <article className={CARD} aria-labelledby="work-ecom">
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
