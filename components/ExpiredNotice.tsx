import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

export default function ExpiredNotice({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const e = dict.expiredNotice;

  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-5 px-5 text-center">
      <h1 className="section-head">{e.title}</h1>
      <p className="max-w-sm text-[15px] leading-relaxed text-mute">{e.description}</p>
      <Link href={`/${locale}`} className="btn btn-primary mt-2">
        {e.cta}
      </Link>
    </div>
  );
}
