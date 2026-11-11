import { Locale, TranslationDictionary } from "./locales/types";
import { en } from "./locales/en";
import { es } from "./locales/es";
import { zh } from "./locales/zh";
import { ru } from "./locales/ru";

export type { Locale, TranslationDictionary };

export const TRANSLATIONS: Record<Locale, TranslationDictionary> = {
  en,
  es,
  zh,
  ru,
};
