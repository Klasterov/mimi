"use client"

import { RightArrowIcon } from "@/icons/RightArrowIcon"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const tabs = [
	{
		id: 0,
		image: "/images/security-page/fire-safety/1.jpg",
		title: "Уведомления",
		content:
			"Система мгновенно оповещает владельцев о возможных опасностях, что позволяет принимать меры еще до того, как ситуация станет критической."
	},
	{
		id: 1,
		image: "/images/security-page/fire-safety/2.jpg",
		title: "Пожаротушение",
		content:
			"При наличии системы пожаротушения, Умный дом автоматически активирует оборудование или следует указаниям пользователя."
	},
	{
		id: 2,
		image: "/images/security-page/fire-safety/3.jpg",
		title: "Автоматические меры",
		content:
			"В зависимости от настроек, система может отключать электропитание, газ и воду, а также активировать аварийное освещение."
	}
]

export default function FireSafety() {
	const [active, setActive] = useState(0)

	const sectionRef = useRef(null)
	const gradientRef = useRef(null)

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				gradientRef.current,
				{ opacity: 0, y: -40 },
				{
					opacity: 1,
					y: 0,
					duration: 1.2,
					ease: "power2.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 80%"
					}
				}
			)
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section
			ref={sectionRef}
			className="py-27.5 md:py-32 lg:py-33 bg-foreground relative overflow-hidden"
		>
			<div
				ref={gradientRef}
				className="absolute h-20 -top-10 left-0 bg-[linear-gradient(90deg,#0B0D10_0%,#804848_28.13%,#7A331B_49.82%,#9B1F3C_73.92%,#0B0D10_100%)] blur-[32.45px] w-full min-w-360"
			></div>

			<div className="max-w-235.5 mx-auto px-4">
				<div className="text-white mb-20">
					<h2 className="mb-9 leading-[1.2] font-bold text-[40px] md:text-[52px] lg:text-[64px]">
						Контроль дыма, газа и{" "}
						<span className="bg-[linear-gradient(0deg,#ff383c_0%,#fff_100%)] bg-clip-text text-transparent">
							пожарная безопасность
						</span>
					</h2>

					<div className="font-helvetica mb-4 text-[17px] leading-[1.2] -tracking-[0.01em] lg:max-w-143">
						Система мгновенно оповещают владельцев о возможных опасностях,
						что позволяет принимать меры еще до того, как ситуация станет
						критической.
					</div>

					<a
						href="#"
						className="inline-flex items-center gap-1 -tracking-[0.01em] text-[15px] font-medium text-brand-blue group"
					>
						Узнать больше
						<RightArrowIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
					</a>
				</div>

				<Image
					src={tabs[active].image}
					width={910}
					height={500}
					alt=""
					className="mb-19 rounded-[20px]"
				/>

				<div className="sm:min-h-36 min-h-41">
					<div className="flex justify-center">
						<div className="px-4 -mx-4 md:px-0 md:mx-0 scrollbar-none font-semibold text-[18px] overflow-x-auto whitespace-nowrap lg:text-[20px] text-[#acacac] flex gap-10 lg:gap-18 border-b border-brand-light-gray">
							{tabs.map((tab, i) => (
								<button
									key={tab.id}
									onClick={() => setActive(i)}
									className={`pb-5 transition relative hover:opacity-80 ${active === i
											? "bg-[linear-gradient(90deg,#fff_0%,#ff383c_100%)] bg-clip-text text-transparent"
											: "cursor-pointer"
										}`}
								>
									{tab.title}

									<div
										className={`absolute bottom-0 left-0 w-full border-b border-white transition-opacity duration-300 opacity-0 ${active === i && "opacity-100"
											}`}
									></div>
								</button>
							))}
						</div>
					</div>

					<div className="pt-6 font-helvetica text-[17px] leading-tight -tracking-[0.01em] max-w-143 mx-auto text-white text-center">
						{tabs[active].content}
					</div>
				</div>
			</div>
		</section>
	)
}