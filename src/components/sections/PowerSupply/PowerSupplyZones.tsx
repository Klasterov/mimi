"use client"

import { Title } from "@/components/UI/Title"
import Image from "next/image"
import { useState } from "react"
import { RightArrowIcon } from "@/icons/RightArrowIcon"

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
const features = [
	{
		id: 0,
		title: "Связь",
		text: "Отправляйте голосовые оповещения в любую комнату, просто произнеся сообщение в телефон. Например, позовите детей к столу, когда они заигрались в детской.",
	},
	{
		id: 1,
		title: "Безопасность",
		text: "Отправляйте голосовые оповещения в любую комнату, просто произнеся сообщение в телефон. Например, позовите детей к столу, когда они заигрались в детской.",
	},
	{
		id: 2,
		title: "Сервер/шкаф автоматики",
		text: "Отправляйте голосовые оповещения в любую комнату, просто произнеся сообщение в телефон. Например, позовите детей к столу, когда они заигрались в детской.",
	},
	{
		id: 3,
		title: "Критичный свет",
		text: "Отправляйте голосовые оповещения в любую комнату, просто произнеся сообщение в телефон. Например, позовите детей к столу, когда они заигрались в детской.",
	},
]

export default function PowerSupplyZones() {
	const [activeIndex, setActiveIndex] = useState(0)
	const total = features.length

	const handlePrev = () => {
		if (activeIndex > 0) setActiveIndex(activeIndex - 1)
	}

	const handleNext = () => {
		if (activeIndex < total - 1) setActiveIndex(activeIndex + 1)
	}

	return (
		<section className="pt-22.5 lg:pt-30 pb-22.5 overflow-hidden">
			<Title className="max-w-308 mb-6 md:mb-8 lg:mb-10 mx-auto px-4">
				Зоны резервирования
			</Title>

			<div className="max-w-348 mx-auto px-4">
				<div className="rounded-3xl hidden overflow-hidden bg-white min-h-152.5 items-center gap-30 lg:flex">

					{/* LEFT */}
					<div className="py-15 pl-20 flex-none w-[37%] relative">

						<div className="hidden lg:flex absolute top-1/2 left-5 -translate-y-1/2 flex-col gap-4 text-[#acacac]">
							<button
								onClick={handlePrev}
								disabled={activeIndex === 0}
								className="w-9 h-9 rounded-full bg-background flex items-center justify-center cursor-pointer hover:opacity-80 rotate-90 transition-opacity duration-300 disabled:opacity-20 disabled:cursor-default"
							>
								<RightArrowIcon className="rotate-180 w-5 h-5" />
							</button>

							<button
								onClick={handleNext}
								disabled={activeIndex === total - 1}
								className="rotate-90 w-9 h-9 rounded-full bg-background flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity duration-300 disabled:opacity-20 disabled:cursor-default"
							>
								<RightArrowIcon className="w-5 h-5" />
							</button>
						</div>

						<ul className="space-y-6 leading-snug -tracking-[0.01em]">
							{features.map((item, idx) => (
								<li
									key={item.id}
									className={`${activeIndex === idx && "bg-background rounded-[20px] p-6"}`}
								>
									<button
										onClick={() => setActiveIndex(idx)}
										className={`cursor-pointer text-left font-semibold font-helvetica ${activeIndex === idx
											? "text-foreground"
											: "text-foreground/60"
											}`}
									>
										{item.title}
									</button>

									{activeIndex === idx && (
										<div className="pt-4">
											<p>{item.text}</p>
										</div>
									)}
								</li>
							))}
						</ul>
					</div>

					{/* RIGHT IMAGE */}
					<div className="flex-auto min-w-0 self-stretch relative">
						<Image
							src="/images/power-supply-page/zones/decor.png"
							fill
							alt="decor"
							className="object-cover"
						/>
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
							<SwiperSlide key={idx} className="p-4 rounded-3xl bg-white mr-4 min-h-182">
								<div className="rounded-[20px] mb-4 p-6 bg-background leading-snug -tracking-[0.01em]">
									<div className="mb-4 font-helvetica font-semibold">{item.title}</div>

									<div className="pt-4">
										<p>{item.text}</p>
									</div>
								</div>
								<div className="relative aspect-735/610 max-w-120 mx-auto">
									<Image
										src="/images/power-supply-page/zones/decor.png"
										fill
										alt="decor"
										className="object-cover"
									/>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</section>
	)
}