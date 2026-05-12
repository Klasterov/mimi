import Header from "@/components/layout/Header"
import ProjectHero from "@/components/sections/Project/ProjectHero"
import ProjectSteps from "@/components/sections/Project/ProjectSteps"
import ProjectTags from "@/components/sections/Project/ProjectTags"
import Cases from "@/components/sections/Cases"
import Showroom from "@/components/sections/common/Showroom"
import Footer from "@/components/layout/Footer"
import { getProjectBySlug, getProjects } from "@/lib/projects"
import { notFound } from "next/navigation"

const UI_TEXT = {
	relatedWorks: "\u0414\u0440\u0443\u0433\u0438\u0435 \u0440\u0430\u0431\u043E\u0442\u044B",
}

type Props = {
	params: Promise<{ slug: string }>
}

export default async function ProjectDetailsPage({ params }: Props) {
	const { slug } = await params
	const [project, projects] = await Promise.all([
		getProjectBySlug(slug),
		getProjects(),
	])

	if (!project) {
		notFound()
	}

	const relatedProjects = project.relatedProjectSlugs
		.map(relatedSlug => projects.find(item => item.slug === relatedSlug))
		.filter((item): item is NonNullable<typeof item> => item !== undefined)

	return (
		<>
			<Header />

			<main>
				<ProjectHero
					title={project.title}
					objectType={project.objectType}
					area={project.area}
					heroImage={project.heroImage}
				/>
				<ProjectSteps steps={project.steps} />
				<ProjectTags sections={project.sections} />
				<Cases
					title={UI_TEXT.relatedWorks}
					limit={3}
					items={
						relatedProjects.length > 0
							? relatedProjects
							: projects.filter(item => item.slug !== project.slug)
					}
				/>
				<Showroom />
			</main>

			<Footer />
		</>
	)
}

export async function generateStaticParams() {
	const projects = await getProjects()

	return projects.map(project => ({
		slug: project.slug,
	}))
}
