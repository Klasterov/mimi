import Header from "@/components/layout/Header"
import CinemaHomeHero from "@/components/sections/CinemaHome/CinemaHomeHero"
import CinemaHomeSlogan from "@/components/sections/CinemaHome/CinemaHomeSlogan"
import CinemaHomeFeatures from "@/components/sections/CinemaHome/CinemaHomeFeatures"
import CinemaHomeTV from "@/components/sections/CinemaHome/CinemaHomeTV"
import CinemaHomeRemote from "@/components/sections/CinemaHome/CinemaHomeRemote"
import Showroom from "@/components/sections/common/Showroom"
import Footer from "@/components/layout/Footer"

import { routes } from "@/config/routes"

const featuresItems = [
	{
		title: 'Система способна воспроизводить файлы с любых носителей и из сети Интернет.',
		text: 'Не нужно подстраиваться под график телетрансляций, устраивайте киносеансы в любое удобное время. Просматривайте фото, слайды и презентации, останавливая воспроизведение в нужном месте, чтобы дать гостям пояснения и комментарии.',
	},
	{
		title: 'Кинотеатр погружает всех зрителей в виртуальную реальность.',
		text: 'С профессиональной точностью настроенная акустика и видеоаппаратура Умного Дома гарантируют впечатляющую достоверность. Цветопередача, контрастность и звуковые эффекты адаптируются к происходящему на экране и заставляют острее переживать эмоции.',
	},
	{
		title: 'Оборудование полностью соответствует параметрам помещения.',
		text: 'Будьте уверены, что инженеры рассчитывают все с точностью до миллиметра и что технический потенциал аппаратуры будет использоваться полностью. Также даются рекомендации по материалам отделки, чтобы домашний кинотеатр системы Умный Дом показал максимум возможностей.',
	},
	{
		title: 'Все оборудование умело вплетается в интерьер.',
		text: 'Несмотря на большое количество динамиков (фронтальных, центральных, тыловых), вы не увидите в окружении ничего лишнего. Аппаратура монтируется скрыто, что не сказывается на ее функциональности.',
	},
]

export const metadata = {
	title: routes.cinemaHome.title
}

export default function CinemaHomePage() {
	return (
		<>
			<Header />

			<main>
				<CinemaHomeHero />
				<CinemaHomeSlogan />
				<CinemaHomeFeatures
					featuresItems={featuresItems}
				/>
				<CinemaHomeTV />
				<CinemaHomeRemote />
				<Showroom />
			</main>

			<Footer />
		</>
	)
}