'use client'

import { Button } from "@/components/UI/Button";
import { Title } from "@/components/UI/Title";
import { brand } from "@/config/brand";
import { contacts } from "@/config/contacts";
import Image from "next/image";
import Link from "next/link";

export default function Contacts() {
	const phoneClean = contacts.phone.replace(/[^\d]/g, "")

	return (
		<section className="pt-13.5 md:py-22.5 overflow-hidden md:relative flex flex-col md:block">
			<div className="max-w-308 w-full lg:w-auto mx-auto px-4 self-stretch">
				<Title className="mb-10">Контакты</Title>
				<div className='mb-6 space-y-6 leading-snug text-[15px] tracking-[-0.01em] font-helvetica'>
					<div className="flex items-center gap-3">
						<div className="w-12.5*4 h-12.5 bg-white rounded-[10px]">
							<Image
								src="/images/icons/address-decor.svg"
								width={50}
								height={50}
								alt="г. Москва, Новоданиловская наб., 6к1"
							/>
						</div>
						<div className="text-[15px]">
							<a className="text-brand-blue" href="" target="_blank">
								{brand.address}
							</a>
						</div>
					</div>
					<div className='text-brand-blue flex items-center gap-3'>
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
							<a className="transition-colors duration-300 hover:text-foreground" href={`tel:${phoneClean}`}>{contacts.phone}</a>
							<p className='text-[#acacac]'>Время работы: {contacts.workingHours}</p>
						</div>
					</div>
					<div className='text-brand-blue flex items-center gap-3'>
						<div className='basis-12.5 w-12.5 shadow-[0_0_2px_0_rgba(148,148,148,0.12)]'>
							<Image
								className="w-full h-auto"
								src="/images/icons/mail-header.svg"
								alt="MiMiSmart"
								width={50}
								height={50}
							/>
						</div>
						<a className="transition-colors duration-300 hover:text-foreground" href={`mailto:${contacts.email}`}>{contacts.email}</a>
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
				<Button className='lg:min-w-80 py-1.75! px-6! justify-between mb-2.5'>Связаться с нами</Button>
				<div className='flex items-center gap-1 text-[14px] text-[#acacac] -tracking-[0.01em] leading-normal pl-6'>
					<span>Мы на связи сейчас</span>
					<span className='w-2 h-2 rounded-full bg-[#27ca40] box-shadow: 0 4px 4px 0 rgba(39, 202, 64, 0.25);'></span>
				</div>
			</div>

			<span className="self-end md:-z-1 -mr-[5%] md:mr-0 relative md:absolute h-full md:top-0 md:right-0 md:w-auto w-[139%] aspect-889/646 lg:aspect-889/646">

				<Image
					src="/images/contacts/decor.png"
					alt="Декор"
					fill
					quality={95}
					className="object-cover"
				/>
			</span>
		</section>
	);
};