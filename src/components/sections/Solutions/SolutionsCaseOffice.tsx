import { Title } from "@/components/UI/Title";
import { RightArrowIcon } from "@/icons/RightArrowIcon";
import Image from "next/image";

export default function SolutionsCaseOffice() {
	return (
		<section className="overflow-hidden py-22.5 lg:py-37.5 lg:min-h-210.5 bg-linear-to-b from-[#e5e5e5] to-transparent">
			<div className="max-w-235.5 px-4 mx-auto max-md:flex-col-reverse flex gap-10 lg:gap-25">
				<div className="space-y-6 max-w-95.75">
					<Title className="bg-linear-to-r from-foreground to-[#516076] bg-clip-text text-transparent">Внутреннее
						освещение</Title>
					<div className="font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em]">Для каждой зоны заданы сценарии, яркость и цвет меняются по датчикам присутствия и дневного света. Освещение синхронизируется с жалюзи и вентиляцией, управление - на панелях и в приложении, понятно любому сотруднику.</div>
					<a href="#" className="inline-flex hover:text-foreground transition-colors duration-300 items-center gap-1 text-[15px] font-medium text-brand-blue group">
						Узнать больше
						<RightArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
					</a>
				</div>
				<div className="mr-[-10%] md:-mr-[28.57%] relative md:w-172 aspect-690/504">
					<Image
						fill
						quality={95}
						alt=""
						src="/images/solutions-page/solutions-case-1.png"
					/>
				</div>
			</div>
		</section>
	)
}