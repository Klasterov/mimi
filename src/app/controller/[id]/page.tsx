import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import ControllerCard from "@/components/sections/ControllerCard/ControllerCard"
import { routes } from "@/config/routes"
import { getControllerById } from "@/lib/controllers"
import { notFound } from "next/navigation"

export const metadata = {
	title: routes.controller.title
}

type ControllerDetailPageProps = {
	params: Promise<{ id: string }>
}

export default async function ControllerDetailPage({ params }: ControllerDetailPageProps) {
	const { id } = await params
	const controller = await getControllerById(id)

	if (!controller) {
		notFound()
	}

	return (
		<>
			<Header />
			<main>
				<ControllerCard {...controller} />
			</main>
			<Footer />
		</>
	)
}
