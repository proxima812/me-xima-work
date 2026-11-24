/**
 * Превращает записи коллекции в `PostCardData` для React-островов. Обложки
 * оптимизируются здесь, на сборке: в браузер уходят готовые `src`/`srcset`.
 */
import { getImage } from "astro:assets";
import type { LocaleCode } from "@/config/types";
import { localeHref } from "@/i18n/client";
import type { PostCardData } from "@/types/post";
import { getPostCategories, getPostSlug, type Post } from "@/utils/blog";

const COVER_WIDTHS = [480, 720, 1120];

export async function toPostCard(
	post: Post,
	locale: LocaleCode,
): Promise<PostCardData> {
	const { title, description, pubDate, cover, coverAlt } = post.data;
	const slug = getPostSlug(post);
	const isSvg = cover.format === "svg";

	const image = isSvg
		? null
		: await getImage({ src: cover, widths: COVER_WIDTHS, format: "webp" });

	return {
		slug,
		href: localeHref(locale, `articles/${slug}`),
		title,
		description,
		date: pubDate.toISOString(),
		cover: {
			src: image?.src ?? cover.src,
			srcSet: image?.srcSet.attribute || undefined,
			width: cover.width,
			height: cover.height,
			alt: coverAlt,
			isSvg,
		},
		categories: getPostCategories(post).map((category) => ({
			id: category.id,
			label: category.label[locale] ?? category.id,
			icon: category.icon,
		})),
	};
}

export function toPostCards(
	posts: readonly Post[],
	locale: LocaleCode,
): Promise<PostCardData[]> {
	return Promise.all(posts.map((post) => toPostCard(post, locale)));
}
