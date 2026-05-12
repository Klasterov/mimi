"use client";

import { Title } from "@/components/UI/Title";
import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import Link from "next/link";
import { RightArrowIcon } from "@/icons/RightArrowIcon";

const features = [
	{
		id: 0,
		title: 'Отправка голосовых сообщений',
		content: {
			text: "Отправляйте голосовые оповещения в любую комнату, просто произнеся сообщение в телефон. Например, позовите детей к столу, когда они заигрались в детской.",
		},
		image: '/images/multiroom-page/features/1.png',
	},
	{
		id: 1,
		title: 'Следящая музыка',
		content: {
			text: "Вам не придется отрываться от прослушивания любимой композиции только потому, что нужно пойти в другую комнату. Система создает эффект следования музыки за вами, получая данные с датчиков движения. ",
			link: {
				text: 'Узнать больше про аудио',
				url: '/',
			}
		},
		image: '/images/multiroom-page/features/2.png',
	},
	{
		id: 2,
		title: 'Оповещение в экстренных ситуациях',
		content: {
			text: "В случае попытки взлома или, например, аварийной протечки труб на кухне включаются колонки аудиосистемы мультирум и оповещают всех, кто находится в доме. Это позволяет быстро среагировать и своевременно принять меры в любой экстренной ситуации.",
			link: {
				text: 'Узнать больше про датчики',
				url: '/',
			}
		},
		image: '/images/multiroom-page/features/3.png',
	},
	{
		id: 3,
		title: 'Календарь',
		content: {
			text: "Поставьте напоминание в свой календарь и система напомнит о предстоящих делах. Вы точно не забудете про день рождения друга!",
		},
		image: '/images/multiroom-page/features/4.png',
	},
	{
		id: 4,
		title: 'Синхронизация с устройствами',
		content: {
			text: 'Воспроизводите музыку, которая находится на телефоне или добавьте атмосферности при просмотра кино на телевизоре.',
		},
		image: '/images/multiroom-page/features/5.png',
	},
	{
		id: 5,
		title: 'Домашний кинотеатр',
		content: {
			list: [
				"Планируем размещение акустики",
				"Грамотно располагаем свет",
				"Планируем работу микроклимата",
				"Подбираем проектор и экран",
				"Часто все элементы скрыты и выезжают при необходимости",
			],
			link: {
				text: 'Узнать больше',
				url: '/',
			}
		},
		image: '/images/multiroom-page/features/6.png',
	},
]

export default function MultiroomFeatures() {
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
		<section className="pt-5 pb-22.5 md:pt-25 md:pb-25 lg:pb-30 lg:pt-30 overflow-hidden">
			<Title className="max-w-308 mb-6 md:mb-8 lg:mb-10 mx-auto px-4">Функционал</Title>
			<div className="max-w-348 mx-auto px-4">
				<div className="bg-foreground rounded-3xl overflow-hidden min-h-150 items-center gap-30 lg:flex hidden">
					<div className="py-15 pl-20 flex-none w-[37%] relative">
						<div className="hidden lg:flex absolute top-1/2 left-5 -translate-y-1/2 flex-col gap-4 text-[#acacac]">
							<button

								onClick={handlePrev}
								disabled={activeIndex === 0}
								className="w-9 h-9 rounded-full bg-black flex items-center justify-center cursor-pointer hover:opacity-80 rotate-90 transition-opacity duration-300 disabled:opacity-20 disabled:cursor-default"
							>
								<RightArrowIcon className="rotate-180 w-5 h-5"></RightArrowIcon>
							</button>
							<button

								onClick={handleNext}
								disabled={activeIndex === total - 1}
								className="rotate-90 w-9 h-9 rounded-full bg-black flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity duration-300 disabled:opacity-20 disabled:cursor-default"
							>
								<RightArrowIcon className="w-5 h-5"></RightArrowIcon>
							</button>
						</div>
						<ul className="space-y-6 leading-snug -tracking-[0.01em]">
							{features.map((item, idx) => (
								<li key={item.id} className={`${activeIndex === idx && "bg-black rounded-[20px] p-6"}`}>
									<button
										onClick={() => handleSelect(idx)}
										className={`cursor-pointer text-left font-semibold font-helvetica ${activeIndex === idx ? 'text-white' : 'text-white/60'}`}
									>
										{item.title}
									</button>
									{activeIndex === idx && item.content && (
										<div className="pt-4 space-y-4 text-white">
											{item.content.text && (
												<p>{item.content.text}</p>
											)}
											{item.content.list &&
												(
													<ul className="space-y-px">
														{item.content.list.map((li, i) => (
															<li key={i} className="flex items-start">
																<span className="mr-2">•</span> {li}
															</li>
														))}
													</ul>
												)}
											{item.content.link &&
												(<Link className="text-brand-blue flex hover:text-white transition-colors duration-300 items-center gap-1 text-[15px] font-medium group" href={item.content.link.url}>
													{item.content.link.text}

													<RightArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
												</Link>)
											}
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
										className="w-full h-auto object-cover bg-foreground"
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
							<SwiperSlide key={idx} className="px-4 pt-4 rounded-3xl bg-foreground mr-4 overflow-hidden flex! flex-col min-h-165">
								<div className="rounded-[20px] mb-4 p-6 text-white bg-black leading-snug -tracking-[0.01em]">
									<div className="mb-4 font-helvetica font-semibold">{item.title}</div>
									<div>
										{item.content.text && (
											<p>{item.content.text}</p>
										)}
										{item.content.list &&
											(
												<ul className="space-y-px">
													{item.content.list.map((li, i) => (
														<li key={i} className="flex items-start">
															<span className="mr-2">•</span> {li}
														</li>
													))}
												</ul>
											)}
										{item.content.link &&
											(<Link href={item.content.link.url}>{item.content.link.text}</Link>)
										}
									</div>
								</div>
								<div className="relative mt-auto -mx-4 aspect-735/610 sm:max-w-120 sm:mx-auto">
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