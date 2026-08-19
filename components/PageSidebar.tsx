"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import ShareButton from "@/components/ShareButton";
import UploadsMenu from "@/components/UploadsMenu";
import PlanUpsellCard from "@/components/PlanUpsellCard";
import PageMemoryPanel from "@/components/PageMemoryPanel";
import PageSettingsPanel from "@/components/PageSettingsPanel";
import PublishTemplatePanel from "@/components/PublishTemplatePanel";
import { useAuth } from "@/lib/auth";
import { useMyPages } from "@/lib/hooks/useMyPages";
import { useProfile } from "@/lib/hooks/useProfile";
import { isExpired, type EffectivePlan } from "@/lib/plans";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

// Conteúdo client-side da sidebar de /p/[id]: precisa saber quem é o
// visitante (logado, anônimo com uploads salvos, ou nenhum dos dois) pra
// listar os próprios uploads e mostrar o CTA de upgrade certo — por isso
// vive num Client Component separado do viewer principal (que continua
// Server Component, já que o conteúdo da página em si é público).
export default function PageSidebar({
  currentPageId,
  locale,
  dict,
}: {
  currentPageId: string;
  locale: Locale;
  dict: Dictionary;
}) {
  const router = useRouter();
  const { user } = useAuth();
  const { pages, refresh } = useMyPages();
  const { data: profileData } = useProfile();

  const availablePages = pages.filter((page) => !isExpired(page.expires_at));
  const effectivePlan: EffectivePlan = user ? profileData?.profile.plan ?? "free" : "anonymous";
  const currentPage = pages.find((page) => page.id === currentPageId);
  const ownsPage = currentPage !== undefined;
  const canConfigure = ownsPage && effectivePlan === "pro";

  return (
    <>
      {ownsPage && (
        <div className="border-b border-line-soft p-4">
          <ShareButton pageId={currentPageId} dict={dict} />
        </div>
      )}

      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-4">
        <UploadsMenu
          pages={availablePages}
          currentPageId={currentPageId}
          dict={dict}
          locale={locale}
          onDeleted={(pageId) => {
            refresh();
            if (pageId !== currentPageId) return;

            const next = availablePages.find((page) => page.id !== pageId);
            router.replace(next ? `/${locale}/p/${next.id}` : `/${locale}/new`);
          }}
        />
        {canConfigure && currentPage && (
          <PageSettingsPanel
            pageId={currentPageId}
            allowContributions={currentPage.allow_contributions}
            hideBranding={currentPage.hide_branding}
            allowForks={currentPage.allow_forks}
            dict={dict}
            onChange={() => refresh()}
          />
        )}

        {canConfigure && currentPage && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-1">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-mute-dim">
                {dict.templates?.publishPanel?.title ?? "Template"}
              </p>
              <span className="rounded-full bg-brand-500/15 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-brand-500">
                {dict.pageSettings.proOnly}
              </span>
            </div>
            <div className="panel p-4">
              <PublishTemplatePanel
                pageId={currentPageId}
                pageTitle={currentPage.title}
                pageDescription={currentPage.description}
                icon={{
                  type: currentPage.icon_type ?? "emoji",
                  value: currentPage.icon_value ?? "🚀",
                  color: currentPage.icon_color ?? "#ff6a00",
                }}
                dict={dict}
                onPublished={() => refresh()}
              />
            </div>
          </div>
        )}

        {ownsPage && <PageMemoryPanel pageId={currentPageId} dict={dict} />}

        <PlanUpsellCard plan={effectivePlan} activePagesCount={availablePages.length} locale={locale} dict={dict} />
      </div>

      <div className="border-t border-line-soft p-4">
        <Link href={`/${locale}/new`} className="btn btn-primary w-full justify-center">
          + {dict.nav.newUpload}
        </Link>
      </div>
    </>
  );
}
