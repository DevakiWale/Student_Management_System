'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import toast from 'react-hot-toast';

interface Course {
  id: number;
  title: string;
  description: string;
  duration: number;
}

export default function CoursePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/courses').then((res) => setCourses(res.data));
  }, []);

  const deleteCourse = async (id: number) => {
    try {
      await api.delete(`/courses/${id}`);
      setCourses(courses.filter((c) => c.id !== id));
      toast.success('🗑️ Course deleted!');
    } catch {
      toast.error('❌ Failed to delete course');
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen px-6 pt-20 bg-black dark:bg-zinc-950 text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-300">Courses</h1>
          <Link href="/courses/add" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white">
            ➕ Add Course
          </Link>
        </div>

        <input
          type="text"
          placeholder="Search by course title..."
          className="w-full p-2 mb-6 rounded bg-black bg-opacity-30 border border-green-300 text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid gap-4">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white dark:bg-white/10 p-4 rounded border border-green-500">
              <h2 className="text-xl font-semibold text-green-200">{course.title}</h2>
              <p className="text-sm text-white/90">{course.description}</p>
              <p className="text-sm text-white/60">🕒 Duration: {course.duration} hrs</p>
              <div className="mt-2 space-x-2">
                <Link
                  href={`/courses/${course.id}/edit`}
                  className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white"
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => deleteCourse(course.id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}

          {filteredCourses.length === 0 && (
            <p className="text-center text-gray-400">No courses found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
