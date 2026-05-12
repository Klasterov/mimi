import Header from "@/components/layout/Header";
import ElectricCurtainsHero from "@/components/sections/ElectricCurtains/ElectricCurtainsHero";
import ElectricCurtainsTypes from "@/components/sections/ElectricCurtains/ElectricCurtainsTypes";
import ElectricCurtainsPositioning from "@/components/sections/ElectricCurtains/ElectricCurtainsPositioning";
import ElectricCurtainsEngine from "@/components/sections/ElectricCurtains/ElectricCurtainsEngine";
import ElectricCurtainsQuiet from "@/components/sections/ElectricCurtains/ElectricCurtainsQuiet";
import Scripts from "@/components/sections/common/Scripts";
import Features from "@/components/sections/Features";
import Showroom from "@/components/sections/common/Showroom";
import Footer from "@/components/layout/Footer";

import { routes } from "@/config/routes";


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
	title: routes.ElectricCurtains.title
}

export default function ElectricCurtainsPage() {
	return (
		<>
			<Header />
			<main>
				<ElectricCurtainsHero />
				<ElectricCurtainsTypes />
				<ElectricCurtainsPositioning />
				<ElectricCurtainsEngine />
				<ElectricCurtainsQuiet />
				<Scripts
					title="Сценарии"
					bgImage="/images/curtains-page/scripts/bg.jpg"
					bgImageMob="/images/curtains-page/scripts/bg-mob.jpg"
					features={features}
				/>
				<Features title="Удобное управление" />
				<Showroom />
			</main>
			<Footer />
		</>
	);
}