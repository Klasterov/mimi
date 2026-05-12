import { Title } from "@/components/UI/Title";
import Image from "next/image";

export default function VideoControlHero() {
	return (
		<section className="pt-6 md:pt-10 lg:pt-15 pb-15 lg:pb-22.5 relative">
			<div className="max-w-308 mx-auto px-4">
				<Title className="max-sm:hidden mb-15">Видеонаблюдение</Title>
				<Title className="sm:hidden mb-10">Видео- наблюдение</Title>
				<div className="relative rounded-[20px] lg:rounded-3xl overflow-hidden aspect-358/500 md:aspect-1200/751">
					<Image
						fill
						quality={95}
						src="/images/video-control-page/hero.jpg"
						alt=""
						className="object-cover"
					/>
				</div>
			</div>
		</section>
	);
};
