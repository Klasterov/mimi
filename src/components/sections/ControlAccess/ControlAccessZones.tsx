"use client"

import { SliderNavigation } from "@/components/UI/SliderNavigation"
import { Title } from "@/components/UI/Title"
import Image from "next/image"
import { useLayoutEffect, useRef, useState } from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"

import gsap from "gsap"

type SlideProps = {
	image: string
	cap: string
	descr: string
}

type Props = {
	title: string
	titleOnMobile?: string
	slides: SlideProps[]
}

export default function ControlAccessZones({ title, titleOnMobile, slides }: Props) {
	const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null)
	const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null)

	const sectionRef = useRef<HTMLElement | null>(null)
	const titleRef = useRef<HTMLDivElement | null>(null)
	const sliderRef = useRef<HTMLDivElement | null>(null)
	const navRef = useRef<HTMLDivElement | null>(null)

	useLayoutEffect(() => {
		if (!titleRef.current || !sliderRef.current || !navRef.current) return

		const ctx = gsap.context(() => {
			gsap.to(titleRef.current, {
				opacity: 1,
				y: 0,
				duration: 0.7,
				ease: "power3.out",
			})

			gsap.to(sliderRef.current, {
				opacity: 1,
				y: 0,
				duration: 0.8,
				ease: "power3.out",
				delay: 0.12,
			})

			gsap.to(navRef.current, {
				opacity: 1,
				y: 0,
				duration: 0.65,
				ease: "power3.out",
				delay: 0.24,
			})
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="pt-22.5 lg:pt-30 pb-22.5 overflow-hidden">
			<div className="max-w-308 px-4 mx-auto">
				<div ref={titleRef} className="opacity-0 translate-y-6">
					{titleOnMobile ? (
						<>
							<Title className="mb-10 max-lg:hidden">{title}</Title>
							<Title className="mb-10 lg:hidden">{titleOnMobile}</Title>
						</>
					) : (
						<Title className="mb-10">{title}</Title>
					)}
				</div>

				<div ref={sliderRef} className="opacity-0 translate-y-6">
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
								className="relative -tracking-[0.01em] max-md:basis-[95.53%] max-md:grow-0 max-md:shrink-0 aspect-386/540 flex! flex-col justify-end rounded-[20px] overflow-hidden py-6 lg:py-7 px-4 lg:px-6 space-y-2"
							>
								<Image fill alt="" src={slide.image} />
								<h3 className="font-medium text-[17px] relative text-white">{slide.cap}</h3>
								<div className="font-helvetica text-[15px] relative text-[#acacac]">
									{slide.descr}
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				<div ref={navRef} className="opacity-0 translate-y-6">
					<SliderNavigation className="justify-end mt-10" setPrev={setPrevEl} setNext={setNextEl} />
				</div>
			</div>
		</section>
	)
}