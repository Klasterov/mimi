'use client'

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CinemaText() {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		// Анимируем обертки (div), а не сами параграфы с градиентом
		const wrappers = Array.from(containerRef.current.querySelectorAll(".line-wrapper")) as HTMLElement[];

		wrappers.forEach((el) => {
			gsap.fromTo(
				el,
				{ y: 100 },
				{
					y: 0,
					ease: "power2.out",
					scrollTrigger: {
						trigger: el,
						start: "top bottom",
						end: "top center",
						scrub: 1.5,
					},
				}
			);
		});

		return () => {
			ScrollTrigger.getAll().forEach(t => t.kill());
		};
	}, []);

	return (
		<section className="pt-10 md:pt-15 lg:pt-22.5 pb-22.5 md:pb-25 lg:pb-30 overflow-hidden">
			<div
				ref={containerRef}
				className="leading-[1.2] space-y-8 max-w-308 mx-auto px-4 font-semibold text-[28px] sm:text-[40px] md:text-[50px] lg:text-[64px]"
			>
				{/* Каждую строку кладем в обертку line-wrapper */}
				<div className="line-wrapper">
					<p className="bg-[linear-gradient(135deg,#478beb_0%,#7748aa_37.55%,#f1500c_68.57%,#f10c0c_100%)] bg-clip-text text-transparent">
						Создайте атмосферу кино всего одним касанием.
					</p>
				</div>

				<div className="line-wrapper">
					<p className="bg-[linear-gradient(135deg,#478beb_0%,#7748aa_37.55%,#f1500c_68.57%,#f10c0c_100%)] bg-clip-text text-transparent">
						При включении сценария “Кино”: плавно выезжает проектор, опускаются портьеры, гаснет свет, закрываются шторы.
					</p>
				</div>

				<div className="line-wrapper">
					<p className="bg-[linear-gradient(135deg,#478beb_0%,#7748aa_37.55%,#f1500c_68.57%,#f10c0c_100%)] bg-clip-text text-transparent">
						И вы с близкими наслаждаетесь безупречным звуком и изображением.
					</p>
				</div>

				<div className="line-wrapper">
					<p className="bg-[linear-gradient(135deg,#478beb_0%,#7748aa_37.55%,#f1500c_68.57%,#f10c0c_100%)] bg-clip-text text-transparent">
						Интеллектуальный комфорт — в каждой детали вашего дома.
					</p>
				</div>
			</div>
		</section>
	);
}