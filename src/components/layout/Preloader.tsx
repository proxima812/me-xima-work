/**
 * Прелоадер skiper-ui «skiper8»: слова-приветствия сменяют друг друга,
 * потом шторка уезжает вверх, а ее выгнутый нижний край выпрямляется.
 *
 * Показывается один раз за сессию. Решение принимает скрипт в `<head>`:
 * он ставит `html.preloading` до первой отрисовки, поэтому до гидрации
 * шторка уже закрывает страницу и контент не мелькает.
 */
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";

const EASE = [0.76, 0, 0.24, 1] as const;
/** Сколько шторка держится на экране до начала ухода. */
const HOLD_MS = 2300;

const slideUp: Variants = {
	initial: { top: 0 },
	exit: { top: "-100vh", transition: { duration: 0.8, ease: EASE, delay: 0.2 } },
};

const fade: Variants = {
	initial: { opacity: 0 },
	enter: { opacity: 0.75, transition: { duration: 1, delay: 0.2 } },
};

export default function Preloader({ words }: { words: readonly string[] }) {
	const [visible, setVisible] = useState(true);
	const [active, setActive] = useState(false);

	useEffect(() => {
		const root = document.documentElement;
		if (!root.classList.contains("preloading")) {
			setVisible(false);
			return;
		}

		setActive(true);
		sessionStorage.setItem("preloader-seen", "1");

		const timer = setTimeout(() => {
			setVisible(false);
			// Снимаем класс в момент ухода шторки: `.enter`-анимации страницы
			// стартуют, пока она уезжает.
			root.classList.remove("preloading");
		}, HOLD_MS);

		return () => clearTimeout(timer);
	}, []);

	return (
		<AnimatePresence mode="wait">
			{visible && (
				<motion.div
					key="preloader"
					data-preloader={active ? "active" : "idle"}
					variants={slideUp}
					initial="initial"
					exit="exit"
					className="fixed inset-0 z-[99] flex h-full w-full items-center justify-center bg-background"
				>
					{active && <Words words={words} />}
				</motion.div>
			)}
		</AnimatePresence>
	);
}

function Words({ words }: { words: readonly string[] }) {
	const [index, setIndex] = useState(0);
	const [size, setSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		setSize({ width: window.innerWidth, height: window.innerHeight });
	}, []);

	useEffect(() => {
		if (index === words.length - 1) return;
		// Первое слово держится секунду, остальные мелькают по 150ms.
		const timer = setTimeout(() => setIndex(index + 1), index === 0 ? 1000 : 150);
		return () => clearTimeout(timer);
	}, [index, words.length]);

	const { width: w, height: h } = size;
	if (w === 0) return null;

	const curvedPath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + 300} 0 ${h} L0 0`;
	const flatPath = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} L0 0`;

	const curve: Variants = {
		initial: { d: curvedPath, transition: { duration: 0.7, ease: EASE } },
		exit: { d: flatPath, transition: { duration: 0.7, ease: EASE, delay: 0.3 } },
	};

	return (
		<>
			<motion.p
				variants={fade}
				initial="initial"
				animate="enter"
				className="absolute z-10 flex items-center gap-3 font-heading text-5xl font-medium tracking-tighter text-foreground md:text-6xl"
			>
				<span className="size-2.5 rounded-full bg-foreground" aria-hidden="true" />
				{words[index]}
			</motion.p>
			<svg
				className="pointer-events-none absolute top-0 h-[calc(100%+300px)] w-full"
				aria-hidden="true"
			>
				<motion.path variants={curve} initial="initial" exit="exit" className="fill-background" />
			</svg>
		</>
	);
}
