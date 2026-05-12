export const menuItems = [
	{
		label: 'Главная',
		href: '/',
		desktop: true
	},
	{
		label: 'Услуги',
		href: '/',
		desktop: true
	},
	{
		label: 'Функционал',
		action: 'openFunctional',
		desktop: true
	},
	{
		label: 'Оборудование',
		href: '/equipment',
		desktop: true
	},
	{
		label: 'Фурнитура',
		href: '/',
		desktop: true
	},
	{
		label: 'Готовые решения',
		href: '/solutions-flat',
		desktop: true
	},
	{
		label: 'Проекты',
		href: '/portfolio',
		desktop: true
	},
	{
		label: 'Цены',
		href: '/',
		desktop: false
	},
	{
		label: 'О компании',
		href: '/about',
		desktop: false
	},
	{
		label: 'Партнерам',
		href: '/',
		desktop: false
	},
	{
		label: 'Статьи',
		href: '/news',
		desktop: false
	},
	{
		label: 'Контакты',
		href: '/contacts',
		desktop: false
	},
]

export const functionalMenu = {
	title: "Функционал",
	categories: [
		{
			id: "security",
			label: "Безопасность",
			items: [
				{ label: "Видеонаблюдение", href: "/video-control" },
				{ label: "Сигнализация", href: "/alarm-system" },
				{ label: "Пожарная сигнализация", href: "/fire" },
				{ label: "Контроль доступа", href: "/control-access" },
				{ label: "Протечка воды", href: "/protection-against-leaks" },
				{ label: "Ворота", href: "/gates" },
				{ label: "Домофон", href: "/intercom-system" }
			]
		},
		{
			id: "climate",
			label: "Микроклимат",
			items: [
				{ label: "Отопление", href: "/heating" },
				{ label: "Кондиционирование", href: "/air-conditioning" }
			]
		},
		{
			id: "multimedia",
			label: "Мультимедиа",
			items: [
				{ label: "Домашний кинотеатр", href: "/cinema-home" },
				{ label: "Мультирум", href: "/multiroom" },
				{ label: "Проекторы", href: "/projector" },
				{ label: "Телевизоры", href: "/tv" },
				{ label: "Аудио", href: "/audio" },
				{ label: "Управление мультимедией", href: "/cinema" }
			]
		},
		{
			id: "electrics",
			label: "Электрика",
			items: [
				{ label: "Управление шторами", href: "/electric-curtains" },
				{ label: "Рулонные шторы", href: "/curtains" }
			]
		},
		{
			id: "lighting",
			label: "Освещение",
			items: [
				{ label: "Диммирование", href: "/dimming" },
				{ label: "Биодинамическое", href: "/biodynamics" }
			]
		}
	]
}