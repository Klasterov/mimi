"use client"

import { Title } from "@/components/UI/Title"
import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function AirConditioningSolutions() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const headingRef = useRef<HTMLDivElement | null>(null)
	const cardsRef = useRef<(HTMLLIElement | null)[]>([])

	useEffect(() => {
		if (!sectionRef.current) return

		const ctx = gsap.context(() => {
			const cards = cardsRef.current.filter(Boolean) as HTMLLIElement[]

			gsap.set(headingRef.current, {
				y: 60,
				opacity: 0,
				filter: "blur(8px)",
				force3D: true,
			})

			gsap.set(cards, {
				y: 80,
				opacity: 0,
				scale: 0.965,
				filter: "blur(10px)",
				force3D: true,
			})

			gsap.to(headingRef.current, {
				y: 0,
				opacity: 1,
				filter: "blur(0px)",
				ease: "power2.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 78%",
					end: "top 52%",
					scrub: 1,
				},
			})

			cards.forEach((card, index) => {
				gsap.to(card, {
					y: 0,
					opacity: 1,
					scale: 1,
					filter: "blur(0px)",
					ease: "power2.out",
					scrollTrigger: {
						trigger: card,
						start: "top 88%",
						end: "top 55%",
						scrub: 1,
					},
					delay: index * 0.04,
				})
			})
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="py-30 overflow-hidden">
			<div className="max-w-235.5 px-4 mx-auto">
				<div ref={headingRef} className="will-change-transform">
					<Title className="mb-15 text-center">Полезное решение</Title>
				</div>

				<ul className="grid gap-4 md:gap-5 md:grid-cols-2">
					<li
						ref={el => {
							cardsRef.current[0] = el
						}}
						className="flex max-md:flex-col gap-10 bg-linear-to-b from-[#99e1ff] to-white md:pr-10 lg:pr-20 max-md:p-6 md:pl-3 items-center overflow-hidden min-h-125 md:col-span-2 rounded-3xl bg-white -tracking-[0.01em] will-change-transform"
					>
						<div className="md:min-w-97">
							<Image
								src="/images/air-conditioning-page/solutions/1.png"
								width={388}
								height={388}
								alt=""
							/>
						</div>
						<div className="max-w-95">
							<h3 className="mb-6 font-semibold text-[22px] md:text-[28px] lg:text-[32px]">
								Здоровье.
							</h3>
							<div className="font-helvetica text-[17px] leading-[1.3]">
								Чистый, увлажненный и свежий воздух в доме – залог хорошего самочувствия, крепкого сна и продуктивной работы.
							</div>
						</div>
					</li>

					<li
						ref={el => {
							cardsRef.current[1] = el
						}}
						className="flex flex-col max-md:p-6 md:px-15 md:py-9.25 items-center overflow-hidden min-h-125 md:min-h-150 rounded-3xl bg-white -tracking-[0.01em] will-change-transform"
					>
						<div>
							<Image
								src="/images/air-conditioning-page/solutions/2.png"
								width={325}
								height={376}
								alt=""
							/>
						</div>
						<div>
							<h3 className="mb-6 font-semibold text-[22px] md:text-[28px] lg:text-[32px]">
								Функциональность.
							</h3>
							<div className="font-helvetica text-[17px] leading-[1.3]">
								Помимо установки кондиционеров компания MiMismart занимается отоплением, водоснабжением, вентиляцией, освещением и охраной.
							</div>
						</div>
					</li>

					<li
						ref={el => {
							cardsRef.current[2] = el
						}}
						className="flex flex-col-reverse max-md:p-6 md:px-15 md:py-9.25 items-center overflow-hidden min-h-125 md:min-h-150 rounded-3xl bg-white -tracking-[0.01em] will-change-transform"
					>
						<div>
							<Image
								src="/images/air-conditioning-page/solutions/3.png"
								width={325}
								height={376}
								alt=""
							/>
						</div>
						<div>
							<h3 className="mb-6 font-semibold text-[22px] md:text-[28px] lg:text-[32px]">
								Экономичность.
							</h3>
							<div className="font-helvetica text-[17px] leading-[1.3]">
								Система вентиляции срабатывает при необходимости или по запросу. Остальное время она находится в энергосберегающем режиме.
							</div>
						</div>
					</li>

					<li
						ref={el => {
							cardsRef.current[3] = el
						}}
						className="flex max-md:p-6 md:pr-10 max-md:flex-col lg:pr-20 md:pl-5 lg:pl-12.5 gap-10 items-center overflow-hidden min-h-125 md:col-span-2 rounded-3xl bg-white -tracking-[0.01em] will-change-transform"
					>
						<div className="max-md:-mt-6 self-start md:min-w-87.25">
							<Image
								src="/images/air-conditioning-page/solutions/4.png"
								width={349}
								height={479}
								alt=""
							/>
						</div>
						<div className="max-w-95">
							<h3 className="mb-6 font-semibold text-[22px] md:text-[28px] lg:text-[32px]">
								Безопасность.
							</h3>
							<div className="font-helvetica text-[17px] leading-[1.3]">
								При возникновении нештатной ситуации вам на телефон придет оповещение о проблеме. Для защиты от взлома предусмотрен 16-значный пароль из цифр и букв.
							</div>
						</div>
					</li>
				</ul>
			</div>
		</section>
	)
}