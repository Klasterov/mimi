"use client"

import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"

import { Title } from "../UI/Title"
import { SliderNavigation } from "../UI/SliderNavigation"
import { RightArrowIcon } from "@/icons/RightArrowIcon"
import { ArticleCard } from "../UI/ArticleCard"
import type { Article } from "@/types/article"

function MoreSlide({ className }: { className?: string }) {
	return (
		<a
			href="#"
			className={`py-3 border-2 text-[#4a5df9] transition hover:text-foreground duration-300 border-[#4a5df9] hover:border-foreground rounded-[20px] flex items-center justify-center gap-2.5 ${className ?? ""}`}
		>
			<span className="text-[14px]">Больше новостей</span>
			<RightArrowIcon className="w-6 h-6" />
		</a>
	)
}

type Props = {
	title: string
	mobileView?: "slider" | "stack"
	articles: Article[]
}

export default function Articles({
	title,
	mobileView = "slider",
	articles,
}: Props) {
	const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null)
	const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null)

	if (articles.length === 0) {
		return null
	}

	const visibleArticles = articles.slice(0, 3)

	return (
		<section className="py-10 md:py-16 lg:py-22.5 overflow-hidden">
			<div className="max-w-308 mx-auto px-4">
				<Title className="mb-10">{title}</Title>

				{/* Desktop */}
				<div className="hidden lg:flex gap-5 items-stretch">
					{visibleArticles.map(article => (
						<div key={article.id} className="flex flex-1 self-stretch">
							<ArticleCard article={article} className="flex-1" />
						</div>
					))}

					<div className="flex self-stretch w-50 shrink-0">
						<MoreSlide className="flex-1" />
					</div>
				</div>

				{/* Mobile / Tablet: Slider */}
				{mobileView === "slider" && (
					<div className="lg:hidden">
						<Swiper
							spaceBetween={20}
							slidesPerView={1}
							modules={[Navigation]}
							navigation={{
								prevEl,
								nextEl,
							}}
							className="overflow-visible!"
							breakpoints={{
								768: {
									slidesPerView: 2,
								},
							}}
						>
							{visibleArticles.map(article => (
								<SwiperSlide key={article.id} className="h-auto">
									<ArticleCard article={article} className="h-full" />
								</SwiperSlide>
							))}

							<SwiperSlide className="h-auto">
								<MoreSlide className="h-full" />
							</SwiperSlide>
						</Swiper>

						<SliderNavigation
							className="justify-end mt-10"
							setPrev={setPrevEl}
							setNext={setNextEl}
						/>
					</div>
				)}

				{/* Mobile / Tablet: Stack */}
				{mobileView === "stack" && (
					<div className="lg:hidden">
						<div className="flex flex-col gap-5">
							{visibleArticles.map(article => (
								<ArticleCard key={article.id} article={article} />
							))}
						</div>

						<MoreSlide className={`${mobileView === "stack" ? '' : 'max-lg:min-h-93.75'} mt-5 `} />
					</div>
				)}
			</div>
		</section>
	)
}
