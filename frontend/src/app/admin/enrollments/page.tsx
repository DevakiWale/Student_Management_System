// app/admin/enrollments/page.tsx
'use client'

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function AdminEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await api.get('/enrollments');
        setEnrollments(res.data);
      } catch (err) {
        console.error('Failed to fetch enrollments', err);
        toast.error('Failed to load enrollments.');
      }
    };
    fetchEnrollments();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-700 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">🎓 Enrollments</h1>

      {enrollments.map((enroll: any) => (
        <div key={enroll.id} className="mb-4 border border-white p-4 rounded-xl bg-white/10">
          <p><strong>Student:</strong> {enroll.student.name}</p>
          <p><strong>Course:</strong> {enroll.course.title}</p>
        </div>
      ))}
    </div>
  );
}
