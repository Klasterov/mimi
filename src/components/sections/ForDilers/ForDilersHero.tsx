import { Button } from "@/components/UI/Button";
import { Title } from "@/components/UI/Title";
import { BenefitIcon } from "@/icons/for-partners/BenefitIcon";
import { DesignIcon } from "@/icons/for-partners/DesignIcon";
import { FreedomIcon } from "@/icons/for-partners/FreedomIcon";
import { RelevanceIcon } from "@/icons/for-partners/RelevanceIcon";
import Image from "next/image";

const cols = [
	{
		icon: RelevanceIcon,
		label: 'Актуальность',
		descr: 'Тренд умного дома популярней с каждым днем. Ведь автоматизация значительно повышает уровень комфорта вашего клиента.',
	},
	{
		icon: BenefitIcon,
		label: 'Выгода',
		descr: 'Ежегодно выплачиваем более 6 000 000 р. дизайнерам по партнерской программе. Окажитесь и вы в их числе.',
	},
	{
		icon: DesignIcon,
		label: 'Дизайн',
		descr: 'Единственные видимые элементы умного дома – эстетичные и миниатюрные датчики.',
	},
	{
		icon: FreedomIcon,
		label: 'Свобода',
		descr: 'Выбирайте любые выключатели и инженерию (без ограничений). А мы снимаем с вас головную боль в решении всех технических вопросов.',
	},
]

export default function ForDilersHero() {
	return (
		<section className="bg-white pt-13.5 lg:pt-10 pb-30 overflow-hidden relative">
			<div className="absolute inset-0 bg-linear-to-b from-[#bab7b2] to-[#fff]" />
			<div className="max-w-308 px-4 mx-auto text-center relative">
				<div className="relative min-h-161.25 md:min-h-191.75 flex flex-col items-center mb-3">
					<div className="absolute min-w-170 md:min-w-300 bottom-0 left-[35%] md:left-1/2 -translate-x-1/2 w-full aspect-1200/653">
						<Image
							src="/images/for-dilers-page/hero-decor.png"
							fill
							alt=""
						/>
					</div>
					<Image
						src="/images/for-dilers-page/hero-icon.svg"
						width={132}
						height={132}
						alt=""
						className="mb-6"
					/>
					<Title className="mb-6 relative">Дилерам</Title>
					<div className="max-w-106 font-helvetica relative text-[17px] leading-[1.3] -tracking-[0.01em] mb-10">
						Масштабируйтесь с нами - стабильные поставки, гарантия и расширение ассортимента
					</div>
					<div>
						<Button className="justify-center py-1.75!">Партнерская программа</Button>
					</div>
				</div>
				<ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-15">
					{cols.map((col, i) => {
						const Icon = col.icon

						return (
							<li key={i} className="max-sm:space-y-4 sm:flex sm:flex-col text-left sm:items-center sm:text-center gap-4 -tracking-[0.01em]">
								<div>
									<Icon className="text-[#9d7f46] w-10.5 h-10.5" />
								</div>
								<div className="font-semibold ">
									{col.label}
								</div>
								<div className="font-helvetica text-[15px]">
									{col.descr}
								</div>
							</li>
						)
					})}
				</ul>
			</div>
		</section>
	)
}