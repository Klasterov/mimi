
import Header from "@/components/layout/Header";
import AlarmSystemHero from "@/components/sections/AlarmSystem/AlarmSystemHero";
import FeaturesGrid from "@/components/sections/common/FeaturesGrid";
import AdvantagesGrid from "@/components/sections/common/AdvantagesGrid";
import VideoControlAbout from "@/components/sections/VideoControl/VideoControlAbout";
import Showroom from "@/components/sections/common/Showroom";
import Footer from "@/components/layout/Footer";

import { routes } from "@/config/routes";

const FeaturesСols = [
	{
		image: '/images/alarm-system-page/features/1.jpg',
		cap: 'Зональная охрана.',
		descr: 'Поставтье на сигнализацию определенные участки, когда находитесь дома.',
	},
	{
		image: '/images/alarm-system-page/features/2.jpg',
		cap: 'Взаимодействие с другими системами.',
		descr: 'Сигнализация в Умном Доме способна включать на колонки мультирум лай собак, включать и выключать освещение в разных комнатах, блокировать двери, отключать подачу электричества и т.д.ы возвращаетесь с работы домой, чтоб к этому времени система проветрила квартиру.',
		imageClasses: 'object-[right_center]'
	},
	{
		image: '/images/alarm-system-page/features/3.jpg',
		cap: 'Несколько уровней доступа.',
		descr: 'Для обслуживающего персонала генерируются отдельные коды доступа, не позволяющие отключать систему безопасности в определенных зонах Умного Дома.т быть телевизор, сенсорная панель управления, ПК, телефон.',
	},
	{
		image: '/images/alarm-system-page/features/4.jpg',
		cap: 'Наличие тревожной кнопки.',
		descr: 'Вы всегда сможете вызвать соответствующие службы, чтобы предотвратить любую опасность.',
	},
]
const AdvantagesСols = [
	{
		image: '/images/alarm-system-page/advantages/1.jpg',
		type: 'notification-anim',
		notificationImage: '/images/alarm-system-page/advantages/decor-1.png',
		notificationImageWidth: 332,
		notificationImageHeight: 64,
		cap: 'Мгновенные оповещения.',
		descr: 'При тревоге сразу приходит уведомление с типом события и зоной.',
		theme: 'dark',
	},
	{
		image: '/images/alarm-system-page/advantages/2.jpg',
		cap: 'Сценарии реакции.',
		descr: 'На тревогу автоматически включается сценарии зашиты.',
		theme: 'light',
		imageClasses: 'max-lg:object-[right_center]'
	},
	{
		image: '/images/alarm-system-page/advantages/3.jpg',
		cap: 'Локальная работа и резерв.',
		descr: 'Система продолжает работать без электричества.',
		theme: 'light',
		imageClasses: 'max-lg:object-[center_bottom]'
	},
	{
		image: '/images/alarm-system-page/advantages/4.jpg',
		cap: 'Гибкое зонирование.',
		descr: 'Можно выбрать нужные зоны охраны и ночной режим.',
		theme: 'light',
		imageClasses: 'max-lg:object-[center_65%]'
	},
	{
		image: '/images/alarm-system-page/advantages/5.jpg',
		cap: 'Подтверждение тревоги.',
		descr: 'Тревогу удобно проверить по камере или домофону, а событие сохраняется в журнале.',
		theme: 'dark',
		type: 'notification-anim',
		notificationImage: '/images/alarm-system-page/advantages/decor-2.png',
		notificationImageWidth: 299,
		notificationImageHeight: 87,
	},
]


export const metadata = {
	title: routes.alarmSystem.title
}

export default function AlarmSystemPage() {
	return (
		<>
			<Header />
			<main>
				<AlarmSystemHero></AlarmSystemHero>
				<FeaturesGrid title="Основные функции" items={FeaturesСols}></FeaturesGrid>
				<VideoControlAbout></VideoControlAbout>
				<AdvantagesGrid title="Преимущества умного дома MiMiSmart" items={AdvantagesСols}></AdvantagesGrid>
				<Showroom></Showroom>
			</main>
			<Footer />
		</>
	);
}