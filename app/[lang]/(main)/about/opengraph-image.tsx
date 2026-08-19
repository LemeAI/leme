import { OG_SIZE, renderOgImage } from "@/lib/og";

export const runtime = "edge";

export const alt = "About Leme — Publish AI-generated HTML with a shareable link";
export const size = OG_SIZE;

export default function OpenGraphImage() {
  return renderOgImage("The fastest way to publish AI-generated HTML.");
}
