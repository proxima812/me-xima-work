/**
 * i18n для React-компонентов. В отличие от `@/i18n` не тянет `astro:i18n`
 * и `main.config`, поэтому безопасно попадает в клиентский бандл островов.
 */
import type { LocaleCode } from "@/config/types";
import type { Dictionary } from "@/i18n/dictionary";
import en from "@/i18n/locales/en";
import ru from "@/i18n/locales/ru";

const dictionaries: Record<LocaleCode, Dictionary> = { ru, en };

export const DEFAULT_LOCALE: LocaleCode = "ru";

export function useTranslations(locale: LocaleCode) {
	const dict = dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];

	return (key: string) => dict?.[key] ?? key;
}

/** Адрес внутри локали: дефолтная без префикса, остальные с `/<locale>/`. */
export function localeHref(locale: LocaleCode, path = ""): string {
	const clean = path.replace(/^\/+|\/+$/g, "");
	const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;

	return clean ? `${prefix}/${clean}/` : `${prefix}/`;
}

export function otherLocale(locale: LocaleCode): LocaleCode {
	return locale === "ru" ? "en" : "ru";
}
