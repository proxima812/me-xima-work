/** Логотип: иконка сайта и словесный знак. */
export default function Logo({ className }: { className?: string }) {
	return (
		<span className={className ?? "inline-flex items-center gap-2"}>
			<img
				src="/favicon.svg"
				alt=""
				width={28}
				height={28}
				className="size-7 rounded-[8px] max-md:size-6"
			/>
			<span className="font-heading text-[19px] font-medium tracking-[-0.02em] max-md:text-[17px]">
				xima.work
			</span>
		</span>
	);
}
