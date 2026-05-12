import Header from "@/components/layout/Header"
import PALHero from "@/components/sections/PAL/PALHero"
import PALAppearance from "@/components/sections/PAL/PALAppearance"
import PALFeatures from "@/components/sections/PAL/PALFeatures"
import Showroom from "@/components/sections/common/Showroom"
import Footer from "@/components/layout/Footer"

import { routes } from "@/config/routes"

const featuresCols = [
	{
		image: '/images/pal-page/features/1.jpg',
		cap: 'Уведомляет сервисные службы.',
		descr: 'Монтаж датчиков протечки осуществляется совместно с загрузкой соответствующего ПО и команд вызова помощи.',
	},
	{
		image: '/images/pal-page/features/2.jpg',
		cap: 'Включает сигнализацию.',
		descr: 'Система включит на максимальной громкости колонки системы мультирум и передаст всем находящимся в доме информацию о протечке.',
	},
	{
		image: '/images/pal-page/features/3.jpg',
		cap: 'Отключает воду.',
		descr: 'Cистема перекрывает подачу воды сразу, как получает тревожное сообщение от датчиков.',
	},
]

export const metadata = {
	title: routes.protectionAgainstLeaks.title
}

export default function ProtectionAgainstLeaksPage() {
	return (
		<>
			<Header />

			<main>
				<PALHero />
				<PALAppearance />
				<PALFeatures
					title="Возможности системы"
					cols={featuresCols}
				/>
				<Showroom />
			</main>

			<Footer />
		</>
	)
}