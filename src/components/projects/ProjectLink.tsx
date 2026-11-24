/**
 * Строка проекта: favicon домена, название-ссылка, описание и, если основная
 * ссылка ведет на сайт, отдельная маленькая ссылка на исходники.
 */
import type { LocaleCode } from "@/config/types";
import { useTranslations } from "@/i18n/client";

export interface ProjectLinkProps {
	href: string;
	title: string;
	description: string;
	/** `| undefined` обязателен: в проекте включен `exactOptionalPropertyTypes`. */
	repo?: string | undefined;
	locale?: LocaleCode;
}

export default function ProjectLink({
	href,
	title,
	description,
	repo,
	locale = "ru",
}: ProjectLinkProps) {
	const t = useTranslations(locale);
	const faviconSrc = `https://www.google.com/s2/favicons?sz=64&domain=${new URL(href).hostname}`;

	return (
		<div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 select-text">
			<img
				src={faviconSrc}
				alt=""
				width={18}
				height={18}
				loading="lazy"
				className="project-favicon h-[18px] w-[18px] shrink-0 rounded-sm"
			/>
			<a
				href={href}
				target="_blank"
				rel="noreferrer"
				className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
			>
				{title}
			</a>
			<span className="text-muted-foreground">{description}</span>
			{repo && (
				<a
					href={repo}
					target="_blank"
					rel="noreferrer"
					className="text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
				>
					{t("projects.code")}
				</a>
			)}
		</div>
	);
}

export function ProjectLinkEn(props: Omit<ProjectLinkProps, "locale">) {
	return <ProjectLink {...props} locale="en" />;
}
