import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function UnderfloorHeatingNeed() {
	return (
		<section className="pt-22.5 lg:pt-30 pb-22.5">
			<div className="max-w-235.5 px-4 mx-auto flex flex-col items-center text-center">
				<Title className="mb-10">Тепло там, где нужно</Title>
				<Image
					src="/images/underfloor-heating-page/need.png"
					width={500}
					height={400}
					quality={95}
					alt=""
					className="mb-15"
				/>
				<div className="font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em] max-w-124">
					Ванная и детская теплее, коридоры прохладнее — логика задаётся один раз и работает сама.
				</div>
			</div>
		</section>
	);
}