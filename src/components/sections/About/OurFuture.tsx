"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import "swiper/css"

import { Title } from "@/components/UI/Title"
import { SliderNavigation } from "@/components/UI/SliderNavigation"
import { ourFutureList } from "@/data/ourFuture"

gsap.registerPlugin(ScrollTrigger)

export default function OurFuture() {
	const [isDesktop, setIsDesktop] = useState(false)
	const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null)
	const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null)

	const sectionRef = useRef<HTMLElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)
	const sliderRef = useRef<HTMLDivElement>(null)
	const navRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		setIsDesktop(window.innerWidth >= 1024)
	}, [])

	useEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 75%",
				},
			})

			tl.from(titleRef.current, {
				y: 40,
				opacity: 0,
				duration: 0.6,
				ease: "power2.out",
			})
				.from(
					sliderRef.current,
					{
						y: 50,
						opacity: 0,
						duration: 0.7,
						ease: "power2.out",
					},
					"-=0.2"
				)
				.from(
					navRef.current,
					{
						y: 30,
						opacity: 0,
						duration: 0.5,
						ease: "power2.out",
					},
					"-=0.3"
				)
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="py-22.5 overflow-hidden">
			<div className="max-w-308 mx-auto px-4">
				<div ref={titleRef} className="mb-10">
					<Title className="sm:tracking-[0em]">
						Будущее нашей компании
					</Title>
				</div>

				<div ref={sliderRef}>
					<Swiper
						modules={[Navigation]}
						breakpoints={{
							320: { slidesPerView: 1, spaceBetween: 16 },
							768: { slidesPerView: 2, spaceBetween: 20 },
							1024: { slidesPerView: 3, spaceBetween: 40 },
						}}
						navigation={{
							prevEl,
							nextEl,
						}}
						className="overflow-visible!"
					>
						{isDesktop && (
							<SwiperSlide className="flex-none mr-4 md:mr-5 lg:mr-10">
								<div className="font-bold flex items-center justify-center q-tight text-[32px] text-[#acacac] aspect-375/465 rounded-[20px] bg-[#ededed] p-20">
									<span className="max-w-40 text-center">Дальше больше...</span>
								</div>
							</SwiperSlide>
						)}

						{ourFutureList.map((item, index) => (
							<SwiperSlide key={index} className="flex-none mr-4 md:mr-5 lg:mr-10">
								<div className="relative aspect-375/465 rounded-[20px] overflow-hidden mb-4 bg-brand-gray">
									<Image
										src={item.src}
										alt={item.title}
										fill
										className="object-cover"
										draggable={false}
									/>
								</div>

								<h3 className="text-[17px] font-medium mb-2">{item.title}</h3>
								<p className="text-[15px] leading-snug font-helvetica text-brand-gray">
									{item.description}
								</p>
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				<div ref={navRef}>
					<SliderNavigation
						className="justify-end mt-14"
						setPrev={setPrevEl}
						setNext={setNextEl}
					/>
				</div>
			</div>
		</section>
	)
}
