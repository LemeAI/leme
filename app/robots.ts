import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.leme-app.com";

  // Rotas privadas que devem ser indexadas em todos os locales.
  const privatePrefixes = ["/dashboard", "/mine", "/new", "/auth", "/billing"];
  const disallow = privatePrefixes.flatMap((prefix) =>
    locales.map((locale) => `/${locale}${prefix}`),
  );

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
