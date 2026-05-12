'use client'

import { useEffect, useState } from "react"
import Articles from "./Articles"
import type { Article } from "@/types/article"

interface ArticlesWrapperProps {
	title: string
	mobileView?: "slider" | "stack"
}

export default function ArticlesWrapper({
	title,
	mobileView = "slider",
}: ArticlesWrapperProps) {
	const [articles, setArticles] = useState<Article[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const response = await fetch('/api/articles')
				if (response.ok) {
					const data = await response.json()
					setArticles(data)
				}
			} catch (error) {
				console.error('Failed to fetch articles:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchArticles()
	}, [])

	if (loading) {
		return null
	}

	return <Articles title={title} articles={articles} mobileView={mobileView} />
}
