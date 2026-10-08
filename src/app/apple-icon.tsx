import { ImageResponse } from "next/og";
import { markSvg } from "@/components/brand/marks";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon: the flow mark on the dark tile. */
export default function AppleIcon() {
  const svg = markSvg("flow", { tone: "dark", tile: true, size: 180 });
  return new ImageResponse(
    (
      <img src={`data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`} width={180} height={180} alt="" />
    ),
    size,
  );
}
