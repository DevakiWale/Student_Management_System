// src/app/profile/page.tsx
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import api from '@/lib/axios';

export default async function ProfilePage() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return <div className="text-red-600">No token found. Please login.</div>;
    }

    // Decode the token and extract user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id?: any };

    // Ensure ID is numeric and valid
    const userId = Number(decoded.id);
    if (!userId || isNaN(userId)) {
      return <div className="text-red-600">Invalid token: user ID is missing or malformed.</div>;
    }

    // Fetch student data from backend
    const res = await api.get(`/students/${userId}`);
    const student = res.data;

    return (
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Student Profile</h1>
        <p className="mb-1"><strong>Name:</strong> {student.name}</p>
        <p className="mb-1"><strong>Email:</strong> {student.email}</p>
        <p className="mb-1"><strong>Age:</strong> {student.age}</p>
        {student.photo ? (
          <img
            src={student.photo}
            alt="student"
            className="w-40 h-40 object-cover rounded border mt-4"
          />
        ) : (
          <p className="italic text-gray-500 mt-4">No photo uploaded</p>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error loading profile:', error);
    return (
      <div className="text-red-600 p-4">
        Error loading profile. Please check your session or try logging in again.
      </div>
    );
  }
}
