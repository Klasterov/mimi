import type { FooterColumnData } from "@/types/footer"

export const footerColumns: FooterColumnData[] = [
	{
		title: 'Основное',
		links: [
			{ label: 'Главная', href: '/' },
			{ label: 'Услуги', href: '/' },
			{ label: 'Функционал', href: '/' },
			{ label: 'Оборудование', href: '/equipment' },
			{ label: 'Фурнитура', href: '/' },
			{ label: 'Готовые решения', href: '/solutions' },
			{ label: 'Проекты', href: '/portfolio' },
			{ label: 'Сотрудничество', href: '/partners' },
			{ label: 'Шоурум', href: '/showroom' },
			{ label: 'Цены', href: '/about' },
			{ label: 'О компании', href: '/about' },
			{ label: 'Отзывы', href: '/about' },
			{ label: 'Сертификаты', href: '/about' },
			{ label: 'Контакты', href: '/contacts' },
			{ label: 'Статьи', href: '/news' },
		],
		showOnMobile: true,
	},
	{
		title: 'Электрокарнизы',
		links: [
			{ label: 'Управление шторами', href: '/electric-curtains' },
			{ label: 'Рулонные шторы', href: '/curtains' },
		],
		showOnMobile: false,
	},
	{
		title: 'Освещение',
		links: [
			{ label: 'Диммирование', href: '/dimming' },
			{ label: 'Биодинамическое', href: '/biodynamics' },
		],
		showOnMobile: false,
	},
	{
		title: 'Климат контроль',
		links: [
			{ label: 'Кондиционирование', href: '/air-conditioning' },
			{ label: 'Отопление', href: '/heating' },
			{ label: 'Теплый пол', href: '/underfloor-heating' },
			{ label: 'Вентиляция', href: '/ventilation' },
			{ label: 'Увлажнение', href: '/himidity' },
		],
		showOnMobile: false,
	},
	{
		title: 'Мультимедиа',
		links: [
			{ label: 'Домашний кинотеатр', href: '/cinema-home' },
			{ label: 'Мультирум', href: '/multiroom' },
			{ label: 'Проекторы', href: '/projector' },
			{ label: 'Телевизоры', href: '/tv' },
			{ label: 'Аудио', href: '/audio' },
			{ label: 'Управление мультимедией', href: '/cinema' },
		],
		showOnMobile: false,
	},
	{
		title: 'Безопасность и защита',
		links: [
			{ label: 'Видеонаблюдение', href: '/video-control' },
			{ label: 'Охранная система и сигнализация', href: '/alarm-system' },
			{ label: 'Домофон', href: '/intercom-system' },
			{ label: 'Контроль доступа (Ворота)', href: '/gates' },
			{ label: 'Контроль доступа (Электрозамки)', href: '/electric-lock' },
			{ label: 'Пожарная система', href: '/fire' },
			{ label: 'Защита от протечек', href: '/protection-against-leaks' },
		],
		showOnMobile: false,
	},
	{
		title: 'Управление розетками',
		links: [
			{ label: 'Основное', href: '/sockets' },
		],
		showOnMobile: false,
	},
	{
		title: 'Контроллеры',
		links: [
			{ label: 'Основное', href: '/controller' },
		],
		showOnMobile: false,
	},
	{
		title: 'Бесперебойное электроснабжение',
		links: [
			{ label: 'Основное', href: '/power-supply' },
		],
		showOnMobile: false,
	},
	{
		title: 'Приложение',
		links: [
			{ label: 'Основное', href: '/app' },
		],
		showOnMobile: false,
	},
	{
		title: 'Датчики',
		links: [
			{ label: 'Датчики движения', href: '/' },
			{ label: 'Инфракрасные датчики', href: '/' },
			{ label: 'Датчики открытия', href: '/' },
			{ label: 'Датчики дыма', href: '/' },
			{ label: 'Датчики протечки', href: '/' },
			{ label: 'Датчики температуры', href: '/' },
			{ label: 'Датчики влажности', href: '/' },
		],
		showOnMobile: false,
	},
	{
		title: 'Готовые решения',
		links: [
			{ label: 'Квартира', href: '/solutions-flat' },
			{ label: 'Дом', href: '/solutions-home' },
			{ label: 'Офис', href: '/solutions-office' },
			{ label: 'Жилые комплексы', href: '/solutions-appartments' },
		],
		showOnMobile: false,
	},
	{
		title: 'Информация',
		links: [
			{ label: 'Политика конфиденциальности', href: '/privacy' },
		],
		showOnMobile: true,
	},
]