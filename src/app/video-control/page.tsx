
import Header from "@/components/layout/Header";
import VideoControlHero from "@/components/sections/VideoControl/VideoControlHero";
import FeaturesGrid from "@/components/sections/common/FeaturesGrid";
import AdvantagesGrid from "@/components/sections/common/AdvantagesGrid";
import VideoControlAbout from "@/components/sections/VideoControl/VideoControlAbout";
import Showroom from "@/components/sections/common/Showroom";
import Footer from "@/components/layout/Footer";

import { routes } from "@/config/routes";

const FeaturesСols = [
	{
		image: '/images/video-control-page/features/1.jpg',
		cap: 'Круглосуточный контроль.',
		descr: 'Контроль над обстановкой внутри дома и на приусадебном участке.',
	},
	{
		image: '/images/video-control-page/features/2.jpg',
		cap: 'Архив записей.',
		descr: 'В любой момент Вы можете самостоятельно изменять настройки системы. Например, задайте время, когда вы возвращаетесь с работы домой, чтоб к этому времени система проветрила квартиру.',
	},
	{
		image: '/images/video-control-page/features/3.jpg',
		cap: 'Просмотр на любом устройстве.',
		descr: 'Изображение с камеры можно вывести на любое оборудование, подключенное к единой системе. Это может быть телевизор, сенсорная панель управления, ПК, телефон.',
		imageClasses: 'max-lg:object-[left_center]'
	},
	{
		image: '/images/video-control-page/features/4.jpg',
		cap: 'Программируемые возможности.',
		descr: 'Автоматическое управление позволяет камере наводиться на передвигающийся объект.',
	},
]
const AdvantagesСols = [
	{
		image: '/images/video-control-page/advantages/1.jpg',
		cap: 'Умные оповещения.',
		descr: 'Система различает людей и шлёт точные уведомления с кадром.',
		theme: 'dark',
	},
	{
		image: '/images/video-control-page/advantages/2.jpg',
		cap: 'Связки со сценариями.',
		descr: 'При обнаружении людей без роли, записывается клип и блокируется доступ.',
		theme: 'light',
		imageClasses: 'max-lg:object-[right_center]'
	},
	{
		image: '/images/video-control-page/advantages/3.jpg',
		cap: 'Интеграция двери и домофона.',
		descr: 'Push-вызов с превью, открытие дверей из приложения.',
		theme: 'light',
		imageClasses: 'max-lg:object-[center_bottom]'
	},
	{
		image: '/images/video-control-page/advantages/4.jpg',
		cap: 'Приватность и запись.',
		descr: 'Локальное шифрование, экспорт фрагментов в один клик.',
		theme: 'light',
		imageClasses: 'max-lg:object-[center_65%]'
	},
	{
		image: '/images/video-control-page/advantages/5.jpg',
		cap: 'Единое управление.',
		descr: 'Все камеры в приложении - живой просмотр, архив, роли и права доступа.',
		theme: 'dark',
	},
]


export const metadata = {
	title: routes.videoСontrol.title
}

export default function VideoControlPage() {
	return (
		<>
			<Header />
			<main>
				<VideoControlHero></VideoControlHero>
				<FeaturesGrid title="Основные функции" items={FeaturesСols}></FeaturesGrid>
				<VideoControlAbout></VideoControlAbout>
				<AdvantagesGrid title="Преимущества умного дома MiMiSmart" items={AdvantagesСols}></AdvantagesGrid>
				<Showroom></Showroom>
			</main>
			<Footer />
		</>
	);
}