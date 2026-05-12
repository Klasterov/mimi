import { Detector } from "@/types/detector"

type Props = {
	info: Detector["info"]
}

export default function DetectorInfo({ info }: Props) {
	return (
		<section className={`${info?.theme === 'dark' ? 'bg-foreground text-white' : 'bg-white'} pb-22.5 lg:pb-30 lg:pt-15 pt-7.5`}>
			<div className="max-w-235.5 px-4 mx-auto">
				<article className="space-y-10">
					{info?.sections.map((section, index) => (
						<section
							key={index}
							className={`${info?.theme === 'dark' ? 'border-brand-light-gray' : 'border-[#d9d9d9]'} pt-15 border-t -tracking-[0.01em] grid lg:grid-cols-[38%_48.8%] gap-10 justify-between`}
						>
							<h2 className="font-bold text-[22px] md:text-[28px] lg:text-[32px] leading-[1.2]">
								{section.title}
							</h2>

							<div className="space-y-[1em] text-[17px] leading-[1.3] font-helvetica">
								{section.text?.map((paragraph, paragraphIndex) => (
									<p key={paragraphIndex}>{paragraph}</p>
								))}
								{section.list && (
									<ul className="space-y-[1em]">
										{section.list.map((item, i) => (
											<li key={i} className="flex gap-2">
												<span>•</span>
												<span>{item}</span>
											</li>
										))}
									</ul>
								)}
							</div>
						</section>
					))}
				</article>
			</div>
		</section>
	)
}