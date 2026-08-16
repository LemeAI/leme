import { notFound } from "next/navigation";
import PageViewerLayout from "@/components/PageViewerLayout";
import ExpiredNotice from "@/components/ExpiredNotice";
import ContributionsPanel from "@/components/ContributionsPanel";
import { apiUrl, getPageSourceUrl } from "@/lib/api-url";
import { getSiteUrl } from "@/lib/utils";
import type { Contribution, PageByTokenResponse } from "@/lib/types";

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

export default async function SharedPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const result = await getPageByToken(token);

  if (result.status === "expired") {
    return <ExpiredNotice />;
  }
  if (result.status === "not_found" || !result.data) {
    notFound();
  }

  const { page } = result.data;

  const [contributions, pageHtml] = await Promise.all([
    getContributions(page.id),
    getPageSource(page.id),
  ]);

  return (
    <PageViewerLayout
      page={page}
      sourceNote="via shared link"
      shareUrl={`${getSiteUrl()}/s/${token}`}
      sidebar={
        <ContributionsPanel
          pageId={page.id}
          pageTitle={page.title}
          pageHtml={pageHtml}
          initialContributions={contributions}
        />
      }
    />
  );
}
