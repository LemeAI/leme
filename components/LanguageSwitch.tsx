"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabels, localeShortLabel, type Locale } from "@/lib/i18n/config";

// Seletor de idioma da navbar. O gatilho mostra só a sigla (PT, EN, JA...)
// para ficar discreto no topo; o nome nativo aparece apenas dentro do menu,
// onde é o que permite reconhecer o idioma antes de trocar.
export default function LanguageSwitch({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Remove o prefixo de locale atual para construir o link nos outros idiomas.
  const pathWithoutLocale = pathname.replace(new RegExp(`^/${currentLocale}`), "") || "/";

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={() => scheduleClose()}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="link-nav inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium tracking-[0.08em]"
        aria-label="Switch language"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {localeShortLabel(currentLocale)}
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-3 w-3">
          <path
            d="M5 7.5 10 12.5 15 7.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-1 w-44 rounded-xl border border-line-soft bg-surface p-1"
          role="menu"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          {locales.map((locale) => (
            <Link
              key={locale}
              href={`/${locale}${pathWithoutLocale}`}
              hrefLang={locale}
              onClick={() => setOpen(false)}
              role="menuitem"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                locale === currentLocale
                  ? "bg-white/5 text-white"
                  : "text-mute hover:bg-white/5 hover:text-white"
              }`}
            >
              <span
                className={`w-6 text-xs font-medium tracking-[0.08em] ${
                  locale === currentLocale ? "text-brand-500" : "text-mute-dim"
                }`}
              >
                {localeShortLabel(locale)}
              </span>
              {localeLabels[locale]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
