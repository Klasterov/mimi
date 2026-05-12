import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function MultiroomHero() {
	return (
		<section className="pt-15 lg:pb-22.5 pb-32.5 relative min-h-182.5">
			<Image
				src="/images/multiroom-page/hero-bg.jpg"
				fill
				quality={95}
				alt=""
				className="object-cover"
			/>
			<div className="relative max-w-235.5 px-4 mx-auto flex flex-col items-center text-center">
				<Image
					src="/images/multiroom-page/hero-decor.png"
					width={460}
					height={460}
					quality={95}
					alt=""
				/>
				<Title className="mb-4 text-white">Мультирум</Title>
				<div className="font-helvetica text-[#acacac] text-[17px] leading-[1.3] -tracking-[0.01em] max-w-142.5">
					Продуманная до мелочей система, которая позволяет вам погрузиться в просмотр кино, почувствовать атмосферу, которую задумал режиссер фильма и направить все чувства в тот, кинематографический мир.
				</div>
			</div>
		</section>
	);
}