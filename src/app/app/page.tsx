import Header from "@/components/layout/Header"
import AppHero from "@/components/sections/App/AppHero"
import AppFunctions from "@/components/sections/App/AppFunctions"
import AppBenefits from "@/components/sections/App/AppBenefits"
import Showroom from "@/components/sections/common/Showroom"
import Footer from "@/components/layout/Footer"

import { routes } from "@/config/routes"

export const metadata = {
	title: routes.app.title
}

export default function AppPage() {
	return (
		<>
			<Header />

			<main>
				<AppHero />
				<AppFunctions />
				<AppBenefits />
				<Showroom />
			</main>

			<Footer />
		</>
	)
}