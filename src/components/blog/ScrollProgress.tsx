/**
 * Плавающий индикатор чтения внизу экрана (до xl, где оглавления справа нет).
 * Свернут - кольцо прогресса и текущий раздел; по нажатию пилюля
 * раскрывается в список разделов.
 */
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { TocHeading } from "./TableOfContents";
import { useActiveHeading } from "./useActiveHeading";

const SPRING = { type: "spring", stiffness: 420, damping: 34 } as const;
const BLUR = {
	initial: { opacity: 0, filter: "blur(4px)" },
	animate: { opacity: 1, filter: "blur(0px)" },
	exit: { opacity: 0, filter: "blur(4px)" },
};

export default function ScrollProgress({
	headings,
	label,
}: {
	headings: readonly TocHeading[];
	label: string;
}) {
	const active = useActiveHeading(headings);
	const [open, setOpen] = useState(false);
	const root = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll();
	const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
	const current = headings.find((heading) => heading.slug === active);

	useEffect(() => {
		if (!open) return;
		const onPointer = (event: PointerEvent) => {
			if (!root.current?.contains(event.target as Node)) setOpen(false);
		};
		const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
		document.addEventListener("pointerdown", onPointer);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("pointerdown", onPointer);
			document.removeEventListener("keydown", onKey);
		};
	}, [open]);

	const go = (slug: string) => {
		setOpen(false);
		document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<div ref={root} className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 xl:hidden">
			<motion.div
				layout
				transition={SPRING}
				style={{ borderRadius: open ? 26 : 999 }}
				className="overflow-hidden border border-border bg-overlay/80 shadow-overlay backdrop-blur-lg"
			>
				<AnimatePresence mode="popLayout" initial={false}>
					{open ? (
						<motion.ul
							key="list"
							{...BLUR}
							transition={{ duration: 0.24 }}
							aria-label={label}
							className="flex max-h-[60svh] w-max max-w-[calc(100vw-2rem)] flex-col overflow-y-auto p-1.5"
						>
							{headings.map((heading, index) => {
								const isActive = heading.slug === active;

								return (
									<motion.li
										key={heading.slug}
										initial={{ opacity: 0, y: 4, filter: "blur(3px)" }}
										animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
										transition={{ duration: 0.3, delay: 0.04 + index * 0.03 }}
									>
										<button
											type="button"
											onClick={() => go(heading.slug)}
											className={
												"relative flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm leading-none font-medium transition-colors " +
												(heading.depth === 3 ? "pl-6 " : "") +
												(isActive
													? "bg-default text-foreground"
													: "text-muted hover:text-foreground")
											}
										>
											<span
												aria-hidden="true"
												className={
													"size-1.5 shrink-0 rounded-full " +
													(isActive ? "bg-accent" : "bg-muted/40")
												}
											/>
											<span className="truncate">{heading.text}</span>
										</button>
									</motion.li>
								);
							})}
						</motion.ul>
					) : (
						<motion.button
							key="pill"
							{...BLUR}
							transition={{ duration: 0.24 }}
							type="button"
							aria-label={label}
							aria-expanded={open}
							onClick={() => setOpen(true)}
							className="flex items-center gap-2.5 py-1.5 pr-4 pl-2"
						>
							<svg viewBox="0 0 24 24" className="size-5 -rotate-90" aria-hidden="true">
								<circle cx="12" cy="12" r="10" fill="none" strokeWidth="2.5" className="stroke-foreground/15" />
								<motion.circle
									cx="12"
									cy="12"
									r="10"
									fill="none"
									strokeWidth="2.5"
									strokeLinecap="round"
									className="stroke-accent"
									style={{ pathLength: progress }}
								/>
							</svg>
							<AnimatePresence mode="wait" initial={false}>
								<motion.span
									key={current?.slug ?? "label"}
									{...BLUR}
									transition={{ duration: 0.22 }}
									className="max-w-[60vw] truncate text-sm leading-none font-medium whitespace-nowrap"
								>
									{current?.text ?? label}
								</motion.span>
							</AnimatePresence>
						</motion.button>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	);
}
