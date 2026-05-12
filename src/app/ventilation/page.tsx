import Header from "@/components/layout/Header"
import VentilationHero from "@/components/sections/Ventilation/VentilationHero"
import VentilationEsthetic from "@/components/sections/Ventilation/VentilationEsthetic"
import AirConditioningSolutions from "@/components/sections/AirConditioning/AirConditioningSolutions"
import FeaturesGrid from "@/components/sections/common/FeaturesGrid"
import Scripts from "@/components/sections/common/Scripts"
import Features from "@/components/sections/Features"
import Showroom from "@/components/sections/common/Showroom"
import Footer from "@/components/layout/Footer"

import { routes } from "@/config/routes"

const features = [
	{
		id: 0,
		title: 'Утро',
		content: [
			"За час начнут прогреваться теплые полы",
			"Отопление перейдет в дневной режим",
			"Плавно откроются шторы, естественно пробуждая солнечными лучами",
			"Вместо будильника, тихая музыка аккуратно встретит с новым днем",
		],
	},
	{
		id: 1,
		title: 'Кино',
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

const FeaturesСols = [
	{
		image: '/images/air-conditioning-page/features/1.jpg',
		cap: 'Удобное и простое управление.',
		descr: 'Контроль и индивидуальные настройки системы через телефон, планшет, ПК или выключатели..',
	},
	{
		image: '/images/air-conditioning-page/features/2.jpg',
		cap: 'Разнообразие действий.',
		descr: 'Индивидуальная настройка.. Вентиляция в Умном Доме сработает автоматически при активизации сценария «Я ушел».кондиционер автоматически включается, когда в помещении отсутствуют люди.ам на электронную почту;',
	},
	{
		image: '/images/air-conditioning-page/features/5.jpg',
		cap: 'Комплексность.',
		descr: 'Система вентиляции функционирует в совокупности со всеми видами микроклимата.сбалансированный микроклимат, что способствует сохранению здоровья и профилактике заболеваний.',
		imageClasses: 'max-lg:object-[0%_center]',
	},
	{
		image: '/images/air-conditioning-page/features/6.jpg',
		cap: 'Автоматический подход к комфорту.',
		descr: 'Благодаря датчикам система сама активируется при росте уровня CO₂.',
	},
]
export const metadata = {
	title: routes.ventilation.title
}

export default function VentilationPage() {
	return (
		<>
			<Header />

			<main>
				<VentilationHero />
				<FeaturesGrid sectionClasses="bg-white" title="Возможности системы" items={FeaturesСols} />
				<AirConditioningSolutions />
				<VentilationEsthetic />
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