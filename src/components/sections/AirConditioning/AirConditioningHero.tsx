"use client"

import { Title } from "@/components/UI/Title"
import Image from "next/image"
import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"

export default function AirConditioningHero() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const imageWrapRef = useRef<HTMLDivElement | null>(null)
	const titleWrapRef = useRef<HTMLDivElement | null>(null)
	const textRef = useRef<HTMLDivElement | null>(null)

	useLayoutEffect(() => {
		if (!sectionRef.current) return

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				defaults: { ease: "power3.out" },
			})

			tl.to(imageWrapRef.current, {
				opacity: 1,
				scale: 1,
				duration: 1.1,
				clearProps: "transform",
			})
				.to(
					titleWrapRef.current,
					{
						opacity: 1,
						y: 0,
						duration: 0.8,
					},
					"-=0.45"
				)
				.to(
					textRef.current,
					{
						opacity: 1,
						y: 0,
						duration: 0.8,
					},
					"-=0.5"
				)
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section
			ref={sectionRef}
			className="pt-10 bg-[#f8f8f8] lg:pt-15 pb-22.5 min-h-198 overflow-hidden"
		>
			<div className="max-w-308 mx-auto px-4 flex flex-col items-center text-center">
				<div
					ref={imageWrapRef}
					className="mb-20 lg:mb-10 min-w-109.5 opacity-0 scale-75 will-change-transform"
				>
					<Image
						src="/images/air-conditioning-page/hero-decor.jpg"
						width={940}
						height={395}
						alt="кондиционер"
					/>
				</div>

				<div
					ref={titleWrapRef}
					className="mb-10 lg:mb-20 opacity-0 translate-y-8 will-change-transform"
				>
					<Title>Короткий слоган</Title>
				</div>

				<div
					ref={textRef}
					className="max-w-140 font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em] opacity-0 translate-y-6 will-change-transform"
				>
					Нехитрая система подъема, позволяющая им подниматься вверх или
					опускаться вниз с помощью системы шнуров и электропривода..
					Часто популярны на кухне, лоджиях и других местах, где из за
					особенностей помещения нецелесообразно устанавливать раздвижные
					шторы.
				</div>
			</div>
		</section>
	)
}