"use client"

import { Button } from "@/components/UI/Button"
import { Title } from "@/components/UI/Title"
import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function ElectricCurtainsHero() {
	const imageRef = useRef<HTMLDivElement | null>(null)
	const titleRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!imageRef.current || !titleRef.current) return

		// начальные состояния ДО анимации (чтобы не было флика)
		gsap.set(imageRef.current, {
			scale: 0.85,
			opacity: 0,
			transformOrigin: "center center",
		})

		gsap.set(titleRef.current, {
			y: 40,
			opacity: 0,
		})

		const tl = gsap.timeline()

		// сначала "окно"
		tl.to(imageRef.current, {
			scale: 1,
			opacity: 1,
			duration: 0.9,
			ease: "power3.out",
		})

			// потом заголовок (чуть с перекрытием)
			.to(titleRef.current, {
				y: 0,
				opacity: 1,
				duration: 0.7,
				ease: "power3.out",
			}, "-=0.4")

	}, [])

	return (
		<section className="pt-22.5 lg:pt-16.75 pb-15 lg:pb-22.5">
			<div className="max-w-308 px-4 mx-auto text-center flex flex-col items-center">

				<div className="mb-6 opacity-0" ref={titleRef}>
					<Title>Короткий слоган</Title>
				</div>

				<Button className="justify-center py-1.75! mb-10">
					Подобрать ткань и привод
				</Button>

				<div ref={imageRef} className="mb-10 opacity-0">
					<Image
						src="/images/electric-curtains-page/hero/decor.png"
						width={774}
						height={500}
						alt="curtains decor"
					/>
				</div>

				<div className="font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em] max-w-140 space-y-[1em]">
					<p>Нехитрая система подъема, позволяющая им подниматься вверх или опускаться вниз с помощью системы шнуров и электропривода.. </p>
					<p className="lg:hidden">Часто популярны на кухне, лоджиях и других местах, где из за особенностей помещения нецелесообразно устанавливать раздвижные шторы.</p>
				</div>
			</div>
		</section>
	)
}