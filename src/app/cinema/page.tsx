import Header from "@/components/layout/DarkHeader";
import CinemaHero from "@/components/sections/Cinema/CinemaHero";
import CinemaFeatures from "@/components/sections/Cinema/CinemaFeatures";
import CinemaAdvantages from "@/components/sections/Cinema/CinemaAdvantages";
import Features from "@/components/sections/Features";
import CinemaText from "@/components/sections/Cinema/CinemaText";
import CinemaTV from "@/components/sections/Cinema/CinemaTV";
import Footer from "@/components/layout/DarkFooter";
import { routes } from "@/config/routes";

export const metadata = {
	title: routes.cinema.title
}

export default function CinemaPage() {
	return (
		<>
			<Header />
			<main>
				<CinemaHero></CinemaHero>
				<CinemaFeatures></CinemaFeatures>
				<CinemaAdvantages></CinemaAdvantages>
				<Features title="Удобное управление" />
				<CinemaText></CinemaText>
				<CinemaTV></CinemaTV>
			</main>
			<Footer />
		</>
	);
} 