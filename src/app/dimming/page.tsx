
import Header from "@/components/layout/Header";
import DimmingHero from "@/components/sections/Dimming/DimmingHero";
import FeaturesGrid from "@/components/sections/common/FeaturesGrid";
import DimmingImplement from "@/components/sections/Dimming/DimmingImplement";
import Scripts from "@/components/sections/common/Scripts";
import Features from "@/components/sections/Features";
import Showroom from "@/components/sections/common/Showroom";
import Footer from "@/components/layout/Footer";

import { routes } from "@/config/routes";

const FeaturesСols = [
	{
		image: '/images/dimming-page/features/1.jpg',
		cap: 'Плавная регулировка яркости.',
		descr: 'Больше не нужно ходить по комнатам и задавать нужную температуру отопления.',
	},
	{
		image: '/images/dimming-page/features/2.jpg',
		cap: 'Готовые уровни под разные сценарии одним действием.',
		descr: 'Вам нравится засыпать в прохладе, а просыпаться в тепле? Задайте нужные параметры, и система автоматически подготовит спальню, ванную, коридор за час до вашего пробуждения.',
	},
	{
		image: '/images/dimming-page/features/3.jpg',
		cap: 'Аккуратный вид без пересвеченных зон и бликов на экранах.',
		descr: 'Специальная конструкция делает домофон устойчивым к любым погодным условиям.',
	},
	{
		image: '/images/dimming-page/features/4.jpg',
		cap: 'Комфорт вечером и «тихий» свет ночью.',
		descr: 'При возникновении аварийной ситуации вам придет оповещение на телефон.',
	},
]

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
	title: routes.Dimming.title
}

export default function DimmingPage() {
	return (
		<>
			<Header />
			<main>
				<DimmingHero />
				<FeaturesGrid title="Возможности системы" items={FeaturesСols} />
				<DimmingImplement />
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