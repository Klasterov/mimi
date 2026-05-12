"use client"

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import { cases } from '@/data/cases'

import { Title } from '../UI/Title'
import { SliderNavigation } from '../UI/SliderNavigation'
import SafeImage from '../UI/SafeImage'
import { categories } from '@/data/categories'
import { RightArrowIcon } from '@/icons/RightArrowIcon'
import { getProjectHref } from '@/lib/project-links'
import type { ProjectSummary } from '@/types/project'

const UI_TEXT = {
	project: "\u041F\u0440\u043E\u0435\u043A\u0442",
	moscow: "\u041C\u043E\u0441\u043A\u0432\u0430",
	all: "\u0412\u0441\u0435",
	viewProject: "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442",
}

type Props = {
	title: string
	theme?: 'dark' | 'light'
	hasFilter?: boolean
	limit?: number
	items?: ProjectSummary[]
}

function toFallbackProjects(): ProjectSummary[] {
	return cases.map((item, index) => ({
		id: index + 1,
		slug: `project-${index + 1}`,
		title: item.title,
		description: item.description,
		image: item.image,
		imageMain: item.imageMain,
		tags: item.tags,
		objectType: UI_TEXT.project,
		area: "",
		city: UI_TEXT.moscow,
	}))
}

export default function Cases({ title, theme, hasFilter, limit, items }: Props) {
	const [activeCat, setActiveCat] = useState<string | null>(null)
	const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null)
	const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null)
	const [slidesPerView, setSlidesPerView] = useState(1)
	const sourceItems = items ?? toFallbackProjects()

	useEffect(() => {
		const updateSlidesPerView = () => {
			if (window.innerWidth >= 1024) {
				setSlidesPerView(3)
			} else if (window.innerWidth >= 768) {
				setSlidesPerView(2)
			} else {
				setSlidesPerView(1)
			}
		}

		updateSlidesPerView()
		window.addEventListener('resize', updateSlidesPerView)

		return () => window.removeEventListener('resize', updateSlidesPerView)
	}, [])

	const filteredCases = useMemo(() => {
		let result = sourceItems

		if (hasFilter && activeCat) {
			result = sourceItems.filter(item => item.tags.includes(activeCat))
		}

		if (limit) {
			result = result.slice(0, limit)
		}

		return result
	}, [activeCat, hasFilter, limit, sourceItems])

	const shouldShowNavigation = filteredCases.length > slidesPerView

	return (
		<section className={`${theme === 'dark' ? 'bg-foreground text-white' : ''} py-22.5 overflow-hidden`}>
			<div className="max-w-308 mx-auto px-4">
				{title && (
					<Title className="mb-10">{title}</Title>
				)}

				{hasFilter && (
					<div className="flex flex-wrap gap-2.5 md:gap-3 mb-10">
						<button
							onClick={() => setActiveCat(null)}
							className={`cursor-pointer py-2.5 px-4 rounded-full text-[14px] font-medium transition
								${activeCat === null
									? 'bg-brand-blue text-white'
									: `${theme === 'dark' ? 'bg-[#242634] text-white' : 'bg-white'}`
								}`}
						>
							{UI_TEXT.all}
						</button>

						{categories.map(cat => {
							const isActive = activeCat === cat.label
							const hasCases = sourceItems.some(item => item.tags.includes(cat.label))
							const IconComponent = cat.icon

							return (
								<button
									key={cat.label}
									onClick={() => hasCases && setActiveCat(cat.label)}
									className={`flex items-center gap-2.5 py-2.5 px-4 rounded-full text-[14px] font-medium transition
										${isActive
											? 'bg-brand-blue text-white'
											: hasCases
												? `${theme === 'dark' ? 'bg-[#242634] text-white' : 'bg-white'} cursor-pointer hover:opacity-80 transition-opacity duration-200`
												: 'bg-transparent text-brand-gray'
										}`}
								>
									<IconComponent className="w-4.5 h-4.5" />
									{cat.label}
								</button>
							)
						})}
					</div>
				)}

				<Swiper
					modules={[Navigation]}
					spaceBetween={60}
					slidesPerView={1}
					navigation={shouldShowNavigation ? { prevEl, nextEl } : false}
					className="overflow-visible!"
					breakpoints={{
						768: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}}
				>
					{filteredCases.map((item, index) => {
						const visibleTags = item.tags.slice(0, 2)
						const restCount = item.tags.length - visibleTags.length

						return (
							<SwiperSlide key={`${item.slug}-${index}`}>
								<div className="relative aspect-360/290 mb-5 lg:mb-7.5 overflow-hidden rounded-xl">
									<SafeImage
										src={item.image}
										alt={item.title}
										fill
										className="object-cover"
									/>
								</div>

								{index === 0 ? (
									<div
										className="relative mb-6 lg:mb-7 min-h-14 lg:min-h-15.5"
										style={{
											width: `calc(${filteredCases.length * 100}% + ${(filteredCases.length - 1) * 60}px)`
										}}
									>
										<div className={`${theme === 'dark' ? 'pattern-bg-dark' : 'pattern-bg'} absolute top-0 left-0 w-full h-[29%] lg:h-[35%]`}></div>
										<div className={`${theme === 'dark' ? 'from-[#0F1014] via-[#131519] via-[53.37%] to-[rgba(16,16,16,0)]' : 'from-[#d0d0d0] via-[#d7d7d7] to-transparent'} absolute bottom-0 left-0 w-full h-[71%] lg:h-[65%] bg-linear-to-b`}>
											<span className={`${theme === 'dark' ? 'bg-foreground' : 'bg-background'} absolute top-0 left-0 w-37.5 h-full [clip-path:polygon(0_0,100%_100%,0_100%)]`}></span>
											<span className={`${theme === 'dark' ? 'bg-foreground' : 'bg-background'} absolute top-0 -right-px w-37.5 h-full [clip-path:polygon(100%_0,0_100%,100%_100%)]`}></span>
										</div>
									</div>
								) : (
									<div className="mb-6 lg:mb-7 min-h-14 lg:min-h-15.5" />
								)}

								<div className="flex flex-wrap items-center gap-2 mb-2 text-[13px]">
									{visibleTags.map((tag, i) => (
										<span
											key={`${tag}-${i}`}
											className={`${theme === 'dark' ? 'bg-[#1b1b1b] text-[#afe7ff]' : 'bg-white text-brand-gray'} py-1.5 px-3 rounded-full`}
										>
											{tag}
										</span>
									))}

									{restCount > 0 && (
										<span className="text-[#a7b3b7] p-1.5">
											+{restCount}
										</span>
									)}
								</div>

								<h3 className={`${theme === 'dark' ? 'text-white' : ''} text-[17px] tracking-[-0.01em] mb-2 font-medium leading-tight`}>
									{item.title}
								</h3>

								<p className="text-brand-gray font-helvetica text-[15px] mb-2 tracking-[-0.01em] leading-tight line-clamp-2">
									{item.description}
								</p>

								<Link
									href={getProjectHref(item.slug)}
									className="text-brand-blue inline-flex items-center gap-1 leading-tight group"
								>
									<span className="text-[15px]">{UI_TEXT.viewProject}</span>
									<RightArrowIcon className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
								</Link>
							</SwiperSlide>
						)
					})}
				</Swiper>

				{shouldShowNavigation && (
					<SliderNavigation className="justify-end mt-10" setPrev={setPrevEl} setNext={setNextEl} />
				)}
			</div>
		</section>
	)
}
