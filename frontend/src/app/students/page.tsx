'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import toast from 'react-hot-toast';

interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
}

export default function StudentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/students').then((res) => setStudents(res.data));
  }, []);

  const deleteStudent = async (id: number) => {
    try {
      await api.delete(`/students/${id}`);
      setStudents(students.filter((s) => s.id !== id));
      toast.success('🗑️ Student deleted!');
    } catch (err) {
      toast.error('❌ Failed to delete student');
    }
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen px-6 pt-20 bg-black dark:bg-zinc-950 bg-opacity-60 text-white transition-colors duration-300">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-300">Students</h1>
          <Link href="/students/add" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-white">
            ➕ Add Student
          </Link>
        </div>

        {/* 🔍 Search input */}
        <input
          type="text"
          placeholder="Search by student name..."
          className="w-full p-2 mb-6 rounded bg-black bg-opacity-30 border border-purple-300 text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* 🧑‍🎓 Students List */}
        <div className="grid gap-4">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white dark:bg-white/10 bg-opacity-10 backdrop-blur-sm p-4 rounded-lg border border-purple-500"
            >
              <h2 className="text-xl font-semibold text-purple-200">{student.name}</h2>
              <p className="text-sm">📧 {student.email}</p>
              <p className="text-sm">🎂 Age: {student.age}</p>
              <div className="mt-2 space-x-2">
                <Link
                  href={`/students/${student.id}/edit`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => deleteStudent(student.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}

          {filteredStudents.length === 0 && (
            <p className="text-center text-gray-400">No students found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
