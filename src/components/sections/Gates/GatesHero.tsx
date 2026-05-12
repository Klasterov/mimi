"use client"

import { useEffect, useRef } from "react"
import { Title } from "@/components/UI/Title"
import Image from "next/image"
import gsap from "gsap"

export default function GatesHero() {
	const bgRef = useRef<HTMLDivElement | null>(null)
	const titleRef = useRef<HTMLDivElement | null>(null)
	const textRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				defaults: { ease: "power3.out" }
			})

			// фон
			tl.fromTo(
				bgRef.current,
				{ opacity: 0, scale: 1.05 },
				{ opacity: 1, scale: 1, duration: 1.2 }
			)

			// заголовок
			tl.fromTo(
				titleRef.current,
				{
					opacity: 0,
					scale: 0.7,
					y: 40
				},
				{
					opacity: 1,
					scale: 1,
					y: 0,
					duration: 0.9
				},
				"-=0.8"
			)

			// текст
			tl.fromTo(
				textRef.current,
				{
					opacity: 0,
					scale: 0.8,
					y: 30
				},
				{
					opacity: 1,
					scale: 1,
					y: 0,
					duration: 0.8
				},
				"-=0.7"
			)
		})

		return () => ctx.revert()
	}, [])

	return (
		<section className="relative max-md:py-15 sm:overflow-hidden min-h-198 md:min-h-215 md:flex md:items-center">
			{/* фон */}
			<div ref={bgRef} className="absolute inset-0">
				<div className="max-sm:hidden w-300 lg:w-360 aspect-1440/971 absolute -top-10 -translate-x-1/2 left-1/2">
					<Image src="/images/gates-page/hero-decor.png" fill alt="" />
				</div>

				<div className="absolute inset-0 sm:hidden">
					<Image
						src="/images/gates-page/hero-decor-mob.png"
						fill
						alt=""
						className="object-cover"
					/>
				</div>
			</div>

			<div className="max-w-235.5 px-4 mx-auto flex flex-col items-center text-center relative md:w-full">
				<div ref={titleRef}>
					<Title className="mb-4 xl:text-[84px]">Ворота</Title>
				</div>

				<div
					ref={textRef}
					className="max-w-113 text-[17px] leading-[1.3] -tracking-[0.01em] font-helvetica"
				>
					Открывайте и закрывайте ворота с помощью специальных устройств, подключенных к центральной системе управления умного дома.
				</div>
			</div>
		</section>
	)
}