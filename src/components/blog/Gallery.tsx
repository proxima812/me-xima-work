/**
 * Сетка иллюстраций. Внутри сетки картинки не растягиваются на всю ширину
 * вьюпорта - `wide-breakout` перехватывается на самой сетке, см. стили
 * `.post-gallery` в `PostArticle.astro`.
 */
import type { ImageMetadata } from "astro";
import { cn } from "@/utils/lib/cn";

export interface GalleryProps {
	images: ReadonlyArray<{ src: ImageMetadata; alt: string }>;
	/** Колонок на широком экране. На мобильном всегда одна. */
	columns?: 2 | 3;
}

const COLUMN_CLASS = {
	2: "grid-cols-1 sm:grid-cols-2",
	3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
} as const;

export default function Gallery({ images, columns = 2 }: GalleryProps) {
	return (
		<div className={cn("post-gallery", COLUMN_CLASS[columns])}>
			{images.map(({ src, alt }) => (
				<figure key={src.src}>
					<img
						src={src.src}
						width={src.width}
						height={src.height}
						alt={alt}
						loading="lazy"
						decoding="async"
					/>
					{alt && <figcaption>{alt}</figcaption>}
				</figure>
			))}
		</div>
	);
}
