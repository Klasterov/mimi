"use client"

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Title } from "@/components/UI/Title";

export default function CinemaAdvantages() {
	return (
		<section className="pt-30 pb-22.5">
			<div className="max-w-308 mx-auto px-4">
				<Title className="mb-4 md:mb-10">Преимущества умного <br />
					дома MiMiSmart</Title>
				<ul className="grid sm:grid-cols-2 lg:flex gap-4 sm:gap-5 flex-wrap relative">
					<li className="shadow-[0_1px_2px_0_rgba(0,0,0,0.06),0_1px_3px_0_rgba(0,0,0,0.1)] tracking-[-0.01em] lg:w-[32%] p-6 min-h-65 rounded-[20px] bg-[#d8d8d8] overflow-hidden relative">
						<Image
							src="/images/cinema-page/advantages/1.jpg"
							quality={95}
							alt=""
							fill
							className="object-cover"
						/>
						<h3 className="relative mb-1 font-medium text-[16px] -mr-3 md:mr-0">Продумываем сценарии использования.</h3>
						<p className="relative font-helvetica text-[15px] text-brand-gray">
							Кино и Вечеринка запускаются одной кнопкой, свет шторы и звук работают синхронно.
						</p>
					</li>
					<li className="lg:w-[42.75%] tracking-[-0.01em] p-6 min-h-65 rounded-[20px] bg-[#0f1015] overflow-hidden relative">
						<Image
							src="/images/cinema-page/advantages/2.jpg"
							quality={95}
							alt=""
							fill
							className="object-cover"
						/>
						<h3 className="relative mb-1 font-medium text-white text-[16px]">Грамотно располагаем свет.</h3>
						<p className="relative font-helvetica max-w-[90%] text-[15px] text-[#95979e]">
							Исключаем блики на экране, делим освещение на контурное и акцентное, задаём пресеты для фильмов.
						</p>
					</li>
					<li className="hidden xl:block lg:w-[21.75%] min-h-65 relative">

						<Image
							src="/images/advantages/decor-1.svg"
							alt=""
							fill
							className="object-cover"
						/>
					</li>
					<li className="lg:ml-auto lg:w-[22%] tracking-[-0.01em] p-6 min-h-65 rounded-[20px] bg-[#0f1015] overflow-hidden relative z-10">
						<Image
							src="/images/cinema-page/advantages/3.jpg"
							quality={95}
							alt=""
							fill
							className="object-cover"
						/>
						<h3 className="relative mb-1 font-medium text-white text-[16px]">Планируем работу микроклимата.</h3>
						<p className="relative max-w-[71%] font-helvetica text-[15px] text-[#95979e]">
							Обеспечиваем стабильную температуру во&nbsp;время сеансов.
						</p>
					</li>
					<li className="lg:w-[22%] tracking-[-0.01em] p-6 min-h-65 rounded-[20px] bg-[#d8d8d8] overflow-hidden relative">
						<Image
							src="/images/cinema-page/advantages/4.jpg"
							quality={95}
							alt=""
							fill
							className="object-cover"
						/>
						<h3 className="relative mb-1 font-medium text-[16px] text-white">Подбираем проектор и экран.</h3>
						<p className="relative font-helvetica text-[15px] text-[#95979e]">
							Подбираем яркость проектора и тип полотна экрана под ваше освещение
						</p>
					</li>
					<li className="relative lg:w-[32%] tracking-[-0.01em] p-6 min-h-65 rounded-[20px] bg-[#d8d8d8] overflow-hidden">
						<Image
							src="/images/cinema-page/advantages/5.jpg"
							quality={95}
							alt=""
							fill
							className="object-cover"
						/>
						<h3 className="relative mb-1 font-medium text-[16px]">Подбираем качественную акустику.</h3>
						<p className="relative font-helvetica text-[15px] text-[#95979e]">
							Проектируем систему с учётом геометрии и отделки, калибруем звук под реальные места.
						</p>
					</li>
					<li className="aspect-285/327 absolute w-[23.8%] hidden lg:block -left-7.5 top-65">
						<Image src="/images/advantages/decor-2.png" quality={95} alt="background" fill className="object-cover" />
					</li>
					<li className="aspect-390/314 lg:hidden relative -mx-4 -mt-4">
						<Image src="/images/advantages/decor-3.png" quality={95} alt="background" fill className="object-cover" />
					</li>
				</ul>
			</div>
		</section>
	);
};
