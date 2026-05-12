import { Title } from "@/components/UI/Title"
import Image from "next/image"

const gallery = [
	"/images/showroom-page/gallery/1.jpg",
	"/images/showroom-page/gallery/2.jpg",
	"/images/showroom-page/gallery/3.jpg",
	"/images/showroom-page/gallery/4.jpg",
	"/images/showroom-page/gallery/5.jpg",
	"/images/showroom-page/gallery/6.jpg",
	"/images/showroom-page/gallery/7.jpg",
	"/images/showroom-page/gallery/8.jpg",
]

const topRow = gallery.slice(0, Math.ceil(gallery.length / 2))
const bottomRow = gallery.slice(Math.ceil(gallery.length / 2))

function GalleryTrack({
	images,
	reverse = false,
}: {
	images: string[]
	reverse?: boolean
}) {
	const trackImages =
		images.length < 4
			? [...images, ...images, ...images, ...images]
			: [...images, ...images]

	return (
		<div className="overflow-hidden">
			<div
				className={`flex w-max gap-4 will-change-transform ${reverse ? "animate-marquee-reverse" : "animate-marquee"
					}`}
			>
				{trackImages.map((image, i) => (
					<div
						key={`${image}-${i}`}
						className="relative shrink-0 grow-0 w-75 md:w-90 lg:w-105 aspect-420/240 rounded-2xl overflow-hidden"
					>
						<Image
							src={image}
							fill
							alt=""
							quality={95}
							className="object-cover"
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default function ShowroomAbout() {
	return (
		<section className="pt-30 pb-45 md:pb-22.5">
			<div className="max-w-235.5 px-4 mx-auto mb-10 flex flex-col items-center text-center">
				<Title className="mb-4 lg:mb-10">Заголовок в два слова</Title>
				<div className="font-helvetica text-[17px] -tracking-[0.01em] text-brand-gray leading-[1.35]">
					Текстовое описание про Шоурум.
				</div>
			</div>

			<div className="space-y-4">
				<GalleryTrack images={topRow} />
				<GalleryTrack images={bottomRow} reverse />
			</div>
		</section>
	)
}