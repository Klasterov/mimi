import { Detector } from "@/types/detector";
import Image from "next/image";

export default function DetectorItems({ detectors }: { detectors: Detector[] }) {
	return (
		<div className="py-5 max-lg:hidden">
			<div className="max-w-308 px-4 mx-auto flex gap-6 justify-center flex-wrap">
				{detectors.map((detector, i) =>
					<li key={i} className="flex flex-col gap-2.5 text-center items-center font-medium text-[13px] leading-tight -tracking-[0.02em]">
						<Image
							src={detector.icon}
							alt=""
							width={32}
							height={32}
						/>
						<p>{detector.title}</p>
					</li>
				)}
			</div>
		</div>
	);
}