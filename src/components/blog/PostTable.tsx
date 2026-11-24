/**
 * Замена тега `table` в контенте поста. Обертка со своей прокруткой: без нее
 * широкая таблица распирает страницу и появляется горизонтальный скролл
 * у всего документа, а не у таблицы.
 */
import type { TableHTMLAttributes } from "react";

export default function PostTable(props: TableHTMLAttributes<HTMLTableElement>) {
	return (
		<div className="post-table">
			<table {...props} />
		</div>
	);
}
