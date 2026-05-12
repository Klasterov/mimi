
import Header from "@/components/layout/Header";
import DetectorItems from "@/components/sections/Detector/DetectorItems";
import DetectorCols from "@/components/sections/Detector/DetectorCols";
import Showroom from "@/components/sections/common/Showroom";
import Footer from "@/components/layout/Footer";

import { routes } from "@/config/routes";
import { getDetectors } from "@/lib/detectors";


export const metadata = {
	title: routes.detector.title
}

export default async function DetectorPage() {
	const detectors = await getDetectors();

	return (
		<>
			<Header />
			<main>
				<DetectorItems detectors={detectors}></DetectorItems>
				<DetectorCols detectors={detectors}></DetectorCols>
				<Showroom></Showroom>
			</main>
			<Footer />
		</>
	);
}