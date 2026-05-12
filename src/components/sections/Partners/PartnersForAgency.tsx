"use client"

import { useEffect, useRef } from "react"
import ArrowLink from "@/components/UI/ArrowLink"
import { Title } from "@/components/UI/Title"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function PartnersForAgency() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const imageRef = useRef<HTMLImageElement | null>(null)

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger)

		const ctx = gsap.context(() => {
			gsap.fromTo(
				imageRef.current,
				{
					autoAlpha: 0,
				},
				{
					autoAlpha: 1,
					ease: "none",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 10%",
						end: "bottom 90%",
						scrub: true,
					},
				}
			)
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="pt-30 pb-22.5">
			<div className="max-w-235.5 px-4 mx-auto">
				<div className="mb-6 space-y-6 flex flex-col items-center text-center">
					<Title>Агентствам</Title>
					<div className="space-y-[1em] font-helvetica text-[17px] leading-[1.4] -tracking-[0.01em] text-brand-gray">
						<p>Единая система управления объектом.</p>
						<p>
							Управление доступом, безопасностью и инженерными системами
							собрано в одной платформе, удобной для работы агентства и
							понятной для нового владельца.
						</p>
					</div>
					<ArrowLink href="#">Подробнее агентствам</ArrowLink>
				</div>

				<div className="pt-15.5 lg:pt-20 flex gap-10 flex-col items-center rounded-3xl shadow-[0_28px_24px_0_rgba(0,0,0,0.04)] bg-linear-to-b from-white/0 to-white">
					<div className="max-md:max-w-14">
						<Image
							src="/images/partners-page/for-agency/icon.svg"
							width={67}
							height={64}
							alt=""
						/>
					</div>

					<Image
						ref={imageRef}
						src="/images/partners-page/for-agency/main.png"
						width={618}
						height={583}
						alt=""
						className="opacity-0" // ← изначально скрыли
					/>
				</div>
			</div>
		</section>
	)
}