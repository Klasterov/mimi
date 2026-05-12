'use client'

import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Link from "next/link"
import { Pagination } from "swiper/modules";
import { BtnArrowIcon } from "@/icons/BtnArrowIcon";
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Title } from "@/components/UI/Title";
gsap.registerPlugin(ScrollTrigger)

export default function Capabilities() {
	const titleRef = useRef<HTMLHeadingElement | null>(null)
	const phrase1Ref = useRef<HTMLSpanElement>(null)
	const phrase2Ref = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		if (!phrase1Ref.current || !phrase2Ref.current) return

		const tl = gsap.timeline({ repeat: -1, defaults: { duration: 0.6, ease: 'power1.out' } })

		// Фраза 1
		tl.fromTo(
			phrase1Ref.current,
			{ opacity: 0, y: 6 },
			{ opacity: 1, y: 0 }
		)
		tl.to(phrase1Ref.current, { opacity: 1, duration: 2 }) // держим видимой
		tl.to(phrase1Ref.current, { opacity: 0, y: -6, duration: 0.6 })

		// Фраза 2
		tl.fromTo(
			phrase2Ref.current,
			{ opacity: 0, y: 6 },
			{ opacity: 1, y: 0, duration: 0.6 }
		)
		tl.to(phrase2Ref.current, { opacity: 1, duration: 2 })
		tl.to(phrase2Ref.current, { opacity: 0, y: -6, duration: 0.6 })
	}, [])

	useEffect(() => {
		if (!titleRef.current) return

		gsap.fromTo(
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
	}, [])
	return (
		<section className="pb-10 pt-22.5 md:pb-16 lg:py-22.5 overflow-hidden lg:overflow-visible">
			<div className="max-w-308 mx-auto px-4">
				<div ref={titleRef}>
					<Title className="mb-10 lg:max-w-150">Чем вы сможете управлять?</Title>
				</div>
				{/* DESKTOP */}
				<ul className="hidden lg:block space-y-5">
					<li className="sticky top-3 bg-[linear-gradient(225deg,#f4dbc5_0%,#f4f4f4_48.56%,#d1a683_100%)] shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-15 px-20 gap-4 min-h-150 overflow-hidden flex flex-col justify-between">

						<div className="pl-1 pt-3">
							<Image
								src="/images/capabilities/titles/1.png"
								quality={95}
								alt="Фон"
								width={548}
								height={90}
							/>
						</div>
						<h3 className="hidden">Освещение</h3>
						<div className="flex justify-between gap-4 items-end">
							<p className="font-helvetica text-[16px] max-w-85 leading-snug tracing-[-0.01em] text-[#907e70]">
								Подходят любые светильники. <br /> Регулируйте яркость, температуру теплого и холодного света. Управляйте шторами с кнопок и с телефона.
							</p>
							<Link href="/lightning" className="shadow-[inset_-3px_-3px_6px_1px_rgba(255,255,255,0.5),inset_3px_3px_6px_0_#eaeaea] cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#5a250a] group hover:opacity-80 transition-opacity">
								Подробнее
								<BtnArrowIcon className="group-hover:translate-x-1 transition-transform duration-300 w-6 h-6"></BtnArrowIcon>
							</Link>
						</div>
						<span className="absolute w-[44%] top-0 -right-7.25 aspect-584/500">

							<Image
								quality={95}
								src="/images/capabilities/decor/1.png"
								alt="Фон"
								fill
							/>
						</span>
					</li>
					<li className="sticky top-6 shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-15 px-20 bg-[#adafbb] gap-4 min-h-150 overflow-hidden flex flex-col justify-between">
						<div className="pl-1 pt-3">
							<Image
								src="/images/capabilities/titles/2.png"
								quality={95}
								alt="Фон"
								width={351}
								height={74}
							/>
						</div>
						<h3 className="hidden">Климат</h3>
						<div className="flex justify-between gap-4 items-end">
							<p className="font-helvetica text-[16px] max-w-85 leading-snug tracing-[-0.01em] text-[#303236]">
								Автоматический климат-контроль: <br /> слаженная работа отопления, теплых полов, кондиционеров, вентиляции и увлажнения
							</p>
							<Link href="/climate" className="group cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#0a051a] hover:opacity-80 transition-opacity">
								Подробнее
								<BtnArrowIcon className="group-hover:translate-x-1 transition-transform duration-300 w-6 h-6"></BtnArrowIcon>
							</Link>
						</div>

						<span className="absolute w-80.5 top-7 right-6 aspect-322/303">

							<Image
								quality={95}
								src="/images/capabilities/decor/2.png"
								alt="Фон"
								fill
							/>
						</span>
					</li>
					<li className="sticky top-9 shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-15 px-20 bg-[#0f1015] gap-4 min-h-150 overflow-hidden flex flex-col justify-between">
						<Image
							className="object-cover"
							src="/images/capabilities/bg/3.png"
							quality={95}

							alt="Фон"
							fill
						/>
						<div className="pl-1 pt-3 relative">
							<Image
								src="/images/capabilities/titles/3.png"
								quality={95}
								alt="Фон"
								width={585}
								height={67}
							/>
						</div>
						<h3 className="hidden">Безопасность</h3>
						<div className="relative flex justify-between gap-4 items-end">
							<p className="font-helvetica text-[16px] max-w-85 leading-snug tracing-[-0.01em] text-[#95979e]">
								Защита от протечек воды, охранная сигнализация, имитацция присутствия
							</p>
							<Link href="/security" className="group shadow-[inset_-3px_-3px_6px_1px_rgba(255,255,255,0.5),inset_3px_3px_6px_0_#eaeaea] cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#0a051a] hover:opacity-80 transition-opacity">
								Подробнее
								<BtnArrowIcon className="group-hover:translate-x-1 transition-transform duration-300 w-6 h-6"></BtnArrowIcon>
							</Link>
						</div>
					</li>
					<li className="sticky top-12 shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-15 px-20 bg-[#c7c7c9] gap-4 min-h-150 overflow-hidden flex flex-col justify-between">
						<Image
							className="object-cover"
							src="/images/capabilities/bg/4.png"
							quality={95}

							alt="Фон"
							fill
						/>
						<div className="pl-1 pt-3">
							<Image
								src="/images/capabilities/titles/4.png"
								quality={95}
								alt="Фон"
								width={334}
								height={94}
							/>
						</div>
						<h3 className="hidden">Шторы</h3>
						<div className="relative flex justify-between gap-4 items-end">
							<p className="font-helvetica text-[16px] max-w-85 leading-snug tracing-[-0.01em] text-[#58595d]">
								Управляем любыми видами отопления, теплых полов и конвекторов. В каждой комнате своя, комфортная каждому температура.
							</p>
							<Link href="/curtains" className="group cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#0a051a] hover:opacity-80 transition-opacity">
								Подробнее
								<BtnArrowIcon className="group-hover:translate-x-1 transition-transform duration-300 w-6 h-6"></BtnArrowIcon>
							</Link>
						</div>
					</li>
					<li className="sticky top-15 shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-15 px-20 bg-[#eee] gap-4 min-h-150 overflow-hidden flex flex-col justify-between">
						<Image
							className="object-cover"
							src="/images/capabilities/bg/5.png"
							quality={95}

							alt="Фон"
							fill
						/>
						<div className="pl-1 pt-3">
							<Image
								src="/images/capabilities/titles/5.png"
								quality={95}
								alt="Фон"
								width={584}
								height={189}
							/>
						</div>
						<h3 className="hidden">Видеонаблюдение</h3>
						<div className="relative flex justify-between gap-4 items-end">
							<p className="font-helvetica text-[16px] max-w-85 leading-snug tracing-[-0.01em] text-[#95979e]">
								Смотрите ваши камеры и отвечайте на звонок в домофон в любой точке мира. Наблюдайте за домом и будьте уверены, что с родными все в порядке.
							</p>
							<Link href="/video-control" className="group cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#0a051a] hover:opacity-80 transition-opacity">
								Подробнее
								<BtnArrowIcon className="group-hover:translate-x-1 transition-transform duration-300 w-6 h-6"></BtnArrowIcon>
							</Link>
						</div>
					</li>
					<li className="sticky top-18 bg-[radial-gradient(50%_200%_at_50%_50%,#F4EFC5_0%,#F4F4F4_48.56%,#D3B291_100%)] shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-15 px-20 bg-[#0f1015] gap-4 min-h-150 overflow-hidden flex flex-col justify-between">
						<Image
							className="object-cover"
							src="/images/capabilities/bg/6.png"
							quality={95}

							alt="Фон"
							fill
						/>
						<div className="pl-1 pt-3">
							<Image
								src="/images/capabilities/titles/6.png"
								quality={95}
								alt="Фон"
								width={503}
								height={95}
							/>
						</div>
						<h3 className="hidden">Электрика</h3>
						<div className="relative flex justify-between gap-4 items-end">
							<p className="font-helvetica text-[16px] max-w-85 leading-snug tracing-[-0.01em] text-[#58595d]">
								Спроектируем и реализуем современную электрику. Управление розетками, сценарные выключатели, стабилизация напряжения, резервное питание, молниезащита.
							</p>
							<Link href="/electric-lock" className="group cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#0a051a] hover:opacity-80 transition-opacity">
								Подробнее
								<BtnArrowIcon className="group-hover:translate-x-1 transition-transform duration-300 w-6 h-6"></BtnArrowIcon>
							</Link>
						</div>
					</li>
					<li className="sticky top-21 shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-15 px-20 bg-[#c9c9ca] gap-4 min-h-150 overflow-hidden flex flex-col justify-between">
						<Image
							className="object-cover"
							src="/images/capabilities/bg/7.png"
							quality={95}

							alt="Фон"
							fill
						/>
						<div className="pl-1 pt-3">
							<Image
								src="/images/capabilities/titles/7.png"
								quality={95}
								alt="Фон"
								width={496}
								height={94}
							/>
						</div>
						<h3 className="hidden">Кинотеатр</h3>
						<div className="relative flex justify-between gap-4 items-end">
							<p className="font-helvetica text-[16px] max-w-85 leading-snug tracing-[-0.01em] text-[#303236]">
								Оборудуем кинозалы и кино в гостиной под ключ. Автоматизируем аппаратуру кино и создаем удобные сценарии
							</p>
							<Link href="/cinema-home" className="group cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#0a051a] hover:opacity-80 transition-opacity">
								Подробнее
								<BtnArrowIcon className="group-hover:translate-x-1 transition-transform duration-300 w-6 h-6"></BtnArrowIcon>
							</Link>
						</div>
					</li>
					<li className="sticky top-24 shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-15 px-20 bg-[#0f1015] gap-4 min-h-150 overflow-hidden flex flex-col justify-between">

						<Image
							className="object-cover z-10"
							src="/images/capabilities/bg/8-pc.jpg"
							quality={95}
							alt="Фон"
							fill
						/>
						{/* <div className="blur-el hidden">
							{[...Array(10)].map((_, i) => <div key={i}></div>)}
						</div> */}
						{/* <div className="absolute bottom-[17.7%] right-[27%] w-[18.83%] aspect-square font-medium text-[15px] text-white tracking-[-0.01em] z-20">
							<Image
								quality={95}
								src="/images/capabilities/decor/8.png"
								alt="Фон"
								fill
							/>

							<span ref={phrase1Ref} className="absolute left-1/2 bottom-[calc(100%+37px)] -translate-x-1/2 whitespace-nowrap"> 
								Алиса, включи музыку на кухне
							</span>
							<span ref={phrase2Ref} className="absolute left-1/2 bottom-[calc(100%+10px)] -translate-x-1/2 whitespace-nowrap opacity-30">
								– Дети, все к столу!
							</span>
						</div> */}

						<div className="pl-1 pt-3 relative z-20">
							<Image
								src="/images/capabilities/titles/8.png"
								quality={95}
								alt="Фон"
								width={530}
								height={94}
							/>
						</div>
						<h3 className="hidden">Мультирум</h3>
						<div className="relative flex justify-between gap-4 items-end z-20">
							<p className="font-helvetica text-[16px] max-w-85 leading-snug tracing-[-0.01em] text-[#92969d]">
								Своя музыка в каждой комнате, AirPlay, следящая музыка, звуковые оповещения
							</p>
							<Link href="/multiroom" className="group cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#0a051a] hover:opacity-80 transition-opacity">
								Подробнее
								<BtnArrowIcon className="group-hover:translate-x-1 transition-transform duration-300 w-6 h-6"></BtnArrowIcon>
							</Link>
						</div>
					</li>
				</ul>
				{/* MOBILE */}
				<div className="lg:hidden">
					<Swiper
						modules={[Pagination]}
						pagination={{ clickable: true }}
						spaceBetween={16}
						slidesPerView={1}
						className="overflow-visible!"
					>
						<SwiperSlide className="flex-none w-full mr-4">
							<div className="relative lg:sticky lg:top-3 bg-[linear-gradient(225deg,#f4dbc5_0%,#f4f4f4_48.56%,#d1a683_100%)] shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-10 px-6 md:py-8 md:px-12 gap-4 min-h-125 overflow-hidden flex flex-col justify-between">
								<div className="h-9 md:h-12">
									<Image
										src="/images/capabilities/titles/1.png"
										quality={95}
										alt="Фон"
										width={548}
										height={90}
										className="max-h-full w-auto"
									/>
								</div>
								<div className="flex justify-between gap-4 items-start sm:items-end flex-col sm:flex-row">
									<p className="font-helvetica text-[16px] sm:max-w-85 leading-snug tracing-[-0.01em] text-[#907e70]">
										Подходят любые светильники. <br /> Регулируйте яркость, температуру теплого и холодного света. Управляйте шторами с кнопок и с телефона.
									</p>
									<Link href="/" className="shadow-[inset_-3px_-3px_6px_1px_rgba(255,255,255,0.5),inset_3px_3px_6px_0_#eaeaea] cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#5a250a]">
										Подробнее
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://лwww.w3.org/2000/svg">
											<path d="M18 8L22 12L18 16"
												stroke="currentColor"
												strokeWidth="1.6"
												strokeLinejoin="round"
											/>
											<path d="M2 12H22"
												stroke="currentColor"
												strokeWidth="1.6"
												strokeLinejoin="round"
											/>
										</svg>
									</Link>
								</div>
								<span className="absolute w-98 top-0 -right-20 sm:-right-5 aspect-233/200">

									<Image
										quality={95}
										src="/images/capabilities/decor/1.png"
										alt="Лампа"
										fill
									/>
								</span>
							</div>
						</SwiperSlide>
						<SwiperSlide className="flex-none w-full mr-4">
							<div className="relative lg:sticky lg:top-6 shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-10 px-6 md:py-8 md:px-12 bg-[#adafbb] gap-4 min-h-125 overflow-hidden flex flex-col justify-between">

								<div className="h-9 md:h-12">
									<Image
										src="/images/capabilities/titles/2.png"
										quality={95}
										alt="Фон"
										width={548}
										height={90}
										className="max-h-full w-auto"
									/>
								</div>#
								<div className="flex justify-between gap-4 items-start sm:items-end flex-col sm:flex-row">
									<p className="font-helvetica text-[16px] sm:max-w-85 leading-snug tracing-[-0.01em] text-[#303236]">
										Автоматический климат-контроль: <br /> слаженная работа отопления, теплых полов, кондиционеров, вентиляции и увлажнения
									</p>
									<Link href="/" className="cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#0a051a]">
										Подробнее
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M18 8L22 12L18 16"
												stroke="currentColor"
												strokeWidth="1.6"
												strokeLinejoin="round"
											/>
											<path d="M2 12H22"
												stroke="currentColor"
												strokeWidth="1.6"
												strokeLinejoin="round"
											/>
										</svg>
									</Link>
								</div>

								<span className="absolute w-60 md:w-70 top-7 right-6 aspect-322/303">

									<Image
										quality={95}
										src="/images/capabilities/decor/2.png"
										alt="Фон"
										fill
									/>
								</span>
							</div>
						</SwiperSlide>
						<SwiperSlide className="flex-none w-full mr-4">
							<div className="relative lg:sticky lg:top-9 shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-10 px-6 md:py-8 md:px-12 bg-[#0f1015] gap-4 min-h-125 overflow-hidden flex flex-col justify-between">
								<Image
									className="object-cover"
									src="/images/capabilities/bg/3.png"
									quality={95}

									alt="Фон"
									fill
								/>
								<div className="h-9 md:h-12">
									<Image
										src="/images/capabilities/titles/3.png"
										quality={95}
										alt="Фон"
										width={548}
										height={90}
										className="max-h-full w-auto"
									/>
								</div>
								<div className="relative flex justify-between gap-4 items-start sm:items-end flex-col sm:flex-row">
									<p className="font-helvetica text-[16px] sm:max-w-85 leading-snug tracing-[-0.01em] text-[#95979e]">
										Защита от протечек воды, охранная сигнализация, имитацция присутствия
									</p>
									<Link href="/" className="shadow-[inset_-3px_-3px_6px_1px_rgba(255,255,255,0.5),inset_3px_3px_6px_0_#eaeaea] cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#0a051a]">
										Подробнее
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M18 8L22 12L18 16"
												stroke="currentColor"
												strokeWidth="1.6"
												strokeLinejoin="round"
											/>
											<path d="M2 12H22"
												stroke="currentColor"
												strokeWidth="1.6"
												strokeLinejoin="round"
											/>
										</svg>
									</Link>
								</div>
							</div>
						</SwiperSlide>
						<SwiperSlide className="flex-none w-full mr-4">
							<div className="relative lg:sticky lg:top-12 shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-10 px-6 md:py-8 md:px-12 bg-[#c7c7c9] gap-4 min-h-125 overflow-hidden flex flex-col justify-between">
								<Image
									className="object-cover"
									src="/images/capabilities/bg/4.png"
									quality={95}

									alt="Фон"
									fill
								/>
								<div className="h-9 md:h-12">
									<Image
										src="/images/capabilities/titles/4.png"
										quality={95}
										alt="Фон"
										width={548}
										height={90}
										className="max-h-full w-auto"
									/>
								</div>
								<div className="relative flex justify-between gap-4 items-start sm:items-end flex-col sm:flex-row">
									<p className="font-helvetica text-[16px] sm:max-w-85 leading-snug tracing-[-0.01em] text-[#58595d]">
										Управляем любыми видами отопления, теплых полов и конвекторов. В каждой комнате своя, комфортная каждому температура.
									</p>
									<Link href="/" className="cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#0a051a]">
										Подробнее
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M18 8L22 12L18 16"
												stroke="currentColor"
												strokeWidth="1.6"
												strokeLinejoin="round"
											/>
											<path d="M2 12H22"
												stroke="currentColor"
												strokeWidth="1.6"
												strokeLinejoin="round"
											/>
										</svg>
									</Link>
								</div>
							</div>
						</SwiperSlide>
						<SwiperSlide className="flex-none w-full mr-4">
							<div className="relative lg:sticky lg:top-15 shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-10 px-6 md:py-8 md:px-12 bg-[#eee] gap-4 min-h-125 overflow-hidden flex flex-col justify-between">
								<Image
									className="object-cover"
									src="/images/capabilities/bg/5.png"
									quality={95}

									alt="Фон"
									fill
								/>
								<div className="h-18 md:h-24">
									<Image
										src="/images/capabilities/titles/5.png"
										quality={95}
										alt="Фон"
										width={548}
										height={90}
										className="max-h-full w-auto"
									/>
								</div>
								<div className="relative flex justify-between gap-4 items-start sm:items-end flex-col sm:flex-row">
									<p className="font-helvetica text-[16px] sm:max-w-85 leading-snug tracing-[-0.01em] text-[#95979e]">
										Смотрите ваши камеры и отвечайте на звонок в домофон в любой точке мира. Наблюдайте за домом и будьте уверены, что с родными все в порядке.
									</p>
									<Link href="/" className="cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#0a051a]">
										Подробнее
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M18 8L22 12L18 16"
												stroke="currentColor"
												strokeWidth="1.6"
												strokeLinejoin="round"
											/>
											<path d="M2 12H22"
												stroke="currentColor"
												strokeWidth="1.6"
												strokeLinejoin="round"
											/>
										</svg>
									</Link>
								</div>
							</div>
						</SwiperSlide>
						<SwiperSlide className="flex-none w-full mr-4">
							<div className="relative lg:sticky lg:top-18 bg-[radial-gradient(50%_200%_at_50%_50%,#F4EFC5_0%,#F4F4F4_48.56%,#D3B291_100%)] shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-10 px-6 md:py-8 md:px-12 bg-[#0f1015] gap-4 min-h-125 overflow-hidden flex flex-col justify-between">
								<Image
									className="object-cover"
									src="/images/capabilities/bg/6.png"
									quality={95}

									alt="Фон"
									fill
								/>
								<div className="h-9 md:h-12">
									<Image
										src="/images/capabilities/titles/6.png"
										quality={95}
										alt="Фон"
										width={548}
										height={90}
										className="max-h-full w-auto"
									/>
								</div>
								<div className="relative flex justify-between gap-4 items-start sm:items-end flex-col sm:flex-row">
									<p className="font-helvetica text-[16px] sm:max-w-85 leading-snug tracing-[-0.01em] text-[#58595d]">
										Спроектируем и реализуем современную электрику. Управление розетками, сценарные выключатели, стабилизация напряжения, резервное питание, молниезащита.
									</p>
									<Link href="/" className="cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#0a051a]">
										Подробнее
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M18 8L22 12L18 16"
												stroke="currentColor"
												strokeWidth="1.6"
												strokeLinejoin="round"
											/>
											<path d="M2 12H22"
												stroke="currentColor"
												strokeWidth="1.6"
												strokeLinejoin="round"
											/>
										</svg>
									</Link>
								</div>
							</div>
						</SwiperSlide>
						<SwiperSlide className="flex-none w-full mr-4">
							<div className="relative lg:sticky lg:top-21 shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-10 px-6 md:py-8 md:px-12 bg-[#c9c9ca] gap-4 min-h-125 overflow-hidden flex flex-col justify-between">
								<Image
									className="object-cover"
									src="/images/capabilities/bg/7.png"
									quality={95}

									alt="Фон"
									fill
								/>
								<div className="h-9 md:h-12">
									<Image
										src="/images/capabilities/titles/7.png"
										quality={95}
										alt="Фон"
										width={548}
										height={90}
										className="max-h-full w-auto"
									/>
								</div>
								<div className="relative flex justify-between gap-4 items-start sm:items-end flex-col sm:flex-row">
									<p className="font-helvetica text-[16px] sm:max-w-85 leading-snug tracing-[-0.01em] text-[#303236]">
										Оборудуем кинозалы и кино в гостиной под ключ. Автоматизируем аппаратуру кино и создаем удобные сценарии
									</p>
									<Link href="/" className="cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#0a051a]">
										Подробнее
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M18 8L22 12L18 16"
												stroke="currentColor"
												strokeWidth="1.6"
												strokeLinejoin="round"
											/>
											<path d="M2 12H22"
												stroke="currentColor"
												strokeWidth="1.6"
												strokeLinejoin="round"
											/>
										</svg>
									</Link>
								</div>
							</div>
						</SwiperSlide>
						<SwiperSlide className="flex-none w-full mr-4">
							<div className="relative lg:sticky lg:top-24 bg-[radial-gradient(50%_50%_at_50%_50%,#462925_0%,#000000_100%)] shadow-[inset_-2px_2px_3px_0_rgba(0,0,0,0.19),inset_1px_-1px_1px_0_rgba(255,255,255,0.6)] rounded-3xl py-10 px-6 md:py-8 md:px-12 bg-[#0f1015] gap-4 min-h-125 overflow-hidden flex flex-col justify-between">
								<Image
									className="object-cover"
									src="/images/capabilities/bg/8.png"
									quality={95}

									alt="Фон"
									fill
								/>
								<div className="absolute bottom-[19%] sm:bottom-[18%] md:bottom-[18.6%] right-[27%] w-[28%] sm:w-[18.83%] aspect-square font-medium text-[14px] sm:text-[15px] text-white tracking-[-0.01em]">
									<Image
										quality={95}
										src="/images/capabilities/decor/8.png"
										alt="Фон"
										fill
									/>

									<span ref={phrase1Ref} className="absolute left-1/2 bottom-[calc(100%+37px)] -translate-x-1/2 whitespace-nowrap">
										Алиса, включи музыку на кухне
									</span>
									<span ref={phrase2Ref} className="absolute left-1/2 bottom-[calc(100%+10px)] -translate-x-1/2 whitespace-nowrap opacity-30">
										– Дети, все к столу!
									</span>
								</div>
								<div className="h-9 md:h-12">
									<Image
										src="/images/capabilities/titles/8.png"
										quality={95}
										alt="Фон"
										width={548}
										height={90}
										className="max-h-full w-auto"
									/>
								</div>
								<div className="relative flex justify-between gap-4 items-start sm:items-end flex-col sm:flex-row">
									<p className="font-helvetica text-[16px] sm:max-w-85 leading-snug tracing-[-0.01em] text-[#92969d]">
										Своя музыка в каждой комнате, AirPlay, следящая музыка, звуковые оповещения
									</p>
									<Link href="/" className="cursor-pointer rounded-[50px] leading-none flex px-11 py-2 border border-white items-center justify-center uppercase gap-1.5 font-semibold text-[13px] bg-[#f0f4f6] tracking-[-0.02em] text-[#0a051a]">
										Подробнее
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M18 8L22 12L18 16"
												stroke="currentColor"
												strokeWidth="1.6"
												strokeLinejoin="round"
											/>
											<path d="M2 12H22"
												stroke="currentColor"
												strokeWidth="1.6"
												strokeLinejoin="round"
											/>
										</svg>
									</Link>
								</div>
							</div>
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</section>
	);
};