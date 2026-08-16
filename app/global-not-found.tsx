import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { defaultLocale } from "@/lib/i18n/config";
import "@/app/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

// O root layout da aplicação vive em app/[lang]/layout.tsx, então um 404
// disparado fora de um locale válido (ex: /xx/foo, com dynamicParams=false)
// não tem nenhum <html>/<body> pra herdar. Este arquivo fornece o documento
// completo nesse caso. Fica em inglês por não haver locale conhecido aqui.
export default function GlobalNotFound() {
  return (
    <html lang={defaultLocale} className={poppins.variable} suppressHydrationWarning>
      <body className="min-h-screen">
        <main className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
          <p className="text-xs font-medium tracking-[0.14em] text-brand-500">404</p>
          <h1 className="headline">Page not found</h1>
          <p className="max-w-md text-[15px] text-mute">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <a href={`/${defaultLocale}`} className="btn btn-primary mt-2">
            Back to home
          </a>
        </main>
      </body>
    </html>
  );
}
