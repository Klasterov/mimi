import Image from "next/image"
import { Fragment } from "react/jsx-runtime"

type FeatureItem = {
	title: string
	text: string
}
type Props = {
	featuresItems: FeatureItem[]
}

export default function CinemaHomeFeatures({ featuresItems }: Props) {
	return (
		<section className="max-lg:overflow-hidden pb-22.5 lg:pb-10 pt-22.5 lg:overflow-x-clip">
			<div className="max-w-235.5 px-4 mx-auto">
				<div className="lg:flex lg:items-start lg:justify-between">
					<div className="lg:w-95.75 lg:pb-20 space-y-15 lg:space-y-30">
						{featuresItems.map((item, i) => (
							<Fragment key={i}>
								<article className="-tracking-[0.01em]">
									<h3 className="mb-4 bg-linear-to-r from-foreground to-[#516076] bg-clip-text text-[24px] font-bold text-transparent">
										{item.title}
									</h3>
									<p className="font-helvetica text-[17px] leading-[1.3]">
										{item.text}
									</p>
								</article>

								{i === 0 && (
									<div className="relative max-md:-mx-10 lg:hidden">
										<Image
											width={989}
											height={575}
											alt=""
											src="/images/cinema-home-page/hero-tv.png"
											quality={95}
										/>
										<div className="absolute top-[0.75%] left-[7.58%] aspect-581/327 w-[84.7%]">
											<Image
												fill
												alt=""
												src="/images/cinema-home-page/hero-placeholder.jpg"
												quality={95}
												className="object-cover"
											/>
										</div>
									</div>
								)}
							</Fragment>
						))}
					</div>
					<div className="max-lg:hidden lg:sticky top-10 relative -mr-[64%]">
						<Image
							width={989}
							height={575}
							alt=""
							src="/images/cinema-home-page/hero-tv.png"
							quality={95}
						/>
						<div className="absolute w-[84.7%] aspect-581/327 top-[0.75%] left-[7.58%]">
							<Image
								fill
								alt=""
								src="/images/cinema-home-page/hero-placeholder.jpg"
								quality={95}
								className="object-cover"
							/>
						</div>

					</div>
				</div>
			</div>
		</section>
	)
}