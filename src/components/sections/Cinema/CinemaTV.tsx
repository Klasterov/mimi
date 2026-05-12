import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function CinemaTV() {
	return (
		<section className="pt-30 md:pt-43 relative min-h-211 lg:min-h-250 py-10 bg-black text-center overflow-hidden">
			<div className="absolute top-10 md:top-14.5 left-1/2 -translate-x-1/2 w-[130%] md:w-[83.33%] aspect-1200/54">
				<div className="absolute top-[63%] left-0 w-full aspect-1200/302">
					<Image
						src="/images/cinema-page/tv/top-decor-gradient.png"
						fill
						quality={95}
						className="object-cover"
						alt="decor"
					/>
				</div>
				<Image
					src="/images/cinema-page/tv/top-decor.png"
					fill
					quality={95}
					alt="decor"
				/>
			</div>
			<div className="absolute bottom-0  min-w-3xl left-1/2 -translate-x-1/2 w-full aspect-1440/179">
				<Image
					src="/images/cinema-page/tv/sofa.png"
					fill
					alt="decor"
				/>
			</div>
			<div className="absolute bottom-[26.2%] left-1/2 -translate-x-1/2 w-[94%] md:w-173.5 aspect-696/359">
				<Image
					src="/images/cinema-page/tv/tv.png"
					fill
					alt="decor"
					className="z-10"
				/>

				<div className="absolute aspect-175/173 w-[25.14%] top-[28.13%] -left-[12.64%]">

					<Image
						src="/images/cinema-page/tv/sound.png"
						fill
						alt="decor"
						quality={95}
					/>
				</div>
				<div className="absolute aspect-175/173 w-[25.14%] top-[28.13%] -right-[12.64%]">

					<Image
						src="/images/cinema-page/tv/sound.png"
						fill
						alt="decor"
						quality={95}
					/>
				</div>
				<div className="absolute left-[1.3%] top-[1.9%] w-[97.6%] h-[95.4%] z-10">
					<video
						className="w-full h-full object-cover top-0 left-0"
						autoPlay
						loop
						muted
					>
						<source src="/videos/showroom.mp4" type="video/mp4" />
					</video>
				</div>
			</div>


			<div className="max-w-308 mx-auto px-4 relative flex flex-col items-center">
				<Title className="mb-4 text-white relative z-10">Эстетика</Title>
				<div className="max-w-143 relative z-10 text-[17px] leading-tight -tracking-[0.01em] text-brand-gray font-helvetica">
					Несмотря на большое количество колонок, вы не увидите в интерьере ничего лишнего. Все оборудование и коммуникации скрыты от глаз или хорошо сочетается с интерьером.
				</div>
			</div>
		</section>
	);
}