
import Header from "@/components/layout/Header";
import ControlAccessHero from "@/components/sections/ControlAccess/ControlAccessHero";
import FeaturesGrid from "@/components/sections/common/FeaturesGrid";
import ControlAccessZones from "@/components/sections/ControlAccess/ControlAccessZones";
import Scripts from "@/components/sections/common/Scripts";
import ElectricLockIntegration from "@/components/sections/ElectricLock/ElectricLockIntegration";
import Showroom from "@/components/sections/common/Showroom";
import Footer from "@/components/layout/Footer";

import { routes } from "@/config/routes";

export const metadata = {
	title: routes.ControlAccess.title
}
const FeaturesСols = [
	{
		image: '/images/control-access-page/features/1.jpg',
		cap: 'Смартфон.',
		descr: 'Изображение с камер выводится на устройства, подключенные к системе.',
	},
	{
		image: '/images/control-access-page/features/2.jpg',
		cap: 'Код или отпечаток пальца.',
		descr: 'Если вас нет дома, гости могут записать аудио- или видеопослания, которые будут отправлены вам на электронную почту;',
	},
	{
		image: '/images/control-access-page/features/3.jpg',
		cap: 'Гостевой доступ по расписанию.',
		descr: 'Специальная конструкция делает домофон устойчивым к любым погодным условиям.',
		imageClasses: 'max-lg:object-[0%_center]',
	},
	{
		image: '/images/control-access-page/features/4.jpg',
		cap: 'Face ID.',
		descr: 'Ограничьте круг пользователей, допущенных к просмотру управления отдельными элементами.',
	},
]

const features = [
	{
		id: 0,
		title: 'Я пришел',
		content: [
			"За час начнут прогреваться теплые полы",
			"Отопление перейдет в дневной режим",
			"Плавно откроются шторы, естественно пробуждая солнечными лучами",
			"Вместо будильника, тихая музыка аккуратно встретит с новым днем",
		],
	},
	{
		id: 1,
		title: 'Я ушел',
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

const slides = [
	{
		image: '/images/control-access-page/zones/1.jpg',
		cap: 'Подъезд/тамбур',
		descr: 'Умные розетки могут отслеживать энергопотребление подключенных приборов.',
	},
	{
		image: '/images/control-access-page/zones/2.jpg',
		cap: 'Входная, калитка/ворота',
		descr: 'Умные розетки могут отслеживать энергопотребление подключенных приборов.',
	},
	{
		image: '/images/control-access-page/zones/3.jpg',
		cap: 'Техпомещения',
		descr: 'Умные розетки могут отслеживать энергопотребление подключенных приборов.',
	},
	{
		image: '/images/control-access-page/zones/1.jpg',
		cap: 'Подъезд/тамбур',
		descr: 'Умные розетки могут отслеживать энергопотребление подключенных приборов.',
	},
	{
		image: '/images/control-access-page/zones/2.jpg',
		cap: 'Входная, калитка/ворота',
		descr: 'Умные розетки могут отслеживать энергопотребление подключенных приборов.',
	},
	{
		image: '/images/control-access-page/zones/3.jpg',
		cap: 'Техпомещения',
		descr: 'Умные розетки могут отслеживать энергопотребление подключенных приборов.',
	},
]

export default function ControlAccessPage() {
	return (
		<>
			<Header />
			<main>
				<ControlAccessHero />
				<FeaturesGrid title="Возможности системы" items={FeaturesСols} />
				<ControlAccessZones
					title="Особенности"
					titleOnMobile="Зоны и точки"
					slides={slides}
				/>
				<Scripts
					title="Сценарии"
					bgImage="/images/curtains-page/scripts/bg.jpg"
					bgImageMob="/images/curtains-page/scripts/bg-mob.jpg"
					features={features}
				/>
				<ElectricLockIntegration />
				<Showroom />
			</main>
			<Footer />
		</>
	);
}