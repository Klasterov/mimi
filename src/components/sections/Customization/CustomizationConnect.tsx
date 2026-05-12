"use client"

import { SliderNavigation } from "@/components/UI/SliderNavigation"
import { Title } from "@/components/UI/Title"
import Image from "next/image"
import { useState, useLayoutEffect, useRef } from "react"

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import { RightArrowIcon } from "@/icons/RightArrowIcon"

import gsap from "gsap"

const slides = [
	{
		image: '/images/customization-page/connect/1.jpg',
		cap: 'Общий свет',
		descr: 'Это главный источник света в помещении, который заполняет все пространство.',
		theme: 'light',
	},
	{
		image: '/images/customization-page/connect/2.jpg',
		cap: 'Бесперебойное электроснабжение',
		descr: 'Питание остается на приоритетных контурах — контроллеры, связь/интернет и др.',
	},
	{
		image: '/images/customization-page/connect/3.jpg',
		cap: 'Вертикальные',
		descr: 'Это главный источник света в помещении, который заполняет все пространство.',
	},
	{
		image: '/images/customization-page/connect/4.jpg',
		cap: 'Декоративное освещение',
		descr: 'Используется для создания приятной атмосферы и подчеркивают дизайн.',
		theme: 'light',
	},
	{
		image: '/images/customization-page/connect/5.jpg',
		cap: 'Локальное освещение',
		descr: 'Используется для освещения отдельной зоны и решения отдельных задач.',
	},
]

export default function CustomizationConnect() {

	const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null)
	const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null)

	const sectionRef = useRef<HTMLDivElement>(null)
	const titleRef = useRef<HTMLDivElement>(null)
	const sliderRef = useRef<HTMLDivElement>(null)
	const navRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		if (!sectionRef.current) return

		const ctx = gsap.context(() => {
			// начальное состояние (чтобы не было "появилось → исчезло")
			gsap.set([titleRef.current, sliderRef.current, navRef.current], {
				opacity: 0,
				y: 40,
			})

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
					toggleActions: "play none none none",
				},
			})

			tl
				.to(titleRef.current, {
					opacity: 1,
					y: 0,
					duration: 0.7,
					ease: "power3.out",
				})
				.to(sliderRef.current, {
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: "power3.out",
				}, "-=0.3")
				.to(navRef.current, {
					opacity: 1,
					y: 0,
					duration: 0.6,
					ease: "power3.out",
				}, "-=0.4")

		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="pt-22.5 lg:pt-30 pb-22.5 overflow-hidden">
			<div className="max-w-308 px-4 mx-auto">

				<div ref={titleRef}>
					<Title className="mb-10 md:mb-15 lg:mb-20">
						Установка и подключение
					</Title>
				</div>

				<div ref={sliderRef}>
					<Swiper
						modules={[Navigation]}
						navigation={{ prevEl, nextEl }}
						className="overflow-visible!"
						breakpoints={{
							0: {
								spaceBetween: 16,
								slidesPerView: 'auto',
							},
							768: {
								spaceBetween: 16,
								slidesPerView: 2,
							},
							1024: {
								slidesPerView: 3,
								spaceBetween: 20,
							},
						}}
					>
						{slides.map((slide, i) => (
							<SwiperSlide
								key={i}
								className={`${slide.theme === 'light' ? 'text-white' : ''} relative -tracking-[0.01em] max-md:basis-[95.53%] max-md:grow-0 max-md:shrink-0 aspect-386/600 flex! flex-col justify-end rounded-[20px] overflow-hidden p-5 space-y-5`}
							>
								<Image fill alt="" src={slide.image} />
								<h3 className="font-medium text-[17px] relative">{slide.cap}</h3>
								<div className="font-helvetica text-[15px] relative">{slide.descr}</div>
								<a
									href="#"
									className={`inline-flex ${slide.theme ? "hover:text-white" : "hover:text-foreground"} self-start transition-colors duration-300 items-center gap-1 text-[15px] font-medium text-brand-blue group relative`}
								>
									Узнать больше
									<RightArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
								</a>
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				<div ref={navRef}>
					<SliderNavigation
						className="justify-end mt-10"
						setPrev={setPrevEl}
						setNext={setNextEl}
					/>
				</div>

			</div>
		</section>
	)
}