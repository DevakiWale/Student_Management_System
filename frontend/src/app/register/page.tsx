'use client'

import { useState } from 'react'
import api from '@/lib/api'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/auth/register', form)
      toast.success('Registration successful!')
      router.push('/login')
    } catch {
      toast.error('Registration failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-black flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-xl w-96 space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <button className="bg-purple-600 hover:bg-purple-700 text-white w-full p-2 rounded">Register</button>
      </form>
    </div>
  )
}
