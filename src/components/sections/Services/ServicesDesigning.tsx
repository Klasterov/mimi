import { Title } from "@/components/UI/Title";
import { RightArrowIcon } from "@/icons/RightArrowIcon";
import Image from "next/image";

export default function ServicesDesigning() {
	return (
		<section className="py-22.5 bg-white overflow-hidden">
			<div className="max-w-308 px-4 mx-auto flex flex-col items-center">
				<Title className="mb-6">Проектирование</Title>
				<div className="mb-10 font-helvetica leading-[1.3] -tracking-[0.01em] text-center max-w-132">Музыка — одна из важнейших составляющих настроения, и порой так хочется, чтобы ей сопровождалось каждое действие.</div>
				<div className="mb-10 relative aspect-1034/731 lg:aspect-1200/861 w-[200%] md:w-full">

					<Image
						fill
						alt=""
						src="/images/services-page/designing/map.png"

					/>
				</div>
				<div className="mb-6 font-helvetica leading-[1.3] -tracking-[0.01em] text-center max-w-132">Музыка — одна из важнейших составляющих настроения, и порой так хочется, чтобы ей сопровождалось каждое действие.</div>
				<a href="#" className="inline-flex hover:text-foreground transition-colors duration-300 items-center gap-1 -tracking-[0.01em] text-[15px] font-medium text-brand-blue group">
					Узнать больше о проектировании
					<RightArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
				</a>
			</div>
		</section>
	);
}