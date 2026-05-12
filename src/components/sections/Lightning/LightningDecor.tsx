import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function LightningDecor() {

	return (
		<section className="py-22.5">
			<div className="max-w-235.5 mx-auto px-4">
				<Title className="bg-[linear-gradient(180deg,#422e0c_0%,#ffc96e_100%)] bg-clip-text text-transparent lg:mb-32 mb-28.75">Одной кнопкой включайте весь декоративный свет</Title>
				<div className="flex items-center gap-29 lg:flex-row flex-col">
					<div className="max-w-67.5 mx-auto md:max-w-none flex-none lg:w-80">
						<Image
							src="/images/lightning-page/decor/main.jpg"
							width={320}
							className="shadow-[-24px_-24px_16px_0_rgba(0,0,0,0.09),-8px_-8px_16px_0_rgba(0,0,0,0.09),-4px_-4px_16px_0_rgba(0,0,0,0.09),-2px_-2px_16px_0_rgba(0,0,0,0.09) ]"
							height={320}
							alt=""
						/>
					</div>
					<div className="text-[17px] font-helvetica leading-tight -tracking-[0.01em] lg:space-y-3 space-y-6">
						<p>Одной кнопкой вы будете включать весь декоративный свет. А не только основное освещение.</p>
						<p>Поэтому у  вас всегда будет уютная атмосфера, как и задумывал ваш дизайнер.</p>
					</div>
				</div>
			</div>
		</section>
	);
}