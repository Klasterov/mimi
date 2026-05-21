import Header from "@/components/layout/SolutionsHeader"
import SolutionsHero from "@/components/sections/SolutionsHero"
import VentilationControl from "@/components/sections/Solutions/VentilationControl"
import Capabilities from "@/components/sections/Capabilities"
import SolutionsCase from "@/components/sections/Solutions/SolutionsCaseAppartments"
import SystemCase from "@/components/sections/Solutions/SystemCase"
import Scripts from "@/components/sections/common/Scripts"
import Features from "@/components/sections/Features"
import Showroom from "@/components/sections/common/Showroom"
import Footer from "@/components/layout/Footer"

import { routes } from "@/config/routes"


const features = [
	{
		id: 0,
		title: 'Доброе утро',
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
			"Усиление мощности вентиляции",
			"Гибкая настройка освещения",
			"Плавно закроются создавая подходящую атмосферу",
		],
	},
]
export const metadata = {
	title: routes.solutionsAppartments.title
}

export default function solutionsAppartmentsPage() {
	return (
		<>
			<Header />

			<main>
				<SolutionsHero
					image="/images/solutions-page/hero-bg-appartments.jpg"
					title={
						<>
							<span className="text-[18px] md:text-[24px] lg:text-[28px]">
								Готовые решения
							</span>
							<br />
							В жилой комплекс
						</>
					}
				/>

				<Capabilities
					title="Чем вы сможете управлять?"
					items={[
						'lighting',
						'climate',
						'security',
						'curtains',
						'surveillance',
						'electric',
						'cinema',
						'multiroom'
					]}
				/>
				<VentilationControl />
				<SolutionsCase />
				<SystemCase
					title="Видеодоступ"
					text="Вызов на смартфон, превью с ближайших камер и открытие двери, калитки, шлагбаума из приложения."
					link="/video-control"
					image="/images/solutions-page/system-case/2.jpg"
					imageWidth={910}
					imageHeight={540}
				/>
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
	)
}