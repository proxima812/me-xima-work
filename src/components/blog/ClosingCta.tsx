/** Финальный призыв внизу страниц, как «Ready for you and your agents». */
import { motion } from "motion/react";
import { ArrowRight } from "@/components/ui/icons";
import type { LocaleCode } from "@/config/types";
import { localeHref, useTranslations } from "@/i18n/client";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ClosingCta({
	locale,
	githubUrl,
}: {
	locale: LocaleCode;
	githubUrl: string;
}) {
	const t = useTranslations(locale);

	return (
		<motion.section
			initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
			whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			viewport={{ once: true, margin: "0px 0px -80px 0px" }}
			transition={{ duration: 0.8, ease: EASE }}
			className="site-container section-gap flex flex-col items-center text-center max-sm:pt-6"
		>
			<h2 className="display-closing max-sm:leading-[44px]">
				<span className="block">{t("cta.top")}</span>{" "}
				<span className="block text-muted/70">{t("cta.bottom")}</span>
			</h2>
			<div className="mt-8 flex flex-wrap items-center justify-center gap-3 max-sm:w-full max-sm:flex-col max-sm:gap-2.5 sm:mt-10">
				<a href={localeHref(locale, "articles")} className="button button-primary max-sm:w-full">
					{t("cta.primary")}
				</a>
				<a
					href={githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="button button-tertiary max-sm:w-full"
				>
					{t("cta.secondary")}
					<ArrowRight />
				</a>
			</div>
		</motion.section>
	);
}
