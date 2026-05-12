import Header from "@/components/layout/Header"
import AirConditioningHero from "@/components/sections/AirConditioning/AirConditioningHero"
import Scripts from "@/components/sections/common/Scripts"
import AirConditioningSolutions from "@/components/sections/AirConditioning/AirConditioningSolutions"
import Features from "@/components/sections/Features"
import Showroom from "@/components/sections/common/Showroom"
import Footer from "@/components/layout/Footer"

import { routes } from "@/config/routes"
import FeaturesGrid from "@/components/sections/common/FeaturesGrid"


export const metadata = {
	title: routes.airConditioning.title
}

const FeaturesСols = [
	{
		image: '/images/air-conditioning-page/features/1.jpg',
		cap: 'Простота контроля.',
		descr: 'Контроль и индивидуальные настройки системы через телефон, планшет, ПК или выключатели.',
	},
	{
		image: '/images/air-conditioning-page/features/2.jpg',
		cap: 'Разнообразие действий.',
		descr: 'Возможно создание фиксированных сценариев. Благодаря датчикам движения кондиционер автоматически включается, когда в помещении отсутствуют люди.ам на электронную почту;',
	},
	{
		image: '/images/air-conditioning-page/features/3.jpg',
		cap: 'Обеспечение свежим воздухом',
		descr: 'Система позволит получить чистый, без примесей и пыли воздух, а также сбалансированный микроклимат, что способствует сохранению здоровья и профилактике заболеваний.',
		imageClasses: 'max-lg:object-[0%_center]',
	},
	{
		image: '/images/air-conditioning-page/features/4.jpg',
		cap: 'Разграничение прав доступа.',
		descr: 'Систему кондиционирования возможно сделать недоступной для некоторых членов семьи',
	},
]
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
export default function AirConditioningPage() {
	return (
		<>
			<Header />

			<main>
				<AirConditioningHero />
				<FeaturesGrid title="Возможности системы" items={FeaturesСols} />
				<AirConditioningSolutions />
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