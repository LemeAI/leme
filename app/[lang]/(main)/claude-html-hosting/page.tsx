import type { Metadata } from "next";
import AIToolLandingPage from "@/components/AIToolLandingPage";
import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const cfg = dict.aiTools.claude;
  return {
    title: cfg.metadataTitle,
    description: cfg.metadataDescription,
    openGraph: {
      title: cfg.ogTitle,
      description: cfg.ogDescription,
    },
  };
}

export default async function ClaudeHTMLHostingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const cfg = dict.aiTools.claude;

  return <AIToolLandingPage toolName="Claude" config={cfg} dict={dict} locale={locale} />;
}
