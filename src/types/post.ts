/** Данные поста для React-компонентов: только сериализуемые поля. */
export interface PostCategoryData {
	readonly id: string;
	readonly label: string;
	readonly icon: string;
}

export interface PostCardData {
	readonly slug: string;
	readonly href: string;
	readonly title: string;
	readonly description: string;
	/** ISO-строка: Date не переживает сериализацию в пропсы острова. */
	readonly date: string;
	readonly cover: {
		readonly src: string;
		readonly srcSet?: string | undefined;
		readonly width: number;
		readonly height: number;
		readonly alt: string;
		readonly isSvg: boolean;
	};
	readonly categories: readonly PostCategoryData[];
}
