import { FC, SVGProps } from 'react'

export type Article = {
	id: number | string
	tag: string
	title: string
	description: string
	image: string
	isWide?: boolean
	date: string // ISO формат
}

export type Tag = {
	icon: FC<SVGProps<SVGSVGElement>>
	label: string
}
