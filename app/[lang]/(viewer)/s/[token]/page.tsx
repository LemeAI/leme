import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageViewerLayout from "@/components/PageViewerLayout";
import Navbar from "@/components/Navbar";
import ExpiredNotice from "@/components/ExpiredNotice";
import ContributionsPanel from "@/components/ContributionsPanel";
import { apiUrl, getPageSourceUrl } from "@/lib/api-url";
import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { formatTemplate } from "@/lib/i18n/format-template";
import type { Contribution, PageByTokenResponse } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; token: string }>;
}): Promise<Metadata> {
  const { token, lang } = await params;
  const result = await getPageByToken(token);
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.leme-app.com";

  if (result.status !== "ok" || !result.data) {
    return {
      title: dict.meta.sharedPageNotFound,
    };
  }

  const { page } = result.data;
  const title = page.title || dict.meta.untitledPage;
  const description =
    page.description ?? formatTemplate(dict.meta.viewPageDescription, { title });

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}/s/${token}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/s/${token}`,
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

interface TokenLookupResult {
  status: "ok" | "expired" | "not_found";
  data: PageByTokenResponse | null;
}

async function getPageByToken(token: string): Promise<TokenLookupResult> {
  const res = await fetch(apiUrl(`/share-links/${token}`), { cache: "no-store" });

  if (res.status === 410) return { status: "expired", data: null };
  if (!res.ok) return { status: "not_found", data: null };
  return { status: "ok", data: await res.json() };
}

async function getContributions(pageId: string): Promise<Contribution[]> {
  const res = await fetch(apiUrl(`/pages/${pageId}/contributions`), { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

async function getPageSource(pageId: string): Promise<string> {
  try {
    const res = await fetch(getPageSourceUrl(pageId), { cache: "no-store" });
    return res.ok ? await res.text() : "";
  } catch {
    return "";
  }
}

export default async function SharedPage({
  params,
}: {
  params: Promise<{ lang: string; token: string }>;
}) {
  const { token, lang } = await params;
  const result = await getPageByToken(token);
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.leme-app.com";

  if (result.status === "expired") {
    return (
      <>
        <Navbar dict={dict} locale={locale} />
        <ExpiredNotice locale={locale} dict={dict} />
      </>
    );
  }
  if (result.status === "not_found" || !result.data) {
    notFound();
  }

  const { page } = result.data;
  const showHeader = !page.hide_branding;

  const [contributions, pageHtml] = page.allow_contributions
    ? await Promise.all([getContributions(page.id), getPageSource(page.id)])
    : [[], ""];

  return (
    <>
      {showHeader && <Navbar dict={dict} locale={locale} />}
      <PageViewerLayout
        page={page}
        locale={locale}
        dict={dict}
        fullHeight={!showHeader}
        shareUrl={`${siteUrl}/${locale}/s/${token}`}
        sidebar={
          page.allow_contributions ? (
            <ContributionsPanel
              pageId={page.id}
              pageTitle={page.title}
              pageHtml={pageHtml}
              initialContributions={contributions}
              dict={dict}
            />
          ) : null
        }
      />
    </>
  );
}
