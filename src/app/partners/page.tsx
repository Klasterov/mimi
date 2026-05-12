import Header from "@/components/layout/Header"
import PartnersHero from "@/components/sections/Partners/PartnersHero"
import PartnersForDealer from "@/components/sections/Partners/PartnersForDealer"
import PartnersForDis from "@/components/sections/Partners/PartnersForDis"
import PartnersForAgency from "@/components/sections/Partners/PartnersForAgency"
import PartnersFeatures from "@/components/sections/Partners/PartnersFeatures"
import Advantages from "@/components/sections/Advantages"
import Showroom from "@/components/sections/common/Showroom"
import Footer from "@/components/layout/Footer"

import { routes } from "@/config/routes"


export const metadata = {
	title: routes.partners.title
}


const featuresSlides = [
	{
		image: '/images/partners-page/features-slides/1.jpg',
		cap: 'Помощь.',
		descr: 'Помогаем в решении многих инженерных вопросов - подрядчики по отоплению, кондиционированию и другие получат еще один контролирующий орган в нашем лице.',
	},
	{
		image: '/images/partners-page/features-slides/2.jpg',
		cap: 'Оборудование.',
		descr: 'Комплексно подходим к выполнению работ и предлагаем на условиях сотрудничества дополнительное необходимое оборудование по партнерским ценам.',
	},
	{
		image: '/images/partners-page/features-slides/3.jpg',
		cap: 'Магазинам.',
		descr: 'У вас собственный магазин по продаже систем и устройств, позволяющих сделать жилье комфортным? Мы с удовольствием организуем вам поставку нашего оборудования.',
	},
	{
		cap: 'Монтажникам.',
		descr: 'Вы – компания, специализирующаяся на монтаже интеллектуальных систем и оборудования – мы с радостью предоставим вам наши устройства.',
	},
]

export default function PartnersPage() {
	return (
		<>
			<Header />

			<main>
				<PartnersHero />
				<PartnersForDealer />
				<PartnersForDis />
				<PartnersForAgency />
				<PartnersFeatures
					title="Всем, кто «за» передовые технологии"
					slides={featuresSlides}
				/>
				<Advantages textLink="Узнать больше о компании" />
				<Showroom />
			</main>

			<Footer />
		</>
	)
}