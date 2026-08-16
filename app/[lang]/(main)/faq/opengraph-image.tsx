import { OG_SIZE, renderOgImage } from "@/lib/og";

export const runtime = "edge";

export const alt = "Leme FAQ — Common questions about sharing AI-generated HTML";
export const size = OG_SIZE;

export default function OpenGraphImage() {
  return renderOgImage("FAQ — Common questions answered.");
}
