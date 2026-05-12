
import Header from "@/components/layout/Header";
import CustomizationHero from "@/components/sections/Customization/CustomizationHero";
import CustomizationCom from "@/components/sections/Customization/CustomizationCom";
import CustomizationConnect from "@/components/sections/Customization/CustomizationConnect";
import Showroom from "@/components/sections/common/Showroom";
import Footer from "@/components/layout/Footer";

import { routes } from "@/config/routes";


export const metadata = {
	title: routes.Customization.title
}

export default function CustomizationPage() {
	return (
		<>
			<Header />
			<main>
				<CustomizationHero />
				<CustomizationCom />
				<CustomizationConnect />
				<Showroom />
			</main>
			<Footer />
		</>
	);
}