'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Title } from '../UI/Title'
import { Pagination } from 'swiper/modules'
import { BtnArrowIcon } from '@/icons/BtnArrowIcon'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type CapabilityKey =
	| 'gates'
	| 'ventilation'
	| 'lighting'
	| 'climate'
	| 'security'
	| 'curtains'
	| 'surveillance'
	| 'electric'
	| 'cinema'
	| 'multiroom'

type CapabilityItem = {
	key: CapabilityKey
	label: string
	render: (props?: {
		phrase1Ref?: React.RefObject<HTMLSpanElement | null>
		phrase2Ref?: React.RefObject<HTMLSpanElement | null>
	}) => React.ReactNode
}

const capabilityOrder: CapabilityKey[] = [
	'gates',
	'ventilation',
	'lighting',
	'climate',
	'security',
	'curtains',
	'surveillance',
	'electric',
	'cinema',
	'multiroom',
]

const capabilitiesItems: CapabilityItem[] = [
	{
		key: 'gates',
		label: 'Ворота',
		render: () => (
			<>
				<div className="relative bg-[#f9fbfc] shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-10 px-6 md:py-8 md:px-12 lg:py-15 lg:px-20 gap-4 min-h-125 lg:min-h-150 overflow-hidden flex flex-col justify-between">
					<div className="h-9 md:h-12 lg:h-auto lg:pl-1 lg:pt-3">
						<Image
							src="/images/capabilities/titles/10.png"
							quality={95}
							alt=""
							width={342}
							height={100}
							className="max-h-full w-auto"
						/>
					</div>
					<h3 className="hidden">Ворота</h3>
					<div className="flex relative z-10 justify-between gap-4 items-start sm:items-end lg:items-end flex-col sm:flex-row">
						<p className="font-helvetica text-[16px] sm:max-w-85 lg:max-w-83 leading-snug tracking-[-0.01em] text-brand-gray">
							Защита от протечек воды, охранная сигнализация, имитацция присутствия.
						</p>
						<button className="shadow-[inset_-3px_-3px_6px_1px_rgba(255,255,255,0.5),inset_3px_3px_6px_0_#eaeaea] cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#5a250a] group hover:opacity-80 transition-opacity">
							Подробнее
							<BtnArrowIcon className="group-hover:translate-x-1 transition-transform duration-300 w-6 h-6" />
						</button>
					</div>
					<span className="absolute w-full sm:w-70% bottom-0 right-0 lg:w-[73.16%] aspect-878/600">
						<Image
							quality={95}
							src="/images/capabilities/decor/10.png"
							alt="Ворота"
							fill
						/>
					</span>
				</div>

				<div className="absolute left-1/2 bottom-0 bg-[#D9D9D9]/90 -translate-x-1/2 translate-y-1/2 rounded-[50px] backdrop-blur-xs text-[15px] py-1.5 px-4 leading-normal text-[#303236] -tracking-[0.01em]">
					Ворота
				</div>
			</>
		),
	},
	{
		key: 'ventilation',
		label: 'Вентиляция',
		render: () => (
			<>
				<div className="relative bg-[#f9fbfc] shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-10 px-6 md:py-8 md:px-12 lg:py-15 lg:px-20 gap-4 min-h-125 lg:min-h-150 overflow-hidden flex flex-col justify-between">
					<div className="h-9 md:h-12 lg:h-auto lg:pl-1 lg:pt-3">
						<Image
							src="/images/capabilities/titles/9.png"
							quality={95}
							alt=""
							width={598}
							height={100}
							className="max-h-full w-auto"
						/>
					</div>
					<h3 className="hidden">Вентиляция</h3>
					<div className="flex relative z-10 justify-between gap-4 items-start sm:items-end lg:items-end flex-col sm:flex-row">
						<p className="font-helvetica text-[16px] sm:max-w-85 lg:max-w-100 leading-snug tracking-[-0.01em] text-brand-gray">
							Свежий воздух без лишних настроек. <br />
							Управление притоком и вытяжкой по уровню CO₂
						</p>
						<button className="shadow-[inset_-3px_-3px_6px_1px_rgba(255,255,255,0.5),inset_3px_3px_6px_0_#eaeaea] cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#5a250a] group hover:opacity-80 transition-opacity">
							Подробнее
							<BtnArrowIcon className="group-hover:translate-x-1 transition-transform duration-300 w-6 h-6" />
						</button>
					</div>
					<span className="absolute w-50 sm:w-90 bottom-[35%] sm:bottom-0 right-0 lg:w-[43.4%] aspect-521/573">
						<Image
							quality={95}
							src="/images/capabilities/decor/9.png"
							alt="Вентиляция"
							fill
						/>
					</span>
				</div>

				<div className="absolute left-1/2 bottom-0 bg-[#D9D9D9]/90 -translate-x-1/2 translate-y-1/2 rounded-[50px] backdrop-blur-xs text-[15px] py-1.5 px-4 leading-normal text-[#303236] -tracking-[0.01em]">
					Вентиляция
				</div>
			</>
		),
	},
	{
		key: 'lighting',
		label: 'Освещение',
		render: () => (
			<>
				<div className="relative bg-[linear-gradient(225deg,#f4dbc5_0%,#f4f4f4_48.56%,#d1a683_100%)] shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-10 px-6 md:py-8 md:px-12 lg:py-15 lg:px-20 gap-4 min-h-125 lg:min-h-150 overflow-hidden flex flex-col justify-between">
					<div className="h-9 md:h-12 lg:h-auto lg:pl-1 lg:pt-3">
						<Image
							src="/images/capabilities/titles/1.png"
							quality={95}
							alt="Фон"
							width={548}
							height={90}
							className="max-h-full w-auto"
						/>
					</div>
					<h3 className="hidden">Освещение</h3>
					<div className="flex justify-between gap-4 items-start sm:items-end lg:items-end flex-col sm:flex-row">
						<p className="font-helvetica text-[16px] sm:max-w-85 lg:max-w-85 leading-snug tracking-[-0.01em] text-[#907e70]">
							Подходят любые светильники. <br /> Регулируйте яркость, температуру теплого и холодного света. Управляйте шторами с кнопок и с телефона.
						</p>
						<button className="shadow-[inset_-3px_-3px_6px_1px_rgba(255,255,255,0.5),inset_3px_3px_6px_0_#eaeaea] cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#5a250a] group hover:opacity-80 transition-opacity">
							Подробнее
							<BtnArrowIcon className="group-hover:translate-x-1 transition-transform duration-300 w-6 h-6" />
						</button>
					</div>
					<span className="absolute w-98 top-0 -right-20 sm:-right-5 lg:w-[44%] lg:top-0 lg:-right-7.25 aspect-233/200 lg:aspect-584/500">
						<Image
							quality={95}
							src="/images/capabilities/decor/1.png"
							alt="Лампа"
							fill
						/>
					</span>
				</div>

				<div className="absolute left-1/2 bottom-0 bg-[#D9D9D9]/90 -translate-x-1/2 translate-y-1/2 rounded-[50px] backdrop-blur-xs text-[15px] py-1.5 px-4 leading-normal text-[#303236] -tracking-[0.01em]">
					Освещение
				</div>
			</>
		),
	},
	{
		key: 'climate',
		label: 'Климат',
		render: () => (
			<>
				<div className="relative shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-10 px-6 md:py-8 md:px-12 lg:py-15 lg:px-20 bg-[#adafbb] gap-4 min-h-125 lg:min-h-150 overflow-hidden flex flex-col justify-between">
					<div className="h-9 md:h-12 lg:h-auto lg:pl-1 lg:pt-3">
						<Image
							src="/images/capabilities/titles/2.png"
							quality={95}
							alt="Фон"
							width={351}
							height={74}
							className="max-h-full w-auto"
						/>
					</div>
					<h3 className="hidden">Климат</h3>
					<div className="flex justify-between gap-4 items-start sm:items-end lg:items-end flex-col sm:flex-row">
						<p className="font-helvetica text-[16px] sm:max-w-85 lg:max-w-85 leading-snug tracking-[-0.01em] text-[#303236]">
							Автоматический климат-контроль: <br /> слаженная работа отопления, теплых полов, кондиционеров, вентиляции и увлажнения
						</p>
						<button className="group cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#0a051a] hover:opacity-80 transition-opacity">
							Подробнее
							<BtnArrowIcon className="group-hover:translate-x-1 transition-transform duration-300 w-6 h-6" />
						</button>
					</div>

					<span className="absolute w-45 md:w-70 lg:w-80.5 top-20 md:top-7 right-4 lg:top-7 lg:right-6 aspect-322/303">
						<Image
							quality={95}
							src="/images/capabilities/decor/2.png"
							alt="Фон"
							fill
						/>
					</span>
				</div>
				<div className="absolute left-1/2 bottom-0 bg-[#D9D9D9]/90 -translate-x-1/2 translate-y-1/2 rounded-[50px] backdrop-blur-xs text-[15px] py-1.5 px-4 leading-normal text-[#303236] -tracking-[0.01em]">
					Климат
				</div>
			</>
		),
	},
	{
		key: 'security',
		label: 'Безопасность',
		render: () => (
			<>
				<div className="relative shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-10 px-6 md:py-8 md:px-12 lg:py-15 lg:px-20 bg-[#0f1015] gap-4 min-h-125 lg:min-h-150 overflow-hidden flex flex-col justify-between">
					<Image
						className="object-cover"
						src="/images/capabilities/bg/3.png"
						quality={95}
						alt="Фон"
						fill
					/>
					<div className="h-9 md:h-12 lg:h-auto lg:pl-1 lg:pt-3 relative">
						<Image
							src="/images/capabilities/titles/3.png"
							quality={95}
							alt="Фон"
							width={585}
							height={67}
							className="max-h-full w-auto"
						/>
					</div>
					<h3 className="hidden">Безопасность</h3>
					<div className="relative flex justify-between gap-4 items-start sm:items-end lg:items-end flex-col sm:flex-row">
						<p className="font-helvetica text-[16px] sm:max-w-85 lg:max-w-85 leading-snug tracking-[-0.01em] text-[#95979e]">
							Защита от протечек воды, охранная сигнализация, имитацция присутствия
						</p>
						<button className="group shadow-[inset_-3px_-3px_6px_1px_rgba(255,255,255,0.5),inset_3px_3px_6px_0_#eaeaea] cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#0a051a] hover:opacity-80 transition-opacity">
							Подробнее
							<BtnArrowIcon className="group-hover:translate-x-1 transition-transform duration-300 w-6 h-6" />
						</button>
					</div>
				</div>
				<div className="absolute left-1/2 bottom-0 bg-[#D9D9D9]/90 -translate-x-1/2 translate-y-1/2 rounded-[50px] backdrop-blur-xs text-[15px] py-1.5 px-4 leading-normal text-[#303236] -tracking-[0.01em]">
					Безопасность
				</div>
			</>
		),
	},
	{
		key: 'curtains',
		label: 'Шторы',
		render: () => (
			<>
				<div className="relative shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-10 px-6 md:py-8 md:px-12 lg:py-15 lg:px-20 bg-[#c7c7c9] gap-4 min-h-125 lg:min-h-150 overflow-hidden flex flex-col justify-between">
					<Image
						className="object-cover"
						src="/images/capabilities/bg/4.png"
						quality={95}
						alt="Фон"
						fill
					/>
					<div className="h-9 md:h-12 lg:h-auto lg:pl-1 lg:pt-3">
						<Image
							src="/images/capabilities/titles/4.png"
							quality={95}
							alt="Фон"
							width={334}
							height={94}
							className="max-h-full w-auto"
						/>
					</div>
					<h3 className="hidden">Шторы</h3>
					<div className="relative flex justify-between gap-4 items-start sm:items-end lg:items-end flex-col sm:flex-row">
						<p className="font-helvetica text-[16px] sm:max-w-85 lg:max-w-85 leading-snug tracking-[-0.01em] text-[#58595d]">
							Управляем любыми видами отопления, теплых полов и конвекторов. В каждой комнате своя, комфортная каждому температура.
						</p>
						<button className="group cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#0a051a] hover:opacity-80 transition-opacity">
							Подробнее
							<BtnArrowIcon className="group-hover:translate-x-1 transition-transform duration-300 w-6 h-6" />
						</button>
					</div>
				</div>
				<div className="absolute left-1/2 bottom-0 bg-[#D9D9D9]/90 -translate-x-1/2 translate-y-1/2 rounded-[50px] backdrop-blur-xs text-[15px] py-1.5 px-4 leading-normal text-[#303236] -tracking-[0.01em]">
					Шторы
				</div>
			</>
		),
	},
	{
		key: 'surveillance',
		label: 'Видеонаблюдение',
		render: () => (
			<>
				<div className="relative shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-10 px-6 md:py-8 md:px-12 lg:py-15 lg:px-20 bg-[#eee] gap-4 min-h-125 lg:min-h-150 overflow-hidden flex flex-col justify-between">
					<Image
						className="object-cover"
						src="/images/capabilities/bg/5.png"
						quality={95}
						alt="Фон"
						fill
					/>
					<div className="h-18 md:h-24 lg:h-auto lg:pl-1 lg:pt-3">
						<Image
							src="/images/capabilities/titles/5.png"
							quality={95}
							alt="Фон"
							width={584}
							height={189}
							className="max-h-full w-auto"
						/>
					</div>
					<h3 className="hidden">Видеонаблюдение</h3>
					<div className="relative flex justify-between gap-4 items-start sm:items-end lg:items-end flex-col sm:flex-row">
						<p className="font-helvetica text-[16px] sm:max-w-85 lg:max-w-85 leading-snug tracking-[-0.01em] text-[#95979e]">
							Смотрите ваши камеры и отвечайте на звонок в домофон в любой точке мира. Наблюдайте за домом и будьте уверены, что с родными все в порядке.
						</p>
						<button className="group cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#0a051a] hover:opacity-80 transition-opacity">
							Подробнее
							<BtnArrowIcon className="group-hover:translate-x-1 transition-transform duration-300 w-6 h-6" />
						</button>
					</div>
				</div>
				<div className="absolute left-1/2 bottom-0 bg-[#D9D9D9]/90 -translate-x-1/2 translate-y-1/2 rounded-[50px] backdrop-blur-xs text-[15px] py-1.5 px-4 leading-normal text-[#303236] -tracking-[0.01em]">
					Видеонаблюдение
				</div>
			</>
		),
	},
	{
		key: 'electric',
		label: 'Электрика',
		render: () => (
			<>
				<div className="relative bg-[radial-gradient(50%_200%_at_50%_50%,#F4EFC5_0%,#F4F4F4_48.56%,#D3B291_100%)] shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-10 px-6 md:py-8 md:px-12 lg:py-15 lg:px-20 gap-4 min-h-125 lg:min-h-150 overflow-hidden flex flex-col justify-between">
					<Image
						className="object-cover"
						src="/images/capabilities/bg/6.png"
						quality={95}
						alt="Фон"
						fill
					/>
					<div className="h-9 md:h-12 lg:h-auto lg:pl-1 lg:pt-3">
						<Image
							src="/images/capabilities/titles/6.png"
							quality={95}
							alt="Фон"
							width={503}
							height={95}
							className="max-h-full w-auto"
						/>
					</div>
					<h3 className="hidden">Электрика</h3>
					<div className="relative flex justify-between gap-4 items-start sm:items-end lg:items-end flex-col sm:flex-row">
						<p className="font-helvetica text-[16px] sm:max-w-85 lg:max-w-85 leading-snug tracking-[-0.01em] text-[#58595d]">
							Спроектируем и реализуем современную электрику. Управление розетками, сценарные выключатели, стабилизация напряжения, резервное питание, молниезащита.
						</p>
						<button className="group cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#0a051a] hover:opacity-80 transition-opacity">
							Подробнее
							<BtnArrowIcon className="group-hover:translate-x-1 transition-transform duration-300 w-6 h-6" />
						</button>
					</div>
				</div>
				<div className="absolute left-1/2 bottom-0 bg-[#D9D9D9]/90 -translate-x-1/2 translate-y-1/2 rounded-[50px] backdrop-blur-xs text-[15px] py-1.5 px-4 leading-normal text-[#303236] -tracking-[0.01em]">
					Электрика
				</div>
			</>
		),
	},
	{
		key: 'cinema',
		label: 'Кинотеатр',
		render: () => (
			<>
				<div className="relative shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-10 px-6 md:py-8 md:px-12 lg:py-15 lg:px-20 bg-[#c9c9ca] gap-4 min-h-125 lg:min-h-150 overflow-hidden flex flex-col justify-between">
					<Image
						className="object-cover"
						src="/images/capabilities/bg/7.png"
						quality={95}
						alt="Фон"
						fill
					/>
					<div className="h-9 md:h-12 lg:h-auto lg:pl-1 lg:pt-3">
						<Image
							src="/images/capabilities/titles/7.png"
							quality={95}
							alt="Фон"
							width={496}
							height={94}
							className="max-h-full w-auto"
						/>
					</div>
					<h3 className="hidden">Кинотеатр</h3>
					<div className="relative flex justify-between gap-4 items-start sm:items-end lg:items-end flex-col sm:flex-row">
						<p className="font-helvetica text-[16px] sm:max-w-85 lg:max-w-85 leading-snug tracking-[-0.01em] text-[#303236]">
							Оборудуем кинозалы и кино в гостиной под ключ. Автоматизируем аппаратуру кино и создаем удобные сценарии
						</p>
						<button className="group cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#0a051a] hover:opacity-80 transition-opacity">
							Подробнее
							<BtnArrowIcon className="group-hover:translate-x-1 transition-transform duration-300 w-6 h-6" />
						</button>
					</div>
				</div>
				<div className="absolute left-1/2 bottom-0 bg-[#D9D9D9]/90 -translate-x-1/2 translate-y-1/2 rounded-[50px] backdrop-blur-xs text-[15px] py-1.5 px-4 leading-normal text-[#303236] -tracking-[0.01em]">
					Кинотеатр
				</div>
			</>
		),
	},
	{
		key: 'multiroom',
		label: 'Мультирум',
		render: ({ phrase1Ref, phrase2Ref } = {}) => (
			<>
				<div className="relative shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-10 px-6 md:py-8 md:px-12 lg:py-15 lg:px-20 bg-[radial-gradient(50%_50%_at_50%_50%,#462925_0%,#000000_100%)] gap-4 min-h-125 lg:min-h-150 overflow-hidden flex flex-col justify-between">
					<Image
						className="object-cover z-10"
						src="/images/capabilities/bg/8-pc.jpg"
						quality={95}
						alt="Фон"
						fill
					/>

					<div className="absolute bottom-[19%] sm:bottom-[18%] md:bottom-[18.6%] lg:bottom-[17.7%] right-[27%] lg:right-[27%] w-[28%] sm:w-[18.83%] lg:w-[18.83%] aspect-square font-medium text-[14px] sm:text-[15px] lg:text-[15px] text-white tracking-[-0.01em] z-20">
						<Image
							quality={95}
							src="/images/capabilities/decor/8.png"
							alt="Фон"
							fill
						/>

						{/* <span
							ref={phrase1Ref}
							className="absolute left-1/2 bottom-[calc(100%+37px)] -translate-x-1/2 whitespace-nowrap"
						>
							Алиса, включи музыку на кухне
						</span>
						<span
							ref={phrase2Ref}
							className="absolute left-1/2 bottom-[calc(100%+10px)] -translate-x-1/2 whitespace-nowrap opacity-30"
						>
							– Дети, все к столу!
						</span> */}
					</div>

					<div className="h-9 md:h-12 lg:h-auto lg:pl-1 lg:pt-3 relative z-20">
						<Image
							src="/images/capabilities/titles/8.png"
							quality={95}
							alt="Фон"
							width={530}
							height={94}
							className="max-h-full w-auto"
						/>
					</div>
					<h3 className="hidden">Мультирум</h3>
					<div className="relative flex justify-between gap-4 items-start sm:items-end lg:items-end flex-col sm:flex-row z-20">
						<p className="font-helvetica text-[16px] sm:max-w-85 lg:max-w-85 leading-snug tracking-[-0.01em] text-[#92969d]">
							Своя музыка в каждой комнате, AirPlay, следящая музыка, звуковые оповещения
						</p>
						<button className="group cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#0a051a] hover:opacity-80 transition-opacity">
							Подробнее
							<BtnArrowIcon className="group-hover:translate-x-1 transition-transform duration-300 w-6 h-6" />
						</button>
					</div>
				</div>
				<div className="absolute z-10 left-1/2 bottom-0 bg-[#D9D9D9]/90 -translate-x-1/2 translate-y-1/2 rounded-[50px] backdrop-blur-xs text-[15px] py-1.5 px-4 leading-normal text-[#303236] -tracking-[0.01em]">
					Мультирум
				</div>
			</>
		),
	},
]

type CapabilitiesProps = {
	title: string
	items?: CapabilityKey[]
}

export default function Capabilities({
	title,
	items = capabilityOrder,
}: CapabilitiesProps) {
	const titleRef = useRef<HTMLHeadingElement | null>(null)
	const phrase1Ref = useRef<HTMLSpanElement | null>(null)
	const phrase2Ref = useRef<HTMLSpanElement | null>(null)

	const visibleItems = items
		.map(key => capabilitiesItems.find(item => item.key === key))
		.filter(Boolean) as CapabilityItem[]

	useEffect(() => {
		const hasMultiroom = visibleItems.some(item => item.key === 'multiroom')

		if (!hasMultiroom || !phrase1Ref.current || !phrase2Ref.current) return

		const tl = gsap.timeline({
			repeat: -1,
			defaults: { duration: 0.6, ease: 'power1.out' },
		})

		tl.fromTo(
			phrase1Ref.current,
			{ opacity: 0, y: 6 },
			{ opacity: 1, y: 0 }
		)
		tl.to(phrase1Ref.current, { opacity: 1, duration: 2 })
		tl.to(phrase1Ref.current, { opacity: 0, y: -6, duration: 0.6 })

		tl.fromTo(
			phrase2Ref.current,
			{ opacity: 0, y: 6 },
			{ opacity: 1, y: 0, duration: 0.6 }
		)
		tl.to(phrase2Ref.current, { opacity: 1, duration: 2 })
		tl.to(phrase2Ref.current, { opacity: 0, y: -6, duration: 0.6 })

		return () => {
			tl.kill()
		}
	}, [visibleItems])

	useEffect(() => {
		if (!titleRef.current) return

		const tween = gsap.fromTo(
			titleRef.current,
			{
				y: 30,
				opacity: 0,
			},
			{
				y: 0,
				opacity: 1,
				duration: 0.8,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: titleRef.current,
					start: 'top 80%',
					once: true,
				},
			}
		)

		return () => {
			tween.scrollTrigger?.kill()
			tween.kill()
		}
	}, [])

	return (
		<section className="pb-10 pt-22.5 md:pb-16 lg:py-22.5 overflow-hidden">
			<div className="max-w-308 mx-auto px-4">
				<div ref={titleRef}>
					<Title className="mb-10 lg:max-w-150">{title}</Title>
				</div>
				<div>
					<Swiper
						modules={[Pagination]}
						pagination={{ clickable: true }}
						spaceBetween={16}
						slidesPerView={1}
						className="overflow-visible!"
					>
						{visibleItems.map(item => (
							<SwiperSlide
								key={item.key}
								className="flex-none w-full mr-4 relative"
							>
								{item.render({
									phrase1Ref: item.key === 'multiroom' ? phrase1Ref : undefined,
									phrase2Ref: item.key === 'multiroom' ? phrase2Ref : undefined,
								})}
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</section>
	)
}