"use client";

import { Title } from "@/components/UI/Title";

import "swiper/css";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const tabs = [
	{
		label: "Горизонтальные жалюзи",
		image: {
			url: "/images/curtains-page/tabs/2.png",
			width: 454,
			height: 462,
		},
		text: "Классический и самый распространенный вариант. Перемещаются с помощью электропривода и каретки с петлями."
	},
	{
		label: "Вертикальные жалюзи",
		image: {
			url: "/images/curtains-page/tabs/1.png",
			width: 600,
			height: 500,
		},
		text: "С умным домом вы управляете группой света через одно нажатие, сценарии включения и выключения становятся полностью автоматическими, а количество физических выключателей минимально."
	}
]

export default function CurtainsTabs() {
	const [activeTab, setActiveTab] = useState(0)
	const imageRef = useRef<HTMLDivElement>(null)
	const textRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!imageRef.current || !textRef.current) return

		// Анимация картинки сверху
		gsap.fromTo(
			imageRef.current,
			{ y: -50, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.6 }
		)

		// Анимация текста снизу
		gsap.fromTo(
			textRef.current,
			{ y: 50, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.6 }
		)
	}, [activeTab])

	return (
		<section className="py-22.5 text-center">
			<div className="max-w-308 mx-auto px-4">
				<Title className="mb-10">Вертикальные жалюзи</Title>
				<div className="max-w-125 mx-auto -tracking-[0.01em] flex flex-col items-center">
					<div ref={imageRef} className="flex items-center justify-center min-h-125 mb-15">
						<Image
							src={tabs[activeTab].image.url}
							width={tabs[activeTab].image.width}
							height={tabs[activeTab].image.height}
							alt=""
						/>
					</div>

					<div className="mb-10 bg-white flex justify-center gap-2 p-1 rounded-[50px] font-medium leading-normal">
						{tabs.map((tab, i) => (
							<button
								key={i}
								type="button"
								onClick={() => setActiveTab(i)}
								className={`cursor-pointer hover:bg-foreground hover:text-white py-2.5 px-5 rounded-[50px] transition-colors duration-300 ${activeTab === i ? "bg-foreground text-white" : ""
									}`}
							>
								{tab.label}
							</button>
						))}
					</div>
					<div ref={textRef} className="text-[17px] font-helvetica leading-tight">
						{tabs[activeTab].text}
					</div>
				</div>
			</div>
		</section>
	);
}