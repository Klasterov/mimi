import Header from "@/components/layout/SolutionsHeader"
import SolutionsHero from "@/components/sections/SolutionsHero"
import Capabilities from "@/components/sections/Capabilities"
import SolutionsFeature from "@/components/sections/Solutions/SolutionsFeature"
import SystemCase from "@/components/sections/Solutions/SystemCase"
import SolutionsLighting from "@/components/sections/Solutions/SolutionsLighting"
import VentilationControl from "@/components/sections/Solutions/VentilationControl"
import SolutionsCase from "@/components/sections/Solutions/SolutionsCaseAppartments"
import Scripts from "@/components/sections/common/Scripts"
import Features from "@/components/sections/Features"
import Showroom from "@/components/sections/common/Showroom"
import Footer from "@/components/layout/Footer"

import { routes } from "@/config/routes"
import SolutionsCaseOffice from "@/components/sections/Solutions/SolutionsCaseOffice"

export const metadata = {
	title: routes.solutionsHome.title
}

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

export default function SolutionsHomePage() {
	return (
		<>
			<Header />

			<main>
				<SolutionsHero
					image="/images/solutions-page/hero-bg-home.jpg"
					title={
						<>
							<span className="text-[18px] md:text-[24px] lg:text-[28px]">
								Готовые решения
							</span>
							<br />
							В дом
						</>
					}
				/>

				<Capabilities
					title="Чем вы сможете управлять?"
				/>
				<SolutionsFeature
					title="Управление воротами"
					text="Возможность дистанционного управления, автоматизация процессов и интеграция с другими системами делают данную функцию неотъемлемой частью современного умного дома."
					link="#"
					image="/images/solutions-page/feature-home.png"
					imageWidth={888}
					imageHeight={450}
					imageClassName="min-w-132 max-md:-mr-40"
				/>
				<SolutionsLighting />
				<VentilationControl />
				<SystemCase
					title="Видео-наблюдение"
					text="Одним из важных компонентов системы безопасности является видеонаблюдение."
					link="#"
					image="/images/solutions-page/system-case/1.jpg"
					imageWidth={910}
					imageHeight={540}
				/>
				<SolutionsCase />
				<SolutionsCaseOffice />
				<SystemCase
					title="Видео-доступ"
					text="Вызов на смартфон, превью с ближайших камер и открытие двери/калитки/шлагбаума из приложения."
					link="#"
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