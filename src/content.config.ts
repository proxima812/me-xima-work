/**
 * Записи блога - `src/data/blog/<locale>/<slug>.mdx`. Локаль поста - не поле
 * схемы, а сегмент пути (та же идея, что и `src/pages/<locale>/`), так локали
 * коллекции не расходятся с `i18n.locales`. Пост может существовать не во всех
 * локалях: hreflang считается по фактическим переводам (`getPostLocales`).
 *
 * Картинки обложек лежат вне коллекции, в `src/assets/blog/` - в `src/data/`
 * только записи.
 */

import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { config } from "main.config";
import { blogCategoryIds } from "./data/blogCategories";

const localesPattern = `{${config.i18n.locales.join(",")}}`;

const blog = defineCollection({
	loader: glob({
		base: "./src/data/blog",
		pattern: `${localesPattern}/**/*.{md,mdx}`,
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			categories: z.array(z.enum(blogCategoryIds)).min(1),
			pubDate: z.coerce.date(),
			cover: image(),
			coverAlt: z.string(),
		}),
});

export const collections = { blog };
