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
    title: dict.privacy.metadataTitle,
    description: dict.privacy.metadataDescription,
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const p = dict.privacy;

  return (
    <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <article>
        <header className="pb-10">
          <h1 className="headline">{p.title}</h1>
          <p className="mt-4 text-xs tracking-[0.08em] text-mute-dim">{p.lastUpdated}</p>
        </header>

        {p.sections.map((section) => (
          <section key={section.title} className="border-t border-line-soft py-10">
            <h2 className="section-head">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-5 text-base leading-[1.75] text-mute">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </article>
    </div>
  );
}
