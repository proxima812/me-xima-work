/** Иконки в стиле heroui.com: 16x16, заливка `currentColor`. */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon16({ d, ...props }: IconProps & { d: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="none"
			viewBox="0 0 16 16"
			aria-hidden="true"
			{...props}
		>
			<path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d={d} />
		</svg>
	);
}

export const ChevronDown = (props: IconProps) => (
	<Icon16
		{...props}
		d="M2.97 5.47a.75.75 0 0 1 1.06 0L8 9.44l3.97-3.97a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 0-1.06"
	/>
);

export const ChevronRight = (props: IconProps) => (
	<Icon16
		{...props}
		d="M5.47 13.03a.75.75 0 0 1 0-1.06L9.44 8 5.47 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0"
	/>
);

export const ChevronLeft = (props: IconProps) => (
	<Icon16
		{...props}
		d="M10.53 2.97a.75.75 0 0 1 0 1.06L6.56 8l3.97 3.97a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 0"
	/>
);

export const ArrowRight = (props: IconProps) => (
	<Icon16
		{...props}
		d="M1.25 8A.75.75 0 0 1 2 7.25h10.19L9.47 4.53a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06l2.72-2.72H2A.75.75 0 0 1 1.25 8"
	/>
);

export const ArrowUpRight = (props: IconProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		fill="none"
		viewBox="0 0 16 16"
		aria-hidden="true"
		{...props}
	>
		<path
			fill="currentColor"
			d="M12.728 2.521a.75.75 0 0 1 .75.75v5.657a.751.751 0 0 1-1.5 0V5.083l-8.176 8.176a.75.75 0 0 1-1.061-1.06l8.176-8.177H7.07a.75.75 0 0 1 .001-1.5z"
		/>
	</svg>
);

export const Sun = (props: IconProps) => (
	<Icon16
		{...props}
		d="M8 3a.75.75 0 0 1-.75-.75V.75a.75.75 0 0 1 1.5 0v1.5A.75.75 0 0 1 8 3m0 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8m-.75 3.25a.75.75 0 0 0 1.5 0v-1.5a.75.75 0 0 0-1.5 0zM13 8a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 13 8M.75 7.25a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5zm10.786-2.786a.75.75 0 0 1 0-1.06l1.06-1.06a.75.75 0 0 1 1.06 1.06l-1.06 1.06a.75.75 0 0 1-1.06 0m-9.193 8.132a.75.75 0 0 0 1.06 1.06l1.062-1.06a.75.75 0 0 0-1.061-1.06zm9.193-1.06a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 0 1-1.06 1.06l-1.06-1.06a.75.75 0 0 1 0-1.06M3.404 2.343a.75.75 0 0 0-1.06 1.06l1.06 1.061a.75.75 0 1 0 1.06-1.06z"
	/>
);

export const Moon = (props: IconProps) => (
	<Icon16
		{...props}
		d="M8 13.5a5.5 5.5 0 0 0 2.263-10.514 5.5 5.5 0 0 1-7.278 7.278A5.5 5.5 0 0 0 8 13.5M1.045 8.795a7.001 7.001 0 1 0 7.75-7.75l-.028-.003A7 7 0 0 0 8 1c-.527 0-.59.842-.185 1.18a4 4 0 0 1 .342.322A4 4 0 1 1 2.18 7.814C1.842 7.41 1 7.474 1 8a7 7 0 0 0 .045.794"
	/>
);

export const Monitor = (props: IconProps) => (
	<Icon16
		{...props}
		d="M12 3H4a1.5 1.5 0 0 0-1.5 1.5v4A1.5 1.5 0 0 0 4 10h8a1.5 1.5 0 0 0 1.5-1.5v-4A1.5 1.5 0 0 0 12 3M4 1.5a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h3.25V13h-2.5a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-2.5v-1.5H12a3 3 0 0 0 3-3v-4a3 3 0 0 0-3-3z"
	/>
);

export const Copy = (props: IconProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width="14"
		height="14"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
		{...props}
	>
		<rect x="9" y="9" width="13" height="13" rx="2" />
		<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
	</svg>
);

export const GitHub = (props: IconProps) => (
	<svg
		aria-hidden="true"
		fill="currentColor"
		focusable="false"
		height="1em"
		viewBox="0 0 24 24"
		width="1em"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M12 2.5a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34C5.68 17.31 5.03 17 5.03 17c-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85v2.74c0 .27.16.59.67.5 3.97-1.34 6.83-5.08 6.83-9.5a10 10 0 0 0-10-10Z" />
	</svg>
);
