import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function AudioHero() {
	return (
		<section className="pt-10 pb-22.5 lg:pb-30 overflow-hidden">
			<div className="max-w-308 px-4 mx-auto flex flex-col items-center text-center">
				<div className="self-start w-300 aspect-1200/380 relative mb-15 max-md:-ml-50">
					<Image
						fill
						alt=""
						src="/images/audio-page/hero/room.png"
						quality={95}
					/>
				</div>
				<Title className="mb-6 bg-[linear-gradient(304deg,#dcd133_0%,#ef4c2b_40%,#b6509e_75%,#8da6cd_100%)] bg-clip-text text-transparent">Аудио</Title>
				<div className="font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em] max-w-135.5">
					Музыка — одна из важнейших составляющих настроения, и порой так хочется, чтобы ей сопровождалось каждое действие.
				</div>
			</div>
		</section>
	);
}