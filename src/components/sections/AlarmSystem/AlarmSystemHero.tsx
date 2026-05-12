"use client"

import { Title } from "@/components/UI/Title"
import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function AlarmSystemHero() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const mediaWrapRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!sectionRef.current || !mediaWrapRef.current) return

		const ctx = gsap.context(() => {
			gsap.fromTo(
				mediaWrapRef.current,
				{
					scale: 1,
					borderRadius: "0px",
				},
				{
					scale: 0.86,
					borderRadius: "24px",
					ease: "none",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top top",
						end: "+=500",
						scrub: true,
					},
				}
			)
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section
			ref={sectionRef}
			className="pt-6 md:pt-10 lg:py-15 pb-15 lg:pb-22.5"
		>
			<div className="max-w-308 mb-10 lg:mb-15 px-4 mx-auto flex flex-wrap gap-10 justify-between items-center">
				<Title>Сигнализация</Title>
				<Image
					width={73}
					height={63}
					alt=""
					quality={95}
					src="/images/alarm-system-page/hero-decor.png"
					className="max-md:hidden"
				/>
			</div>

			<div className="px-4 md:px-6 lg:px-8">
				<div
					ref={mediaWrapRef}
					className="relative max-w-400 mx-auto overflow-hidden aspect-390/500 md:aspect-1440/902 will-change-transform"
					style={{ transformOrigin: "center center" }}
				>
					<Image
						fill
						quality={95}
						src="/images/alarm-system-page/hero.jpg"
						alt=""
						className="object-cover"
					/>
				</div>
			</div>
		</section>
	)
}