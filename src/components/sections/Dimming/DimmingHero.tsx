import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function DimmingHero() {
	return (
		<section className="min-h-192 relative py-30 lg:py-50 flex items-end">
			<Image
				fill
				alt=""
				src="/images/dimming-page/hero-bg.jpg"
				quality={95}
				className="object-cover"
			/>
			<div className="max-w-235.5 text-white w-full px-4 mx-auto text-center flex flex-col items-center relative">
				<div className="mb-2.5 lg:mb-50 gap-10 lg:min-w-137 flex items-center justify-between font-bold text-[40px] md:text-[52px] lg:text-[64px]">
					<div className="min-w-45 text-shadow-[0_2px_2px_rgba(0,0,0,0.1),inset_0_2px_2px_rgba(255,255,255,0.75)]">1%</div>
					<div className="min-w-45 bg-linear-to-b from-[#ec6022] via-[#f3d068] to-[#d3eae2] bg-clip-text text-transparent">100%</div>
				</div>
				<Title className="mb-6">Диммирование</Title>
				<div className="font-helvetica text-[#acacac] text-[17px] leading-[1.3] -tracking-[0.01em] max-w-140">
					Нехитрая система подъема, позволяющая им подниматься вверх или опускаться вниз с помощью системы шнуров и электропривода..
				</div>
			</div>
		</section>
	);
}