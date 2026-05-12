"use client"

import { Title } from "@/components/UI/Title"
import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function ForDesignersClientGet() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const titleRef = useRef<HTMLDivElement | null>(null)
	const listRef = useRef<HTMLUListElement | null>(null)

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger)

		const ctx = gsap.context(() => {
			const cards = listRef.current?.querySelectorAll(".js-client-card")

			if (!cards?.length) return

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
				duration: 0.8,
				ease: "power3.out"
			}).to(
				cards,
				{
					opacity: 1,
					y: 0,
					duration: 0.9,
					stagger: 0.12,
					ease: "power3.out"
				},
				"-=0.4"
			)
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="py-22.5 lg:py-30">
			<div className="max-w-235.5 px-4 mx-auto">
				<div ref={titleRef} className="opacity-0 translate-y-6">
					<Title className="text-center mb-10">Что получает клиент</Title>
				</div>

				<ul ref={listRef} className="grid md:grid-cols-[42.418%_56.375%] gap-4 md:gap-2.5">

					<li className="js-client-card opacity-0 translate-y-8 shadow-[0_0_170px_0_rgba(0,0,0,0.1)] p-6 rounded-[20px] min-h-100 bg-white flex flex-col">
						<h3 className="mb-auto font-semibold text-[22px] md:text-[28px] lg:text-[32px] -tracking-[0.01em]">
							Избавление от&nbsp;«пианино» выключателей.
						</h3>
						<Image src="/images/for-designers-page/client-get/1.png" width={181} height={181} alt="" className="self-center" />
					</li>

					<li className="js-client-card opacity-0 translate-y-8 shadow-[0_0_170px_0_rgba(0,0,0,0.1)] p-6 rounded-[20px] min-h-100 bg-foreground text-white flex flex-col">
						<h3 className="mb-auto max-w-[70%] font-semibold text-[22px] md:text-[28px] lg:text-[32px] -tracking-[0.01em]">
							Миниатюрные датчики.
						</h3>
						<Image src="/images/for-designers-page/client-get/2.png" width={209} height={209} alt="" className="self-center md:self-end" />
					</li>

					<li className="max-md:hidden relative">
						<div className="absolute top-0 left-0 aspect-760/367 w-[196.9%]">
							<Image src="/images/for-designers-page/client-get/decor.png" fill alt="" />
						</div>
					</li>

					<li className="js-client-card opacity-0 translate-y-8 md:min-h-96.5 flex justify-center md:justify-end">
						<div className="aspect-square relative flex flex-col items-center justify-center text-white text-center overflow-hidden max-w-96.5 rounded-full gap-10 p-6">
							<Image fill alt="" src="/images/for-designers-page/client-get/3-bg.jpg" className="object-cover" />
							<Image src="/images/for-designers-page/client-get/3.png" width={59} height={59} alt="" className="relative" />
							<h3 className="max-w-[50%] relative font-semibold text-[22px] md:text-[28px] lg:text-[32px] -tracking-[0.01em]">
								Пожизненная гарантия на все услуги.
							</h3>
						</div>
					</li>

					<li className="js-client-card opacity-0 translate-y-8 shadow-[0_0_170px_0_rgba(0,0,0,0.1)] p-6 rounded-[20px] text-white flex flex-col min-h-100 bg-foreground relative overflow-hidden">
						<Image src="/images/for-designers-page/client-get/4-bg.jpg" fill alt="" className="object-cover" />
						<h3 className="mb-auto font-semibold relative text-[22px] md:text-[28px] lg:text-[32px] -tracking-[0.01em]">
							Cоздание и изменение сценариев.
						</h3>
						<Image src="/images/for-designers-page/client-get/4.png" width={181} height={181} alt="" className="relative self-center" />
					</li>

					<li className="js-client-card opacity-0 translate-y-8 shadow-[0_0_170px_0_rgba(0,0,0,0.1)] p-6 rounded-[20px] min-h-100 bg-white max-md:flex-col flex justify-between gap-5">
						<h3 className="max-w-45 font-semibold text-[22px] md:text-[28px] lg:text-[32px] -tracking-[0.01em]">
							Умный дом под ключ.
						</h3>
						<Image src="/images/for-designers-page/client-get/5.png" width={239} height={336} alt="" className="self-end" />
					</li>

				</ul>
			</div>
		</section>
	)
}