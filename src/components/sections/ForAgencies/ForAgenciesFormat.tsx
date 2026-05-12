"use client"

import { Title } from "@/components/UI/Title"
import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function ForAgenciesFormat() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const titleRef = useRef<HTMLDivElement | null>(null)
	const listRef = useRef<HTMLUListElement | null>(null)

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger)

		const ctx = gsap.context(() => {
			const cards = listRef.current?.querySelectorAll(".js-format-card")

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
					<Title className="mb-10">Формат сотрудничества</Title>
				</div>

				<ul ref={listRef} className="grid md:grid-cols-2 gap-5">
					<li className="js-format-card min-h-125 max-md:flex-col max-md:p-6 md:pl-10 lg:pl-15 flex items-center justify-between md:col-span-2 rounded-3xl bg-white text-[22px] md:text-[26px] lg:text-[32px] font-semibold leading-[1.3] -tracking-[0.01em] will-change-transform">
						<h3 className="max-md:self-start">Оплата по этапам.</h3>
						<div className="max-md:max-w-95">
							<Image
								src="/images/for-agencies-page/format/1.svg"
								alt=""
								width={430}
								height={500}
							/>
						</div>
					</li>

					<li className="js-format-card min-h-125 md:min-h-150 flex flex-col gap-25 max-md:p-6 md:px-15 md:py-9.25 rounded-3xl bg-white text-[22px] md:text-[26px] lg:text-[32px] font-semibold leading-[1.3] -tracking-[0.01em] will-change-transform">
						<h3>Агентское вознаграждение.</h3>
						<div className="self-center min-h-50 flex items-center">
							<Image
								src="/images/for-agencies-page/format/2.svg"
								alt=""
								width={197}
								height={42}
							/>
						</div>
					</li>

					<li className="js-format-card min-h-125 md:min-h-150 flex flex-col max-md:p-6 md:px-15 md:py-9.25 rounded-3xl bg-white text-[22px] md:text-[26px] lg:text-[32px] font-semibold leading-[1.3] -tracking-[0.01em] gap-35 will-change-transform">
						<h3>Белые договора.</h3>
						<div className="self-center min-h-50 flex items-center">
							<Image
								src="/images/for-agencies-page/format/3.png"
								alt=""
								width={170}
								height={170}
							/>
						</div>
					</li>
				</ul>
			</div>
		</section>
	)
}