'use client'

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

import { useEffect, useMemo, useRef, useState } from "react"

// import { routes } from "@/config/routes"
import Image from "next/image"

import { LikeIcon } from "@/icons/LikeIcon"
import { TgIcon } from "@/icons/socials/TgIcon"
import { YoutubeIcon } from "@/icons/socials/YoutubeIcon"
import { VkIcon } from "@/icons/socials/VkIcon"
import { DzenIcon } from "@/icons/socials/DzenIcon"
import Articles from "@/components/sections/Articles"
import type { Article } from "@/types/article"


type SectionItem = {
	id: string
	title: string
}

const articleSections: SectionItem[] = [
	{ id: "thinking", title: "Язык = мышление" },
	{ id: "wealth", title: "Русский язык — это богатство" },
	{ id: "poor-speech", title: "Чем опасна бедная речь?" },
	{ id: "idioms", title: "Фразеологизмы" },
	{ id: "style", title: "Язык — это стиль" },
]

interface ArticlePageClientProps {
	allArticles: Article[]
}

export function ArticlePageClient({ allArticles }: ArticlePageClientProps) {
	const [liked, setLiked] = useState(false)
	const [count, setCount] = useState(0)

	const handleClick = () => {
		setLiked(prev => !prev)
		setCount(prev => prev + (liked ? -1 : 1))
	}

	const [activeSection, setActiveSection] = useState(0)

	const sectionRefs = useRef<(HTMLElement | null)[]>([])

	const setSectionRef = (index: number) => (el: HTMLElement | null) => {
		sectionRefs.current[index] = el
	}

	useEffect(() => {
		const sections = sectionRefs.current.filter(Boolean) as HTMLElement[]
		if (!sections.length) return

		const observer = new IntersectionObserver(
			entries => {
				const visibleEntries = entries
					.filter(entry => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)

				if (!visibleEntries.length) return

				const currentId = visibleEntries[0].target.id
				const currentIndex = articleSections.findIndex(item => item.id === currentId)

				if (currentIndex !== -1) {
					setActiveSection(currentIndex)
				}
			},
			{
				root: null,
				rootMargin: "-20% 0px -55% 0px",
				threshold: [0.2, 0.35, 0.5, 0.7],
			}
		)

		sections.forEach(section => observer.observe(section))

		return () => observer.disconnect()
	}, [])

	const scrollToSection = (id: string) => {
		const el = document.getElementById(id)
		if (!el) return

		el.scrollIntoView({
			behavior: "smooth",
			block: "start",
		})
	}

	return (
		<>
			<Header />

			<main>
				<div className="relative aspect-390/108 md:aspect-1440/400">
					<Image
						src="/images/article/top.jpg"
						quality={95}
						fill
						className="object-cover"
						alt=""
					/>
				</div>

				<section className="pt-4 md:pt-10 lg:pt-22.5 text-black">
					<div className="max-w-264 px-4 mx-auto relative">
						<div className="max-xl:hidden absolute -left-20 top-0 h-full">
							<div className="sticky top-30 w-5 space-y-2.5">
								{articleSections.map((item, index) => (
									<button
										key={item.id}
										type="button"
										onClick={() => scrollToSection(item.id)}
										aria-label={item.title}
										className="block w-full cursor-pointer"
									>
										<div
											className={`h-0.5 w-full transition-colors duration-300 ${index <= activeSection ? "bg-black" : "bg-[#d9d9d9]"
												}`}
										/>
									</button>
								))}
							</div>
						</div>

						{/* HEADER */}
						<div className="mb-10">
							<h1 className="text-[22px] md:text-[34px] lg:text-[44px] font-semibold mb-4">
								Быть умным — модно. Почему русский язык — это роскошь, которую мы теряем
							</h1>

							<div className="mb-4 text-[12px] md:text-[13px]">
								20 июля 2025 | читать 5 минут
							</div>

							<div className="flex gap-4">
								<a
									href=""
									target="_blank"
									className="w-4.5 h-4.5 block duration-300 transition-transform ease-in-out hover:scale-125"
								>
									<TgIcon className="w-4.5 h-4.5 transition duration-300 text-blue/40" />
								</a>
								<a
									href=""
									target="_blank"
									className="w-4.5 h-4.5 block duration-300 transition-transform ease-in-out hover:scale-125"
									>
									<YoutubeIcon className="w-4.5 h-4.5 transition duration-300 text-black" />
								</a>
								<a
									href=""
									target="_blank"
									className="w-4.5 h-4.5 block duration-300 transition-transform ease-in-out hover:scale-125"
								>
									<VkIcon className="w-4.5 h-4.5 transition duration-300 text-black" />
								</a>
							</div>
						</div>
					</div>
				</section>

				<Articles
					title="Другие статьи"
					mobileView="stack"
					articles={allArticles}
				/>
			</main>

			<Footer />
		</>
	)
}
