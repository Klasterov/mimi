"use client";

import { Title } from "@/components/UI/Title";

import "swiper/css";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const tabs = [
	{
		label: "Без умного дома",
		image: {
			url: "/images/lightning-page/way/2.png",
			width: 664,
			height: 402,
		},
		text: "Выключатели множатся: на каждой стене — пианино из клавиш. Каждый управляет только одной группой света. Никаких сцен — только вкл/выкл. Чтобы приглушить свет или закрыть все — приходится обходить комнаты и нажимать по очереди. Итог: 10+ выключателей, путаешься, где что включается, и лишние отверстия в стенах."
	},
	{
		label: "С умным домом",
		image: {
			url: "/images/lightning-page/way/1.jpg",
			width: 285,
			height: 285,
		},
		text: "С умным домом вы управляете группой света через одно нажатие, сценарии включения и выключения становятся полностью автоматическими, а количество физических выключателей минимально."
	}
]

export default function LightningWay() {
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
				<Title className="mb-10 lg:mb-40">
					<span className="text-[24px] md:text-[40px] lg:text-[64px]">Два способа.</span> <br />
					<span className="bg-[linear-gradient(180deg,#422e0c_0%,#ffc96e_100%)] bg-clip-text text-transparent">Управляйте группой света</span>
				</Title>
				<div className="max-w-125 mx-auto -tracking-[0.01em] flex flex-col items-center">
					<div ref={imageRef} className="flex items-center justify-center min-h-80 lg:mb-35 md:mb-30 mb-10">
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
								className={`cursor-pointer hover:bg-foreground hover:text-white py-2.5 px-4 md:px-5 rounded-[50px] transition-colors duration-300 ${activeTab === i ? "bg-foreground text-white" : ""
									}`}
							>
								{tab.label}
							</button>
						))}
					</div>
					<div ref={textRef} className="text-[17px] font-helvetica leading-tight min-h-32">
						{tabs[activeTab].text}
					</div>
				</div>
			</div>
		</section>
	);
}