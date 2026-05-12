import { Title } from "@/components/UI/Title";
import { RightArrowIcon } from "@/icons/RightArrowIcon";
import Image from "next/image";

export default function SolutionsCase() {
	return (
		<section className="overflow-hidden py-22.5">
			<div className="max-w-235.5 px-4 mx-auto max-md:flex-col flex gap-10 lg:gap-25">
				<div className="space-y-6 max-w-95.75">
					<Title className="bg-linear-to-r from-foreground to-[#516076] bg-clip-text text-transparent">
						Аварийные сценарии
					</Title>
					<div className="font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em]">
						Датчики дыма/протечки/газа/открытия работают в общей логике: включаются маршруты света, разблокируются двери, перекрываются вода/газ, вентиляция реагирует по регламенту.
					</div>
					<a href="#" className="inline-flex hover:text-foreground transition-colors duration-300 items-center gap-1 text-[15px] font-medium text-brand-blue group">
						Узнать больше
						<RightArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
					</a>
				</div>
				<div className="">
					<Image
						width={419}
						height={575}
						quality={95}
						alt=""
						src="/images/solutions-page/solutions-case-2.jpg"
					/>
				</div>
			</div>
		</section>
	)
}