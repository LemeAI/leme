import type { Metadata } from "next";
import Link from "next/link";
import { PLAN_LIMITS } from "@/lib/plans";
import ProPlanCard from "@/components/ProPlanCard";
import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { formatTemplate } from "@/lib/i18n/format-template";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.footer.pricing,
    description: dict.pricing.subtitle,
  };
}

const FREE = PLAN_LIMITS.free;
const ANON = PLAN_LIMITS.anonymous;
const ANON_MAX_PAGES = ANON.maxActivePages ?? 1;
const ANON_RETENTION = ANON.retentionDays ?? 2;
const FREE_MAX_PAGES = FREE.maxActivePages ?? 3;
const FREE_RETENTION = FREE.retentionDays ?? 30;

export default async function PricingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const p = dict.pricing;

  return (
    <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
      <div className="text-center">
        <h1 className="headline">{p.title}</h1>
        <p className="lead mx-auto mt-5">{p.subtitle}</p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <PlanCard
          name={p.noAccount.name}
          price={p.noAccount.price}
          description={p.noAccount.description}
          features={[
            formatTemplate(p.noAccount.features.pages, { count: ANON_MAX_PAGES }),
            formatTemplate(p.noAccount.features.expires, { days: ANON_RETENTION }),
            p.noAccount.features.watermark,
          ]}
          cta={{ label: p.noAccount.cta, href: `/${locale}` }}
        />

        <PlanCard
          name={p.free.name}
          price={p.free.price}
          description={p.free.description}
          features={[
            formatTemplate(p.free.features.pages, { count: FREE_MAX_PAGES }),
            formatTemplate(p.free.features.expires, { days: FREE_RETENTION }),
            p.free.features.watermark,
          ]}
          cta={{ label: p.free.cta, href: `/${locale}/login` }}
          highlighted
        />

        <ProPlanCard locale={locale} dict={p.pro} />
      </div>

      <p className="mx-auto mt-12 max-w-[52ch] text-center text-xs text-mute-dim">{p.footerNote}</p>
    </div>
  );
}

function PlanCard({
  name,
  price,
  description,
  features,
  cta,
  highlighted = false,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: { label: string; href?: string; disabled?: boolean };
  highlighted?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-5 p-7 ${
        highlighted ? "rounded-xl border border-line bg-surface" : "panel"
      }`}
    >
      <div>
        <h2 className="subhead">{name}</h2>
        <p className="mt-1.5 text-sm text-mute">{description}</p>
      </div>

      <p className="text-[32px] font-medium tracking-[-0.035em]">{price}</p>

      <ul className="flex flex-1 flex-col gap-2.5 text-sm text-mute">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <span className="mt-px text-brand-500">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      {cta.disabled || !cta.href ? (
        <span className="w-full rounded-md border border-line-soft px-4 py-2.5 text-center text-sm font-medium text-mute-dim">
          {cta.label}
        </span>
      ) : (
        <Link
          href={cta.href}
          className={`btn w-full justify-center ${highlighted ? "btn-primary" : "btn-ghost"}`}
        >
          {cta.label}
        </Link>
      )}
    </div>
  );
}
