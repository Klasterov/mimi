"use client"

import { SliderNavigation } from "@/components/UI/SliderNavigation";
import { Title } from "@/components/UI/Title";
import Image from "next/image";
import { useState, useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'

export const slides = [
	{
		title: "Матовый",
		description: "Для затемнённых комнат: равномерная картинка и широкий угол обзора, естественные цвета.",
		src: "/images/projector-page/types/1.jpg",
	},
	{
		title: "ALR",
		description: "Для помещений с внешним светом сбоку/сверху: экран подавляет засвет и сохраняет контраст.",
		src: "/images/projector-page/types/2.jpg",
	},
	{
		title: "CLR",
		description: "Специально для ультракороткофокусных проекторов: отсекает свет с потолка, даёт контраст даже днём при установке близко к стене.",
		src: "/images/projector-page/types/3.jpg",
	},
];

export default function ProjectorTypes() {
	const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null)
	const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null)

	const sectionRef = useRef<HTMLElement | null>(null)
	const titleRef = useRef<HTMLDivElement | null>(null)
	const sliderRef = useRef<HTMLDivElement | null>(null)
	const navRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!sectionRef.current) return

		const ctx = gsap.context(() => {
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
		<section ref={sectionRef} className="pt-22.5 lg:pt-30 pb-22.5 overflow-hidden">
			<div className="max-w-308 lg:max-w-238 mx-auto px-4">
				<div ref={titleRef}>
					<Title className="mb-10">Тип экрана</Title>
				</div>

				<div ref={sliderRef}>
					<Swiper
						modules={[Navigation]}
						navigation={{
							prevEl: prevEl,
							nextEl: nextEl,
						}}
						breakpoints={{
							320: {
								slidesPerView: 1,
								spaceBetween: 16,
							},
							768: {
								slidesPerView: 2,
								spaceBetween: 20,
							},
							1024: {
								slidesPerView: 2,
								spaceBetween: 40,
							},
						}}
						className="overflow-visible!"
					>
						{slides.map((item, index) => (
							<SwiperSlide
								key={index}
								className="mr-4 md:mr-5 lg:mr-10"
							>
								<a href="" className="relative block -tracking-[0.01em] aspect-11/10 rounded-[20px] overflow-hidden mb-4 bg-brand-gray">
									<Image
										src={item.src}
										alt={item.title}
										fill
										className="object-cover"
										draggable={false}
										quality={95}
									/>
								</a>

								<h3 className="inline-block text-[24px] font-bold mb-2 bg-linear-to-r from-[#fec78e] via-[#f77b2e] to-[#bc3e03] bg-clip-text text-transparent">
									{item.title}
								</h3>
								<p className="leading-snug text-[15px] text-brand-gray font-helvetica">
									{item.description}
								</p>
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