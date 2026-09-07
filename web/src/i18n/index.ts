import { cookies } from "next/headers";
import { translations, type Locale, defaultLocale, locales } from "./translations";

export type { Locale };
export { translations, defaultLocale, locales };

/**
 * Get the locale from the cookie on the server side.
 * Falls back to defaultLocale.
 */
export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const stored = cookieStore.get("nb_lang")?.value;
  if (stored && locales.includes(stored as Locale)) {
    return stored as Locale;
  }
  return defaultLocale;
}

/**
 * Translate a key for a given locale.
 * Returns the key itself if no translation exists (should not happen in production).
 */
export function t(key: string, locale: Locale): string {
  const entry = translations[key];
  if (!entry) return key;
  return entry[locale] ?? entry.en;
}

/**
 * Get all translations for a locale as a flat record.
 * Useful for passing to client components.
 */
export function getTranslationsForLocale(locale: Locale): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, entry] of Object.entries(translations)) {
    result[key] = entry[locale] ?? entry.en;
  }
  return result;
}
