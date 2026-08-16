import { OG_SIZE, renderOgImage } from "@/lib/og";

export const runtime = "edge";

export const alt = "Leme Use Cases — Publish AI-generated HTML for any project";
export const size = OG_SIZE;

export default function OpenGraphImage() {
  return renderOgImage("Use Cases — What you can publish.");
}
