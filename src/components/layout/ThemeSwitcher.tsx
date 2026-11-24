/**
 * Переключатель темы как в футере heroui.com: сегмент из трех иконок,
 * белая «таблетка» переезжает к выбранной. Выбор живет в `localStorage.theme`,
 * класс на <html> ставит еще скрипт в `<head>` - здесь только смена.
 */
import { motion } from "motion/react";
import { useEffect, useId, useState } from "react";
import { Monitor, Moon, Sun } from "@/components/ui/icons";
import type { LocaleCode } from "@/config/types";
import { useTranslations } from "@/i18n/client";
import { cn } from "@/utils/lib/cn";

type Theme = "light" | "dark" | "system";

const THEME_EVENT = "site:theme";

function applyTheme(theme: Theme) {
	const dark =
		theme === "dark" ||
		(theme === "system" &&
			window.matchMedia("(prefers-color-scheme: dark)").matches);
	const root = document.documentElement;
	root.classList.toggle("dark", dark);
	root.classList.toggle("light", !dark);
}

function readTheme(): Theme {
	const stored = localStorage.getItem("theme");
	return stored === "light" || stored === "dark" ? stored : "system";
}

export default function ThemeSwitcher({ locale }: { locale: LocaleCode }) {
	const t = useTranslations(locale);
	const id = useId();
	// До монтирования тема неизвестна: сервер не видит localStorage.
	const [theme, setTheme] = useState<Theme | null>(null);

	useEffect(() => {
		setTheme(readTheme());

		const sync = (event: Event) => setTheme((event as CustomEvent<Theme>).detail);
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const onSystemChange = () => {
			if (readTheme() === "system") applyTheme("system");
		};

		window.addEventListener(THEME_EVENT, sync);
		media.addEventListener("change", onSystemChange);
		return () => {
			window.removeEventListener(THEME_EVENT, sync);
			media.removeEventListener("change", onSystemChange);
		};
	}, []);

	const select = (next: Theme) => {
		if (next === "system") localStorage.removeItem("theme");
		else localStorage.setItem("theme", next);
		applyTheme(next);
		window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: next }));
	};

	const options = [
		{ value: "light", label: t("theme.light"), Icon: Sun },
		{ value: "dark", label: t("theme.dark"), Icon: Moon },
		{ value: "system", label: t("theme.system"), Icon: Monitor },
	] as const;

	return (
		<div
			role="radiogroup"
			aria-label={t("theme.label")}
			className={cn(
				"relative inline-flex items-center rounded-[1.25rem] bg-default p-0.5 transition-opacity",
				theme === null && "pointer-events-none opacity-50",
			)}
		>
			{options.map(({ value, label, Icon }) => {
				const selected = theme === value;

				return (
					<button
						key={value}
						type="button"
						role="radio"
						aria-checked={selected}
						aria-label={label}
						disabled={theme === null}
						onClick={() => select(value)}
						className={cn(
							"relative z-[1] flex size-7 items-center justify-center rounded-3xl transition-[color,opacity] duration-150",
							selected
								? "text-foreground"
								: "text-muted [@media(hover:hover)]:hover:opacity-70",
						)}
					>
						{selected && (
							<motion.span
								layoutId={`theme-indicator-${id}`}
								className="absolute inset-0 -z-10 rounded-3xl bg-segment shadow-surface"
								transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
							/>
						)}
						<Icon className="size-3.5" />
					</button>
				);
			})}
		</div>
	);
}
