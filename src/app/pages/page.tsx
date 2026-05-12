import Link from "next/link";

export const metadata = {
	title: 'MiMiSmart'
}

export default function PagesPage() {
	return (
		<div className="py-20">
			<div className="max-w-235.5 mx-auto px-4 text-[20px] leading-normal space-y-10">
				<div>
					<ul className="font-helvetica">
						<li><Link href="/" className="transition-colors hover:text-brand-blue duration-300">Главная</Link></li>
					</ul>
				</div>
				<div>
					<div className="mb-4 font-bold">STAGE 2:</div>
					<ol className="font-helvetica list-decimal pl-7">
						<li><Link href="/about" className="transition-colors hover:text-brand-blue duration-300">О компании</Link></li>
						<li><Link href="/contacts" className="transition-colors hover:text-brand-blue duration-300">Контакты</Link></li>
						<li><Link href="/faq" className="transition-colors hover:text-brand-blue duration-300">FAQ</Link></li>
						<li><Link href="/portfolio" className="transition-colors hover:text-brand-blue duration-300">Проекты</Link></li>
						<li><Link href="/solutions" className="transition-colors hover:text-brand-blue duration-300">Готовые решения</Link></li>
						<li><Link href="/cinema" className="transition-colors hover:text-brand-blue duration-300">Мультимедиа</Link></li>
						<li><Link href="/equipment" className="transition-colors hover:text-brand-blue duration-300">Оборудование</Link></li>
						<li><Link href="/lightning" className="transition-colors hover:text-brand-blue duration-300">Освещение</Link></li>
						<li><Link href="/curtains" className="transition-colors hover:text-brand-blue duration-300">Электрошторы</Link></li>
						<li><Link href="/features" className="transition-colors hover:text-brand-blue duration-300">Преимущества</Link></li>
						<li><Link href="/security" className="transition-colors hover:text-brand-blue duration-300">Безопасность</Link></li>
						<li><Link href="/climate" className="transition-colors hover:text-brand-blue duration-300">Климат-контроль</Link></li>
					</ol>
				</div>
				<div>
					<div className="mb-4 font-bold">STAGE 3/1:</div>
					<ol className="font-helvetica list-decimal pl-7">
						<li><Link href="/news" className="transition-colors hover:text-brand-blue duration-300">Статьи</Link></li>
						<li><Link href="/article" className="transition-colors hover:text-brand-blue duration-300">Статья</Link></li>
						<li><Link href="/privacy" className="transition-colors hover:text-brand-blue duration-300">Политика конфиденциальности</Link></li>
						<li><Link href="/err" className="transition-colors hover:text-brand-blue duration-300">404</Link></li>
						<li><Link href="/pricing" className="transition-colors hover:text-brand-blue duration-300">Узнайте стоимость умного дома</Link></li>
						<li><Link href="/project" className="transition-colors hover:text-brand-blue duration-300">Проект</Link></li>
						<li><Link href="/controller" className="transition-colors hover:text-brand-blue duration-300">Контроллеры</Link></li>
						<li><Link href="/detector" className="transition-colors hover:text-brand-blue duration-300">Датчики</Link></li>
						<li><Link href="/detector/smoke" className="transition-colors hover:text-brand-blue duration-300">Датчик дыма</Link></li>
						<li><Link href="/detector/wet" className="transition-colors hover:text-brand-blue duration-300">Датчик влажности</Link></li>
						<li><Link href="/detector/temperature" className="transition-colors hover:text-brand-blue duration-300">Датчик температуры</Link></li>
						<li><Link href="/detector/moving" className="transition-colors hover:text-brand-blue duration-300">Датчик движения</Link></li>
						<li><Link href="/detector/infared-sensor" className="transition-colors hover:text-brand-blue duration-300">Инфракрасные датчики</Link></li>
						<li><Link href="/detector/opening" className="transition-colors hover:text-brand-blue duration-300">Датчик открытия</Link></li>
						<li><Link href="/detector/leak" className="transition-colors hover:text-brand-blue duration-300">Датчик протечки</Link></li>
						<li><Link href="/app" className="transition-colors hover:text-brand-blue duration-300">Приложение</Link></li>
						<li><Link href="/video-control" className="transition-colors hover:text-brand-blue duration-300">Видеонаблюдение</Link></li>
						<li><Link href="/alarm-system" className="transition-colors hover:text-brand-blue duration-300">Сигнализация</Link></li>
						<li><Link href="/intercom-system" className="transition-colors hover:text-brand-blue duration-300">Домофон</Link></li>
						<li><Link href="/showroom" className="transition-colors hover:text-brand-blue duration-300">Шоурум</Link></li>
						<li><Link href="/gates" className="transition-colors hover:text-brand-blue duration-300">Ворота</Link></li>
						<li><Link href="/partners" className="transition-colors hover:text-brand-blue duration-300">Сотрудничество</Link></li>
						<li><Link href="/sockets" className="transition-colors hover:text-brand-blue duration-300">Управление розетками</Link></li>
						<li><Link href="/protection-against-leaks" className="transition-colors hover:text-brand-blue duration-300">Защита от протечек</Link></li>
						<li><Link href="/for-designers" className="transition-colors hover:text-brand-blue duration-300">Дизайнерам</Link></li>
						<li><Link href="/for-dilers" className="transition-colors hover:text-brand-blue duration-300">Дилерам</Link></li>
						<li><Link href="/for-agencies" className="transition-colors hover:text-brand-blue duration-300">Агентствам</Link></li>
						<li><Link href="/solutions-flat" className="transition-colors hover:text-brand-blue duration-300">Готовые решения в квартиру</Link></li>
						<li><Link href="/solutions-home" className="transition-colors hover:text-brand-blue duration-300">Готовые решения в дом</Link></li>
						<li><Link href="/solutions-office" className="transition-colors hover:text-brand-blue duration-300">Готовые решения в офис</Link></li>
						<li><Link href="/solutions-appartments" className="transition-colors hover:text-brand-blue duration-300">Готовые решения в жилой комплекс</Link></li>
						<li><Link href="/smart-switches" className="transition-colors hover:text-brand-blue duration-300">Умные выключатели</Link></li>
						<li><Link href="/cinema-home" className="transition-colors hover:text-brand-blue duration-300">Домашний кинотеатр</Link></li>
						<li><Link href="/fire" className="transition-colors hover:text-brand-blue duration-300">Пожарная безопасность</Link></li>
					</ol>
				</div>
				<div>
					<div className="mb-4 font-bold">STAGE 3/2:</div>
					<ol className="font-helvetica list-decimal pl-7">
						<li><Link href="/audio" className="transition-colors hover:text-brand-blue duration-300">Аудио</Link></li>
						<li><Link href="/tv" className="transition-colors hover:text-brand-blue duration-300">TV</Link></li>
						<li><Link href="/projector" className="transition-colors hover:text-brand-blue duration-300">Проектор</Link></li>
						<li><Link href="/electric-curtains" className="transition-colors hover:text-brand-blue duration-300">Электрошторы</Link></li>
						<li><Link href="/electric-lock" className="transition-colors hover:text-brand-blue duration-300">Электрозамок</Link></li>
						<li><Link href="/services" className="transition-colors hover:text-brand-blue duration-300">Монтаж и настройка</Link></li>
						<li><Link href="/designing" className="transition-colors hover:text-brand-blue duration-300">Проектирование</Link></li>
						<li><Link href="/customization" className="transition-colors hover:text-brand-blue duration-300">Монтаж и установка</Link></li>
						<li><Link href="/maintenance" className="transition-colors hover:text-brand-blue duration-300">Гарантия</Link></li>
						<li><Link href="/power-supply" className="transition-colors hover:text-brand-blue duration-300">Бесперебойное электроснабжение</Link></li>
						<li><Link href="/window-blind" className="transition-colors hover:text-brand-blue duration-300">Жалюзи</Link></li>
						<li><Link href="/himidity" className="transition-colors hover:text-brand-blue duration-300">Влажность</Link></li>
						<li><Link href="/heating" className="transition-colors hover:text-brand-blue duration-300">Отопление</Link></li>
						<li><Link href="/underfloor-heating" className="transition-colors hover:text-brand-blue duration-300">Теплый пол</Link></li>
						<li><Link href="/dimming" className="transition-colors hover:text-brand-blue duration-300">Диммирование</Link></li>
						<li><Link href="/biodynamics" className="transition-colors hover:text-brand-blue duration-300">Биодинамика</Link></li>
						<li><Link href="/ventilation" className="transition-colors hover:text-brand-blue duration-300">Вентиляция</Link></li>
						<li><Link href="/air-conditioning" className="transition-colors hover:text-brand-blue duration-300">Кондиционер</Link></li>
						<li><Link href="/control-access" className="transition-colors hover:text-brand-blue duration-300">Контроль доступа</Link></li>
						<li><Link href="/multiroom" className="transition-colors hover:text-brand-blue duration-300">Мультирум</Link></li>
						<li><Link href="/сatalog" className="transition-colors hover:text-brand-blue duration-300">Каталог</Link></li>
						<li><Link href="/card" className="transition-colors hover:text-brand-blue duration-300">Оборудование</Link></li>
					</ol>
				</div>
			</div>
		</div>
	);
}