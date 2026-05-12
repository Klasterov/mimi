
import Header from "@/components/layout/Header";
import HeroAbout from "@/components/sections/About/HeroAbout";
import Achievements from "@/components/sections/About/Achievements";
import OurFuture from "@/components/sections/About/OurFuture";
import Team from "@/components/sections/About/Team";
import Certificates from "@/components/sections/About/Certificates";
import Contacts from "@/components/sections/common/Contacts";
import Footer from "@/components/layout/Footer";
import { routes } from "@/config/routes";


export const metadata = {
	title: routes.about.title
}

export default function AboutPage() {
	return (
		<>
			<Header />
			<main>
				<HeroAbout></HeroAbout>
				<Achievements></Achievements>
				<OurFuture></OurFuture>
				<Team></Team>
				<Certificates></Certificates>
				<Contacts></Contacts>
			</main>
			<Footer />
		</>
	);
} 