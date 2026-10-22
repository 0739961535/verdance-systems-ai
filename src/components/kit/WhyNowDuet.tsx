/**
 * "Why now": a short, factual note on Anthropic's own small-business agent.
 * Plain text, no logos, no endorsement implied. Works on night bands (tone
 * "night") and on the site's canvas (tone "page").
 */
const SOURCE = "https://claude.com/resources/articles/claude-duet";

export function WhyNowDuet({ tone = "night" }: { tone?: "night" | "page" }) {
  const night = tone === "night";
  const ink = night ? "#F2F5FC" : "var(--color-ink)";
  const soft = night ? "rgba(234, 240, 255, 0.82)" : "var(--color-ink-soft)";
  const muted = night ? "#9AA3B5" : "var(--color-ink-muted)";
  const link = night ? "#BFD2FF" : "var(--color-accent)";
  return (
    <div
      aria-labelledby="why-now-k"
      className="rounded-[22px] p-6 md:p-9"
      style={{ border: `1px solid ${night ? "rgba(255,255,255,0.10)" : "var(--hairline-2)"}`, background: night ? "rgba(255,255,255,0.03)" : "transparent" }}
    >
      <p id="why-now-k" className="eyebrow" style={{ color: night ? "#8FB0FF" : undefined }}>
        Why now
      </p>
      <p className="mt-4 max-w-[38ch] font-display" style={{ color: ink, fontSize: "clamp(1.4rem, 1vw + 1.1rem, 2rem)", lineHeight: 1.2, letterSpacing: "-0.025em" }}>
        Even Anthropic, the company behind Claude, has just launched an AI agent for small business owners.
      </p>
      <p className="mt-4 max-w-[60ch] text-[1.0625rem] leading-[1.6]" style={{ color: soft }}>
        We build the version made for your business: connected to your systems, with you approving what matters, every step tracked so
        you see the progress, and available in South Africa and the UK today.
      </p>
      <p className="mt-5 text-[0.875rem] leading-[1.5]" style={{ color: muted }}>
        Source:{" "}
        <a href={SOURCE} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4" style={{ color: link }}>
          Claude Duet, announced 21 October 2026
        </a>
        <br />
        Verdance is independent and not affiliated with Anthropic.
      </p>
    </div>
  );
}
