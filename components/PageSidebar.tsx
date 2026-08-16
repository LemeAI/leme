"use client";

import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import UploadsMenu from "@/components/UploadsMenu";
import PlanUpsellCard from "@/components/PlanUpsellCard";
import { useAuth } from "@/lib/auth";
import { useMyPages } from "@/lib/hooks/useMyPages";
import { useProfile } from "@/lib/hooks/useProfile";
import { isExpired, type EffectivePlan } from "@/lib/plans";

// Conteúdo client-side da sidebar de /p/[id]: precisa saber quem é o
// visitante (logado, anônimo com uploads salvos, ou nenhum dos dois) pra
// listar os próprios uploads e mostrar o CTA de upgrade certo — por isso
// vive num Client Component separado do viewer principal (que continua
// Server Component, já que o conteúdo da página em si é público).
export default function PageSidebar({ currentPageId }: { currentPageId: string }) {
  const { user } = useAuth();
  const { pages } = useMyPages();
  const { data: profileData } = useProfile();

  const availablePages = pages.filter((page) => !isExpired(page.expires_at));
  const effectivePlan: EffectivePlan = user ? profileData?.profile.plan ?? "free" : "anonymous";
  const ownsPage = pages.some((page) => page.id === currentPageId);

  return (
    <>
      {ownsPage && (
        <div className="border-b border-ink-100 p-4">
          <ShareButton pageId={currentPageId} />
        </div>
      )}

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4">
        <UploadsMenu pages={availablePages} currentPageId={currentPageId} />
        <PlanUpsellCard plan={effectivePlan} activePagesCount={availablePages.length} />
      </div>

      <div className="border-t border-ink-100 p-4">
        <Link
          href="/new"
          className="flex w-full items-center justify-center rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-600"
        >
          + New upload
        </Link>
      </div>
    </>
  );
}
