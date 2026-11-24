/**
 * Первый экран главной по образцу heroui.com: крупный заголовок в две
 * строки, во второй строке приглушенный цвет. В каждую строку «въезжает»
 * плитка с иконкой категории блога, иконки сменяются каждые 3.2s.
 */
import { useEffect, useState } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { useIntroReady } from "@/components/ui/useIntroReady";
import type { LocaleCode } from "@/config/types";
import { localeHref, useTranslations } from "@/i18n/client";

export interface HeroProps {
	locale: LocaleCode;
	/** Иконки категорий для плиток. */
	icons: readonly string[];
	lead: string;
}

const enterStyle = (delayMs: number) =>
	({ "--enter-delay": `${delayMs}ms` }) as React.CSSProperties;

export default function Hero({ locale, icons, lead }: HeroProps) {
	const t = useTranslations(locale);
	const half = Math.ceil(icons.length / 2);

	return (
		<section aria-labelledby="hero-heading" className="flex w-full flex-col items-center">
			<div className="site-container flex flex-col items-center pt-14 text-center sm:pt-28">
				<h1 id="hero-heading" className="display-hero">
					<span className="sr-only">
						{t("home.line1.before")} {t("home.line1.after")} {t("home.line2.before")}{" "}
						{t("home.line2.after")}
					</span>
					<span aria-hidden="true" className="enter block" style={enterStyle(100)}>
						<HeroSlot
							before={t("home.line1.before")}
							after={t("home.line1.after")}
							icons={icons.slice(0, half)}
							delay={1200}
							rotation={-8}
						/>
					</span>
					<span aria-hidden="true" className="enter block text-muted/70" style={enterStyle(200)}>
						<HeroSlot
							before={t("home.line2.before")}
							after={t("home.line2.after")}
							icons={icons.slice(half)}
							delay={1250}
							offset={1600}
							rotation={8}
						/>
					</span>
				</h1>

				<p
					className="lead enter mt-4 max-w-2xl max-sm:text-[17px] max-sm:leading-[26px]"
					style={enterStyle(400)}
				>
					{lead}
				</p>

				<div
					className="enter mt-8 flex flex-wrap items-center justify-center gap-3 max-sm:mt-7 max-sm:w-full max-sm:flex-col max-sm:gap-2.5"
					style={enterStyle(500)}
				>
					<a
						href={localeHref(locale, "articles")}
						className="button button-primary max-sm:w-full"
					>
						{t("home.cta.articles")}
					</a>
					<a
						href={localeHref(locale, "articles/categories")}
						className="button button-tertiary max-sm:w-full"
					>
						{t("home.cta.categories")}
						<ArrowRight />
					</a>
				</div>
			</div>
		</section>
	);
}

interface HeroSlotProps {
	before: string;
	after: string;
	icons: readonly string[];
	delay: number;
	offset?: number;
	rotation: number;
	interval?: number;
}

function HeroSlot({
	before,
	after,
	icons,
	delay,
	offset = 0,
	rotation,
	interval = 3200,
}: HeroSlotProps) {
	const [index, setIndex] = useState(0);
	const ready = useIntroReady();

	useEffect(() => {
		if (!ready || icons.length < 2) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		let timer: ReturnType<typeof setInterval> | undefined;
		const start = setTimeout(() => {
			timer = setInterval(() => setIndex((value) => value + 1), interval);
		}, delay + offset);

		return () => {
			clearTimeout(start);
			clearInterval(timer);
		};
	}, [ready, icons.length, delay, offset, interval]);

	const activeIndex = icons.length > 0 ? index % icons.length : 0;

	return (
		<span
			className="hero-slot-line"
			style={
				{
					"--glyph-rotation": `${rotation}deg`,
					"--slot-delay": `${delay}ms`,
				} as React.CSSProperties
			}
		>
			<span className="hero-slot__before">{before}</span>
			<span className="hero-slot">
				{" "}
				<button
					type="button"
					tabIndex={-1}
					className="hero-slot__tile"
					onClick={() => setIndex((value) => value + 1)}
				>
					{icons.map((icon, iconIndex) => (
						<span
							key={icon}
							className="hero-slot__layer"
							data-active={iconIndex === activeIndex}
						>
							<img src={icon} alt="" className="hero-slot__icon" />
						</span>
					))}
				</button>{" "}
			</span>
			<span className="hero-slot__after">{after}</span>
		</span>
	);
}
