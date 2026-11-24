/** «Похожие посты» под статьей: компактные карточки шириной с обложку. */
import { motion } from "motion/react";
import type { LocaleCode } from "@/config/types";
import type { PostCardData } from "@/types/post";
import PostCard from "./PostCard";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function RelatedPosts({
	locale,
	posts,
	author,
	heading,
}: {
	locale: LocaleCode;
	posts: readonly PostCardData[];
	author: string;
	heading: string;
}) {
	if (posts.length === 0) return null;

	return (
		<section aria-labelledby="related-posts-heading" className="site-container mt-20 sm:mt-24">
			<div className="mx-auto max-w-[880px]">
				<h2
					id="related-posts-heading"
					className="font-heading text-xl leading-7 font-medium tracking-[-0.01em]"
				>
					{heading}
				</h2>
				<ul className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
					{posts.map((post, index) => (
						<motion.li
							key={post.slug}
							initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
							whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
							viewport={{ once: true, margin: "0px 0px -60px 0px" }}
							transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
						>
							<PostCard post={post} locale={locale} author={author} variant="related" />
						</motion.li>
					))}
				</ul>
			</div>
		</section>
	);
}
