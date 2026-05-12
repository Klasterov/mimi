"use client";

import { Title } from "@/components/UI/Title";
import { RightArrowIcon } from "@/icons/RightArrowIcon";
import Image from "next/image";
import { SliderNavigation } from "@/components/UI/SliderNavigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import { useState } from "react";

const cols = [
	{
		icon: '/images/security-page/smart-sockets/icons/1.svg',
		iconWidth: 42,
		iconHeight: 42,
		description: 'Удаленное включение/выключение устройств',
	},
	{
		icon: '/images/security-page/smart-sockets/icons/2.svg',
		iconWidth: 41,
		iconHeight: 41,
		description: 'Управление по расписанию',
	},
	{
		icon: '/images/security-page/smart-sockets/icons/3.svg',
		iconWidth: 42,
		iconHeight: 42,
		description: 'Контроль напряжения и температуры в электросети',
	},
	{
		icon: '/images/security-page/smart-sockets/icons/4.svg',
		iconWidth: 49,
		iconHeight: 42,
		description: 'Голосовое управление',
	},
]

const slides = [
	{
		image: '/images/security-page/smart-sockets/1.jpg',
		description: 'Управление розетками можно ставить в игровой комнате. И когда приезжают гости с детьми – выключать розетки в комнате.',
	},
	{
		image: '/images/security-page/smart-sockets/2.jpg',
		description: 'Иногда этот функционал используют в постирочной зоне, к розетке, к которой подключен утюг, чтобы не переживать, что забыли его отключить.',
	},
	{
		image: '/images/security-page/smart-sockets/3.jpg',
		description: 'При выходе из дома некритичные розетки отключаются автоматически, а под питанием остаются только холодильник, интернет-оборудование и системы безопасности.',
	},
]

export default function SmartSockets() {
	const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
	const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
	return (
		<section className="py-22.5 lg:py-27.5 overflow-hidden">
			<div className="max-w-308 mx-auto px-4">
				<div className="xl:pl-36.25">
					<div className="sm:max-w-142.5 mb-20 lg:mb-30">
						<Title className="mb-6">Управляемые розетки</Title>
						<div className="mb-6 md:mb-4 font-helvetica text-[17px] leading-tight -tracking-[0.01em]">
							Сигнализация в системе Умный дом реализуется за счет комплекса датчиков, которые покрывают всю охраняемую площадь.
						</div>
						<a href="#" className="inline-flex hover:text-foreground transition-colors duration-300 items-center gap-1 text-[15px] font-helvetica font-medium text-brand-blue group">
							Узнать больше
							<RightArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"></RightArrowIcon>
						</a>
					</div>
					<div className="mb-32.5 lg:mb-30 flex flex-col lg:flex-row  items-center gap-20 lg:gap-28">
						<div className="w-85.75 sm:max-w-none flex-none aspect-square relative">
							<Image

								src="/images/security-page/smart-sockets/socket.jpg"
								alt=""
								fill
								className="rounded-[5px] shadow-[-24px_-24px_16px_0_rgba(0,0,0,0.09),-8px_-8px_16px_0_rgba(0,0,0,0.09),-4px_-4px_16px_0_rgba(0,0,0,0.09),-2px_-2px_16px_0_rgba(0,0,0,0.09)]"
							/>
						</div>
						<ul className="grid sm:grid-cols-2 gap-5">
							{cols.map((col, i) =>
								<li key={i} className="sm:min-h-61 flex flex-col justify-between gap-4 rounded-[20px] p-6 bg-white font-semibold -tracking-[0.01em]">
									<Image
										src={col.icon}
										alt=""
										width={col.iconWidth}
										height={col.iconHeight}
									/>
									<p>{col.description}</p>
								</li>
							)}
						</ul>
					</div>
					<div className="xl:-mr-16">
						<h3 className="mb-10 font-helvetica font-bold text-[24px] md:text-[28px] lg:text-[32px] -tracking-[0.01em]">Где применять?</h3>
						<Swiper
							modules={[Navigation]}
							navigation={{
								prevEl: prevEl,
								nextEl: nextEl,
							}}
							breakpoints={{
								320: {
									slidesPerView: 1,
									spaceBetween: 16,
								},
								768: {
									slidesPerView: 2,
									spaceBetween: 40,
								},
							}}
							className="overflow-visible!"
						>
							{slides.map((slide, i) =>
								<SwiperSlide className="mr-4 md:mr-10" key={i}>
									<div className="mb-4 relative bg-white overflow-hidden rounded-[20px] aspect-540/400">
										<Image
											quality={95}
											src={slide.image}
											fill
											className="object-cover"
											alt=""
										/>
									</div>
									<div className="text-[15px] font-helvetica -tracking-[0.01em]">{slide.description}</div>
								</SwiperSlide>
							)}
						</Swiper>
						<SliderNavigation className="justify-end mt-15 lg:mr-16" setPrev={setPrevEl} setNext={setNextEl} />
					</div>
				</div>
			</div>
		</section>
	);
}