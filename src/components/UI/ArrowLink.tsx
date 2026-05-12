import { RightArrowIcon } from "@/icons/RightArrowIcon";
import Link from "next/link";

type Props = {
	children: React.ReactNode
	href: string
	className?: string
}

export default function ArrowLink({ children, href, className }: Props) {
	return (
		<Link
			href={href}
			className={`${className} inline-flex hover:text-foreground transition-colors duration-300 items-center gap-1 text-[15px] text-brand-blue group`}
		>
			{children}
			<RightArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
		</Link>
	)
}