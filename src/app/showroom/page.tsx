import Header from "@/components/layout/Header"
import ShowroomHero from "@/components/sections/Showroom/ShowroomHero";
import ShowroomAbout from "@/components/sections/Showroom/ShowroomAbout";
import Capabilities from "@/components/sections/Capabilities";
import Scripts from "@/components/sections/common/Scripts";
import Team from "@/components/sections/About/Team";
import Contacts from "@/components/sections/common/Contacts"
import Footer from "@/components/layout/Footer"

import { routes } from "@/config/routes"

const features = [
	{
		id: 0,
		title: 'Я пришел',
		content: [
			"За час начнут прогреваться теплые полы",
			"Отопление перейдет в дневной режим",
			"Плавно откроются шторы, естественно пробуждая солнечными лучами",
			"Вместо будильника, тихая музыка аккуратно встретит с новым днем",
		],
	},
	{
		id: 1,
		title: 'Я ушел',
		content: [
			"Выключается весь свет",
			"Закрываются шторы",
			"Выключается музыка",
			"Климат-контроль переходит в энергосберегающий режим",
		],
	},
	{
		id: 2,
		title: 'Вечеринка',
		content: [
			"За час начнут прогреваться теплые полы",
			"Отопление перейдет в дневной режим",
			"Плавно откроются шторы, естественно пробуждая солнечными лучами",
			"Вместо будильника, тихая музыка аккуратно встретит с новым днем",
		],
	},
]
export const metadata = {
	title: routes.showroom.title
}

export default function ShowroomPage() {
	return (
		<>
			<Header />

			<main>
				<ShowroomHero />
				<ShowroomAbout />
				<Capabilities title="Что вы увидите?" />
				<Scripts
					isCircleChecks
					title="Сценарии"
					bgImage="/images/curtains-page/scripts/bg.jpg"
					bgImageMob="/images/curtains-page/scripts/bg-mob.jpg"
					features={features}
				/>
				<Team />
				<Contacts />
			</main>

			<Footer />
		</>
	)
}