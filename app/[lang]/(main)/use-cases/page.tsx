import type { Metadata } from "next";
import Link from "next/link";
import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.footer.useCases,
    description: dict.useCases.metadataDescription,
    openGraph: {
      title: dict.useCases.metadataOpenGraphTitle,
      description: dict.useCases.metadataDescription,
    },
  };
}

export default async function UseCasesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const u = dict.useCases;

  return (
    <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
      <div className="text-center">
        <h1 className="headline">{u.title}</h1>
        <p className="lead mx-auto mt-5">{u.subtitle}</p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line-soft bg-line-soft sm:grid-cols-2">
        {u.items.map((useCase) => (
          <div key={useCase.title} className="flex flex-col bg-surface p-7">
            <h2 className="subhead">{useCase.title}</h2>
            <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-mute">
              {useCase.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {useCase.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-line-soft px-2.5 py-1 text-xs text-mute-dim"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="glow-cta mt-20 rounded-xl border border-line-soft px-6 py-16 text-center">
        <h2 className="headline mx-auto max-w-[18ch]">{u.ctaTitle}</h2>
        <p className="lead mx-auto mt-5">{u.ctaSubtitle}</p>
        <Link href={`/${locale}/new`} className="btn btn-primary btn-lg mt-8">
          {u.ctaButton}
        </Link>
      </div>
    </div>
  );
}
