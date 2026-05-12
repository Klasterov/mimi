interface IconProps {
	className?: string
}

export const SubmissionIcon = ({ className }: IconProps) => (
	<svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="1.76562" y="2.26538" width="14.4622" height="1.88893" stroke="currentColor" />
		<path d="M4.75488 4.09985V15.0442C4.2389 14.8589 3.75783 14.7528 3.26367 14.7493C2.76777 14.7458 2.28541 14.8461 1.76562 15.0354V4.09985H4.75488Z" stroke="currentColor" />
		<path d="M16.2314 4.09985V15.0442C15.7155 14.8589 15.2344 14.7528 14.7402 14.7493C14.2443 14.7458 13.762 14.8461 13.2422 15.0354V4.09985H16.2314Z" stroke="currentColor" />
		<path d="M6.39062 9.93143H11.6074M6.39062 9.93143L7.44515 8.07227M6.39062 9.93143L7.3064 11.6241M11.6074 9.93143L10.4419 8.07227M11.6074 9.93143L10.4419 11.6241" stroke="currentColor" />
	</svg>
)