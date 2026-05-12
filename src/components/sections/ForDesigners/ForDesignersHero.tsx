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

export default function ForDesignersHero() {
	return (
		<section className="bg-white pt-13.5 lg:pt-10 pb-30 overflow-hidden">
			<div className="max-w-308 px-4 mx-auto flex flex-col items-center text-center">
				<div className="mb-20 min-w-35.5">
					<Image
						src="/images/for-designers-page/hero/top-decor.png"
						width={662}
						height={248}
						quality={95}
						alt=""
					/>
				</div>
				<Image
					src="/images/for-designers-page/hero/icon-decor.svg"
					width={132}
					height={132}
					alt=""
					className="mb-6"
				/>
				<Title className="mb-6">Дизайнерам</Title>
				<div className="font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em] mb-10">
					Умный дом как часть дизайна, а не отдельная инженерия
				</div>
				<div className="mb-35">
					<Button className="justify-center py-1.75!">Партнерская программа</Button>
				</div>
				<ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-15">
					{cols.map((col, i) => {
						const Icon = col.icon

						return (
							<li key={i} className="max-sm:space-y-4 sm:flex sm:flex-col text-left sm:items-center sm:text-center gap-4 -tracking-[0.01em]">
								<div>
									<Icon className="text-[#F90B3A] w-10.5 h-10.5" />
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