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
  const cfg = dict.aiTools.lovable;
  return {
    title: cfg.metadataTitle,
    description: cfg.metadataDescription,
    openGraph: {
      title: cfg.ogTitle,
      description: cfg.ogDescription,
    },
  };
}

export default async function LovableHTMLHostingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const cfg = dict.aiTools.lovable;

  return <AIToolLandingPage toolName="Lovable" config={cfg} dict={dict} locale={locale} />;
}
