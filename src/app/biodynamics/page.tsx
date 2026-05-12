import Header from "@/components/layout/Header"
import BiodynamicsHero from "@/components/sections/Biodynamics/BiodynamicsHero"
import ControlAccessZones from "@/components/sections/ControlAccess/ControlAccessZones"
import BiodynamicsHealth from "@/components/sections/Biodynamics/BiodynamicsHealth"
import BodyImpact from "@/components/sections/Lightning/BodyImpact"
// 
import Features from "@/components/sections/Features"
import Showroom from "@/components/sections/common/Showroom"
import Footer from "@/components/layout/Footer"

import { routes } from "@/config/routes"


export const metadata = {
	title: routes.biodynamics.title
}


const slides = [
	{
		image: '/images/biodynamics-page/zones/1.jpg',
		cap: 'Утром яркий холодный свет',
		descr: 'Умные розетки могут отслеживать энергопотребление подключенных приборов.',
	},
	{
		image: '/images/biodynamics-page/zones/2.jpg',
		cap: 'Днем яркий белый свет',
		descr: 'Умные розетки могут отслеживать энергопотребление подключенных приборов.',
	},
	{
		image: '/images/biodynamics-page/zones/3.jpg',
		cap: 'Вечером приглушенный теплый свет',
		descr: 'Умные розетки могут отслеживать энергопотребление подключенных приборов.',
	},
	{
		image: '/images/biodynamics-page/zones/1.jpg',
		cap: 'Ночью нет света, только тусклая подсветка',
		descr: 'Умные розетки могут отслеживать энергопотребление подключенных приборов.',
	},
]

export default function BiodynamicsPage() {
	return (
		<>
			<Header />

			<main>
				<BiodynamicsHero />
				<ControlAccessZones
					title="Особенности"
					slides={slides}
				/>
				<BiodynamicsHealth />
				<BodyImpact />
				{/*  */}
				<Features title="Удобное управление" />
				<Showroom />
			</main>

			<Footer />
		</>
	)
}