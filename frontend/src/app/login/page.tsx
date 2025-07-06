'use client';

import { useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post(
        '/auth/login',
        { email, password },
        { withCredentials: true } // ✅ Send cookies
      );

      toast.success('✅ Login Successful');
      if (res.data.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/courses');
      }
    } catch (err: any) {
      console.error('❌ Login Failed:', err.response?.data || err.message);
      toast.error('❌ Login failed! Check credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-10 p-6 rounded-lg border border-green-500 w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-green-300 mb-2 text-center">🔐 Login</h1>

        <div>
          <label className="block text-white mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 rounded bg-black bg-opacity-30 border border-green-300 text-white"
          />
        </div>

        <div>
          <label className="block text-white mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 rounded bg-black bg-opacity-30 border border-green-300 text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-medium"
        >
          🔓 Login
        </button>
      </form>
    </div>
  );
}
