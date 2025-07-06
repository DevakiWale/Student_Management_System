'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';

export default function CourseListPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/courses')
      .then(res => setCourses(res.data))
      .catch(() => toast.error('Failed to load courses'))
      .finally(() => setLoading(false));
  }, []);

  const handleEnroll = async (courseId: number) => {
    try {
      await api.post('/enrollments', { courseId });
      toast.success('Enrolled successfully!');
    } catch (err) {
      toast.error('Enrollment failed!');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Available Courses</h1>
      <ul>
        {courses.map((course: any) => (
          <li key={course.id} className="mb-4 border-b pb-2">
            <div className="font-semibold">{course.title}</div>
            <div>{course.description}</div>
            <button
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
              onClick={() => handleEnroll(course.id)}
            >
              Enroll
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}