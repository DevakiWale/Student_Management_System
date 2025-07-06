// app/students/add/page.tsx

import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import StudentForm from '@/components/StudentForm'
import { redirect } from 'next/navigation'

// ✅ Decode JWT from cookie (server-side safe)
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

export default function AddStudentPage() {
  const user = getUserFromCookie()

  if (!user) redirect('/login')               // 🔒 Not logged in? Redirect
  if (user.role !== 'admin') redirect('/profile') // 🚫 Not admin? Redirect to profile

  return <StudentForm /> // ✅ Authorized admin → show form
}
