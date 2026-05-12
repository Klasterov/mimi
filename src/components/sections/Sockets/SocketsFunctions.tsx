"use client"

import { Title } from "@/components/UI/Title"
import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function SocketsFunctions() {
	const sectionRef = useRef<HTMLElement | null>(null)
	const titleRef = useRef<HTMLDivElement | null>(null)
	const itemsRef = useRef<HTMLLIElement[]>([])

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger)

		const ctx = gsap.context(() => {
			gsap.fromTo(
				titleRef.current,
				{
					opacity: 0,
					y: 40
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: "power2.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 80%"
					}
				}
			)

			gsap.fromTo(
				itemsRef.current,
				{
					opacity: 0,
					y: 60
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: "power2.out",
					stagger: 0.12,
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 70%"
					}
				}
			)
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="py-22.5 bg-white">
			<div className="max-w-308 px-4 mx-auto">
				<div className="mb-10" ref={titleRef}>
					<Title>Функции умной розетки</Title>
				</div>

				<ul className="-tracking-[0.01em] max-lg:flex-col flex gap-5">
					<li
						ref={(el) => {
							if (el) itemsRef.current[0] = el
						}}
						className="bg-background rounded-[20px] min-h-135 relative p-6"
					>
						<div className="max-lg:hidden absolute top-0 right-0 aspect-446/403 w-[59.3%]">
							<Image
								src="/images/sockets-page/functions/decor.png"
								fill
								className="object-cover"
								alt=""
							/>
						</div>
						<div className="relative h-full flex flex-col">
							<Image
								src="/images/sockets-page/functions/1.png"
								width={346}
								height={346}
								alt=""
							/>
							<h3 className="self-start mt-auto mb-2 font-medium text-[17px]">
								Встроенный термостат.
							</h3>
							<div className="self-start font-helvetica text-[15px] text-brand-gray">
								Вы можете настроить розетку, чтобы включить свет каждый вечер в определенное время или выключить компьютер через несколько минут после использования. Это особенно удобно, когда вам нужно вовремя выключить утюг или лампу.
							</div>
						</div>
					</li>

					<li
						ref={(el) => {
							if (el) itemsRef.current[1] = el
						}}
						className="basis-[32%] grow-0 shrink-0 bg-background rounded-[20px] min-h-135 p-6 flex flex-col items-center"
					>
						<Image
							src="/images/sockets-page/functions/2.png"
							width={200}
							height={319}
							alt=""
						/>
						<h3 className="self-start mt-auto mb-2 font-medium text-[17px]">
							Таймер для автоматического включения и выключения приборов.
						</h3>
						<div className="self-start font-helvetica text-[15px] text-brand-gray">
							Вы можете настроить розетку таким образом, чтобы включить обогреватель, когда комната становится холодной, и выключить его, когда достигается нужная температура.
						</div>
					</li>
				</ul>
			</div>
		</section>
	)
}