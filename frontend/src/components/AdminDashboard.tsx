// components/AdminDashboard.tsx
'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      <h1 className="text-3xl font-bold mb-6">👩‍💼 Admin Dashboard</h1>

      <div className="space-y-4">
        <Link href="/students" className="block bg-cyan-600 p-4 rounded">
          📋 Manage Students
        </Link>
        <Link href="/courses" className="block bg-green-600 p-4 rounded">
          📚 Manage Courses
        </Link>
      </div>
    </div>
  );
}
