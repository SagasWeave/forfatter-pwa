import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '../lib/queryClient'
import { ThemeProvider } from '@/components/theme-provider'
import { ServiceWorkerProvider } from '@/components/sw-provider'
import MuiThemeProvider from '@/components/mui/MuiThemeProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Forfatter PWA',
  description: 'En moderne skriveapp til forfattere med AI-integration',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Forfatter PWA'
  },
  icons: {
    icon: '/icon-192.svg',
    apple: '/icon-192.svg'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="da" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Forfatter PWA" />
        <link rel="apple-touch-icon" href="/icon-192.svg" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MuiThemeProvider>
            <ServiceWorkerProvider>
              <QueryProvider>{children}</QueryProvider>
            </ServiceWorkerProvider>
          </MuiThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}