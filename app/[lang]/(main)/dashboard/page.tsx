import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getDateLocale } from "@/lib/i18n/date-locale";
import DashboardContent from "@/components/DashboardContent";

export default async function DashboardPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return <DashboardContent dict={dict} locale={locale} dateLocale={getDateLocale(locale)} />;
}
