// app/students/page.tsx

import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { redirect } from 'next/navigation'
import Link from 'next/link'

function getUserFromCookie() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  if (!token) return null

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'DevakiSuperSecret123')
    return payload as { sub: string; email: string; role: string }
  } catch (err) {
    console.error('❌ Invalid JWT token:', err)
    return null
  }
}

export default function StudentsPage() {
  const user = getUserFromCookie()

  if (!user) redirect('/login')           // 🔒 Not logged in? Go to login
  if (user.role !== 'admin') redirect('/profile') // 🙅‍♂️ Not admin? Go to profile

  return (
    <div className="p-4 text-white">
      <h1 className="text-3xl font-bold mb-4">Students</h1>

      {/* ✅ Only admins see Add Student */}
      <Link href="/students/add" className="bg-cyan-600 px-4 py-2 rounded text-white">
        ➕ Add Student
      </Link>

      {/* 🔜 Student list will come here */}
    </div>
  )
}
