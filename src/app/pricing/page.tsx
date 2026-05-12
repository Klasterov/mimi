import Header from "@/components/layout/DarkHeader"
import PricingHero from "@/components/Pricing/PricingHero"
import PricingTypes from "@/components/Pricing/PricingTypes"

import Showroom from "@/components/sections/common/Showroom"
import Footer from "@/components/layout/Footer"

import { routes } from "@/config/routes"

export const metadata = {
	title: routes.pricing.title
}

export default function PricingPage() {
	return (
		<>
			<Header />

			<main>
				<PricingHero />
				{/*  */}
				<PricingTypes />
				<Showroom />
			</main>

			<Footer />
		</>
	)
}