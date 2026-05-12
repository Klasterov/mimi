import { Button } from "@/components/UI/Button";
import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function PowerSupplyHero() {
	return (
		<section className="pt-10 pb-20 md:pb-25 lg:pb-32.5 bg-white">
			<div className="max-w-235.5 px-4 mx-auto flex flex-col items-center text-center">
				<Image
					src="/images/power-supply-page/hero/decor.png"
					width={480}
					height={358}
					quality={95}
					alt=""
					className="mb-5"
				/>
				<Title className="mb-6 max-md:break-all max-md:hidden">Бесперебойное электроснабжение</Title>
				<Title className="mb-6 max-md:break-all md:hidden">Бесперебойное электро - снабжение.</Title>
				<div className="font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em] max-w-135.5 mb-6">
					Дом остаётся на связи при отключении электричества.
				</div>
				<Button className="justify-center py-1.75!">РАССЧИТАТЬ РЕЗЕРВ</Button>
			</div>
		</section>
	);
}