import Header from "@/components/layout/Header";
import SecurityHero from "@/components/sections/Security/SecurityHero";
import WaterProtection from "@/components/sections/Security/WaterProtection";
import VideoControl from "@/components/sections/Security/VideoControl";
import AccessControl from "@/components/sections/Security/AccessControl";
import FireSafety from "@/components/sections/Security/FireSafety";
import Intercom from "@/components/sections/Security/Intercom";
import Signaling from "@/components/sections/Security/Signaling";
import SmartSockets from "@/components/sections/Security/SmartSockets";
import Showroom from "@/components/sections/common/Showroom";
import Footer from "@/components/layout/Footer";
import { routes } from "@/config/routes";

export const metadata = {
	title: routes.security.title
}

export default function SecurityPage() {
	return (
		<>
			<Header />
			<main>
				<SecurityHero />
				<WaterProtection></WaterProtection>
				<VideoControl></VideoControl>
				<AccessControl></AccessControl>
				<FireSafety></FireSafety>
				<Intercom></Intercom>
				<Signaling></Signaling>
				<SmartSockets></SmartSockets>
				<Showroom />
			</main>
			<Footer />
		</>
	);
} 