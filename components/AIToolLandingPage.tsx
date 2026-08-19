import Link from "next/link";
import { formatTemplate } from "@/lib/i18n/format-template";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

export type AIToolConfig = Dictionary["aiTools"][keyof Dictionary["aiTools"]];

export interface AIToolLandingProps {
  toolName: string;
  config: AIToolConfig;
  dict: Dictionary;
  locale: string;
}

export default function AIToolLandingPage({ toolName, config, dict, locale }: AIToolLandingProps) {
  const t = dict.aiLanding;
  const steps = config.steps;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: config.schemaName,
    description: config.schemaDescription,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: `Step ${index + 1}`,
      text: step,
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <header>
        <p className="eyebrow">{formatTemplate(t.worksWith, { toolName })}</p>
        <h1 className="headline mt-6">{config.headline}</h1>
        <p className="lead mt-5">{config.description}</p>
      </header>

      <section className="mt-20">
        <h2 className="section-head">{t.howItWorks}</h2>
        <ol className="mt-8">
          {steps.map((step, index) => (
            <li
              key={index}
              className="grid gap-2 border-t border-line-soft py-6 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-8"
            >
              <span className="text-xs font-medium tracking-[0.14em] text-brand-500 sm:pt-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-[15px] leading-relaxed text-mute">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20">
        <h2 className="section-head">{t.commonUseCases}</h2>
        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line-soft bg-line-soft sm:grid-cols-2">
          {config.useCases.map((useCase) => (
            <div key={useCase} className="bg-surface px-5 py-4 text-sm text-mute">
              {useCase}
            </div>
          ))}
        </div>
      </section>

      <section className="glow-cta mt-20 rounded-xl border border-line-soft px-6 py-14 text-center">
        <h2 className="section-head mx-auto max-w-[20ch]">
          {formatTemplate(t.readyToPublish, { toolName })}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] text-mute">{t.noAccount}</p>
        <Link href={`/${locale}/new`} className="btn btn-primary btn-lg mt-8">
          {t.ctaUpload}
        </Link>
      </section>

      <section className="mt-20">
        <h2 className="section-head">{formatTemplate(t.whyUseLeme, { toolName })}</h2>
        <ul className="mt-8 list-outside list-disc space-y-3 pl-5 text-[15px] text-mute marker:text-brand-500">
          {t.whyPoints.map((point) => (
            <li key={point}>{formatTemplate(point, { toolName })}</li>
          ))}
        </ul>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </div>
  );
}
