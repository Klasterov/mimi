import Header from "@/components/layout/Header";
import Portfolio from "@/components/sections/Portfolio/Portfolio";
import Footer from "@/components/layout/Footer";
import { routes } from "@/config/routes";
import { getProjects } from "@/lib/projects";

export const metadata = {
	title: routes.portfolio.title
}

export default async function AboutPage() {
	const projects = await getProjects()

	return (
		<>
			<Header />
			<main>
				<Portfolio projects={projects}></Portfolio>
			</main>
			<Footer />
		</>
	);
} 
