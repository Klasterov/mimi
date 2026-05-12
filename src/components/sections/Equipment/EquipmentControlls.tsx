"use client"

import { RightArrowIcon } from "@/icons/RightArrowIcon"
import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function EquipmentControlls() {
	const sectionRef = useRef<HTMLElement>(null)
	const titleLine1Ref = useRef<HTMLDivElement>(null)
	const titleLine2Ref = useRef<HTMLSpanElement>(null)
	const descriptionRef = useRef<HTMLDivElement>(null)
	const contentBlockRef = useRef<HTMLDivElement>(null)
	const imageRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const ctx = gsap.context(() => {

			// Заголовок + описание
			const titleTl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 70%",
					once: true,
				}
			})

			titleTl
				.from(titleLine1Ref.current, {
					y: 80,
					opacity: 0,
					duration: 0.8,
					ease: "power3.out"
				})
				.from(titleLine2Ref.current, {
					y: 80,
					opacity: 0,
					duration: 0.8,
					ease: "power3.out"
				}, "-=0.4")
				.from(descriptionRef.current, {
					y: 40,
					opacity: 0,
					duration: 0.6,
					ease: "power2.out"
				}, "-=0.2")


			// Картинка + текст справа
			gsap.from(contentBlockRef.current, {
				scrollTrigger: {
					trigger: contentBlockRef.current,
					start: "top 80%",
					once: true,
				},
				y: 60,
				opacity: 0,
				duration: 0.9,
				ease: "power3.out"
			})

			gsap.from(imageRef.current, {
				scrollTrigger: {
					trigger: imageRef.current,
					start: "top 85%",
					once: true,
				},
				y: 100,
				opacity: 0,
				duration: 1.1,
				ease: "power3.out"
			})

		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="pt-22.5 lg:pt-27.5 bg-white">
			<div className="max-w-236 mx-auto px-4 -tracking-[0.01em]">

				<div className="mb-10 lg:mb-4">
					<div className="font-bold tracking-[0.05em] text-[18px] md:text-[24px] lg:text-[32px] leading-tight">
						Контроллеры
					</div>

					<h2 className="mb-6 font-bold leading-tight flex flex-col">
						<div
							ref={titleLine1Ref}
							className="text-[86px] md:text-[100px] lg:text-[140px] xl:text-[220px] bg-[linear-gradient(180deg,#0b0d10_0%,#516076_100%)] bg-clip-text text-transparent"
						>
							Основа
						</div>

						<span
							ref={titleLine2Ref}
							className="lg:-mt-10 -mt-4 text-[40px] md:text-[60px] lg:text-[80px] xl:text-[100px] bg-[linear-gradient(180deg,#0b0d10_0%,#516076_100%)] bg-clip-text text-transparent"
						>
							автоматизации.
						</span>
					</h2>

					<div
						ref={descriptionRef}
						className="text-[17px] font-helvetica leading-tight max-w-143"
					>
						Система децентрализована, не имеет "центрального мозга", что позволяет поднять надежность системы на новый уровень.
					</div>
				</div>

				<div className="flex lg:items-center lg:flex-row flex-col-reverse gap-15 lg:gap-17">

					<div
						ref={imageRef}
						className="relative flex-none sm:w-111 sm:-ml-17 aspect-409/551"
					>
						<Image
							src="/images/equipment-page/controlls/main.png"
							fill
							quality={95}
							alt=""
						/>
					</div>

					<div ref={contentBlockRef} className="lg:mt-30">
						<p className="mb-4 text-[17px] leading-tight font-helvetica">
							Оборудование MiMiSmart подключается к большому числу пользователей и поддерживает более 200 модулей расширения для передачи сигналов. Устройства обладают большим запасом памяти и высокой производительностью для решения ряда специфических задач.
						</p>

						<a href="#" className="font-helvetica inline-flex items-center gap-1 text-[15px] font-medium text-brand-blue group">
							Узнать больше о контроллерах
							<RightArrowIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
						</a>
					</div>

				</div>
			</div>
		</section>
	)
}