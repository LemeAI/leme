import Link from "next/link";
import { getPlanLimits, type EffectivePlan } from "@/lib/plans";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import { formatTemplate } from "@/lib/i18n/format-template";

// CTA compacto pra sidebar de /p/[id]: sinaliza pra quem não é Pro que
// existe um limite de páginas ativas, puxando pra /pricing. Não renderiza
// nada pro plano Pro (sem limite, não faz sentido mostrar).
export default function PlanUpsellCard({
  plan,
  activePagesCount,
  locale,
  dict,
}: {
  plan: EffectivePlan;
  activePagesCount: number;
  locale: Locale;
  dict: Dictionary;
}) {
  const limits = getPlanLimits(plan);
  if (limits.maxActivePages === null) return null;

  const atLimit = activePagesCount >= limits.maxActivePages;
  const p = dict.planUpsell;
  const max = limits.maxActivePages;

  return (
    <div className="panel-accent flex flex-col gap-3 p-5">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-mute-dim">
        {dict.planLabels[plan]}
      </p>
      <p className="text-sm leading-relaxed text-white">
        {atLimit
          ? formatTemplate(p.atLimit, { max })
          : formatTemplate(p.usage, { active: activePagesCount, max })}{" "}
        {p.description}
      </p>
      <Link href={`/${locale}/pricing`} className="btn btn-brand mt-1 w-full justify-center">
        {p.cta}
      </Link>
    </div>
  );
}
