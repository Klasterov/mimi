"use client"

import { Button } from "@/components/UI/Button"
import { Title } from "@/components/UI/Title"
import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function WindowBlindHero() {
	const imageRef = useRef<HTMLDivElement | null>(null)
	const titleRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!imageRef.current || !titleRef.current) return

		// фикс бага: сразу задаём старт
		gsap.set(imageRef.current, {
			scale: 0.85,
			opacity: 0,
			transformOrigin: "center center",
		})

		gsap.set(titleRef.current, {
			y: 40,
			opacity: 0,
		})

		const tl = gsap.timeline()

		tl.to(imageRef.current, {
			scale: 1,
			opacity: 1,
			duration: 0.9,
			ease: "power3.out",
		})
			.to(titleRef.current, {
				y: 0,
				opacity: 1,
				duration: 0.7,
				ease: "power3.out",
			}, "-=0.4")

	}, [])

	return (
		<section className="pt-10 pb-22.5 bg-white">
			<div className="max-w-235.5 px-4 mx-auto flex flex-col items-center text-center">

				{/* важно: opacity-0 сразу в верстке */}
				<div ref={imageRef} className="mb-5 opacity-0">
					<Image
						src="/images/window-blind-page/hero.png"
						width={474}
						height={427}
						quality={95}
						alt=""
					/>
				</div>

				<div ref={titleRef} className="mb-6 opacity-0">
					<Title>Короткий слоган</Title>
				</div>

				<Button className="justify-center py-1.75!">
					Подобрать ткань и привод
				</Button>

				<div className="font-helvetica text-[17px] mt-20 leading-[1.3] -tracking-[0.01em] max-w-135.5">
					Нехитрая система подъема...
					Часто популярны на кухне...
				</div>
			</div>
		</section>
	)
}