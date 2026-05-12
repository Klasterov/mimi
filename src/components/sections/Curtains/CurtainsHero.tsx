import { Button } from "@/components/UI/Button";
import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function CurtainsHero() {
	return (
		<section className="py-8 md:py-16 lg:py-22.5 min-h-182 relative flex items-end">
			<Image
				src="/images/curtains-page/hero-bg.jpg"
				fill
				quality={95}
				alt=""
				className="object-cover"
			/>
			<div className="absolute bottom-0 left-0 w-full h-full bg-linear-to-t from-[#F4F4F4] via-[#F4F4F4]/40 to-transparent"></div>
			<div className="max-w-308 w-full mx-auto px-4 flex md:justify-between flex-col md:flex-row items-start md:items-end gap-6 relative">
				<div className="tracking-[-0.01em] space-y-3">
					<div className="font-helvetica font-bold text-[32px] md:text-[36px] lg:text-[40px] flex items-center gap-2.5">
						<Image
							src="/images/icons/home-icon.svg"
							width={32}
							height={32}
							alt=""
						/>
						Электрошторы
					</div>
					<div className="font-bold text-[20px] md:text-[24px] lg:text-[28px]">Удобство без лишних действий. </div>
					<div className="font-helvetica text-[15px] leading-normal">Открываются сами, когда нужно</div>
				</div>
				<div>
					<Button className="justify-center py-1.75!">Узнать больше</Button>
				</div>
			</div>
		</section>
	);
}