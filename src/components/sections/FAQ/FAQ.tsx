"use client"

import { Button } from "@/components/UI/Button"
import { Title } from "@/components/UI/Title"
import { FAQItems } from "@/data/faq"
import { RightArrowIcon } from "@/icons/RightArrowIcon"
import Image from "next/image"
import { useRef, useState } from "react"

export default function FAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(null)
	const contentRefs = useRef<Array<HTMLDivElement | null>>([])

	const toggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index)
	}
	return (
		<section className="pt-12.5 lg:pt-17 pb-30 lg:pb-37.5">
			<div className="max-w-308 mx-auto px-4 flex gap-10 xl:gap-30">
				<div className="hidden lg:block relative w-82.5 mt-34 shrink-0 grow-0 basis-82.5">
					<Image
						src='/images/faq/left-bg.png'
						quality={95}
						alt="background image"
						fill
						className="object-cover"
					/>
					<div className="sticky top-10">
						<div className="relative top-10 aspect-386/468">
							{FAQItems.map((item, idx) => {
								const isOpen = openIndex === idx
								return (
									<Image
										quality={95}
										key={idx}
										src={item.image}
										alt={item.title}
										fill
										// Для активной картинки
										className={`transition-all duration-700 ease-out ${isOpen
											? 'opacity-100 translate-y-0 scale-100'
											: 'opacity-0 translate-y-4 scale-95'
											}`}
									/>
								)
							})}

							{/* Дефолтная картинка, если ничего не открыто */}
							{openIndex === null && (
								<Image
									src="/images/faq/11.png"
									quality={95}
									width={386}
									height={468}
									alt="default"
									className="absolute top-0 left-1/2 -translate-x-1/2 transition-opacity duration-500 ease-in-out opacity-100 scale-100 z-10"
								/>
							)}
						</div>
					</div>
				</div>
				<div className="flex-auto lg:mr-15">
					<Title className="mb-10 xl:max-w-[70%]">Ответим на все вопросы</Title>
					<Button className="lg:min-w-80 mb-3 justify-between py-1.5! sm:px-5!">Связаться с нами</Button>
					<div className='mb-8 flex items-center gap-1 text-[14px] text-[#acacac] -tracking-[0.01em] leading-normal pl-6'>
						<span>Мы на связи сейчас</span>
						<span className='w-2 h-2 rounded-full bg-[#27ca40] box-shadow: 0 4px 4px 0 rgba(39, 202, 64, 0.25);'></span>
					</div>
					{FAQItems.map((item, index) => {
						const isOpen = openIndex === index
						return (
							<div key={index} className="border-b border-[#d9d9d9] overflow-hidden py-3">
								<button
									className={`py-3 cursor-pointer w-full transition-colors duration-300 hover:text-foreground font-semibold ${isOpen ? 'text-foreground' : 'text-[#acacac]'} text-[18px] lg:text-[20px] text-left gap-6 lg:gap-2 flex justify-between items-center`}
									onClick={() => toggle(index)}
								>
									{item.title}
									<RightArrowIcon className={`w-6 flex-none h-6 lg:w-8 lg:h-8 transition-transform duration-300 ${isOpen ? 'rotate-270' : 'rotate-90'}`}></RightArrowIcon>
								</button>

								<div
									ref={(el) => { (contentRefs.current[index] = el) }}
									style={{
										maxHeight: isOpen
											? contentRefs.current[index]?.scrollHeight + "px"
											: "0px",
										transition: "max-height 0.3s ease",
									}}
									className="overflow-hidden font-helvetica text-[17px] text-brand-gray"
								>
									<div className="pb-2">
										<div className="mb-3 lg:mb-0">{item.description}</div>
										<div className="relative lg:hidden flex justify-center">
											<Image
												src='/images/faq/left-bg.png'
												quality={95}
												alt="background image"
												fill
												className="object-cover"
											/>
											<Image
												src={item.image}
												quality={95}
												width={386}
												height={468}
												className="max-w-55 relative"
												alt={item.title}
											/>
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
