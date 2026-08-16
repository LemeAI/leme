import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Poppins } from "next/font/google";
import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { AuthProvider } from "@/lib/auth";
import { SWRProvider } from "@/lib/swr";
import "@/app/globals.css";

// Poppins é a tipografia da identidade visual "Leme" (Regular/Medium/
// Semibold/Bold). Carregada como CSS variable no layout raiz e usada como
// fonte padrão via tailwind.config.ts (theme.fontFamily.sans).
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Este É o root layout da aplicação (não existe app/layout.tsx acima dele):
// é o único jeito de renderizar <html lang> já no HTML servido, em vez de
// corrigir o atributo no cliente depois da hidratação — que deixaria todos
// os 6 locales anunciando lang="en" para crawlers e LLMs.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!locales.includes(lang as Locale)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.leme-app.com";
  const canonicalUrl = `${siteUrl}/${locale}`;

  const alternates: Record<string, string> = {};
  for (const l of locales) {
    alternates[l] = `${siteUrl}/${l}`;
  }

  return {
    title: {
      default: dict.site.name,
      template: `%s | ${dict.site.name}`,
    },
    description: dict.site.description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : locale,
      url: canonicalUrl,
      siteName: dict.site.name,
      title: dict.site.name,
      description: dict.site.description,
      images: [`${siteUrl}/${locale}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      site: "@lemeapp", // TODO: substituir pelo handle real
      title: dict.site.name,
      description: dict.site.description,
      images: [`${siteUrl}/${locale}/opengraph-image`],
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
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!locales.includes(lang as Locale)) {
    notFound();
  }

  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.leme-app.com";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: dict.site.name,
        description: dict.site.description,
        inLanguage: locale,
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/${locale}/?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebApplication",
        "@id": `${siteUrl}/#webapplication`,
        name: dict.site.name,
        url: `${siteUrl}/${locale}`,
        description: dict.site.description,
        applicationCategory: "UtilityApplication",
        applicationSubCategory: "WebApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires a modern web browser with JavaScript enabled.",
        featureList: [
          "Upload AI-generated HTML files up to 2MB",
          "Get a public shareable link instantly",
          "Collaborate with comments, suggestions, and forks",
          "No account required to try",
          "Pro plan with unlimited pages and no watermark",
        ],
        screenshot: {
          "@type": "ImageObject",
          url: `${siteUrl}/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
        },
        offers: [
          {
            "@type": "Offer",
            name: "Leme Free",
            price: "0",
            priceCurrency: "USD",
            priceValidUntil: "2030-12-31",
            description: "Free plan with limited active pages and a small watermark.",
          },
          {
            "@type": "Offer",
            name: "Leme Pro",
            price: "9",
            priceCurrency: "USD",
            priceValidUntil: "2030-12-31",
            description: "Unlimited active pages, no watermark, and pages never expire. Billed monthly or annually.",
          },
        ],
        creator: {
          "@id": `${siteUrl}/#organization`,
        },
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
      {
        "@type": "Product",
        "@id": `${siteUrl}/#product-pro`,
        name: "Leme Pro",
        description: "Pro plan for Leme: unlimited AI-generated HTML pages, no watermark, and permanent hosting.",
        url: `${siteUrl}/${locale}/pricing`,
        brand: {
          "@id": `${siteUrl}/#organization`,
        },
        offers: {
          "@type": "Offer",
          name: "Leme Pro Monthly",
          url: `${siteUrl}/${locale}/pricing`,
          price: "9",
          priceCurrency: "USD",
          priceValidUntil: "2030-12-31",
          availability: "https://schema.org/InStock",
          billingIncrement: 1,
          unitCode: "MON",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: dict.site.name,
        url: siteUrl,
        logo: `${siteUrl}/icon.svg`,
        email: "hello@leme-app.com",
        sameAs: [
          // TODO: adicionar links reais quando os perfis forem criados na Fase 4
        ],
      },
    ],
  };

  return (
    <html lang={locale} className={poppins.variable} suppressHydrationWarning>
      <body className="min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <AuthProvider>
          <SWRProvider>{children}</SWRProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
