import type { ReactNode } from "react";
import HtmlViewer from "@/components/HtmlViewer";
import CopyLink from "@/components/CopyLink";
import CollapsibleSidebar from "@/components/CollapsibleSidebar";
import { getPageContentUrl } from "@/lib/api-url";
import { formatDate } from "@/lib/utils";
import { formatTemplate } from "@/lib/i18n/format-template";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

interface ViewerPage {
  id: string;
  title: string;
  description: string | null;
  views_count: number;
  created_at: string;
}

// Layout usado em /s/[token]: o HTML ocupa todo o espaço à esquerda, e uma
// sidebar traz título/ações à direita (pode ser escondida via
// CollapsibleSidebar). O conteúdo da sidebar (comentários etc.) é passado
// por quem usa o layout, via a prop "sidebar". Como esta página já É o
// link compartilhado, mostramos ele pronto pra copiar — nunca um botão que
// gera um link novo.
export default function PageViewerLayout({
  page,
  shareUrl,
  sidebar,
  locale,
  dict,
  fullHeight = false,
}: {
  page: ViewerPage;
  shareUrl: string;
  sidebar: ReactNode;
  locale: Locale;
  dict: Dictionary;
  fullHeight?: boolean;
}) {
  const d = dict.pageViewer;

  return (
    <div
      className={`flex w-full flex-col overflow-hidden sm:flex-row ${
        fullHeight ? "h-screen" : "h-[calc(100vh-4rem)]"
      }`}
    >
      <div className="min-h-0 flex-1 bg-black">
        <HtmlViewer src={getPageContentUrl(page.id)} title={page.title} fill />
      </div>

      <CollapsibleSidebar
        dict={dict}
        reopenLabel={sidebar ? d.reopenLabel : undefined}
        defaultOpen={false}
        className="flex h-[45vh] w-full flex-col border-t border-line-soft bg-black sm:h-full sm:w-[380px] sm:shrink-0 sm:border-t-0 sm:border-l"
      >
        <div className="border-b border-line-soft px-4 py-3.5">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-mute-dim">
            {d.pageLink}
          </p>
          <CopyLink url={shareUrl} dict={dict} />
        </div>

        <div className="border-b border-line-soft px-4 py-3.5">
          <h1 className="truncate font-medium tracking-[-0.01em]">{page.title}</h1>
          {page.description && (
            <p className="mt-1 line-clamp-2 text-sm text-mute">{page.description}</p>
          )}
          <p className="mt-2 text-xs text-mute-dim">
            {formatTemplate(d.views, { count: page.views_count })} ·{" "}
            {formatTemplate(d.uploadedOn, { date: formatDate(page.created_at, locale) })} ·{" "}
            {d.sourceNote}
          </p>
        </div>

        {sidebar && <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">{sidebar}</div>}
      </CollapsibleSidebar>
    </div>
  );
}
