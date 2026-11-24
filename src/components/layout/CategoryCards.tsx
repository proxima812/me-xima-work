import { cn } from "@/utils/lib/cn";
import type { NavCategory } from "./types";

/** Сетка 2xN с внутренними разделителями, как карточки продуктов HeroUI. */
export default function CategoryCards({
	categories,
	countLabel,
	compact,
	onNavigate,
}: {
	categories: readonly NavCategory[];
	countLabel: string;
	compact?: boolean;
	onNavigate?: () => void;
}) {
	return (
		<ul className="grid grid-cols-2 overflow-hidden rounded-[18px] border border-default bg-[color-mix(in_oklab,var(--default)_30%,var(--overlay))]">
			{categories.map((category, index) => {
				const isLast = index === categories.length - 1;
				const isOdd = index % 2 === 0;
				const inLastRow =
					isLast || (isOdd && index === categories.length - 2);

				return (
					<li
						key={category.id}
						className={cn(
							"border-default",
							!inLastRow && "border-b",
							isOdd && !(isLast && isOdd) && "border-e",
							isLast && isOdd && "col-span-2",
						)}
					>
						<a
							href={category.href}
							onClick={onNavigate}
							className={cn(
								"flex h-full transition-colors hover:bg-[color-mix(in_oklab,var(--default)_70%,transparent)]",
								compact
									? "items-center gap-3 p-4"
									: "flex-col gap-3.5 p-5",
							)}
						>
							<img
								src={category.icon}
								alt=""
								width={32}
								height={32}
								className={cn("shrink-0 object-contain", compact ? "size-7" : "size-8")}
							/>
							<span className="flex flex-col gap-0.5">
								<span className="text-sm font-medium">{category.label}</span>
								<span className="text-[13px] leading-5 text-muted">
									{category.count} {countLabel}
								</span>
							</span>
						</a>
					</li>
				);
			})}
		</ul>
	);
}
