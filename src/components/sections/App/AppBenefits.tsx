"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { contacts } from "@/config/contacts"
import ArrowLink from "@/components/UI/ArrowLink"

gsap.registerPlugin(ScrollTrigger)

export default function AppBenefits() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const titleFirstRef = useRef<HTMLSpanElement | null>(null)
	const titleSecondRef = useRef<HTMLSpanElement | null>(null)
	const cardsRef = useRef<(HTMLLIElement | null)[]>([])

	useEffect(() => {
		if (!sectionRef.current) return

		const ctx = gsap.context(() => {
			const cards = cardsRef.current.filter(Boolean) as HTMLLIElement[]

			gsap.set([titleFirstRef.current, titleSecondRef.current], {
				yPercent: 100,
				opacity: 0,
				rotateX: -20,
				transformOrigin: "50% 100%",
				force3D: true,
			})

			gsap.set(cards, {
				y: 80,
				opacity: 0,
				scale: 0.96,
				filter: "blur(10px)",
				force3D: true,
			})

			const titleTl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 78%",
					end: "top 42%",
					scrub: 1.1,
				},
			})

			titleTl
				.to(titleFirstRef.current, {
					yPercent: 0,
					opacity: 1,
					rotateX: 0,
					ease: "power2.out",
					duration: 1,
				})
				.to(
					titleSecondRef.current,
					{
						yPercent: 0,
						opacity: 1,
						rotateX: 0,
						ease: "power2.out",
						duration: 1,
					},
					0.3
				)

			cards.forEach((card, i) => {
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
					delay: i * 0.03,
				})
			})
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="pb-22.5 pt-15 lg:pt-7.5 overflow-hidden">
			<div className="max-w-235.5 px-4 mx-auto relative">
				<h2 className="mb-10 font-bold text-[40px] md:text-[60px] lg:text-[80px] xl:text-[100px] leading-[1.2] flex flex-col">
					<span className="overflow-hidden block">
						<span
							ref={titleFirstRef}
							className="block w-fit bg-linear-to-b from-[#7748aa] to-[#535dff] bg-clip-text text-transparent text-[80px] md:text-[120px] lg:text-[160px] xl:text-[200px] will-change-transform"
						>
							Система
						</span>
					</span>
					<span className="overflow-hidden block">
						<span
							ref={titleSecondRef}
							className="block w-fit bg-linear-to-b from-[#7748aa] to-[#535dff] bg-clip-text text-transparent will-change-transform"
						>
							умного дома.
						</span>
					</span>
				</h2>

				<ul className="grid md:grid-cols-2 gap-4 lg:gap-5">
					<li
						ref={el => {
							cardsRef.current[0] = el
						}}
						className="bg-white min-h-125 overflow-hidden rounded-[20px] p-6 md:p-8 lg:p-10 md:col-span-2 md:min-h-100 relative will-change-transform"
					>
						<div className="space-y-4 relative z-10 max-w-82.5">
							<div className="max-md:max-w-8">
								<Image
									src="/images/intercom-system-page/overview/icon-1.svg"
									width={42}
									height={42}
									alt=""
								/>
							</div>
							<h3 className="font-semibold text-[22px] md:text-[28px] lg:text-[32px] leading-[1.3] -tracking-[0.01em]">
								Открывайте ворота
								<br />
								через телефон
								<br />
								в любой точке
							</h3>
							<div className="text-[15px] leading-[1.4] -tracking-[0.01em] font-helvetica">
								Работает без интернета и Bluetooth
							</div>
						</div>
						<div className="absolute right-0 bottom-0 aspect-614/368 w-full md:w-[67.5%]">
							<Image
								src="/images/intercom-system-page/overview/1.png"
								alt=""
								fill
							/>
						</div>
					</li>

					<li
						ref={el => {
							cardsRef.current[1] = el
						}}
						className="bg-white min-h-125 overflow-hidden flex flex-col gap-25 rounded-[20px] p-6 md:p-8 lg:p-10 lg:min-h-150 will-change-transform"
					>
						<div>
							<h3 className="mb-4 font-semibold text-[22px] md:text-[28px] lg:text-[32px] leading-[1.3] -tracking-[0.01em]">
								Дом на ваших устройствах.
							</h3>
							<div className="text-[15px] leading-[1.4] -tracking-[0.01em] font-helvetica">
								iOS, Android, ПК, часы - один аккаунт и синхронизация настроек.
							</div>
						</div>
						<div className="flex flex-col self-center items-center justify-center gap-10">
							{contacts.apps?.map(app => {
								const IconComponent = app.icon

								return (
									<div key={app.label} className="rounded-xl bg-[#fff]/40 backdrop-blur-[12px] py-2 px-4 border border-[rgb(224, 232, 235]/40 flex items-center gap-4">
										<IconComponent className="w-8 h-8 text-foreground" />
										<div className="flex flex-col items-start gap-2">
											<span className="font-bold text-[15px] -tracking-[0.01em]">
												{app.label}
											</span>
											<ArrowLink href={app.href}>Скачать</ArrowLink>
										</div>
									</div>
								)
							})}
						</div>
					</li>

					<li
						ref={el => {
							cardsRef.current[2] = el
						}}
						className="bg-white max-md:max-h-125 max-md:min-h-125 overflow-hidden rounded-[20px] pt-6 px-6 md:px-8 md:pt-8 lg:px-10 lg:pt-10 lg:min-h-150 will-change-transform"
					>
						<div className="mb-15">
							<h3 className="mb-4 font-semibold text-[22px] md:text-[28px] lg:text-[32px] leading-[1.3] -tracking-[0.01em]">
								Следите за безопасностью дома
							</h3>
							<div className="text-[15px] leading-[1.4] -tracking-[0.01em] font-helvetica">
								Работает без интернета и Bluetooth
							</div>
						</div>
						<div>
							<Image
								src="/images/app-page/benefits/3.png"
								alt=""
								width={370}
								height={421}
							/>
						</div>
					</li>

					<li
						ref={el => {
							cardsRef.current[3] = el
						}}
						className="max-md:max-h-125 min-h-125 md:min-h-100 bg-white overflow-hidden rounded-[20px] md:col-span-2 flex max-md:flex-col justify-between gap-5 md:pl-10 will-change-transform"
					>
						<div className="col-span-2 max-md:p-5 md:py-8 lg:py-10 max-w-97.5 space-y-4">
							<Image
								src="/images/intercom-system-page/overview/icon-1.svg"
								width={42}
								height={42}
								alt=""
							/>
							<h3 className="font-semibold text-[22px] md:text-[28px] lg:text-[32px] leading-[1.3] -tracking-[0.01em]">
								Умный дом полностью в одном приложении
							</h3>
							<div className="text-[15px] leading-[1.4] -tracking-[0.01em] font-helvetica">
								Управляйте освещением, климатом и всеми остальными функциями умного дома
							</div>
						</div>
						<div className="max-md:self-end">
							<Image
								src="/images/intercom-system-page/overview/4.png"
								alt=""
								width={371}
								height={401}
							/>
						</div>
					</li>
				</ul>
			</div>
		</section>
	)
}