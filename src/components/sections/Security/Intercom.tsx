import { Title } from "@/components/UI/Title"
import { RightArrowIcon } from "@/icons/RightArrowIcon"
import Image from "next/image"


const items = [
	{
		id: 0,
		title: "Голосовой помощник может открывать дверь",
		description: "Дверь открывается по команде через ассистента с проверкой голоса.",
		image: "/images/security-page/intercom/1.jpg",
	},
	{
		id: 1,
		title: "Удаленный контроль",
		description: "Вам поступает вызов, не зависимо дома вы или нет",
		image: "/images/security-page/intercom/2.jpg",
	},
	{
		id: 2,
		title: "Архив записей",
		description: "Все записи хранятся на вашем внутреннем защищенном сервере. Также возможно облачное хранение.",
		image: "/images/security-page/intercom/3.jpg",
	},
	{
		id: 3,
		title: "Бесключевой доступ",
		description: "Вы можете открыть себе дверь, нажав одну кнопку в приложении",
		image: "/images/security-page/intercom/4.jpg",
	},
]

export default function Intercom() {
	return (
		<section className="py-22.5">
			<div className="max-w-235.5 mx-auto px-4">
				<div className="flex flex-col text-center gap-6 items-center">
					<Title>Домофон</Title>
					<div className="text-[17px] font-helvetica leading-tight -tracking-[0.01em] lg:max-w-153">
						Изображение с камер выводится напрямую в приложение. Вы с телефона, компьютера или планшета увидете кто пришел, можете принять вызов, поговорить с гостем и в один клик откроете дверь гостю.
					</div>
					<a href="#" className="mb-10 inline-flex items-center gap-1 -tracking-[0.01em] text-[15px] font-medium text-brand-blue group">
						Узнать больше
						<RightArrowIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"></RightArrowIcon>
					</a>
				</div>
				<ul className="grid md:grid-cols-2 gap-5">
					{items.map(item => (
						<li key={item.id} className="aspect-444/600 relative rounded-[20px] -tracking-[0.01em] overflow-hidden bg-white px-5 py-6 lg:px-6 lg:py-6">
							<div className="absolute top-0 left-0 w-full h-full">
								<Image
									src={item.image}
									fill
									alt=""
									className="object-cover"
								/>
							</div>
							<h3 className="relative font-semibold mb-2">{item.title}</h3>
							<div className="relative font-helvetica text-[15px]">{item.description}</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
