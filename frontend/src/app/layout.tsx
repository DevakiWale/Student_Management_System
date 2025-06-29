import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Student Management',
  description: 'Manage students, courses, and enrollments with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gradient-to-br from-slate-900 to-black min-h-screen text-white">
        <Navbar />
        <Toaster position="top-right" />
        <main className="pt-20 max-w-5xl mx-auto px-4">{children}</main>
      </body>
    </html>
  )
}
