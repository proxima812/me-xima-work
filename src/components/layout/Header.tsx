/**
 * Шапка по образцу heroui.com. Наверху страницы - широкая прозрачная строка,
 * после 20px прокрутки она сжимается в плавающую «пилюлю» с размытием фона.
 * На мобильном - сплошная полоса 56px и полноэкранное меню.
 */
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, GitHub } from "@/components/ui/icons";
import Logo from "@/components/ui/Logo";
import type { LocaleCode } from "@/config/types";
import { localeHref, useTranslations } from "@/i18n/client";
import { cn } from "@/utils/lib/cn";
import CategoryCards from "./CategoryCards";
import MobileMenu from "./MobileMenu";
import type { NavCategory } from "./types";

export interface HeaderProps {
	locale: LocaleCode;
	categories: readonly NavCategory[];
	/** Эта же страница на другом языке (или главная другой локали). */
	languageHref: string;
	githubUrl: string;
	countLabel: string;
}

const MENU_EASE = [0.22, 1, 0.36, 1] as const;

const navLink =
	"text-sm font-medium text-muted transition-colors hover:text-foreground";

export default function Header({
	locale,
	categories,
	languageHref,
	githubUrl,
	countLabel,
}: HeaderProps) {
	const t = useTranslations(locale);
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		const frame = requestAnimationFrame(onScroll);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
		};
	}, []);

	useEffect(() => {
		if (!dropdownOpen) return;
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") setDropdownOpen(false);
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [dropdownOpen]);

	// Наведение открывает сразу, уход - с задержкой: курсор успевает
	// перейти с кнопки на панель через зазор.
	const openDropdown = () => {
		clearTimeout(closeTimer.current);
		setDropdownOpen(true);
	};
	const scheduleClose = () => {
		clearTimeout(closeTimer.current);
		closeTimer.current = setTimeout(() => setDropdownOpen(false), 120);
	};

	return (
		<header className="sticky top-0 z-50 flex w-full justify-center px-6 py-4 max-md:bg-background max-md:px-4 max-md:py-1">
			<div
				aria-hidden="true"
				className={cn(
					"pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(100%+1.5rem)] bg-linear-to-b from-background via-background/80 to-transparent transition-opacity duration-300 motion-reduce:transition-none max-md:hidden",
					scrolled ? "opacity-100" : "opacity-0",
				)}
			/>

			<div
				className={cn(
					"flex w-full max-w-5xl items-center justify-between transition-all duration-300 motion-reduce:transition-none max-md:h-12 md:grid md:grid-cols-[1fr_auto_1fr]",
					scrolled &&
						"md:max-w-3xl md:rounded-full md:bg-surface-secondary/80 md:px-6 md:py-3 md:pr-4 md:shadow-[inset_0_0_0_1px_var(--border)] md:backdrop-blur-lg",
				)}
			>
				<a
					href={localeHref(locale)}
					aria-label={t("header.home")}
					className="shrink-0 justify-self-start"
				>
					<Logo />
				</a>

				<nav
					aria-label="Main"
					className={cn(
						"transition-transform duration-300 motion-reduce:transition-none max-md:hidden",
						scrolled && "md:-translate-x-1",
					)}
				>
					<ul className="flex items-center gap-5">
						<li>
							<a href={localeHref(locale, "articles")} className={navLink}>
								{t("nav.articles")}
							</a>
						</li>
						<li
							className="relative"
							onMouseEnter={openDropdown}
							onMouseLeave={scheduleClose}
						>
							<button
								type="button"
								aria-expanded={dropdownOpen}
								onClick={() => setDropdownOpen((open) => !open)}
								className={cn(
									navLink,
									"flex h-8 items-center gap-1 rounded-md",
									dropdownOpen && "text-foreground",
								)}
							>
								{t("nav.categories")}
								<span
									aria-hidden="true"
									className={cn(
										"flex transition-transform duration-200",
										dropdownOpen && "rotate-180",
									)}
								>
									<ChevronDown className="size-3 opacity-70" />
								</span>
							</button>

							<AnimatePresence>
								{dropdownOpen && (
									<motion.div
										initial={{ opacity: 0, scale: 0.97 }}
										animate={{
											opacity: 1,
											scale: 1,
											transition: { duration: 0.35, ease: MENU_EASE },
										}}
										exit={{
											opacity: 0,
											scale: 0.97,
											transition: { duration: 0.15, ease: "easeOut" },
										}}
										style={{ originY: 0 }}
										className="absolute top-full left-1/2 z-60 -translate-x-1/2 pt-3 before:absolute before:inset-x-0 before:top-0 before:h-3"
									>
										<CategoriesPanel
											categories={categories}
											countLabel={countLabel}
											allLabel={t("header.categories.all")}
											allHref={localeHref(locale, "articles/categories")}
										/>
									</motion.div>
								)}
							</AnimatePresence>
						</li>
						<li>
							<a href={languageHref} className={navLink}>
								{t("header.language")}
							</a>
						</li>
					</ul>
				</nav>

				<div className="flex h-8 items-center gap-5 justify-self-end max-md:gap-1.5">
					<a
						href={githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={t("site.github")}
						className={cn(
							navLink,
							"flex items-center gap-1.5 max-lg:hidden",
							scrolled && "hidden",
						)}
					>
						<GitHub className="size-4" />
					</a>
					<span
						className={cn(
							"flex transition-[opacity,visibility] duration-200 motion-reduce:transition-none",
							menuOpen && "max-md:invisible max-md:opacity-0",
						)}
					>
						<a
							href={localeHref(locale, "articles")}
							className="button button-primary max-md:h-9 max-md:px-3"
						>
							{t("header.cta")}
						</a>
					</span>
					<button
						type="button"
						aria-label={menuOpen ? t("header.menu.close") : t("header.menu.open")}
						aria-expanded={menuOpen}
						aria-controls="mobile-menu"
						onClick={() => setMenuOpen((open) => !open)}
						className="button button-ghost button-icon md:hidden"
					>
						<svg aria-hidden="true" fill="none" viewBox="0 0 20 20" className="size-5!">
							<motion.path
								d="M3.5 7h13"
								stroke="currentColor"
								strokeLinecap="round"
								strokeWidth="1.5"
								style={{ transformBox: "fill-box", originX: 0.5, originY: 0.5 }}
								animate={menuOpen ? { y: 3, rotate: 45 } : { y: 0, rotate: 0 }}
								transition={{ duration: 0.32, ease: MENU_EASE }}
							/>
							<motion.path
								d="M3.5 13h13"
								stroke="currentColor"
								strokeLinecap="round"
								strokeWidth="1.5"
								style={{ transformBox: "fill-box", originX: 0.5, originY: 0.5 }}
								animate={menuOpen ? { y: -3, rotate: -45 } : { y: 0, rotate: 0 }}
								transition={{ duration: 0.32, ease: MENU_EASE }}
							/>
						</svg>
					</button>
				</div>
			</div>

			<MobileMenu
				open={menuOpen}
				onClose={() => setMenuOpen(false)}
				locale={locale}
				categories={categories}
				languageHref={languageHref}
				githubUrl={githubUrl}
				countLabel={countLabel}
			/>
		</header>
	);
}

function CategoriesPanel({
	categories,
	countLabel,
	allLabel,
	allHref,
}: {
	categories: readonly NavCategory[];
	countLabel: string;
	allLabel: string;
	allHref: string;
}) {
	return (
		<div className="w-[598px] rounded-3xl border border-border bg-overlay p-1.5 text-foreground shadow-overlay dark:bg-[color-mix(in_oklab,var(--overlay)_45%,var(--background))]">
			<CategoryCards categories={categories.slice(0, 8)} countLabel={countLabel} />
			<div className="flex items-center justify-between px-3.5 pt-3 pb-2">
				<a
					href={allHref}
					className="group inline-flex items-center gap-1.5 rounded-md text-[13px] leading-5 font-medium text-foreground"
				>
					{allLabel}
					<ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
				</a>
				<span className="text-[13px] leading-5 text-muted">
					{categories.length}
				</span>
			</div>
		</div>
	);
}
