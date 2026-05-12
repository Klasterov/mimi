import Header from "@/components/layout/Header";
import Contacts from "@/components/sections/Contacts/Contacts";
import Showroom from "@/components/sections/common/Showroom";
import Footer from "@/components/layout/Footer";
import { routes } from "@/config/routes";

export const metadata = {
	title: routes.contacts.title
}

export default function ContactsPage() {
	return (
		<>
			<Header />
			<main>
				<Contacts/>
				<Showroom/>
			</main>
			<Footer />
		</>
	);
} 