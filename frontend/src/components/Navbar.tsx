'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { removeToken } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function Navbar() {

  const router = useRouter()

const handleLogout = () => {
  removeToken()
  router.push('/login')
}
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme') === 'dark'
    setDarkMode(saved)
    document.documentElement.classList.toggle('dark', saved)
  }, [])

  const toggleDark = () => {
    const isDark = !darkMode
    setDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', isDark)
  }

  return (
    <nav className="bg-black bg-opacity-60 text-white p-4 shadow-xl fixed top-0 w-full z-50">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-cyan-400">🎓 Student Manager</h1>
        <div className="flex items-center gap-4">
          <button onClick={toggleDark} title="Toggle theme">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  )
}