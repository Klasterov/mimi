'use client'

import { useMemo, useState } from "react"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Title } from "@/components/UI/Title"
import { ArticleCard } from "@/components/UI/ArticleCard"

import type { Article } from "@/types/article"

const INITIAL_COUNT = 6
const LOAD_MORE_COUNT = 3

interface NewsPageClientProps {
	articles: Article[]
}

export function NewsPageClient({ articles }: NewsPageClientProps) {
	const [activeTag, setActiveTag] = useState<string | null>(null)
	const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)

	const sortedArticles = useMemo(() => {
		return [...articles].sort(
			(a, b) =>
				new Date(`${b.date}T00:00:00`).getTime() -
				new Date(`${a.date}T00:00:00`).getTime()
		)
	}, [articles])

	const filteredArticles = useMemo(() => {
		if (!activeTag) return sortedArticles
		return sortedArticles.filter(article => article.tag === activeTag)
	}, [activeTag, sortedArticles])

	const availableTags = useMemo(() => {
		return Array.from(
			new Set(
				sortedArticles
					.map(article => article.tag.trim())
					.filter(Boolean)
			)
		)
	}, [sortedArticles])

	const visibleArticles = filteredArticles.slice(0, visibleCount)
	const hasMore = visibleCount < filteredArticles.length
	const emptyMessage = activeTag
		? "По выбранному тегу статей пока нет"
		: "Новостей пока нет"

	const handleTagClick = (tagLabel: string) => {
		setVisibleCount(INITIAL_COUNT)
		setActiveTag(prev => (prev === tagLabel ? null : tagLabel))
	}

	const handleAllClick = () => {
		setActiveTag(null)
		setVisibleCount(INITIAL_COUNT)
	}

	const handleShowMore = () => {
		setVisibleCount(prev => prev + LOAD_MORE_COUNT)
	}

	return (
		<>
			<Header />

			<main>
				<section className="pt-17.5 pb-22.5">
					<div className="max-w-308 px-4 mx-auto">
						<Title className="mb-10">Полезные статьи</Title>

						<div className="flex max-lg:flex-col lg:items-start gap-10 lg:gap-15">
							<div className="grow-0 max-lg:w-full shrink-0 w-40 lg:space-y-3 max-lg:flex gap-3 flex-wrap">
								<button
									type="button"
									onClick={handleAllClick}
									className={`lg:w-full cursor-pointer transition-colors duration-300 rounded-[50px] px-4 py-2.5 inline-flex gap-2.5 items-center font-medium text-[14px] -tracking-[0.01em] ${activeTag === null
										? 'max-lg:bg-[#d9d9d9] lg:bg-[#fcfdff]'
										: 'max-lg:bg-[#fcfdff] max-lg:text-brand-gray lg:hover:bg-[#fcfdff]'
										}`}
								>
									Все
								</button>

								{availableTags.map(tag => {
									const isActive = activeTag === tag

									return (
										<button
											key={tag}
											type="button"
											onClick={() => handleTagClick(tag)}
											className={`lg:w-full cursor-pointer transition-colors duration-300 rounded-[50px] px-4 py-2.5 inline-flex gap-2.5 items-center font-medium text-[14px] -tracking-[0.01em] ${isActive
												? 'max-lg:bg-[#d9d9d9] lg:bg-[#fcfdff]'
												: 'max-lg:bg-[#fcfdff] max-lg:text-brand-gray lg:hover:bg-[#fcfdff]'
												}`}
										>
											{tag}
										</button>
									)
								})}
							</div>

							<div className="flex-auto">
								<div className="mb-6 grid sm:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-5">
									{visibleArticles.map(article => (
										<ArticleCard key={article.id} article={article} />
									))}
								</div>

								{filteredArticles.length === 0 && (
									<div className="text-center text-brand-gray font-helvetica">
										{emptyMessage}
									</div>
								)}

								{hasMore && (
									<div className="text-center">
										<button
											type="button"
											onClick={handleShowMore}
											className="cursor-pointer shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] font-medium text-[13px] text-[#121212] p-3 rounded-[50px] min-w-50 bg-white"
										>
											Показать еще
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</>
	)
}
