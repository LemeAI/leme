"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Locale } from "@/lib/i18n/config";

// Rotas onde o footer não deve aparecer para não roubar espaço de telas
// imersivas (visualização de páginas, dashboards, fluxos de auth etc.).
// O prefixo de locale é removido do pathname antes da verificação.
const HIDDEN_FOOTER_PREFIXES = ["/p/", "/s/", "/dashboard", "/mine", "/new", "/billing", "/auth"];

export default function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const pathname = usePathname() ?? "";
  const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), "");
  const shouldHide = HIDDEN_FOOTER_PREFIXES.some((prefix) =>
    pathWithoutLocale.startsWith(prefix),
  );
  if (shouldHide) return null;

  return (
    <footer className="border-t border-line-soft bg-black">
      <div className="wrap py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="sm:col-span-2 md:col-span-1">
            <Link
              href={`/${locale}`}
              className="text-[17px] font-medium tracking-[-0.02em] text-white"
            >
              {dict.site.name}
            </Link>
            <p className="mt-3 text-sm text-mute">{dict.site.description}</p>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-mute-dim">{dict.footer.product}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-mute">
              <li>
                <Link href={`/${locale}/features`} className="transition-colors hover:text-white">
                  {dict.footer.features}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/pricing`} className="transition-colors hover:text-white">
                  {dict.footer.pricing}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/use-cases`} className="transition-colors hover:text-white">
                  {dict.footer.useCases}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="transition-colors hover:text-white">
                  {dict.footer.about}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-mute-dim">{dict.footer.resources}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-mute">
              <li>
                <Link href={`/${locale}/blog`} className="transition-colors hover:text-white">
                  {dict.footer.blog}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/faq`} className="transition-colors hover:text-white">
                  {dict.footer.faq}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="transition-colors hover:text-white">
                  {dict.footer.terms}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="transition-colors hover:text-white">
                  {dict.footer.privacy}
                </Link>
              </li>
              <li>
                <a href="mailto:hello@leme-app.com" className="transition-colors hover:text-white">
                  {dict.footer.contact}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-mute-dim">{dict.footer.social}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-mute">
              <li>
                <a
                  href="https://twitter.com/lemeapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/leme-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/leme-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-line-soft pt-7 text-xs text-mute-dim sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {dict.site.name}. {dict.footer.rights}</p>
          <p>{dict.footer.madeFor}</p>
        </div>
      </div>
    </footer>
  );
}
