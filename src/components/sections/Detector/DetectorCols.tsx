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
				<ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
					{detectors.map((item, i) => {
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