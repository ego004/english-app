import type { Metadata, Viewport } from 'next'
import { Nunito, Baloo_2 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})

const _baloo2 = Baloo_2({
  subsets: ['latin'],
  variable: '--font-baloo2',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BrightWords - Learn English the Fun Way!',
  description: 'An interactive, gamified English learning platform for children ages 5-12. Fun lessons, quizzes, worksheets, and more!',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#7AB2D3',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${_nunito.variable} ${_baloo2.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
