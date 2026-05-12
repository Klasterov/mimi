import Header from "@/components/layout/Header"
import IntercomSystemHero from "@/components/sections/IntercomSystem/IntercomSystemHero"
import IntercomSystemOverview from "@/components/sections/IntercomSystem/IntercomSystemOverview"
import FeaturesGrid from "@/components/sections/common/FeaturesGrid"
import Showroom from "@/components/sections/common/Showroom"
import Footer from "@/components/layout/Footer"

import { routes } from "@/config/routes"

export const metadata = {
	title: routes.intercomSystem.title
}

const FeaturesСols = [
	{
		image: '/images/intercom-system-page/features/1.jpg',
		cap: 'Видеокамера в домофоне.',
		descr: 'Изображение с камер выводится на устройства, подключенные к системе.',
	},
	{
		image: '/images/intercom-system-page/features/2.jpg',
		cap: 'Аудио/видео-послания.',
		descr: 'Если вас нет дома, гости могут записать аудио- или видеопослания, которые будут отправлены вам на электронную почту;',
		imageClasses: 'max-lg:object-[center_center]',
	},
	{
		image: '/images/intercom-system-page/features/3.jpg',
		cap: 'Водонепроницаемый корпус.',
		descr: 'Специальная конструкция делает домофон устойчивым к любым погодным условиям.',
		imageClasses: 'max-lg:object-[center_center]',
	},
	{
		image: '/images/intercom-system-page/features/4.jpg',
		cap: 'Шумоподавление.',
		descr: 'Микрофон с возможностью слышать собеседника, а не уличный шум.',
	},
]
export default function IntercomSystemPage() {
	return (
		<>
			<Header />

			<main>
				<IntercomSystemHero />
				<IntercomSystemOverview />
				<FeaturesGrid title="Основные функции" items={FeaturesСols}></FeaturesGrid>
				<Showroom />
			</main>

			<Footer />
		</>
	)
}