"use client"

import { Title } from "@/components/UI/Title"
import Image from "next/image"
import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function SocketsSmart() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const textRef = useRef<HTMLDivElement | null>(null)

	useLayoutEffect(() => {
		gsap.registerPlugin(ScrollTrigger)

		const ctx = gsap.context(() => {
			gsap.to(textRef.current, {
				opacity: 1,
				y: 0,
				filter: "blur(0px)",
				duration: 1,
				ease: "power2.out",
				scrollTrigger: {
					trigger: textRef.current,
					start: "top 85%"
				}
			})
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="py-22.5 bg-white">
			<div className="max-w-308 px-4 mx-auto">
				<Title className="mb-2">Умные розетки</Title>

				<div className="xl:pr-20 max-md:flex-col flex gap-10 md:gap-3 md:items-center justify-between">
					<div className="relative aspect-780/622 max-w-100 md:w-[65%] -ml-5">
						<Image
							src="/images/sockets-page/smart-decor.png"
							fill
							alt=""
						/>
					</div>

					<div
						ref={textRef}
						className="md:max-w-86.75 will-change-transform"
						style={{
							opacity: 0,
							transform: "translateY(80px)",
							filter: "blur(10px)"
						}}
					>
						<Image
							src="/images/partners-page/for-dealer/icon.svg"
							width={54}
							height={54}
							alt=""
							className="mb-6"
						/>
						<p className="font-helvetica text-[17px] leading-[1.4] -tracking-[0.01em] text-brand-gray">
							Вы можете включать и выключать приборы с помощью приложения на смартфоне или планшете, а также настраивать таймеры и сценарии работы. Эта функция особенно полезна, когда вы вдали от дома и хотите включить или выключить приборы перед вашим возвращением.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}