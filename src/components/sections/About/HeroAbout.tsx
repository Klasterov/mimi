"use client";
import { useEffect, useRef } from "react";

import { Title } from "@/components/UI/Title";
import Image from "next/image";
import gsap from "gsap";
import SplitType from "split-type";

export default function HeroAbout() {
	const textRef = useRef<HTMLParagraphElement>(null);
	const sectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!textRef.current) return;

		// 1. Разбиваем текст на строки
		const split = new SplitType(textRef.current, { types: "lines" });
		const lines = split.lines;

		if (lines) {
			lines.forEach((line, index) => {
				const isLast = index === lines.length - 1;
				const lineContent = line.innerHTML;

				line.style.display = 'inline-flex';
				line.style.width = 'auto';
				line.style.position = 'relative'; // Важно для позиционирования каретки

				// Устанавливаем размер отступа (например, 8px)
				const paddingX = '5px';

				line.innerHTML = `
        <span class="line-wrapper" style="
            position: relative; 
            display: inline-block; 
            padding: 2px ${paddingX}; 
            margin-left: -${paddingX};
        ">
          <span class="line-bg" style="
            position: absolute; 
            inset: 0; 
            background: #ffeba4; 
            z-index: -1; 
            transform-origin: left; 
            transform: scaleX(0);
          "></span>
          ${lineContent}
          ${isLast ? `
            <div class="caret-end absolute -right-1 top-0 w-0.5 h-full bg-black opacity-0">
              <span class="absolute top-full left-1/2 w-2 h-2 rounded-full bg-black -translate-x-1/2"></span>
            </div>
          ` : ''}
        </span>
    `;
			});
		}

		const tl = gsap.timeline({ delay: 0.5 });

		// 1. Сначала проявляем первую каретку
		tl.to(".caret-start", { opacity: 1, duration: 0.2 });

		// 2. Анимируем линии
		tl.to(".line-bg", {
			scaleX: 1,
			duration: 0.8,
			ease: "power2.inOut",
			stagger: 0.4,
		});

		// 3. Проявляем последнюю каретку в конце анимации линий
		tl.to(".caret-end", {
			opacity: 1,
			duration: 0.2
		}, "-=0.2"); // Нахлест на финал последней линии

		return () => split.revert();
	}, []);
	return (
		<section
			ref={sectionRef}
			className="pt-15 md:pt-22.5 lg:pt-28 pb-22.5 md:pb-28 lg:pb-58.5"
		>
			<div className="max-w-308 mx-auto px-4 flex gap-10 xl:gap-30">
				<div className="hidden -ml-9 px-3.5 lg:block relative w-82.5 shrink-0 grow-0 basis-82.5">
					<Image
						src='/images/faq/left-bg.png'
						alt="background image"
						fill
						quality={95}
						className="object-cover"
					/>
					<div className="sticky top-[25%]">
						<div className="relative -top-6 aspect-386/468">
							<Image
								src="/images/about-hero/01.png"
								width={386}
								height={468}
								quality={95}
								alt="default"
								className="absolute top-0 left-1/2 -translate-x-1/2 transition-opacity duration-500 ease-in-out opacity-100 scale-100 z-10"
							/>
						</div>
					</div>
				</div>
				<div className="xl:mr-24 flex-auto leading-[1.4]">
					<Title className="mb-8.5"><span className="text-[#00d0ff]">MiMi</span>Smart</Title>
					<div className="mb-8.5 font-helvetica text-[18px] lg:text-[20px] tracking-[-0.01em]">
						<div className="lg:pr-11 mb-8.5">
							<p className="mb-9.5">Крупнейший <span className="text-[#ce5941] font-bold">(ТОП-1)</span> российский производитель <br />премиальных систем умный дом.</p>
							<div className="relative flex flex-col items-start mb-5">
								{/* Каретка в начале (верхний левый угол) */}
								<div className="caret-start absolute -left-1.5 top-0 w-0.5 h-7 bg-black z-10 opacity-0">
									<span className="absolute bottom-full left-1/2 w-2 h-2 rounded-full bg-black -translate-x-1/2"></span>
								</div>

								<p ref={textRef} className="relative z-0">
									Система MiMiSmart начала свою историю в 2004 году, когда один из наших основателей делал ремонт в своем большом загородном доме.
								</p>
							</div>
							<p className="mb-5">В проекте было множество групп освещения, кондиционеров, теплые полы, радиаторы. И управлять этим без единой, слаженной системы – очевидно невозможно.</p>
							<p className="mb-8.5">Так появилась система MiMiSmart.</p>
						</div>
						<div className="rounded-2xl lg:rounded-[20px] overflow-hidden relative aspect-690/400 mb-8.5">
							<Image
								src="/images/about-hero/main.jpg"
								fill
								alt=""
								quality={95}
							/>
						</div>
						<div>С тех времен мы прошли <span className="typewriter-decor text-[#acacac]">
							долгий путь:
							<span></span>
						</span></div>
					</div>
					<ul className="grid grid-cols-2 gap-6 md:gap-8.5 font-helvetica text-[15px] md:text-[16px] tracking-[-0.01em]">
						<li>
							<Image
								src="/images/about-hero/icons/1.svg"
								width={60}
								height={40}
								alt=""
								className="mb-4"
							/>
							<p>8 версий устройств</p>
						</li>
						<li>
							<Image
								src="/images/about-hero/icons/2.svg"
								width={60}
								height={40}
								alt=""
								className="mb-4"
							/>
							<p>Бесчисленное кол-во прошивок</p>
						</li>
						<li>
							<Image
								src="/images/about-hero/icons/3.svg"
								width={60}
								height={40}
								alt=""
								className="mb-4"
							/>
							<p>3 различных интерфейсов приложения</p>
						</li>
						<li>
							<Image
								src="/images/about-hero/icons/4.svg"
								width={60}
								height={40}
								alt=""
								className="mb-4"
							/>
							<p>40+ позиций - датчиков и устройств.</p>
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
};
