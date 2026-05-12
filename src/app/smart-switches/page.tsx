import Header from "@/components/layout/Header"
import SmartSwitchesHero from "@/components/sections/SmartSwitches/SmartSwitchesHero"
import SmartSwitchesMaterials from "@/components/sections/SmartSwitches/SmartSwitchesMaterials"
import SmartSwitchesLogic from "@/components/sections/SmartSwitches/SmartSwitchesLogic"
import Scripts from "@/components/sections/common/Scripts"
import Showroom from "@/components/sections/common/Showroom"
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
	title: routes.smartSwitches.title
}

export default function smartSwitchesPage() {
	return (
		<>
			<Header />

			<main>
				<SmartSwitchesHero />
				<SmartSwitchesMaterials />
				<SmartSwitchesLogic />
				<Scripts
					title="Сценарии"
					bgImage="/images/curtains-page/scripts/bg.jpg"
					bgImageMob="/images/curtains-page/scripts/bg-mob.jpg"
					features={features}
				/>
				<Showroom />
			</main>

			<Footer />
		</>
	)
}