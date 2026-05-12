'use client'

import { useLayoutEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function PartnersHero() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const pinRef = useRef<HTMLDivElement | null>(null)
	const contentRef = useRef<HTMLDivElement | null>(null)

	useLayoutEffect(() => {
		if (!sectionRef.current || !pinRef.current || !contentRef.current) return

		const ctx = gsap.context(() => {
			const content = contentRef.current
			if (!content) return

			const getShift = () => {
				const rect = content.getBoundingClientRect()
				return rect.height
			}

			const getEnd = () => {
				const contentHeight = content.offsetHeight
				const extraHold = window.innerHeight * 0.45
				return `+=${contentHeight + extraHold}`
			}

			gsap.to(content, {
				y: () => -getShift(),
				ease: "none",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top top",
					end: getEnd,
					scrub: true,
					pin: pinRef.current,
					anticipatePin: 1,
					invalidateOnRefresh: true,
				},
			})
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="relative">
			<div ref={pinRef} className="relative h-screen overflow-hidden">
				<Image
					src="/images/partners-page/hero-bg.jpg"
					fill
					alt=""
					quality={96}
					priority
					sizes="100vw"
					className="object-cover"
				/>

				<div
					ref={contentRef}
					className="relative z-10 min-h-screen flex flex-col will-change-transform"
				>
					<div className="flex-auto max-w-308 w-full flex items-end px-4 mx-auto">
						<h1 className="py-5 lg:py-8 font-bold text-[40px] md:text-[52px] lg:text-[64px] leading-[1.1] text-white">
							Сотрудничество.
						</h1>
					</div>

					<div className="font-bold text-[40px] md:text-[52px] lg:text-[64px] xl:text-[84px] leading-[1.2]">
						<div className="bg-white border-b border-black/10 py-6 lg:py-4">
							<div className="max-w-308 px-4 mx-auto">
								<h2
									className="text-transparent bg-clip-text bg-cover bg-center"
									style={{
										backgroundImage: "url('/images/partners-page/hero-bg.jpg')"
									}}
								>
									Дилерам.
								</h2>
							</div>
						</div>

						<div className="bg-white border-b border-black/10 py-6 lg:py-4">
							<div className="max-w-308 px-4 mx-auto md:flex md:justify-center">
								<h2
									className="text-transparent bg-clip-text bg-cover bg-center"
									style={{
										backgroundImage: "url('/images/partners-page/hero-bg.jpg')"
									}}
								>
									Дизайнерам.
								</h2>
							</div>
						</div>

						<div className="bg-white border-b border-black/10 py-6 lg:py-4">
							<div className="max-w-308 px-4 mx-auto md:flex md:justify-end">
								<h2
									className="text-transparent bg-clip-text bg-cover bg-center"
									style={{
										backgroundImage: "url('/images/partners-page/hero-bg.jpg')"
									}}
								>
									Агентствам.
								</h2>
							</div>
						</div>
					</div>
				</div>

				<div className="pointer-events-none absolute inset-0 bg-black/10" />
			</div>
		</section>
	)
}