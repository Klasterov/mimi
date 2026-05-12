import Header from "@/components/layout/DarkHeader"
import FireHero from "@/components/sections/Fire/FireHero"
import FeaturesGrid from "@/components/sections/common/FeaturesGrid"
import AdvantagesGrid from "@/components/sections/common/AdvantagesGrid"
import FireReaction from "@/components/sections/Fire/FireReaction"
import Showroom from "@/components/sections/common/Showroom"
import Footer from "@/components/layout/Footer"

import { routes } from "@/config/routes"

const FeaturesСols = [
	{
		image: '/images/fire-page/features/1.jpg',
		cap: 'Уведомление сервисных служб.',
		descr: 'При установке пожарной сигнализации в систему загружаются номера сервисных служб.',
	},
	{
		image: '/images/fire-page/features/2.jpg',
		cap: 'Активация системы пожаротушения.',
		descr: 'Умный Дом самостоятельно включает систему пожаротушения, чтобы ликвидировать возгорание. Также вентиляция переводится в максимальный режим, чтобы устранить угарный газ.',
	},
	{
		image: '/images/fire-page/features/3.jpg',
		cap: 'Аварийное перекрытие воды и газа.',
		descr: 'Для предотвращения возможных последствий короткого замыкания охранно-пожарная система отключит питание и подключится к резервному источнику электроэнергии.',
	},
	{
		image: '/images/fire-page/features/4.jpg',
		cap: 'Переход на автономное снабжение.',
		descr: 'Система перекрывает подачу воды и газа, благодаря установленным на трубах электровентилям.',
	},
]

const AdvantagesСols = [
	{
		image: '/images/fire-page/advantages/1.jpg',
		cap: 'Раннее обнаружение.',
		descr: 'Датчики дыма и температуры фиксируют возгорание на старте.',
		theme: 'light',
	},
	{
		image: '/images/fire-page/advantages/2.jpg',
		cap: 'Встроенное пожаротушение.',
		descr: 'Спринклеры и пеногенераторы интегрированы в проект, пуск по тревоге в нужной зоне.',
		theme: 'light',
		imageClasses: 'max-lg:object-[right_center]'
	},
	{
		type: 'notification-anim',
		notificationImage: '/images/fire-page/advantages/notification-decor.png',
		notificationImageWidth: 332,
		notificationImageHeight: 74,
		cap: 'Контроль и оповещения.',
		descr: 'Сирена в доме и уведомления всем пользователям одновременно.',
		theme: 'light',
		imageClasses: 'max-lg:object-[center_bottom]'
	},
	{
		image: '/images/fire-page/advantages/4.jpg',
		cap: 'Адресная тревога.',
		descr: 'В приложении видно точное помещение, где произошло возгорание.',
		theme: 'dark',
		imageClasses: 'max-lg:object-[center_65%]'
	},
]

export const metadata = {
	title: routes.fire.title
}

export default function FirePage() {
	return (
		<>
			<Header />

			<main>
				<FireHero
					title="Пожарная безопасность"
					text="Эффект полного погружения, который возникает благодаря продуманной схемы расположения экрана и акустических колонок, а также возможностей самой аппаратуры."
				/>
				<FeaturesGrid
					title="Основные функции"
					items={FeaturesСols}
					sectionClasses="bg-black"
					titleClasses="text-[#acacac]"
				/>
				<FireReaction />
				<AdvantagesGrid
					title="Преимущества умного дома MiMiSmart"
					items={AdvantagesСols}
				/>
				<Showroom />
			</main>

			<Footer />
		</>
	)
}