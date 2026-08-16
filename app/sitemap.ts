import type { MetadataRoute } from "next";
import { locales, type Locale } from "@/lib/i18n/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.leme-app.com";

  // Rotas estáticas que existem hoje, em todos os locales suportados.
  // Atualizar quando novas páginas de conteúdo forem adicionadas.
  const staticRoutes = [
    "",
    "/pricing",
    "/about",
    "/features",
    "/use-cases",
    "/faq",
    "/blog",
    "/blog/how-to-publish-html-from-ai",
    "/blog/share-ai-landing-page-in-30-seconds",
    "/blog/collect-feedback-on-html-prototypes",
    "/chatgpt-html-hosting",
    "/claude-html-hosting",
    "/gemini-html-hosting",
    "/v0-html-hosting",
    "/lovable-html-hosting",
    "/bolt-html-hosting",
    "/terms",
    "/privacy",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of staticRoutes) {
    for (const locale of locales) {
      const url = `${siteUrl}/${locale}${route}`;
      const alternates: Record<string, string> = {};
      for (const alt of locales) {
        alternates[alt] = `${siteUrl}/${alt}${route}`;
      }

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.7,
        alternates: {
          languages: alternates,
        },
      });
    }
  }

  return entries;
}
