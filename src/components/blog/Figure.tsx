/**
 * Иллюстрация с подписью для контента поста. Ширину и рамку задает общее
 * правило `.post-content img` - здесь только подпись и семантика `<figure>`.
 */
import type { ImageMetadata } from "astro";

export interface FigureProps {
	src: ImageMetadata;
	alt: string;
	/** Свой текст подписи. Без него подписью становится `alt`. */
	caption?: string | undefined;
}

export default function Figure({ src, alt, caption }: FigureProps) {
	const captionText = caption ?? alt;

	return (
		<figure>
			<img
				src={src.src}
				width={src.width}
				height={src.height}
				alt={alt}
				loading="lazy"
				decoding="async"
			/>
			{captionText && <figcaption>{captionText}</figcaption>}
		</figure>
	);
}
