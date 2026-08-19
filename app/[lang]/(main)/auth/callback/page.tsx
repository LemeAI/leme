import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import AuthCallbackContent from "@/components/AuthCallbackContent";

export default async function AuthCallbackPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return <AuthCallbackContent locale={locale} dict={dict} />;
}
