import { Title } from "@/components/UI/Title";
import Image from "next/image";

const cols = [
	{
		cap: "Смартфон.",
		descr: "Изображение с камер выводится на устройства, подключенные к системе.",
		image: "/images/electric-lock-page/access/1.jpg",
	},
	{
		cap: "Код или отпечаток пальца.",
		descr: "Если вас нет дома, гости могут записать аудио- или видеопослания, которые будут отправлены вам на электронную почту;",
		image: "/images/electric-lock-page/access/2.jpg",
	},
	{
		cap: "Гостевой доступ по расписанию.",
		descr: "Специальная конструкция делает домофон устойчивым к любым погодным условиям.",
		image: "/images/electric-lock-page/access/3.jpg",
	},
	{
		cap: "Face ID.",
		descr: "Ограничьте круг пользователей, допущенных к просмотру управления отдельными элементами.",
		image: "/images/electric-lock-page/access/4.jpg",
	},
]

export default function ElectricLockAccess() {
	return (
		<section className="py-22.5">
			<div className="max-w-308 px-4 mx-auto">
				<Title className="mb-6 lg:mb-10">Способы доступа</Title>
				<ul className="gap-4 lg:gap-5 flex flex-wrap">
					{cols.map((col, i) => {
						const widthClass = (i === 1 || i === 2) ? 'lg:w-[65%]' : 'lg:w-[33%]'
						return (
							<li
								key={i}
								className={`p-5 flex-auto lg:p-6 relative min-h-89.5 rounded-2xl lg:rounded-[20px] overflow-hidden lg:min-h-100 flex flex-col justify-end ${widthClass}`}
							>
								<Image src={col.image} className={`object-cover ${i === 2 ? 'object-left' : ''}`} quality={95} fill alt="" />
								<h3 className="relative mb-1 font-medium text-white leading-tight">{col.cap}</h3>
								<div className="relative text-[15px] text-[#95979e] font-helvetica -tracking-[0.01em]">{col.descr}</div>
							</li>
						)
					})}
				</ul>
			</div>
		</section>
	);
}