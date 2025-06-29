'use client'

import { useState } from 'react'
import api from '@/lib/api'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { setToken } from '@/lib/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/login', { email, password })
      setToken(res.data.access_token)
      toast.success('Login successful!')

      if (res.data.role === 'admin') router.push('/students')
      else router.push('/profile')
    } catch {
      toast.error('Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-xl w-96 space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button className="bg-cyan-600 hover:bg-cyan-700 text-white w-full p-2 rounded">Login</button>
      </form>
    </div>
  )
}
