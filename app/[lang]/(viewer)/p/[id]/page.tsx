import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HtmlViewer from "@/components/HtmlViewer";
import Navbar from "@/components/Navbar";
import ExpiredNotice from "@/components/ExpiredNotice";
import PageSidebar from "@/components/PageSidebar";
import CollapsibleSidebar from "@/components/CollapsibleSidebar";
import { apiUrl, getPageContentUrl } from "@/lib/api-url";
import { isExpired } from "@/lib/plans";
import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { formatTemplate } from "@/lib/i18n/format-template";
import type { HtmlPage } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { id, lang } = await params;
  const page = await getPage(id);
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.leme-app.com";

  if (!page) {
    return {
      title: dict.meta.pageNotFound,
    };
  }

  const title = page.title || dict.meta.untitledPage;
  const description =
    page.description ?? formatTemplate(dict.meta.viewPageDescription, { title });

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}/p/${id}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/p/${id}`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

async function getPage(id: string): Promise<HtmlPage | null> {
  const res = await fetch(apiUrl(`/pages/${id}`), { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function PublicPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { id, lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const page = await getPage(id);

  if (!page) {
    notFound();
  }

  if (isExpired(page.expires_at)) {
    return (
      <>
        <Navbar dict={dict} locale={locale} />
        <ExpiredNotice dict={dict} locale={locale} />
      </>
    );
  }

  const showHeader = !page.hide_branding;

  return (
    <>
      {showHeader && <Navbar dict={dict} locale={locale} />}
      <div
        className={`flex w-full flex-col overflow-hidden sm:flex-row ${
          showHeader ? "h-[calc(100vh-4rem)]" : "h-screen"
        }`}
      >
        <div className="min-h-0 flex-1 bg-black">
          <HtmlViewer src={getPageContentUrl(page.id)} title={page.title} fill />
        </div>

        <CollapsibleSidebar
          dict={dict}
          className="flex h-[45vh] w-full flex-col border-t border-line-soft bg-black sm:h-full sm:w-[320px] sm:shrink-0 sm:border-t-0 sm:border-l"
        >
          <PageSidebar currentPageId={page.id} locale={locale} dict={dict} />
        </CollapsibleSidebar>
      </div>
    </>
  );
}
