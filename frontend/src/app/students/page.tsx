import { getUserFromCookie } from '@/lib/authCheck';
import Link from 'next/link';

export default async function StudentsPage() {
  const user = await getUserFromCookie();

  return (
    <div className="p-4 text-white">
      <h1 className="text-3xl font-bold mb-4">Students</h1>

      {/* Show only for admin */}
      {user?.role === 'admin' && (
        <Link href="/students/add" className="bg-cyan-600 px-4 py-2 rounded text-white">
          ➕ Add Student
        </Link>
      )}

      {/* 🔜 Student list will come here */}
    </div>
  );
}
