"use client";

import { Title } from "@/components/UI/Title";
import { SliderNavigation } from "@/components/UI/SliderNavigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import { RightArrowIcon } from "@/icons/RightArrowIcon";
import Image from "next/image";
import { useState, useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function CurtainsTypes() {
	const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null)
	const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null)

	const sectionRef = useRef<HTMLElement | null>(null)
	const titleRef = useRef<HTMLDivElement | null>(null)
	const cardsRef = useRef<HTMLUListElement | null>(null)
	const mobileSliderRef = useRef<HTMLDivElement | null>(null)
	const mobileNavRef = useRef<HTMLDivElement | null>(null)
	const bottomBoxRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!sectionRef.current) return

		const ctx = gsap.context(() => {
			gsap.set(
				[
					titleRef.current,
					cardsRef.current,
					mobileSliderRef.current,
					mobileNavRef.current,
					bottomBoxRef.current,
				],
				{
					opacity: 0,
					y: 40,
				}
			)

			const mm = gsap.matchMedia()

			mm.add("(min-width: 1024px)", () => {
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
					.to(cardsRef.current, {
						opacity: 1,
						y: 0,
						duration: 0.65,
						ease: "power2.out",
					}, "-=0.3")
					.to(bottomBoxRef.current, {
						opacity: 1,
						y: 0,
						duration: 0.6,
						ease: "power2.out",
					}, "-=0.3")
			})

			mm.add("(max-width: 1023px)", () => {
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
					.to(mobileSliderRef.current, {
						opacity: 1,
						y: 0,
						duration: 0.65,
						ease: "power2.out",
					}, "-=0.3")
					.to(mobileNavRef.current, {
						opacity: 1,
						y: 0,
						duration: 0.5,
						ease: "power2.out",
					}, "-=0.35")
					.to(bottomBoxRef.current, {
						opacity: 1,
						y: 0,
						duration: 0.6,
						ease: "power2.out",
					}, "-=0.2")
			})

			return () => mm.revert()
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="pb-22.5 pt-22.5 lg:pb-30 overflow-hidden">
			<div className="max-w-308 mx-auto px-4">
				<div
					ref={titleRef}
					className="mb-6 md:mb-8 lg:mb-10 justify-between lg:flex lg:items-end lg:gap-10"
				>
					<Title>Типы штор</Title>
					<a href="#" className="lg:inline-flex tracking-[-0.01e] hidden items-center gap-1 text-[15px] text-brand-blue group">
						Узнать больше про шторы
						<RightArrowIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
					</a>
				</div>

				<ul ref={cardsRef} className="hidden mb-10 lg:grid grid-cols-3 gap-5">
					<li className="flex flex-col tracking-[-0.01em] p-5 rounded-[20px] overflow-hidden relative aspect-387/600">
						<Image
							src='/images/curtains-page/types/1.jpg'
							fill
							alt="Раздвижные шторы"
							className="object-cover"
						/>
						<div className="mt-auto max-w-[68%]">
							<h3 className="relative font-medium text-[17px] mb-2">Раздвижные шторы</h3>
							<p className="relative text-[15px] font-helvetica">Классический и самый распространенный вариант. Перемещаются с помощью электропривода и каретки с петлями.</p>
						</div>
					</li>
					<li className="flex flex-col tracking-[-0.01em] p-5 rounded-[20px] overflow-hidden relative aspect-387/600">
						<Image
							src='/images/curtains-page/types/2.jpg'
							fill
							alt="Подъемные шторы"
							className="object-cover"
						/>
						<div className="mt-auto">
							<h3 className="relative font-medium text-[17px] mb-2">Подъемные шторы</h3>
							<p className="relative text-[15px] font-helvetica">Используется для освещения отдельной зоны и решения отдельных задач.</p>
						</div>
					</li>
					<li className="flex flex-col tracking-[-0.01em] p-5 rounded-[20px] overflow-hidden relative aspect-387/600">
						<Image
							src='/images/curtains-page/types/3.jpg'
							fill
							alt="Рулонные"
							className="object-cover"
						/>
						<div className="mt-auto">
							<h3 className="relative font-medium text-[17px] mb-2">Рулонные</h3>
							<p className="relative text-[15px] font-helvetica">Используется для создания приятной атмосферы и подчеркивают дизайн.</p>
						</div>
					</li>
				</ul>

				<div className="lg:hidden">
					<div ref={mobileSliderRef}>
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
							<SwiperSlide className="tracking-[-0.01em] flex! flex-col p-5 rounded-[20px] overflow-hidden relative aspect-342/540">
								<Image
									src='/images/curtains-page/types/1.jpg'
									fill
									alt="Раздвижные шторы"
									className="object-cover"
								/>
								<div className="mt-auto max-w-[68%]">
									<h3 className="relative font-medium text-[17px] mb-2">Раздвижные шторы</h3>
									<p className="relative text-[15px] font-helvetica">Классический и самый распространенный вариант. Перемещаются с помощью электропривода и каретки с петлями.</p>
								</div>
							</SwiperSlide>
							<SwiperSlide className="tracking-[-0.01em] flex! flex-col p-5 rounded-[20px] overflow-hidden relative aspect-342/540">
								<Image
									src='/images/curtains-page/types/2.jpg'
									fill
									alt="Подъемные шторы"
									className="object-cover"
								/>
								<div className="mt-auto">
									<h3 className="relative font-medium text-[17px] mb-2">Подъемные шторы</h3>
									<p className="relative text-[15px] font-helvetica">Используется для освещения отдельной зоны и решения отдельных задач.</p>
								</div>
							</SwiperSlide>
							<SwiperSlide className="tracking-[-0.01em] flex! flex-col p-5 rounded-[20px] overflow-hidden relative aspect-342/540">
								<Image
									src='/images/curtains-page/types/3.jpg'
									fill
									alt="Рулонные"
									className="object-cover"
								/>
								<div className="mt-auto">
									<h3 className="relative font-medium text-[17px] mb-2">Рулонные</h3>
									<p className="relative text-[15px] font-helvetica">Используется для создания приятной атмосферы и подчеркивают дизайн.</p>
								</div>
							</SwiperSlide>
						</Swiper>
					</div>

					<div ref={mobileNavRef}>
						<SliderNavigation className="justify-end mt-6" setPrev={setPrevEl} setNext={setNextEl} />
					</div>
				</div>

				<div
					ref={bottomBoxRef}
					className="bg-white rounded-[20px] px-4 lg:px-6 py-10 flex flex-col items-center text-center"
				>
					<Image
						src="/images/curtains-page/types/icon.svg"
						width={64}
						height={64}
						alt=""
						className="mb-10 lg:mb-6"
					/>
					<div className="max-w-207.5 font-semibold text-[17px] leading-snug tracking-[-0.01em]">
						<p>Работает система за счет электропривода, который вмонтирован в карниз.
							Помимо стандартного открытия и закрытия, в системе умный дом есть возможность настройки определенного положения ламелей для пропуска строго определенного количества света.</p>
					</div>
				</div>
			</div>
		</section>
	)
}