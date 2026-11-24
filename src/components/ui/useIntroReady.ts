/**
 * `true`, когда шторка прелоадера ушла (с `<html>` снят `preloading`).
 * Анимации появления на motion ждут этого момента, иначе они отыграли бы
 * под шторкой и пользователь их не увидел.
 */
import { useEffect, useState } from "react";

export function useIntroReady() {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const root = document.documentElement;
		if (!root.classList.contains("preloading")) {
			setReady(true);
			return;
		}

		const observer = new MutationObserver(() => {
			if (!root.classList.contains("preloading")) {
				setReady(true);
				observer.disconnect();
			}
		});
		observer.observe(root, { attributes: true, attributeFilter: ["class"] });
		return () => observer.disconnect();
	}, []);

	return ready;
}
