'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import toast from 'react-hot-toast';

export default function AddStudentPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/students', {
        name,
        email,
        age: Number(age),
      });
      toast.success('✅ Student added!');
      router.push('/students');
    } catch (err) {
      toast.error('❌ Failed to add student');
       console.error(err);
    }
  };

  return (
    <div className="min-h-screen px-6 pt-20 bg-black dark:bg-zinc-950 bg-opacity-60 text-white">
      <Navbar />
      <div className="max-w-2xl mx-auto bg-white dark:bg-white/10 bg-opacity-10 p-8 rounded-lg border border-purple-500">
        <h1 className="text-2xl font-bold text-purple-300 mb-4">➕ Add New Student</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 rounded bg-black bg-opacity-30 border border-purple-300 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded bg-black bg-opacity-30 border border-purple-300 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Age"
            className="w-full p-2 rounded bg-black bg-opacity-30 border border-purple-300 text-white"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white font-medium"
          >
            Save Student
          </button>
        </form>
      </div>
    </div>
  );
}
