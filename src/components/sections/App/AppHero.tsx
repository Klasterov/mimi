"use client"

import ArrowLink from "@/components/UI/ArrowLink"
import { contacts } from "@/config/contacts"
import Image from "next/image"
import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function AppHero() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const sceneRef = useRef<HTMLDivElement | null>(null)
	const logoRef = useRef<HTMLDivElement | null>(null)
	const titleRef = useRef<HTMLDivElement | null>(null)
	const phoneRef = useRef<HTMLDivElement | null>(null)

	useLayoutEffect(() => {
		if (!sectionRef.current || !sceneRef.current) return

		const ctx = gsap.context(() => {
			gsap.set(logoRef.current, {
				y: 0,
				opacity: 1,
			})

			gsap.set(titleRef.current, {
				y: 120,
				opacity: 1,
			})

			gsap.set(phoneRef.current, {
				scale: 0.36,
				opacity: 0,
				y: 30,
				transformOrigin: "center center",
			})

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sceneRef.current,
					start: "top top",
					end: "+=1050",
					scrub: 0.35,
					pin: true,
					anticipatePin: 1,
				},
			})

			tl.to(
				logoRef.current,
				{
					y: -90,
					opacity: 0,
					duration: 0.22,
					ease: "none",
				},
				0
			)

			tl.to(
				titleRef.current,
				{
					y: 0,
					duration: 0.32,
					ease: "none",
				},
				0.08
			)

			tl.to(
				phoneRef.current,
				{
					scale: 0.58,
					opacity: 0.45,
					y: 0,
					duration: 0.2,
					ease: "none",
				},
				0.12
			)

			tl.to(
				phoneRef.current,
				{
					scale: 1,
					opacity: 1,
					duration: 0.42,
					ease: "none",
				},
				0.32
			)
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="overflow-hidden pt-15 bg-white">
			<div ref={sceneRef} className="relative h-screen">
				<div className="max-w-235.5 h-full px-4 mx-auto flex flex-col items-center">
					<div
						ref={logoRef}
						className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center text-center gap-4 font-bold text-[22px] lg:text-[24px] text-black -tracking-[0.01em] z-30"
					>
						<Image
							src="/images/app-page/hero/icon.svg"
							width={100}
							height={100}
							alt=""
							priority
						/>
						<span>MiMiSmart</span>
					</div>

					<div className="relative flex-1 w-full flex items-center justify-center">
						<div
							ref={titleRef}
							className="absolute w-95 md:w-160 lg:w-245 xl:w-300 aspect-1201/225 left-1/2 top-1/2 -translate-1/2 z-10 pointer-events-none"
						>
							<Image
								src="/images/app-page/hero/title.png"
								quality={95}
								fill
								alt="Приложение"
								priority
							/>
						</div>

						<div
							ref={phoneRef}
							className="absolute left-1/2 top-1/2 -translate-1/2 z-20 w-[210px] md:w-[270px] lg:w-[340px]"
						>
							<Image
								src="/images/app-page/hero/phone.png"
								width={340}
								height={696}
								alt=""
								className="w-full h-auto"
								priority
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-235.5 px-4 pb-22.5 mx-auto flex flex-col items-center text-center">
				<div className="mb-15 flex max-md:flex-col max-md:items-center max-md:w-full justify-center gap-8 md:gap-15">
					{contacts.apps?.map(app => {
						const IconComponent = app.icon

						return (
							<div key={app.label} className="flex items-center gap-4">
								<IconComponent className="w-8 h-8 text-foreground" />
								<div className="flex flex-col items-start gap-2">
									<span className="font-bold text-[15px] -tracking-[0.01em]">
										{app.label}
									</span>
									<ArrowLink href={app.href}>Скачать</ArrowLink>
								</div>
							</div>
						)
					})}
				</div>

				<div className="max-w-150 font-helvetica text-[19px] -tracking-[0.01em] leading-normal">
					Приложение сейчас есть практически у всего и подчас при прочих равных
					условиях компания или услуга выбирается из-за его удобства.
					Приложение Умный дом нашей компании бесплатное, в отличии от
					некоторых конкурентов, и Вы можете скачать его с Google Play или
					AppStore. Введите в поиске MiMiSmart и вы сразу его найдете.
				</div>
			</div>
		</section>
	)
}