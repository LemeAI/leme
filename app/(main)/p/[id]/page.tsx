import { notFound } from "next/navigation";
import HtmlViewer from "@/components/HtmlViewer";
import ExpiredNotice from "@/components/ExpiredNotice";
import PageSidebar from "@/components/PageSidebar";
import CollapsibleSidebar from "@/components/CollapsibleSidebar";
import { apiUrl, getPageContentUrl } from "@/lib/api-url";
import { isExpired } from "@/lib/plans";
import type { HtmlPage } from "@/lib/types";

async function getPage(id: string): Promise<HtmlPage | null> {
  const res = await fetch(apiUrl(`/pages/${id}`), { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

// Acesso público direto pelo id, sem precisar de um token de compartilhamento.
// O viewer principal continua Server Component (busca só dados públicos do
// backend); a sidebar (compartilhar, próprios uploads, upsell de plano) é
// um Client Component (PageSidebar) porque depende de saber quem é o
// visitante — ver notas lá.
export default async function PublicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await getPage(id);

  if (!page) {
    notFound();
  }

  if (isExpired(page.expires_at)) {
    return <ExpiredNotice />;
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col overflow-hidden sm:flex-row">
      <div className="min-h-0 flex-1 bg-white">
        <HtmlViewer src={getPageContentUrl(page.id)} title={page.title} fill />
      </div>

      <CollapsibleSidebar className="flex h-[45vh] w-full flex-col border-t border-ink-100 bg-white sm:h-full sm:w-[320px] sm:shrink-0 sm:border-t-0 sm:border-l">
        <PageSidebar currentPageId={page.id} />
      </CollapsibleSidebar>
    </div>
  );
}
