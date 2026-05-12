import Header from "@/components/layout/DarkHeader";
import EquipmentHero from "@/components/sections/Equipment/EquipmentHero";
import FeaturesGrid from "@/components/sections/common/FeaturesGrid";
import EquipmentControlls from "@/components/sections/Equipment/EquipmentControlls";
import EquipmentSensors from "@/components/sections/Equipment/EquipmentSensors";
import EquipmentReserve from "@/components/sections/Equipment/EquipmentReserve";
import EquipmentApp from "@/components/sections/Equipment/EquipmentApp";
import EquipmentCatalog from "@/components/sections/Equipment/EquipmentCatalog";
import Showroom from "@/components/sections/common/Showroom";
import Footer from "@/components/layout/Footer";
import { routes } from "@/config/routes";


const FeaturesСols = [
	{
		image: '/images/equipment-page/features/1.jpg',
		cap: 'Сбор статистики.',
		descr: 'Смотрите показания счетчиков в online-формате. ',
	},
	{
		image: '/images/equipment-page/features/2.jpg',
		cap: 'Индивидуальная настройка.',
		descr: 'В любой момент Вы можете самостоятельно изменять настройки системы. Например, задайте время, когда вы возвращаетесь с работы домой, чтоб к этому времени система проветрила квартиру.',
	},
	{
		image: '/images/equipment-page/features/3.jpg',
		cap: 'Масштабируемость.',
		descr: 'Расширять возможности системы легко. Вы всегда можете дополнить и расширить возможности умного дома, подключая новые удобные функции.',
	},
	{
		image: '/images/equipment-page/features/4.jpg',
		cap: 'Разграничение прав доступа.',
		descr: 'Ограничьте круг пользователей, допущенных к просмотру управления отдельными элементами.',
	},
]

export const metadata = {
	title: routes.equipment.title
}

export default function EquipmentPage() {
	return (
		<>
			<Header />
			<main>
				<EquipmentHero></EquipmentHero>
				<FeaturesGrid title="Возможности умного дома" items={FeaturesСols}></FeaturesGrid>
				<EquipmentControlls></EquipmentControlls>
				<EquipmentSensors></EquipmentSensors>
				<EquipmentReserve></EquipmentReserve>
				<EquipmentApp></EquipmentApp>
				<EquipmentCatalog></EquipmentCatalog>
				<Showroom></Showroom>
			</main>
			<Footer />
		</>
	);
} 