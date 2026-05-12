import Header from "@/components/layout/Header";
import CurtainsHero from "@/components/sections/Curtains/CurtainsHero";
import CurtainsText from "@/components/sections/Curtains/CurtainsText";
import CurtainsTypes from "@/components/sections/Curtains/CurtainsTypes";
import CurtainsTabs from "@/components/sections/Curtains/CurtainsTabs";
import Scripts from "@/components/sections/common/Scripts";
import Features from "@/components/sections/Features";
import Footer from "@/components/layout/Footer";

export const metadata = {
	title: 'Электрошторы'
}

const features = [
	{
		id: 0,
		title: 'Я пришел',
		content: [
			"За час начнут прогреваться теплые полы",
			"Отопление перейдет в дневной режим",
			"Плавно откроются шторы, естественно пробуждая солнечными лучами",
			"Вместо будильника, тихая музыка аккуратно встретит с новым днем",
		],
	},
	{
		id: 1,
		title: 'Я ушел',
		content: [
			"Выключается весь свет",
			"Закрываются шторы",
			"Выключается музыка",
			"Климат-контроль переходит в энергосберегающий режим",
		],
	},
	{
		id: 2,
		title: 'Вечеринка',
		content: [
			"За час начнут прогреваться теплые полы",
			"Отопление перейдет в дневной режим",
			"Плавно откроются шторы, естественно пробуждая солнечными лучами",
			"Вместо будильника, тихая музыка аккуратно встретит с новым днем",
		],
	},
]
export default function CurtainsPage() {
	return (
		<>
			<Header />
			<main>
				<CurtainsHero></CurtainsHero>
				<CurtainsText></CurtainsText>
				<CurtainsTypes></CurtainsTypes>
				<CurtainsTabs></CurtainsTabs>
				<Scripts
					title="Сценарии"
					bgImage="/images/curtains-page/scripts/bg.jpg"
					bgImageMob="/images/curtains-page/scripts/bg-mob.jpg"
					features={features}
				/>
				<Features title="Как управлять шторами?" />
			</main>
			<Footer />
		</>
	);
} 