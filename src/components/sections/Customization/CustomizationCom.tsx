import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function CustomizationCom() {
	return (
		<section className="py-22.5 lg:py-27.5 overflow-hidden">
			<div className="max-w-308 px-4 mx-auto">
				<div className="relative aspect-1198/746 w-300">

					<Image
						fill
						alt=""
						src="/images/customization-page/com/room.png"
						quality={95}
					/>
					<div className="relative max-w-[calc(100vw-32px)]">

						<Title className="mb-6 max-w-151">Прокладка коммуникаций</Title>
						<div className="font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em] max-w-135.5">
							Музыка — одна из важнейших составляющих настроения, и порой так хочется, чтобы ей сопровождалось каждое действие.
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}