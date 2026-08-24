/**
 * Список проектов для /projects.
 *
 * `href` - то, что открывается по клику: живой домен, если он есть, иначе
 * репозиторий. `repo` - дополнительная ссылка «код» рядом с описанием; ее
 * не ставим на приватные репозитории, иначе у посетителя будет 404.
 */
import type { LocaleCode } from "@/config/types";

export interface Project {
	readonly href: string;
	readonly title: string;
	readonly description: string;
	/** Ссылка на исходники, когда `href` ведет на сайт. */
	readonly repo?: string;
}

const GITHUB = "https://github.com/proxima812";

export const projects: Record<LocaleCode, Project[]> = {
	ru: [
		{
			href: "https://xima.keeps",
			title: "xima.keeps",
			description:
				"Android-органайзер: заметки, поиск и напоминания. Все на устройстве - без аккаунта, облака и интернета.",
			repo: `${GITHUB}/notes-android`,
		},
		{
			href: "https://xima.music",
			title: "xima.music",
			description:
				"Офлайн-плеер для Android: звук на Media3/ExoPlayer, интерфейс на Tauri 2 и SolidJS.",
			repo: `${GITHUB}/music.xima`,
		},
		{
			href: "https://almatyda.kz",
			title: "Almatyda KZ",
			description:
				"Апарт-отель в Алматы: посуточные апартаменты, гид по заселению и связь через WhatsApp.",
		},
		{
			href: "https://astana-hotel.kz",
			title: "Astana Hotel KZ",
			description:
				"Гостиница «Бекарыс» в Астане: отель эконом-класса с круглосуточным ресепшеном.",
		},
		{
			href: "https://tatarverse.cc",
			title: "Tatarverse",
			description:
				"Каталог татарских, башкирских и крымскотатарских центров и сообществ по всему миру.",
			repo: `${GITHUB}/tatarverse`,
		},
		{
			href: `${GITHUB}/media.tatarverse.cc`,
			title: "Media Tatarverse",
			description: "Медиаплощадка Tatarverse - раздел для авторов.",
		},
		{
			href: "https://color.xima.work",
			title: "color.xima.work",
			description:
				"Галерея CSS-градиентов: поиск, фильтры и копирование в CSS3 или Tailwind v4.",
			repo: `${GITHUB}/color.xima.work`,
		},
	],
	en: [
		{
			href: "https://xima.keeps",
			title: "xima.keeps",
			description:
				"An Android organiser: notes, search and reminders. Fully on-device - no account, no cloud, no internet.",
			repo: `${GITHUB}/notes-android`,
		},
		{
			href: "https://xima.music",
			title: "xima.music",
			description:
				"An offline Android player: audio on Media3/ExoPlayer, interface on Tauri 2 and SolidJS.",
			repo: `${GITHUB}/music.xima`,
		},
		{
			href: "https://almatyda.kz",
			title: "Almatyda KZ",
			description:
				"An apart-hotel in Almaty: daily apartments, a check-in guide and WhatsApp contact.",
		},
		{
			href: "https://astana-hotel.kz",
			title: "Astana Hotel KZ",
			description:
				"Bekarys Hotel in Astana: a budget hotel with a 24/7 reception.",
		},
		{
			href: "https://tatarverse.cc",
			title: "Tatarverse",
			description:
				"A directory of Tatar, Bashkir and Crimean Tatar centres and communities around the world.",
			repo: `${GITHUB}/tatarverse`,
		},
		{
			href: `${GITHUB}/media.tatarverse.cc`,
			title: "Media Tatarverse",
			description: "The media side of Tatarverse - a section for authors.",
		},
		{
			href: "https://color.xima.work",
			title: "color.xima.work",
			description:
				"A gallery of CSS gradients: search, filters and copy-ready CSS3 or Tailwind v4.",
			repo: `${GITHUB}/color.xima.work`,
		},
	],
};

export function getProjects(locale: LocaleCode): Project[] {
	return projects[locale] ?? [];
}
