import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function VentilationEsthetic() {
	return (
		<section className="max-md:py-15 md:pt-22.5 md:pb-22.5 lg:pb-30">
			<div className="max-w-308 px-4 mx-auto">
				<Title className="mb-2">Эстетичность</Title>
				<div className="mb-10 font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em]">
					Мы тщательно изучаем каждый проект и подбираем подходящую к конкретному случаю вентиляционную систему. Принципы разумной инженерии помогают нам совместить эстетичность и функциональность оборудования, сделать его незаметным в любом интерьере.
				</div>
				<Image
					src="/images/ventilation-page/esthetic-main.jpg"
					width={1200}
					height={700}
					alt=""
					className="rounded-[20px]"
					quality={95}
				/>
			</div>
		</section>
	)
}