import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.leme-app.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/pricing", "/about", "/features", "/use-cases", "/docs", "/faq", "/blog", "/terms", "/privacy", "/contact"],
        disallow: ["/dashboard", "/mine", "/new", "/auth", "/billing"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
