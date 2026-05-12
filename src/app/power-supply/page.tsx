
import Header from "@/components/layout/Header";
import PowerSupplyHero from "@/components/sections/PowerSupply/PowerSupplyHero";
import PowerSupplyZones from "@/components/sections/PowerSupply/PowerSupplyZones";
import PowerSupplyArchit from "@/components/sections/PowerSupply/PowerSupplyArchit";
import Showroom from "@/components/sections/common/Showroom";
import Footer from "@/components/layout/Footer";

import { routes } from "@/config/routes";


export const metadata = {
	title: routes.PowerSupply.title
}

export default function PowerSupplyPage() {
	return (
		<>
			<Header />
			<main>
				<PowerSupplyHero />
				<PowerSupplyZones />
				<PowerSupplyArchit />
				<Showroom />
			</main>
			<Footer />
		</>
	);
}