"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef, useLayoutEffect, useState } from "react"

import { Title } from "@/components/UI/Title"
import { certificates } from "@/data/certificates"
import Image from "next/image"
import { CertificatesModal } from "./CertificatesModal"

gsap.registerPlugin(ScrollTrigger)

export default function Certificates() {

	const sectionRef = useRef<HTMLElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)
	const itemsRef = useRef<HTMLLIElement[]>([])

	const [isOpen, setIsOpen] = useState(false)
	const [activeIndex, setActiveIndex] = useState(0)

	const openModal = (index: number) => {
		setActiveIndex(index)
		setIsOpen(true)
	}

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {

			// Заголовок
			gsap.from(titleRef.current, {
				y: 60,
				opacity: 0,
				duration: 1,
				ease: "power3.out",
				scrollTrigger: {
					trigger: titleRef.current,
					start: "top 85%",
					toggleActions: "play none none none",
				},
			})

			// Чистим массив от возможных undefined
			itemsRef.current = itemsRef.current.filter(Boolean)

			// Каждый сертификат отдельно
			itemsRef.current.forEach((item) => {
				gsap.from(item, {
					y: 80,
					opacity: 0,
					duration: 1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: item,
						start: "top 85%",
						toggleActions: "play none none none",
					},
				})
			})

		}, sectionRef)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={sectionRef} className="py-22.5 lg:py-30">
			<div className="max-w-308 mx-auto px-4">
				<div ref={titleRef}>
					<Title className="mb-10">Сертификаты</Title>
				</div>

				<ul className="grid items-start sm:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-20 gap-y-21 lg:gap-y-10">
					{certificates.map((certificate, index) => (
						<li
							ref={(el) => {
								if (el) itemsRef.current[index] = el
							}}
							key={certificate.id}
							className="max-w-[97%] sm:max-w-none relative flex justify-center pb-13.5 sm:even:pt-20 lg:even:pt-0 lg:nth-[3n+2]:pt-20 lg:nth-[3n]:pt-40"
						>
							<div className="relative">
								<Image
									src={certificate.image}
									quality={95}
									width={156}
									height={222}
									alt=""
								/>

								<button
									onClick={() => openModal(index)}
									className="hover:bg-foreground hover:text-white transition-colors duration-300 cursor-pointer text-brand-blue items-center justify-center flex rounded-full w-8.5 h-8.5 bg-white overflow-hidden absolute -right-4 -bottom-3"
								>
									<svg width="22" height="22" viewBox="0 0 22 22" fill="none">
										<path
											d="M4.58337 11H17.4167"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M11 4.5835V17.4168"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</button>
							</div>

							<div className="absolute bottom-5.5 h-3 left-0 w-full bg-[linear-gradient(0deg,#d0d0d0_0%,#d7d7d7_53.37%,rgba(208,208,208,0)_100%)]">
								<span className="absolute top-0 left-0 w-10 h-full bg-background [clip-path:polygon(0_0,0_100%,100%_0)]"></span>
								<span className="absolute top-0 right-0 w-10 h-full bg-background [clip-path:polygon(100%_0,0_0,100%_100%)]"></span>
							</div>

							<div className="absolute bottom-0 left-0 w-full h-5.5 bg-[#DFDFDF]"></div>
						</li>
					))}
				</ul>
			</div>

			{isOpen && (
				<CertificatesModal
					certificates={certificates}
					activeIndex={activeIndex}
					onClose={() => setIsOpen(false)}
				/>
			)}
		</section>
	)
}