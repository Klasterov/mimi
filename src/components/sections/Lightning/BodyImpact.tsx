"use client"

import { Title } from "@/components/UI/Title"
import { BodyImpactList } from "@/data/lightning"
import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function BodyImpact() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const titleRef = useRef<HTMLDivElement | null>(null)
	const cardsRef = useRef<(HTMLLIElement | null)[]>([])

	useEffect(() => {
		if (!sectionRef.current) return

		const ctx = gsap.context(() => {
			const cards = cardsRef.current.filter(Boolean) as HTMLLIElement[]

			gsap.set(titleRef.current, {
				y: 36,
				opacity: 0,
				filter: "blur(8px)",
				force3D: true,
			})

			gsap.set(cards, {
				y: 26,
				opacity: 0,
				scale: 0.985,
				filter: "blur(8px)",
				force3D: true,
			})

			gsap.to(titleRef.current, {
				y: 0,
				opacity: 1,
				filter: "blur(0px)",
				duration: 0.9,
				ease: "power2.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 82%",
					end: "top 68%",
					scrub: 0.8,
				},
			})

			gsap.to(cards, {
				y: 0,
				opacity: 1,
				scale: 1,
				filter: "blur(0px)",
				duration: 0.45,
				ease: "power2.out",
				stagger: {
					each: 0.06,
					from: "start",
				},
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
		<section ref={sectionRef} className="pb-22.5 lg:pt-15 pt-11.25 overflow-hidden">
			<div className="max-w-308 mx-auto px-4">
				<div ref={titleRef} className="will-change-transform">
					<Title className="mb-10">Влияние на организм</Title>
				</div>

				<ul className="grid lg:grid-cols-3 grid-cols-2 gap-3 md:gap-4 lg:gap-5">
					{BodyImpactList.map((item, index) => (
						<li
							key={item.id}
							ref={el => {
								cardsRef.current[index] = el
							}}
							className="bg-white opacity-0 rounded-[20px] px-4 py-8.5 flex flex-col items-center justify-center text-center gap-5 will-change-transform"
						>
							<div className="relative w-13.5 h-13.5 lg:w-16 lg:h-16">
								<Image
									src={item.icon}
									alt=""
									fill
								/>
							</div>
							<p className="font-semibold font-helvetica text-[16px] md:text-[18px] lg:text-[20px] -tracking-[0.01em]">
								{item.text}
							</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}