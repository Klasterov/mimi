import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

export const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-inter',
	display: 'swap',
})

export const helvetica = localFont({
	src: './fonts/helvetica-regular.woff2',
	variable: '--font-helvetica',
	display: 'swap',
})
