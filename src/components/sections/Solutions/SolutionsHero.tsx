"use client";

import { useEffect, useRef } from "react";
import { Title } from "@/components/UI/Title";
import Image from "next/image";
import { gsap } from "gsap";

export default function SolutionsHero() {
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				defaults: {
					ease: "power2.out",
					duration: 2.5 // Сделал значительно медленнее
				}
			});

			// Анимируем появление градиента
			tl.to(".hero-bg-gradient", {
				opacity: 1,
				duration: 3
			})
				// Анимируем элементы: из CSS-состояния (opacity: 0) в нормальное
				.to(".animate-fade-up", {
					y: 0,
					opacity: 1,
					stagger: 0.4, // Медленная очередность
				}, "-=2"); // Начинаем чуть раньше завершения фона

		}, rootRef);

		return () => ctx.revert();
	}, []);

	return (
		<section ref={rootRef} className="relative pt-15 pb-22.5 lg:pb-0">
			{/* Критически важно: добавляем класс opacity-0 и translate-y-10 прямо в HTML.
         Это гарантирует, что элементы не "прыгнут" при загрузке.
      */}
			<style jsx>{`
        .animate-fade-up {
          opacity: 0;
          transform: translateY(40px);
        }
        .hero-bg-gradient {
          opacity: 0;
        }
      `}</style>

			{/* Градиент: сверху голубой, к середине прозрачный, высота 50% */}
			<div
				className="hero-bg-gradient absolute top-0 left-0 w-full h-1/2 -z-10 pointer-events-none"
				style={{
					background: "linear-gradient(0deg, rgb(244, 244, 244, 0) 0%, rgb(186, 183, 178) 100%)"
				}}
			/>

			<div className="mb-30 lg:mb-5">
				<div className="max-w-235 mx-auto px-4">
					<div className="animate-fade-up">
						<Title className="md:max-w-none max-w-[80%] mb-4 lg:mb-2">Готовые решения</Title>
					</div>

					<div className="font-helvetica animate-fade-up text-[17px] leading-[1.3] tracking-[-0.01em] md:max-w-115 mb-10 lg:mb-8">
						Настоящий умный дом - это система слаженного автоматизированного управления всеми инженерными системами дома
					</div>

					<div className="animate-fade-up relative aspect-939/639 lg:-ml-9.5 lg:mr-2">
						<Image
							src="/images/solutions-page/hero/1.png"
							quality={95}
							fill
							priority
							alt=""
						/>
					</div>
				</div>
			</div>

			<div className="lg:py-30 lg:relative">
				<Image
					src="/images/solutions-page/hero/bg.png"
					fill
					alt=""
					className="object-cover hidden lg:block xl:object-[center_80%]"
				/>
				<div className="relative max-w-236 mx-auto px-4 tracking-[-0.01em]">
					<h3 className="animate-fade-up leading-tight mb-4 font-bold text-[24px] md:text-[28px] lg:text-[32px]">
						В современном доме действительно нужна централизованная система управления умный дом, которая не только принесет комфорт и уют.
					</h3>
					<div className="font-helvetica animate-fade-up mb-10 lg:mb-38 -tracking-[0.035em] text-[17px] leading-tight md:max-w-116">
						Настоящий умный дом - это система слаженного автоматизированного управления всеми инженерными системами дома
					</div>

					<ul className="animate-fade-up font-helvetica grid md:grid-cols-2 gap-10 text-[15px] lg:text-[16px] -tracking-[0.035em]">
						<li className="max-w-88">
							<Image
								src="/images/about-hero/icons/1.svg"
								width={60}
								height={40}
								alt=""
								className="mb-4"
							/>
							<p>Соединяет освещение, климат, мультимедиа и безопасность в единую логику</p>
						</li>
						<li className="tracking-[-0.01em] max-w-88">
							<Image
								src="/images/about-hero/icons/2.svg"
								width={60}
								height={40}
								alt=""
								className="mb-4"
							/>
							<p>Автоматизирует рутину, чтобы дом подстраивался под вас</p>
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
}