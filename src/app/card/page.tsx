
import Header from "@/components/layout/Header";
import Card from "@/components/sections/Card/Card";
import Footer from "@/components/layout/Footer";

import { routes } from "@/config/routes";


export const metadata = {
	title: routes.Card.title
}

export default function CardPage() {
	return (
		<>
			<Header />
			<main>
				<Card></Card>
			</main>
			<Footer />
		</>
	);
}