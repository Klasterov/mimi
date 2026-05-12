"use client"

import { Title } from "@/components/UI/AudioTitle"
import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function AudioComposition() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const titleRef = useRef<HTMLDivElement | null>(null)
	const textRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!sectionRef.current) return

		const ctx = gsap.context(() => {
			// сразу задаем начальное состояние (чтобы не было мигания)
			gsap.set([titleRef.current, textRef.current], {
				y: 40,
				opacity: 0,
			})

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
				},
			})

			tl.to(titleRef.current, {
				y: 0,
				opacity: 1,
				duration: 0.8,
				ease: "power3.out",
			}).to(
				textRef.current,
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: "power3.out",
				},
				"-=0.4"
			)
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="py-22.5 overflow-hidden">
			<div className="max-w-308 px-4 mx-auto flex flex-col items-center">
				<div className="max-w-227.5 mx-auto mb-10">
					<div ref={titleRef}>
						<Title className="mb-6">
							Cвободно перемещайтесь по дому под любимые композиции
						</Title>
					</div>

					<div
						ref={textRef}
						className="max-w-142.5 font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em]"
					>
						Возможность дистанционного управления, автоматизация процессов и интеграция с другими системами делают данную функцию неотъемлемой частью современного умного дома.
					</div>
				</div>

				<div className="relative w-300 aspect-1200/450">
					<Image
						fill
						src="/images/audio-page/composition/table.png"
						alt=""
						className="object-cover"
					/>
					<Image
						src="/images/audio-page/composition/decor-2.png"
						width={138}
						height={104}
						alt=""
						quality={95}
						className="absolute top-[39.5%] left-[37%] md:left-[25%]"
					/>
					<Image
						src="/images/audio-page/composition/decor-1.png"
						width={263}
						height={335}
						alt=""
						quality={95}
						className="absolute bottom-[35.7%] right-[32%] md:right-[18.2%]"
					/>
				</div>
			</div>
		</section>
	)
}