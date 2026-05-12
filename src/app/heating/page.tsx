
import Header from "@/components/layout/Header";
import HeatingHero from "@/components/sections/Heating/HeatingHero";
import FeaturesGrid from "@/components/sections/common/FeaturesGrid";
import HeatingAuto from "@/components/sections/Heating/HeatingAuto";
import AdvantagesGrid from "@/components/sections/common/AdvantagesGrid";
import Features from "@/components/sections/Features";
import Showroom from "@/components/sections/common/Showroom";
import Footer from "@/components/layout/Footer";

import { routes } from "@/config/routes";

const FeaturesСols = [
	{
		image: '/images/heating-page/features/1.jpg',
		cap: 'Управление системой через приложение.',
		descr: 'Больше не нужно ходить по комнатам и задавать нужную температуру отопления.',
	},
	{
		image: '/images/heating-page/features/2.jpg',
		cap: 'Разнообразие сценариев.',
		descr: 'Вам нравится засыпать в прохладе, а просыпаться в тепле? Задайте нужные параметры, и система автоматически подготовит спальню, ванную, коридор за час до вашего пробуждения.',
	},
	{
		image: '/images/heating-page/features/3.jpg',
		cap: 'Индивидуальные настройки под рукой.',
		descr: 'Специальная конструкция делает домофон устойчивым к любым погодным условиям.',
		imageClasses: 'max-lg:object-[40%_center]'
	},
	{
		image: '/images/heating-page/features/4.jpg',
		cap: 'Система оповещения.',
		descr: 'При возникновении аварийной ситуации вам придет оповещение на телефон.',
	},
]
const AdvantagesСols = [
	{
		image: '/images/heating-page/advantages/1.jpg',
		cap: 'Зональный комфорт.',
		descr: 'Температура настраивается для каждой комнаты отдельно.',
		theme: 'dark',
	},
	{
		image: '/images/heating-page/advantages/2.jpg',
		cap: 'Сценарии дня.',
		descr: 'Ночью прохладнее, утром теплее. Система сама готовит дом.',
		theme: 'light',
	},
	{
		image: '/images/heating-page/advantages/3.jpg',
		cap: 'Контроль и оповещения.',
		descr: 'Сообщения о сбое котла, падении давления и риске замерзания приходят в приложение.',
		theme: 'light',
	},
	{
		image: '/images/heating-page/advantages/4.jpg',
		cap: 'Управление из приложения.',
		descr: 'Задавайте температуру по комнатам с телефона.',
		theme: 'dark',
	},
]


export const metadata = {
	title: routes.Heating.title
}

export default function HeatingPage() {
	return (
		<>
			<Header />
			<main>
				<HeatingHero></HeatingHero>
				<FeaturesGrid title="Возможности системы" items={FeaturesСols}></FeaturesGrid>
				<HeatingAuto></HeatingAuto>
				<AdvantagesGrid title="Преимущества умного дома MiMiSmart" items={AdvantagesСols}></AdvantagesGrid>
				<Features title="Удобное управление" />
				<Showroom></Showroom>
			</main>
			<Footer />
		</>
	);
}