"use client"

import Image from "next/image"
import { Title } from "../../UI/Title"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function YouGet() {
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

				<ul ref={listRef} className="grid md:grid-cols-2 gap-5 text-[22px] md:text-[28px] lg:text-[32px]">
					<li className="js-you-get-card bg-linear-to-b max-md:flex-col from-[#313a39] to-[#7f8180] rounded-3xl text-white md:col-span-2 md:min-h-125 max-md:p-6 md:pl-15 flex justify-between items-center will-change-transform">
						<h3 className="font-semibold leading-[1.3] -tracking-[0.01em] md:py-15">
							Самый высокий
							% агентских вознаграждений дизайнерам на рынке умных домов.
						</h3>
						<Image
							src="/images/for-designers-page/you-get/1.png"
							width={418}
							height={500}
							alt=""
						/>
					</li>

					<li className="js-you-get-card md:min-h-150 rounded-3xl text-white gap-25 bg-[#f90b3a] max-md:p-6 md:px-15 md:py-9.25 flex flex-col-reverse items-center will-change-transform">
						<h3 className="font-semibold leading-[1.3] -tracking-[0.01em]">
							Дополнительный поток клиентов
							с нашей стороны.
						</h3>
						<Image
							src="/images/for-designers-page/you-get/2.svg"
							width={219}
							height={220}
							alt=""
						/>
					</li>

					<li className="js-you-get-card md:min-h-150 rounded-3xl bg-white max-md:p-6 md:px-15 md:py-9.25 flex flex-col items-center gap-17.5 will-change-transform">
						<h3 className="font-semibold leading-[1.3] -tracking-[0.01em]">
							Меньше заморочек с выключателями.
						</h3>
						<Image
							src="/images/for-designers-page/you-get/3.png"
							width={245}
							height={245}
							alt=""
						/>
					</li>

					<li className="js-you-get-card rounded-3xl max-md:flex-col-reverse bg-white md:col-span-2 flex items-center gap-5 justify-between md:min-h-125 md:pl-15 max-md:p-6 will-change-transform">
						<h3 className="md:max-w-55.5 font-semibold leading-[1.3] -tracking-[0.01em] md:py-15">
							Cделаем всю
							инженерию
							под ключ.
						</h3>
						<Image
							src="/images/for-designers-page/you-get/4.png"
							width={430}
							height={464}
							alt=""
						/>
					</li>
				</ul>
			</div>
		</section>
	)
}