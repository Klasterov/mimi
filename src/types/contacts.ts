import { FC, SVGProps } from 'react'

type AppLink = {
	label: string
	href: string
	icon: FC<SVGProps<SVGSVGElement>>
}

type SocialLink = {
	name: string
	href: string
	icon: FC<SVGProps<SVGSVGElement>>
}

export type Contacts = {
	phone: string
	email: string
	workingHours: string
	rating: number
	apps?: AppLink[]
	socials?: SocialLink[]
}
