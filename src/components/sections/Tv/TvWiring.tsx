import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function TvWiring() {
	return (
		<section className="pt-22.5 pb-5 md:pt-15 md:pb-15 overflow-hidden">
			<div className="max-w-234.5 px-4 mx-auto md:flex md:items-start">
				<div className="md:grow-0 md:shrink-0 md:basis-95.75 md:relative md:z-10 max-md:mb-10 ">

					<Title className="mb-6">Скрытая проводка</Title>
					<div className="font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em]">
						Освещение играет ключевую роль в создании комфортной и безопасной атмосферы как внутри, так и вокруг коттеджа. Система умного дома позволяет эффективно управлять наружным освещением, делая его более энергоэффективным, удобным и функциональным
					</div>
				</div>
				<div className="relative -mr-28 md:mt-19.5 md:grow-0 md:shrink-0 md:basis-190.75 aspect-763/616 md:-ml-25 md:-mr-33.75">
					<Image
						src="/images/tv-page/wiring/decor.png"
						quality={95}
						fill
						alt=""
					/>
				</div>
			</div>
		</section>
	);
}