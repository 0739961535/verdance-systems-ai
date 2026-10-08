import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { markSvg } from "@/components/brand/marks";

export const alt = "Verdance Systems AI. We don't talk about AI. We ship it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card in the site's own type: Satoshi for the line, Instrument
 * Serif italic for the accent word, the flow mark, azure on near-black.
 * Fonts are read from src/fonts (Satoshi fetched at build, Instrument
 * Serif committed under the OFL).
 */
export default async function OpengraphImage() {
  const root = process.cwd();
  const [satoshi, serif] = await Promise.all([
    readFile(join(root, "src/fonts/satoshi/Satoshi-Medium.woff")),
    readFile(join(root, "src/fonts/instrument/InstrumentSerif-Italic.ttf")),
  ]);
  const mark = `data:image/svg+xml;base64,${Buffer.from(markSvg("flow", { tone: "dark", size: 96 })).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 76px",
          background:
            "radial-gradient(900px 520px at 85% 15%, rgba(61,126,255,0.32), transparent 60%), radial-gradient(700px 400px at 0% 100%, rgba(47,107,234,0.18), transparent 60%), #0A0A0B",
          color: "#F2EFE9",
          fontFamily: "Satoshi",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <img src={mark} width={64} height={64} alt="" />
          <span style={{ fontSize: 38, letterSpacing: -1.2 }}>Verdance</span>
          <span style={{ fontSize: 38, fontFamily: "Instrument Serif", color: "#8F8B84" }}>Systems AI</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 96, lineHeight: 1, letterSpacing: -4 }}>
          <span>We don&apos;t talk about AI.</span>
          <span style={{ display: "flex", gap: 24 }}>
            We <span style={{ fontFamily: "Instrument Serif", color: "#6E9CFF", fontSize: 108 }}>ship</span> it.
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#8F8B84" }}>
          <span>Every enquiry answered within 5 minutes, day or night.</span>
          <span>South Africa</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Satoshi", data: satoshi, weight: 500, style: "normal" },
        { name: "Instrument Serif", data: serif, weight: 400, style: "italic" },
      ],
    },
  );
}
