'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { categories } from '@/data/categories'
import type { ProjectSection } from '@/types/project'
import SafeImage from '@/components/UI/SafeImage'

type ProjectTagsProps = {
	sections: ProjectSection[]
}

type SectionId = ProjectSection['id']

export default function ProjectTags({ sections }: ProjectTagsProps) {
	const [activeId, setActiveId] = useState<SectionId>(sections[0]?.id ?? "")
	const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})
	const categoriesMap = useMemo(
		() => Object.fromEntries(categories.map(category => [category.label, category.icon])),
		[]
	)

	const activeSection = useMemo(
		() => sections.find(section => section.id === activeId) ?? sections[0],
		[activeId, sections]
	)

	useEffect(() => {
		if (!sections.length) return

		const media = window.matchMedia('(min-width: 1024px)')

		if (!media.matches) return

		const entriesMap = new Map<string, IntersectionObserverEntry>()

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					const id = entry.target.getAttribute('data-section-id')
					if (!id) return
					entriesMap.set(id, entry)
				})

				const visibleEntries = Array.from(entriesMap.values()).filter(
					entry => entry.isIntersecting
				)

				if (!visibleEntries.length) return

				visibleEntries.sort((a, b) => {
					const aDistance = Math.abs(a.boundingClientRect.top - 140)
					const bDistance = Math.abs(b.boundingClientRect.top - 140)
					return aDistance - bDistance
				})

				const nextId = visibleEntries[0].target.getAttribute('data-section-id') as SectionId | null

				if (nextId) {
					setActiveId(nextId)
				}
			},
			{
				root: null,
				rootMargin: '-15% 0px -55% 0px',
				threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
			}
		)

		sections.forEach(section => {
			const el = sectionRefs.current[section.id]
			if (el) observer.observe(el)
		})

		return () => observer.disconnect()
	}, [sections])

	if (!activeSection) {
		return null
	}

	const ActiveIcon = categoriesMap[activeSection.tag]

	return (
		<section className="pb-22.5 pt-7.5 bg-white">
			<div className="max-w-308 mx-auto px-4 relative">
				<div className="lg:py-22.5 py-15 lg:relative lg:flex lg:items-start lg:gap-46.75 border-t border-b border-[#d9d9d9]">
					<div className="flex-none lg:w-60 lg:sticky lg:top-5">
						<div className="max-lg:hidden ">
							<div className="inline-flex rounded-[50px] py-2.5 px-4 items-center gap-2.5 bg-background -tracking-[0.01em] transition-all duration-300">
								{ActiveIcon && <ActiveIcon className="w-4.5 h-4.5 flex-none" />}
								<span className="text-[14px] font-helvetica font-medium">
									{activeSection.title}
								</span>
							</div>
						</div>

						<ul className="lg:hidden max-lg:mb-10 flex flex-wrap gap-4 -tracking-[0.01em]">
							{sections.map(section => {
								const Icon = categoriesMap[section.tag]

								return (
									<li key={section.id}>
										<a
											href={`#${section.id}`}
											className="flex rounded-[50px] py-2.5 px-4 items-center gap-2.5 transition-colors duration-300 hover:bg-background"
										>
											{Icon && <Icon className="w-4.5 h-4.5 flex-none" />}
											<span className="text-[14px] font-helvetica font-medium">
												{section.title}
											</span>
										</a>
									</li>
								)
							})}
						</ul>
					</div>

					<div className="lg:flex-auto">
						<div className="-tracking-[0.01em] space-y-15 lg:space-y-20">
							{sections.map(section => (
								<div
									key={section.id}
									id={section.id}
									data-section-id={section.id}
									ref={el => {
										sectionRefs.current[section.id] = el
									}}
									className="space-y-10 scroll-mt-28"
								>
									<h3 className="font-bold text-black text-[22px] md:text-[28px] lg:text-[32px]">
										{section.title}
									</h3>

									<SafeImage
										src={section.image}
										width={773}
										height={515}
										alt={section.title}
									/>

									<div className="space-y-[1em] max-md:text-[15px] lg:text-[17px] text-brand-gray">
										{section.text.map((paragraph, index) => (
											<p key={`${section.id}-${index}`}>{paragraph}</p>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
