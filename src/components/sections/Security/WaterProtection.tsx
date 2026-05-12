"use client";

import { Title } from "@/components/UI/Title";
import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { RightArrowIcon } from "@/icons/RightArrowIcon";

const features = [
	{
		id: 0,
		title: 'Как работает',
		content: {
			list: [
				"Устанавливается датчик протечки и клапан перекрытия воды.",
				"При попадании воды на датчик, клапан перекроет воду.",
			],
		},
		image: '/images/security-page/water-protection/1.png',
	},
	{
		id: 1,
		title: 'Датчики протечки',
		content: {
			list: [
				"О них невозможно запнуться",
				"Их невозможно перевернуть",
				"Они не перестанут работать в самый нужный момент",
				"Они реально стильные и не портят дизайн",
				"Им не требуется обслуживание",
			],
		},
		image: '/images/security-page/water-protection/2.png',
	},
	{
		id: 2,
		title: 'Ложные срабатывания',
		content: {
			subtitle: "Если в момент попадания воды человек находится рядом с датчиком протечки, то система поймет, что срабатывание ложное и проинформирует владельца о попадании воды на датчик, но не перекроет воду.",
		},
		image: '/images/security-page/water-protection/3.png',
	},
	{
		id: 3,
		title: 'Оповещение пользователя о протечке',
		content: {
			subtitle: "При реальном срабатывании система на максимальной громкости колонки (а также в приложении) моментально проинформирует пользователей о протечке, и перекроет воду.",
		},
		image: '/images/security-page/water-protection/4.png',
	},
	{
		id: 4,
		title: 'Локализация',
		content: {
			subtitle: "Если протечка была, например в гостевой ванной, вовсе не обязательно перекрывать всю воду в доме. Достаточно перекрыть примыкающий узел. ",
		},
		image: '/images/security-page/water-protection/4.png',
	},
]

export default function WaterProtection() {
	const [activeIndex, setActiveIndex] = useState(1);
	const swiperRef = useRef<any>(null);

	const total = features.length
	const handlePrev = () => {
		if (activeIndex > 0) {
			swiperRef.current?.slidePrev()
		}
	}

	const handleNext = () => {
		if (activeIndex < total - 1) {
			swiperRef.current?.slideNext()
		}
	}

	const handleSelect = (index: number) => {
		setActiveIndex(index);
		swiperRef.current?.slideTo(index);
	};
	return (
		<section className="pt-22.5 lg:pt-30 pb-22.5 overflow-hidden">
			<div className="max-w-308 mb-10 mx-auto px-4 flex md:flex-row flex-col items-start gap-10 justify-between md:items-end">
				<Title>Защита от протечек воды</Title>
				<a href="#" className="font-helvetica inline-flex lg:items-center gap-1 -tracking-[0.01em] text-[15px] font-medium text-brand-blue group whitespace-nowrap">
					Узнать больше
					<RightArrowIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"></RightArrowIcon>
				</a>
			</div>
			<div className="max-w-348 mx-auto px-4">
				<div className="rounded-3xl overflow-hidden bg-white min-h-152.5 items-center gap-30 lg:flex hidden">
					<div className="py-15 pl-20 flex-none w-[37%] relative">
						<div className="hidden lg:flex absolute top-1/2 left-5 -translate-y-1/2 flex-col gap-4 text-[#acacac]">
							<button

								onClick={handlePrev}
								disabled={activeIndex === 0}
								className="w-9 h-9 rounded-full bg-background flex items-center justify-center cursor-pointer hover:opacity-80 rotate-90 transition-opacity duration-300 disabled:opacity-20 disabled:cursor-default"
							>
								<RightArrowIcon className="rotate-180 w-5 h-5"></RightArrowIcon>
							</button>
							<button

								onClick={handleNext}
								disabled={activeIndex === total - 1}
								className="rotate-90 w-9 h-9 rounded-full bg-background flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity duration-300 disabled:opacity-20 disabled:cursor-default"
							>
								<RightArrowIcon className="w-5 h-5"></RightArrowIcon>
							</button>
						</div>
						<ul className="space-y-6 leading-snug -tracking-[0.01em]">
							{features.map((item, idx) => (
								<li key={item.id} className={`${activeIndex === idx && "bg-background rounded-[20px] p-6"}`}>
									<button
										onClick={() => handleSelect(idx)}
										className={`cursor-pointer text-left font-semibold font-helvetica ${activeIndex === idx ? 'text-foreground' : 'text-foreground/60'}`}
									>
										{item.title}
									</button>
									{activeIndex === idx && item.content && (
										<div className="pt-4">
											<p className="mb-1">{item.content?.subtitle}</p>
											<ul className="space-y-px">
												{item.content.list?.map((li, i) => (
													<li key={i} className="flex items-start">
														<span className="mr-2">•</span> {li}
													</li>
												))}
											</ul>
										</div>
									)}
								</li>
							))}
						</ul>
					</div>
					<div className="flex-auto min-w-0 self-stretch">
						<Swiper
							modules={[EffectFade]}
							effect="fade"
							onSwiper={(swiper) => (swiperRef.current = swiper)}
							onSlideChange={(s) => setActiveIndex(s.activeIndex)}
							className="h-full"
						>
							{features.map((item, idx) => (
								<SwiperSlide key={idx} className="relative">
									<Image
										src={item.image}
										fill
										alt={item.title}
										className="w-full h-auto object-cover bg-white"
									/>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
				<div className="lg:hidden px-4 -mx-4">
					<Swiper
						className="-mx-4 px-4 overflow-visible!"
						spaceBetween={16}
						modules={[Pagination]}
						pagination={{ clickable: true }}
						slidesPerView={1}
					>
						{features.map((item, idx) => (
							<SwiperSlide key={idx} className="min-h-148 p-4 rounded-3xl bg-white mr-4">
								<div className="rounded-[20px] mb-4 p-6 bg-background leading-snug -tracking-[0.01em]">
									<div className="mb-4 font-helvetica font-semibold">{item.title}</div>
									<div>

										<p className="mb-1">{item.content.subtitle}</p>
										<ul className="space-y-1">
											{item.content.list?.map((li, i) => (
												<li key={i} className="flex items-start">
													<span className="mr-2">•</span>
													{li}
												</li>
											))}
										</ul>
									</div>
								</div>
								<div className="relative aspect-735/610 max-w-120 mx-auto">
									<Image
										src={item.image}
										fill
										alt={item.title}
										className="object-cover"
									/>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</section>
	);
}