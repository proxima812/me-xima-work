/**
 * Подвал по образцу heroui.com: колонки ссылок (на мобильном - аккордеоны,
 * открыт один), соцсети, копирайт, переключатель темы и пунктирный
 * словесный знак под всем этим.
 */
import { ChevronDown, GitHub } from "@/components/ui/icons";
import type { LocaleCode } from "@/config/types";
import { useTranslations } from "@/i18n/client";
import ThemeSwitcher from "./ThemeSwitcher";

export interface FooterLink {
	readonly label: string;
	readonly href: string;
}

export interface FooterGroup {
	readonly title: string;
	readonly href: string;
	readonly links: readonly FooterLink[];
}

export interface FooterProps {
	locale: LocaleCode;
	groups: readonly FooterGroup[];
	githubUrl: string;
	year: number;
}

const isExternal = (href: string) => /^https?:\/\//.test(href);

const externalProps = (href: string) =>
	isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

export default function Footer({ locale, groups, githubUrl, year }: FooterProps) {
	const t = useTranslations(locale);

	return (
		<>
			<footer className="mx-auto flex w-full max-w-5xl flex-col items-center gap-5 px-5 max-sm:pb-10 sm:gap-6 sm:px-6">
				<nav
					aria-label={t("footer.directory")}
					className="mt-14 w-full border-t border-separator sm:hidden"
				>
					{groups.map((group, index) => (
						<details
							key={group.title}
							name="footer-directory"
							open={index === 0}
							className="group border-b border-separator"
						>
							<summary className="flex cursor-pointer list-none items-center justify-between py-[18px] text-[15px] leading-5 font-medium [&::-webkit-details-marker]:hidden">
								{group.title}
								<ChevronDown className="size-3.5 text-muted transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none" />
							</summary>
							<ul
								className="grid grid-flow-col grid-cols-2 gap-y-3 pb-5 text-sm leading-5"
								style={{
									gridTemplateRows: `repeat(${Math.ceil(group.links.length / 2)}, auto)`,
								}}
							>
								{group.links.map((link) => (
									<li key={link.href}>
										<a
											href={link.href}
											{...externalProps(link.href)}
											className="text-muted transition-colors hover:text-foreground"
										>
											{link.label}
										</a>
									</li>
								))}
							</ul>
						</details>
					))}
				</nav>

				<nav
					aria-label={t("footer.directory")}
					className="mt-24 w-full border-t border-separator pt-12 max-sm:hidden"
				>
					<ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
						{groups.map((group) => (
							<li key={group.title}>
								<a
									href={group.href}
									{...externalProps(group.href)}
									className="text-xs font-medium text-foreground transition-colors hover:text-accent"
								>
									{group.title}
								</a>
								<ul className="mt-3 flex flex-col gap-2">
									{group.links.map((link) => (
										<li key={link.href}>
											<a
												href={link.href}
												{...externalProps(link.href)}
												className="text-xs font-normal text-muted transition-colors hover:text-foreground"
											>
												{link.label}
											</a>
										</li>
									))}
								</ul>
							</li>
						))}
					</ul>
				</nav>

				<nav
					aria-label={t("footer.social")}
					className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:mt-10"
				>
					<a
						href={githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub"
						className="text-muted transition-colors hover:text-foreground"
					>
						<GitHub className="size-4 sm:size-3.5" />
					</a>
				</nav>

				<p className="text-center text-[13px] leading-[18px] font-normal text-muted sm:text-xs sm:leading-[1.34]">
					© {year} xima.work. {t("site.copyright")}
				</p>

				<ThemeSwitcher locale={locale} />
			</footer>

			<div
				aria-hidden="true"
				className="mx-auto mt-4 h-[200px] w-full max-w-5xl overflow-hidden max-md:h-[120px] max-sm:hidden"
			>
				<svg
					className="h-auto w-full text-separator"
					fill="none"
					viewBox="0 0 1102 300"
					xmlns="http://www.w3.org/2000/svg"
				>
					<text
						x="50%"
						y="250"
						textAnchor="middle"
						fontSize="300"
						fontWeight="500"
						letterSpacing="-12"
						className="font-heading"
						fill="none"
						stroke="currentColor"
						strokeDasharray="8 8"
						strokeWidth="2.5"
						textLength="1090"
						lengthAdjust="spacingAndGlyphs"
					>
						xima.work
					</text>
				</svg>
			</div>
		</>
	);
}
