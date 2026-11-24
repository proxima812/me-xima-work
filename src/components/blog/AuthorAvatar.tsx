/**
 * Аватар автора от blobatar.dev. Блоб детерминирован по имени, поэтому
 * «каждый раз разный» = случайное зерно. Зерно меняется только после
 * монтирования: на сервере и при гидрации рендерится стабильный `seed`,
 * иначе React увидел бы расхождение разметки.
 */
import { Blobatar } from "@blobatar/react";
import { useEffect, useState } from "react";

export interface AuthorAvatarProps {
	/** Стабильное зерно для SSR (например, slug поста). */
	seed: string;
	size: number;
	className?: string;
}

export default function AuthorAvatar({ seed, size, className }: AuthorAvatarProps) {
	const [name, setName] = useState(seed);

	useEffect(() => {
		setName(`${seed}-${Math.random().toString(36).slice(2)}`);
	}, [seed]);

	return (
		<Blobatar
			name={name}
			size={size}
			background="circle"
			alt=""
			className={className}
		/>
	);
}
