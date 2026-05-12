"use client"

import { Title } from "@/components/UI/Title"
import Image from "next/image"
import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"

export default function CustomizationHero() {
	const sectionRef = useRef<HTMLElement>(null)
	const bgRef = useRef<HTMLDivElement>(null)
	const imageRef = useRef<HTMLDivElement>(null)
	const textWrapRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline()

			tl.to(bgRef.current, {
				opacity: 1,
				scale: 1,
				duration: 1,
				ease: "power2.out",
			})
				.to(
					imageRef.current,
					{
						opacity: 1,
						y: 0,
						scale: 1,
						filter: "blur(0px)",
						duration: 0.9,
						ease: "power3.out",
					},
					"-=0.45"
				)
				.to(
					textWrapRef.current?.children || [],
					{
						opacity: 1,
						y: 0,
						filter: "blur(0px)",
						duration: 0.8,
						ease: "power3.out",
						stagger: 0.12,
					},
					"-=0.35"
				)
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="pt-10 pb-36.25 relative overflow-hidden">
			{/* фон */}
			<div
				ref={bgRef}
				className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-[#313a39] to-background opacity-0 scale-[1.04]"
			/>

			<div className="max-w-308 px-4 mx-auto flex flex-col items-center text-center relative">

				{/* картинка */}
				<div
					ref={imageRef}
					className="mb-5 opacity-0 translate-y-6 scale-[0.96] blur-[10px]"
				>
					<Image
						src="/images/customization-page/hero/decor.png"
						width={406}
						height={406}
						quality={95}
						alt=""
					/>
				</div>

				{/* текст */}
				<div ref={textWrapRef} className="contents">
					<Title className="mb-6 opacity-0 translate-y-7 blur-[8px]">
						Монтаж и установка
					</Title>
					<div className="font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em] max-w-135.5 opacity-0 translate-y-7 blur-[8px]">
						Музыка — одна из важнейших составляющих настроения, и порой так хочется, чтобы ей сопровождалось каждое действие.
					</div>
				</div>

			</div>
		</section>
	)
}