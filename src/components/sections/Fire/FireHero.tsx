"use client"

import Image from "next/image"
import { Title } from "@/components/UI/Title"
import { useEffect, useRef } from "react"
import gsap from "gsap"

type Props = {
	title: string
	text: string
}

export default function FireHero({ title, text }: Props) {
	const titleRef = useRef<HTMLDivElement | null>(null)
	const imageRef = useRef<HTMLDivElement | null>(null)
	useEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline()

			tl.to(titleRef.current, {
				opacity: 1,
				y: 0,
				duration: 0.9,
				ease: "power2.out"
			}).to(
				imageRef.current,
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 0.8,
					ease: "power2.out"
				},
				"+=0.2"
			)
		})

		return () => ctx.revert()
	}, [])

	return (
		<section className="relative min-h-195 bg-black pb-22.5 lg:pb-30 text-white flex items-end overflow-hidden">
			{/* стеклянные блоки */}
			<div className="pointer-events-none absolute z-10 top-0 left-1/2 bottom-0 flex -translate-x-1/2">
				{Array.from({ length: 6 }).map((_, i) => (
					<div
						key={i}
						className="backdrop-blur-md w-27.5 md:w-36 h-full"
					/>
				))}
			</div>

			<div className="max-w-235.5 px-4 mx-auto flex flex-col items-center text-center">
				<div
					ref={imageRef}
					className="max-md:-mx-4 -mb-5 opacity-0 translate-y-5 scale-95"
				>
					<Image
						src="/images/fire-page/hero-decor.png"
						width={498}
						height={498}
						alt=""
					/>
				</div>

				<div ref={titleRef} className="opacity-0 translate-y-6 relative z-20 mb-4 md:mb-6">
					<Title className="bg-[linear-gradient(90deg,#fff4eb_0%,#fff4eb_47.6%,#ff4425_100%)] bg-clip-text text-transparent">
						{title}
					</Title>
				</div>

				<div className="relative z-20 font-helvetica -tracking-[0.01em] text-[17px] leading-[1.3] max-w-135.5">
					{text}
				</div>
			</div>
		</section>
	)
}