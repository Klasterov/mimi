"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import Image from "next/image"

export default function IntercomSystemHero() {
	const rootRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!rootRef.current) return

		const ctx = gsap.context(() => {
			const tl = gsap.timeline()

			tl.from(".hero-logo", {
				y: -20,
				opacity: 0,
				duration: 0.6,
				ease: "power2.out",
			})

			tl.from(".hero-title span, .hero-title", {
				y: 40,
				opacity: 0,
				duration: 0.8,
				stagger: 0.05,
				ease: "power3.out",
			}, "-=0.3")

			tl.from(".hero-text", {
				y: 30,
				opacity: 0,
				duration: 0.6,
				ease: "power2.out",
			}, "-=0.4")

		}, rootRef)

		return () => ctx.revert()
	}, [])

	return (
		<section className="min-h-180 lg:min-h-177.5 pt-15 pb-50 lg:pb-22.5 relative">
			<div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(93.31%_93.31%_at_50%_95.84%,#ebd9cd_0%,#27579a_40.59%,#0a172a_100%)]"></div>

			<div ref={rootRef} className="max-w-235.5 px-4 mx-auto relative">
				<div className="hero-logo mb-30 lg:mb-15 space-y-4 flex flex-col items-center text-center">
					<Image
						src="/images/intercom-system-page/hero-icon.svg"
						width={100}
						height={100}
						alt=""
					/>
					<span className="font-bold text-[22px] lg:text-[24px] text-black -tracking-[0.01em]">
						MiMiSmart
					</span>
				</div>

				<h1 className="hero-title mb-6 text-[74px] md:text-[100px] lg:text-[130px] xl:text-[186px] font-bold leading-[1.2] text-[#140f2d]">
					Д
					<span className="relative">
						о
						<span className="absolute top-[32%] left-1/2 -translate-x-1/2 w-full aspect-114/117">
							<Image
								src="/images/intercom-system-page/title-decor.png"
								fill
								alt=""
							/>
						</span>
					</span>
					мофон
				</h1>

				<div className="hero-text text-[17px] font-helvetica -tracking-[0.01em]">
					Интеграция системы Умного Дома в домофон позволяет дистанционно открывать/закрывать двери, а также выполнять другие действия.
				</div>
			</div>
		</section>
	)
}