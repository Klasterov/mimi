"use client"

import { useEffect, useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import Image from "next/image"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import type { Certificate } from "@/types/certificate";
import { SliderNavigation } from "@/components/UI/SliderNavigation"

interface CertificatesModalProps {
	certificates: Certificate[]
	activeIndex: number
	onClose: () => void
}

export function CertificatesModal({ certificates, activeIndex, onClose }: CertificatesModalProps) {
	const modalRef = useRef<HTMLDivElement | null>(null)

	// ESC
	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose()
		}

		document.addEventListener("keydown", onKeyDown)
		return () => document.removeEventListener("keydown", onKeyDown)
	}, [onClose])

	useEffect(() => {
		// вычисляем ширину скроллбара
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

		// блокируем скролл и добавляем отступ справа
		document.body.style.overflow = 'hidden'
		if (scrollbarWidth > 0) {
			document.body.style.paddingRight = `${scrollbarWidth}px`
		}

		// при размонтировании возвращаем всё обратно
		return () => {
			document.body.style.overflow = ''
			document.body.style.paddingRight = '0'
		}
	}, [])


	// клик вне модалки
	const onOverlayClick = (e: React.MouseEvent) => {
		if (!modalRef.current?.contains(e.target as Node)) {
			onClose()
		}
	}

	const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null)
	const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null)
	return (
		<div
			onClick={onOverlayClick}
			className="fixed overflow-auto inset-0 z-50 px-4 py-8 flex items-center justify-center bg-black/20 animate-fade-in"
		>
			<div
				ref={modalRef}
				className="bg-white max-w-175 pt-24 lg:pt-26.5 pb-6 md:pb-8 lg:pb-10 px-4 md:px-8 lg:px-15 w-full rounded-3xl animate-scale-in relative"
			>
				<button
					onClick={onClose}
					className="hover:bg-foreground hover:text-white transition-colors duration-300 cursor-pointer text-[#5f6368] close-btn absolute top-5 right-5 w-9 h-9 rounded-full bg-background"
				>
				</button>

				<Swiper
					modules={[Navigation]}
					navigation={{ prevEl, nextEl }}
					initialSlide={activeIndex}
					spaceBetween={30}
				>
					{certificates.map(item => (
						<SwiperSlide key={item.id}>
							<div className="flex flex-col gap-6 md:gap-10 md:flex-row lg:gap-15">
								<div className="md:flex-auto">
									<svg className="mb-6" width="38" height="32" viewBox="0 0 38 32" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M14.7518 24.6241C14.7518 27.1206 13.9953 28.974 12.4823 30.1844C11.0449 31.3948 9.41844 32 7.60284 32C5.71158 32 3.97163 31.3191 2.38298 29.9574C0.794326 28.5957 0 26.5154 0 23.7163C0 21.1442 0.907801 17.8534 2.7234 13.844C4.61466 9.75887 7.82979 5.14421 12.3688 0L17.0213 3.06383C14.9031 6.77068 13.4657 9.56974 12.7092 11.461C12.0284 13.3522 11.6879 14.7896 11.6879 15.773C11.6879 16.6809 11.9527 17.5508 12.4823 18.383C13.0118 19.2151 13.5035 20.1229 13.9574 21.1064C14.487 22.0142 14.7518 23.1868 14.7518 24.6241ZM34.8369 24.6241C34.8369 27.1206 34.0804 28.974 32.5674 30.1844C31.13 31.3948 29.5035 32 27.6879 32C25.7967 32 24.0567 31.3191 22.4681 29.9574C20.8794 28.5957 20.0851 26.5154 20.0851 23.7163C20.0851 21.1442 20.9929 17.8534 22.8085 13.844C24.6998 9.75887 27.9149 5.14421 32.4539 0L37.1064 3.06383C34.9882 6.77068 33.5508 9.56974 32.7943 11.461C32.1135 13.3522 31.773 14.7896 31.773 15.773C31.773 16.6809 32.0378 17.5508 32.5674 18.383C33.0969 19.2151 33.5886 20.1229 34.0426 21.1064C34.5721 22.0142 34.8369 23.1868 34.8369 24.6241Z" fill="#ACACAC" />
									</svg>
									<p className="font-helvetica text-[15px] leading-snug text-black">
										{item.description}
									</p>
								</div>
								<div className="relative flex-none w-35.5 sm:w-53 aspect-212/299">
									<Image
										src={item.image}
										fill
										quality={95}
										alt=""
									/>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
				<SliderNavigation className="mt-10 justify-center" setPrev={setPrevEl} setNext={setNextEl} />
			</div>
		</div>
	)
}
