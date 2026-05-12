"use client"

import { Title } from "@/components/UI/Title"
import Image from "next/image"
import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"

export default function HimidityHero() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const gradientRef = useRef<HTMLDivElement | null>(null)
	const imageRef = useRef<HTMLImageElement | null>(null)
	const titleWrapRef = useRef<HTMLDivElement | null>(null)
	const textRef = useRef<HTMLDivElement | null>(null)

	useLayoutEffect(() => {
		if (!sectionRef.current || !gradientRef.current || !imageRef.current || !titleWrapRef.current || !textRef.current) return

		const ctx = gsap.context(() => {
			gsap.set(gradientRef.current, {
				opacity: 0,
			})

			gsap.set([imageRef.current, titleWrapRef.current, textRef.current], {
				opacity: 0,
			})

			gsap.set(imageRef.current, {
				y: 24,
				scale: 0.96,
				filter: "blur(10px)",
			})

			gsap.set(titleWrapRef.current, {
				y: 22,
				filter: "blur(8px)",
			})

			gsap.set(textRef.current, {
				y: 26,
				filter: "blur(10px)",
			})

			const tl = gsap.timeline({
				defaults: {
					ease: "power3.out",
				},
			})

			tl.to(gradientRef.current, {
				opacity: 1,
				duration: 0.9,
			})
				.to(
					imageRef.current,
					{
						opacity: 1,
						y: 0,
						scale: 1,
						filter: "blur(0px)",
						duration: 0.9,
					},
					0.15
				)
				.to(
					titleWrapRef.current,
					{
						opacity: 1,
						y: 0,
						filter: "blur(0px)",
						duration: 0.75,
					},
					0.28
				)
				.to(
					textRef.current,
					{
						opacity: 1,
						y: 0,
						filter: "blur(0px)",
						duration: 0.8,
					},
					0.4
				)
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section
			ref={sectionRef}
			className="pt-15 lg:pb-22.5 pb-32.5 relative bg-white overflow-hidden"
		>
			<div
				ref={gradientRef}
				className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-[#99e1ff] to-background pointer-events-none"
			/>

			<div className="max-w-235.5 px-4 mx-auto flex flex-col items-center text-center relative z-10">
				<Image
					ref={imageRef}
					src="/images/himidity-page/hero/decor.png"
					width={393}
					height={360}
					quality={95}
					alt=""
					className="mb-10 opacity-0"
				/>

				<div
					ref={titleWrapRef}
					className="mb-10 opacity-0"
				>
					<Title>Короткий слоган</Title>
				</div>

				<div
					ref={textRef}
					className="font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em] max-w-140 opacity-0"
				>
					Нехитрая система подъема, позволяющая им подниматься вверх или опускаться вниз с помощью системы шнуров и электропривода..
					Часто популярны на кухне, лоджиях и других местах, где из за особенностей помещения нецелесообразно устанавливать раздвижные шторы.
				</div>
			</div>
		</section>
	)
}