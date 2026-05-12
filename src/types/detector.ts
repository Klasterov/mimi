export type InfoSection = {
	title: string
	text?: string[]
	list?: string[]
}

export type DetectorHero = {
	title: string
	text: string
	image: string
	imageWidth: number
	imageHeight: number
	sectionClasses?: string
	imageWrapperClasses?: string
	contentWrapperClasses?: string
}

export type DetectorInfo = {
	sections: InfoSection[]
	theme?: 'dark' | 'light'
}

export type DetectorExampleRuler = {
	label: string
	x1: number
	y1: number
	x2: number
	y2: number
	textOffset?: number
	fontSize?: number
	strokeWidth?: number
	color?: string
}

export type DetectorExampleData = {
	title: string
	text: string
	image: string
	imageWidth?: number
	imageHeight?: number
	theme?: 'light' | 'dark'
	ruler?: DetectorExampleRuler
}
export type Detector = {
	slug: string
	title: string
	subtitle: string
	icon: string
	image: string
	bg: string
	linkHover: string
	isWide?: boolean
	detectorExample?: DetectorExampleData
	info?: DetectorInfo
	hero?: DetectorHero
}