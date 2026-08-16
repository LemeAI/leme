import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AuthProvider } from "@/lib/auth";
import { SWRProvider } from "@/lib/swr";
import "./globals.css";

// Poppins é a tipografia da identidade visual "Leme" (Regular/Medium/
// Semibold/Bold). Carregada como CSS variable e usada como fonte padrão
// via tailwind.config.ts (theme.fontFamily.sans).
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.leme-app.com";
const SITE_NAME = "Leme";
const DEFAULT_DESCRIPTION =
  "Upload AI-generated HTML files and share them with anyone through a link. Collaborate with comments, suggestions, and forks.";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: "%s | Leme",
  },
  description: DEFAULT_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [`${SITE_URL}/opengraph-image`],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [`${SITE_URL}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
  },
};

// Layout raiz: propositalmente sem Navbar. As páginas de visualização
// (/s/[token] e /p/[id]) precisam ocupar a tela inteira, sem "cara de site".
// O Navbar só é injetado pelo layout do grupo (main) — ver app/(main)/layout.tsx.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen bg-white text-ink-900 antialiased">
        <AuthProvider>
          <SWRProvider>{children}</SWRProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
