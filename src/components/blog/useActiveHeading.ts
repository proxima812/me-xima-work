/** Заголовок поста, до которого дочитал пользователь (scroll-spy). */
import { useEffect, useState } from "react";

const OFFSET = 120;

export function useActiveHeading(headings: readonly { slug: string }[]) {
	const [active, setActive] = useState(headings[0]?.slug);

	useEffect(() => {
		let frame = 0;

		const update = () => {
			frame = 0;
			const passed = headings.filter(({ slug }) => {
				const element = document.getElementById(slug);
				return element && element.getBoundingClientRect().top <= OFFSET;
			});
			setActive(passed.at(-1)?.slug ?? headings[0]?.slug);
		};
		const request = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};

		update();
		window.addEventListener("scroll", request, { passive: true });
		window.addEventListener("resize", request);
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", request);
			window.removeEventListener("resize", request);
		};
	}, [headings]);

	return active;
}
