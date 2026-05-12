type FooterLink = {
	label: string
	href: string
}

export type FooterColumnData = {
	title: string
	links: FooterLink[]
	showOnMobile?: boolean
}