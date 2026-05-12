
import Header from "@/components/layout/Header";
import MaintenanceHero from "@/components/sections/Maintenance/MaintenanceHero";
import MaintenanceText from "@/components/sections/Maintenance/MaintenanceText";
import Footer from "@/components/layout/Footer";

import { routes } from "@/config/routes";


export const metadata = {
	title: routes.Maintenance.title
}

export default function MaintenancePage() {
	return (
		<>
			<Header />
			<main>
				<MaintenanceHero></MaintenanceHero>
				<MaintenanceText></MaintenanceText>
			</main>
			<Footer />
		</>
	);
}