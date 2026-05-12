import Header from "@/components/layout/Header"
import GatesHero from "@/components/sections/Gates/GatesHero"
import GatesControl from "@/components/sections/Gates/GatesControl"
import Scripts from "@/components/sections/common/Scripts"
import AdvantagesGrid from "@/components/sections/common/AdvantagesGrid"
import Showroom from "@/components/sections/common/Showroom"
import Footer from "@/components/layout/Footer"

import { routes } from "@/config/routes"


const AdvantagesСols = [
	{
		type: 'notification-anim',
		notificationImage: '/images/gates-page/advantages/notification-decor.png',
		notificationImageWidth: 332,
		notificationImageHeight: 64,
		image: '/images/gates-page/advantages/1.jpg',
		cap: 'Автозакрытие.',
		descr: 'Ворота закрываются после проезда и приходит уведомление.',
		theme: 'dark',
	},
	{
		image: '/images/gates-page/advantages/2.jpg',
		cap: 'Удобный доступ.',
		descr: 'Открытие с телефона и по номеру авто.',
		theme: 'light',
		imageClasses: 'max-lg:object-[left_center]'
	},
	{
		image: '/images/gates-page/advantages/3.jpg',
		cap: 'Гостевой режим.',
		descr: 'Доступ для курьеров и персонала по расписанию и с ограничениями.',
		theme: 'light',
	},
	{
		image: '/images/gates-page/advantages/4.jpg',
		cap: 'Контроль въезда.',
		descr: 'Видео и домофон в одном приложении видно кто заехал и когда,',
		theme: 'dark',
	},
]

const features = [
	{
		id: 0,
		title: 'Я уехал',
		content: [
			"Выключается весь свет",
			"Закрываются шторы",
			"Выключается музыка",
			"Климат-контроль переходит в энергосберегающий режим",
		],
	},
	{
		id: 1,
		title: 'Я приехал',
		content: [
			"Дом и двор снимется с охраны",
			"Включится ландшафтная подсветка",
			"Откроются ворота",
			"Ещё какой-то пункт",
		],
	},
	{
		id: 2,
		title: 'Незванный гость',
		content: [
			"За час начнут прогреваться теплые полы",
			"Отопление перейдет в дневной режим",
			"Плавно откроются шторы, естественно пробуждая солнечными лучами",
			"Вместо будильника, тихая музыка аккуратно встретит с новым днем",
		],
	},
]

export const metadata = {
	title: routes.gates.title
}

export default function GatesPage() {
	return (
		<>
			<Header />

			<main>
				<GatesHero />
				<GatesControl />
				<Scripts
					isLightNav
					isCircleChecks
					title="Сценарии"
					bgImage="/images/gates-page/scripts-bg.jpg"
					bgImageMob="/images/gates-page/scripts-bg-mob.jpg"
					features={features}
				/>
				<AdvantagesGrid title="Преимущества системы" items={AdvantagesСols} />
				<Showroom />
			</main>

			<Footer />
		</>
	)
}