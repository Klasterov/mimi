import { Button } from "@/components/UI/Button";
import { Title } from "@/components/UI/Title";


export default function MaintenanceText() {
	return (
		<section className="pt-22.5 pb-22.5 lg:pb-30 bg-white">
			<div className="max-w-231.5 mx-auto px-4 relative">
				<Title className="mb-10 md:mb-15 lg:mb-20 text-center">Текстовый блок</Title>
				<div className="lg:py-22.5 py-15 lg:relative lg:flex lg:items-start lg:gap-46.75 border-t border-b border-[#d9d9d9]">
					<ul className="flex-none hidden lg:sticky lg:top-5 lg:block w-60 -tracking-[0.01em] space-y-3">
						<li>
							<a href="" className="flex rounded-[50px] py-2.5 px-4 items-center gap-2.5 transition-colors duration-300 hover:bg-background">
								<span className="text-[14px] font-helvetica font-medium">
									Параграф 1
								</span>
							</a>
						</li>
						<li>
							<a href="" className="flex rounded-[50px] py-2.5 px-4 items-center gap-2.5 transition-colors duration-300 hover:bg-background">

								<span className="text-[14px] font-helvetica font-medium">
									Параграф 2
								</span>
							</a>
						</li>
						<li>
							<a href="" className="flex rounded-[50px] py-2.5 px-4 items-center gap-2.5 transition-colors duration-300 hover:bg-background">
								<span className="text-[14px] font-helvetica font-medium">
									Параграф 3
								</span>
							</a>
						</li>
					</ul>
					<div className="lg:flex-auto">
						<div className="mb-6 -tracking-[0.01em] space-y-15 lg:space-y-20">
							<div>
								<h3 className="font-bold text-[24px] mb-6">Заголовок</h3>
								<div className="font-helvetica text-brand-gray space-y-[1.5em]">
									<p>В доме и на территории 95 групп освещения. В основном дети и хозяева пользуются световыми сценариями, их более 20. Во всех помещениях автоматизация света по датчикам присутствия.</p>
									<p>Ландшафтная подсветка и автоматическое включение светильников в доме происходит по двум параметрам: время + освещенность улицы. Яркость свечения зависит от количества света на улице.</p>
									<p>Управление с 4-х клавишных выключателей Vimar и настенных АйПадов в стационарном кейсе от MimiSmart. Часть светильников диммируется по 0-10В и DALI.</p>
								</div>
							</div>
							<div>
								<h3 className="font-bold text-[24px] mb-6">Заголовок</h3>
								<div className="font-helvetica text-brand-gray space-y-[1.5em]">
									<p>В доме и на территории 95 групп освещения. В основном дети и хозяева пользуются световыми сценариями, их более 20. Во всех помещениях автоматизация света по датчикам присутствия.</p>
									<p>Ландшафтная подсветка и автоматическое включение светильников в доме происходит по двум параметрам: время + освещенность улицы. Яркость свечения зависит от количества света на улице.</p>
									<p>Управление с 4-х клавишных выключателей Vimar и настенных АйПадов в стационарном кейсе от MimiSmart. Часть светильников диммируется по 0-10В и DALI.</p>
								</div>
							</div>
							<div>
								<h3 className="font-bold text-[24px] mb-6">Заголовок</h3>
								<div className="font-helvetica text-brand-gray space-y-[1.5em]">
									<p>В доме и на территории 95 групп освещения. В основном дети и хозяева пользуются световыми сценариями, их более 20. Во всех помещениях автоматизация света по датчикам присутствия.</p>
									<p>Ландшафтная подсветка и автоматическое включение светильников в доме происходит по двум параметрам: время + освещенность улицы. Яркость свечения зависит от количества света на улице.</p>
									<p>Управление с 4-х клавишных выключателей Vimar и настенных АйПадов в стационарном кейсе от MimiSmart. Часть светильников диммируется по 0-10В и DALI.</p>
								</div>
							</div>
						</div>
						<Button className="justify-center py-1.75!">Хочу так же</Button>
					</div>
				</div>
			</div>
		</section>
	);
}