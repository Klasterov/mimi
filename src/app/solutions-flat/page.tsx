import Header from "@/components/layout/SolutionsHeader"
import SolutionsHero from "@/components/sections/SolutionsHero"
import Capabilities from "@/components/sections/Capabilities"
import SolutionsFeature from "@/components/sections/Solutions/SolutionsFeature"
import SolutionsClimatControl from "@/components/sections/Solutions/SolutionsClimatControl"
import SystemCase from "@/components/sections/Solutions/SystemCase"
import VentilationControl from "@/components/sections/Solutions/VentilationControl"
import SolutionsCase from "@/components/sections/Solutions/SolutionsCaseAppartments"
import Scripts from "@/components/sections/common/Scripts"
import Features from "@/components/sections/Features"
import Showroom from "@/components/sections/common/Showroom"
import Footer from "@/components/layout/Footer"

import { routes } from "@/config/routes"
import SolutionsCaseOffice from "@/components/sections/Solutions/SolutionsCaseOffice"

export const metadata = {
	title: routes.solutionsFlat.title
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

export default function SolutionsFlatPage() {
	return (
		<>
			<Header />

			<main>
				<SolutionsHero
					image="/images/solutions-page/hero-bg-flat.jpg"
					withRadialReveal
					title={
						<>
							<span className="text-[18px] md:text-[24px] lg:text-[28px]">
								Готовые решения
							</span>
							<br />
							В квартиру
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
				<SolutionsFeature
					title="Невидимость"
					text="В квартирах меньше свободного пространства и поэтому его не нужно захламлять. Все датчики MiMiSmart либо встраиваются в выключатели, либо размером 1см и совершенно не видны в интерьере."
					link="#"
					image="/images/solutions-page/feature-flat.png"
					imageWidth={906}
					imageHeight={450}
					imageClassName="min-w-225 max-md:-ml-10"
				/>
				<SolutionsClimatControl />
				<SystemCase
					title="Контроль счетчиков"
					text="Рекомендуем устанавливать в каждую квартиру. Вы сможете снимать показания счетчиков просто со смартфона, не открывая ревизионные и монтажные шкафы."
					image="/images/solutions-page/system-case/3.jpg"
					imageWidth={910}
					imageHeight={540}
				/>
				<VentilationControl />
				<SystemCase
					title="Видеонаблюдение"
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