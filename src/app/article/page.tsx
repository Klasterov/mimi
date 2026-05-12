'use client'

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

import { useEffect, useMemo, useRef, useState } from "react"

// import { routes } from "@/config/routes"
import Image from "next/image"

import { LikeIcon } from "@/icons/LikeIcon"
import { TgIcon } from "@/icons/socials/TgIcon"
import { YoutubeIcon } from "@/icons/socials/YoutubeIcon"
import { VkIcon } from "@/icons/socials/VkIcon"
import { DzenIcon } from "@/icons/socials/DzenIcon"
import Articles from "@/components/sections/Articles"
import type { Article } from "@/types/article"


type SectionItem = {
	id: string
	title: string
}

const articleSections: SectionItem[] = [
	{ id: "thinking", title: "Язык = мышление" },
	{ id: "wealth", title: "Русский язык — это богатство" },
	{ id: "poor-speech", title: "Чем опасна бедная речь?" },
	{ id: "idioms", title: "Фразеологизмы" },
	{ id: "style", title: "Язык — это стиль" },
]
// export const metadata = {
// 	title: routes.article.title
// }

export default function ArticlePage() {
	const [liked, setLiked] = useState(false)
	const [count, setCount] = useState(0)
	const [articles, setArticles] = useState<Article[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const response = await fetch('/api/articles')
				if (response.ok) {
					const data = await response.json()
					setArticles(data)
				}
			} catch (error) {
				console.error('Failed to fetch articles:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchArticles()
	}, [])

	const handleClick = () => {
		setLiked(prev => !prev)
		setCount(prev => prev + (liked ? -1 : 1))
	}

	const [activeSection, setActiveSection] = useState(0)

	const sectionRefs = useRef<(HTMLElement | null)[]>([])

	const setSectionRef = (index: number) => (el: HTMLElement | null) => {
		sectionRefs.current[index] = el
	}

	useEffect(() => {
		const sections = sectionRefs.current.filter(Boolean) as HTMLElement[]
		if (!sections.length) return

		const observer = new IntersectionObserver(
			entries => {
				const visibleEntries = entries
					.filter(entry => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)

				if (!visibleEntries.length) return

				const currentId = visibleEntries[0].target.id
				const currentIndex = articleSections.findIndex(item => item.id === currentId)

				if (currentIndex !== -1) {
					setActiveSection(currentIndex)
				}
			},
			{
				root: null,
				rootMargin: "-20% 0px -55% 0px",
				threshold: [0.2, 0.35, 0.5, 0.7],
			}
		)

		sections.forEach(section => observer.observe(section))

		return () => observer.disconnect()
	}, [])

	const scrollToSection = (id: string) => {
		const el = document.getElementById(id)
		if (!el) return

		el.scrollIntoView({
			behavior: "smooth",
			block: "start",
		})
	}

	return (
		<>
			<Header />

			<main>
				<div className="relative aspect-390/108 md:aspect-1440/400">
					<Image
						src="/images/article/top.jpg"
						quality={95}
						fill
						className="object-cover"
						alt=""
					/>
				</div>

				<section className="pt-4 md:pt-10 lg:pt-22.5 text-black">
					<div className="max-w-264 px-4 mx-auto relative">
						<div className="max-xl:hidden absolute -left-20 top-0 h-full">
							<div className="sticky top-30 w-5 space-y-2.5">
								{articleSections.map((item, index) => (
									<button
										key={item.id}
										type="button"
										onClick={() => scrollToSection(item.id)}
										aria-label={item.title}
										className="block w-full cursor-pointer"
									>
										<div
											className={`h-0.5 w-full transition-colors duration-300 ${index <= activeSection ? "bg-black" : "bg-[#d9d9d9]"
												}`}
										/>
									</button>
								))}
							</div>
						</div>

						{/* HEADER */}
						<div className="mb-10">
							<h1 className="text-[22px] md:text-[34px] lg:text-[44px] font-semibold mb-4">
								Быть умным — модно. Почему русский язык — это роскошь, которую мы теряем
							</h1>

							<div className="mb-4 text-[12px] md:text-[13px]">
								20 июля 2025 | читать 5 минут
							</div>

							<div className="flex gap-4">
								<a
									href=""
									target="_blank"
									className="w-4.5 h-4.5 block duration-300 transition-transform ease-in-out hover:scale-125"
								>
									<TgIcon className="w-4.5 h-4.5 transition duration-300 text-blue/40" />
								</a>
								<a
									href=""
									target="_blank"
									className="w-4.5 h-4.5 block duration-300 transition-transform ease-in-out hover:scale-125"
								>
									<DzenIcon className="w-4.5 h-4.5 transition duration-300 text-blue/40" />
								</a>
								<a
									href=""
									target="_blank"
									className="w-4.5 h-4.5 block duration-300 transition-transform ease-in-out hover:scale-125"
								>
									<YoutubeIcon className="w-4.5 h-4.5 transition duration-300 text-blue/40" />
								</a>
								<a
									href=""
									target="_blank"
									className="w-4.5 h-4.5 block duration-300 transition-transform ease-in-out hover:scale-125"
								>
									<VkIcon className="w-4.5 h-4.5 transition duration-300 text-blue/40" />
								</a>
							</div>
						</div>

						{/* TOC */}
						<div className="mb-10">
							<div className="mb-2 text-[#acacac]">Оглавление:</div>
							<ul className="space-y-2 font-medium">
								{articleSections.map((item, index) => (
									<li key={item.id}>
										<button
											type="button"
											onClick={() => scrollToSection(item.id)}
											className={`text-left transition-colors duration-300 ${index === activeSection ? "text-black" : "text-black/60"
												}`}
										>
											— {item.title}
										</button>
									</li>
								))}
							</ul>
						</div>

						<article className="space-y-12 max-md:mb-10">
							<Image
								width={1024}
								height={600}
								src="/images/article/1.jpg"
								alt=""
							/>

							<div className="space-y-4 text-[15px] md:text-[17px] lg:text-[18px] leading-[1.7]">
								<p>Когда вы в последний раз слышали, как человек использует слово «некстати»? А «зазноба»? А «доколе»? Когда в последний раз встречали в речи что-то, что вас удивило — не грубостью, а точностью?</p>

								<p>Русский язык — не просто средство общения. Это огромный, многослойный, звучащий инструмент. Но сегодня всё чаще он превращается в примитивную оболочку, в которую засовывают банальности, клише и безвкусные конструкции, лишённые характера.</p>

								<p>Мы говорим словами, которые не чувствуем. Пишем фразы, которых не понимаем. Слушаем тексты, от которых ничего не остаётся. И это не просто эстетическая проблема. Это потеря мышления.</p>
							</div>

							<section
								id="thinking"
								ref={setSectionRef(0)}
							>
								<h2 className="mb-4 text-[24px] lg:text-[36px] font-semibold">
									Язык = мышление
								</h2>

								<div className="space-y-4 text-[15px] md:text-[17px] lg:text-[18px] leading-[1.7]">
									<p>Мы думаем словами. Мы чувствуем словами. Мы принимаем решения словами. Когда язык сужается — сужается и мышление.</p>

									<p>Попробуйте описать печаль, имея в распоряжении только два слова: «грустно» и «очень грустно».</p>

									<p>Теперь — если у вас есть «тоска», «уныние», «меланхолия», «подавленность», «безысходность», «щемящее чувство», «потерянность», «тревожное затмение».</p>

									<p>Видите, насколько шире становится не просто речь — а спектр восприятия жизни?</p>

									<p>Современный обиходный словарь русского человека — около 2 500 слов. Для сравнения: у Пушкина — 20 000. У Ломоносова — больше. У студентов XVIII века — 8–10 тысяч. Чем меньше слов — тем проще человек. И не в хорошем смысле.</p>
								</div>
							</section>

							<section
								id="wealth"
								ref={setSectionRef(1)}
							>
								<h2 className="mb-4 text-[24px] lg:text-[36px] font-semibold">
									Русский язык — это богатство, а не барьер
								</h2>

								<div className="space-y-4 text-[15px] md:text-[17px] lg:text-[18px] leading-[1.7]">
									<p>Проблема в том, что всё чаще язык воспринимается как нечто устаревшее. — Кто этим говорит? — спрашивают. — Это же не модно, не актуально.</p>

									<p>Но как мы дошли до того, что глубина стала немодной? Почему «пёстрый», «вихрастый», «говорливый» и «удаль» звучат как из музея?</p>

									<p>А между тем, это слова, в которых есть воздух, характер, лицо. Они пахнут деревней, литературой, кино. Они живые.</p>

									<p>Просто они вышли из обихода. И это наша вина. Когда мы заменили «живо» на «норм», «изящно» на «ок», а «расстроен» на «ну такое».</p>
								</div>
							</section>

							<section
								id="poor-speech"
								ref={setSectionRef(2)}
							>
								<h2 className="mb-4 text-[24px] lg:text-[36px] font-semibold">
									Чем опасна бедная речь?
								</h2>

								<Image
									width={1024}
									height={600}
									src="/images/article/2.jpg"
									alt=""
								/>
								<div className="space-y-4 text-[15px] md:text-[17px] lg:text-[18px] leading-[1.7]">
									<p className="text-[14px] text-gray-500">Скудная речь:</p>

									<ul className="list-disc pl-5 space-y-2">
										<li>Человек хуже формулирует мысли.</li>
										<li>Растёт раздражение, потому что нет слов, чтобы выразить чувство.</li>
										<li>Общение становится поверхностным.</li>
										<li>Снижается точность.</li>
										<li>Исчезает индивидуальность.</li>
									</ul>

									<p>Мы начинаем казаться себе «не такими интересными». А причина — не в личности, а в инструменте, через который личность проявляется.</p>

									<p>Когда у тебя 500 слов — ты как пианист, у которого всего три клавиши. Можно что-то изобразить. Но невозможно сыграть музыку.</p>
								</div>
							</section>

							<section
								id="idioms"
								ref={setSectionRef(3)}
							>
								<h2 className="mb-4 text-[24px] lg:text-[36px] font-semibold">
									Почему фразеологизмы — не пыль, а энергия
								</h2>

								<div className="space-y-4 text-[15px] md:text-[17px] lg:text-[18px] leading-[1.7]">
									<p>Русский язык богат не только словами, но и словосочетаниями, за которыми скрывается сила целого поколения. «Не лыком шит», «чёрт ногу сломит», «по уши в долгах», «семь пятниц на неделе», «вылетело из головы», «и ежу понятно».</p>

									<p>Это не просто устоявшиеся выражения. Это мини-истории, которые сохранили в себе мудрость, юмор, иронию, образность. И когда вы используете такие фразы — вы не просто украшаете речь. Вы подключаетесь к национальному коду.</p>

									<p>Каждое такое выражение — это культурная память, сжатая в один глоток. Произнес — и как будто кости предков хрустнули. Именно поэтому они легко ложатся в речь.</p>
								</div>
							</section>

							<section
								id="style"
								ref={setSectionRef(4)}
							>
								<h2 className="mb-4 text-[24px] lg:text-[36px] font-semibold">
									Русский язык — это не скука. Это стиль.
								</h2>

								<div className="space-y-4 text-[15px] md:text-[17px] lg:text-[18px] leading-[1.7]">
									<p>
										Нельзя отдать язык на откуп чиновникам, учебникам или официальным мероприятиям.<br />
										Язык — это наш голос. Или он живой, дышащий, ироничный, образный — или он мёртв.
									</p>

									<p>
										Умный человек — это не тот, кто говорит сложно. А тот, кто может ярко и точно сказать простое.
										Так, чтобы остаться в памяти. Чтобы захотелось повторить. Чтобы захотелось — думать его словами.
									</p>

									<p>
										<strong>Быть умным — не стыдно.</strong><br />
										<strong>Быть умным — модно.</strong><br />
										Особенно, если вы говорите по-русски. Не как из учебника. А по-настоящему.
									</p>
								</div>
							</section>
						</article>

						<div className="md:hidden flex flex-wrap text-black/60 text-[14px] gap-10 pt-6 border-t border-[#d9d9d9]">
							<button
								type="button"
								onClick={handleClick}
								className="flex items-center gap-2 min-w-11"
							>
								<LikeIcon
									className={`w-5 h-5 transition ${liked ? "text-red-500" : ""}`}
								/>
								<span>{count}</span>
							</button>

							<time dateTime="20-06-2025">20 июля 2025</time>

							<div className="flex gap-4 ml-auto">
								<a
									href=""
									target="_blank"
									className="w-4.5 h-4.5 block duration-300 transition-transform ease-in-out hover:scale-125"
								>
									<TgIcon className="w-4.5 h-4.5 transition duration-300 text-black" />
								</a>
								<a
									href=""
									target="_blank"
									className="w-4.5 h-4.5 block duration-300 transition-transform ease-in-out hover:scale-125"
								>
									<DzenIcon className="w-4.5 h-4.5 transition duration-300 text-black" />
								</a>
								<a
									href=""
									target="_blank"
									className="w-4.5 h-4.5 block duration-300 transition-transform ease-in-out hover:scale-125"
								>
									<YoutubeIcon className="w-4.5 h-4.5 transition duration-300 text-black" />
								</a>
								<a
									href=""
									target="_blank"
									className="w-4.5 h-4.5 block duration-300 transition-transform ease-in-out hover:scale-125"
								>
									<VkIcon className="w-4.5 h-4.5 transition duration-300 text-black" />
								</a>
							</div>
						</div>
					</div>
				</section>

				<Articles
					title="Другие статьи"
					mobileView="stack"
					articles={articles}
				/>
			</main>

			<Footer />
		</>
	)
}