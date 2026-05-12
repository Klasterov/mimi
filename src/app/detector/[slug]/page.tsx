import Header from "@/components/layout/Header"
import DetectorHero from "@/components/sections/Detector/DetectorHero"
import DetectorExample from "@/components/sections/Detector/DetectorExample"
import DetectorInfo from "@/components/sections/Detector/DetectorInfo"
import DetectorSlider from "@/components/sections/Detector/DetectorSlider"
import Showroom from "@/components/sections/common/Showroom"
import Footer from "@/components/layout/Footer"

import { getDetectors } from "@/lib/detectors"

import { notFound } from "next/navigation"

type Props = {
	params: Promise<{ slug: string }>;
};

export default async function DetectorItemPage({ params }: Props) {
	const { slug } = await params;
	const detectors = await getDetectors();

	const detector = detectors.find(d => d.slug === slug);
	if (!detector) {
		notFound()
	}

	return (
		<>
			<Header />
			<main>
				{detector.hero && <DetectorHero hero={detector.hero} />}
				{detector.detectorExample && <DetectorExample example={detector.detectorExample} />}
				{detector.info && <DetectorInfo info={detector.info} />}
				<DetectorSlider detectors={detectors} />
				<Showroom />
			</main>
			<Footer />
		</>
	);
}

export async function generateStaticParams() {
	const detectors = await getDetectors();
	return detectors.map((d) => ({
		slug: d.slug,
	}));
}