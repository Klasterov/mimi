import { Title } from "@/components/UI/Title"
import Image from "next/image"

const items = [
	"Удобное управление системами безопасности дома и прилегающей территории",
	"Регулирование параметров микроклимата",
	"Управление домофоном, калитками, воротами, шалгбаумами",
	"Совместимость с мультимедийными продуктами Apple, системами мультирум",
	"Удаленный контроль через интернет",
]

export default function AppFunctions() {
	return (
		<section className="pt-30 pb-22.5">
			<Title className="mb-10 max-w-308 px-4 mx-auto">Основные функции</Title>

			<div className="max-w-348 px-4 mx-auto">
				<div className="rounded-3xl bg-white px-6 py-10 md:px-10 lg:px-20 lg:py-15">
					<div className="lg:grid lg:grid-cols-[544px_minmax(0,1fr)] lg:gap-10">
						<div className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
							<Image
								src="/images/app-page/functions-decor.png"
								width={544}
								height={787}
								alt=""
							/>
						</div>

						<div className="hidden lg:block">
							{items.map((item, index) => (
								<div
									key={index}
									className="flex min-h-[75vh] items-center"
								>
									<div className="max-w-lg font-semibold text-[32px] leading-[1.3] -tracking-[0.01em]">
										{item}
									</div>
								</div>
							))}
						</div>

						<div className="lg:hidden">
							<div className="max-w-lg font-semibold text-[22px] md:text-[26px] leading-[1.3] -tracking-[0.01em]">
								{items[0]}
							</div>

							<div className="my-5 flex justify-center">
								<Image
									src="/images/app-page/functions-decor-mob.png"
									width={273}
									height={557}
									alt=""
								/>
							</div>

							<div className="space-y-5 max-w-lg font-semibold text-[22px] md:text-[26px] leading-[1.3] -tracking-[0.01em]">
								{items.slice(1).map((item, index) => (
									<div key={index}>{item}</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}