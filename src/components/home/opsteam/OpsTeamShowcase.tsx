import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AI_TEAM_PATH } from "@/data/aiTeam";
import { CommandMock } from "./CommandMock";
import { OpsCapabilities } from "./OpsCapabilities";
import { OpsDepth } from "./OpsDepth";

/**
 * The Operations Team on the home page: a sample command centre, what it can
 * do, and how deep it goes. Sits after "Our belief" on a band-night ground.
 * All numbers in the command centre are sample data, labelled on screen.
 */
export function OpsTeamShowcase({ depth = true }: { depth?: boolean } = {}) {
  return (
    <section className="band-night chapter-pad ots" aria-labelledby="ots-title">
      <style>{CSS}</style>
      <div className="container-wide">
        <div className="ots-head" data-reveal="">
          <p className="eyebrow">The Operations Team</p>
          <h2 id="ots-title" className="h2 mt-4 ots-h">
            A team of agents that runs the work. <span className="italic-accent">You make the calls.</span>
          </h2>
          <p className="lead mt-6">
            One agent per job, inside the tools you already use. It answers, follows up, does the admin and tells you what needs you.
          </p>
        </div>

        <div className="ots-mock">
          <CommandMock />
          <p className="museum mt-3">Sample data. Your command centre shows your own business. We run Verdance on the same system.</p>
        </div>

        <div className="ots-sub" data-reveal="">
          <h3 className="ots-sub-h">What it can do</h3>
          <p className="ots-sub-b">Deep inside your business, not a chatbot on the side.</p>
        </div>
        <OpsCapabilities />

        {depth ? (
          <>
            <div className="ots-sub" data-reveal="">
              <h3 className="ots-sub-h">How deep it goes</h3>
              <p className="ots-sub-b">Start with one job. Add the next when the first has proved itself in your own numbers.</p>
            </div>
            <OpsDepth />
          </>
        ) : null}

        <div className="ots-cta" data-reveal="">
          <Link href={AI_TEAM_PATH} className="btn btn-accent ots-btn">
            See the Operations Team
            <ArrowUpRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

const CSS = `
.ots { --ops-tile: #0A1226; --ops-node: #060B1A; overflow-x: clip; }
.ots-h { max-width: 18ch; text-wrap: balance; }
.ots-mock { margin-top: 48px; }
@media (min-width: 1024px) { .ots-mock { margin-top: 72px; } }
.ots-sub { margin: 88px 0 28px; display: grid; gap: 8px; }
@media (min-width: 1024px) { .ots-sub { margin: 128px 0 36px; grid-template-columns: 1fr auto; align-items: end; gap: 24px; } }
.ots-sub-h { margin: 0; font-family: var(--font-display); font-weight: 600; font-size: clamp(1.6rem, 1.2vw + 1.2rem, 2.25rem); letter-spacing: -0.03em; line-height: 1.1; color: var(--color-ink); }
.ots-sub-b { margin: 0; max-width: 40ch; font-size: 1rem; line-height: 1.55; color: var(--color-ink-soft); }
.ots-cta { margin-top: 64px; }
.ots-btn { min-height: 52px; padding: 0 24px; justify-content: center; }
@media (max-width: 639px) { .ots-btn { width: 100%; } }
`;
