"use client"

import { useEffect, useRef } from "react"
import { Title } from "@/components/UI/Title"
import Image from "next/image"
import gsap from "gsap"

export default function PALHero() {
	const sectionRef = useRef<HTMLDivElement | null>(null)
	const gradientRef = useRef<HTMLDivElement | null>(null)
	const imageRef = useRef<HTMLDivElement | null>(null)
	const textRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const tl = gsap.timeline()

		// 1. фон появляется
		tl.to(gradientRef.current, {
			opacity: 1,
			duration: 1.2,
			ease: "power2.out"
		})

		// 2. картинка
		tl.from(imageRef.current, {
			opacity: 0,
			y: 40,
			duration: 0.8,
			ease: "power2.out"
		}, "-=0.5")

		// 3. текст
		tl.from(textRef.current?.children || [], {
			opacity: 0,
			y: 30,
			stagger: 0.15,
			duration: 0.6,
			ease: "power2.out"
		}, "-=0.4")

	}, [])

	return (
		<section
			ref={sectionRef}
			className="relative min-h-198 pb-22.5 max-md:pt-10 lg:min-h-205 overflow-hidden bg-white"
		>
			{/* градиент оверлей */}
			<div
				ref={gradientRef}
				className="absolute inset-0 bg-linear-to-b from-[#e5eeff] to-background opacity-0"
			/>

			<div className="relative z-10 max-w-308 px-4 mx-auto flex flex-col items-center text-center">

				<div ref={imageRef} className="-mb-10 max-sm:-mx-10">
					<Image
						src="/images/pal-page/hero-decor.png"
						width={467}
						height={402}
						alt=""
					/>
				</div>

				<div ref={textRef} className="flex flex-col items-center">
					<Title className="mb-6">Защита от протечек</Title>
					<div className="max-w-xl font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em]">
						Открывайте и закрывайте ворота с помощью специальных устройств, подключенных к центральной системе управления умного дома.
					</div>
				</div>

			</div>
		</section>
	)
}