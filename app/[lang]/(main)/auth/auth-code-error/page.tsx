import Link from "next/link";
import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function AuthCodeErrorPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const a = dict.auth;

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-5 px-5 py-24 text-center sm:px-8">
      <h1 className="section-head">{a.codeErrorTitle}</h1>
      <p className="text-[15px] leading-relaxed text-mute">{a.codeErrorSubtitle}</p>
      <Link href={`/${locale}/login`} className="btn btn-primary mx-auto mt-2 w-fit">
        {a.codeErrorCta}
      </Link>
    </div>
  );
}
