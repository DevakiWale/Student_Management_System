'use client';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';

export default function EditCoursePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    api.get(`/courses/${id}`).then((res) => {
      const course = res.data;
      setTitle(course.title);
      setDescription(course.description);
      setDuration(String(course.duration));
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.put(`/courses/${id}`, {
      title,
      description,
      duration: Number(duration),
    });
    toast.success('✏️ Course updated!');
    router.push('/courses');
  };

  return (
    <div className="min-h-screen px-6 pt-20 bg-black bg-opacity-60">
      <Navbar />
      <div className="max-w-2xl mx-auto bg-white bg-opacity-10 p-8 rounded-lg border border-cyan-500">
        <h1 className="text-2xl font-bold text-yellow-300 mb-4">✏️ Edit Course</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full p-2 rounded bg-black bg-opacity-30 border border-yellow-400 text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="w-full p-2 rounded bg-black bg-opacity-30 border border-yellow-400 text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="number"
            className="w-full p-2 rounded bg-black bg-opacity-30 border border-yellow-400 text-white"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-white font-medium"
          >
            Update Course
          </button>
        </form>
      </div>
    </div>
  );
}
