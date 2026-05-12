import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function ElectricCurtainsQuiet() {
	return (
		<section className="pt-22.5 pb-22.5 lg:pb-37.5">
			<div className="max-w-235.5 px-4 mx-auto">
				<Title className="mb-6">Тихий ход</Title>
				<div className="font-helvetica leading-[1.3] -tracking-[0.01em] mb-10 lg:mb-25">
					Рекомендуем устанавливать в каждую квартиру. <br />
					Вы сможете снимать показания счетчиков просто со смартфона, не открывая ревизионные и монтажные шкафы.
				</div>
				<Image
					width={910}
					height={283}
					alt="decor"
					src="/images/electric-curtains-page/quiet/decor.jpg"
					className="shadow-[0_0_16px_0_rgba(0,0,0,0.08)] rounded-[45px] max-md:hidden"
					quality={95}
				/>
				<Image
					width={358}
					height={283}
					alt="decor"
					src="/images/electric-curtains-page/quiet/decor-mob.jpg"
					className="shadow-[0_0_16px_0_rgba(0,0,0,0.08)] rounded-[45px] mx-auto md:hidden"
					quality={95}
				/>
			</div>
		</section>
	);
}