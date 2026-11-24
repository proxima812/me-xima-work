import type { ImgHTMLAttributes } from "react";

export default function PostImage({
	alt = "",
	title,
	loading = "lazy",
	decoding = "async",
	...rest
}: ImgHTMLAttributes<HTMLImageElement>) {
	const caption = title || alt;

	return (
		<span className="my-2 inline-flex w-full min-w-0 flex-col gap-2">
			<img
				{...rest}
				alt={alt}
				title={title}
				loading={loading}
				decoding={decoding}
			/>
			{caption && (
				<span className="text-center text-sm text-muted-foreground">
					{caption}
				</span>
			)}
		</span>
	);
}
