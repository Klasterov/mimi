"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import ArrowLink from "../UI/ArrowLink"
import { Title } from "../UI/Title"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const slides = [
	{
		image: '/images/pricing-page/1.jpg',
		cap: 'Проектирование',
		descr: 'Прорабатываем систему под планировку: схемы, спецификация, сборка щитов и план сценарных выключателей.',
		link: '#',
	},
	{
		image: '/images/pricing-page/2.jpg',
		cap: 'Монтаж',
		descr: 'Прокладываем кабель, устанавливаем оборудование и щиты, выполняем пусконаладку с аккуратной интеграцией в интерьер.',
		link: '#',
	},
	{
		image: '/images/pricing-page/3.jpg',
		cap: 'Сервис',
		descr: 'Пожизненная гарантия на оборудование, удалённый мониторинг и быстрые выезды по SLA, обновления и расширения системы.',
		link: '#',
	},
]

export default function PricingTypes() {
	const titleRef = useRef<HTMLDivElement | null>(null)
	const cardsRef = useRef<HTMLUListElement | null>(null)

	useEffect(() => {
		if (!titleRef.current || !cardsRef.current) return

		const ctx = gsap.context(() => {
			const cards = cardsRef.current!.children

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: titleRef.current,
					start: "top 80%",
					once: true,
				},
			})

			// заголовок
			tl.to(titleRef.current, {
				y: 0,
				opacity: 1,
				duration: 0.8,
				ease: "power3.out",
			})

			// карточки
			tl.to(cards, {
				y: 0,
				opacity: 1,
				duration: 0.8,
				stagger: 0.15,
				ease: "power3.out",
			}, "-=0.3")
		})

		return () => ctx.revert()
	}, [])

	return (
		<section className="pt-22.5 lg:pt-30 pb-22.5">
			<div className="max-w-308 mx-auto px-4">

				{/* TITLE */}
				<div
					ref={titleRef}
					className="mb-10 opacity-0 translate-y-[30px]"
				>
					<Title>Виды услуг</Title>
				</div>

				{/* CARDS */}
				<ul
					ref={cardsRef}
					className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
				>
					{slides.map((slide, i) => (
						<li
							key={i}
							className="rounded-[20px] items-start overflow-hidden bg-white aspect-387/600 flex relative flex-col justify-end p-4 md:p-5 gap-2 leading-[1.2] opacity-0 translate-y-[30px]"
						>
							<Image
								src={slide.image}
								fill
								alt=""
								className="object-cover"
								quality={95}
							/>
							<h3 className="relative font-medium text-[17px]">{slide.cap}</h3>
							<div className="relative text-[15px] leading-[1.4]">{slide.descr}</div>
							<ArrowLink className="relative" href={slide.link}>
								Узнать больше
							</ArrowLink>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}