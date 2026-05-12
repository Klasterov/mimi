"use client"

import { Title } from "@/components/UI/Title"
import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function TvSelection() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const titleWrapRef = useRef<HTMLDivElement | null>(null)
	const cardsRef = useRef<(HTMLLIElement | null)[]>([])

	useEffect(() => {
		if (!sectionRef.current) return

		const ctx = gsap.context(() => {
			const cards = cardsRef.current.filter(Boolean) as HTMLLIElement[]

			if (titleWrapRef.current) {
				gsap.set(titleWrapRef.current, {
					y: 60,
					opacity: 0,
					filter: "blur(8px)",
					force3D: true,
				})
			}

			gsap.set(cards, {
				y: 80,
				opacity: 0,
				scale: 0.965,
				filter: "blur(10px)",
				force3D: true,
			})

			gsap.to(titleWrapRef.current, {
				y: 0,
				opacity: 1,
				filter: "blur(0px)",
				ease: "power2.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 78%",
					end: "top 55%",
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
		<section ref={sectionRef} className="py-22.5 overflow-hidden">
			<div className="max-w-235.5 px-4 mx-auto">
				<div ref={titleWrapRef} className="will-change-transform">
					<Title className="mb-10 text-center">Подбор и&nbsp;установка</Title>
				</div>

				<ul className="grid md:grid-cols-2 gap-5">
					<li
						ref={el => {
							cardsRef.current[0] = el
						}}
						className="min-h-100 md:min-h-125 overflow-hidden relative rounded-[20px] bg-white md:col-span-2 font-semibold text-[32px] leading-[1.3] px-15 py-9.25 -tracking-[0.01em] will-change-transform"
					>
						<Image
							fill
							src="/images/tv-page/selection/1.jpg"
							alt=""
							className="object-cover"
							quality={95}
						/>
					</li>

					<li
						ref={el => {
							cardsRef.current[1] = el
						}}
						className="min-h-100 md:min-h-150 overflow-hidden relative rounded-[20px] bg-white font-semibold text-[22px] md:text-[26px] lg:text-[32px] leading-[1.3] px-6 md:px-10 lg:px-15 py-9.25 -tracking-[0.01em] flex items-end will-change-transform"
					>
						<Image
							fill
							src="/images/tv-page/selection/2.jpg"
							alt=""
							className="object-cover"
							quality={95}
						/>
						<div className="relative">
							Интеграция <br />
							со звуком.
						</div>
					</li>

					<li
						ref={el => {
							cardsRef.current[2] = el
						}}
						className="min-h-100 md:min-h-150 overflow-hidden relative rounded-[20px] bg-white font-semibold text-[22px] md:text-[26px] lg:text-[32px] leading-[1.3] px-6 md:px-10 lg:px-15 py-9.25 -tracking-[0.01em] will-change-transform"
					>
						<Image
							fill
							src="/images/tv-page/selection/3.jpg"
							alt=""
							className="object-cover"
							quality={95}
						/>
						<div className="relative">
							Точная <br />
							передача цветов.
						</div>
					</li>
				</ul>
			</div>
		</section>
	)
}