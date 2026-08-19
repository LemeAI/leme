import { OG_SIZE, renderOgImage } from "@/lib/og";

export const runtime = "edge";

export const alt = "Leme Blog — Tips for publishing AI-generated HTML";
export const size = OG_SIZE;

export default function OpenGraphImage() {
  return renderOgImage("Blog — Publish AI-generated HTML.");
}
