"use client"

import { SliderNavigation } from "@/components/UI/SliderNavigation";
import { Title } from "@/components/UI/Title";
import Image from "next/image";
import { useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import { Detector } from "@/types/detector";
import Link from "next/link";
import { RightArrowIcon } from "@/icons/RightArrowIcon";

export default function DetectorSlider({ detectors }: { detectors: Detector[] }) {

	const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null)
	const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null)
	return (
		<section className="py-22.5 overflow-hidden">
			<div className="max-w-238 px-4 mx-auto">
				<Title className="mb-10">Все датчики</Title>

				<Swiper
					modules={[Navigation]}
					navigation={{ prevEl, nextEl }}
					className="overflow-visible!"
					breakpoints={{
						0: {
							spaceBetween: 16,
							slidesPerView: 'auto',
						},
						768: {
							spaceBetween: 40,
							slidesPerView: 2,
						},
					}}
				>
					{detectors.map((item, i) => (
						<SwiperSlide
							key={i}
							className={`${item.bg} rounded-[20px] min-h-125 lg:min-h-150 pt-15 flex! max-md:basis-[95.53%] max-md:grow-0 max-md:shrink-0 flex-col overflow-hidden`}
						>
							<div className="flex flex-col text-center items-center px-5 -tracking-[0.01em]">
								<div className="text-[17px] mb-2">{item.title}</div>
								<h3 className="text-[22px] md:text-[26px] lg:text-[32px] mb-2 font-semibold">{item.subtitle}</h3>

								<Link
									href={`/detector/${item.slug}`}
									className={`inline-flex items-center gap-1 text-[15px] font-medium text-brand-blue group transition-colors duration-300 ${item.linkHover}`}

								>
									Узнать больше
									<RightArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
								</Link>
							</div>

							<div className="mt-auto relative aspect-590/430">
								<Image src={item.image} fill alt="" className="object-cover" />
							</div>
						</SwiperSlide>

					))}
				</Swiper>
				<SliderNavigation className="justify-end mt-10" setPrev={setPrevEl} setNext={setNextEl} />
			</div>
		</section>
	);
}