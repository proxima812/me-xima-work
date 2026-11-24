/**
 * Список постов как на heroui.com/blog: два крупных сверху, ниже сетка
 * «Последние посты». Над ними - сегмент категорий (без поиска): белая
 * таблетка переезжает к выбранной, карточки перестраиваются с анимацией.
 *
 * Выбранная категория живет в `?category=` - ссылки из шапки и подвала
 * открывают страницу уже отфильтрованной.
 */
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { useIntroReady } from "@/components/ui/useIntroReady";
import type { LocaleCode } from "@/config/types";
import { useTranslations } from "@/i18n/client";
import type { PostCardData } from "@/types/post";
import { cn } from "@/utils/lib/cn";
import PostCard from "./PostCard";

export interface FilterCategory {
	readonly id: string;
	readonly label: string;
}

export interface BlogPostsProps {
	locale: LocaleCode;
	posts: readonly PostCardData[];
	author: string;
	/** Категории для сегмента. Пусто - сегмента нет (главная). */
	categories?: readonly FilterCategory[];
	/** Сколько постов в сетке под двумя крупными. Без лимита - все. */
	limit?: number;
	/** Ссылка «Все посты» под сеткой. */
	moreHref?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const cardMotion = {
	initial: { opacity: 0, y: 12, filter: "blur(8px)" },
	animate: { opacity: 1, y: 0, filter: "blur(0px)" },
	exit: { opacity: 0, scale: 0.98, filter: "blur(4px)", transition: { duration: 0.2 } },
};

export default function BlogPosts({
	locale,
	posts,
	author,
	categories = [],
	limit,
	moreHref,
}: BlogPostsProps) {
	const t = useTranslations(locale);
	const ready = useIntroReady();
	const [active, setActive] = useState("all");

	useEffect(() => {
		const fromUrl = new URLSearchParams(window.location.search).get("category");
		if (fromUrl && categories.some((category) => category.id === fromUrl)) {
			setActive(fromUrl);
		}
	}, [categories]);

	const select = (id: string) => {
		setActive(id);
		const url = new URL(window.location.href);
		if (id === "all") url.searchParams.delete("category");
		else url.searchParams.set("category", id);
		window.history.replaceState(null, "", url);
	};

	const filtered = useMemo(
		() =>
			active === "all"
				? posts
				: posts.filter((post) =>
						post.categories.some((category) => category.id === active),
					),
		[active, posts],
	);

	const showFeatured = active === "all";
	const featured = showFeatured ? filtered.slice(0, 2) : [];
	const rest = showFeatured ? filtered.slice(2) : filtered;
	const latest = limit ? rest.slice(0, limit) : rest;
	const activeLabel =
		categories.find((category) => category.id === active)?.label ?? t("blog.latest");

	return (
		<div>
			{categories.length > 0 && (
				<div className="mt-8 flex flex-col gap-3 sm:mt-10 md:flex-row md:items-center md:justify-between md:gap-6">
					<div
						role="radiogroup"
						aria-label={t("blog.filter")}
						className="relative inline-flex max-w-full items-center self-start overflow-x-auto rounded-full bg-default p-[3px] [scrollbar-width:none] max-sm:scroll-fade-x"
					>
						{[{ id: "all", label: t("blog.filter.all") }, ...categories].map(
							(category) => {
								const selected = category.id === active;

								return (
									<button
										key={category.id}
										type="button"
										role="radio"
										aria-checked={selected}
										onClick={() => select(category.id)}
										className={cn(
											"relative z-[1] flex h-8 shrink-0 items-center rounded-3xl px-4 text-sm leading-5 font-medium whitespace-nowrap transition-[color,opacity] duration-150 max-sm:px-3 max-sm:text-[13px]",
											selected
												? "text-foreground"
												: "text-muted [@media(hover:hover)]:hover:opacity-70",
										)}
									>
										{selected && (
											<motion.span
												layoutId="blog-filter-indicator"
												className="absolute inset-0 -z-10 rounded-3xl bg-segment shadow-surface"
												transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
											/>
										)}
										{category.label}
									</button>
								);
							},
						)}
					</div>
				</div>
			)}

			{featured.length > 0 && (
				<ul className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2 md:gap-6">
					{featured.map((post, index) => (
						<motion.li
							key={post.slug}
							initial={cardMotion.initial}
							animate={ready ? cardMotion.animate : cardMotion.initial}
							transition={{ duration: 0.8, ease: EASE, delay: 0.5 + index * 0.1 }}
						>
							<PostCard post={post} locale={locale} author={author} variant="featured" />
						</motion.li>
					))}
				</ul>
			)}

			<section
				aria-labelledby="latest-posts-heading"
				className={cn(featured.length > 0 ? "mt-16 sm:mt-20" : "mt-10 sm:mt-12")}
			>
				<div className="flex items-end justify-between gap-4">
					<AnimatePresence mode="wait" initial={false}>
						<motion.h2
							key={activeLabel}
							id="latest-posts-heading"
							initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
							animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
							exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
							transition={{ duration: 0.25, ease: EASE }}
							className="font-heading text-2xl font-medium tracking-[-0.01em] sm:text-[28px] sm:leading-[34px]"
						>
							{activeLabel}
						</motion.h2>
					</AnimatePresence>

					{moreHref && (
						<a
							href={moreHref}
							className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
						>
							{t("home.all")}
							<ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
						</a>
					)}
				</div>

				{latest.length === 0 ? (
					<p className="mt-6 text-muted sm:mt-7">{t("blog.empty")}</p>
				) : (
					<motion.ul layout className="mt-6 grid gap-4 sm:mt-7 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
						<AnimatePresence mode="popLayout">
							{latest.map((post, index) => (
								<motion.li
									key={post.slug}
									layout
									initial={cardMotion.initial}
									whileInView={ready ? cardMotion.animate : undefined}
									exit={cardMotion.exit}
									viewport={{ once: true, margin: "0px 0px -60px 0px" }}
									transition={{ duration: 0.7, ease: EASE, delay: (index % 3) * 0.08 }}
								>
									<PostCard post={post} locale={locale} author={author} />
								</motion.li>
							))}
						</AnimatePresence>
					</motion.ul>
				)}
			</section>
		</div>
	);
}
