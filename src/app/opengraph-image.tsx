import { ImageResponse } from "next/og";

export const alt = "Verdance Systems AI — AI that books more customers for local businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social card, generated at build/request time. Dark canvas + azure
// accent, mirroring the site's identity. No external assets required.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(1000px 500px at 78% 20%, rgba(79,141,255,0.28), transparent 60%), #050709",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              border: "1px solid rgba(79,141,255,0.5)",
              color: "#7DABFF",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            V
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#FFFFFF", fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>
              Verdance
            </span>
            <span style={{ color: "#8598B6", fontSize: 16, letterSpacing: 6, textTransform: "uppercase" }}>
              Systems AI
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span
            style={{
              color: "#4F8DFF",
              fontSize: 20,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            AI that books more customers
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", maxWidth: 900 }}>
            <span style={{ color: "#FFFFFF", fontSize: 76, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2 }}>
              The customers you&apos;re already losing —{" "}
              <span style={{ color: "#7DABFF", fontStyle: "italic" }}>recovered.</span>
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#8598B6", fontSize: 22 }}>
          <span>Done-for-you AI · Free consult first</span>
          <span style={{ color: "#33415A" }}>·</span>
          <span>Serving businesses worldwide</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
