import ArrowLink from "@/components/UI/ArrowLink";
import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function SolutionsClimatControl() {
	return (
		<section className="py-22.5 overflow-hidden bg-[#F8F8F8]">
			<div className="max-w-235.5 px-4 mx-auto">
				<div className="mb-10 bg-linear-to-r from-foreground to-[#516076] bg-clip-text text-transparent">
					<Title className="max-md:hidden">Энергосберегающий
						климат-контроль</Title>
					<Title className="md:hidden">Энерго-сберегающий
						климат контроль</Title>
				</div>
				<div className="flex max-md:flex-col max-md:gap-10 md:items-center justify-between">
					<div className="-ml-70 md:-ml-[32.63%] max-md:max-w-172.5">
						<Image
							src="/images/solutions-page/climat-decor.png"
							width={928}
							height={394}
							alt=""
						/>
					</div>
					<div className="space-y-6 md:max-w-86.5 lg:-mr-17">
						<Image
							src="/images/solutions-page/climat-icon.svg"
							width={54}
							height={54}
							alt=""
						/>
						<div className="text-[17px] font-helvetica leading-[1.3] -tracking-[0.01em]">Важно организовать правильный энергосберегающий климат-контроль. Отопление не должно конкурировать с кондиционированием. Это позволит оптимизировать расходы на электроэнергию.</div>
						<ArrowLink href="">Узнать больше</ArrowLink>
					</div>
				</div>
			</div>
		</section>
	)
}