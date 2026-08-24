/**
 * ЕДИНСТВЕННЫЙ файл, который нужно править под новый проект.
 *
 * Контракт и типы: `src/config/types.ts`
 * Проверки на билде: `src/config/validate.ts`
 *
 * Все, что помечено `enabled: true`, обязано нести свои данные - TypeScript
 * не даст включить аналитику без ID или IndexNow без ключа.
 */
import type { AppConfig, SiteVerification } from "./src/config/types";

const siteUrl = "https://me.xima.work/" as const;
const siteName = "xima.work" as const;
const siteLocale = "ru-RU" as const;
const siteHost = new URL(siteUrl).hostname.replace(/^www\./, "");

/**
 * Подтверждение владения доменом. Пустой `content` = тег не рендерится.
 * Другие поддерживаемые сервисы: `p:domain_verify` (Pinterest),
 * `facebook-domain-verification`, `apple-site-verification`,
 * `mail.ru-verification`, `baidu-site-verification`.
 */
const verifications: SiteVerification[] = [
	{ name: "yandex-verification", content: "" },
	{ name: "google-site-verification", content: "" },
	{ name: "msvalidate.01", content: "" },
];

/**
 * Тип указан явно (а не через `satisfies`), чтобы компоненты писались против
 * контракта, а не против сегодняшних значений: иначе переключение флага
 * ломало бы типы в местах, которые про этот флаг ничего не знают.
 */
export const config: AppConfig = {
	// ── Фичи без дополнительных данных ────────────────────────────────
	features: {
		manifest: true,
		ai: false,
		llms: false,
	},

	// ── IndexNow ──────────────────────────────────────────────────────
	// Ключ: https://www.bing.com/indexnow/getstarted
	// Файл верификации `/<key>.txt` стартер отдает сам.
	// Включение: { enabled: true, key: "ваш-ключ" }
	indexNow: { enabled: false },

	// ── i18n ──────────────────────────────────────────────────────────
	// `defaultLocale` не получает префикс в URL: `/about`, а не `/ru/about`.
	// Остальные локали - `/en/about`. Словари - в `src/i18n/locales/`.
	i18n: {
		defaultLocale: "ru",
		locales: ["ru", "en"],
	},

	// ── Сайт ──────────────────────────────────────────────────────────
	site: {
		url: siteUrl,
		language: siteLocale,

		og: {
			title: siteName,
			description: `Личный блог ${siteName}`,
			author: siteName,
			locale: siteLocale,
			siteName: siteName,
			/** Файл в `public/`, 1200x630. Наличие проверяется на билде. */
			defaultImage: "default-ogImage.jpg",
			imageAlt: `Превью страницы ${siteHost}`,
			keywords: "",
			titleSeparator: "|",
			twitterCard: "summary_large_image",
			twitterSite: "",
			twitterCreator: "",
			organizationName: siteName,
			logo: "",
		},

		theme: {
			colors: {
				maskIcon: "#0f172a",
				tile: "#0f172a",
				theme: "#f8fafc",
				background: "#f8fafc",
			},
		},

		verifications,

		// Включение: { enabled: true, id: "GTM-XXXXXXX" } / { enabled: true, id: 12345678 }
		analytics: {
			googleTagManager: { enabled: false },
			yandexMetrika: { enabled: false },
		},

		/*
		 * Комментарии под постами - обсуждения GitHub через giscus.
		 * ID берутся на https://giscus.app по адресу репозитория; там же
		 * надо один раз поставить приложение giscus на сам репозиторий.
		 * Язык виджета задается локалью страницы, а не здесь.
		 */
		comments: {
			enabled: true,
			repo: "proxima812/me-xima-work",
			repoId: "R_kgDOUB33Qw",
			category: "General",
			categoryId: "DIC_kwDOUB33Q84DEC8J",
		},
	},
};

export type { AppConfig } from "./src/config/types";
