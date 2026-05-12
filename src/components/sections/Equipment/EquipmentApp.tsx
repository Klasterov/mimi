"use client"

import { RightArrowIcon } from "@/icons/RightArrowIcon"
import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function EquipmentApp() {
	const sectionRef = useRef<HTMLElement>(null)
	const titleLine1Ref = useRef<HTMLDivElement>(null)
	const titleLine2Ref = useRef<HTMLSpanElement>(null)
	const descriptionRef = useRef<HTMLDivElement>(null)
	const phoneRef = useRef<HTMLDivElement>(null)
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

			// Телефон — выползает снизу
			gsap.from(phoneRef.current, {
				scrollTrigger: {
					trigger: phoneRef.current,
					start: "top 85%",
					once: true,
				},
				y: 180,
				opacity: 0,
				scale: 0.96,
				duration: 1.2,
				ease: "power3.out"
			})

			// Текст справа
			gsap.from(contentRef.current, {
				scrollTrigger: {
					trigger: contentRef.current,
					start: "top 85%",
					once: true,
				},
				y: 60,
				opacity: 0,
				duration: 0.9,
				ease: "power3.out"
			})

		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section
			ref={sectionRef}
			className="pt-22.5 lg:pt-27.5 overflow-hidden -tracking-[0.01em] bg-linear-to-b from-foreground to-black text-white"
		>
			<div className="mb-10 lg:mb-13 max-w-236 mx-auto px-4">

				<div className="font-bold text-[18px] md:text-[24px] lg:text-[32px] leading-tight">
					Приложение
				</div>

				<h2 className="xl:-mr-17 mb-6 font-bold leading-tight flex flex-col">

					<div
						ref={titleLine1Ref}
						className="text-[80px] md:text-[100px] lg:text-[140px] xl:text-[220px] bg-[linear-gradient(180deg,#7748aa_0%,#ff1457_100%)] bg-clip-text text-transparent"
					>
						Система
					</div>

					<span
						ref={titleLine2Ref}
						className="-mt-3 lg:-mt-10 text-[40px] md:text-[60px] lg:text-[80px] xl:text-[100px] bg-[linear-gradient(180deg,#7748aa_0%,#ff1457_100%)] bg-clip-text text-transparent"
					>
						умного дома.
					</span>

				</h2>

				<div
					ref={descriptionRef}
					className="text-[17px] leading-tight max-w-167 font-helvetica"
				>
					Использование приложения подразумевает под собой любая система умного дома, но его простота и понятность — это намного важнее и до этого дошли немногие.
				</div>
			</div>

			<div className="max-w-236  mx-auto px-4 flex lg:items-center lg:flex-row flex-col-reverse gap-15 lg:gap-26">

				<div
					ref={phoneRef}
					className="relative flex-none mx-auto lg:mx-0 w-75 sm:w-85.25 aspect-353/478"
				>
					<Image
						src="/images/equipment-page/app/main.png"
						fill
						alt=""
						className="object-cover"
					/>
				</div>

				<div ref={contentRef} className="lg:-mt-10 xl:pr-7">
					<p className="mb-4 text-[17px] leading-tight font-helvetica">
						Наше приложение интуитивно понятно и редактируемое. Можно изменить шапку или столбцы по пожеланию клиента. Можно изменить картинки и их название. Цвет интерфейса и прочие детали. Наш программный продукт вы можете настроить под себя, без каких либо сложностей. Скачайте и попробуйте.
					</p>

					<a href="#" className="font-helvetica inline-flex items-center gap-1 text-[15px] font-medium text-brand-blue group">
						Узнать больше о приложении
						<RightArrowIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
					</a>
				</div>

			</div>
		</section>
	)
}