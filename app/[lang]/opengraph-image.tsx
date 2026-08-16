import { OG_SIZE, renderOgImage } from "@/lib/og";

export const runtime = "edge";

export const alt = "Leme — Upload AI-generated HTML and share with a link";
export const size = OG_SIZE;

export default function OpenGraphImage() {
  return renderOgImage("Upload AI-generated HTML files and share them with anyone through a link.");
}
