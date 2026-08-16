"use client";

import UploadLanding from "@/components/UploadLanding";
import { isExpired } from "@/lib/plans";
import { useAuth } from "@/lib/auth";
import { useMyPages } from "@/lib/hooks/useMyPages";
import { useProfile } from "@/lib/hooks/useProfile";

// Mesma tela da home, mas sem o redirect automático pro upload mais
// recente — é o destino do botão "+ Novo upload" pra quem já tem uploads.
// Se o usuário (logado ou anônimo) já tiver arquivos salvos e ativos,
// mostramos eles acima do formulário, junto com o mesmo CTA de upgrade
// pra Pro usado em /p/[id] (PlanUpsellCard) quando ele não é Pro.
export default function NewUploadPage() {
  const { user } = useAuth();
  const { pages } = useMyPages();
  const { data: profileData } = useProfile();

  const savedPages = pages.filter((page) => !isExpired(page.expires_at));
  const effectivePlan = user ? profileData?.profile.plan ?? "free" : "anonymous";

  return <UploadLanding savedPages={savedPages} plan={effectivePlan} />;
}
