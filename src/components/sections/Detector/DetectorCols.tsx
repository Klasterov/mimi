import { Title } from "@/components/UI/Title";
import { RightArrowIcon } from "@/icons/RightArrowIcon";
import { Detector } from "@/types/detector";
import Image from "next/image";
import Link from "next/link";


export default function DetectorCols({ detectors }: { detectors: Detector[] }) {
	return (
		<section className="pt-13.5 lg:pt-15 pb-22.5">
			<div className="max-w-308 mx-auto px-4">
				<Title className="lg:hidden mb-10 text-center">Датчики</Title>
				<ul className="grid md:grid-cols-2 gap-5">
					{detectors.map((item, i) => {
						if (item.isWide) {
							return (
								<li
									key={i}
									className={`${item.bg} rounded-[20px] max-md:pt-15 md:px-10 md:py-15 md:col-span-2 min-h-125 md:min-h-100 -tracking-[0.01em] flex max-lg:flex-col gap-2`}
								>
									<div className="self-center flex flex-col text-center items-center max-md:px-5 min-w-[45.5%]">
										<div className="text-[15px] mb-2">{item.title}</div>
										<h3 className="text-[22px] mb-2 font-semibold">{item.subtitle}</h3>
										<Link
											href={`/detector/${item.slug}`}
											className={`inline-flex items-center gap-1 text-[15px] font-medium text-brand-blue group transition-colors duration-300 ${item.linkHover}`}

										>
											Узнать больше
											<RightArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
										</Link>
									</div>

									<div className="flex-auto relative aspect-590/430 md:aspect-602/280">
										<Image src={item.image} fill alt="" className="object-cover" />
									</div>
								</li>
							)
						}

						return (
							<li
								key={i}
								className={`${item.bg} rounded-[20px] min-h-125 lg:min-h-160 pt-15 flex flex-col overflow-hidden`}
							>
								<div className="flex flex-col text-center items-center px-5">
									<div className="text-[15px] mb-2">{item.title}</div>
									<h3 className="text-[22px] mb-2 font-semibold">{item.subtitle}</h3>

									<Link
										href={`/detector/${item.slug}`}
										className={`inline-flex items-center gap-1 text-[15px] font-medium text-brand-blue group transition-colors duration-300 ${item.linkHover}`}

									>
										Узнать больше
										<RightArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
									</Link>
								</div>

								<div className="mt-auto relative aspect-590/430">
									<Image src={item.image} fill alt="" className="object-cover" />
								</div>
							</li>
						)
					})}
				</ul>
			</div>
		</section>
	);
}