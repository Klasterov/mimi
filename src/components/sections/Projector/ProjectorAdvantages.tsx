"use client"

import { SliderNavigation } from "@/components/UI/SliderNavigation"
import { Title } from "@/components/UI/Title"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const slides = [
	{
		image: '/images/projector-page/advantages/1.jpg',
		cap: 'Большая диагональ.',
		descr: 'Отправляйте голосовые оповещения в любую комнату, просто произнеся сообщение в телефон. Например, позовите детей к столу, когда они заигрались в детской.',
	},
	{
		image: '/images/projector-page/advantages/2.jpg',
		cap: 'Эффект погружения.',
		descr: 'Отправляйте голосовые оповещения в любую комнату, просто произнеся сообщение в телефон. Например, позовите детей к столу, когда они заигрались в детской.',
	},
]

export default function ProjectorAdvantages() {

	const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null)
	const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null)

	const sectionRef = useRef<HTMLElement | null>(null)
	const titleRef = useRef<HTMLDivElement | null>(null)
	const sliderRef = useRef<HTMLDivElement | null>(null)
	const navRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!sectionRef.current) return

		const ctx = gsap.context(() => {
			// сразу задаём initial state (чтобы не мигало)
			gsap.set([titleRef.current, sliderRef.current, navRef.current], {
				opacity: 0,
				y: 40,
			})

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
				}
			})

			tl.to(titleRef.current, {
				opacity: 1,
				y: 0,
				duration: 0.6,
				ease: "power2.out",
			})
				.to(sliderRef.current, {
					opacity: 1,
					y: 0,
					duration: 0.6,
					ease: "power2.out",
				}, "-=0.3")
				.to(navRef.current, {
					opacity: 1,
					y: 0,
					duration: 0.5,
					ease: "power2.out",
				}, "-=0.3")

		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="pt-10 md:pt-22.5 lg:pt-30 pb-22.5 lg:pb-30 overflow-hidden">
			<div className="max-w-308 px-4 mx-auto">

				<div ref={titleRef}>
					<Title className="mb-10">Преимущества</Title>
				</div>

				<div ref={sliderRef}>
					<Swiper
						modules={[Navigation]}
						slidesPerView='auto'
						navigation={{ prevEl, nextEl }}
						className="overflow-visible!"
						breakpoints={{
							0: { spaceBetween: 16 },
							1024: { spaceBetween: 20 },
						}}
					>
						{slides.map((slide, i) => (
							<SwiperSlide
								key={i}
								className="grow-0 shrink-0 basis-[95.53%] sm:basis-full lg:basis-200 leading-[1.4] -tracking-[0.01em]"
							>
								<div className="relative aspect-800/540 rounded-3xl overflow-hidden mb-4 lg:mb-5 bg-black">
									<Image fill alt={slide.cap} src={slide.image} />
								</div>
								<h3 className="mb-2 lg:mb-1 font-semibold">{slide.cap}</h3>
								<div className="font-helvetica text-brand-gray">{slide.descr}</div>
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