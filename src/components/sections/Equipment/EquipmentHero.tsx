import { Title } from "@/components/UI/Title"
import { RightArrowIcon } from "@/icons/RightArrowIcon"
import Image from "next/image"

export default function EquipmentHero() {
	return (
		<section className="bg-black pb-25 text-white pt-80 lg:pt-74 lg:pb-30 overflow-hidden relative">
			<div className="max-w-238 mx-auto px-4 text-center">
				<Title className="mb-4 lg:mb-7">Оборудование</Title>
				<ul className="flex gap-2 max-w-114.5 mx-auto justify-center flex-wrap mb-15 lg:mb-20">
					<li className="py-1.5 px-3 rounded-[50px] bg-foreground flex items-center gap-2 text-[15px] -tracking-[0.01em] leading-normal">
						<Image
							src="/images/icons/equipment-check.svg"
							width={18}
							height={18}
							alt=""
							className="shadow-[0_4px_4px_0_rgba(0,208,255,0.25)] rounded-full"
						/>
						Контроллеры
					</li>
					<li className="py-1.5 px-3 rounded-[50px] bg-foreground flex items-center gap-2 text-[15px] -tracking-[0.01em] leading-normal">
						<Image
							src="/images/icons/equipment-check.svg"
							width={18}
							height={18}
							alt=""
							className="shadow-[0_4px_4px_0_rgba(0,208,255,0.25)] rounded-full"
						/>
						Датчики
					</li>
					<li className="py-1.5 px-3 rounded-[50px] bg-foreground flex items-center gap-2 text-[15px] -tracking-[0.01em] leading-normal">
						<Image
							src="/images/icons/equipment-check.svg"
							width={18}
							height={18}
							alt=""
							className="shadow-[0_4px_4px_0_rgba(0,208,255,0.25)] rounded-full"
						/>
						Бесперебойное электроснабжение
					</li>
					<li className="py-1.5 px-3 rounded-[50px] bg-foreground flex items-center gap-2 text-[15px] -tracking-[0.01em] leading-normal">
						<Image
							src="/images/icons/equipment-check.svg"
							width={18}
							height={18}
							alt=""
							className="shadow-[0_4px_4px_0_rgba(0,208,255,0.25)] rounded-full"
						/>
						Приложение
					</li>
				</ul>
				<div className="absolute -top-14 lg:-top-20 left-1/2 -translate-x-1/2 w-335 aspect-1340/650">
					<Image
						src="/images/equipment-page/hero/decor.png"
						fill
						quality={95}
						alt=""
					/>
				</div>
				<div className="relative aspect-920/705 p-4 md:p-7 lg:p-10">
					<Image
						src="/images/equipment-page/hero/ipad.png"
						fill
						alt=""
					/>
					<div className="relative rounded-2xl h-full overflow-hidden">
						<Image
							src="/images/equipment-page/hero/main.jpg"
							fill
							quality={95}
							className="object-cover"
							alt=""
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
