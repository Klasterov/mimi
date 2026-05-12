"use client"

import Image from "next/image"
import { Title } from "../../UI/Title"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function ForAgenciesYouGet() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const titleRef = useRef<HTMLDivElement | null>(null)
	const listRef = useRef<HTMLUListElement | null>(null)

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger)

		const ctx = gsap.context(() => {
			const cards = listRef.current?.querySelectorAll(".js-you-get-card")

			if (!cards?.length) return

			gsap.set(titleRef.current, {
				opacity: 0,
				y: 28,
				filter: "blur(6px)"
			})

			gsap.set(cards, {
				opacity: 0,
				y: 36,
				filter: "blur(8px)"
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
		<section ref={sectionRef} className="py-22.5 lg:py-30">
			<div className="max-w-235.5 px-4 mx-auto">
				<div ref={titleRef}>
					<Title className="mb-10 text-center">Вы получите</Title>
				</div>

				<ul ref={listRef} className="grid md:grid-cols-2 gap-5">
					<li className="js-you-get-card rounded-2xl md:col-span-2 overflow-hidden relative p-6 lg:px-15 lg:py-9.25 flex md:items-center items-end text-white min-h-125 will-change-transform">
						<Image
							src="/images/for-agencies-page/you-get/1.jpg"
							fill
							alt=""
							className="object-cover"
						/>
						<h3 className="font-semibold text-[22px] md:text-[28px] lg:text-[32px] p-6 rounded-2xl md:max-w-74 bg-black/10 backdrop-blur-[6px] relative leading-[1.3] -tracking-[0.01em]">
							Шоурум
							как&nbsp;лид-магнит
						</h3>
					</li>

					<li className="js-you-get-card rounded-2xl bg-brand-blue overflow-hidden p-6 lg:px-15 lg:py-9.25 flex flex-col justify-end items-center text-white min-h-125 md:min-h-150 gap-45 will-change-transform">
						<Image
							src="/images/for-agencies-page/you-get/2.svg"
							width={170}
							height={170}
							alt=""
						/>
						<h3 className="font-semibold text-[22px] self-start md:text-[28px] lg:text-[32px] rounded-2xl relative leading-[1.3] -tracking-[0.01em]">
							Расчёт за 24–48 ч
						</h3>
					</li>

					<li className="js-you-get-card rounded-2xl bg-white max-md:p-6 overflow-hidden flex flex-col items-center min-h-125 md:min-h-150 gap-17.5 will-change-transform">
						<h3 className="md:px-15 md:pt-9.25 self-start font-semibold text-[22px] md:text-[28px] lg:text-[32px] rounded-2xl relative leading-[1.3] -tracking-[0.01em]">
							Материалы
						</h3>
						<Image
							src="/images/for-agencies-page/you-get/3.png"
							width={445}
							height={359}
							alt=""
						/>
					</li>

					<li className="js-you-get-card max-md:max-h-125 rounded-2xl md:col-span-2 md:pl-5 lg:pl-15 flex items-center justify-between overflow-hidden -tracking-[0.01em] text-white gap-5 max-md:flex-col min-h-125 bg-linear-to-l from-[#658f8a] via-[#385c57] to-[#1d4640] will-change-transform">
						<div className="md:max-w-69 max-md:p-6">
							<h3 className="mb-6 font-semibold text-[22px] md:text-[28px] lg:text-[32px] rounded-2xl relative leading-[1.3]">
								Сопровождение
							</h3>
							<div className="font-helvetica text-[15px]">
								Мы и производители и интеграторы. Это значит, что мы разбираемся в том, что продаем, как это правильно монтируется и настраивается.
							</div>
						</div>
						<div className="relative w-full md:w-107.5 grow-0 shrink-0 aspect-square md:aspect-430/500">
							<Image
								src="/images/for-agencies-page/you-get/4.png"
								fill
								alt=""
								className="object-cover max-md:hidden"
								quality={95}
							/>
							<Image
								src="/images/for-agencies-page/you-get/4-mob.png"
								fill
								alt=""
								className="object-cover md:hidden"
								quality={95}
							/>
						</div>
					</li>
				</ul>
			</div>
		</section>
	)
}