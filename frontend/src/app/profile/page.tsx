// app/profile/page.tsx
'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const [student, setStudent] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/students/me')
        setStudent(res.data)
      } catch (err) {
        console.error('❌ Failed to fetch profile:', err)
        router.push('/login') // 🔒 Redirect to login if unauthorized
      }
    }
    fetchProfile()
  }, [])

  if (!student) return <p className="p-8">Loading profile...</p>

  return (
    <div className="min-h-screen bg-cover bg-center p-8" style={{ backgroundImage: 'url(/bg.jpg)' }}>
      <div className="bg-white p-8 rounded shadow-lg bg-opacity-90">
        <h1 className="text-2xl font-bold mb-4">Welcome, {student.name}</h1>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Age:</strong> {student.age}</p>
        <h2 className="mt-4 text-xl font-semibold">Enrolled Courses:</h2>
        <ul className="list-disc list-inside">
          {student.enrollments.map((enrollment: any) => (
            <li key={enrollment.id}>{enrollment.course.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
