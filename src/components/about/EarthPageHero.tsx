import type { ComponentProps } from "react";
import { PageHero } from "@/components/kit/PageHero";
import { EarthArt } from "@/components/visuals/EarthArt";

/**
 * The shared PageHero on a night band with the Earth header art behind it
 * (the /about hero). Same props as PageHero. The band keeps it dark in both
 * themes, so the text tokens are the night ones and the scrim math holds.
 */
const CSS = `
.eph { position: relative; isolation: isolate; --color-ink-faint: #9AA3B5; --color-ink-muted: #9AA3B5; --bg: #070A14; --bg-2: #0A0F1E; }
.eph > section.bg-canvas { background: transparent; }
.eph > section > .aurora, .eph > section > .hero-grid { display: none; }
`;

export function EarthPageHero(props: ComponentProps<typeof PageHero>) {
  return (
    <div className="eph band-night">
      <style>{CSS}</style>
      <EarthArt />
      <PageHero {...props} />
    </div>
  );
}
