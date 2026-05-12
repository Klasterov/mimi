"use client"

import { Title } from "@/components/UI/Title"
import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function PowerSupplyArchit() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const headingRef = useRef<HTMLDivElement | null>(null)
	const cardsRef = useRef<(HTMLLIElement | null)[]>([])

	useEffect(() => {
		if (!sectionRef.current) return

		const ctx = gsap.context(() => {
			const cards = cardsRef.current.filter(Boolean) as HTMLLIElement[]

			gsap.set(headingRef.current, {
				y: 60,
				opacity: 0,
				filter: "blur(8px)",
				force3D: true,
			})

			gsap.set(cards, {
				y: 80,
				opacity: 0,
				scale: 0.965,
				filter: "blur(10px)",
				force3D: true,
			})

			gsap.to(headingRef.current, {
				y: 0,
				opacity: 1,
				filter: "blur(0px)",
				ease: "power2.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 78%",
					end: "top 52%",
					scrub: 1,
				},
			})

			cards.forEach((card, index) => {
				gsap.to(card, {
					y: 0,
					opacity: 1,
					scale: 1,
					filter: "blur(0px)",
					ease: "power2.out",
					scrollTrigger: {
						trigger: card,
						start: "top 88%",
						end: "top 55%",
						scrub: 1,
					},
					delay: index * 0.04,
				})
			})
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="pt-22.5 pb-30 overflow-hidden">
			<div className="max-w-235.5 px-4 mx-auto">
				<div ref={headingRef} className="will-change-transform">
					<Title className="text-center mb-15">Архитектурные решения</Title>
				</div>

				<ul className="grid md:grid-cols-2 gap-5">
					<li
						ref={el => {
							cardsRef.current[0] = el
						}}
						className="bg-white rounded-[20px] max-md:justify-between px-6 max-md:pt-6 lg:px-5 min-h-125 md:gap-10 md:col-span-2 overflow-hidden flex max-md:flex-col-reverse items-center will-change-transform"
					>
						<div className="max-md:-mr-[19%] relative md:grow-0 md:shrink-0 md:basis-138.75 w-[90%] md:w-auto aspect-1110/1000">
							<Image
								src="/images/power-supply-page/archit/1.png"
								fill
								alt=""
								className="object-cover"
							/>
						</div>
						<div className="font-semibold max-md:self-stretch text-[24px] md:text-[28px] lg:text-[32px] leading-loose -tracking-[0.01em] bg-linear-to-b from-foreground to-[rgba(81,96,118,0)] bg-clip-text text-transparent md:-ml-10">
							<p>ИБП</p>
							<p>Аккумуляторы</p>
							<p>Щиты.</p>
						</div>
					</li>

					<li
						ref={el => {
							cardsRef.current[1] = el
						}}
						className="bg-white relative rounded-[20px] px-6 lg:px-15 py-6 lg:py-9.25 min-h-125 md:min-h-150 flex overflow-hidden md:items-end font-semibold text-[22px] md:text-[26px] lg:text-[32px] leading-[1.3] -tracking-[0.01em] will-change-transform"
					>
						<Image
							src="/images/power-supply-page/archit/2.jpg"
							fill
							alt=""
							className="object-cover"
						/>
						<div className="relative">Выделенные линии.</div>
					</li>

					<li
						ref={el => {
							cardsRef.current[2] = el
						}}
						className="bg-white relative rounded-[20px] px-6 lg:px-15 pt-6 lg:py-9.25 min-h-125 md:min-h-150 overflow-hidden font-semibold text-[22px] md:text-[26px] lg:text-[32px] leading-[1.3] -tracking-[0.01em] will-change-transform"
					>
						<Image
							src="/images/power-supply-page/archit/3.jpg"
							fill
							alt=""
							className="object-cover"
						/>
						<div className="relative">Время автономии.</div>
					</li>
				</ul>
			</div>
		</section>
	)
}