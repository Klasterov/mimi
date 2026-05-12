"use client"
import { useEffect, useRef, useState } from "react"
import { BtnArrowIcon } from "@/icons/BtnArrowIcon"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const slides = [
	{ image: '/images/solutions-page/improvement/1.jpg', title: 'Вашу квартиру.', subtitle: 'Поможем улучшить' },
	{ image: '/images/solutions-page/improvement/2.jpg', title: 'Ваш дом.', subtitle: 'Поможем улучшить' },
	{ image: '/images/solutions-page/improvement/3.jpg', title: 'Ваш офис.', subtitle: 'Поможем улучшить' },
	{ image: '/images/solutions-page/improvement/4.jpg', title: 'Жилой комплекс.', subtitle: 'Поможем улучшить' },
]

export default function Improvement() {
	const sectionRef = useRef<HTMLElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)
	const bgRefs = useRef<HTMLImageElement[]>([])
	const activeIndex = useRef(0)

	useEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top top",
					end: "+=300%",
					pin: true,
					scrub: 1,
				}
			})

			slides.forEach((slide, index) => {
				if (index === 0) return

				tl.to(contentRef.current, {
					y: -50,
					opacity: 0,
					duration: 0.6,
					ease: "power2.out"
				})

					.call(() => {
						const nextIndex = index % 2
						const currentIndex = activeIndex.current % 2

						const nextBg = bgRefs.current[nextIndex]
						const currentBg = bgRefs.current[currentIndex]

						if (!nextBg || !currentBg) return

						nextBg.src = slide.image

						gsap.set(nextBg, {
							opacity: 0,
							scale: 1.05,
						})

						gsap.to(currentBg, {
							opacity: 0,
							duration: 0.8,
							ease: "power2.out"
						})

						gsap.to(nextBg, {
							opacity: 1,
							scale: 1,
							duration: 1.2,
							ease: "power2.out"
						})

						activeIndex.current = index

						const title = contentRef.current?.querySelector('.slide-title')
						const subtitle = contentRef.current?.querySelector('.slide-subtitle')
						if (title) title.textContent = slide.title
						if (subtitle) subtitle.textContent = slide.subtitle
					})

					.set(contentRef.current, { y: 80 })

					.to(contentRef.current, {
						y: 0,
						opacity: 1,
						duration: 0.6,
						ease: "power2.out"
					})
			})

		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="py-22.5 relative min-h-screen flex overflow-hidden">

			{/* Background layers */}
			<div className="absolute inset-0">
				{[0, 1].map((_, i) => (
					<img
						key={i}
						ref={el => { if (el) bgRefs.current[i] = el }}
						src={slides[0].image}
						className="absolute inset-0 w-full h-full object-cover"
						style={{ opacity: i === 0 ? 1 : 0 }}
						alt=""
					/>
				))}
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
			</div>

			<div className="max-w-308 mx-auto px-4 relative w-full flex flex-col h-full">
				<div ref={contentRef} className="flex flex-col items-center text-center text-white h-full">
					<div className="font-bold flex-auto">
						<div className="slide-subtitle text-[20px] md:text-[22px] lg:text-[24px] mb-2 lg:mb-4">
							{slides[0].subtitle}
						</div>
						<div className="slide-title text-[40px] md:text-[52px] lg:text-[64px]">
							{slides[0].title}
						</div>
					</div>

					<button className="min-w-62.25 shadow-[inset_-3px_-3px_6px_1px_rgba(255,255,255,0.5),inset_3px_3px_6px_0_#eaeaea] cursor-pointer rounded-[50px] leading-none flex px-11 py-2 items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#d1d1d1] tracking-[-0.02em] text-[#5a250a] group">
						Подробнее
						<BtnArrowIcon className="group-hover:translate-x-1 transition-transform duration-300 w-6 h-6" />
					</button>
				</div>
			</div>
		</section>
	)
}