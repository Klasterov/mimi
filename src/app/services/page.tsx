import Header from "@/components/layout/Header";
import ServicesHero from "@/components/sections/Services/ServicesHero";
import ServicesDesigning from "@/components/sections/Services/ServicesDesigning";
import ServicesService from "@/components/sections/Services/ServicesService";
import Showroom from "@/components/sections/common/Showroom";
import Footer from "@/components/layout/Footer";

import { routes } from "@/config/routes";
import ServicesMontage from "@/components/sections/Services/ServicesMontage";


export const metadata = {
	title: routes.services.title
}

export default function ServicesPage() {
	return (
		<>
			<Header />
			<main>
				<ServicesHero />
				<ServicesDesigning />
				<ServicesMontage />
				<ServicesService />
				<Showroom />
			</main>
			<Footer />
		</>
	);
}