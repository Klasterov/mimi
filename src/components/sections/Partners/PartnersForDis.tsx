"use client"

import { useEffect, useRef } from "react"
import ArrowLink from "@/components/UI/ArrowLink"
import { Title } from "@/components/UI/Title"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const gradientTextClass =
	"bg-[linear-gradient(90deg,#478beb_0%,#7748aa_38%,#f1500c_72.51%,#f1500c_100%)] bg-clip-text text-transparent"

const glowTitleClass =
	"absolute top-0 left-0 blur-[100px] pointer-events-none select-none"

const titleTextClass =
	"text-[40px] md:text-[52px] lg:text-[64px] font-bold tracking-[-0.01em] leading-tight"

const benefits = [
	{
		icon: "/images/partners-page/for-dis/icon-1.svg",
		text: "Самый высокий % агентских вознаграждений дизайнерам на рынке умных домов",
		iconClassName: "gap-3.75",
	},
	{
		icon: "/images/partners-page/for-dis/icon-2.svg",
		text: "Дополнительный поток клиентов с нашей стороны",
		iconClassName: "gap-4",
	},
]

export default function PartnersForDis() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const bgRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger)

		const ctx = gsap.context(() => {
			if (!bgRef.current || !sectionRef.current) return

			gsap.fromTo(
				bgRef.current,
				{
					filter: "blur(0px)",
					scale: 1,
				},
				{
					filter: "blur(20px)",
					scale: 1.05,
					ease: "none",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top bottom",
						end: "bottom top",
						scrub: true,
					},
				}
			)
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section
			ref={sectionRef}
			className="relative flex min-h-250 items-end py-22.5 text-white overflow-hidden"
		>
			<div
				ref={bgRef}
				className="absolute inset-0 scale-100 will-change-transform will-change-[filter]"
			>
				<Image
					src="/images/partners-page/for-dis/bg.jpg"
					fill
					alt=""
					sizes="100vw"
					className="object-cover"
				/>
			</div>

			<div className="absolute inset-0 bg-black/60" />

			<div className="relative z-10 mx-auto w-full max-w-308 px-4">
				<div className="mb-10 max-w-107.5 md:mb-15 lg:mb-25">
					<div className="relative mb-6">
						<Title className={gradientTextClass}>Дизайнерам</Title>

						<div className={`${glowTitleClass} ${titleTextClass} ${gradientTextClass}`}>
							Дизайнерам
						</div>
					</div>

					<p className="mb-4">
						Сотрудничество с MiMiSmart позволяет дизайнерам интегрировать
						умный дом в проекты без изменения авторской идеи. Инженерные
						решения, поддержка и реализация берутся на стороне производителя.
					</p>

					<ArrowLink href="#">Подробнее дизайнерам</ArrowLink>
				</div>

				<ul className="flex gap-5 font-helvetica text-[17px] leading-[1.4] -tracking-[0.01em] max-sm:flex-col sm:gap-10 lg:gap-35">
					{benefits.map((item, index) => (
						<li
							key={index}
							className={`flex items-center sm:max-w-73.5 ${item.iconClassName}`}
						>
							<Image
								src={item.icon}
								width={42}
								height={42}
								alt=""
							/>
							<p>{item.text}</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}