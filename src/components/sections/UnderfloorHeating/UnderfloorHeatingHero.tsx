import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function UnderfloorHeatingHero() {
	return (
		<section className="md:aspect-1440/820 max-md:h-215 py-50 flex items-end relative bg-linear-to-b from-[#d3b291] to-white">
			<Image
				fill
				alt=""
				src="/images/underfloor-heating-page/hero-bg.png"
				className="object-cover max-md:hidden"
			/>
			<Image
				fill
				alt=""
				src="/images/underfloor-heating-page/hero-bg-mob.png"
				className="object-cover md:hidden"
			/>

			<div className="max-w-235.5 px-4 w-full mx-auto flex flex-col items-center text-center relative">
				<Title className="mb-6">Теплый пол</Title>
				<div className="font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em] max-w-140">
					Нехитрая система подъема, позволяющая им подниматься вверх или опускаться вниз с помощью системы шнуров и электропривода..
				</div>
			</div>
		</section>
	);
}