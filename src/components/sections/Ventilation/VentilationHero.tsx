"use client"

import { Button } from "@/components/UI/Button"
import { Title } from "@/components/UI/Title"
import Image from "next/image"
import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"

export default function VentilationHero() {
	const imageRef = useRef<HTMLDivElement | null>(null)
	const contentRef = useRef<HTMLDivElement | null>(null)

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			if (!imageRef.current || !contentRef.current) return

			const children = Array.from(contentRef.current.children)

			// начальные состояния
			gsap.set(imageRef.current, {
				y: -80,
				opacity: 0,
				scale: 0.96,
			})

			gsap.set(children, {
				y: 30,
				opacity: 0,
				filter: "blur(6px)",
			})

			const tl = gsap.timeline()

			// картинка сверху
			tl.to(imageRef.current, {
				y: 0,
				opacity: 1,
				scale: 1,
				duration: 0.9,
				ease: "power3.out",
			})

			// контент следом
			tl.to(
				children,
				{
					y: 0,
					opacity: 1,
					filter: "blur(0px)",
					duration: 0.7,
					stagger: 0.12,
					ease: "power3.out",
				},
				"-=0.4"
			)
		})

		return () => ctx.revert()
	}, [])

	return (
		<section className="pb-22.5 lg:pb-30 overflow-hidden">
			<div className="max-w-368 px-4 mx-auto flex flex-col items-center">

				<div ref={imageRef} className="opacity-0 mb-20 min-w-229">
					<Image
						src="/images/ventilation-page/hero.jpg"
						width={1440}
						height={317}
						alt=""
					/>
				</div>

				<div ref={contentRef} className="max-w-140 mx-auto text-center">
					<div className="mb-6">
						<Title>Вентиляция</Title>
					</div>

					<div className="mb-20">
						<Button className="justify-center py-1.75!">
							Подобрать ткань и привод
						</Button>
					</div>

					<div className="font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em]">
						Нехитрая система подъема, позволяющая им подниматься вверх или опускаться вниз с помощью системы шнуров и электропривода..
						Часто популярны на кухне, лоджиях и других местах, где из за особенностей помещения нецелесообразно устанавливать раздвижные шторы.
					</div>
				</div>
			</div>
		</section>
	)
}