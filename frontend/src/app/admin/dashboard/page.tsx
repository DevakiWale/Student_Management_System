// ✅ No 'use client' here → This is a Server Component
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import Link from 'next/link'
import api from '@/lib/api'

const SECRET = process.env.JWT_SECRET || 'DevakiSuperSecret123'

async function getUserFromCookie() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  if (!token) return null

  try {
    const decoded: any = jwt.verify(token, SECRET)
    return { id: decoded.sub, email: decoded.email, role: decoded.role }
  } catch (err) {
    console.error('Invalid token:', err)
    return null
  }
}
export default async function AdminDashboard() {
  const user = await getUserFromCookie()

  if (!user || user.role !== 'admin') {
    return <p className="p-6 text-red-500">Unauthorized Access</p>
  }

  // ✅ Data fetching stays same
  const [studentsRes, coursesRes] = await Promise.all([
    fetch('http://localhost:3000/students', { cache: 'no-store', headers: { Cookie: `token=${cookies().get('token')?.value}` } }),
    fetch('http://localhost:3000/courses', { cache: 'no-store', headers: { Cookie: `token=${cookies().get('token')?.value}` } }),
  ])

  const students = await studentsRes.json()
  const courses = await coursesRes.json()

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/bg-dashboard.jpg')",  // ✅ Your image here (public folder)
      }}
    >
      <div className="backdrop-blur-sm bg-black/60 min-h-screen p-8 text-white">
        <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

        {/* Students Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">👨‍🎓 Students</h2>
          <ul className="space-y-2">
            {students.map((student: any) => (
              <li key={student.id} className="bg-gray-800 p-4 rounded shadow">
                <strong>{student.name}</strong> - {student.email} (Age: {student.age || 'N/A'})
              </li>
            ))}
          </ul>
        </section>

        {/* Courses Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">📚 Courses</h2>
          <ul className="space-y-2">
            {courses.map((course: any) => (
              <li key={course.id} className="bg-gray-800 p-4 rounded shadow">
                <strong>{course.title}</strong>
                <p>{course.description}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Add Course Button */}
        <div className="mt-4">
          <Link href="/courses/add" className="bg-cyan-600 px-4 py-2 rounded text-white">
            ➕ Add Course
          </Link>
        </div>
      </div>
    </div>
  )
}

