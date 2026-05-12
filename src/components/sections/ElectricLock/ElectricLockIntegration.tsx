import { Title } from "@/components/UI/Title";
import { RightArrowIcon } from "@/icons/RightArrowIcon";
import Image from "next/image";

const cols = [
	{
		cap: "Снятие охраны.",
		descr: "Дверь открывается по команде через ассистента с проверкой голоса.",
		image: "/images/electric-lock-page/integration/1.png",
	},
	{
		cap: "Свет в прихожей.",
		descr: "Вам поступает вызов, не зависимо дома вы или нет",
		image: "/images/electric-lock-page/integration/2.jpg",
		theme: 'light',
	},
	{
		cap: "Видеодомофон.",
		descr: "Вы можете открыть себе дверь, нажав одну кнопку в приложении",
		image: "/images/electric-lock-page/integration/3.png",
		link: {
			text: 'Узнать больше',
			href: '#'
		},
	},
	{
		cap: "Журнал",
		descr: "Все записи хранятся на вашем внутреннем защищенном сервере. Также возможно облачное хранение.",
		image: "/images/electric-lock-page/integration/4.png",
	},
]

export default function ElectricLockIntegration() {
	return (
		<section className="py-22.5">
			<div className="max-w-235.5 px-4 mx-auto">
				<div className="mb-10 text-center max-w-153 mx-auto">
					<Title className="mb-6">Интеграция</Title>
					<div className="font-helvetica text-[17px] leading-[1.3] -tracking-[0.01em]">
						Изображение с камер выводится напрямую в приложение. Вы с телефона, компьютера или планшета увидете кто пришел, можете принять вызов, поговорить с гостем и в один клик откроете дверь гостю.
					</div>
				</div>
				<ul className="grid md:grid-cols-2 gap-5">
					{cols.map((col, i) => (
						<li key={i} className={`overflow-hidden min-h-125 md:min-h-150 rounded-[20px] -tracking-[0.01em] p-6 relative bg-white space-y-2 ${col.theme === 'light' ? 'text-white' : ''}`}>
							<Image
								src={col.image}
								fill
								alt="bg"
								className="object-cover"
							/>
							<h3 className="font-semibold relative">{col.cap}</h3>
							<div className="font-helveticaa text-[15px] relative">{col.descr}</div>

							{col.link && (
								<a href={col.link.href} className="relative inline-flex hover:text-foreground transition-colors duration-300 items-center gap-1 text-[15px] font-medium text-brand-blue group">
									{col.link.text}
									<RightArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
								</a>
							)}
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}