import { Title } from "@/components/UI/Title";
import Image from "next/image";

const cols = [
	{
		cap: 'Сценарные кнопки.',
		image: '/images/smart-switches-page/logic/1.svg',
	},
	{
		cap: 'Пиктограммы.',
		image: '/images/smart-switches-page/logic/2.svg',
	},
	{
		cap: 'Подсветка.',
		image: '/images/smart-switches-page/logic/3.svg',
	},
	{
		cap: 'Тактильность.',
		image: '/images/smart-switches-page/logic/4.svg',
	},
]

export default function SmartSwitchesLogic() {
	return (
		<section className="lg:min-h-205 py-22.5 flex relative text-white">
			<Image
				src="/images/smart-switches-page/logic/bg.jpg"
				fill
				alt=""
				quality={95}
				className="object-cover"
			/>
			<div className="absolute top-0 left-0 w-full h-full bg-black/30"></div>
			<div className="relative max-w-308 px-4 mx-auto flex flex-col justify-between gap-45 lg:gap-10 w-full">
				<div className="md:max-w-121.5">
					<Title className="mb-6 text-white">
						Логика на выключателе
					</Title>
					<div className="font-helvetica text-[17px] leading-[1.4] -tracking-[0.01em]">
						Один выключатель может управлять не только светом. Короткие и длинные нажатия, комбинации клавиш и удержание позволяют запускать сцены, управлять климатом, шторами и другими системами умного дома.
					</div>
				</div>
				<ul className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4 lg:gap-5">
					{
						cols.map((col, i) => (
							<li key={i} className="gap-4 flex flex-col items-center text-center font-semibold leading-[1.2] -tracking-[0.01em]">
								<Image
									src={col.image}
									width={42}
									height={42}
									alt=""
								/>
								<div>{col.cap}</div>
							</li>
						))
					}
				</ul>
			</div>
		</section>
	)
}