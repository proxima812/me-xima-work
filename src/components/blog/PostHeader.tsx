/**
 * Шапка поста как на heroui.com/blog/<slug>: крошка «Блог > Категория»,
 * заголовок, подводка, строка автора и обложка в рамке шире колонки текста.
 */
import type { CSSProperties } from "react";
import { ChevronRight } from "@/components/ui/icons";
import type { LocaleCode } from "@/config/types";
import { localeHref, useTranslations } from "@/i18n/client";
import type { PostCardData } from "@/types/post";
import AuthorAvatar from "./AuthorAvatar";

export interface PostHeaderProps {
	locale: LocaleCode;
	post: PostCardData;
	author: string;
	authorUrl: string;
}

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

export default function PostHeader({ locale, post, author, authorUrl }: PostHeaderProps) {
	const t = useTranslations(locale);
	const [category] = post.categories;
	const formattedDate = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(
		new Date(post.date),
	);

	return (
		<header className="site-container pt-8 sm:pt-[72px]">
			<div className="xl:grid xl:grid-cols-[1fr_minmax(0,720px)_1fr] xl:gap-8">
				<div className="mx-auto flex max-w-[720px] flex-col gap-5 sm:gap-6 xl:col-start-2 xl:mx-0">
					<nav
						aria-label={t("nav.breadcrumbs")}
						className="enter flex items-center gap-2 text-sm leading-5"
						style={delay(100)}
					>
						<a
							href={localeHref(locale, "articles")}
							className="text-muted transition-colors hover:text-foreground"
						>
							{t("blog.eyebrow")}
						</a>
						{category && (
							<>
								<ChevronRight className="size-3.5 text-muted" />
								<a
									href={`${localeHref(locale, "articles")}?category=${category.id}`}
									aria-current="page"
									className="inline-flex items-center gap-1.5 font-medium"
								>
									<img src={category.icon} alt="" className="size-3.5 object-contain" />
									{category.label}
								</a>
							</>
						)}
					</nav>

					<h1
						className="enter font-heading text-[34px] leading-[38px] font-medium tracking-[-0.02em] text-balance sm:text-5xl sm:leading-[54px]"
						style={delay(200)}
					>
						{post.title}
					</h1>

					<p
						className="enter text-base leading-[26px] text-pretty text-muted sm:text-lg sm:leading-[29px]"
						style={delay(300)}
					>
						{post.description}
					</p>

					<p className="enter flex items-center gap-2 text-sm leading-5" style={delay(400)}>
						<AuthorAvatar seed={post.slug} size={22} className="size-[22px] shrink-0 rounded-full" />
						<a
							href={authorUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="font-medium transition-colors hover:text-muted"
						>
							{author}
						</a>
						<span aria-hidden="true" className="px-1 text-muted">
							·
						</span>
						<time className="text-muted" dateTime={post.date}>
							{formattedDate}
						</time>
					</p>
				</div>
			</div>

			<div
				className="enter mx-auto mt-8 max-w-[880px] rounded-[28px] bg-surface p-1 shadow-surface max-sm:rounded-[24px] sm:mt-10"
				style={{ ...delay(500), "--rise": "40px" } as CSSProperties}
			>
				<span className="relative block aspect-[872/458] overflow-hidden rounded-[24px] bg-background max-sm:rounded-[20px]">
					<img
						src={post.cover.src}
						srcSet={post.cover.srcSet}
						sizes="(min-width: 928px) 872px, 100vw"
						width={post.cover.width}
						height={post.cover.height}
						alt={post.cover.alt}
						fetchPriority="high"
						className={
							post.cover.isSvg
								? "absolute inset-0 size-full bg-white object-contain"
								: "absolute inset-0 size-full object-cover"
						}
					/>
				</span>
			</div>
		</header>
	);
}
