import Header from "@/components/layout/Header";
import FeaturesCatalog from "@/components/sections/Features/FeaturesCatalog";
import Features from "@/components/sections/Features";
import Footer from "@/components/layout/Footer";
import { routes } from "@/config/routes";

export const metadata = {
	title: routes.features.title
}

export default function FeaturesPage() {
	return (
		<>
			<Header />
			<main>
				<FeaturesCatalog></FeaturesCatalog>
				<Features title="Удобное управление?" />
			</main>
			<Footer />
		</>
	);
} 