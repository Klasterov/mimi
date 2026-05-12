import Header from "@/components/layout/Header";
import ForDesignersHero from "@/components/sections/ForDesigners/ForDesignersHero";
import YouGet from "@/components/sections/ForDesigners/ForDesignersYouGet";
import ForDesignersClientGet from "@/components/sections/ForDesigners/ForDesignersClientGet";
import CompetitorsDif from "@/components/sections/CompetitorsDif";
import Showroom from "@/components/sections/common/Showroom";
import Footer from "@/components/layout/Footer";

import { routes } from "@/config/routes";

const competitorsList = [
	{
		title: 'Проект без компромиссов по дизайну',
		descr: 'Система не диктует внешний вид интерьера. Мы работаем с любыми выключателями, светильниками, климатом и оборудованием, сохраняя авторскую идею проекта.',
	},
	{
		title: 'Минимум визуального шума',
		descr: 'Сценарные выключатели, логика автоматизации и датчики позволяют сократить количество клавиш, регуляторов и термостатов на стенах.',
	},
	{
		title: 'Полное сопровождение и ответственность',
		descr: 'Полное сопровождение и ответственность',
	},
	{
		title: 'Гарантии и репутация.',
		descr: 'Бессрочная гарантия. Мы сами производим и продаём оборудование — отвечаем именем и договором.',
	},
	{
		title: 'Понятная интеграция в дизайн-проект',
		descr: 'Мы подключаемся на этапе концепции или рабочей документации и сразу закладываем умный дом в план электрики, освещения и слаботочки.',
	},
	{
		title: 'Дополнительная ценность для клиента',
		descr: 'Умный дом повышает уровень проекта, его технологичность и статус, что помогает дизайнеру выделяться и получать рекомендации.',
	},
]

export const metadata = {
	title: routes.forDesigners.title
}

export default function ForDesignersPage() {
	return (
		<>
			<Header />
			<main>
				<ForDesignersHero />
				<YouGet />
				<ForDesignersClientGet />
				<CompetitorsDif
					title="Что отличает нас от конкурентов?"
					cols={competitorsList}
					colorClasses='text-white bg-linear-to-b from-[#f90b3a] to-[#e11f45]'
				/>
				<Showroom></Showroom>
			</main>
			<Footer />
		</>
	);
}