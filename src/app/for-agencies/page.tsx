
import Header from "@/components/layout/Header";
import ForAgenciesHero from "@/components/sections/ForAgencies/ForAgenciesHero";
import ForAgenciesYouGet from "@/components/sections/ForAgencies/ForAgenciesYouGet";
import ForAgenciesFormat from "@/components/sections/ForAgencies/ForAgenciesFormat";
import CompetitorsDif from "@/components/sections/CompetitorsDif";
import Showroom from "@/components/sections/common/Showroom";
import Footer from "@/components/layout/Footer";

import { routes } from "@/config/routes";

const competitorsList = [
	{
		title: 'Ценность объекта.',
		descr: 'Умный дом делает объект более технологичным и статусным. Квартиры и дома с автоматизацией продаются быстрее и воспринимаются как продукт более высокого класса.',
	},
	{
		title: 'Понятен клиенту без объяснений.',
		descr: 'Интерфейс и сценарии интуитивны. Покупателю не нужно разбираться в технологиях — агент легко демонстрирует преимущества за 5 минут.',
	},
	{
		title: 'Производитель и интегратор.',
		descr: '10+ лет развития системы. Знаем монтаж и пусконаладку, даём русскоязычную поддержку и быстрые ответы.',
	},
	{
		title: 'Универсальность под разные объекты.',
		descr: 'Подходит для квартир, апартаментов и домов. Легко адаптируется под планировку и стадию готовности объекта.',
	},
	{
		title: 'Гарантии и репутация.',
		descr: 'Бессрочная гарантия. Мы сами производим и продаём оборудование — отвечаем именем и договором.',
	},
	{
		title: 'Минимум вмешательства в интерьер',
		descr: 'Оборудование интегрируется аккуратно, без лишних панелей и элементов на стенах.',
	},
]

export const metadata = {
	title: routes.forAgencies.title
}

export default function ForAgenciesPage() {
	return (
		<>
			<Header />
			<main>
				<ForAgenciesHero />
				<ForAgenciesYouGet />
				<ForAgenciesFormat />
				<CompetitorsDif
					title="Что отличает нас от конкурентов?"
					cols={competitorsList}
					colorClasses='bg-[#fcfdff]'
				/>
				<Showroom></Showroom>
			</main>
			<Footer />
		</>
	);
}