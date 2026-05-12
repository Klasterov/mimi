"use client"

import Image from "next/image"
import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function CinemaHomeSlogan() {
	const sectionRef = useRef<HTMLDivElement | null>(null)
	const textRef = useRef<HTMLDivElement | null>(null)

	useLayoutEffect(() => {
		if (!sectionRef.current || !textRef.current) return

		const ctx = gsap.context(() => {
			gsap.to(textRef.current, {
				y: 0,
				opacity: 1,
				duration: 1,
				ease: "power3.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
				},
			})
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<div ref={sectionRef} className="pt-22.5 pb-22.5 lg:pb-30">
			<div className="max-w-235.5 px-4 mx-auto flex flex-col items-center text-center">
				<div className="mb-10 max-md:max-w-50">
					<Image
						src="/images/cinema-home-page/slogan-decor.png"
						width={239}
						height={240}
						alt=""
					/>
				</div>

				<div className="overflow-hidden">
					<div
						ref={textRef}
						className="
							translate-y-25 opacity-0
							text-[32px] md:text-[40px] lg:text-[48px]
							leading-[1.67] font-semibold
							bg-linear-to-b from-foreground to-transparent
							bg-clip-text text-transparent
							will-change-transform
						"
					>
						Умные домашние кинотеатры представляют собой интегрированные системы, которые позволяют с легкостью управлять всеми видами оборудования в кинозале.
					</div>
				</div>
			</div>
		</div>
	)
}