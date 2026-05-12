
import Header from "@/components/layout/Header";
import WindowBlindHero from "@/components/sections/WindowBlind/WindowBlindHero";
import WindowBlindEngine from "@/components/sections/WindowBlind/WindowBlindEngine";
import ElectricCurtainsTypes from "@/components/sections/ElectricCurtains/ElectricCurtainsTypes";
import ElectricCurtainsQuiet from "@/components/sections/ElectricCurtains/ElectricCurtainsQuiet";
import Scripts from "@/components/sections/common/Scripts";
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
	title: routes.WindowBlind.title
}

export default function WindowBlindPage() {
	return (
		<>
			<Header />
			<main>
				<WindowBlindHero />
				<ElectricCurtainsTypes />
				<WindowBlindEngine />
				<ElectricCurtainsQuiet />
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
	);
}