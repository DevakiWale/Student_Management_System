'use client';

import { useState } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function AddCoursePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/courses', {
      title,
      description,
      duration: Number(duration),
    });
    toast.success('✅ Course added successfully!');
    router.push('/courses');
  };

  return (
    <div className="min-h-screen px-6 pt-20 bg-black bg-opacity-60">
      <Navbar />
      <div className="max-w-2xl mx-auto bg-white bg-opacity-10 p-8 rounded-lg border border-cyan-500">
        <h1 className="text-2xl font-bold text-cyan-300 mb-4">➕ Add New Course</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 rounded bg-black bg-opacity-30 border border-cyan-300 text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 rounded bg-black bg-opacity-30 border border-cyan-300 text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Duration (hours)"
            className="w-full p-2 rounded bg-black bg-opacity-30 border border-cyan-300 text-white"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded text-white font-medium"
          >
            Save Course
          </button>
        </form>
      </div>
    </div>
  );
}
