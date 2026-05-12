import Header from "@/components/layout/Header";
import DesigningHero from "@/components/sections/Designing/DesigningHero";
import DesigningStages from "@/components/sections/Designing/DesigningStages";
import Showroom from "@/components/sections/common/Showroom";
import Footer from "@/components/layout/Footer";

import { routes } from "@/config/routes";


export const metadata = {
	title: routes.designing.title
}

export default function DesigningPage() {
	return (
		<>
			<Header />
			<main>
				<DesigningHero></DesigningHero>
				<DesigningStages></DesigningStages>
				<Showroom></Showroom>
			</main>
			<Footer />
		</>
	);
}