/**
 * Доступ к коллекции `blog`. Локаль записи - первый сегмент `id`
 * (`<locale>/<slug>`): ее задает папка, а не поле схемы, см. `content.config.ts`.
 */
import { type CollectionEntry, getCollection } from "astro:content";
import type { LocaleCode } from "@/config/types";
import {
	type BlogCategory,
	type BlogCategoryId,
	blogCategories,
	blogCategoryIds,
} from "@/data/blogCategories";
import { locales } from "@/i18n";

export type Post = CollectionEntry<"blog">;

export interface BlogCategoryStat {
	readonly category: BlogCategory;
	readonly count: number;
}

export function getPostLocale(post: Post): LocaleCode {
	return post.id.slice(0, post.id.indexOf("/")) as LocaleCode;
}

export function getPostSlug(post: Post): string {
	return post.id.slice(post.id.indexOf("/") + 1);
}

export function getPostCategories(post: Post): BlogCategory[] {
	return post.data.categories.map((id) => blogCategories[id]);
}

/** Посты одной локали, свежие сверху. */
export async function getPosts(locale: LocaleCode): Promise<Post[]> {
	const posts = await getCollection(
		"blog",
		(post) => getPostLocale(post) === locale,
	);

	return posts.sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
}

export async function getCategoryStats(
	locale: LocaleCode,
): Promise<BlogCategoryStat[]> {
	const posts = await getPosts(locale);
	const counts = new Map<BlogCategoryId, number>();

	for (const post of posts) {
		for (const categoryId of post.data.categories) {
			counts.set(categoryId, (counts.get(categoryId) ?? 0) + 1);
		}
	}

	return blogCategoryIds
		.map((id) => ({
			category: blogCategories[id],
			count: counts.get(id) ?? 0,
		}))
		.filter(({ count }) => count > 0);
}

/**
 * Локали, в которых пост с этим slug реально существует. Нужно для hreflang:
 * ссылка на непереведенный пост - это ссылка на 404.
 */
export async function getPostLocales(slug: string): Promise<LocaleCode[]> {
	const translations = await getCollection(
		"blog",
		(post) => getPostSlug(post) === slug,
	);
	const present = new Set(translations.map(getPostLocale));

	return locales.filter((locale) => present.has(locale));
}
