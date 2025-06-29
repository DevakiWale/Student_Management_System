import { getUserFromCookie } from '@/lib/authCheck'
import StudentForm from '@/components/StudentForm'
import { redirect } from 'next/navigation'

export default function AddStudentPage() {
  const user = getUserFromCookie() // 👈 decode token from cookie

  if (!user) redirect('/login')            // 🔒 Not logged in? Redirect to login
  if (user.role !== 'admin') redirect('/profile') // 🙅‍♂️ Not admin? Redirect to profile

  return <StudentForm /> // ✅ Valid admin → render the form
}