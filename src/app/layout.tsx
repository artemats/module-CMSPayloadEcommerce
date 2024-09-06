import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MVP Payload Store',
  description: 'Project with common modules',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn('relative font-sans antialiased', inter.className)}>
        <main className="relative flex flex-col min-h-full">
          <Providers>
            <Navbar />
            <div className="flex-grow flex-1">{children}</div>
          </Providers>
        </main>

        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
