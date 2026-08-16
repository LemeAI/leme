import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return {
    title: dict.meta.dashboardTitle,
    description: dict.meta.dashboardDescription,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
