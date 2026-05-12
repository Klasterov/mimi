"use client"

import { RightArrowIcon } from "@/icons/RightArrowIcon"
import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function EquipmentReserve() {
	const sectionRef = useRef<HTMLElement>(null)
	const titleLine1Ref = useRef<HTMLDivElement>(null)
	const titleLine2Ref = useRef<HTMLSpanElement>(null)
	const descriptionRef = useRef<HTMLDivElement>(null)
	const imageRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const ctx = gsap.context(() => {

			// Заголовок
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 70%",
					once: true,
				}
			})

			tl
				.from(titleLine1Ref.current, {
					y: 100,
					opacity: 0,
					duration: 0.9,
					ease: "power3.out"
				})
				.from(titleLine2Ref.current, {
					y: 100,
					opacity: 0,
					duration: 0.9,
					ease: "power3.out"
				}, "-=0.4")
				.from(descriptionRef.current, {
					y: 40,
					opacity: 0,
					duration: 0.6,
					ease: "power2.out"
				}, "-=0.3")

			// Нижний блок текст
			gsap.from(contentRef.current, {
				scrollTrigger: {
					trigger: contentRef.current,
					start: "top 80%",
					once: true,
				},
				y: 60,
				opacity: 0,
				duration: 0.8,
				ease: "power3.out"
			})

			// Картинка
			gsap.from(imageRef.current, {
				scrollTrigger: {
					trigger: imageRef.current,
					start: "top 85%",
					once: true,
				},
				y: 120,
				opacity: 0,
				duration: 1,
				ease: "power3.out"
			})

		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="pt-22.5 lg:pt-27.5 bg-white overflow-hidden">
			<div className="max-w-236 mx-auto px-4 -tracking-[0.01em]">

				<div className="mb-10 lg:mb-4">
					<div className="font-bold text-[18px] md:text-[24px] lg:text-[32px] leading-tight">
						Бесперебойное электроснабжение
					</div>

					<h2 className="mb-6 font-bold leading-tight flex flex-col">
						<div
							ref={titleLine1Ref}
							className="text-[86px] md:text-[100px] lg:text-[140px] xl:text-[220px] bg-[linear-gradient(180deg,#0b0d10_0%,#6bf980_100%)] bg-clip-text text-transparent"
						>
							Резерв
						</div>

						<span
							ref={titleLine2Ref}
							className="lg:-mt-10 -mt-4 text-[40px] md:text-[60px] lg:text-[80px] xl:text-[100px] bg-[linear-gradient(180deg,#0b0d10_0%,#6bf980_100%)] bg-clip-text text-transparent"
						>
							когда остальной дом молчит.
						</span>
					</h2>

					<div
						ref={descriptionRef}
						className="text-[17px] leading-tight max-w-143 font-helvetica"
					>
						Бесперебойное электроснабжение MiMiSmart сохраняет работу ключевых процессов и безопасности даже при отключении сети.
					</div>
				</div>

				<div className="flex lg:items-center lg:flex-row flex-col-reverse gap-15 lg:gap-20">

					<div
						ref={imageRef}
						className="relative lg:mb-0 -mb-15 flex-none sm:w-122 -ml-30 aspect-488/630"
					>
						<Image
							src="/images/equipment-page/reserve/main.png"
							fill
							alt=""
						/>
					</div>

					<div ref={contentRef}>
						<p className="mb-4 text-[17px] leading-tight font-helvetica">
							Питание остается на приоритетных контурах — контроллеры, связь/интернет, охрана, сервер, аварийный свет — так что все сценарии умного дома и замки остаются активны без пауз.
						</p>

						<a href="#" className="font-helvetica inline-flex items-center gap-1 text-[15px] font-medium text-brand-blue group">
							Бесперебойное электроснабжение
							<RightArrowIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
						</a>
					</div>

				</div>
			</div>
		</section>
	)
}