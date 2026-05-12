import { FC, SVGProps } from 'react'

export type CaseItem = {
	title: string
	description: string
	image: string
	imageMain: string
	tags: string[]
	link: string
}

export type Category = {
	icon: FC<SVGProps<SVGSVGElement>>
	label: string
}
