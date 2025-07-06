'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';

export default function EnrollmentPage() {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Remove withCredentials since we're using JWT tokens
        const [coursesRes, enrollmentsRes] = await Promise.all([
          api.get('/courses'),
          api.get('/enrollments')
        ]);
        
        setCourses(coursesRes.data);
        setEnrollments(enrollmentsRes.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        toast.error('Failed to load data');
      }
    };

    fetchData();
  }, []);

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCourseId) {
      toast.error('Please select a course');
      return;
    }

    setLoading(true);
    try {
      console.log('Attempting to enroll in course:', selectedCourseId);
      
      await api.post('/enrollments', { 
        courseId: Number(selectedCourseId) 
      });
      
      toast.success('Enrollment successful!');
      setSelectedCourseId('');
      
      // Refresh enrollments
      const updated = await api.get('/enrollments');
      setEnrollments(updated.data);
      
    } catch (error) {
      console.error('Enrollment failed:', error);
      
      // More specific error messages
      if (error.response?.status === 401) {
        toast.error('Please log in again');
      } else if (error.response?.status === 404) {
        toast.error('Course not found');
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Enrollment failed!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <Navbar />
      <h1 className="text-3xl font-bold mb-4">Enroll in a Course</h1>
      
      <form onSubmit={handleEnroll} className="mb-6">
        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
          disabled={loading}
        >
          <option value="">Select a Course</option>
          {courses.map((course: any) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
        
        <button
          type="submit"
          disabled={loading || !selectedCourseId}
          className={`mt-4 px-4 py-2 rounded ${
            loading || !selectedCourseId
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Enrolling...' : 'Enroll'}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Your Enrollments</h2>
      {enrollments.length === 0 ? (
        <p className="text-gray-400">No enrollments yet.</p>
      ) : (
        enrollments.map((enroll: any) => (
          <div key={enroll.id} className="p-4 border border-green-500 rounded mb-2">
            <p><strong>Course:</strong> {enroll.course.title}</p>
            <p><strong>Student:</strong> {enroll.student.name}</p>
          </div>
        ))
      )}
    </div>
  );
}