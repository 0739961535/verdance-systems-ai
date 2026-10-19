import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * "Built for our own business": Ashford, the system Verdance runs on.
 * One screen: a heading, one drawn command-centre panel and five short
 * lines. Always dark, like a control room. The panel is an illustration:
 * no real screen, names or numbers, and nothing on how it is built.
 */

const C = {
  bg: "#07090E",
  panel: "#0B0E15",
  line: "rgba(255,255,255,0.08)",
  ink: "#EDEFF3",
  soft: "rgba(237,239,243,0.76)",
  muted: "rgba(237,239,243,0.6)",
  accent: "#8FB0FF",
  ok: "#3DD68C",
};

const DOES = [
  { title: "We call it from the phone.", body: "It reads out new leads and the day's tasks, then gets on with them." },
  { title: "Nothing goes out until we say yes.", body: "Replies, follow-ups and reports are drafted and wait for approval." },
  { title: "Every enquiry is tracked.", body: "From the first message to the booked call." },
  { title: "Clients see their results live.", body: "Each client has a portal with their own numbers." },
  { title: "It gets better every night.", body: "It reviews our playbooks overnight and suggests what to change." },
];

const QUEUE = [
  { task: "Reply to a new enquiry", status: "Waiting for approval", tone: "wait" },
  { task: "Follow-up to a quiet lead", status: "Approved", tone: "ok" },
  { task: "Monthly report for a client", status: "Sent", tone: "done" },
] as const;

/** The drawn command centre: realistic layout, made-up wording, no data. */
function CommandPanel() {
  return (
    <div
      role="img"
      aria-label="Illustration of our command centre: a morning brief, and drafted messages waiting for approval"
      className="overflow-hidden rounded-[20px]"
      style={{ background: C.panel, border: `1px solid ${C.line}` }}
    >
      <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: `1px solid ${C.line}` }}>
        <span className="text-[0.95rem] font-semibold" style={{ color: C.ink }}>
          Today
        </span>
        <span className="inline-flex items-center gap-2 text-[0.8125rem]" style={{ color: C.muted }}>
          <span className="h-2 w-2 rounded-full" style={{ background: C.ok }} />
          Running
        </span>
      </div>
      <div className="px-5 py-4" style={{ borderBottom: `1px solid ${C.line}` }}>
        <p className="text-[0.8125rem] font-medium uppercase tracking-[0.1em]" style={{ color: C.accent }}>
          Morning brief
        </p>
        <p className="mt-2 text-[1rem] leading-[1.5]" style={{ color: C.ink }}>
          New enquiries came in overnight. A quote is waiting on you. The rest is handled.
        </p>
        <div aria-hidden className="mt-3 flex h-6 items-end gap-[3px]">
          {[5, 9, 14, 8, 18, 11, 22, 13, 7, 16, 10, 20, 12, 6, 15, 9, 19, 11, 8, 14, 6, 12].map((h, i) => (
            <span key={i} className="w-[3px] rounded-full" style={{ height: h, background: i % 5 === 0 ? C.accent : "rgba(255,255,255,0.22)" }} />
          ))}
        </div>
      </div>
      <ul>
        {QUEUE.map((q) => (
          <li key={q.task} className="flex items-center justify-between gap-3 px-5 py-3.5" style={{ borderBottom: `1px solid ${C.line}` }}>
            <span className="text-[0.95rem]" style={{ color: C.soft }}>
              {q.task}
            </span>
            <span
              className="shrink-0 rounded-full px-2.5 py-1 text-[0.8125rem]"
              style={{
                color: q.tone === "wait" ? "#F2C46D" : q.tone === "ok" ? C.ok : C.muted,
                border: `1px solid ${q.tone === "wait" ? "rgba(242,196,109,0.4)" : q.tone === "ok" ? "rgba(61,214,140,0.4)" : C.line}`,
              }}
            >
              {q.status}
            </span>
          </li>
        ))}
      </ul>
      <p className="px-5 py-3 text-[0.8125rem]" style={{ color: C.muted }}>
        Illustration. The wording is made up.
      </p>
    </div>
  );
}

export function BuiltForUs() {
  return (
    <section className="py-20 md:py-28" style={{ background: C.bg, color: C.ink }} aria-labelledby="ours-title">
      <div className="container-wide grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
        <div data-reveal="">
          <p className="text-[0.8125rem] font-medium uppercase tracking-[0.14em]" style={{ color: C.accent }}>
            Built for our own business
          </p>
          <h2
            id="ours-title"
            className="mt-4 font-display"
            style={{ fontSize: "clamp(2rem, 2.2vw + 1.3rem, 3.25rem)", lineHeight: 1.04, letterSpacing: "-0.035em", color: C.ink }}
          >
            We run our own company on the same systems we build for you.
          </h2>
          <ul className="mt-8 grid gap-4">
            {DOES.map((d) => (
              <li key={d.title} className="text-[1rem] leading-[1.5]" style={{ color: C.soft }}>
                <span className="font-semibold" style={{ color: C.ink }}>
                  {d.title}
                </span>{" "}
                {d.body}
              </li>
            ))}
          </ul>
          <Link
            href="/services/ai-operations-system"
            className="mt-8 inline-flex min-h-11 items-center gap-2 text-[0.95rem] font-medium hover:underline"
            style={{ color: C.accent }}
          >
            How the same systems work for you
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <div data-reveal="" style={{ ["--reveal-delay" as string]: "0.08s" }}>
          <CommandPanel />
        </div>
      </div>
    </section>
  );
}
