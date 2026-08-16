// Configuração de internacionalização do Leme.
// Idiomas suportados para sinais globais a LLMs e buscadores.

export type Locale = (typeof locales)[number];

export const locales = ["en", "pt", "es", "de", "fr", "ja"] as const;
export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  pt: "Português",
  es: "Español",
  de: "Deutsch",
  fr: "Français",
  ja: "日本語",
};

// Sigla ISO 639-1 em caixa alta, usada no seletor de idioma da navbar.
export function localeShortLabel(locale: Locale): string {
  return locale.toUpperCase();
}
