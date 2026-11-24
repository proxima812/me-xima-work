/**
 * Полноэкранное мобильное меню под шапкой. Появляется прозрачностью,
 * секции поднимаются на 10px друг за другом с шагом 40ms - как на heroui.com.
 */
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { ArrowRight, ArrowUpRight, ChevronRight, GitHub } from "@/components/ui/icons";
import type { LocaleCode } from "@/config/types";
import { localeHref, useTranslations } from "@/i18n/client";
import CategoryCards from "./CategoryCards";
import ThemeSwitcher from "./ThemeSwitcher";
import type { NavCategory } from "./types";

const SHEET_EASE = [0.22, 1, 0.36, 1] as const;

const rise = {
	hidden: { opacity: 0, y: 10 },
	visible: (index: number) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.48, ease: SHEET_EASE, delay: index * 0.04 },
	}),
};

const rowClass =
	"flex h-14 w-full items-center justify-between border-b border-separator px-1 text-[17px] font-medium";

export interface MobileMenuProps {
	open: boolean;
	onClose: () => void;
	locale: LocaleCode;
	categories: readonly NavCategory[];
	languageHref: string;
	githubUrl: string;
	countLabel: string;
}

export default function MobileMenu({
	open,
	onClose,
	locale,
	categories,
	languageHref,
	githubUrl,
	countLabel,
}: MobileMenuProps) {
	const t = useTranslations(locale);

	useEffect(() => {
		if (!open) return;

		const root = document.documentElement;
		root.style.overflow = "hidden";

		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
		};
		const desktop = window.matchMedia("(width >= 48rem)");
		const onDesktop = () => desktop.matches && onClose();

		document.addEventListener("keydown", onKey);
		desktop.addEventListener("change", onDesktop);
		return () => {
			root.style.overflow = "";
			document.removeEventListener("keydown", onKey);
			desktop.removeEventListener("change", onDesktop);
		};
	}, [open, onClose]);

	return (
		<AnimatePresence>
			{open && (
				<motion.nav
					id="mobile-menu"
					aria-label={t("header.menu")}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, transition: { duration: 0.26, ease: "easeOut" } }}
					exit={{ opacity: 0, y: -4, transition: { duration: 0.2, ease: "easeIn" } }}
					className="fixed inset-x-0 top-14 bottom-0 z-40 flex flex-col bg-background text-foreground md:hidden"
				>
					<div className="flex min-h-0 grow flex-col overflow-y-auto overscroll-contain px-4 pt-2 pb-6">
						<motion.h2
							variants={rise}
							initial="hidden"
							animate="visible"
							custom={0}
							className="px-1 pb-2.5 text-xs font-medium text-muted"
						>
							{t("nav.categories")}
						</motion.h2>

						<motion.div variants={rise} initial="hidden" animate="visible" custom={1}>
							<CategoryCards
								categories={categories.slice(0, 6)}
								countLabel={countLabel}
								compact
								onNavigate={onClose}
							/>
						</motion.div>

						<motion.div
							variants={rise}
							initial="hidden"
							animate="visible"
							custom={2}
							className="flex items-center justify-between px-1 pt-3.5"
						>
							<a
								href={localeHref(locale, "articles/categories")}
								onClick={onClose}
								className="group inline-flex items-center gap-1.5 rounded-md text-[13px] leading-5 font-medium"
							>
								{t("header.categories.all")}
								<ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
							</a>
						</motion.div>

						<motion.div
							variants={rise}
							initial="hidden"
							animate="visible"
							custom={3}
							className="flex flex-col pt-5"
						>
							<a href={localeHref(locale)} onClick={onClose} className={rowClass}>
								{t("nav.home")}
								<ChevronRight className="size-4 text-muted" />
							</a>
							<a
								href={localeHref(locale, "articles")}
								onClick={onClose}
								className={rowClass}
							>
								{t("nav.articles")}
								<ChevronRight className="size-4 text-muted" />
							</a>
							<a href={languageHref} onClick={onClose} className={`${rowClass} border-b-0`}>
								{t("header.language")}
								<ArrowUpRight className="size-3.5 text-muted" />
							</a>
						</motion.div>
					</div>

					<div className="flex shrink-0 flex-col gap-3.5 px-4 pt-4 pb-7">
						<div className="flex items-center justify-between px-1">
							<a
								href={githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={t("site.github")}
								className="flex rounded py-1 text-muted transition-colors hover:text-foreground"
							>
								<GitHub className="size-4" />
							</a>
							<ThemeSwitcher locale={locale} />
						</div>
						<a
							href={localeHref(locale, "articles")}
							onClick={onClose}
							className="button button-primary w-full"
						>
							{t("header.cta")}
						</a>
					</div>
				</motion.nav>
			)}
		</AnimatePresence>
	);
}
