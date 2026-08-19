import type { Locale } from "../config";
import type { Dictionary } from "./en";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./en").then((mod) => mod.en),
  pt: () => import("./pt").then((mod) => mod.pt),
  es: () => import("./es").then((mod) => mod.es),
  de: () => import("./de").then((mod) => mod.de),
  fr: () => import("./fr").then((mod) => mod.fr),
  ja: () => import("./ja").then((mod) => mod.ja),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
