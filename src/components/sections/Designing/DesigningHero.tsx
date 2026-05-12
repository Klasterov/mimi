import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function DesigningHero() {
	return (
		<section className="py-17 text-center relative bg-white min-h-303.75 lg:min-h-374 overflow-hidden">
			<div className="absolute bottom-5.5 lg:bottom-0 lg:top-0 -right-[85.9%] lg:right-1/2 lg:translate-x-1/2 w-354.5 aspect-1418/1467">

				<Image
					fill
					alt=""
					src="/images/designing-page/map.jpg"
					quality={95}
					className="object-cover"
				/>
			</div>
			<div className="max-w-308 mx-auto px-4 relative">
				<Title className="mb-6">Проектирование</Title>
				<div className="max-w-135.5 mx-auto font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em]">Музыка — одна из важнейших составляющих настроения, и порой так хочется, чтобы ей сопровождалось каждое действие.</div>
			</div>
		</section>
	);
}