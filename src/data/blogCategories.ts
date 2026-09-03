import type { LocaleCode } from "@/config/types";

export const blogCategoryIds = [
	"astro",
	"typescript",
	"tailwind",
	"mdx",
	"design-systems",
	"design-resources",
	"automation",
	"github-actions",
	"cloudflare-workers",
	"telegram",
	"tauri",
	"rust",
	"android",
	"ai-writing",
	"ai-agents",
	"mcp",
] as const;

export type BlogCategoryId = (typeof blogCategoryIds)[number];

export interface BlogCategory {
	readonly id: BlogCategoryId;
	readonly label: Record<LocaleCode, string>;
	readonly icon: `/category-icons/${string}.svg`;
}

export const blogCategories = {
	astro: {
		id: "astro",
		label: { ru: "Astro", en: "Astro" },
		icon: "/category-icons/astro.svg",
	},
	typescript: {
		id: "typescript",
		label: { ru: "TypeScript", en: "TypeScript" },
		icon: "/category-icons/typescript.svg",
	},
	tailwind: {
		id: "tailwind",
		label: { ru: "Tailwind CSS", en: "Tailwind CSS" },
		icon: "/category-icons/tailwind.svg",
	},
	mdx: {
		id: "mdx",
		label: { ru: "MDX", en: "MDX" },
		icon: "/category-icons/mdx.svg",
	},
	"design-systems": {
		id: "design-systems",
		label: { ru: "Design Systems", en: "Design Systems" },
		icon: "/category-icons/design-systems.svg",
	},
	"design-resources": {
		id: "design-resources",
		label: { ru: "Design Resources", en: "Design Resources" },
		icon: "/category-icons/design-resources.svg",
	},
	automation: {
		id: "automation",
		label: { ru: "Automation", en: "Automation" },
		icon: "/category-icons/automation.svg",
	},
	"github-actions": {
		id: "github-actions",
		label: { ru: "GitHub Actions", en: "GitHub Actions" },
		icon: "/category-icons/github-actions.svg",
	},
	"cloudflare-workers": {
		id: "cloudflare-workers",
		label: { ru: "Cloudflare Workers", en: "Cloudflare Workers" },
		icon: "/category-icons/cloudflare-workers.svg",
	},
	telegram: {
		id: "telegram",
		label: { ru: "Telegram", en: "Telegram" },
		icon: "/category-icons/telegram.svg",
	},
	tauri: {
		id: "tauri",
		label: { ru: "Tauri", en: "Tauri" },
		icon: "/category-icons/tauri.svg",
	},
	rust: {
		id: "rust",
		label: { ru: "Rust", en: "Rust" },
		icon: "/category-icons/rust.svg",
	},
	android: {
		id: "android",
		label: { ru: "Android", en: "Android" },
		icon: "/category-icons/android.svg",
	},
	"ai-writing": {
		id: "ai-writing",
		label: { ru: "AI Writing", en: "AI Writing" },
		icon: "/category-icons/ai-writing.svg",
	},
	"ai-agents": {
		id: "ai-agents",
		label: { ru: "AI Agents", en: "AI Agents" },
		icon: "/category-icons/ai-agents.svg",
	},
	mcp: {
		id: "mcp",
		label: { ru: "MCP", en: "MCP" },
		icon: "/category-icons/mcp.svg",
	},
} satisfies Record<BlogCategoryId, BlogCategory>;

export function getBlogCategory(id: BlogCategoryId) {
	return blogCategories[id];
}
