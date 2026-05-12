import Header from "@/components/layout/Header";
import SolutionsHero from "@/components/sections/Solutions/SolutionsHero";
import Improvement from "@/components/sections/Solutions/Improvement";
import Contacts from "@/components/sections/common/Contacts";
import Footer from "@/components/layout/Footer";
import { routes } from "@/config/routes";

export const metadata = {
	title: routes.solutions.title
}

export default function SolutionsPage() {
	return (
		<>
			<Header />
			<main>
				<SolutionsHero></SolutionsHero>
				<Improvement></Improvement>
				<Contacts></Contacts>
			</main>
			<Footer />
		</>
	);
} 