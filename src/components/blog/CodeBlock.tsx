/**
 * Замена тега `pre` в контенте поста (`<Content components={{ pre }} />`).
 * Кнопки (язык, копирование, «Открыть») рендерятся на сборке - скрипту в `PostArticle`
 * остается только поведение, а не построение DOM.
 *
 * MDX не передает компоненту локаль, поэтому на каждую локаль свой экспорт:
 * `CodeBlockRu` / `CodeBlockEn`.
 */
import type { HTMLAttributes } from "react";
import type { LocaleCode } from "@/config/types";
import { useTranslations } from "@/i18n/client";
import { ArrowUpRight, ChevronDown, Copy } from "@/components/ui/icons";

const LANGUAGE_NAMES: Record<string, string> = {
	ts: "TypeScript",
	tsx: "TypeScript",
	js: "JavaScript",
	jsx: "JavaScript",
	json: "JSON",
	bash: "Bash",
	sh: "Shell",
	css: "CSS",
	html: "HTML",
	md: "Markdown",
	yaml: "YAML",
	yml: "YAML",
	py: "Python",
	python: "Python",
};

const faviconFor = (domain: string) =>
	`https://www.google.com/s2/favicons?sz=32&domain=${domain}`;

type PreProps = HTMLAttributes<HTMLPreElement> & { "data-language"?: string };

function CodeBlock({
	locale,
	"data-language": language,
	children,
	...rest
}: PreProps & { locale: LocaleCode }) {
	const t = useTranslations(locale);
	const languageLabel = language
		? (LANGUAGE_NAMES[language] ?? language.toUpperCase())
		: "";

	/** `target` читает скрипт: `browser` - Blob в новой вкладке, остальные - сервисы. */
	const openItems = [
		{ target: "browser", label: t("article.code.openInBrowser"), domain: null },
		{ target: "chatgpt", label: "ChatGPT", domain: "chatgpt.com" },
		{ target: "claude", label: "Claude", domain: "claude.ai" },
		{ target: "claude-code", label: "Claude Code", domain: "claude.ai" },
		{ target: "t3chat", label: "T3 Chat", domain: "t3.chat" },
		{ target: "gemini", label: "Gemini", domain: "gemini.google.com" },
		{ target: "perplexity", label: "Perplexity", domain: "www.perplexity.ai" },
	];

	return (
		<figure className="code-block">
			<div className="code-block-actions">
				{languageLabel && <span className="code-block-lang">{languageLabel}</span>}

				<button
					type="button"
					className="code-block-copy"
					aria-label={t("article.code.copy")}
					data-copied-label={t("article.code.copied")}
				>
					<Copy className="size-3.5" />
				</button>

				<div className="code-block-open">
					<button
						type="button"
						className="code-block-open-trigger"
						aria-haspopup="true"
						aria-expanded="false"
					>
						<span>{t("article.code.open")}</span>
						<ChevronDown className="size-3" />
					</button>

					<ul className="code-block-open-menu" hidden>
						{openItems.map((item) => (
							<li key={item.target}>
								<button
									type="button"
									className="code-block-open-item"
									data-target={item.target}
								>
									{item.domain ? (
										<img
											src={faviconFor(item.domain)}
											alt=""
											width={16}
											height={16}
											loading="lazy"
											className="code-block-icon"
										/>
									) : (
										<ArrowUpRight className="size-4" />
									)}
									<span>{item.label}</span>
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="code-block-body">
				<pre {...rest} data-language={language}>
					{children}
				</pre>
			</div>
		</figure>
	);
}

export function CodeBlockRu(props: PreProps) {
	return <CodeBlock {...props} locale="ru" />;
}

export function CodeBlockEn(props: PreProps) {
	return <CodeBlock {...props} locale="en" />;
}
