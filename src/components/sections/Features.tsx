"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import { Title } from "../UI/Title";
import { SliderNavigation } from "../UI/SliderNavigation";
import { features } from "@/data/features";
import { RightArrowIcon } from "@/icons/RightArrowIcon";

export default function Features({ title }: { title: string }) {

	const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
	const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
	return (
		<section className="py-10 md:py-16 lg:py-22.5 overflow-hidden">
			<div className="max-w-308 lg:max-w-238 mx-auto px-4">
				<Title className="mb-10">{title}</Title>
				<Swiper
					modules={[Navigation]}
					navigation={{
						prevEl: prevEl,
						nextEl: nextEl,
					}}
					breakpoints={{
						320: {
							slidesPerView: 1,
							spaceBetween: 16,
						},
						768: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						1024: {
							slidesPerView: 2,
							spaceBetween: 40,
						},
					}}
					className="overflow-visible!"
				>
					{features.map((item, index) => (
						<SwiperSlide
							key={index}
							className="mr-4 md:mr-5 lg:mr-10"
						>
							<a href="" className="relative block aspect-11/10 rounded-[20px] overflow-hidden mb-4 bg-brand-gray">
								<Image
									src={item.src}
									alt={item.title}
									fill
									className="object-cover"
									draggable={false}
									quality={95}
								/>
							</a>

							<h3 className="text-[17px] font-medium mb-2">{item.title}</h3>
							<p className="leading-snug mb-2 text-[15px] text-brand-gray font-helvetica">
								{item.description}
							</p>
							<a href="#" className="inline-flex items-center gap-1 text-[15px] font-medium text-brand-blue group">
								Узнать больше
								<RightArrowIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"></RightArrowIcon>
							</a>
						</SwiperSlide>
					))}
				</Swiper>

				<SliderNavigation className="justify-end mt-10" setPrev={setPrevEl} setNext={setNextEl} />
			</div>
		</section>
	);
}