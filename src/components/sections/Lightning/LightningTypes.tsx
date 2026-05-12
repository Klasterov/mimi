"use client"

import { Title } from "@/components/UI/Title"
import { SliderNavigation } from "@/components/UI/SliderNavigation"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"

import { useState, useRef, useLayoutEffect } from "react"
import Image from "next/image"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function LightningTypes() {
	const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null)
	const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null)

	const sectionRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(".light-item", {
				y: 80,
				opacity: 0,
				duration: 1,
				ease: "power3.out",
				stagger: 0.2,
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
				},
			})
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="lg:py-22.5 md:py-16 py-10 overflow-hidden">
			<div className="max-w-308 mx-auto px-4">

				<Title className="md:max-w-none max-w-[80%] mb-6 md:mb-8 lg:mb-10">
					Типы освещения
				</Title>

				<ul className="hidden mb-10 lg:grid grid-cols-3 gap-5 text-white">

					<li className="light-item flex flex-col tracking-[-0.01em] p-5 rounded-[20px] overflow-hidden relative aspect-387/600">
						<Image
							quality={95}
							src="/images/lightning-page/types/1.jpg"
							fill
							alt="Общий свет"
							className="object-cover"
						/>
						<div className="mt-auto">
							<h3 className="relative font-medium text-[17px] mb-2">
								Общий свет
							</h3>
							<p className="relative text-[15px] font-helvetica">
								Это главный источник света в помещении, который заполняет все пространство.
							</p>
						</div>
					</li>

					<li className="light-item flex flex-col tracking-[-0.01em] p-5 rounded-[20px] overflow-hidden relative aspect-387/600">
						<Image
							quality={95}
							src="/images/lightning-page/types/2.jpg"
							fill
							alt="Локальное освещение"
							className="object-cover"
						/>
						<div className="mt-auto">
							<h3 className="relative font-medium text-[17px] mb-2">
								Локальное освещение
							</h3>
							<p className="relative text-[15px] font-helvetica">
								Используется для освещения отдельной зоны и решения отдельных задач.
							</p>
						</div>
					</li>

					<li className="light-item flex flex-col tracking-[-0.01em] p-5 rounded-[20px] overflow-hidden relative aspect-387/600">
						<Image
							quality={95}
							src="/images/lightning-page/types/3.jpg"
							fill
							alt="Декоративное освещение"
							className="object-cover"
						/>
						<div className="mt-auto">
							<h3 className="relative font-medium text-[17px] mb-2">
								Декоративное освещение
							</h3>
							<p className="relative text-[15px] font-helvetica">
								Используется для создания приятной атмосферы и подчеркивают дизайн.
							</p>
						</div>
					</li>

				</ul>

				<div className="lg:hidden mb-22.5">
					<Swiper
						modules={[Navigation]}
						breakpoints={{
							320: {
								slidesPerView: 1,
								spaceBetween: 16,
							},
							768: {
								slidesPerView: 2,
								spaceBetween: 20,
							},
						}}
						navigation={{
							prevEl: prevEl,
							nextEl: nextEl,
						}}
						className="overflow-visible!"
					>

						<SwiperSlide className="light-item tracking-[-0.01em] flex! flex-col p-5 rounded-[20px] overflow-hidden relative aspect-342/540">
							<Image
								src="/images/lightning-page/types/1.jpg"
								fill
								alt="Общий свет"
								className="object-cover"
							/>
							<div className="mt-auto">
								<h3 className="relative font-medium text-[17px] mb-2">
									Общий свет
								</h3>
								<p className="relative text-[15px] font-helvetica">
									Это главный источник света в помещении, который заполняет все пространство.
								</p>
							</div>
						</SwiperSlide>

						<SwiperSlide className="light-item tracking-[-0.01em] flex! flex-col p-5 rounded-[20px] overflow-hidden relative aspect-342/540">
							<Image
								src="/images/lightning-page/types/2.jpg"
								fill
								alt="Локальное освещение"
								className="object-cover"
							/>
							<div className="mt-auto">
								<h3 className="relative font-medium text-[17px] mb-2">
									Локальное освещение
								</h3>
								<p className="relative text-[15px] font-helvetica">
									Используется для освещения отдельной зоны и решения отдельных задач.
								</p>
							</div>
						</SwiperSlide>

						<SwiperSlide className="light-item tracking-[-0.01em] flex! flex-col p-5 rounded-[20px] overflow-hidden relative aspect-342/540">
							<Image
								src="/images/lightning-page/types/3.jpg"
								fill
								alt="Декоративное освещение"
								className="object-cover"
							/>
							<div className="mt-auto">
								<h3 className="relative font-medium text-[17px] mb-2">
									Декоративное освещение
								</h3>
								<p className="relative text-[15px] font-helvetica">
									Используется для создания приятной атмосферы и подчеркивают дизайн.
								</p>
							</div>
						</SwiperSlide>

					</Swiper>

					<SliderNavigation
						className="justify-end mt-6"
						setPrev={setPrevEl}
						setNext={setNextEl}
					/>

				</div>
			</div>
		</section>
	)
}