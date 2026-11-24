/**
 * «На этой странице» справа от текста (только xl). Тонкая линия слева,
 * активный пункт подсвечен; отметка переезжает между пунктами.
 */
import { motion } from "motion/react";
import { useActiveHeading } from "./useActiveHeading";

export interface TocHeading {
	readonly slug: string;
	readonly text: string;
	readonly depth: number;
}

export default function TableOfContents({
	headings,
	label,
}: {
	headings: readonly TocHeading[];
	label: string;
}) {
	const active = useActiveHeading(headings);

	return (
		<div className="flex flex-col gap-3 pt-1">
			<nav aria-labelledby="toc-heading">
				<p id="toc-heading" className="text-[13px] leading-5 font-medium">
					{label}
				</p>
				<ul className="mt-3 max-h-[calc(100svh-18rem)] overflow-y-auto [scrollbar-width:none]">
					{headings.map((heading) => {
						const isActive = heading.slug === active;

						return (
							<li key={heading.slug} className="relative">
								{isActive && (
									<motion.span
										layoutId="toc-marker"
										aria-hidden="true"
										className="absolute inset-y-0 left-0 w-px bg-foreground"
										transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
									/>
								)}
								<a
									href={`#${heading.slug}`}
									aria-current={isActive ? "location" : undefined}
									className={
										"block border-l border-separator py-[5px] text-[13px] leading-[18px] transition-colors " +
										(heading.depth === 3 ? "pl-6 " : "pl-3 ") +
										(isActive ? "text-foreground" : "text-muted hover:text-foreground")
									}
								>
									{heading.text}
								</a>
							</li>
						);
					})}
				</ul>
			</nav>
		</div>
	);
}
