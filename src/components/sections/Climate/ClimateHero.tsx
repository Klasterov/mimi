"use client";

import { useEffect, useRef } from "react";
import { Title } from "@/components/UI/Title";
import Image from "next/image";
import gsap from "gsap";

export default function ClimateHero() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const cardRef = useRef<HTMLDivElement>(null);
	const contentItems = useRef<HTMLDivElement[]>([]);
	const footerTextRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Создаем контекст GSAP для безопасной очистки при размонтировании
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				defaults: {
					ease: "power4.out", // Еще более "реактивный" старт, чем expo
					duration: 1.4
				}
			});

			// 1. Появление основной карточки
			tl.fromTo(cardRef.current,
				{ y: -50, opacity: 0, scale: 1.1 },
				{ y: 0, opacity: 1, scale: 1, delay: 0.3 }
			)
				// 2. Последовательное появление элементов внутри (заголовок, текст, фото)
				.fromTo(contentItems.current,
					{ y: 40, opacity: 0 },
					{ y: 0, opacity: 1, stagger: 0.2 },
					"-=1.0" // Нахлест анимации: начинаем, пока карточка еще движется
				)
				// 3. Нижний текст
				.fromTo(footerTextRef.current,
					{ y: 30, opacity: 0 },
					{ y: 0, opacity: 1, duration: 1 },
					"-=0.8"
				);
		}, sectionRef);

		return () => ctx.revert(); // Очистка всех анимаций
	}, []);

	// Вспомогательная функция для сбора рефов в массив
	const addToContentItems = (el: HTMLDivElement | null) => {
		if (el && !contentItems.current.includes(el)) {
			contentItems.current.push(el);
		}
	};

	return (
		<section ref={sectionRef} className="pt-13 lg:pt-10 pb-22.5 bg-white overflow-hidden">
			<div className="max-w-308 mx-auto px-4">

				<div ref={cardRef} className="mb-10 md:mb-15 lg:mb-22.5 bg-[#f8f8f8] text-center relative overflow-hidden rounded-3xl opacity-0">
					<div className="hidden lg:block absolute top-0 right-0 w-94 aspect-376/444">
						<Image quality={95} src="/images/climate-page/hero/dots.png" fill alt="" />
					</div>

					<div className="lg:relative pt-10 px-4 mb-10 md:mb-4.5">
						<div ref={addToContentItems}>
							<Title className="mb-2 md:mb-4">Климат-контроль</Title>
						</div>
						<div ref={addToContentItems} className="text-[17px] font-helvetica leading-[1.3] -tracking-[-0.01em] max-w-127.5 mx-auto">
							Система сама знает, когда включить кондиционер, а когда теплые полы.
							Влажность всегда будет в норме, показатели углекислого газа – не превысят критического значения.
						</div>
					</div>

					<div ref={addToContentItems}>
						<Image
							src="/images/climate-page/hero/decor.png"
							alt=""
							quality={95}
							className="hidden sm:block"
							width={1200}
							height={550}
							priority
						/>
						<div className="aspect-358/367 sm:hidden relative">
							<Image src="/images/climate-page/hero/decor-mob.png" alt="" fill />
						</div>
					</div>
				</div>

				<div ref={footerTextRef} className="font-bold text-[24px] md:txt-[28px] lg:text-[32px] text-[#acacac] opacity-0 leading-[1.2]">
					<span className="text-foreground">
						Правильный микроклимат в квартире благоприятно сказывается на здоровье.
					</span>
					Есть сотни исследований подтверждающих это. Но кроме этого вы и сами могли наблюдать, что в некоторых помещениях комфортно находиться, работать, спать. А из некоторых хочется всегда выйти проветриться.
				</div>
			</div>
		</section>
	);
}