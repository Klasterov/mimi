
import Header from "@/components/layout/DarkHeader";
import MultiroomFeatures from "@/components/sections/Multiroom/MultiroomFeatures";
import MultiroomHero from "@/components/sections/Multiroom/MultiroomHero";
import AdvantagesGrid from "@/components/sections/common/AdvantagesGrid";
import Features from "@/components/sections/Features";
import Showroom from "@/components/sections/common/Showroom";
import Footer from "@/components/layout/Footer";

import { routes } from "@/config/routes";

const AdvantagesСols = [
	{
		image: '/images/multiroom-page/advantages/1.jpg',
		cap: 'Умные оповещения.',
		descr: 'Система различает людей и шлёт точные уведомления с кадром.',
		theme: 'dark',
	},
	{
		image: '/images/multiroom-page/advantages/2.jpg',
		cap: 'Сценарии и расписания.',
		descr: 'Текст про мультирум',
		theme: 'light',
	},
	{
		image: '/images/multiroom-page/advantages/3.jpg',
		cap: 'Звонки через умный дом.',
		descr: 'Push-вызов с превью, открытие дверей из приложения.',
		theme: 'light',
	},
	{
		image: '/images/multiroom-page/advantages/4.jpg',
		cap: 'Приватность',
		descr: 'Никто не взломает систему.',
		theme: 'light',
	},
	{
		image: '/images/multiroom-page/advantages/5.jpg',
		cap: 'Контроль из приложения.',
		descr: 'Управляйте системой из приложения',
		theme: 'light',
	},
]


export const metadata = {
	title: routes.Multiroom.title
}

export default function MultiroomPage() {
	return (
		<>
			<Header />
			<main>
				<MultiroomHero></MultiroomHero>
				<MultiroomFeatures></MultiroomFeatures>
				<AdvantagesGrid title="Преимущества умного дома MiMiSmart" items={AdvantagesСols}></AdvantagesGrid>
				<Features title="Удобно управление"></Features>
				<Showroom></Showroom>
			</main>
			<Footer />
		</>
	);
}