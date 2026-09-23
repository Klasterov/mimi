import { AppStoreIcon } from "@/icons/app/AppStoreIcon";
import { GooglePlayIcon } from "@/icons/app/GooglePlayIcon";
import { TgIcon } from "@/icons/socials/TgIcon";
import { VkIcon } from "@/icons/socials/VkIcon";
import { YoutubeIcon } from "@/icons/socials/YoutubeIcon";

import type { Contacts } from "@/types/contacts";

export const contacts: Contacts = {
	phone: "+7 (4012) 234-34-34",
	email: "MiMiSmart@mail.ru",
	workingHours: '09:00 - 18:00',
	rating: 4.9,
	apps: [
		{
			label: 'App Store',
			href: 'https://apps.apple.com/tr/app/mimismart/id6444528782',
			icon: AppStoreIcon
		},
		{
			label: 'Google Play',
			href: 'https://play.google.com/store/apps/details?id=com.mimismart.app',
			icon: GooglePlayIcon
		},
	],
	socials: [
		{
			name: 'Telegram',
			href: 'https://t.me/mimismart_russia',
			icon: TgIcon,
		},
		{
			name: 'YouTube',
			href: 'https://www.youtube.com/@MiMiSmart-ru',
			icon: YoutubeIcon,
		},
		// {
		// 	name: 'VK',
		// 	href: '/',
		// 	icon: VkIcon,
		// },
	]
}
