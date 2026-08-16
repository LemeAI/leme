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
    title: dict.footer.faq,
    description: dict.faq.metadataDescription,
    openGraph: {
      title: dict.faq.metadataOpenGraphTitle,
      description: dict.faq.metadataDescription,
    },
  };
}

export default async function FAQPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const f = dict.faq;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: f.items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <h1 className="headline">{f.title}</h1>
      <p className="lead mt-5">{f.subtitle}</p>

      <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line-soft bg-line-soft">
        {f.items.map((faq) => (
          <div key={faq.question} className="bg-surface p-7">
            <h2 className="text-[17px] font-medium tracking-[-0.01em]">{faq.question}</h2>
            <p className="mt-2.5 text-[15px] leading-relaxed text-mute">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="panel mt-12 p-7 text-center">
        <h2 className="subhead">{f.stillQuestionsTitle}</h2>
        <p className="mt-2 text-[15px] text-mute">
          {f.stillQuestionsText}{" "}
          <a
            href="mailto:hello@leme-app.com"
            className="text-brand-500 transition-colors hover:text-brand-400"
          >
            hello@leme-app.com
          </a>
          .
        </p>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </div>
  );
}
