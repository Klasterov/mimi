interface IconProps {
	className?: string
}

export const BtnArrowIcon = ({ className }: IconProps) => (
	<svg width="24" height="24" className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M18 8L22 12L18 16" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
		<path d="M2 12H22" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
	</svg>
)