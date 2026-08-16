import { OG_SIZE, renderOgImage } from "@/lib/og";

export const runtime = "edge";

export const alt = "Leme Features — Upload, share, and collaborate on AI-generated HTML";
export const size = OG_SIZE;

export default function OpenGraphImage() {
  return renderOgImage("Upload, share, and collaborate on AI-generated HTML.");
}
