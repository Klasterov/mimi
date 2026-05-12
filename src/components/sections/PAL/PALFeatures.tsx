"use client"

import { Title } from "@/components/UI/Title"
import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export type Col = {
	image?: string
	cap: string
	descr: string
}

type Props = {
	title: string
	cols: Col[]
}

export default function PALFeatures({ title, cols }: Props) {
	const sectionRef = useRef<HTMLElement | null>(null)
	const titleRef = useRef<HTMLHeadingElement | null>(null)
	const itemsRef = useRef<HTMLLIElement[]>([])

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger)

		const ctx = gsap.context(() => {
			// Заголовок
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
						start: "top 80%",
					}
				}
			)

			// Карточки
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
					stagger: 0.15,
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 70%",
					}
				}
			)
		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="py-22.5">
			<div className="max-w-308 px-4 mx-auto">
				<div className="mb-10 lg:max-w-200" ref={titleRef}>
					<Title>
						{title}
					</Title>
				</div>

				<ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
					{cols.map((col, i) => (
						<li
							key={i}
							ref={(el) => {
								if (el) itemsRef.current[i] = el
							}}
							className="p-6 bg-white flex flex-col justify-end rounded-[20px] overflow-hidden relative aspect-385/540"
						>
							{col.image && (
								<Image
									fill
									alt=""
									src={col.image}
									className="object-cover"
									quality={95}
								/>
							)}

							<h3 className="font-medium text-[17px] relative">
								{col.cap}
							</h3>
							<div className="font-helvetica text-[15px] relative">
								{col.descr}
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}