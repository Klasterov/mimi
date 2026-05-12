export type ProjectStep = {
	title: string
	content: string
}

export type ProjectSection = {
	id: string
	title: string
	tag: string
	image: string
	text: string[]
}

export type ProjectSummary = {
	id: number | string
	slug: string
	title: string
	description: string
	image: string
	imageMain: string
	tags: string[]
	objectType: string
	area: string
	city?: string
}

export type ProjectDetails = ProjectSummary & {
	heroImage: string
	steps: ProjectStep[]
	sections: ProjectSection[]
	relatedProjectSlugs: string[]
}
