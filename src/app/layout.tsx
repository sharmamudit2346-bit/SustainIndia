import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ServiceWorkerProvider } from '@/components/ServiceWorkerProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ 
  subsets: ['latin'], 
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: 'SustainIndia - Save the Planet, Level Up Your Country',
  description: 'A nationwide sustainability challenge platform for India that merges AI-powered smart agriculture, carbon footprint tracking, and competitive leaderboards into one engaging experience.',
  keywords: 'sustainability, India, agriculture, carbon footprint, leaderboard, gamification, eco-friendly, environment',
  authors: [{ name: 'SustainIndia Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#22c55e',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-gradient-to-br from-eco-green-50 via-blue-50 to-warm-yellow-50 dark:from-gray-900 dark:via-deep-blue-900 dark:to-eco-green-900">
        <ThemeProvider>
          <ServiceWorkerProvider />
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
