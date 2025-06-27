'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';
import toast from 'react-hot-toast';

export default function EditStudentPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    api.get(`/students/${id}`).then((res) => {
      const s = res.data;
      setName(s.name);
      setEmail(s.email);
      setAge(String(s.age));
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/students/${id}`, {
        name,
        email,
        age: Number(age),
      });
      toast.success('✏️ Student updated!');
      router.push('/students');
    } catch (err) {
      toast.error('❌ Failed to update student');
    }
  };

  return (
    <div className="min-h-screen px-6 pt-20 bg-black dark:bg-zinc-950 bg-opacity-60 text-white">
      <Navbar />
      <div className="max-w-2xl mx-auto bg-white dark:bg-white/10 bg-opacity-10 p-8 rounded-lg border border-yellow-400">
        <h1 className="text-2xl font-bold text-yellow-300 mb-4">✏️ Edit Student</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full p-2 rounded bg-black bg-opacity-30 border border-yellow-400 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="w-full p-2 rounded bg-black bg-opacity-30 border border-yellow-400 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="number"
            className="w-full p-2 rounded bg-black bg-opacity-30 border border-yellow-400 text-white"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-white font-medium"
          >
            Update Student
          </button>
        </form>
      </div>
    </div>
  );
}
