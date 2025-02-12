import { Inter } from 'next/font/google'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Medicare PlanIt | Find Your Ideal Medicare Plan in Minutes',
  description: 'Get a personalized Medicare plan recommendation in just 5 minutes with our guided questionnaire. Compare plans and save on coverage.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}
