/** Сетка категорий: карточки в стиле HeroUI с иконкой и числом постов. */
import { motion } from "motion/react";
import type { NavCategory } from "@/components/layout/types";
import { ArrowRight } from "@/components/ui/icons";
import { useIntroReady } from "@/components/ui/useIntroReady";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CategoryGrid({
	categories,
	countLabel,
}: {
	categories: readonly NavCategory[];
	countLabel: string;
}) {
	const ready = useIntroReady();

	return (
		<ul className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
			{categories.map((category, index) => (
				<motion.li
					key={category.id}
					initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
					animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
					transition={{ duration: 0.7, ease: EASE, delay: 0.4 + index * 0.04 }}
				>
					<a
						href={category.href}
						className="group flex h-full items-center gap-4 rounded-3xl bg-surface p-1 pr-5"
					>
						<span className="flex size-16 shrink-0 items-center justify-center rounded-[20px] bg-background">
							<img
								src={category.icon}
								alt=""
								width={32}
								height={32}
								className="size-8 object-contain transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-110"
							/>
						</span>
						<span className="flex min-w-0 flex-1 flex-col gap-0.5">
							<span className="truncate text-base font-medium">{category.label}</span>
							<span className="text-[13px] leading-5 text-muted">
								{category.count} {countLabel}
							</span>
						</span>
						<ArrowRight className="size-3.5 shrink-0 text-muted transition-[color,translate] duration-200 group-hover:translate-x-0.5 group-hover:text-foreground" />
					</a>
				</motion.li>
			))}
		</ul>
	);
}
