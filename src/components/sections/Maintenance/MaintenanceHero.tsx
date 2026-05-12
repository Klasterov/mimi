import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function MaintenanceHero() {
	return (
		<section className="pt-10 pb-20 md:pb-25 lg:pb-32.5 bg-white">
			<div className="max-w-235.5 px-4 mx-auto flex flex-col items-center text-center">
				<Image
					src="/images/maintenance-page/hero/decor.png"
					width={305}
					height={360}
					quality={95}
					alt=""
					className="mb-5"
				/>
				<Title className="mb-6">Пожизненная гарантия на&nbsp;все услуги</Title>
				<div className="font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em] max-w-135.5">
					Музыка — одна из важнейших составляющих настроения, и порой так хочется, чтобы ей сопровождалось каждое действие.
				</div>
			</div>
		</section>
	);
}