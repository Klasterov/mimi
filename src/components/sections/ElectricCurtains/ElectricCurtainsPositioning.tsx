import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function ElectricCurtainsPositioning() {
	return (
		<section className="py-22.5 overflow-hidden">
			<div className="max-w-308 px-4 mx-auto flex flex-col items-center">
				<Title className="mb-10 text-center max-w-175 max-md:break-all">Точное
					позиционирование</Title>
				<div className="relative w-192.25 lg:w-289.75 aspect-1159/1059">
					<Image
						src="/images/electric-curtains-page/positioning/decor.png"
						fill
						alt=""
					/>
					<div className="absolute top-[56%] lg:top-[60.15%] left-[27%] lg:left-[27.52%] max-w-[29.77%] lg:max-w-[28.04%] font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em]">
						В квартирах меньше свободного пространства и поэтому его не нужно захламлять. Все датчики MiMiSmart либо встраиваются в выключатели, либо размером 1см и совершенно не видны в интерьере.
					</div>
				</div>
			</div>
		</section>
	);
}