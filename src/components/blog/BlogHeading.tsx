/** Шапка страницы блога: синяя надпись и заголовок в две строки. */
import type { CSSProperties } from "react";

export interface BlogHeadingProps {
	eyebrow: string;
	top: string;
	bottom: string;
	/** Заголовок первого уровня или второго (на главной h1 уже есть). */
	as?: "h1" | "h2";
}

const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

export default function BlogHeading({ eyebrow, top, bottom, as: Tag = "h1" }: BlogHeadingProps) {
	return (
		<>
			<p
				className="enter text-base leading-6 font-medium text-accent max-md:text-[15px] max-md:leading-[22px]"
				style={delay(100)}
			>
				{eyebrow}
			</p>
			<Tag className="display-statement mt-4 sm:mt-5">
				<span className="enter block" style={delay(200)}>
					{top}
				</span>
				<span className="enter block text-muted/60" style={delay(300)}>
					{bottom}
				</span>
			</Tag>
		</>
	);
}
