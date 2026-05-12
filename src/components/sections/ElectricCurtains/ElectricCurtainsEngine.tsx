import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function ElectricCurtainsEngine() {
	return (
		<section className="pt-22.5 max-lg:pb-22.5 overflow-hidden">
			<div className="max-w-235.5 px-4 mx-auto">
				<Title className="max-w-131 max-lg:mb-10">Электропривод
					в карнизе</Title>
				<div className="lg:flex lg:items-center lg:justify-between lg:-mt-6">
					<div className="relative max-lg:max-w-112.5 -ml-22.5 lg:grow-0 lg:shrink-0 lg:-ml-[28.8%] lg:basis-[80.54%] aspect-733/718">
						<Image
							fill
							alt=""
							src="/images/electric-curtains-page/engine/decor.png"
							quality={95}
						/>
					</div>
					<div className="lg:grow-0 lg:shrink-0 lg:basis-[37%] lg:-mr-[7.47%]">

						<Image
							width={54}
							height={54}
							alt=""
							src="/images/electric-curtains-page/engine/icon.svg"
							className="mb-6"
						/>
						<p className="font-helvetica leading-[1.3] -tracking-[0.01em]">
							Важно организовать правильный энергосберегающий климат-контроль. Отопление не должно конкурировать с кондиционированием. Это позволит оптимизировать расходы на электроэнергию.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}