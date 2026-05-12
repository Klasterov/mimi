"use client"

import { useEffect, useRef } from "react"
import ArrowLink from "@/components/UI/ArrowLink"
import { Title } from "@/components/UI/Title"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function PartnersForDealer() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const imageRef = useRef<HTMLDivElement | null>(null)
	const contentRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger)

		const ctx = gsap.context(() => {
			gsap.set(imageRef.current, {
				autoAlpha: 0,
				x: -60,
				y: 40,
				rotate: -16,
			})

			gsap.set(contentRef.current, {
				autoAlpha: 0,
				x: 60,
				y: 40,
			})

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 75%",
					once: true,
				},
			})

			tl.to(imageRef.current, {
				autoAlpha: 1,
				x: 0,
				y: 0,
				rotate: -12,
				duration: 1,
				ease: "power3.out",
			}).to(
				contentRef.current,
				{
					autoAlpha: 1,
					x: 0,
					y: 0,
					duration: 0.9,
					ease: "power3.out",
				},
				"-=0.6"
			)
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="pt-30 pb-15 bg-[#f3f6f6] overflow-hidden">
			<div className="max-w-308 px-4 mx-auto">
				<div className="mb-10 flex flex-col items-center text-center max-w-217 mx-auto">
					<div className="font-bold text-[24px] -tracking-[0.01em] text-[#e27500]">
						Предлагаем сотрудничество
					</div>
					<Title className="mb-10 lg:mb-6">Дилерам</Title>
					<div className="font-helvetica text-[17px] lg:text-[19px] leading-[1.3] -tracking-[0.01em] text-brand-gray space-y-[1em]">
						<p>Полный пакет инструментов и инструкций.</p>
						<p>
							Для региональных дилеров мы предлагаем полный комплект необходимых
							маркетинговых материалов, инструментов продаж, аналитики и
							обработки, помощь в запуске умного дома и поддержку ваших клиентов.
						</p>
					</div>
				</div>

				<div className="flex max-lg:flex-col lg:items-center gap-10 xl:pr-20 justify-between">
					<div
						ref={imageRef}
						className="-rotate-12 -ml-30 lg:-ml-[17.8%] relative aspect-916/709 grow-0 shrink-0 w-120 lg:w-[76.3%]"
					>
						<Image
							src="/images/partners-page/for-dealer/decor.png"
							fill
							alt=""
						/>
					</div>

					<div ref={contentRef} className="lg:max-w-86.75">
						<Image
							src="/images/partners-page/for-dealer/icon.svg"
							width={54}
							height={54}
							alt=""
							className="mb-6"
						/>
						<p className="mb-4 font-helvetica text-[17px] leading-[1.4] -tracking-[0.01em] text-brand-gray">
							Для дилеров MiMiSmart выстроена прозрачная и предсказуемая модель
							сотрудничества. Мы предоставляем инженерную платформу, готовые
							решения и поддержку производителя, что позволяет сосредоточиться
							на работе с клиентами и реализации проектов, не беря на себя риски
							разработки, тестирования и сопровождения системы.
						</p>
						<ArrowLink href="#">Подробнее дилерам</ArrowLink>
					</div>
				</div>
			</div>
		</section>
	)
}