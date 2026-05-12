"use client"

import { Title } from "@/components/UI/Title"
import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function PALAppearance() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const textRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger)

		const ctx = gsap.context(() => {
			gsap.fromTo(
				textRef.current,
				{
					opacity: 0,
					y: 80,
					filter: "blur(10px)"
				},
				{
					opacity: 1,
					y: 0,
					filter: "blur(0px)",
					ease: "none",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 75%",
						end: "top 35%",
						scrub: 1
					}
				}
			)
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section
			ref={sectionRef}
			className="pt-22.5 lg:pt-40 pb-30 lg:pb-22.5 min-h-198 lg:min-h-206 flex relative overflow-hidden"
		>
			<Image
				src="/images/pal-page/appearance-bg.jpg"
				fill
				alt=""
				className="object-cover max-md:object-[40%_center]"
			/>
			<div className="absolute top-0 left-0 w-full h-[60%] bg-linear-to-b from-background to-background/0" />

			<div className="max-w-308 mx-auto px-4 w-full flex flex-col justify-between relative">
				<Title className="text-center max-w-md self-center">
					Необычный
					<br />
					внешний вид
				</Title>

				<div
					ref={textRef}
					className="font-helvetica text-white max-w-80 -tracking-[0.01em] will-change-transform"
				>
					<div className="pb-4 mb-4 lg:pb-6 lg:mb-6 border-b font-bold border-[rgba(217,217,217,0.5)] text-[24px] md:text-[28px] lg:text-[32px]">
						2см радиус
					</div>
					<p className="text-[17px] leading-[1.3]">
						Датчики отличаются малым размером. Еще одной особенностью является то, что они изменяют свой цвет при контакте с водой. В обычном состоянии датчик светится зеленым, нештатная ситуация заставляет его поменять цвет на красный.
					</p>
				</div>
			</div>
		</section>
	)
}