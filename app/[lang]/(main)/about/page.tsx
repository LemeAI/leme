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
    title: `${dict.footer.about} ${dict.site.name}`,
    description: dict.about.metadataDescription,
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const a = dict.about;

  return (
    <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <article>
        <h1 className="headline">{a.title}</h1>
        <p className="lead mt-6">{a.intro}</p>

        <h2 className="section-head mt-16">{a.whyTitle}</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-mute">{a.whyText}</p>

        <h2 className="section-head mt-12">{a.whatTitle}</h2>
        <ul className="mt-4 list-outside list-disc space-y-2 pl-5 text-[15px] text-mute marker:text-brand-500">
          {a.whatItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="mt-12">
          <Link href={`/${locale}/pricing`} className="btn btn-primary">
            {a.cta}
          </Link>
        </div>
      </article>
    </div>
  );
}
