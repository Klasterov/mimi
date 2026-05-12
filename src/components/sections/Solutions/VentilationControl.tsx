import { Title } from "@/components/UI/Title";
import { RightArrowIcon } from "@/icons/RightArrowIcon";
import Image from "next/image";

export default function VentilationControl() {
	return (
		<section className="py-22.5 overflow-hidden">
			<div className="max-w-235.5 px-4 mx-auto flex flex-col text-center items-center">
				<Title className="mb-6 bg-linear-to-r from-foreground to-[#516076] bg-clip-text text-transparent">Управление вентиляцией</Title>
				<div className="font-helvetica mb-6 text-[17px] leading-[1.3] -tracking-[0.01em] max-w-142.5">
					Система считывает CO₂ и присутствие и автоматически регулирует приток и вытяжку по зонам. Опен-спейс, кабинеты и переговорные получают ровно столько воздуха, сколько нужно. Пустые зоны переходят в эко-режим без ручных переключений.
				</div>
				<a href="#" className="mb-20 inline-flex hover:text-foreground transition-colors duration-300 items-center gap-1 text-[15px] text-brand-blue group">
					Узнать больше
					<RightArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
				</a>
				<div className="relative max-sm:w-70">
					<Image
						width={364}
						height={366}
						alt=""
						src="/images/solutions-page/ventilation/1.png"
						quality={95}
					/>
					<div className="absolute top-1/2 -translate-y-1/2 right-[132%] w-35 aspect-square">
						<Image
							fill
							alt=""
							src="/images/solutions-page/ventilation/2.png"
						/>
					</div>
					<div className="absolute top-1/2 -translate-y-1/2 left-[132%] w-35 aspect-square">
						<Image
							fill
							alt=""
							src="/images/solutions-page/ventilation/3.png"
						/>
					</div>
				</div>
			</div>
		</section>
	)
}