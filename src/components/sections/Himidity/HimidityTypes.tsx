"use client"

import { Title } from "@/components/UI/Title"
import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const cols = [
	{
		image: '/images/himidity-page/types/1.jpg',
		cap: 'Центральное.',
	},
	{
		image: '/images/himidity-page/types/2.jpg',
		cap: 'Форсуночные решения.',
	},
]

export default function HimidityTypes() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const titleRef = useRef<HTMLDivElement | null>(null)
	const cardsRef = useRef<(HTMLLIElement | null)[]>([])

	useEffect(() => {
		if (!sectionRef.current) return

		const ctx = gsap.context(() => {
			const cards = cardsRef.current.filter(Boolean) as HTMLLIElement[]

			// заголовок
			gsap.set(titleRef.current, {
				y: 40,
				opacity: 0,
				filter: "blur(8px)",
			})

			// карточки (ВАЖНО: без сильного Y)
			gsap.set(cards, {
				opacity: 0,
				scale: 0.96,
				filter: "blur(10px)",
				transformOrigin: "50% 50%",
			})

			// заголовок появляется
			gsap.to(titleRef.current, {
				y: 0,
				opacity: 1,
				filter: "blur(0px)",
				duration: 0.8,
				ease: "power2.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
					end: "top 60%",
					scrub: 0.8,
				},
			})

			// карточки — быстрый Apple-каскад
			gsap.to(cards, {
				opacity: 1,
				scale: 1,
				filter: "blur(0px)",
				duration: 0.5,
				ease: "power2.out",
				stagger: 0.08,
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 70%",
					toggleActions: "play none none reverse",
				},
			})
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="py-22.5 bg-white overflow-hidden">
			<div className="max-w-308 px-4 mx-auto relative">
				<div ref={titleRef} className="will-change-transform opacity-0">
					<Title className="mb-10">Типы систем</Title>
				</div>

				<ul className="grid md:grid-cols-2 gap-5">
					{cols.map((col, i) => (
						<li
							key={i}
							ref={el => {
								cardsRef.current[i] = el
							}}
							className="relative opacity-0 rounded-[20px] overflow-hidden px-6 py-6 lg:px-15 lg:py-9.25 font-semibold text-[22px] md:text-[26px] lg:text-[32px] leading-[1.3] -tracking-[0.01em] flex items-end aspect-590/600 will-change-transform"
						>
							<Image
								src={col.image}
								fill
								alt={col.cap}
								className="object-cover"
							/>
							<h3 className="relative">{col.cap}</h3>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}