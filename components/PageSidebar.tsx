"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import ShareButton from "@/components/ShareButton";
import UploadsMenu from "@/components/UploadsMenu";
import PlanUpsellCard from "@/components/PlanUpsellCard";
import PageMemoryPanel from "@/components/PageMemoryPanel";
import PageSettingsPanel from "@/components/PageSettingsPanel";
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
