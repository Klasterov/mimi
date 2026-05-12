'use client'

import { useState, useMemo, useRef, useLayoutEffect } from 'react'
import Link from 'next/link'
import 'swiper/css'
import { categories } from '@/data/categories'
import { RightArrowIcon } from '@/icons/RightArrowIcon'
import { Title } from '@/components/UI/Title'
import SafeImage from '@/components/UI/SafeImage'
import { getProjectHref } from '@/lib/project-links'
import type { ProjectSummary } from '@/types/project'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const UI_TEXT = {
	projects: "\u041F\u0440\u043E\u0435\u043A\u0442\u044B",
	all: "\u0412\u0441\u0435",
	viewProject: "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442",
}

type PortfolioProps = {
	projects: ProjectSummary[]
}

export default function Portfolio({ projects }: PortfolioProps) {
	const categoriesMap = useMemo(
		() => Object.fromEntries(categories.map(cat => [cat.label, cat.icon])),
		[]
	)
	const [activeCat, setActiveCat] = useState<string | null>(null)
	const filteredCases = useMemo(
		() => (activeCat ? projects.filter(item => item.tags.includes(activeCat)) : projects),
		[activeCat, projects]
	)
	const cityLabel = useMemo(() => {
		const uniqueCities = Array.from(
			new Set(
				filteredCases
					.map(project => project.city?.trim())
					.filter((city): city is string => Boolean(city))
			)
		)

		if (uniqueCities.length === 0) {
			return null
		}

		if (uniqueCities.length <= 2) {
			return uniqueCities.join(", ")
		}

		return `${uniqueCities.slice(0, 2).join(", ")} +${uniqueCities.length - 2}`
	}, [filteredCases])

	const casesRefs = useRef<(HTMLLIElement | null)[]>([])

	useLayoutEffect(() => {
		if (!casesRefs.current.length) return

		casesRefs.current.forEach(item => {
			if (!item) return
			gsap.fromTo(
				item,
				{ autoAlpha: 0, x: -50 },
				{
					autoAlpha: 1,
					x: 0,
					duration: 0.8,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: item,
						start: 'top 80%',
						toggleActions: 'play none none none',
					},
				}
			)
		})
	}, [filteredCases])

	return (
		<section className="pt-15 pb-22.5 lg:pb-30 overflow-hidden">
			<div className="max-w-348 mx-auto px-4">
				<div className="mb-10 xl:px-20 sm:flex-row flex-col flex items-start sm:justify-between sm:items-end gap-10">
					<Title>{UI_TEXT.projects}</Title>
					{cityLabel && (
						<div className='-tracking-[0.01em] flex-row-reverse sm:flex-row flex items-center gap-2 text-[15px] text-brand-blue'>
							<span>{cityLabel}</span>
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M16.6666 8.33332C16.6666 12.4942 12.0508 16.8275 10.5008 18.1658C10.3564 18.2744 10.1806 18.3331 9.99998 18.3331C9.81931 18.3331 9.64354 18.2744 9.49915 18.1658C7.94915 16.8275 3.33331 12.4942 3.33331 8.33332C3.33331 6.56521 4.03569 4.86952 5.28593 3.61928C6.53618 2.36904 8.23187 1.66666 9.99998 1.66666C11.7681 1.66666 13.4638 2.36904 14.714 3.61928C15.9643 4.86952 16.6666 6.56521 16.6666 8.33332Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</div>
					)}
				</div>
				<div className="flex flex-wrap gap-3 lg:mb-10 xl:px-20">
					<button
						onClick={() => setActiveCat(null)}
						className={`cursor-pointer py-2.5 px-4 rounded-full text-[14px] font-medium transition ${activeCat === null ? 'bg-brand-blue text-white' : 'bg-[#fcfdff]'
							}`}
					>
						{UI_TEXT.all}
					</button>
					{categories.map(cat => {
						const isActive = activeCat === cat.label
						const hasCases = projects.some(item =>
							item.tags.includes(cat.label)
						)
						const IconComponent = cat.icon

						return (
							<button
								key={cat.label}
								onClick={() => hasCases && setActiveCat(cat.label)}
								className={`flex items-center gap-2.5 py-2.5 px-4 rounded-full text-[14px] font-medium transition
										${isActive ? 'bg-brand-blue text-white'
										: hasCases
											? 'cursor-pointer bg-[#fcfdff] text-foreground hover:opacity-80 transition-opacity duration-200'
											: 'bg-transparent text-brand-gray'
									}
									 `}
							>
								<IconComponent className="w-4.5 h-4.5" />
								{cat.label}
							</button>
						)
					})}
				</div>

				<ul>
					{filteredCases.map((item, index) => (
						<li
							ref={el => {
								casesRefs.current[index] = el
							}}
							key={`${item.slug}-${index}`}
							className="py-10 border-b gap-4 lg:gap-20 border-[#d9d9d9] flex flex-col-reverse lg:flex-row lg:items-end xl:pl-20"
						>
							<div className="lg:basis-106.5">
								<div className="mb-4 md:mb-5 flex flex-wrap gap-2">
									{item.tags.map((tag, i) => {
										const Icon = categoriesMap[tag]

										return (
											<div
												key={`${tag}-${i}`}
												className="py-1 md:py-1.5 border border-[#d9d9d9] rounded-[50px] px-3 font-medium flex items-center gap-2.5 text-[13px] text-brand-gray tracking-[-0.02em]"
											>
												{Icon && <Icon className="w-4 h-4" />}
												<span>{tag}</span>
											</div>
										)
									})}
								</div>

								<h3 className="text-[18px] md:text-[20px] tracking-[-0.01em] mb-3 font-medium leading-tight">
									{item.title}
								</h3>
								<p className="font-helvetica text-brand-gray text-[15px] md:text-[16px] mb-3 tracking-[-0.01em] leading-snug">
									{item.description}
								</p>
								<Link href={getProjectHref(item.slug)} className="text-brand-blue inline-flex items-center gap-1 leading-tight">
									<span className="text-[15px]">{UI_TEXT.viewProject}</span>
									<RightArrowIcon className="w-6 h-6" />
								</Link>
							</div>

							<div className="relative rounded-xl overflow-hidden flex-auto aspect-774/430">
								<SafeImage quality={95} src={item.imageMain} alt={item.title} fill className="object-cover" />
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
