import { ArrowUpRight } from "lucide-react";
import { AI_WHATSAPP, waLink } from "@/data/assistant";
import { WhatsAppIcon } from "@/components/sections/v4/WhatsAppIcon";

/** "Our WhatsApp assistant is live. Test it yourself." Hidden until the number is set in src/data/assistant.ts. */
export function AssistantLive() {
  if (!AI_WHATSAPP) return null;
  return (
    <section className="band-night" aria-labelledby="al-title" style={{ padding: "72px 0" }}>
      <div className="container-wide flex flex-col items-center gap-5 text-center">
        <h2 id="al-title" className="h2" style={{ fontSize: "clamp(1.8rem, 2vw + 1rem, 2.8rem)" }}>
          Our WhatsApp assistant is live. <span className="italic-accent">Test it yourself.</span>
        </h2>
        <p className="lead" style={{ maxWidth: "40ch" }}>Ask it anything about Verdance. It answers within 60 seconds, day or night.</p>
        <a href={waLink(AI_WHATSAPP, "Hi, I'd like to test the assistant.")} target="_blank" rel="noopener noreferrer" className="btn btn-accent min-h-[52px] px-7">
          <WhatsAppIcon className="h-4 w-4" />
          Message the assistant
          <ArrowUpRight size={16} aria-hidden />
        </a>
      </div>
    </section>
  );
}
