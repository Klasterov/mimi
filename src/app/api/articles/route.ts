import { getArticles } from "@/lib/articles"

export async function GET() {
	try {
		const articles = await getArticles()
		return Response.json(articles)
	} catch (error) {
		console.error("Failed to load articles:", error)
		return Response.json([], { status: 500 })
	}
}
