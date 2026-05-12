import { Title } from "@/components/UI/Title"
import { RightArrowIcon } from "@/icons/RightArrowIcon"
import Image from "next/image"

const cols = [
	{
		icon: '/images/security-page/smart-sockets/icons/1.svg',
		iconWidth: 42,
		iconHeight: 42,
		title: 'Управление электрозамком с помощью приложения',
		description: 'Если к вам пришли гости, а вас еще нет дома, вы можете посмотреть по камерам видеонаблюдения кто пришел.',
	},
	{
		icon: '/images/security-page/smart-sockets/icons/2.svg',
		iconWidth: 41,
		iconHeight: 41,
		title: 'Открытие замка по отпечатку пальца или face id',
		description: 'Разблокировка квартиры по отпечатку биометрии – удобное решение, которое немного улучшит качество жизни.',
	},
	{
		icon: '/images/security-page/smart-sockets/icons/3.svg',
		iconWidth: 42,
		iconHeight: 42,
		title: 'Открытие замка по паролю',
		description: 'На случай, когда нет возможности открыть дверь ключем или отпечатком пальца.',
	},
	{
		icon: '/images/security-page/smart-sockets/icons/4.svg',
		iconWidth: 49,
		iconHeight: 42,
		title: 'Единоразовый код',
		description: 'Может пригодится, когда вы пригласили няню, но нет возможности дождаться ее дома.',
	},
]
export default function AccessControl() {
	return (
		<section className="py-22.5 lg:py-30">
			<div className="max-w-236 mx-auto px-4 flex">
				{/* <div className="w-[31%] flex-none relative">
					<video
						className="absolute top-0 left-0 w-full h-full object-cover"
						loop
						src="/videos/door.webm"
					>
					</video>
				</div> */}
				<div className="flex-auto">
					<Title className="mb-8">Контроль
						доступа</Title>
					<div className="mb-8 flex gap-6 md:gap-8 lg:gap-10 items-center flex-wrap">
						<a href="#" className="-tracking-[0.01em] inline-flex hover:text-foreground transition-colors duration-300 items-center gap-1 text-[15px] font-medium text-brand-blue group">
							Узнать больше про электрозамки
							<RightArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
						</a>
						<a href="#" className="-tracking-[0.01em] inline-flex hover:text-foreground transition-colors duration-300 items-center gap-1 text-[15px] font-medium text-brand-blue group">
							Узнать больше про ворота
							<RightArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
						</a>
					</div>
					<ul className="grid gap-3 md:gap-5 md:grid-cols-2">
						{cols.map((col, i) => (
							<li key={i} className="rounded-[20px] py-6 px-5 lg:px-6 bg-white -tracking-[0.01em] space-y-4">
								<Image
									src={col.icon}
									width={col.iconWidth}
									height={col.iconHeight}
									alt=""
								/>
								<h3 className="font-semibold">{col.title}</h3>
								<p className="font-helvetica text-[15px]">{col.description}</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	)
}
