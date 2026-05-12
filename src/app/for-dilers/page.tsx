
import Header from "@/components/layout/Header";
import ForDilersHero from "@/components/sections/ForDilers/ForDilersHero";
import ForDilersYouGet from "@/components/sections/ForDilers/ForDilersYouGet";
import CompetitorsDif from "@/components/sections/CompetitorsDif";
import Showroom from "@/components/sections/common/Showroom";
import Footer from "@/components/layout/Footer";

import { routes } from "@/config/routes";

const competitorsList = [
	{
		title: 'Производитель и интегратор.',
		descr: '10+ лет развития системы. Знаем монтаж и пусконаладку, даём русскоязычную поддержку и быстрые ответы.',
	},
	{
		title: 'Plug’n’Play и быстрый запуск.',
		descr: 'Устройства находятся автоматически, 90% настроек делается с телефона, есть база готовых сценариев.',
	},
	{
		title: 'Без единой точки отказа.',
		descr: 'Распределённая архитектура без “центрального мозга”: система делится на независимые модули и остаётся рабочей.',
	},
	{
		title: 'Совместимость и гибкость.',
		descr: 'Работаем с любыми выключателями, кондиционерами и вентиляцией. Индивидуальные сценарии при необходимости пишем мы.',
	},
	{
		title: 'Партнёрская поддержка и лиды.',
		descr: 'Передаём обращения с основного сайта по регионам, помогаем с ТЗ и проектированием.',
	},
	{
		title: 'Гарантии и репутация.',
		descr: 'Бессрочная гарантия. Мы сами производим и продаём оборудование — отвечаем именем и договором.',
	},
]

export const metadata = {
	title: routes.forDilers.title
}

export default function ForDilersPage() {
	return (
		<>
			<Header />
			<main>
				<ForDilersHero />
				<ForDilersYouGet />
				<CompetitorsDif
					title="Что отличает нас от конкурентов?"
					cols={competitorsList}
					colorClasses='text-white bg-[#504a3f]'
				/>
				<Showroom></Showroom>
			</main>
			<Footer />
		</>
	);
}