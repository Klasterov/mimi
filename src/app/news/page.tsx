import { routes } from "@/config/routes"
import { getArticles } from "@/lib/articles"

import { NewsPageClient } from "./NewsPageClient"

export const metadata = {
	title: routes.news.title,
}

export default async function NewsPage() {
	const articles = await getArticles()

	return <NewsPageClient articles={articles} />
}
