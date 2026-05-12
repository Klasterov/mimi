import Header from "@/components/layout/Header"
import SocketsHero from "@/components/sections/Sockets/SocketsHero"
import SocketsFunctions from "@/components/sections/Sockets/SocketsFunctions"
import SocketsSmart from "@/components/sections/Sockets/SocketsSmart"
import PartnersFeatures, { type Slide } from "@/components/sections/Partners/PartnersFeatures"
import Showroom from "@/components/sections/common/Showroom"
import Footer from "@/components/layout/Footer"

import { routes } from "@/config/routes"

export const metadata = {
	title: routes.sockets.title
}

const featuresSlides: Slide[] = [
	{
		image: '/images/partners-page/features-slides/4.jpg',
		cap: 'Удаленное управление.',
		descr: 'Умные розетки позволяют управлять электрическими приборами из любого места с помощью приложения на смартфоне или планшете.',
	},
	{
		image: '/images/partners-page/features-slides/5.jpg',
		cap: 'Учет энергопотребления.',
		descr: 'Умные розетки могут отслеживать энергопотребление подключенных приборов.',
		theme: 'light'
	},
	{
		image: '/images/partners-page/features-slides/6.jpg',
		cap: 'Голосовое управление.',
		descr: 'Управляйте розетками с помощью голосового помощника',
		link: '#',
	},
	{
		image: '/images/partners-page/features-slides/2.jpg',
		cap: 'Автоматизация.',
		descr: 'С помощью умных розеток можно настроить таймеры и сценарии работы приборов.',
	},
]

export default function SocketsPage() {
	return (
		<>
			<Header />

			<main>
				<SocketsHero />
				<SocketsFunctions />
				<SocketsSmart />
				<PartnersFeatures
					title="Особенности умных&nbsp;розеток"
					slides={featuresSlides}
				/>
				<Showroom />
			</main>

			<Footer />
		</>
	)
}