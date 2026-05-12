import type { Article } from "@/types/article"

export function getArticleHref(articleId: Article["id"]): string {
	return `/article/${encodeURIComponent(String(articleId))}`
}

export function formatArticleDate(date: string): string {
	const parsedDate = new Date(`${date}T00:00:00`)

	if (Number.isNaN(parsedDate.getTime())) {
		return date
	}

	return parsedDate.toLocaleDateString("ru-RU", {
		day: "numeric",
		month: "long",
		year: "numeric",
	})
}
