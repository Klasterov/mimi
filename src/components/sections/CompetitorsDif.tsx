type Col = {
	title: string
	descr: string
}

type Props = {
	title: string
	cols: Col[]
	colorClasses?: string
}

export default function CompetitorsDif({ title, cols, colorClasses }: Props) {
	return (
		<section className={`${colorClasses} py-22.5 md:py-30 lg:py-40`}>
			<div className="max-w-235.5 px-4 mx-auto">
				<h2 className="mb-10 md:mb-15 lg:mb-20 font-bold text-[24px] md:text-[32px] lg:text-[40px] -tracking-[0.01em]">{title}</h2>
				<ul className="gap-x-15 gap-y-10 md:gap-y-15 lg:gap-y-20 grid md:grid-cols-2 lg:grid-cols-3">
					{cols.map((col, i) => (
						<li key={i} className="-tracking-[0.01em]">
							<h3 className="mb-4 border-[rgba(255, 255, 255, 0.5)] border-b pb-4 lg:pb-6 font-semibold text-[22px] lg:text-[24px] leading-[1.2]">{col.title}</h3>
							<div className="font-helvetica text-[15px]">{col.descr}</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};
