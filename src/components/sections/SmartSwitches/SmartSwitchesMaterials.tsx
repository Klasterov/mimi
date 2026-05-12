"use client"

import { SliderNavigation } from "@/components/UI/SliderNavigation"
import { Title } from "@/components/UI/Title"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const slides = [
	{
		image: "/images/smart-switches-page/materials/1.jpg",
		cap: "Металл",
		descr: "Органично сочетаются с техникой, мебельной фурнитурой и современными интерьерными решениями.",
	},
	{
		image: "/images/smart-switches-page/materials/2.jpg",
		cap: "Стекло",
		descr: "Подходит для светлых и минималистичных интерьеров, где важна чистота форм и визуальная лёгкость",
		theme: "dark"
	},
	{
		image: "/images/smart-switches-page/materials/3.jpg",
		cap: "Камень",
		descr: "Позволяют встроить розетки и выключатели в стены и панели без визуального шума",
	},
]

export default function SmartSwitchesMaterials() {
	const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null)
	const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null)

	const sectionRef = useRef<HTMLElement | null>(null)
	const titleRef = useRef<HTMLDivElement | null>(null)
	const slidesWrapRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger)

		const ctx = gsap.context(() => {
			const cards = slidesWrapRef.current?.querySelectorAll(".js-material-card")

			if (!cards?.length) return

			gsap.set(titleRef.current, {
				opacity: 0,
				y: 32,
				filter: "blur(8px)"
			})

			gsap.set(cards, {
				opacity: 0,
				y: 40,
				filter: "blur(10px)"
			})

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 72%",
					toggleActions: "play none none none"
				}
			})

			tl.to(titleRef.current, {
				opacity: 1,
				y: 0,
				filter: "blur(0px)",
				duration: 0.9,
				ease: "power3.out"
			}).to(
				cards,
				{
					opacity: 1,
					y: 0,
					filter: "blur(0px)",
					duration: 0.95,
					stagger: 0.12,
					ease: "power3.out"
				},
				"-=0.45"
			)
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="py-22.5 lg:py-30 overflow-hidden">
			<div className="max-w-308 px-4 mx-auto">
				<div ref={titleRef}>
					<Title className="mb-10">Дизайн и материалы</Title>
				</div>

				<div ref={slidesWrapRef}>
					<Swiper
						modules={[Navigation]}
						navigation={{ prevEl, nextEl }}
						className="overflow-visible!"
						breakpoints={{
							0: {
								spaceBetween: 16,
								slidesPerView: "auto",
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
								className="js-material-card relative p-6 aspect-380/540 flex! rounded-[20px] overflow-hidden flex-col justify-end will-change-transform"
							>
								<Image
									fill
									alt=""
									src={slide.image}
									quality={95}
								/>
								<h3 className={`${slide.theme !== "dark" && "text-white"} font-medium mb-2 text-[17px] relative`}>
									{slide.cap}
								</h3>
								<div className={`${slide.theme === "dark" ? "text-brand-gray" : "text-white/60"} font-helvetica text-[15px] relative text-[#acacac]`}>
									{slide.descr}
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				<SliderNavigation className="justify-end mt-10" setPrev={setPrevEl} setNext={setNextEl} />
			</div>
		</section>
	)
}