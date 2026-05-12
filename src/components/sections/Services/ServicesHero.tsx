"use client"

import { Title } from "@/components/UI/ServicesHeroTitle"
import Image from "next/image"
import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"

export default function ServicesHero() {
	const bgRef = useRef<HTMLDivElement | null>(null)
	const decorRef = useRef<HTMLDivElement | null>(null)
	const titleWrapRef = useRef<HTMLDivElement | null>(null)
	const itemsRef = useRef<(HTMLLIElement | null)[]>([])

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			if (bgRef.current) {
				gsap.set(bgRef.current, {
					opacity: 0,
					scale: 1.06,
				})
			}

			if (decorRef.current) {
				gsap.set(decorRef.current, {
					opacity: 0,
					y: 20,
				})
			}

			if (titleWrapRef.current) {
				gsap.set(titleWrapRef.current, {
					opacity: 0,
					y: 24,
				})
			}

			gsap.set(itemsRef.current, {
				opacity: 0,
				y: 26,
				scale: 0.96,
				filter: "blur(8px)",
			})

			const tl = gsap.timeline()

			tl.to(bgRef.current, {
				opacity: 1,
				scale: 1,
				duration: 1.1,
				ease: "power2.out",
			})
				.to(
					decorRef.current,
					{
						opacity: 1,
						y: 0,
						duration: 0.7,
						ease: "power3.out",
					},
					0.15
				)
				.to(
					titleWrapRef.current,
					{
						opacity: 1,
						y: 0,
						duration: 0.8,
						ease: "power3.out",
					},
					0.22
				)
				.to(
					itemsRef.current,
					{
						opacity: 1,
						y: 0,
						scale: 1,
						filter: "blur(0px)",
						duration: 0.9,
						ease: "power3.out",
						stagger: 0.14,
					},
					0.45
				)
		})

		return () => ctx.revert()
	}, [])

	return (
		<section className="lg:min-h-192 min-h-181.5 relative flex items-center overflow-hidden bg-[#f4f4f4]">
			<div
				ref={bgRef}
				className="opacity-0 absolute inset-0 bg-[linear-gradient(180deg,#c4f9fc_0%,#f4f4f4_100%)] will-change-transform"
			/>

			<div className="max-w-308 flex-auto mx-auto px-4 relative text-center flex flex-col items-center">
				<div
					ref={decorRef}
					className="mb-5 lg:mb-3 sm:max-w-none max-w-75.5 opacity-0"
				>
					<Image
						width={374}
						height={67}
						src="/images/services-page/hero/decor.svg"
						alt=""
						priority
					/>
				</div>

				<div className="opacity-0" ref={titleWrapRef}>
					<Title>Полный цикл</Title>
				</div>

				<ul className="space-y-3.25 font-medium -tracking-[0.01em] leading-tight lg:-mt-11.5 flex flex-col items-center">
					<li
						ref={el => {
							itemsRef.current[0] = el
						}}
						className="opacity-0 backdrop-blur-xs border border-white/60 p-2.5 bg-white/40 rounded-lg bg-linear-to-r from-[#316abb] to-brand-blue bg-clip-text text-transparent text-[32px] will-change-transform"
					>
						Проектирование
					</li>
					<li
						ref={el => {
							itemsRef.current[1] = el
						}}
						className="opacity-0 backdrop-blur-xs border border-white/60 p-2.5 bg-white/40 rounded-lg bg-linear-to-r from-[#316abb] to-brand-blue bg-clip-text text-transparent text-[24px] will-change-transform"
					>
						Монтаж
					</li>
					<li
						ref={el => {
							itemsRef.current[2] = el
						}}
						className="opacity-0 backdrop-blur-xs border border-white/60 p-2.5 bg-white/40 rounded-lg bg-linear-to-r from-[#316abb] to-brand-blue bg-clip-text text-transparent text-[18px] will-change-transform"
					>
						Сервис
					</li>
				</ul>
			</div>
		</section>
	)
}