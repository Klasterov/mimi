import Header from "@/components/layout/Header";
import FAQ from "@/components/sections/FAQ/FAQ";
import Footer from "@/components/layout/Footer";
import { routes } from "@/config/routes";

export const metadata = {
	title: routes.faq.title
}

export default function FAQPage() {
	return (
		<>
			<Header />
			<main>
				<FAQ></FAQ>
			</main>
			<Footer />
		</>
	);
} 