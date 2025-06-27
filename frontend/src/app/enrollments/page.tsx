'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';
import toast from 'react-hot-toast';

interface Student {
  id: number;
  name: string;
}

interface Course {
  id: number;
  title: string;
}

interface Enrollment {
  id: number;
  student: Student;
  course: Course;
}

export default function EnrollmentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [search, setSearch] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');

  useEffect(() => {
    api.get('/students').then((res) => setStudents(res.data));
    api.get('/courses').then((res) => setCourses(res.data));
    api.get('/enrollments').then((res) => setEnrollments(res.data));
  }, []);

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId || !selectedCourseId) return;
    try {
      await api.post('/enrollments', {
        studentId: Number(selectedStudentId),
        courseId: Number(selectedCourseId),
      });
      toast.success('🎉 Enrollment successful!');
      setSelectedStudentId('');
      setSelectedCourseId('');
      const updated = await api.get('/enrollments');
      setEnrollments(updated.data);
    } catch {
      toast.error('❌ Enrollment failed!');
    }
  };

  const exportCSV = () => {
    const header = ['Student', 'Course'];
    const rows = enrollments.map(e => [e.student.name, e.course.title]);
    const csv = [header, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'enrollments.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = enrollments.filter((e) =>
    `${e.student.name} ${e.course.title}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen px-6 pt-20 bg-black dark:bg-zinc-950 text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-300 mb-6">🎓 Enroll Students</h1>

        <form onSubmit={handleEnroll} className="bg-white bg-opacity-10 p-6 rounded-lg border border-green-500 mb-6 space-y-4">
          <div>
            <label className="block text-white mb-1">Select Student</label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full p-2 rounded bg-black bg-opacity-30 border border-green-300 text-white"
              required
            >
              <option value="">-- Choose Student --</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white mb-1">Select Course</label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full p-2 rounded bg-black bg-opacity-30 border border-green-300 text-white"
              required
            >
              <option value="">-- Choose Course --</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-medium"
          >
            ➕ Enroll
          </button>
        </form>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-green-200 font-semibold">📋 Enrollments</h2>
          <button
            onClick={exportCSV}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            ⬇️ Export CSV
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by student or course..."
          className="w-full p-2 mb-6 rounded bg-black bg-opacity-30 border border-green-300 text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="space-y-3">
          {filtered.map((enroll) => (
            <div
              key={enroll.id}
              className="bg-white bg-opacity-10 p-4 rounded-lg border border-green-400 text-white"
            >
              <p>
                <span className="text-green-200 font-medium">{enroll.student.name}</span> is enrolled in{' '}
                <span className="text-green-300 font-medium">{enroll.course.title}</span>
              </p>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-gray-400">No enrollments found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
