"use client"

import { useEffect, useRef } from "react"
import { Title } from "@/components/UI/Title"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function GatesControl() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const phoneRef = useRef<HTMLDivElement | null>(null)
	const textRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				phoneRef.current,
				{
					opacity: 0,
					x: -80,
					y: 40,
					scale: 0.96
				},
				{
					opacity: 1,
					x: 0,
					y: 0,
					scale: 1,
					duration: 1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 75%",
						toggleActions: "play none none none"
					}
				}
			)

			gsap.fromTo(
				textRef.current,
				{
					opacity: 0,
					x: 30,
					y: 20
				},
				{
					opacity: 1,
					x: 0,
					y: 0,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 75%",
						toggleActions: "play none none none"
					}
				}
			)
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="py-22.5 overflow-hidden">
			<div className="max-w-308 px-4 mx-auto">
				<div className="mb-10 lg:mb-22.5 flex flex-col items-center text-center">
					<div className="font-bold text-[17px] md:text-[20px] lg:text-[24px] -tracking-[0.01em] text-brand-blue">
						Это удобно
					</div>
					<Title className="mb-10 lg:mb-6">Удаленное управление</Title>
					<div className="max-w-217 text-brand-gray text-[17px] lg:text-[19px] leading-[1.3] -tracking-[0.01em] font-helvetica">
						Где бы вы не находились, по датчику открытия/закрытия, вы всегда можете проверить, в каком положении находятся ворота. Находясь в отъезде, откройте ворота для въезда садовника с инвентарем, проконтролируйте его работу через камеры видеонаблюдения, а после закройте за ним ворота, поставив двор на сигнализацию охраны периметра.
					</div>
				</div>

				<div className="flex max-md:flex-col md:items-center gap-10 md:gap-24 lg:pr-20 justify-between">
					<div
						ref={phoneRef}
						className="md:w-[66.6%] max-md:max-w-110 shrink-0 grow-0 -ml-6 md:-ml-[10%] relative aspect-800/434"
					>
						<Image
							src="/images/gates-page/control/decor.png"
							fill
							alt="телефон"
						/>
					</div>

					<div ref={textRef} className="max-w-86.5">
						<Image
							src="/images/gates-page/control/icon.svg"
							width={54}
							height={54}
							alt=""
							className="mb-6"
						/>
						<div className="font-helvetica text-[17px] leading-[1.4] -tracking-[0.01em] text-brand-gray">
							Управление воротами в умном доме производится через домашнюю сеть WiFi, удаленно через интернет, и как резервный способ - через GSM-канал по звонку на номер вашего Умного дома.
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}