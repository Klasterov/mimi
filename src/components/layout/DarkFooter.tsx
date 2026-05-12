'use client'

import { footerColumns } from "@/data/footer";
import { FooterColumnData } from "@/types/footer";
import Link from "next/link";
import { contacts } from "@/config/contacts";
import { routes } from "@/config/routes";
import { RightArrowIcon } from "@/icons/RightArrowIcon";
import { usePathname } from "next/navigation";


export function FooterColumn({ title, links, showOnMobile }: FooterColumnData) {
	return (
		<div className={`break-inside-avoid ${showOnMobile ? 'block' : 'hidden md:block'}`}>
			<h4 className="font-medium text-[14px] mb-3 tracking-wide text-white">
				{title}
			</h4>

			<ul className="flex flex-col gap-2">
				{links.map(({ label, href }) => (
					<li key={`${title}-${label}`}>
						<Link
							href={href}
							className="font-helvetica text-white/60 text-[13px] transition-colors hover:text-white"
						>
							{label}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}


export const Breadcrumbs = () => {
	const pathname = usePathname()

	const currentRoute = Object.values(routes).find(
		route => route.path === pathname
	)

	return (
		<div className="mb-10 flex font-helvetica gap-5 items-center">
			<Link
				href="/"
				className="font-bold tracking-[0.01em] text-[#00d0ff] text-[20px] md:text-[22px]"
			>
				MiMi<span className="transition-colors duration-301 text-white">Smart</span>
			</Link>

			{currentRoute && (
				<>
					<RightArrowIcon className="text-white w-4.5 h-4.5" />
					<span className="text-[13px] text-white">
						{currentRoute.title}
					</span>
				</>
			)}
		</div>
	)
}

export default function Footer() {
	const phoneClean = contacts.phone.replace(/[^\d]/g, "")
	return (
		<footer className="bg-foreground py-10">
			<div className="max-w-308 mx-auto px-4">
				<div className="border-t border-[#d9d9d9] pt-6 pb-10">
					<Breadcrumbs />
					<div className="columns-2 space-y-10 md:space-y-6 md:columns-3 lg:columns-5 gap-10">
						{footerColumns.map(column => (
							<FooterColumn
								key={column.title}
								title={column.title}
								links={column.links}
								showOnMobile={column.showOnMobile}
							/>
						))}

						<div className="block break-inside-avoid">
							<h4 className="font-medium text-[14px] mb-3 text-white tracking-wide">
								Контакты
							</h4>
							<div className="flex flex-col items-start mb-4">
								<a
									href={`tel:${phoneClean}`}
									className="font-helvetica whitespace-nowrap text-brand-blue text-[14px] mb-4 transition-colors hover:text-white"
								>
									{contacts.phone}
								</a>
								<a
									href={`mailto:${contacts.email}`}
									className="font-helvetica text-brand-blue text-[14px] transition-colors hover:text-white"
								>
									{contacts.email}
								</a>
							</div>
							<nav
								className="flex gap-4"
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
											<IconComponent className="w-4.5 h-4.5 text-brand-blue" />
										</Link>
									)
								})}
							</nav>
						</div>
					</div>
				</div>
				<div className="font-helvetica text-white border-t text-[13px] border-[#d9d9d9] pt-6 flex flex-col justify-between items-start gap-2.5 md:gap-4 md:flex-row md:items-center">
					<p>&copy; 2025 MiMiSmart. All rights reserved.</p>
					<Link href={`${routes.privacy.path}`} className="text-white/60 transition-colors hover:text-white">Политика конфиденциальности</Link>
				</div>
			</div>
		</footer>
	)
}