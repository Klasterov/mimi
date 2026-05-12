import Header from "@/components/layout/Header";
import LightningHero from "@/components/sections/Lightning/LightningHero";
import LightningTypes from "@/components/sections/Lightning/LightningTypes";
import LightningWay from "@/components/sections/Lightning/LightningWay";
import LightningDecor from "@/components/sections/Lightning/LightningDecor";
import LightningSettings from "@/components/sections/Lightning/LightningSettings";
import LightningAdvantages from "@/components/sections/Lightning/LightningAdvantages";
import Features from "@/components/sections/Features";
import LightningBio from "@/components/sections/Lightning/LightningBio";
import BodyImpact from "@/components/sections/Lightning/BodyImpact";
import Footer from "@/components/layout/Footer";
import { routes } from "@/config/routes";

export const metadata = {
	title: routes.lightning.title
}

export default function LightningPage() {
	return (
		<>
			<Header />
			<main>
				<LightningHero></LightningHero>
				<LightningTypes></LightningTypes>
				<LightningWay></LightningWay>
				<LightningDecor></LightningDecor>
				<LightningSettings></LightningSettings>
				<LightningAdvantages></LightningAdvantages>
				<Features title="Удобное управление" />
				<LightningBio></LightningBio>
				<BodyImpact></BodyImpact>
			</main>
			<Footer />
		</>
	);
} 