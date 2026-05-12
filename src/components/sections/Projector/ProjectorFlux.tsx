import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function ProjectorFlux() {
	return (
		<section className="min-h-198 lg:min-h-205 py-22.5 relative flex items-end md:items-center">
			<Image
				fill
				src="/images/projector-page/flux/bg.jpg"
				className="object-cover max-md:object-[40%_center]"
				quality={95}
				alt="bg"
			/>
			<div className="max-w-235.5 w-full text-white px-4 relative mx-auto">
				<div className="max-w-137 space-y-6">
					<Title className="max-w-80">Световой поток</Title>
					<div className="font-helvetica text-[17px] leading-[1.4] -tracking-[0.01em]">
						Управление воротами в умном доме производится через домашнюю сеть WiFi, удаленно через интернет, и как резервный способ - через GSM-канал по звонку на номер вашего Умного дома.
					</div>
					<div className="flex gap-4">
						<Image
							width={147}
							height={44}
							src="/images/projector-page/flux/icon-1.png"
							alt="Bluetooth"
							quality={95}
						/>
						<Image
							width={44}
							height={44}
							src="/images/projector-page/flux/icon-2.png"
							alt="sound"
							quality={95}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}