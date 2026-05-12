
import Header from "@/components/layout/Header";
import TvHero from "@/components/sections/Tv/TvHero";
import TvSelection from "@/components/sections/Tv/TvSelection";
import TvDiagonal from "@/components/sections/Tv/TvDiagonal";
import TvWiring from "@/components/sections/Tv/TvWiring";
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
	title: routes.Tv.title
}

export default function TvPage() {
	return (
		<>
			<Header />
			<main>
				<TvHero />
				<TvSelection />
				<TvDiagonal />
				<TvWiring />
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