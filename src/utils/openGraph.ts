/**
 * Open Graph метаданные страницы для карточек-ссылок. Грузятся на сборке.
 *
 * Чужой сайт может лежать, отвечать 5xx или висеть, поэтому:
 * - запрос ограничен таймаутом;
 * - любая ошибка дает `null`, и карточка рисует запасной вариант из пропсов;
 * - результат кешируется на время сборки: ru и en статьи ссылаются
 *   на одни и те же адреса, и каждый сайт запрашивается один раз.
 */

export interface OpenGraph {
	readonly title?: string;
	readonly description?: string;
	readonly image?: string;
	readonly imageAlt?: string;
	readonly url: string;
}

const TIMEOUT_MS = 8000;
const cache = new Map<string, Promise<OpenGraph | null>>();

const ENTITIES: Record<string, string> = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: '"',
	apos: "'",
	nbsp: " ",
};

function decode(value: string): string {
	return value
		.replace(/&#x([\da-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
		.replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
		.replace(/&([a-z]+);/gi, (match, name) => ENTITIES[name.toLowerCase()] ?? match)
		.trim();
}

function parseAttributes(tag: string): Record<string, string> {
	const attributes: Record<string, string> = {};
	for (const [, name, , quoted, bare] of tag.matchAll(
		/([\w:-]+)\s*=\s*(?:(["'])([\s\S]*?)\2|([^\s>]+))/g,
	)) {
		attributes[name.toLowerCase()] = decode(quoted ?? bare ?? "");
	}
	return attributes;
}

const httpsOnly = (value: string | undefined) =>
	value?.startsWith("https://") ? value : undefined;

function parse(html: string, pageUrl: string): OpenGraph {
	// Метатеги живут в <head>, остальную страницу не разбираем.
	const headEnd = html.search(/<\/head>/i);
	const head = headEnd === -1 ? html : html.slice(0, headEnd);
	const meta = new Map<string, string>();

	for (const [tag] of head.matchAll(/<meta\b[^>]*>/gi)) {
		const { property, name, content } = parseAttributes(tag);
		const key = (property ?? name)?.toLowerCase();
		if (key && content && !meta.has(key)) meta.set(key, content);
	}

	const titleTag = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];

	return {
		title: meta.get("og:title") ?? (titleTag ? decode(titleTag) : undefined),
		description: meta.get("og:description") ?? meta.get("description"),
		image: httpsOnly(
			meta.get("og:image:secure_url") ?? meta.get("og:image:url") ?? meta.get("og:image"),
		),
		imageAlt: meta.get("og:image:alt"),
		url: httpsOnly(meta.get("og:url")) ?? pageUrl,
	};
}

async function load(pageUrl: string): Promise<OpenGraph | null> {
	try {
		const response = await fetch(pageUrl, {
			signal: AbortSignal.timeout(TIMEOUT_MS),
			headers: {
				"user-agent": "Mozilla/5.0 (compatible; xima.work link preview)",
				accept: "text/html",
			},
		});
		if (!response.ok) return null;
		if (!response.headers.get("content-type")?.includes("html")) return null;
		return parse(await response.text(), pageUrl);
	} catch {
		return null;
	}
}

export function getOpenGraph(pageUrl: string): Promise<OpenGraph | null> {
	let pending = cache.get(pageUrl);
	if (!pending) {
		pending = load(pageUrl);
		cache.set(pageUrl, pending);
	}
	return pending;
}
