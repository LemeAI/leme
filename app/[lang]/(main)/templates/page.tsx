import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import TemplatesLibraryContent from "@/components/TemplatesLibraryContent";

export default async function TemplatesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <main className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <TemplatesLibraryContent dict={dict} locale={locale} />
    </main>
  );
}
