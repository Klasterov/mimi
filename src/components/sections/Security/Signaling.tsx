"use client";

import { Title } from "@/components/UI/Title"
import { RightArrowIcon } from "@/icons/RightArrowIcon"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
const items = [
	{
		id: 0,
		image: '/images/security-page/signaling/icons/1.svg',
		title: 'Зональная охрана.',
		description: 'Включите только охрану территории по периметру, когда находитесь дома.',
	},
	{
		id: 1,
		image: '/images/security-page/signaling/icons/2.svg',
		title: 'Разграничение уровней доступа',
		description: 'Обслуживающему персоналу выдаются отдельные доступы, не позволяющие отключать систему безопасности.',
	},
	{
		id: 2,
		image: '/images/security-page/signaling/icons/3.svg',
		title: '“Имитацией присутствия”',
		description: 'Активация на колонках лая собак, включение освещения в комнатах, блокировка дверей.',
	},
	{
		id: 3,
		image: '/images/security-page/signaling/icons/4.svg',
		title: 'Тревожная кнопка.',
		description: 'При реальной угрозе вы сможете вызвать соответствующие органы, нажав одну кнопку в приложении.',
	},
]

const slides = [
	{
		image: '/images/security-page/signaling/1.png',
	},
	{
		image: '/images/security-page/signaling/2.png',
	},
	{
		image: '/images/security-page/signaling/3.png',
	},
	{
		image: '/images/security-page/signaling/1.png',
	},
	{
		image: '/images/security-page/signaling/2.png',
	},
	{
		image: '/images/security-page/signaling/3.png',
	},
]

export default function Signaling() {
	return (
		<section className="py-27.5 overflow-hidden">
			<div className="max-w-235.5 mx-auto px-4 mb-25">
				<Title className="mb-6">Сигнализация</Title>
				<div className="mb-4 font-helvetica -tracking-[0.01em] text-[17px] leading-tight lg:max-w-143">Сигнализация в системе Умный дом реализуется за счет комплекса датчиков, которые покрывают всю охраняемую площадь.</div>
				<a href="#" className="font-helvetica inline-flex items-center gap-1 -tracking-[0.01em] text-[15px] font-medium text-brand-blue group">
					Узнать больше
					<RightArrowIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"></RightArrowIcon>
				</a>
			</div>
			<Swiper
				initialSlide={Math.floor(slides.length / 2)}

				centeredSlides={true}
				spaceBetween={40}
				breakpoints={{
					320: {
						slidesPerView: 1,
					},
					768: {
						slidesPerView: 3,
					},
				}}
				className="overflow-visible! mb-50 lg:mb-45 max-w-334 mx-auto px-4"
			>
				{slides.map((slide, i) =>
					<SwiperSlide className="bg-[linear-gradient(136deg,#f0f1f3_0%,#d3d3d3_100%)] shadow-[0_32px_16px_0_rgba(0,0,0,0.09),0_16px_8px_0_rgba(0,0,0,0.09),0_8px_4px_0_rgba(0,0,0,0.09),0_4px_2px_0_rgba(0,0,0,0.09),0_2px_1px_0_rgba(0,0,0,0.09)] mr-4 aspect-square rounded-[88px] overflow-hidden relative md:mr-10 flex! items-center justify-center" key={i}>
						<div className="max-w-45 w-[44%] aspect-square relative">
							<Image
								src={slide.image}
								fill
								alt=""
							/>
						</div>
					</SwiperSlide>
				)}
			</Swiper>
			<div className="max-w-308 mx-auto px-4">
				<ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 lg:gap-x-5 gap-y-10.5 lg:gap-y-5">
					{items.map(item => (
						<li key={item.id} className="-tracking-[0.01em] flex flex-col items-center gap-4 text-center">
							<Image
								src={item.image}
								width={42}
								height={42}
								alt=""
							/>
							<div className="font-semibold">{item.title}</div>
							<div className="font-helvetica text-[15px]">{item.description}</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
