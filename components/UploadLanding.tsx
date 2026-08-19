import UploadForm from "@/components/UploadForm";
import Link from "next/link";
import PlanUpsellCard from "@/components/PlanUpsellCard";
import { formatDate } from "@/lib/utils";
import { getDateLocale } from "@/lib/i18n/date-locale";
import type { EffectivePlan } from "@/lib/plans";
import type { HtmlPage } from "@/lib/types";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

// Tela enxuta, sem discurso de venda — quem chegou aqui já decidiu que
// quer subir um arquivo. O foco é só o formulário. Se o usuário já tiver
// arquivos salvos (savedPages), mostramos eles acima do formulário, pra
// não parecer que a tela está vazia quando na verdade ele já tem algo.
// Pra quem não é Pro, mostramos o mesmo CTA de upgrade usado em /p/[id].
export default function UploadLanding({
  savedPages = [],
  plan = "anonymous",
  locale,
  dict,
}: {
  savedPages?: HtmlPage[];
  plan?: EffectivePlan;
  locale: Locale;
  dict: Dictionary;
}) {
  const u = dict.uploadLanding;
  const dateLocale = getDateLocale(locale);

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-7 px-5 py-16 sm:px-8">
      <h1 className="title-page text-center">{u.title}</h1>

      {savedPages.length > 0 && (
        <div className="panel flex flex-col gap-3 p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-mute-dim">
            {savedPages.length > 1 ? u.savedFiles : u.savedFile}
          </p>
          <ul className="flex flex-col gap-1">
            {savedPages.map((page) => (
              <li key={page.id}>
                <Link
                  href={`/${locale}/p/${page.id}`}
                  className="flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-white/5"
                >
                  <span className="truncate font-medium">{page.title}</span>
                  <span className="shrink-0 text-xs text-mute-dim">
                    {formatDate(page.created_at, dateLocale)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <PlanUpsellCard plan={plan} activePagesCount={savedPages.length} locale={locale} dict={dict} />

      <UploadForm dict={dict} />

      <p className="text-center text-xs leading-relaxed text-mute-dim">
        {u.noAccount.split("{link}")[0]}
        <Link
          href={`/${locale}/mine`}
          className="font-medium text-brand-500 transition-colors hover:text-brand-400"
        >
          {u.myUploads}
        </Link>
        {u.noAccount.split("{link}")[1]}
      </p>
    </div>
  );
}
