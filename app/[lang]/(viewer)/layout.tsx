import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";

export default async function ViewerLayout({
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

  return <main>{children}</main>;
}
