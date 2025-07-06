'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';
import { GraduationCap, Book, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [studentsCount, setStudentsCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
  const [enrollmentsCount, setEnrollmentsCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/students/me', { withCredentials: true });
        if (res.data) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchCounts = async () => {
        const [studentsRes, coursesRes, enrollmentsRes] = await Promise.all([
          api.get('/students'),
          api.get('/courses'),
          api.get('/enrollments'),
        ]);
        setStudentsCount(studentsRes.data.length);
        setCoursesCount(coursesRes.data.length);
        setEnrollmentsCount(enrollmentsRes.data.length);
      };

      fetchCounts();
    }
  }, [isAuthenticated]);

  if (isAuthenticated === null) {
    return <div className="text-white text-center mt-20">Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Student Management System</h1>
        <p className="mb-8 text-lg">Please login or register to continue.</p>
        <div className="space-x-4">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => router.push('/login')}
          >
            Login
          </button>
          <button
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            onClick={() => router.push('/register')}
          >
            Register
          </button>
        </div>
      </div>
    );
  }

  // ✅ Authenticated UI
  return (
    <div className="min-h-screen px-6 pt-20 bg-black bg-opacity-60">
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">📊 Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <StatCard
            icon={<Users size={32} className="text-purple-300" />}
            label="Students"
            count={studentsCount}
            color="purple"
          />
          <StatCard
            icon={<Book size={32} className="text-cyan-300" />}
            label="Courses"
            count={coursesCount}
            color="cyan"
          />
          <StatCard
            icon={<GraduationCap size={32} className="text-green-300" />}
            label="Enrollments"
            count={enrollmentsCount}
            color="green"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  count,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  count: number;
  color: 'purple' | 'cyan' | 'green';
}) {
  const colors = {
    purple: 'border-purple-500 text-purple-200',
    cyan: 'border-cyan-500 text-cyan-200',
    green: 'border-green-500 text-green-200',
  };

  return (
    <div
      className={`bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg border ${colors[color]} shadow-lg transition hover:scale-105`}
    >
      <div className="flex items-center gap-4">
        <div className="">{icon}</div>
        <div>
          <p className="text-lg font-semibold">{label}</p>
          <p className="text-2xl font-bold">{count}</p>
        </div>
      </div>
    </div>
  );
}
