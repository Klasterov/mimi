import Image from "next/image";

export default function Card() {
	return (
		<section className="bg-white">
			<div className="text-center pt-15 pb-22.5 text-black font-bold overflow-hidden">
				<div className="mb-4 max-w-308 px-4 mx-auto text-[20px] md:text-[22px] lg:text-[24px] -tracking-[0.01em]">
					Оборудование
				</div>
				<div className="overflow-hidden">
					<div className="animate-marquee text-[40px] md:text-[52px] lg:text-[64px] flex whitespace-nowrap">
						<span className="mr-10">
							CUARM5M — CUARM5M — CUARM5M —
						</span>
						<span>
							CUARM5M — CUARM5M — CUARM5M —
						</span>
					</div>
				</div>
			</div>
			<div className="max-w-308 px-4 mx-auto">
				<div className="py-15 lg:py-22.5 border-y border-[#d9d9d9] flex max-lg:flex-col items-center gap-15 lg:gap-10 lg:justify-between">
					<Image
						src="/images/card-page/product.png"
						width={349}
						height={449}
						alt=""
						className="max-w-63.5 md:max-w-100"
					/>
					<div className="font-helvetica basis-[54.25%] md:grow-0 md:shrink-0 text-[17px] -tracking-[0.01em] space-y-[1em]">
						<p>Модуль CUARM5M предназначен для управления  всей системой умного дома MiMiSmart через  локальную сеть и интернет, обеспечивая  защищенный канал связи. Модуль накапливает  статистику показаний датчиков, хранит историю  событий, позволяет конфигурировать систему,  изменять логическую схему работы модулей,  анализировать их состояние и устанавливать  дополнительные сервисы.</p>
						<p>Модуль является центральным элементом  системы умного дома MiMiSmart, обеспечивая  управление,  мониторинг  функциональности системы.  и расширение  </p>
						<p>Модуль оснащен портом Ethernet для  подключения к локальной сети, и клеммой  питания 24 вольта.  </p>
						<p>Основные функции:</p>
						<ul className="space-y-[0.5em] list-disc pl-5">
							<li>Конфигурация системы и изменение  логической схемы работы модулей;  </li>
							<li>Накопление  датчиков;  статистики  хранине истории событий;</li>
							<li>Анализ состояния модулей;  </li>
							<li>Установка  дополнительных  показаний  сервисов  (голосовое управление Алиса/Siri/Маруся и  т.д.).</li>
						</ul>
					</div>
				</div>
				<div className="py-15 lg:py-22.5 border-b border-[#d9d9d9]">
					<table className="w-full border border-[#d9d9d9] text-left text-[13px] sm:text-[15px] lg:text-[17px] font-helvetica -tracking-[0.01em] leading-snug">
						<thead className="text-brand-gray">
							<tr className="border-b border-[#d9d9d9]">
								<th className="px-4 py-2.5 font-normal border-r border-[#d9d9d9]">Наименование параметра</th>
								<th className="px-4 py-2.5 font-normal border-r border-[#d9d9d9]">Единицы измерения</th>
								<th className="px-4 py-2.5 font-normal">Значение</th>
							</tr>
						</thead>

						<tbody>
							<tr className="border-b border-[#d9d9d9]">
								<td className="px-4 py-2.5 border-r border-[#d9d9d9]">Тип монтажа</td>
								<td className="px-4 py-2.5 border-r border-[#d9d9d9]"></td>
								<td className="px-4 py-2.5">DIN 4U</td>
							</tr>

							<tr className="border-b border-[#d9d9d9]">
								<td className="px-4 py-2.5 border-r border-[#d9d9d9]">Напряжение питания</td>
								<td className="px-4 py-2.5 border-r border-[#d9d9d9]">В</td>
								<td className="px-4 py-2.5">24</td>
							</tr>

							<tr className="border-b border-[#d9d9d9]">
								<td className="px-4 py-2.5 border-r border-[#d9d9d9]">Потребляемая мощность, не более</td>
								<td className="px-4 py-2.5 border-r border-[#d9d9d9]">Вт</td>
								<td className="px-4 py-2.5">5</td>
							</tr>

							<tr className="border-b border-[#d9d9d9]">
								<td className="px-4 py-2.5 border-r border-[#d9d9d9]">Тип подключения</td>
								<td className="px-4 py-2.5 border-r border-[#d9d9d9]"></td>
								<td className="px-4 py-2.5">Ethernet</td>
							</tr>

							<tr className="border-b border-[#d9d9d9]">
								<td className="px-4 py-2.5 border-r border-[#d9d9d9]">Скорость передачи данных</td>
								<td className="px-4 py-2.5 border-r border-[#d9d9d9]">Мбит/с</td>
								<td className="px-4 py-2.5">10/100</td>
							</tr>

							<tr className="border-b border-[#d9d9d9]">
								<td className="px-4 py-2.5 border-r border-[#d9d9d9]">Рабочие температуры</td>
								<td className="px-4 py-2.5 border-r border-[#d9d9d9]">°C</td>
								<td className="px-4 py-2.5">-10 … +40</td>
							</tr>

							<tr className="border-b border-[#d9d9d9]">
								<td className="px-4 py-2.5 border-r border-[#d9d9d9]">Степень защиты</td>
								<td className="px-4 py-2.5 border-r border-[#d9d9d9]">IP</td>
								<td className="px-4 py-2.5">IP40</td>
							</tr>

							<tr className="border-b border-[#d9d9d9]">
								<td className="px-4 py-2.5 border-r border-[#d9d9d9]">Материал корпуса</td>
								<td className="px-4 py-2.5 border-r border-[#d9d9d9]"></td>
								<td className="px-4 py-2.5">Полиамид</td>
							</tr>

							<tr>
								<td className="px-4 py-2.5 border-r border-[#d9d9d9]">Габаритные размеры (Ш×В×Г)</td>
								<td className="px-4 py-2.5 border-r border-[#d9d9d9]">мм</td>
								<td className="px-4 py-2.5">70×86×58</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="py-15 lg:py-22.5 flex flex-col items-center text-center">
					<h3 className="font-bold text-[32px] text-black -tracking-[0.01em] mb-2">В сетевой коммутатор</h3>
					<Image
						src="/images/card-page/product-2.png"
						width={528}
						height={574}
						alt=""
						className="max-w-80 md:max-w-150"
					/>
				</div>
			</div>
		</section>
	);
}