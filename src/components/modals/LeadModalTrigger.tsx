"use client"

import { ReactNode, useState } from "react"
import { Button } from "@/components/UI/Button"
import { ApplicationModal } from "@/components/modals/ApplicationModal"

type LeadModalTriggerProps = {
	children: ReactNode
	formType?: string | null
	buttonClassName?: string
}

export function LeadModalTrigger({
	children,
	formType,
	buttonClassName
}: LeadModalTriggerProps) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<Button
				onClick={() => setIsOpen(true)}
				className={buttonClassName}
			>
				{children}
			</Button>

			{isOpen && (
				<ApplicationModal
					formType={formType}
					onClose={() => setIsOpen(false)}
				/>
			)}
		</>
	)
}
