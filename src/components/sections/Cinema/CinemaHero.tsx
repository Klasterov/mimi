import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function CinemaHero() {
	return (
		<section className="relative min-h-205 pt-17 pb-10 bg-black overflow-hidden">
			{/* <div className="absolute -top-[15%] left-0 w-full aspect-1440/1110">

				<Image
					src="/images/cinema-page/hero/gradient.png"
					fill
					alt="bg"
					quality={95}
				/>
			</div> */}
			<div className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 w-360 aspect-1440/692">

				<Image
					src="/images/cinema-page/hero/bg-desktop1.png"
					fill
					alt="bg"
					quality={95}
				/>
				<div className="absolute w-[47.8%] left-[27.1%] top-[25.6%] h-[42.7%]">

					<Image
						src="/images/cinema-page/hero/placeholder.jpg"
						fill
						alt="bg"
						quality={95}
						className="object-cover"
					/>
				</div>

			</div>
			<div className="max-w-308 mx-auto px-4 relative">
				<Title className="mb-4 md:mb-2 text-white z-10">Мультимедиа</Title>
				<div className="md:mb-0 mb-10 font-helvetica text-[17px] max-w-143 relative z-10 text-[#acacac] leading-tight -tracking-[0.01em]">Продуманная до мелочей система, которая позволяет вам погрузиться в просмотр кино, почувствовать атмосферу, которую задумал режиссер фильма и направить все чувства в тот, кинематографический мир.</div>
				<div className="lg:hidden aspect-390/426 relative -mx-4">

					<Image
						src="/images/cinema-page/hero/tv-mob.jpg"
						fill
						alt="bg"
						className="object-cover"
					/>
					<div className="absolute w-[87.3%] left-[5.9%] top-[23.2%] h-[40.2%]">

						<Image
							src="/images/cinema-page/hero/placeholder.jpg"
							fill
							alt="bg"
							quality={95}
							className="object-cover"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}