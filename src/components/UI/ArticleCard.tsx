import { Article } from "@/types/article";
import Link from "next/link";
import { getArticleHref } from "@/lib/article-links";
import SafeImage from "@/components/UI/SafeImage";

export function ArticleCard({ article, className }: { article: Article, className?: string }) {
	function isNewArticle(date: string, days = 7) {
		const articleDate = new Date(date).getTime()
		const now = Date.now()

		const diff = now - articleDate
		const daysMs = days * 24 * 60 * 60 * 1000

		return diff <= daysMs
	}
	return (
		<article className={`max-lg:min-h-93.75 group flex h-full flex-col relative bg-white p-4 pt-5 md:p-5 md:pt-7.5 rounded-[20px] leading-tight font-semibold ${className}`}>

			<div className="flex justify-between items-center mb-4 gap-3">
				<span className="text-brand-blue text-[14px]">
					{article.tag}
				</span>

				{isNewArticle(article.date) && (
					<span className="bg-[#0a051a] text-white text-[13px] py-1 px-3 uppercase rounded-tl-[60px] rounded-tr-[50px] rounded-br-[50px] rounded-bl-sm">
						Новое
					</span>
				)}
			</div>

			<h3 className="text-[20px] text-[#0a051a] mb-5 transition-colors duration-350 group-hover:text-brand-blue">
				<Link href={getArticleHref(article.id)} aria-label={article.title}>
					{article.title}
					<span className="absolute rounded-[20px] block top-0 left-0 w-full h-full"></span>
				</Link>
			</h3>

			<p className="text-brand-gray font-helvetica text-[15px] font-normal leading-normal mb-6 line-clamp-2">
				{article.description}
			</p>

			<div className="aspect-326/149 lg:aspect-273/125 rounded-2xl overflow-hidden mt-auto">
				<SafeImage
					src={article.image}
					alt={article.title}
					width={273}
					height={125}
					className="w-full object-cover"
				/>
			</div>
		</article>
	)
}
