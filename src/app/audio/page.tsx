
import Header from "@/components/layout/Header";
import AudioHero from "@/components/sections/Audio/AudioHero";
import AudioAbout from "@/components/sections/Audio/AudioAbout";
import AudioComposition from "@/components/sections/Audio/AudioComposition";
import AudioVideo from "@/components/sections/Audio/AudioVideo";
import Showroom from "@/components/sections/common/Showroom";
import Footer from "@/components/layout/Footer";

import { routes } from "@/config/routes";


export const metadata = {
	title: routes.Audio.title
}

export default function AudioPage() {
	return (
		<>
			<Header />
			<main>
				<AudioHero />
				<AudioAbout />
				<AudioComposition />
				<AudioVideo />
				<Showroom />
			</main>
			<Footer />
		</>
	);
}