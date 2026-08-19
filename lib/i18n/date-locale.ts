import type { Locale } from "./config";

const localeTags: Record<Locale, string> = {
  en: "en-US",
  pt: "pt-BR",
  es: "es-ES",
  de: "de-DE",
  fr: "fr-FR",
  ja: "ja-JP",
};

export function getDateLocale(locale: Locale): string {
  return localeTags[locale];
}
