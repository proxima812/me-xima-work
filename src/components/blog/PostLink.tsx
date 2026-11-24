/**
 * Замена тега `a` в контенте поста: внешняя ссылка получает favicon домена,
 * как в `ProjectLink`. Подставляется через `<Content components={{ a }} />`.
 */
import type { AnchorHTMLAttributes } from "react";

export default function PostLink({
	href = "",
	children,
	...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
	const isExternal = href.startsWith("http://") || href.startsWith("https://");
	const faviconSrc = isExternal
		? `https://www.google.com/s2/favicons?sz=64&domain=${new URL(href).hostname}`
		: null;

	return (
		<a
			href={href}
			{...rest}
			{...(isExternal && { target: "_blank", rel: "noreferrer" })}
			className="post-link"
		>
			{faviconSrc && (
				<img
					src={faviconSrc}
					alt=""
					width={18}
					height={18}
					loading="lazy"
					className="post-link-favicon"
				/>
			)}
			{children}
		</a>
	);
}
