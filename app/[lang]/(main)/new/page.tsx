import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import NewUploadContent from "@/components/NewUploadContent";

export default async function NewUploadPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return <NewUploadContent locale={locale} dict={dict} />;
}
