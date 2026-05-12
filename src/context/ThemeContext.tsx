'use client'
import { createContext, useContext, useState } from 'react'

type ThemeContextType = {
	enabled: boolean
	toggle: () => void
}

const defaultThemeContext: ThemeContextType = {
	enabled: false,
	toggle: () => {},
}

const ThemeContext = createContext<ThemeContextType>(defaultThemeContext)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [enabled, setEnabled] = useState(false)

	const toggle = () => setEnabled(prev => !prev)

	return (
		<ThemeContext.Provider value={{ enabled, toggle }}>
			{children}
		</ThemeContext.Provider>
	)
}

export function useTheme() {
	return useContext(ThemeContext)
}
