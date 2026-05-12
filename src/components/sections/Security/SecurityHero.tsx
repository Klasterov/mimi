"use client" // Обязательно для работы useEffect/GSAP в Next.js App Router

import { useLayoutEffect, useRef } from "react"
import { Button } from "@/components/UI/Button"
import { Title } from "@/components/UI/Title"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Регистрируем плагин
gsap.registerPlugin(ScrollTrigger);

export default function SecurityHero() {
	const containerRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			// Анимация изображения
			gsap.fromTo(imageRef.current,
				{
					scale: 0.33, // Изначально в 3 раза меньше
					opacity: 0.5 // Можно добавить немного прозрачности для эффекта
				},
				{
					scale: 1,
					opacity: 1,
					ease: "none",
					scrollTrigger: {
						trigger: containerRef.current, // Анимация начнется, когда секция вьюпорте
						start: "top bottom", // Начало: верх секции касается низа экрана
						end: "bottom center",  // Конец: низ секции доходит до середины экрана
						scrub: true, // "Привязывает" анимацию к движению колесика мыши
					}
				}
			);
		}, containerRef);

		return () => ctx.revert(); // Очистка при размонтировании
	}, []);

	return (
		<section ref={containerRef} className="lg:min-h-245 pt-15 relative overflow-hidden">
			<div className="absolute top-0 right-0 w-120 aspect-480/340">
				<Image
					src="/images/security-page/hero/dots-decor.png"
					fill
					alt=""
					className="hidden lg:block"
				/>
			</div>
			<div className="max-w-308 mx-auto px-4 flex flex-col items-center text-center relative">
				<Title className="mb-6 lg:mb-4">Безопасный дом</Title>
				<div className="mb-6 lg:mb-8 max-w-130 font-helvetica text-[17px] leading-tight -tracking-[0.01em]">
					Системы безопасности в умном доме объединяют в себя все основные разделы безопасности и обеспечивают защиту жилья и безопасное проживание его обитателей.
				</div>
				<Button className="justify-center px-3! py-1.75!">Узнать больше</Button>

				{/* Контейнер для анимации */}
				<div ref={imageRef} className="lg:-mt-20 will-change-transform self-stretch md:self-center">
					<Image
						src="/images/security-page/hero/main.png"
						width={830}
						height={644}
						alt="Security System"
						priority
						className="md:w-auto w-full h-auto"
					/>
				</div>
			</div>
		</section>
	)
}