'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { brand } from '@/config/brand';
import { contacts } from '@/config/contacts';
import { functionalMenu, menuItems } from '@/data/header';
import { Button } from '../UI/Button';


export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [activeTab, setActiveTab] = useState('security');
	const [showFunctional, setShowFunctional] = useState(false);

	const phoneClean = contacts.phone.replace(/[^\d]/g, "")

	const activeCategory = functionalMenu.categories.find(
		c => c.id === activeTab
	)

	useEffect(() => {
		if (isOpen) document.body.classList.add('overflow-hidden')
		else document.body.classList.remove('overflow-hidden')

		return () => {
			document.body.classList.remove('overflow-hidden')
		}
	}, [isOpen])
	return (
		<header
			onMouseLeave={() => setShowFunctional(false)}
			className={`lg:relative z-2 font-helvetica transition-colors duration-400 lg:backdrop-blur-md bg-black : 'bg-[rgba(244, 244, 244)]/95 py-2`}
		>
			<div className="max-w-308 mx-auto px-4 flex items-center lg:justify-between gap-5">

				<Link href="/" className="font-helvetica font-bold tracking-[0.01em] text-[#00d0ff] text-[20px] md:text-[22px] order-1 mr-auto lg:mr-0">
					MiMi<span className={`transition-colors duration-301 text-white`}>Smart</span>
				</Link>

				<div className="flex gap-6 xl:gap-8 items-center order-3 lg:order-2">
					<nav className={`hidden lg:flex gap-6 xl:gap-8 transition-colors duration-400 items-center text-white/60 text-[13px]`}>
						{menuItems.filter(item => item.desktop).map(item =>
							item.href ? (
								<Link key={item.label} href={item.href} className='transitions-colors duration-300 hover:text-brand-light-gray'>{item.label}</Link>
							) : (
								<button key={item.label} className='transitions-colors duration-300 hover:text-brand-light-gray cursor-pointer' onClick={() => setShowFunctional(true)}>{item.label}</button>
							)
						)}
					</nav>
					<button
						onClick={() => setIsOpen(prev => !prev)}
						className={`relative z-12 text-white w-6 h-6 basis-6 cursor-pointer transitions-colors duration-300 hover:text-brand-light-gray`}
					>
						<svg className={`${isOpen && "opacity-0"} transition-opacity duration-300`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M4 12H20"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M4 18H20"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M4 6H20"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<span className={`${isOpen && "opacity-100"} opacity-0 transition-opacity duration-300 absolute top-1/2 left-1/2 w-[75%] h-0.5 bg-[#777777] -translate-x-1/2 -translate-y-1/2 rotate-45`}></span>
						<span className={`${isOpen && "opacity-100"} opacity-0 transition-opacity duration-300 absolute top-1/2 left-1/2 w-[75%] h-0.5 bg-[#777777] -translate-x-1/2 -translate-y-1/2 -rotate-45`}></span>
					</button>
				</div>

				<a href="tel:+740122344555" className={`lg:flex hidden text-[#121212] bg-white order-2 lg:order-3 rounded-full shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.06)] pt-2 px-2 pb-2 border min-w-9.5 lg:min-w-auto min-h-9.5 lg:min-h-auto lg:px-4 lg:pt-2 lg:pb-2 items-center justify-center transition duration-400 gap-2 font-medium leading-normal text-[13px] hover:bg-[#00d0ff] hover:text-white`}>
					<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M8.06802 9.66463C8.18849 9.71995 8.32422 9.73259 8.45284 9.70047C8.58145 9.66834 8.69529 9.59336 8.7756 9.48788L8.98268 9.21663C9.09135 9.07173 9.23227 8.95413 9.39427 8.87313C9.55626 8.79213 9.7349 8.74996 9.91602 8.74996H11.666C11.9754 8.74996 12.2722 8.87288 12.491 9.09167C12.7098 9.31046 12.8327 9.60721 12.8327 9.91663V11.6666C12.8327 11.976 12.7098 12.2728 12.491 12.4916C12.2722 12.7104 11.9754 12.8333 11.666 12.8333C8.88124 12.8333 6.21053 11.727 4.24139 9.75791C2.27226 7.78878 1.16602 5.11807 1.16602 2.33329C1.16602 2.02387 1.28893 1.72713 1.50772 1.50833C1.72652 1.28954 2.02326 1.16663 2.33268 1.16663H4.08268C4.3921 1.16663 4.68885 1.28954 4.90764 1.50833C5.12643 1.72713 5.24935 2.02387 5.24935 2.33329V4.08329C5.24935 4.26441 5.20718 4.44304 5.12618 4.60504C5.04518 4.76704 4.92758 4.90795 4.78268 5.01663L4.50968 5.22138C4.40259 5.30315 4.32711 5.41947 4.29606 5.55058C4.26501 5.68169 4.28031 5.81951 4.33935 5.94063C5.13658 7.55988 6.44776 8.86942 8.06802 9.66463Z" fill="currentColor" />
					</svg>
					Контакты
				</a>
				<a href="tel:+740122344555" className={`lg:hidden order-2 lg:order-3 rounded-full shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.06)] p-2 border min-w-9.5 lg:min-w-auto min-h-9.5 lg:min-h-auto lg:px-4 lg:pt-2.5 lg:pb-2.5 flex items-center justify-center transition duration-400 gap-2 font-medium leading-none text-[13px] text-foreground hover:bg-[#00d0ff] hover:text-white bg-white`}>
					<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M8.06802 9.66463C8.18849 9.71995 8.32422 9.73259 8.45284 9.70047C8.58145 9.66834 8.69529 9.59336 8.7756 9.48788L8.98268 9.21663C9.09135 9.07173 9.23227 8.95413 9.39427 8.87313C9.55626 8.79213 9.7349 8.74996 9.91602 8.74996H11.666C11.9754 8.74996 12.2722 8.87288 12.491 9.09167C12.7098 9.31046 12.8327 9.60721 12.8327 9.91663V11.6666C12.8327 11.976 12.7098 12.2728 12.491 12.4916C12.2722 12.7104 11.9754 12.8333 11.666 12.8333C8.88124 12.8333 6.21053 11.727 4.24139 9.75791C2.27226 7.78878 1.16602 5.11807 1.16602 2.33329C1.16602 2.02387 1.28893 1.72713 1.50772 1.50833C1.72652 1.28954 2.02326 1.16663 2.33268 1.16663H4.08268C4.3921 1.16663 4.68885 1.28954 4.90764 1.50833C5.12643 1.72713 5.24935 2.02387 5.24935 2.33329V4.08329C5.24935 4.26441 5.20718 4.44304 5.12618 4.60504C5.04518 4.76704 4.92758 4.90795 4.78268 5.01663L4.50968 5.22138C4.40259 5.30315 4.32711 5.41947 4.29606 5.55058C4.26501 5.68169 4.28031 5.81951 4.33935 5.94063C5.13658 7.55988 6.44776 8.86942 8.06802 9.66463Z" fill="currentColor" />
					</svg>
				</a>
			</div>

			<div className={`${showFunctional ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} hidden lg:block absolute top-full pt-4 pb-20 left-0 w-full transition duration-300 leading-snug bg-black backdrop-blur-md font-helvetica min-h-95.5`}>
				<div className="max-w-308 mx-auto px-4 flex gap-10">
					<div className="basis-55">
						<div className='mb-4 text-[#5a6d7c] text-[13px]'>
							Функционал
						</div>
						<div className="flex flex-col text-alig gap-4">
							{functionalMenu.categories.map(cat => (
								<button
									key={cat.id}
									onMouseEnter={() => setActiveTab(cat.id)}
									className={`cursor-pointer transition duration-300 text-white text-left text-[16px] text-lg ${activeTab === cat.id ? 'opacity-100' : 'opacity-40'}`}
								>
									{cat.label}
								</button>
							))}
						</div>
					</div>
					<div>
						<div className="text-[13px] text-[#5a6d7c] mb-4">
							{activeCategory?.label}
						</div>
						<div className="grid gap-y-4">

							{activeCategory?.items.map(item => (
								<Link
									key={item.label}
									href={item.href}
									className={`text-[16px] transition duration-300 text-white hover:opacity-70`}
								>
									{item.label}
								</Link>
							))}
						</div>
					</div>
					<div className="text-[15px] ml-auto basis-67 text-brand-blue tracking-[-0.01em]">
						<address className="not-italic">{brand.address}</address>
						{contacts.rating && (
							<p className={`flex items-center gap-1 transition duration-300 text-white  mb-6`}>
								<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M8.64363 1.72126C8.6765 1.65486 8.72728 1.59896 8.79022 1.55988C8.85317 1.5208 8.92579 1.50009 8.99988 1.50009C9.07398 1.50009 9.1466 1.5208 9.20955 1.55988C9.27249 1.59896 9.32327 1.65486 9.35614 1.72126L11.0886 5.23051C11.2028 5.46149 11.3712 5.66132 11.5796 5.81285C11.788 5.96439 12.03 6.0631 12.2849 6.10051L16.1594 6.66751C16.2328 6.67815 16.3018 6.70912 16.3585 6.75691C16.4152 6.80471 16.4575 6.86742 16.4804 6.93797C16.5033 7.00851 16.5061 7.08407 16.4883 7.15609C16.4706 7.22811 16.433 7.29373 16.3799 7.34551L13.5779 10.074C13.3931 10.2541 13.2548 10.4764 13.175 10.7217C13.0952 10.9671 13.0762 11.2282 13.1196 11.4825L13.7811 15.3375C13.7941 15.4109 13.7862 15.4864 13.7583 15.5555C13.7303 15.6246 13.6836 15.6845 13.6233 15.7283C13.563 15.772 13.4916 15.798 13.4173 15.8032C13.3429 15.8084 13.2687 15.7925 13.2029 15.7575L9.73938 13.9365C9.51117 13.8167 9.25727 13.7541 8.99951 13.7541C8.74175 13.7541 8.48785 13.8167 8.25963 13.9365L4.79688 15.7575C4.73113 15.7923 4.65693 15.808 4.58272 15.8027C4.50851 15.7974 4.43727 15.7714 4.37711 15.7277C4.31694 15.6839 4.27026 15.6242 4.24238 15.5552C4.21449 15.4862 4.20653 15.4108 4.21938 15.3375L4.88013 11.4833C4.92378 11.2288 4.90487 10.9676 4.82504 10.722C4.7452 10.4765 4.60684 10.2541 4.42188 10.074L1.61988 7.34626C1.56633 7.29454 1.52838 7.22881 1.51036 7.15657C1.49233 7.08433 1.49496 7.00847 1.51794 6.93765C1.54093 6.86683 1.58334 6.80389 1.64034 6.756C1.69735 6.70811 1.76666 6.67719 1.84038 6.66676L5.71413 6.10051C5.96933 6.06339 6.21168 5.9648 6.42032 5.81325C6.62897 5.6617 6.79766 5.46171 6.91188 5.23051L8.64363 1.72126Z"
										fill="#E27500"
										stroke="#E27500"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
								<span>{contacts.rating} рейтинг</span>
							</p>
						)}
						<div className='mb-6'>
							<a className={`transition-colors duration-300 hover:text-white`} href={`tel:${phoneClean}`}>{contacts.phone}</a> <br />
							<span className="text-[#acacac]">Время работы: {contacts.workingHours}</span>
						</div>
						{contacts.email && (
							<a className={`mb-6 inline-block transition-colors duration-300 hover:text-white`} href={`mailto:${contacts.email}`}>{contacts.email}</a>
						)}
						<nav
							className="flex gap-4 mb-10"
							aria-label="Социальные сети"
						>

							{contacts.socials?.map(icon => {
								const IconComponent = icon.icon
								return (
									<Link
										key={icon.name}
										href={icon.href}
										target="_blank"
										className="w-4.5 h-4.5 block duration-300 transition-transform ease-in-out hover:scale-125"
									>
										<IconComponent className={`w-4.5 h-4.5 transition duration-300 text-blue/40`} />
									</Link>
								)
							})}
						</nav>

						<div className="grid grid-cols-2 gap-3">
							{contacts.apps?.map(app => {
								const IconComponent = app.icon
								return (
									<a
										key={app.label}
										href={app.href}
										target='_blank'
										className="border hover:scale-[1.05] duration-300 transition-transform flex items-center justify-center border-[rgba(224,232,235)]/40 rounded-xl min-h-14"
										aria-label={`Перейти в ${app.label}`}
									>
										<IconComponent className={`w-8 h-8 transition duration-300 text-white`}></IconComponent>
									</a>
								)
							})}
						</div>
					</div>
				</div>
			</div>

			<div className={`bg-black ${isOpen ? "right-0 pointer-events-auto" : "-right-full pointer-events-none"} fixed lg:hidden top-0 z-11 w-full overflow-auto h-full px-8 pt-20 pb-10 transitions duration-300 font-helvetica`}>

				<nav className={`text-white transitions-colors duration-300 flex flex-col gap-5 text-[20px] pb-10`}>
					{menuItems.map(item =>
						item.href ? <Link key={item.label} href={item.href}>{item.label}</Link> :
							<button key={item.label} className={`cursor-pointer text-left`} onClick={() => setShowFunctional(true)}>{item.label}</button>
					)}
				</nav>
				<div className='pt-10 border-t border-[#d9d9d9] leading-tight font-helvetica text-[17px] tracking-[-0.01em]'>
					<div className='mb-10'>
						<div className="flex items-center gap-3 mb-8">
							<div className="w-12.5 h-12.5 bg-white rounded-[10px]">
								<Image
									src="/images/icons/address-decor.svg"
									width={50}
									height={50}
									alt="г. Москва, Новоданиловская наб., 6к1"
								/>
							</div>
							<div>
								<div className="mb-1 text-brand-blue max-w-[74%]">
									{brand.address}
								</div>
								<p className={`flex items-center gap-1 text-white`}>
									<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M8.64363 1.72126C8.6765 1.65486 8.72728 1.59896 8.79022 1.55988C8.85317 1.5208 8.92579 1.50009 8.99988 1.50009C9.07398 1.50009 9.1466 1.5208 9.20955 1.55988C9.27249 1.59896 9.32327 1.65486 9.35614 1.72126L11.0886 5.23051C11.2028 5.46149 11.3712 5.66132 11.5796 5.81285C11.788 5.96439 12.03 6.0631 12.2849 6.10051L16.1594 6.66751C16.2328 6.67815 16.3018 6.70912 16.3585 6.75691C16.4152 6.80471 16.4575 6.86742 16.4804 6.93797C16.5033 7.00851 16.5061 7.08407 16.4883 7.15609C16.4706 7.22811 16.433 7.29373 16.3799 7.34551L13.5779 10.074C13.3931 10.2541 13.2548 10.4764 13.175 10.7217C13.0952 10.9671 13.0762 11.2282 13.1196 11.4825L13.7811 15.3375C13.7941 15.4109 13.7862 15.4864 13.7583 15.5555C13.7303 15.6246 13.6836 15.6845 13.6233 15.7283C13.563 15.772 13.4916 15.798 13.4173 15.8032C13.3429 15.8084 13.2687 15.7925 13.2029 15.7575L9.73938 13.9365C9.51117 13.8167 9.25727 13.7541 8.99951 13.7541C8.74175 13.7541 8.48785 13.8167 8.25963 13.9365L4.79688 15.7575C4.73113 15.7923 4.65693 15.808 4.58272 15.8027C4.50851 15.7974 4.43727 15.7714 4.37711 15.7277C4.31694 15.6839 4.27026 15.6242 4.24238 15.5552C4.21449 15.4862 4.20653 15.4108 4.21938 15.3375L4.88013 11.4833C4.92378 11.2288 4.90487 10.9676 4.82504 10.722C4.7452 10.4765 4.60684 10.2541 4.42188 10.074L1.61988 7.34626C1.56633 7.29454 1.52838 7.22881 1.51036 7.15657C1.49233 7.08433 1.49496 7.00847 1.51794 6.93765C1.54093 6.86683 1.58334 6.80389 1.64034 6.756C1.69735 6.70811 1.76666 6.67719 1.84038 6.66676L5.71413 6.10051C5.96933 6.06339 6.21168 5.9648 6.42032 5.81325C6.62897 5.6617 6.79766 5.46171 6.91188 5.23051L8.64363 1.72126Z"
											fill="#E27500"
											stroke="#E27500"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									<span>{contacts.rating} рейтинг</span>
								</p>
							</div>
						</div>
						<div className='text-brand-blue flex items-center gap-3 mb-8'>
							<div className='basis-12.5 w-12.5'>
								<Image
									className="w-full h-auto"
									src="/images/icons/phone-header.svg"
									alt="MiMiSmart"
									width={50}
									height={50}
								/>
							</div>
							<div>
								<a href={`tel:${phoneClean}`}>{contacts.phone}</a>
								<p className='text-[#acacac]'>Время работы: {contacts.workingHours}</p>
							</div>
						</div>
						<div className='text-brand-blue flex items-center gap-3 mb-8'>
							<div className='basis-12.5 w-12.5 shadow-[0_0_2px_0_rgba(148,148,148,0.12)]'>
								<Image
									className="w-full h-auto"
									src="/images/icons/mail-header.svg"
									alt="MiMiSmart"
									width={50}
									height={50}
								/>
							</div>
							<a href={`mailto:${contacts.email}`}>{contacts.email}</a>
						</div>
					</div>

					<nav
						className="flex gap-4 mb-10"
						aria-label="Социальные сети"
					>
						{contacts.socials?.map(icon => {
							const IconComponent = icon.icon
							return (
								<Link
									key={icon.name}
									href={icon.href}
									target="_blank"
									className="w-4.5 h-4.5 block duration-300 transition-transform ease-in-out hover:scale-125"
								>
									<IconComponent className="w-4.5 h-4.5 text-[#478BEB]" />
								</Link>
							)
						})}
					</nav>
					<Button className='mb-4 w-full justify-center'>Связаться с нами</Button>
					<div className='font-helvetica flex items-center gap-2 text-[15px] text-[#acacac] -tracking-[0.01em] leading-normal mb-10'>
						<span>Мы на связи сейчас</span>
						<span className='w-2 h-2 rounded-full bg-[#27ca40] box-shadow: 0 4px 4px 0 rgba(39, 202, 64, 0.25);'></span>
					</div>
					<div className="grid grid-cols-2 gap-3">
						{contacts.apps?.map(app => {
							const IconComponent = app.icon
							return (
								<a
									key={app.label}
									href={app.href}
									target='_blank'
									className="border flex items-center justify-center border-[rgba(224,232,235)]/40 rounded-xl min-h-14"
									aria-label={`Перейти в ${app.label}`}
								>
									<IconComponent className={`w-8 h-8 text-white`}></IconComponent>
								</a>
							)
						})}
					</div>
				</div>
			</div>
		</header>
	);
}