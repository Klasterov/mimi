import ArrowLink from "@/components/UI/ArrowLink";
import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function SolutionsLighting() {
	return (
		<section className="max-md:pt-22.5 overflow-hidden">
			<div className="max-w-235.5 px-4 mx-auto max-md:flex-col flex items-center">
				<div className="space-y-6 max-w-95.75 py-10">
					<Title className="bg-linear-to-r from-foreground to-[#516076] bg-clip-text text-transparent">Наружное
						освещение</Title>
					<div className="font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em]">
						Освещение играет ключевую роль в создании комфортной и безопасной атмосферы как внутри, так и вокруг коттеджа. Система умного дома позволяет эффективно управлять наружным освещением, делая его более энергоэффективным, удобным и функциональным
					</div>
					<ArrowLink href="">Узнать больше</ArrowLink>
				</div>
				<div className="max-md:self-end -mr-30 md:-mr-[30%]">
					<Image
						src="/images/solutions-page/lighting-decor.png"
						width={797}
						height={842}
						alt=""
					/>
				</div>
			</div>
		</section>
	)
}