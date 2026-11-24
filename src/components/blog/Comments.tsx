/**
 * Комментарии под постом - обсуждения GitHub через giscus. Тема виджета
 * следует за темой сайта: при переключении iframe получает новую тему
 * через `postMessage`.
 */
import { useEffect, useRef } from "react";

export interface CommentsProps {
	locale: string;
	label: string;
	repo: string;
	repoId: string;
	category: string;
	categoryId: string;
}

const currentTheme = () =>
	document.documentElement.classList.contains("dark") ? "dark" : "light";

export default function Comments({ locale, label, repo, repoId, category, categoryId }: CommentsProps) {
	const container = useRef<HTMLElement>(null);

	useEffect(() => {
		const host = container.current;
		if (!host || host.querySelector("script")) return;

		const script = document.createElement("script");
		Object.entries({
			src: "https://giscus.app/client.js",
			"data-repo": repo,
			"data-repo-id": repoId,
			"data-category": category,
			"data-category-id": categoryId,
			"data-mapping": "pathname",
			"data-strict": "1",
			"data-reactions-enabled": "1",
			"data-emit-metadata": "0",
			"data-input-position": "top",
			"data-theme": currentTheme(),
			"data-lang": locale,
			"data-loading": "lazy",
			crossorigin: "anonymous",
		}).forEach(([name, value]) => script.setAttribute(name, value));
		script.async = true;
		host.appendChild(script);

		const observer = new MutationObserver(() => {
			host
				.querySelector<HTMLIFrameElement>("iframe.giscus-frame")
				?.contentWindow?.postMessage(
					{ giscus: { setConfig: { theme: currentTheme() } } },
					"https://giscus.app",
				);
		});
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
		return () => observer.disconnect();
	}, [locale, repo, repoId, category, categoryId]);

	return <section ref={container} aria-label={label} className="giscus w-full" />;
}
