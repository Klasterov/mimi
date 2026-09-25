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
	city: "\u0413\u043E\u0440\u043E\u0434",
	advancedSearch: "\u0420\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u044B\u0439 \u043F\u043E\u0438\u0441\u043A",
	objectType: "\u0422\u0438\u043F \u043E\u0431\u044A\u0435\u043A\u0442\u0430",
	allTypes: "\u0412\u0441\u0435 \u0442\u0438\u043F\u044B",
	area: "\u041F\u043B\u043E\u0449\u0430\u0434\u044C, \u043C\u00B2",
	from: "\u041E\u0442",
	to: "\u0414\u043E",
	housingClass: "\u041A\u043B\u0430\u0441\u0441 \u0436\u0438\u043B\u044C\u044F",
	anyClass: "\u041B\u044E\u0431\u043E\u0439 \u043A\u043B\u0430\u0441\u0441",
	showProjects: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442\u044B",
	resetFilters: "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440\u044B",
	smartHomeSystems: "\u0421\u0438\u0441\u0442\u0435\u043C\u044B \u0443\u043C\u043D\u043E\u0433\u043E \u0434\u043E\u043C\u0430",
}

// TODO: replace with the real object-type / housing-class taxonomy once it's
// available on ProjectSummary — these are placeholders that mirror the screenshot.
const OBJECT_TYPES = ["\u041A\u0432\u0430\u0440\u0442\u0438\u0440\u0430", "\u0414\u043E\u043C", "\u0410\u043F\u0430\u0440\u0442\u0430\u043C\u0435\u043D\u0442\u044B", "\u041E\u0444\u0438\u0441"]
const HOUSING_CLASSES = ["\u042D\u043A\u043E\u043D\u043E\u043C", "\u041A\u043E\u043C\u0444\u043E\u0440\u0442", "\u0411\u0438\u0437\u043D\u0435\u0441", "\u041F\u0440\u0435\u043C\u0438\u0443\u043C"]

type PortfolioProps = {
	projects: ProjectSummary[]
}

function ChevronDownIcon({ className }: { className?: string }) {
	return (
		<svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}

function PinIcon({ className }: { className?: string }) {
	return (
		<svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M16.6666 8.33332C16.6666 12.4942 12.0508 16.8275 10.5008 18.1658C10.3564 18.2744 10.1806 18.3331 9.99998 18.3331C9.81931 18.3331 9.64354 18.2744 9.49915 18.1658C7.94915 16.8275 3.33331 12.4942 3.33331 8.33332C3.33331 6.56521 4.03569 4.86952 5.28593 3.61928C6.53618 2.36904 8.23187 1.66666 9.99998 1.66666C11.7681 1.66666 13.4638 2.36904 14.714 3.61928C15.9643 4.86952 16.6666 6.56521 16.6666 8.33332Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}

function SlidersIcon({ className }: { className?: string }) {
	return (
		<svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M2.25 5.25H11.25M15.75 5.25H14.25M6.75 12.75H15.75M2.25 12.75H3.75M9 3V7.5M11.25 3V5.25M6.75 10.5V15M6.75 10.5V12.75" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}

export default function Portfolio({ projects }: PortfolioProps) {
	const categoriesMap = useMemo(
		() => Object.fromEntries(categories.map(cat => [cat.label, cat.icon])),
		[]
	)

	// Filter state
	const [showAdvanced, setShowAdvanced] = useState(false)
	const [selectedCity, setSelectedCity] = useState<string | null>(null)
	const [objectType, setObjectType] = useState<string | null>(null)
	const [areaFrom, setAreaFrom] = useState('')
	const [areaTo, setAreaTo] = useState('')
	const [housingClass, setHousingClass] = useState<string | null>(null)
	const [activeSystems, setActiveSystems] = useState<string[]>([])

	const cityOptions = useMemo(
		() =>
			Array.from(
				new Set(
					projects
						.map(project => project.city?.trim())
						.filter((city): city is string => Boolean(city))
				)
			),
		[projects]
	)

	const toggleSystem = (label: string) => {
		if (label === UI_TEXT.all) {
			setActiveSystems([])
			return
		}
		setActiveSystems(prev =>
			prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
		)
	}

	const resetFilters = () => {
		setSelectedCity(null)
		setObjectType(null)
		setAreaFrom('')
		setAreaTo('')
		setHousingClass(null)
		setActiveSystems([])
	}

	const filteredCases = useMemo(() => {
		return projects.filter(item => {
			if (selectedCity && item.city !== selectedCity) return false
			if (activeSystems.length && !activeSystems.some(sys => item.tags.includes(sys))) return false

			// The fields below aren't on ProjectSummary yet; filters are inert until
			// the data includes them (kept optional so nothing breaks in the meantime).
			const area = (item as unknown as { area?: number }).area
			if (areaFrom && typeof area === 'number' && area < Number(areaFrom)) return false
			if (areaTo && typeof area === 'number' && area > Number(areaTo)) return false

			const type = (item as unknown as { objectType?: string }).objectType
			if (objectType && type && type !== objectType) return false

			const cls = (item as unknown as { housingClass?: string }).housingClass
			if (housingClass && cls && cls !== housingClass) return false

			return true
		})
	}, [projects, selectedCity, activeSystems, areaFrom, areaTo, objectType, housingClass])

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
				<div className="mb-10 xl:px-20">
					<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
						<Title>{UI_TEXT.projects}</Title>

						{showAdvanced ? (
							<button
								onClick={() => setSelectedCity(null)}
								className="flex items-center gap-1.5 text-[15px] text-brand-blue"
							>
								<span>{selectedCity ?? cityOptions[0] ?? UI_TEXT.city}</span>
								<PinIcon className="w-4.5 h-4.5" />
							</button>
						) : (
							cityLabel && (
								<div className="-tracking-[0.01em] flex-row-reverse sm:flex-row flex items-center gap-2 text-[15px] text-brand-blue">
									<span>{cityLabel}</span>
									<PinIcon className="w-5 h-5" />
								</div>
							)
						)}
					</div>

					{!showAdvanced ? (
						<div className="mt-6 flex flex-wrap items-center gap-3">
							<div className="flex flex-col gap-1.5">
								<span className="text-[13px] text-brand-gray">{UI_TEXT.city}</span>
								<div className="relative">
									<select
										value={selectedCity ?? ''}
										onChange={e => setSelectedCity(e.target.value || null)}
										className="appearance-none cursor-pointer bg-[#fcfdff] border border-[#d9d9d9] rounded-full py-2.5 pl-4 pr-10 text-[14px] font-medium min-w-45"
									>
										<option value="">{cityOptions[0] ?? UI_TEXT.city}</option>
										{cityOptions.map(city => (
											<option key={city} value={city}>{city}</option>
										))}
									</select>
									<PinIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-brand-blue" />
									<ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
								</div>
							</div>

							<button
								onClick={() => setShowAdvanced(true)}
								className="self-end cursor-pointer flex items-center gap-2 border border-brand-blue text-brand-blue rounded-full py-2.5 px-4 text-[14px] font-medium hover:opacity-80 transition-opacity"
							>
								<SlidersIcon className="w-4.5 h-4.5" />
								<span>{UI_TEXT.advancedSearch}</span>
								<ChevronDownIcon />
							</button>
						</div>
					) : (
						<div className="mt-6">
							<div className="flex flex-wrap items-end gap-3">
								<div className="flex-auto flex flex-col gap-1.5">
									<span className="text-[13px] text-brand-gray">{UI_TEXT.objectType}</span>
									<div className="relative">
										<select
											value={objectType ?? ''}
											onChange={e => setObjectType(e.target.value || null)}
											className="appearance-none w-full cursor-pointer bg-[#fcfdff] border border-[#d9d9d9] rounded-full py-2.5 pl-4 pr-10 text-[14px] font-medium min-w-40"
										>
											<option value="">{UI_TEXT.allTypes}</option>
											{OBJECT_TYPES.map(type => (
												<option key={type} value={type}>{type}</option>
											))}
										</select>
										<ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
									</div>
								</div>

								<div className="flex-auto flex flex-col gap-1.5">
									<span className="text-[13px] text-brand-gray">{UI_TEXT.area}</span>
									<div className="flex items-center gap-2 w-full">
										<input
											value={areaFrom}
											onChange={e => setAreaFrom(e.target.value.replace(/[^\d]/g, ''))}
											placeholder={UI_TEXT.from}
											inputMode="numeric"
											className="bg-[#fcfdff] flex-auto border border-[#d9d9d9] rounded-full py-2.5 px-4 text-[14px] w-24"
										/>
										<span className="text-brand-gray">—</span>
										<input
											value={areaTo}
											onChange={e => setAreaTo(e.target.value.replace(/[^\d]/g, ''))}
											placeholder={UI_TEXT.to}
											inputMode="numeric"
											className="bg-[#fcfdff] flex-auto border border-[#d9d9d9] rounded-full py-2.5 px-4 text-[14px] w-24"
										/>
									</div>
								</div>

								<div className="flex-auto flex flex-col gap-1.5">
									<span className="text-[13px] text-brand-gray">{UI_TEXT.housingClass}</span>
									<div className="relative">
										<select
											value={housingClass ?? ''}
											onChange={e => setHousingClass(e.target.value || null)}
											className="appearance-none w-full cursor-pointer bg-[#fcfdff] border border-[#d9d9d9] rounded-full py-2.5 pl-4 pr-10 text-[14px] font-medium min-w-40"
										>
											<option value="">{UI_TEXT.anyClass}</option>
											{HOUSING_CLASSES.map(cls => (
												<option key={cls} value={cls}>{cls}</option>
											))}
										</select>
										<ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
									</div>
								</div>

								<div className="flex flex-col items-center gap-1.5">
									<button
										onClick={() => setShowAdvanced(false)}
										className="cursor-pointer bg-brand-blue text-white rounded-full py-3 px-6 text-[14px] font-medium hover:opacity-90 transition-opacity"
									>
										{UI_TEXT.showProjects}
									</button>
									<button
										onClick={resetFilters}
										className="cursor-pointer text-[13px] text-brand-gray hover:text-brand-blue transition-colors"
									>
										{UI_TEXT.resetFilters}
									</button>
								</div>
							</div>

							<div className="mt-8">
								<span className="text-[13px] text-brand-gray">{UI_TEXT.smartHomeSystems}</span>
								<div className="mt-2.5 flex flex-wrap gap-3">
									<button
										onClick={() => toggleSystem(UI_TEXT.all)}
										className={`cursor-pointer py-2.5 px-4 rounded-full text-[14px] font-medium transition ${activeSystems.length === 0 ? 'bg-brand-blue text-white' : 'bg-[#fcfdff]'
											}`}
									>
										{UI_TEXT.all}
									</button>
									{categories.map(cat => {
										const isActive = activeSystems.includes(cat.label)
										const hasCases = projects.some(item => item.tags.includes(cat.label))
										const IconComponent = cat.icon

										return (
											<button
												key={cat.label}
												onClick={() => hasCases && toggleSystem(cat.label)}
												className={`flex items-center gap-2.5 py-2.5 px-4 rounded-full text-[14px] font-medium transition
														${isActive
														? 'bg-brand-blue text-white'
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
							</div>
						</div>
					)}
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