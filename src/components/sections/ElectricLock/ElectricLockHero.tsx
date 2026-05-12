"use client"

import { Button } from "@/components/UI/Button"
import { Title } from "@/components/UI/Title"
import Image from "next/image"
import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"

export default function ElectricLockHero() {
	const doorRef = useRef<HTMLDivElement | null>(null)
	const titleRef = useRef<HTMLDivElement | null>(null)

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			// начальное состояние (чтоб не мигало)
			gsap.set(doorRef.current, {
				scale: 0.85,
				opacity: 0,
				transformOrigin: "center center",
			})

			gsap.set(titleRef.current, {
				y: 30,
				opacity: 0,
			})

			// анимация двери
			gsap.to(doorRef.current, {
				scale: 1,
				opacity: 1,
				duration: 1,
				ease: "power3.out",
			})

			// анимация заголовка
			gsap.to(titleRef.current, {
				y: 0,
				opacity: 1,
				duration: 0.8,
				delay: 0.3,
				ease: "power3.out",
			})
		})

		return () => ctx.revert()
	}, [])

	return (
		<section className="min-h-181.5 md:min-h-245.5 overflow-hidden relative py-23.5 md:py-22">
			<div
				ref={doorRef}
				className="absolute bottom-0 left-1/2 -translate-x-1/2 aspect-1076/976 w-172.5 md:w-269 opacity-0"
			>
				<Image
					src="/images/electric-lock-page/hero/door.png"
					fill
					alt=""
				/>
			</div>

			<div className="max-w-235.5 px-4 mx-auto flex flex-col items-center relative">
				<div ref={titleRef} className="mb-6 opacity-0">
					<Title>Электрозамок</Title>
				</div>

				<Button className="justify-center py-1.75!">
					Подобрать замок
				</Button>
			</div>
		</section>
	)
}