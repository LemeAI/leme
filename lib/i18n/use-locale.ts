"use client";

import { usePathname } from "next/navigation";
import { locales, defaultLocale, type Locale } from "./config";

export function useLocale(): Locale {
  const pathname = usePathname() ?? "";
  const match = locales.find((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  return (match ?? defaultLocale) as Locale;
}

export function useLocalizedPath(path: string): string {
  const locale = useLocale();
  if (path.startsWith("/")) {
    return `/${locale}${path}`;
  }
  return path;
}
