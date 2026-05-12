import Link from "next/link"
import { notFound } from "next/navigation"

import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import Articles from "@/components/sections/Articles"
import SafeImage from "@/components/UI/SafeImage"
import { getArticles } from "@/lib/articles"
import { formatArticleDate } from "@/lib/article-links"

type ArticlePageProps = {
	params: Promise<{ id: string }>
}

export default async function ArticleDetailsPage({ params }: ArticlePageProps) {
	const { id } = await params
	const articles = await getArticles()
	const article = articles.find(item => String(item.id) === id)

	if (!article) {
		notFound()
	}

	const relatedArticles = articles.filter(item => String(item.id) !== id)
	const paragraphs = article.description
		.split(/\n+/)
		.map(item => item.trim())
		.filter(Boolean)

	return (
		<>
			<Header />

			<main>
				<div className="relative aspect-390/180 md:aspect-1440/420">
					<SafeImage
						src={article.image}
						alt={article.title}
						fill
						priority
						sizes="100vw"
						className="object-cover"
					/>
				</div>

				<section className="py-10 md:py-16 lg:py-22.5">
					<div className="max-w-220 px-4 mx-auto">
						<Link
							href="/news"
							className="inline-flex mb-6 text-[14px] text-brand-blue transition-colors duration-300 hover:text-black"
						>
							← Все статьи
						</Link>

						<div className="mb-4 flex flex-wrap items-center gap-3 text-[14px]">
							<span className="rounded-[50px] bg-[#eef5ff] px-4 py-2 text-brand-blue">
								{article.tag}
							</span>
							<time className="text-brand-gray" dateTime={article.date}>
								{formatArticleDate(article.date)}
							</time>
						</div>

						<h1 className="mb-6 text-[28px] leading-tight font-semibold md:text-[40px] lg:text-[52px]">
							{article.title}
						</h1>

						<div className="max-w-180 space-y-5 text-[16px] leading-[1.8] text-brand-gray md:text-[18px]">
							{paragraphs.map((paragraph, index) => (
								<p key={`${article.id}-${index}`}>{paragraph}</p>
							))}
						</div>
					</div>
				</section>

				{relatedArticles.length > 0 && (
					<Articles
						title="Другие статьи"
						mobileView="stack"
						articles={relatedArticles}
					/>
				)}
			</main>

			<Footer />
		</>
	)
}
