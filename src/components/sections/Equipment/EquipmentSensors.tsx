"use client"

import { RightArrowIcon } from "@/icons/RightArrowIcon"
import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const cols = [
	{ icon: '/images/equipment-page/sensors/1.svg', iconWidth: 40, iconHeight: 40, text: 'Датчики движения' },
	{ icon: '/images/equipment-page/sensors/2.svg', iconWidth: 40, iconHeight: 40, text: 'Датчики протечки воды' },
	{ icon: '/images/equipment-page/sensors/3.svg', iconWidth: 60, iconHeight: 40, text: 'Датчики влажности воздуха' },
	{ icon: '/images/equipment-page/sensors/4.svg', iconWidth: 40, iconHeight: 40, text: 'Датчики утечки метана' },
	{ icon: '/images/equipment-page/sensors/5.svg', iconWidth: 40, iconHeight: 40, text: 'Датчики уровня освещенности' },
	{ icon: '/images/equipment-page/sensors/6.svg', iconWidth: 40, iconHeight: 40, text: 'Датчики температуры теплого пола' },
]

export default function EquipmentSensors() {
	const sectionRef = useRef<HTMLElement>(null)
	const titleLine1Ref = useRef<HTMLDivElement>(null)
	const titleLine2Ref = useRef<HTMLSpanElement>(null)
	const descriptionRef = useRef<HTMLDivElement>(null)
	const linkRef = useRef<HTMLAnchorElement>(null)
	const bgRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const ctx = gsap.context(() => {

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
				.from(linkRef.current, {
					y: 20,
					opacity: 0,
					duration: 0.5,
					ease: "power2.out"
				}, "-=0.3")

			// Лёгкий параллакс фона (без повторов)
			gsap.fromTo(bgRef.current,
				{ y: -50 },
				{
					y: 50,
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top bottom",
						end: "bottom top",
						scrub: true,
					}
				}
			)

		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="py-22.5 lg:py-27 bg-foreground relative overflow-hidden">

			<div
				ref={bgRef}
				className="absolute top-0 left-1/2 -translate-x-1/2 max-w-full w-360 aspect-1440/1173"
			>
				<Image
					fill
					alt=""
					src="/images/equipment-page/sensors/bg.jpg"
					quality={95}
				/>
			</div>

			<div className="max-w-235.5 mx-auto px-4 tracking-[0.05em] relative">

				<div className="mb-20 md:mb-25 lg:mb-30">
					<div className="text-white font-bold text-[18px] md:text-[24px] lg:text-[32px] leading-tight">
						Датчики
					</div>

					<h2 className="mb-6 font-bold leading-tight flex flex-col">

						<div
							ref={titleLine1Ref}
							className="text-[86px] md:text-[100px] lg:text-[140px] xl:text-[220px] bg-[linear-gradient(180deg,#fff_0%,#516076_100%)] bg-clip-text text-transparent"
						>
							Уют
						</div>

						<span
							ref={titleLine2Ref}
							className="lg:-mt-10 -mt-4 text-[40px] md:text-[60px] lg:text-[80px] xl:text-[100px] bg-[linear-gradient(180deg,#fff_0%,#516076_100%)] bg-clip-text text-transparent"
						>
							в каждой детали вашего дома.
						</span>
					</h2>

					<div
						ref={descriptionRef}
						className="text-[17px] font-helvetica leading-tight max-w-143 mb-4 text-white"
					>
						Умный Дом MiMiSmart ведет статистику и накапливает показания всех датчиков в системе ежесекундно. Все показания вы контролируете в online режиме с приложения.
					</div>

					<a
						ref={linkRef}
						href="#"
						className="inline-flex hover:text-foreground transition-colors duration-300 items-center gap-1 text-[15px] font-medium text-brand-blue group"
					>
						Узнать больше о датчиках
						<RightArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
					</a>
				</div>

				{/* Иконки без анимации */}
				<ul className="text-white font-helvetica -tracking-[0.01em] grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-6 lg:gap-x-8.5 lg:gap-y-8.5">
					{cols.map((col, i) => (
						<li key={i}>
							<Image
								src={col.icon}
								width={col.iconWidth}
								height={col.iconHeight}
								alt=""
								className="mb-4"
							/>
							<p>{col.text}</p>
						</li>
					))}
				</ul>

			</div>
		</section>
	)
}