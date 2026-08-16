import type { Metadata } from "next";
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
    title: dict.footer.features,
    description: dict.features.metadataDescription,
  };
}

export default async function FeaturesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const f = dict.features;

  return (
    <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
      <div className="text-center">
        <h1 className="headline">{f.title}</h1>
        <p className="lead mx-auto mt-5">{f.subtitle}</p>
      </div>

      <section className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line-soft bg-line-soft sm:grid-cols-2">
        {f.items.map((feature) => (
          <div key={feature.title} className="bg-surface p-7">
            <h2 className="subhead">{feature.title}</h2>
            <p className="mt-2.5 text-[15px] leading-relaxed text-mute">{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
