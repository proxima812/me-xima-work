/**
 * Карточка поста heroui.com/blog: белая подложка со скруглением 24px,
 * внутри картинка со скруглением 20px (концентрично, отступ 4px).
 * На наведении только картинка чуть приближается - без теней и подъема.
 *
 * `featured` - крупная карточка с описанием (два верхних поста),
 * `compact` - сетка «Последние посты» и «Похожие посты».
 */
import type { LocaleCode } from "@/config/types";
import type { PostCardData } from "@/types/post";
import { cn } from "@/utils/lib/cn";
import AuthorAvatar from "./AuthorAvatar";

export interface PostCardProps {
	post: PostCardData;
	locale: LocaleCode;
	author: string;
	variant?: "featured" | "compact" | "related";
}

export function formatShortDate(iso: string, locale: LocaleCode) {
	return new Intl.DateTimeFormat(locale, {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(new Date(iso));
}

export default function PostCard({
	post,
	locale,
	author,
	variant = "compact",
}: PostCardProps) {
	const featured = variant === "featured";
	const { cover } = post;

	return (
		<a
			href={post.href}
			className="group relative flex h-full flex-col rounded-3xl bg-surface p-1"
		>
			<span
				className={cn(
					"relative block shrink-0 overflow-hidden rounded-[20px] bg-background",
					featured ? "aspect-[556/280]" : "aspect-[360/203]",
				)}
			>
				<img
					src={cover.src}
					srcSet={cover.srcSet}
					sizes={
						featured
							? "(min-width: 1200px) 556px, (min-width: 768px) 50vw, 100vw"
							: "(min-width: 1200px) 360px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
					}
					width={cover.width}
					height={cover.height}
					alt=""
					loading="lazy"
					decoding="async"
					className={cn(
						"absolute inset-0 size-full object-cover transition-transform duration-500 ease-out motion-reduce:transition-none [@media(hover:hover)]:group-hover:scale-[1.02]",
						cover.isSvg && "bg-white",
					)}
				/>
			</span>

			<span
				className={cn(
					"flex flex-1 flex-col",
					featured ? "gap-2 px-4 pt-[18px] pb-5 sm:px-5" : "gap-3 px-4 pt-4 pb-[18px]",
				)}
			>
				<span
					className={cn(
						"line-clamp-2 font-medium text-pretty",
						featured && "text-lg leading-[26px] sm:text-xl sm:leading-7",
						variant === "compact" && "text-base leading-[22px]",
						variant === "related" && "text-sm leading-5",
					)}
				>
					{post.title}
				</span>

				{featured && (
					<span className="line-clamp-2 text-[15px] leading-[22px] text-pretty text-muted">
						{post.description}
					</span>
				)}

				<span
					className={cn(
						"flex min-w-0 items-center gap-2",
						featured ? "pt-1.5 text-sm leading-5" : "mt-auto text-[13px] leading-[18px]",
					)}
				>
					<AuthorAvatar
						seed={post.slug}
						size={22}
						className="size-[1.375em] shrink-0 rounded-full"
					/>
					<span className="truncate font-medium text-foreground">{author}</span>
					<time className="shrink-0 text-muted" dateTime={post.date}>
						{formatShortDate(post.date, locale)}
					</time>
				</span>
			</span>
		</a>
	);
}
