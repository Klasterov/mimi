
import Header from "@/components/layout/Header";
import UnderfloorHeatingHero from "@/components/sections/UnderfloorHeating/UnderfloorHeatingHero";
import FeaturesGrid from "@/components/sections/common/FeaturesGrid";
import UnderfloorHeatingNeed from "@/components/sections/UnderfloorHeating/UnderfloorHeatingNeed";
import AdvantagesGrid from "@/components/sections/common/AdvantagesGrid";
import Features from "@/components/sections/Features";
import Showroom from "@/components/sections/common/Showroom";
import Footer from "@/components/layout/Footer";

import { routes } from "@/config/routes";

const FeaturesСols = [
	{
		image: '/images/underfloor-heating-page/features/1.jpg',
		cap: 'Управление как удобно.',
		descr: 'Из приложения, со сценного выключателя и сенсорной панели — всё синхронизировано.',
	},
	{
		image: '/images/underfloor-heating-page/features/2.jpg',
		cap: 'Работа в единой системе климата.',
		descr: 'Пол согласован с радиаторами, кондиционером и вентиляцией - без перегревов и перепадов.',
		imageClasses: 'max-lg:object-[0%_center]',
	},
	{
		image: '/images/underfloor-heating-page/features/3.jpg',
		cap: 'Автопрогрев по расписанию.',
		descr: 'Пол заранее включается к нужному времени и отключается, когда вы ушли.',
		imageClasses: 'max-lg:object-[right_center]',
	},
	{
		image: '/images/underfloor-heating-page/features/4.jpg',
		cap: 'Точная температура пола.',
		descr: 'Датчик пола поддерживает заданные градусы для комфортной поверхности.',
	},
]
const AdvantagesСols = [
	{
		image: '/images/underfloor-heating-page/advantages/1.jpg',
		cap: 'Безопасность покрытия.',
		descr: 'Датчики ограничивают максимальную температуру для паркета и плитки.',
		theme: 'light',
	},
	{
		image: '/images/underfloor-heating-page/advantages/2.jpg',
		cap: 'Сценарии и расписания.',
		descr: 'Пол заранее прогревает зоны к подъёму и снижает нагрев в отъезде и ночью.',
		theme: 'light',
		imageClasses: 'max-lg:object-[right_center]'
	},
	{
		image: '/images/underfloor-heating-page/advantages/3.jpg',
		cap: 'Равномерное тепло.',
		descr: 'Тёплый пол прогревает помещение без сквозняков и перегрева у стен.',
		theme: 'dark',
		imageClasses: 'max-lg:object-[80%_center]'
	},
	{
		image: '/images/underfloor-heating-page/advantages/4.jpg',
		cap: 'Контроль из приложения.',
		descr: 'Задавайте температуру по комнатам с телефона.',
		theme: 'dark',
	},
]


export const metadata = {
	title: routes.UnderfloorHeating.title
}

export default function UnderfloorHeatingPage() {
	return (
		<>
			<Header />
			<main>
				<UnderfloorHeatingHero></UnderfloorHeatingHero>
				<FeaturesGrid sectionClasses="bg-white" title="Возможности системы" items={FeaturesСols}></FeaturesGrid>
				<UnderfloorHeatingNeed></UnderfloorHeatingNeed>
				<AdvantagesGrid title="Преимущества умного дома MiMiSmart" items={AdvantagesСols}></AdvantagesGrid>
				<Features title="Удобное управление" />
				<Showroom></Showroom>
			</main>
			<Footer />
		</>
	);
}